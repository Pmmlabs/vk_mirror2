! function() {
    var AdsLight = {},
        isVkDomain = "vk.com" === document.domain,
        uaLight = navigator.userAgent.toLowerCase(),
        browserLight = {
            msie6: /msie 6/i.test(uaLight) && !/opera/i.test(uaLight),
            msie7: /msie 7/i.test(uaLight) && !/opera/i.test(uaLight),
            msie8: /msie 8/i.test(uaLight) && !/opera/i.test(uaLight)
        };
    isVkDomain && ("__adsLoaded" in window || (window.__adsLoaded = vkNow()), window.AdsLight = AdsLight), AdsLight.init = function() {
        window.vk__adsLight || (window.vk__adsLight = {}, AdsLight.initUserHandlers(), vk__adsLight.widgetsIds = {}, vk__adsLight.observersInited = !1, vk__adsLight.publishTimers = {}, vk__adsLight.windowId = Math.round(1e9 * Math.random() + 1), vk__adsLight.activeTab = 0, vk__adsLight.userEventTime = 0, vk__adsLight.wrapVisible = !1, vk__adsLight.imagesTimer = !1, vk__adsLight.reloadTimer = !1, vk__adsLight.updateBlockTimer = !1, vk__adsLight.adsCanShow = 1, vk__adsLight.adsSection = !1, vk__adsLight.adsShowed = "", vk__adsLight.adsShowedHash = +new Date, vk__adsLight.adsParams = !1, vk__adsLight.updateProgress = 0, vk__adsLight.adsShowedAll = {}, vk__adsLight.loadComplete = !1, vk__adsLight.loaderParams = !1, vk__adsLight.adsIdsApplyNeeded = {}, vk__adsLight.adsIdsApplyProcess = [], vk__adsLight.adsIdsApplyTimer = !1, vk__adsLight.adsIdsApplyLocked = !1, "onfocusin" in window ? window.addEventListener ? (window.addEventListener("focusin", vk__adsLight.userHandlers.onFocusWindow, !1), window.addEventListener("focusout", vk__adsLight.userHandlers.onBlurWindow, !1)) : window.attachEvent && (window.attachEvent("onfocusin", vk__adsLight.userHandlers.onFocusWindow), window.attachEvent("onfocusout", vk__adsLight.userHandlers.onBlurWindow)) : window.addEventListener && (window.addEventListener("focus", vk__adsLight.userHandlers.onFocusWindow, !0), window.addEventListener("blur", vk__adsLight.userHandlers.onBlurWindow, !0)), document.addEventListener ? (window.addEventListener("scroll", vk__adsLight.userHandlers.onScrollWindow, !0), document.addEventListener("mousedown", vk__adsLight.userHandlers.onMouseDownDocument, !0)) : document.attachEvent && (window.attachEvent("onscroll", vk__adsLight.userHandlers.onScrollWindow), document.attachEvent("onmousedown", vk__adsLight.userHandlers.onMouseDownDocument)), !isVkDomain && window.VK && VK.addCallback && VK.addCallback("adsPublish", AdsLight.handleEvent), vk__adsLight.yaDirectLoaded = !1, vk__adsLight.yaDirectAdActive = !1, vk__adsLight.yaDirectLoadTries = 0, vk__adsLight.gadxLoaded = !1, vk__adsLight.gadxLoading = !1, vk__adsLight.gadxLoadTries = 0, vk__adsLight.showWmgAd = !0, vk__adsLight.wmgLoading = !1, vk__adsLight.wmgLoadTries = 0, vk__adsLight.userHandlers.onInit(!0))
    }, AdsLight.initUserHandlers = function() {
        function e(e) {
            AdsLight.initObservers(), e && AdsLight.handleEvent("ads.onEvent", "onInit", 0), e || AdsLight.loadAds(), document.hasFocus && document.hasFocus() && t(!0)
        }

        function t(e) {
            e && AdsLight.handleEvent("ads.onEvent", "onHasFocus", 0), o()
        }

        function i(e) {
            e && AdsLight.handleEvent("ads.onEvent", "onFocusWindow", 0), r || (r = !0, g = window.vkNow && vkNow() || 0, vk__adsLight.userEventTime = window.vkNow && vkNow() || 0, o())
        }

        function s(e) {
            r = !1, window.vkNow && vkNow() - g < 1e3 || (e && AdsLight.handleEvent("ads.onEvent", "onBlurWindow", 0), vk__adsLight.activeTab = window.vkNow && -vkNow() || 0)
        }

        function a(e, t) {
            function i() {
                return "web" === vk__adsLight.adsSection && vkNow() - __adsLoaded >= vk.ads_rotate_interval || vkNow() - __adsLoaded >= 5 * vk.ads_rotate_interval
            }
            return e && !t ? (clearTimeout(c), void(c = setTimeout(function() {
                a(e, !0)
            }, 100))) : (e && AdsLight.handleEvent("ads.onEvent", "onScrollWindow", 0), vk__adsLight.userEventTime = window.vkNow && vkNow() || 0, o(), isVkDomain && window.vkNow && window.vk && vk.ads_rotate_interval && i() && (clearTimeout(h), h = setTimeout(function() {
                i() && (__adsLoaded = 0, AdsLight.updateBlock())
            }, 10)), void(isVkDomain && AdsLight.applyAds()))
        }

        function d(e) {
            if (e && AdsLight.handleEvent("ads.onEvent", "onMouseDownDocument", 0), vk__adsLight.userEventTime = window.vkNow && vkNow() || 0, o(), e) {
                for (var t = e.target; t && "A" != t.tagName && !t.onclick;) t = t.parentNode;
                t && n(!0)
            }
        }

        function n(e) {
            e && AdsLight.handleEvent("ads.onEvent", "onMouseDownDocumentAction", 0), clearTimeout(h), l = !0, setTimeout(function() {
                l = !1
            }, 10)
        }

        function o(e) {
            function t() {
                return vkNow() - __adsLoaded >= vk.ads_rotate_interval
            }
            isVkDomain && window.vkNow && window.vk && vk.ads_rotate_interval && !l && vk__adsLight.activeTab < 0 && vkNow() + vk__adsLight.activeTab >= 15e3 && t() && (clearTimeout(h), h = setTimeout(function() {
                t() && (__adsLoaded = 0, AdsLight.updateBlock())
            }, 10)), vk__adsLight.activeTab = 1
        }
        vk__adsLight.userHandlers = {
            onInit: e,
            onHasFocus: t,
            onFocusWindow: i,
            onBlurWindow: s,
            onScrollWindow: a,
            onMouseDownDocument: d,
            onMouseDownDocumentAction: n,
            onActiveTab: o
        };
        var r = !1,
            l = !1,
            g = !1,
            h = !1,
            c = !1
    }, AdsLight.initWeb = function(e, t, i, s) {
        if (vk__adsLight.adsSection = e, top !== window) {
            var a = {
                adsPublish: function() {
                    AdsLight.handleEvent.apply(AdsLight, arguments)
                },
                onAdsAttached: function() {
                    vk__adsLight.rpc.callMethod("publish", "ads.subscribeEvents")
                },
                onInit: function() {
                    vk__adsLight.rpc.callMethod("publish", "ads.subscribeEvents")
                }
            };
            try {
                vk__adsLight.rpc = new fastXDM.Client(a), vk__adsLight.rpc.callMethod("adsOnInitLoader", i), vk__adsLight.loaderParams = t, vk__adsLight.adsParamsExport = s
            } catch (d) {
                debugLog(d)
            }
        }
    }, AdsLight.initObservers = function() {
        function e(e) {
            return function() {
                var t = Array.prototype.slice.call(arguments);
                t.unshift(e), AdsLight.handleEvent.apply(AdsLight, t)
            }
        }
        if (window.VK && VK.Observer && VK.Observer.subscribe && !vk__adsLight.observersInited) {
            vk__adsLight.observersInited = !0, VK.Observer.subscribe("ads.isVisibleBlockWrap", e("ads.isVisibleBlockWrap")), VK.Observer.subscribe("ads.subscribeEvents", e("ads.subscribeEvents")), VK.Observer.subscribe("ads.onEvent", e("ads.onEvent")), VK.Observer.subscribe("ads.onAdsShowed", e("ads.onAdsShowed"));
            for (var t in VK.Widgets.RPC) VK.Widgets.RPC[t].methods.adsOnInit && VK.Widgets.RPC[t].callMethod("onAdsAttached")
        }
    }, AdsLight.handleEvent = function() {
        var e = Array.prototype.slice.call(arguments),
            t = e.shift();
        switch (t) {
            case "ads.isVisibleBlockWrap":
                AdsLight.isVisibleBlockWrapRpc.apply(AdsLight, e);
                break;
            case "ads.subscribeEvents":
                var i = e[0];
                i && !vk__adsLight.widgetsIds[i] && (vk__adsLight.widgetsIds[i] = !0), vk__adsLight.userHandlers.onInit(!0);
                break;
            case "ads.onEvent":
                AdsLight.onEvent.apply(AdsLight, e);
                break;
            case "ads.onAdsShowed":
                AdsLight.onAdsShowed.apply(AdsLight, e)
        }
    }, AdsLight.onEvent = function(e, t) {
        if (0 === t) t = [];
        else {
            var i = !1;
            for (var s in t)
                if (t[s] == vk__adsLight.windowId) {
                    i = !0;
                    break
                }
            if (i) return;
            vk__adsLight.userHandlers[e] && vk__adsLight.userHandlers[e](!1)
        }
        t.push(vk__adsLight.windowId), AdsLight.publish(!1, "ads.onEvent", e, t)
    }, AdsLight.onAdsShowed = function(e) {
        0 === e && (e = {});
        var t = [];
        for (var i in e) t.push(parseInt(i));
        t.sort();
        for (var s = [], a = 0, d = t.length; d > a; a++) {
            var i = t[a];
            s.push(e[i].ads_showed_hash)
        }
        s = s.join("_");
        var n = s && e[vk__adsLight.windowId] && s === e[vk__adsLight.windowId].publish_hash,
            o = +new Date;
        e[vk__adsLight.windowId] || (e[vk__adsLight.windowId] = {}, t.push(vk__adsLight.windowId), t.sort()), e[vk__adsLight.windowId].ads_showed = vk__adsLight.adsShowed, e[vk__adsLight.windowId].ads_showed_hash = vk__adsLight.adsShowedHash, e[vk__adsLight.windowId].update_progress = vk__adsLight.updateProgress;
        for (var i in vk__adsLight.adsShowedAll)(!e[i] || vk__adsLight.adsShowedAll[i].publish_time > e[i].publish_time) && o - vk__adsLight.adsShowedAll[i].publish_time < 1e4 && (e[i] = vk__adsLight.adsShowedAll[i]);
        for (var s = [], a = 0, d = t.length; d > a; a++) {
            var i = t[a];
            s.push(e[i].ads_showed_hash)
        }
        s = s.join("_"), e[vk__adsLight.windowId].publish_time = o, e[vk__adsLight.windowId].publish_hash = s;
        for (var i in e) vk__adsLight.adsShowedAll[i] = e[i];
        n || AdsLight.publish(!0, "ads.onAdsShowed", e)
    }, AdsLight.publish = function(e, t) {
        function i() {
            for (var e = 0, t = l.length; t > e; e++) l[e]()
        }
        var s = Array.prototype.slice.call(arguments, 1),
            a = s.slice(),
            d = s.slice(),
            n = s.slice(),
            o = s.slice();
        a.unshift("adsPublish"), d.unshift("adsPublish"), n.unshift("adsPublish"), o.unshift("publish");
        var r, l = [];
        if (window.VK && VK.Widgets && VK.Widgets.RPC)
            for (var g in vk__adsLight.widgetsIds) VK.Widgets.RPC[g] && VK.Widgets.RPC[g].callMethod && (r = function() {
                var e = g;
                return function() {
                    VK.Widgets.RPC[e].callMethod.apply(VK.Widgets.RPC[e], a)
                }
            }(), l.push(r));
        !isVkDomain && window.VK && VK.callMethod && (r = function() {
            VK.callMethod.apply(VK, d)
        }, l.push(r)), isVkDomain && "web" !== vk__adsLight.adsSection && window.cur && cur.app && cur.app.runCallback && (r = function() {
            cur.app.runCallback.apply(cur.app, n)
        }, l.push(r)), isVkDomain && "web" === vk__adsLight.adsSection && vk__adsLight.rpc && vk__adsLight.rpc.callMethod && (r = function() {
            vk__adsLight.rpc.callMethod.apply(vk__adsLight.rpc, o)
        }, l.push(r)), clearTimeout(vk__adsLight.publishTimers[t]), l.length > 1 && e ? vk__adsLight.publishTimers[t] = setTimeout(i, 50) : i()
    }, AdsLight.canUpdate = function(e) {
        var t = ge("ads_left"),
            i = e && __adsLoaded === !1,
            s = !0;
        return s = s && t && isVisible(t) && (vk__adsLight.activeTab > 0 && AdsLight.isVisibleBlockWrap() || i), s = s && vk.id && (vk__adsLight.adsCanShow >= 1 || vkNow() + vk__adsLight.adsCanShow > 36e5), "web" === vk__adsLight.adsSection ? s = s && 2 === vk__adsLight.loadComplete : (s = s && isVisible("side_bar") && !layers.visible && !isVisible("left_friends"), s = s && !vk.no_ads && (vk.loaded || i)), s
    }, AdsLight.getAjaxParams = function(e, t) {
        var i = {},
            s = AdsLight.canUpdate(!0);
        return t.noAds || t.cache ? i.al_ad = 0 : s || t.ads ? ((t.ads || window.vkNow && window.vk && vk.ads_rotate_interval && "web" !== vk__adsLight.adsSection && vkNow() - __adsLoaded >= vk.ads_rotate_interval) && (__adsLoaded = vkNow(), i.al_ad = 1), (e.al_ad || i.al_ad) && (i.ads_section = vk__adsLight.adsSection, i.ads_showed = AdsLight.getAdsShowed())) : i.al_ad = null, i
    }, AdsLight.doRequest = function(e, t) {
        function i(t) {
            var r = +new Date,
                l = 0;
            for (var g in vk__adsLight.adsShowedAll) {
                var h = vk__adsLight.adsShowedAll[g];
                if (r - h.publish_time >= 3e4) delete vk__adsLight.adsShowedAll[g];
                else if (!s || !o[g]) {
                    if (2 == h.update_progress) {
                        l = g;
                        break
                    }
                    1 == h.update_progress && (!l || l > g) && (l = g)
                }
            }
            t || !l || l == vk__adsLight.windowId ? (clearInterval(a), clearTimeout(d), vk__adsLight.updateProgress = 2, AdsLight.onAdsShowed(0), e()) : l != n && (n = l, clearInterval(a), clearTimeout(d), a = setInterval(i, s ? 100 : 200), d = setTimeout(i.pbind(!0), 5050)), o[l] = o[l] ? o[l] + 1 : 1
        }
        var s = "web" === vk__adsLight.adsSection && 1 === vk__adsLight.loadComplete;
        if (!t) return vk__adsLight.updateProgress = 1, AdsLight.onAdsShowed(0), void setTimeout(AdsLight.doRequest.pbind(e, !0), 300);
        var a, d, n = 0,
            o = {};
        i()
    }, AdsLight.getAdsShowed = function() {
        var e = [];
        for (var t in vk__adsLight.adsShowedAll) {
            var i = vk__adsLight.adsShowedAll[t];
            i.ads_showed && e.push(i.ads_showed)
        }
        return e = e.join(",")
    }, AdsLight.updateBlock = function(e, t) {
        function i() {
            s()
        }

        function s() {
            vk__adsLight.updateProgress = 3
        }
        if ("very_lazy" === e) return void(__adsLoaded = 0);
        if ("lazy" === e) {
            if (__adsLoaded) return void(__adsLoaded = 0);
            __adsLoaded = 0
        }
        if ("force" === e && (__adsLoaded = 0), "force_hard" === e && (__adsLoaded = 0), "already" === e) return void(__adsLoaded = vkNow());
        if (!__adsLoaded && __adsLoaded !== !1) {
            if (!t) return clearTimeout(vk__adsLight.updateBlockTimer), void(vk__adsLight.updateBlockTimer = setTimeout(AdsLight.updateBlock.pbind(!1, 1), 1e3));
            var a = AdsLight.canUpdate();
            if (1 == t) return void setTimeout(AdsLight.updateBlock.pbind(!1, 2), 500);
            if (a || "force_hard" == e) {
                __adsLoaded = vkNow();
                var d = {};
                for (var n in vk__adsLight.adsParams) d[n] = vk__adsLight.adsParams[n];
                AdsLight.doRequest(function() {
                    d.ads_showed = AdsLight.getAdsShowed(), d.ya_ad_active = +vk__adsLight.yaDirectAdActive, ajax.post("/ads_rotate.php?act=al_update_ad", d, {
                        ads: 1,
                        onDone: s,
                        onFail: i
                    })
                })
            }
        }
    }, AdsLight.sendExperimentStat = function(e, t, i) {
        if (window.vk && vk.id) {
            if (vk.id % 20 != 2) return
        } else if (Math.random() >= .05) return;
        var s;
        switch (t) {
            case "try":
                s = e + 1;
                break;
            case "success":
                s = e + 2;
                break;
            case "fail":
                s = e + 3;
                break;
            case "noresult":
                s = e + 7;
                break;
            case "lineup":
                s = e + 8;
                break;
            case "extra":
                s = e + 9;
                break;
            default:
                return
        }
        var a = "/wkview.php?act=mlet&mt=" + s;
        i && (a += "&extra=" + encodeURIComponent(i)), ajax.post(a, {}, {
            onFail: function() {
                return !0
            }
        })
    }, AdsLight.tryExperiment = function(e) {
        for (var t in e) {
            t = intval(t);
            var i = e[t].split(":"),
                s = i[0],
                a = parseInt(i[1]),
                d = i.slice(2),
                n = d.length ? d[d.length - 1] : "",
                o = "label=",
                r = "";
            switch (n.substr(0, o.length) === o && (r = n.substr(o.length), d = d.slice(0, -1)), vk__adsLight.yaDirectAdActive = !1, s) {
                case "ya_direct":
                    return AdsLight.sendExperimentStat(a, "lineup"), vk__adsLight.yaCloseLink = d[0], vk__adsLight.yaDirectLoaded ? (AdsLight.tryRenderYaDirect(d[1], a, r, e.slice(t + 1)), !0) : void(vk__adsLight.yaDirectLoadTries > 3 ? (AdsLight.sendExperimentStat(a, "fail"), AdsLight.tryExperiment(e.slice(t + 1))) : (AdsLight.initYaDirect(d[2]), setTimeout(function() {
                        AdsLight.tryExperiment(e)
                    }, 300)));
                case "criteo":
                    return AdsLight.sendExperimentStat(a, "lineup"), AdsLight.tryRenderCriteo(a, e.slice(t + 1)), !0;
                case "rb":
                    return AdsLight.sendExperimentStat(a, "lineup"), AdsLight.tryRenderTarget(d[0], d[1], a, r, d[2], d[3], d[4], d[5], e.slice(t + 1)), !0;
                case "vk":
                    AdsLight.sendExperimentStat(a, "lineup"), AdsLight.sendExperimentStat(a, "try");
                    var l = +new Date,
                        g = "__vkAdsReq_" + l;
                    window[g] = function(e) {
                        e.ads_count && AdsLight.sendExperimentStat(a, "success"), delete window[g]
                    }, setTimeout(function() {
                        delete window[g]
                    }, 6e4);
                    var h = vk__adsLight.adsParams;
                    return vk__adsLight.adsParams = vk__adsLight.adsParams || {}, vk__adsLight.adsParams.ads_req_id = l, vk__adsLight.adsParams.ignore_experiments = a, AdsLight.updateBlock("force_hard", 2), vk__adsLight.adsParams = h, !0;
                case "gadx":
                    if (AdsLight.sendExperimentStat(a, "lineup"), !vk__adsLight.gadxLoaded) return void(vk__adsLight.gadxLoadTries > 3 ? (AdsLight.sendExperimentStat(a, "fail"), AdsLight.tryExperiment(e.slice(t + 1))) : (AdsLight.initGADX(d[0], [d[1], d[2]], a, e.slice(t + 1)), setTimeout(function() {
                        AdsLight.tryExperiment(e)
                    }, 300)));
                    var c = AdsLight.getGADXBusyBlockID(),
                        _ = AdsLight.getGADXFreeBlockID();
                    if (!_) return void AdsLight.sendExperimentStat(a, "fail");
                    if (c) {
                        var v = ge(c),
                            u = ge("ads_left"),
                            L = getSize(u)[1];
                        setStyle(u, {
                            minHeight: L,
                            maxHeight: L
                        }), setStyle(v, {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%"
                        }), v = ce("div", {
                            id: _
                        }, {
                            maxHeight: 0,
                            overflow: "hidden"
                        }), u.appendChild(v)
                    } else {
                        v = ce("div", {
                            id: _
                        }, {
                            maxHeight: 0,
                            overflow: "hidden"
                        });
                        var u = ge("ads_left");
                        if (!u) return AdsLight.sendExperimentStat(a, "fail"), void AdsLight.tryExperiment(e.slice(t + 1));
                        if (u.innerHTML) return AdsLight.showNewBlock(u, "", !0), void setTimeout(function() {
                            ge("ads_left").innerHTML = "", AdsLight.tryExperiment(e)
                        }, 1e3);
                        u.appendChild(v)
                    }
                    return googletag.cmd.push(function(e, t) {
                        AdsLight.sendExperimentStat(t, "try"), googletag.pubads().refresh([vk__adsLight.gadxSlots[e]]), googletag.display(e)
                    }.pbind(_, a)), !0;
                case "wmg":
                    return AdsLight.sendExperimentStat(a, "lineup"), AdsLight.wmgMessageCallback = function(i) {
                        AdsLight.checkWmgMessage.call(this, i, a, e, t)
                    }, addEventListener("message", AdsLight.wmgMessageCallback), window.glade ? (vk__adsLight.showWmgAd = !0, AdsLight.tryRenderWmg(a, e.slice(t + 1)), !0) : vk__adsLight.wmgLoadTries > 3 ? (vk__adsLight.showWmgAd = !1, AdsLight.onWmgRenderUnsuccessful(a, e.slice(t + 1)), !0) : (vk__adsLight.showWmgAd = !0, AdsLight.initWmg(), setTimeout(function() {
                        AdsLight.tryExperiment(e)
                    }, 300), !0)
            }
        }
        return !1
    }, AdsLight.setNewBlock = function(e, t, i, s, a, d) {
        "string" == typeof t && (vk__adsLight.adsSection = t);
        var n = "<!--ads_experiment";
        if (e && e.slice(0, n.length) === n) {
            var o = e.split(";");
            return void AdsLight.tryExperiment(o.slice(1, -1))
        }
        var r = "<!--ads_props_data;",
            l = ";-->",
            g = e ? e.indexOf(r) : -1,
            h = -1 != g ? e.indexOf(l, g + r.length) : -1;
        if (-1 != h && (d = e.slice(g + r.length, h)), d && "string" == typeof d) try {
            d = window.parseJSON ? parseJSON(d) : JSON.parse(d)
        } catch (c) {}
        if (d && "[object Object]" === Object.prototype.toString.call(d) || (d = {}), vk__adsLight.adsCanShow = i || "0" === i ? 1 : -vkNow(), vk__adsLight.adsShowed = s, vk__adsLight.adsShowedHash = +new Date, a && (vk__adsLight.adsParams = a), !e)
            if (vk.no_ads) e = "";
            else {
                if ("im" !== vk__adsLight.adsSection || 0 != __seenAds) return void AdsLight.resizeBlockWrap([0, 0], !1, !1, !0);
                e = ""
            }
        __adsLoaded = vkNow();
        var _ = ge("ads_left"),
            v = _ && isVisible(_) || vk.ad_preview;
        if (!_) {
            var u = ge("side_bar");
            if (!u) return void AdsLight.resizeBlockWrap([0, 0], !1, !1, !0);
            _ = u.appendChild(ce("div", {
                id: "ads_left",
                className: "ads_left_empty"
            }, {
                display: v ? "block" : "none"
            }))
        }
        if (AdsLight.showNewBlock(_, e, v), window.vk && vk.ads_rotate_interval && "web" === vk__adsLight.adsSection && (clearInterval(vk__adsLight.reloadTimer), vk__adsLight.reloadTimer = setInterval(function() {
                vkNow() - __adsLoaded >= vk.ads_rotate_interval && vkNow() - vk__adsLight.userEventTime <= 3 * vk.ads_rotate_interval / 4 && (__adsLoaded = 0, AdsLight.updateBlock())
            }, vk.ads_rotate_interval)), d.ads_req_id) try {
            var L = "__vkAdsReq_" + d.ads_req_id;
            window[L] && window[L](d)
        } catch (c) {}
        setTimeout(function() {
            vk__adsLight.updateProgress = 3, AdsLight.onAdsShowed(0)
        }, 100), "undefined" != typeof abp && abp && setCookie("remixab", 1, 30)
    }, AdsLight.showNewBlock = function(e, t, i) {
        function s(e) {
            if (--e.count > 0)
                for (var t in k)
                    if (!k[t].width || !k[t].height) return;
            clearInterval(vk__adsLight.imagesTimer), d()
        }

        function a() {
            if (isVisible(L)) {
                var e = AdsLight.getBlockSize(p);
                e = AdsLight.resizeBlockWrap(e, v, u)
            }
        }

        function d() {
            setStyle(e, {
                overflow: "hidden"
            }), setStyle(L, {
                display: "block",
                position: "absolute",
                left: 0,
                top: 0,
                opacity: 0,
                zIndex: 10,
                width: "100%"
            });
            var t = AdsLight.getBlockSize(p);
            t = AdsLight.resizeBlockWrap(t, v, u), c ? n() : animate(e, {
                width: t[0],
                height: t[1]
            }, _, n.pbind())
        }

        function n() {
            toggleClass(e, "ads_left_empty", c), cleanElems(e);
            var t = AdsLight.getBlockSize(p);
            t = AdsLight.resizeBlockWrap(t, !1, u, !0), c ? o() : animate(L, {
                opacity: 1
            }, _, o.pbind())
        }

        function o() {
            if (c)
                if (L.previousSibling)
                    for (var e = L; e = e.previousSibling;) {
                        var t = e.previousSibling ? null : r.pbind();
                        animate(e, {
                            opacity: 0
                        }, _, t)
                    } else r();
                else r()
        }

        function r() {
            for (cleanElems(L); L.previousSibling;) re(L.previousSibling);
            setStyle(L, {
                position: "static",
                zIndex: "",
                width: ""
            }), setStyle(e, {
                width: "",
                height: "",
                overflow: "visible"
            }), window.updSideTopLink && updSideTopLink(), AdsLight.updateExternalStats(e), c || AdsLight.scrollToPreview()
        }
        if (!i || browserLight.msie6 || browserLight.msie7) {
            i || debugLog("Ads container is hidden"), e.innerHTML = t, toggleClass(e, "ads_left_empty", !t);
            var l = AdsLight.getBlockSize(e);
            return AdsLight.resizeBlockWrap(l, !1, !1, !0), void AdsLight.updateExternalStats(e)
        }
        for (var g = getXY(e)[1], h = scrollGetY(), c = !t, _ = g + 50 > h + lastWindowHeight ? 0 : 200, v = AdsLight.getBlockSize(e), u = [0, 0], L = e.appendChild("string" == typeof t ? ce("div", {
                innerHTML: t
            }, {
                display: "none"
            }) : t), p = geByClass1("ads_ads_box3", L) || L, m = geByTag("img", L), k = [], f = 0, w = m.length; w > f; f++) {
            var A = vkImage();
            A.onload = a, A.onerror = a, A.src = m[f].src, k.push(A)
        }
        clearInterval(vk__adsLight.imagesTimer), vk__adsLight.imagesTimer = setInterval(s.pbind({
            count: 40
        }), 50)
    }, AdsLight.updateExternalStats = function(e) {
        var t;
        t = e && e.getAttribute("external_stats_src") ? [e] : geByClass("ads_ad_external_stats", e);
        for (var i, s = 0; i = t[s]; s++) i.getAttribute("external_stats_complete") || (i.setAttribute("external_stats_complete", 1), vkImage().src = i.getAttribute("external_stats_src"))
    }, AdsLight.addAdsToApply = function(e) {
        var t;
        window.cur ? (window.cur.adsIdsApplyNeeded || (window.cur.adsIdsApplyNeeded = {}), t = window.cur.adsIdsApplyNeeded) : t = vk__adsLight.adsIdsApplyNeeded;
        for (var i in e) t[i] = e[i];
        AdsLight.applyAds()
    }, AdsLight.applyAds = function(e) {
        function t() {
            for (var e in a) {
                var t = ge(e);
                if (t) {
                    if (elemRect = t.getBoundingClientRect(), elemRect.bottom > 0 && elemRect.top < lastWindowHeight) {
                        var s = document.elementFromPoint(elemRect.left + 1, elemRect.top + 1),
                            d = document.elementFromPoint(elemRect.right - 1, elemRect.bottom - 1),
                            n = s && (s === t || isAncestor(s, t)) || d && (d === t || isAncestor(d, t));
                        if (n) {
                            vk__adsLight.adsIdsApplyProcess.push(a[e][0]), delete a[e];
                            continue
                        }
                    }
                    a[e][1] && (vkNow() - vk.started) / 1e3 > a[e][1] && (re(t), delete a[e])
                } else delete a[e]
            }
            i()
        }

        function i(e) {
            if (0 != vk__adsLight.adsIdsApplyProcess.length && !vk__adsLight.adsIdsApplyLocked) {
                if (!e) return clearTimeout(vk__adsLight.adsIdsApplyTimer), void(vk__adsLight.adsIdsApplyTimer = setTimeout(i.pbind(!0), 100));
                vk__adsLight.adsIdsApplyLocked = !0;
                var t = {};
                t.ads_ids_apply = vk__adsLight.adsIdsApplyProcess.join(";"), cur && cur.adsDelayedViewsSrc && (t.ads_src = cur.adsDelayedViewsSrc), vk__adsLight.adsIdsApplyProcess = [], ajax.post("/ads_light.php?act=apply_views", t, {
                    onDone: s,
                    onFail: s
                })
            }
        }

        function s(e) {
            if (vk__adsLight.adsIdsApplyLocked = !1, e && isObject(e)) {
                for (var t in e) {
                    var i = ge("ads_ad_box2_" + t);
                    if (i)
                        for (var s in e[t]) i.setAttribute(s, e[t][s])
                }
                AdsLight.applyAds()
            }
        }
        var a = window.cur && window.cur.adsIdsApplyNeeded || vk__adsLight.adsIdsApplyNeeded || {};
        if (!isEmpty(a)) return e ? void t() : (clearTimeout(vk__adsLight.adsIdsApplyTimer), void(vk__adsLight.adsIdsApplyTimer = setTimeout(AdsLight.applyAds.pbind(!0), 100)))
    }, AdsLight.isVisibleBlockWrap = function(e) {
        function t(e) {
            vk__adsLight.wrapVisible = e
        }
        var i = ge("ads_left"),
            s = i.getBoundingClientRect(),
            a = [];
        return s.right && s.bottom && (a.push([s.left + 1 * (s.right - s.left) / 5, s.top + 1 * (s.bottom - s.top) / 5]), a.push([s.left + 4 * (s.right - s.left) / 5, s.top + 4 * (s.bottom - s.top) / 5])), AdsLight.isVisibleBlockWrapCoords(a, i, t, e), vk__adsLight.wrapVisible
    }, AdsLight.isVisibleBlockWrapCoords = function(e, t, i, s) {
        function a(e, t) {
            if (!e || !t) return !1;
            for (; e = e.parentNode;)
                if (e === t) return !0;
            return !1
        }
        for (var d = !1, n = [], o = 0, r = e.length; r > o; o++) {
            var l = document.elementFromPoint(e[o][0], e[o][1]),
                g = l && (l === t || a(l, t)),
                d = d || g;
            g && n.push(e[o])
        }
        d = !!d;
        var h, c = function(e) {
            clearTimeout(h), i(void 0 !== e ? e : d)
        };
        !s && n.length && window != parent && isVkDomain && "web" === vk__adsLight.adsSection && vk__adsLight.rpc && vk__adsLight.rpc.callMethod ? (vk__adsLight.rpc.callMethod("publish", "ads.isVisibleBlockWrap", n, c), h = setTimeout(c, 300)) : !s && n.length && window != parent && !isVkDomain && window.VK && VK.callMethod ? (VK.callMethod("adsPublish", "ads.isVisibleBlockWrap", n, c), h = setTimeout(c, 300)) : c()
    }, AdsLight.isVisibleBlockWrapRpc = function(e, t, i) {
        var s;
        s = i ? VK.Widgets.RPC[i].frame : cur.app.frame;
        for (var a = s.getBoundingClientRect(), d = [], n = 0, o = e.length; o > n; n++) {
            var r = e[n][0] + a.left,
                l = e[n][1] + a.top;
            d.push([r, l])
        }
        AdsLight.isVisibleBlockWrapCoords(d, s, t)
    }, AdsLight.getBlockSize = function(e) {
        var t = geByClass("ads_ad_box", e),
            i = geByClass("ads_ad_box5", e);
        each(i, function(e, t) {
            addClass(t, "max_size")
        }), browserLight.msie8 && each(t, function(e, t) {
            var i = Math.ceil(floatval(getStyle(t, "width"))),
                s = Math.ceil(floatval(getStyle(t, "max-width")));
            s && s > 200 && i >= s && (t.style.width = s + "px")
        });
        var s = Math.ceil(floatval(getStyle(e, "width"))),
            a = Math.ceil(floatval(getStyle(e, "height"))),
            d = [s, a];
        return each(i, function(e, t) {
            removeClass(t, "max_size")
        }), d
    }, AdsLight.resizeBlockWrap = function(e, t, i, s) {
        if (!e) return [0, 0];
        var a = e[0],
            d = e[1];
        a && vk__adsLight.adsParams && vk__adsLight.adsParams.ads_ad_unit_width_real > a && (a = vk__adsLight.adsParams.ads_ad_unit_width_real), d && vk__adsLight.adsParams && vk__adsLight.adsParams.ads_ad_unit_height_real > d && (d = vk__adsLight.adsParams.ads_ad_unit_height_real);
        var n = !!(s || t && a > t[0] || i && i[0] && a > i[0]),
            o = !!(s || t && d > t[1] || i && i[1] && d > i[1]);
        return n || o ? (i && (n && (i[0] = a), o && (i[1] = d)), isVkDomain && "web" === vk__adsLight.adsSection && vk__adsLight.rpc && vk__adsLight.rpc.callMethod && vk__adsLight.rpc.callMethod("resizeWidget", n && a, o && d), [a, d]) : [a, d]
    }, AdsLight.loadAds = function() {
        function onComplete(response, nothing, js) {
            if (vk__adsLight.updateProgress = 3, response && isObject(response) && "ads_html" in response) {
                var styleElemOld = ge("ads_style_web_loader"),
                    sheetOld = styleElemOld.sheet ? styleElemOld.sheet : styleElemOld.styleSheet,
                    deleteFunc = sheetOld.deleteRule ? "deleteRule" : "removeRule";
                sheetOld[deleteFunc](0);
                var styleElemNew = ce("style", {
                    type: "text/css"
                });
                styleElemNew.styleSheet ? styleElemNew.styleSheet.cssText = response.css : styleElemNew.appendChild(document.createTextNode(response.css)), headNode.appendChild(styleElemNew), AdsLight.setNewBlock(response.ads_html, response.ads_section, response.ads_can_show, response.ads_showed, response.ads_params);
                var adsParamsExport = response.ads_params_export;
                if (adsParamsExport.ads_params_unclean) {
                    delete adsParamsExport.ads_params_unclean;
                    for (var i in adsParamsExport) adsParamsExport[i] = unclean(adsParamsExport[i])
                }
                vk__adsLight.rpc.callMethod("adsOnInit", response.ads_count, adsParamsExport), vk__adsLight.loadComplete = 2
            } else {
                if ("string" == typeof js) try {
                    eval(js)
                } catch (e) {
                    debugLog(e)
                }
                AdsLight.loadAdsFailed(-3001, adsParamsExport)
            }
        }
        if (isVkDomain && vk__adsLight.loaderParams && !vk__adsLight.loadComplete) {
            vk__adsLight.loadComplete = 1;
            var adsParamsExport = vk__adsLight.adsParamsExport;
            delete vk__adsLight.adsParamsExport;
            var ajaxParams = {};
            for (var i in vk__adsLight.loaderParams) ajaxParams[i] = vk__adsLight.loaderParams[i];
            ajaxParams.url = document.referrer;
            try {
                ajaxParams.url_top = top.location.toString()
            } catch (e) {}
            var isVisibleWeb = AdsLight.isVisibleBlockWrap(!0);
            isVisibleWeb || (ajaxParams.web_invisible = 1), document.documentMode && (ajaxParams.ie_document_mode = document.documentMode), AdsLight.doRequest(function() {
                ajaxParams.ads_showed = AdsLight.getAdsShowed(), ajax.post("/ads_rotate.php?act=ads_web", ajaxParams, {
                    onDone: onComplete,
                    onFail: onComplete
                })
            })
        }
    }, AdsLight.loadAdsFailed = function(e, t) {
        if (!vk__adsLight.rpc) return !1;
        if (-1 === vk__adsLight.loadComplete) return !0;
        if (vk__adsLight.loadComplete = -1, t.ads_params_unclean) {
            delete t.ads_params_unclean;
            for (var i in t) t[i] = unclean(t[i])
        }
        return vk__adsLight.rpc.callMethod("resizeWidget", 0, 0), vk__adsLight.rpc.callMethod("adsOnInit", e, t), !0
    }, AdsLight.handleAllAds = function(e, t, i, s) {
        function a() {
            removeEvent(boxLayerWrap, "scroll", o), hide("ads_ads_all_ads_more")
        }

        function d() {
            var e = window.cur && window.cur.adsIdsApplyNeeded || vk__adsLight.adsIdsApplyNeeded || {};
            !t && isEmpty(e) && a()
        }

        function n(e) {
            return e ? (AdsLight.addAdsToApply(i), void o()) : void setTimeout(n.pbind(!0), 500)
        }

        function o() {
            var e = ge("ads_ads_all_ads_more");
            if (e) {
                var t = e.getBoundingClientRect();
                t.top < lastWindowHeight + s && (c = Math.round(Math.max(c, lastWindowHeight - t.top + s)), r()), AdsLight.applyAds(), d()
            }
        }

        function r(e) {
            if (!e) return void setTimeout(r.pbind(!0), 100);
            if (t && c && !h) {
                h = !0;
                var i = {};
                i.ads_more = t, i.ads_height = c, ajax.post("/ads_light.php?act=all_ads_more", i, {
                    onDone: l,
                    onFail: g
                })
            }
        }

        function l(e) {
            if (h = !1, !e) return void g();
            if (t = e.ads_more, AdsLight.addAdsToApply(e.ads_ids_apply), e.ads_html) {
                var i = ge("ads_ads_all_ads_rows"),
                    s = ge("ads_ads_all_ads_more");
                i && (i.innerHTML += e.ads_html, c = !1, o()), s && (s.height = e.ads_more_height)
            }
            d()
        }

        function g() {
            return h = !1, !0
        }
        var h = !1,
            c = !1;
        boxLayerWrap.scrollTop = 0;
        var _ = {};
        _.onClean = a, e.setOptions(_), t && addEvent(boxLayerWrap, "scroll", o), n(), o()
    }, AdsLight.blockOverOut = function(e, t, i) {
        var s, a = "mouseover" === e.type,
            d = !1;
        if (hasClass(t, i) ? (s = t, toggleClass(s, "over", a), d = a ? 1 : .3) : (s = geByClass1(i, s), s.over = 1, hasClass(s, "over") || (d = a ? .3 : 0)), d !== !1 && animate(s, {
                opacity: d
            }, 200), a && t == s) {
            var n = geByClass1("tooltip_text", s);
            n && showTooltip(s, {
                text: n.innerHTML,
                showdt: 0,
                black: 1,
                shift: [14, 3, 3]
            })
        }
    }, AdsLight.closeNewsBlock = function(e, t, i) {
        function s() {
            return !0
        }
        for (; !hasClass(e, "feed_row");) e = e.parentNode;
        slideUp(e, 200), ajax.post("/ads_light.php?act=close_news", {
            hash: t,
            ads_section: i
        }, {
            onDone: s,
            onFail: s
        })
    }, AdsLight.scrollToPreview = function(e) {
        if (!e) return void setTimeout(AdsLight.scrollToPreview.pbind(!0), 100);
        var t = geByClass1("ads_ads_preview");
        if (t && !hasClass(t, "ads_ads_preview_viewed")) {
            addClass(t, "ads_ads_preview_viewed");
            var i = scrollGetY(),
                s = getXY(t)[1],
                a = getSize(t)[1],
                d = vk.staticheader ? 0 : getSize("page_header_cont")[1];
            (s + a > i + lastWindowHeight || i + d > s) && (a >= lastWindowHeight - d ? scrollToY(s - 10, 500) : scrollToY(s - (lastWindowHeight - a) / 2, 500))
        }
    }, AdsLight.overrideClickEvents = function(e, t, i) {
        function s(e) {
            var t = !1;
            if (e = normEvent(e), !l)
                if ("mouseup" == e.type && (2 == e.which || 1 == e.which && checkEvent(e))) {
                    if ("A" == e.target.nodeName && e.target.hasAttribute("href") && "#" !== e.target.getAttribute("href")) return !0;
                    l = !0, setTimeout(function() {
                        l = !1
                    }, 100), d(e)
                } else "click" == e.type && 1 == e.which && (t = a(e));
            return i && !t ? !0 : cancelEvent(e)
        }
        if (!e) return !1;
        var a = e.getAttribute("onclick_inside"),
            d = e.getAttribute("onclick_outside");
        if (!d) return !1;
        if (a = new Function("event", a || d), d = new Function("event", d), !i)
            for (var n, o = geByTag("a", e), r = 0; n = o[r]; r++) n.setAttribute("_href", n.href), n.removeAttribute("href");
        var l = !1;
        return addEvent(e, "click dblclick mousedown mouseup touchstart touchmove touchend", s, !1, !1, !0), t || cur.destroy.push(function(e) {
            cleanElems(e)
        }.pbind(e)), !0
    }, AdsLight.initYaDirect = function(e) {
        vk__adsLight.yaDirectLoadTries++, vk__adsLight.yaDirectLoading || (vk__adsLight.yaDirectLoading = !0, function(t, i, s, a, d) {
            t[s] = t[s] || [], t[s].push(function() {
                vk__adsLight.yaDirectLoaded = !0, vk__adsLight.yaDirectLoading = !1
            }), d = i.getElementsByTagName("script")[0], a = i.createElement("script"), a.type = "text/javascript", a.src = e ? e : "//an.yandex.ru/system/context.js", a.async = !0, d.parentNode.insertBefore(a, d)
        }(window, window.document, "yandexContextAsyncCallbacks"))
    }, AdsLight.tryRenderYaDirect = function(e, t, i, s) {
        if (vk__adsLight.yaDirectLoaded) {
            var a, d = "yandex_ad_" + e;
            if (ge(d)) return void animate(ge(d), {
                opacity: 0
            }, 200, function() {
                re(d), AdsLight.tryRenderYaDirect(e, t, i, s)
            });
            a = ce("div", {
                id: d
            });
            var n = ge("ads_left");
            if (!n) return AdsLight.sendExperimentStat(t, "fail"), void AdsLight.onYaDirectRenderUnsuccessful(s);
            n.appendChild(a), a = ge(d), Ya.Context.AdvManager.render({
                blockId: e,
                renderTo: d,
                async: !0,
                onRender: function() {
                    i && !geByClass1("ads_label", a) && a.insertBefore(se(i), a.firstChild), AdsLight.sendExperimentStat(t, "success"), AdsLight.onYaDirectRenderSuccessful(a)
                }
            }, function() {
                AdsLight.sendExperimentStat(t, "fail"), AdsLight.onYaDirectRenderUnsuccessful(s)
            }), AdsLight.sendExperimentStat(t, "try")
        }
    }, AdsLight.onYaDirectRenderSuccessful = function(e) {
        if (vk__adsLight.yaCloseLink) {
            var t = se('<div id="ya_direct" style="display:none;" onmouseover="leftBlockOver(\'ya_direct\');" onmouseout="leftBlockOut(\'ya_direct\');"><div id="left_hideya_direct" class="left_hide_button" onmouseover="leftBlockOver(this);" onmouseout="leftBlockOut(this);" onclick="leftAdBlockClose(\'ya_direct\', \'' + vk__adsLight.yaCloseLink + "'); return cancelEvent(event);\"></div></div>");
            t.appendChild(e), e = t
        }
        AdsLight.showNewBlock(ge("ads_left"), e, !0), vk__adsLight.yaDirectAdActive = !0
    }, AdsLight.onYaDirectRenderUnsuccessful = function(e) {
        vk__adsLight.yaDirectAdActive = !1, AdsLight.tryExperiment(e)
    }, AdsLight.tryRenderCriteo = function(e, t) {
        var i = "criteo-iframe",
            s = ge(i);
        return s ? void animate(s, {
            opacity: 0
        }, 200, function() {
            re(s), AdsLight.tryRenderCriteo(t)
        }) : (AdsLight.sendExperimentStat(e, "try"), s = ce("iframe", {
            id: i,
            frameBorder: "0",
            marginWidth: "0",
            marginHeight: "0",
            height: "0",
            width: "118",
            scrolling: "no"
        }, {
            opacity: 0
        }), s.onload = function() {
            s.contentDocument.body.scrollHeight > 400 ? (AdsLight.sendExperimentStat(e, "success"), s.height = 600, animate(s, {
                opacity: 1
            }, 200)) : (AdsLight.sendExperimentStat(e, "fail"), re(s), AdsLight.tryExperiment(t))
        }, s.src = "/ads_light.php?act=criteo", void ge("ads_left").appendChild(s))
    }, AdsLight.initWmg = function() {
        if (vk__adsLight.wmgLoadTries++, !vk__adsLight.wmgLoading) {
            vk__adsLight.wmgLoading = !0;
            var e = geByTag1("script"),
                t = ce("script", {
                    type: "text/javascript",
                    async: !0,
                    src: "https://securepubads.g.doubleclick.net/static/glade.js"
                });
            e.parentNode.insertBefore(t, e), vk__adsLight.wmgLoading = !1
        }
    }, AdsLight.tryRenderWmg = function(e, t) {
        if (!vk__adsLight.wmgLoading) {
            if (vk__adsLight.wmgLoading = !0, AdsLight.sendExperimentStat(e, "try"), !vk__adsLight.showWmgAd || !(window && window.glade && glade.run)) return void AdsLight.onWmgRenderUnsuccessful(e, t);
            var i = ge("ads_left");
            if (!i) return void AdsLight.onWmgRenderUnsuccessful(e, t);
            var s = AdsLight.getWmgDivId(i),
                a = AdsLight.addWmgBlock(s);
            i.appendChild(a), a.addEventListener("gladeAdFetched", AdsLight.onLoadWmgAd.pbind(e, t)), a.addEventListener("gladeAdRendered", AdsLight.onRenderWmgAd.pbind(s, a, i, e, t)), glade.run()
        }
    }, AdsLight.getWmgDivId = function(e) {
        var t = "glade-aslot-1";
        return e.innerHTML ? (ge("glade-aslot-1") && (t = "glade-aslot-2"), t) : t
    }, AdsLight.addWmgBlock = function(e) {
        var t = ce("div", {
            id: e
        }, {
            display: "none",
            opacity: 0
        });
        return t.setAttribute("data-ad-unit-path", "/205338224/120x600_vk.com"), t.setAttribute("data-click-url", "vk.com"), t.setAttribute("data-glade", !0), t.setAttribute("width", "120"), t.setAttribute("height", "600"), t
    }, AdsLight.onLoadWmgAd = function(e, t, i) {
        vk__adsLight.wmgLoadTries = 0, i && i.detail && !i.detail.empty || (vk__adsLight.showWmgAd = !1, AdsLight.onWmgRenderUnsuccessful(e, t))
    }, AdsLight.onRenderWmgAd = function(e, t, i, s, a) {
        vk__adsLight.showWmgAd && AdsLight.onWmgRenderSuccessful(e, t, i, s, a)
    }, AdsLight.onWmgRenderUnsuccessful = function(e, t) {
        vk__adsLight.wmgLoading = !1, AdsLight.wmgMessageCallback && removeEventListener("message", AdsLight.wmgMessageCallback), AdsLight.sendExperimentStat(e, "fail"), AdsLight.tryExperiment(t)
    }, AdsLight.onWmgRenderSuccessful = function(e, t, i, s, a) {
        vk__adsLight.wmgLoading = !1, AdsLight.sendExperimentStat(s, "success"), t.removeEventListener("gladeAdFetched", AdsLight.onLoadWmgAd.pbind(s, a)), t.removeEventListener("gladeAdRendered", AdsLight.onRenderWmgAd.pbind(e, t, i, s, a)), AdsLight.showWmgAfterFetch(e, t, i)
    }, AdsLight.showWmgAfterFetch = function(e, t, i) {
        setStyle("ads_left", {
            overflow: "hidden"
        }), setStyle(e, {
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0,
            zIndex: 10,
            width: "100%"
        });
        var s = AdsLight.getBlockSize(i),
            a = [0, 0],
            d = geByClass1("ads_ads_box3", t) || t,
            n = AdsLight.getBlockSize(d);
        n = AdsLight.resizeBlockWrap(n, s, a), animate("ads_left", {
            width: n[0],
            height: n[1]
        }, 200, function() {
            AdsLight.cleanAdBlockForWmg(e, t, i)
        })
    }, AdsLight.cleanAdBlockForWmg = function(e, t, i) {
        removeClass(i, "ads_left_empty"), animate(e, {
            opacity: 1
        }, 200, function() {
            if (i.innerHTML)
                for (var s = 0, a = i.childNodes.length; a > s; s++) {
                    var d = i.childNodes[s] ? i.childNodes[s].getAttribute("id") : "";
                    if (d && d === e) return;
                    var n = i.childNodes[s];
                    animate(n, {
                        opacity: 0
                    }, 200, function(e) {
                        re(e), AdsLight.showWmgBlock(t, i)
                    })
                }
        })
    }, AdsLight.showWmgBlock = function(e, t) {
        setStyle(e, {
            position: "static",
            zIndex: "",
            width: ""
        }), setStyle(t, {
            width: "",
            height: "",
            overflow: "visible"
        })
    }, AdsLight.getRBAds = function(e, t, i, s) {
        function a(t, i, a) {
            clearTimeout(d), d = setTimeout(function() {
                a({
                    reason: "timeout"
                })
            }, g), window[n] = function(t) {
                if (clearTimeout(d), t && t[0] && t[0].html) {
                    try {
                        var n = ge(e),
                            o = n && isVisible(n) || vk.ad_preview;
                        if (!n) {
                            var r = ge("side_bar");
                            if (!r) return AdsLight.resizeBlockWrap([0, 0], !1, !1, !0), void a({
                                reason: "no-side-bar"
                            });
                            n = r.appendChild(ce("div", {
                                id: "ads_left",
                                className: "ads_left_empty"
                            }, {
                                display: o ? "block" : "none"
                            }))
                        }
                        AdsLight.showNewBlock(n, (s.label ? s.label : "") + t[0].html, o)
                    } catch (l) {}
                    i(t)
                } else a({
                    reason: "no-ads"
                })
            };
            var o = document.createElement("script");
            o.src = t, document.getElementsByTagName("head")[0].appendChild(o)
        }
        var d, n = "__rb" + (new Date).getTime(),
            o = s.slot_id,
            r = "https://ad.mail.ru/adq/?callback=" + n + "&q%5B%5D=" + o + "%3Fn%3D" + encodeURIComponent(e),
            l = {},
            g = 5e3;
        s && s.test_id && (l.test_id = s.test_id), s && s.cpm_floor && "0" != s.cpm_floor && (l.cpm_floor = s.cpm_floor), s && s.vk_id && (l.vk_id = s.vk_id), s && s.count && (l.count = s.count);
        var h;
        for (h in l) r += "&" + h + "=" + l[h];
        return a(r, t, i), n
    }, AdsLight.tryRenderTarget = function(e, t, i, s, a, d, n, o, r) {
        function l(e) {
            var t = ge(_);
            if (t) {
                var i = geByClass1("trg-b-banner-block", t);
                return i || isArray(e) && isObject(e[0]) && e[0].banner && (i = ge("b" + e[0].banner)), i
            }
        }
        var g = {
            slot_id: t,
            label: s,
            cpm_floor: a,
            test_id: d,
            count: n
        };
        e && (g.test_id = e), window.vk && vk.id && (g.vk_id = vk.id), AdsLight.sendExperimentStat(i, "try");
        var h = !1,
            c = setTimeout(function() {
                AdsLight.sendExperimentStat(i, "noresult"), h && window[h] && (window[h] = function() {}), AdsLight.tryExperiment(r)
            }, 6e3),
            _ = "ads_left";
        stManager.add(["mrtarg.js", "mrtarg.css"], function() {
            h = AdsLight.getRBAds(_, function(e) {
                clearTimeout(c), AdsLight.sendExperimentStat(i, "success"), window.RB && window.RB.doCheck && window.RB.doCheck();
                var t = l(e);
                if (t) {
                    var s = ["rbccl", t.getAttribute("c"), t.getAttribute("ac"), o].join(";");
                    AdsLight.sendExperimentStat(i, "extra", s)
                }
            }, function(e) {
                clearTimeout(c), AdsLight.sendExperimentStat(i, "fail"), AdsLight.tryExperiment(r)
            }, g)
        })
    }, AdsLight.initGADX = function(e, t, i, s) {
        if (vk__adsLight.gadxLoadTries++, !vk__adsLight.gadxLoading && !vk__adsLight.gadxLoaded) {
            vk__adsLight.gadxLoading = !0, vk__adsLight.gadxBlocks = t;
            var a = window.document.getElementsByTagName("script")[0],
                d = window.document.createElement("script");
            d.type = "text/javascript", d.src = "//www.googletagservices.com/tag/js/gpt.js", d.async = !0, a.parentNode.insertBefore(d, a), window.googletag = window.googletag || {}, googletag.cmd = googletag.cmd || [], vk__adsLight.gadxSlots = {}, googletag.cmd.push(function() {
                each(t, function(t, i) {
                    var s = googletag.defineSlot(e, ["fluid"], i);
                    vk__adsLight.gadxSlots[i] = s, s.addService(googletag.pubads())
                }), googletag.pubads().enableSingleRequest(), googletag.pubads().addEventListener("slotRenderEnded", function(e) {
                    AdsLight.initGADXRenderFinished(e, i, s)
                }), googletag.pubads().disableInitialLoad(), googletag.enableServices(), vk__adsLight.gadxLoaded = !0, vk__adsLight.gadxLoading = !1
            })
        }
    }, AdsLight.initGADXRenderFinished = function(e, t, i) {
        setTimeout(function() {
            var s = e.slot.getSlotElementId(),
                a = AdsLight.getGADXBusyBlockID(s),
                d = e.isEmpty;
            d ? (a && (animate(ge(a), {
                maxHeight: 0
            }, 300, function() {
                re(a)
            }), animate(ge("ads_left"), {
                minHeight: 0,
                maxHeight: 400
            }, 300, function() {
                setStyle(ge("ads_left"), {
                    minHeight: "",
                    maxHeight: ""
                })
            })), re(s), AdsLight.sendExperimentStat(t, "fail"), AdsLight.tryExperiment(i)) : (a ? (setStyle(ge(s), {
                maxHeight: "",
                opacity: .01
            }), animate(ge(s), {
                opacity: 1
            }, 200), animate(a, {
                opacity: 0
            }, 200, function() {
                re(a)
            }), animate(ge("ads_left"), {
                minHeight: 0,
                maxHeight: 400
            }, 300, function() {
                setStyle(ge("ads_left"), {
                    minHeight: "",
                    maxHeight: ""
                })
            })) : animate(ge(s), {
                maxHeight: 400
            }, 300, function() {}), AdsLight.sendExperimentStat(t, "success"))
        }, 500)
    }, AdsLight.getGADXFreeBlockID = function() {
        var e;
        for (var t in vk__adsLight.gadxBlocks)
            if (e = vk__adsLight.gadxBlocks[t], !ge(e)) return e;
        return !1
    }, AdsLight.getGADXBusyBlockID = function(e) {
        var t;
        for (var i in vk__adsLight.gadxBlocks)
            if (t = vk__adsLight.gadxBlocks[i], (!e || e !== t) && ge(t)) return t;
        return !1
    }, AdsLight.checkWmgMessage = function(e, t, i, s) {
        "ads_wmg_no_ad" === e.data && AdsLight.onWmgRenderUnsuccessful(t, i.slice(s + 1))
    }, AdsLight.init()
}();
try {
    stManager.done("aes_light.js")
} catch (e) {}