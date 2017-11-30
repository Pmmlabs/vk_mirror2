var WkView = {
    init: function() {
        window.wkLayer || (window.wkLayer = ce("div", {
            id: "wk_layer"
        }), window.wkLayerWrap = ce("div", {
            id: "wk_layer_wrap",
            className: "scroll_fix_wrap fixed layer_wrap js-mediator-container"
        }), wkLayerWrap.appendChild(window.wkLayer), bodyNode.appendChild(wkLayerWrap), window.LazyLoad && LazyLoad.watch(wkLayerWrap), window.wkLayer.style.width = lastWindowWidth - sbWidth() - 2 + "px")
    },
    showLayer: function() {
        layerQueue.hide(), layers.wrapshow(wkLayerWrap, .8), layers.fullhide = WkView.hide, WkView.onScroll(), wkcur.showT = setTimeout(function() {
            layers.wrapshow(wkLayerWrap, .8), layers.fullhide = WkView.hide
        }, 0), onBodyResize()
    },
    restoreLayer: function(e) {
        WkView.showLayer(), wkcur.root ? e.myLoc && nav.setLoc(e.myLoc) : WkView.setLocation(), e.prevLoc && (wkcur.prevLoc = e.prevLoc), WkView.updateSize()
    },
    wikiClick: function(e, r, o) {
        if (checkEvent(r)) return !0;
        o = o || {};
        for (var t = r.target; t && "A" != t.tagName;) t = t.parentNode;
        if (t && "A" == t.tagName) {
            var i = t.href,
                a = i.match(/^\/(page[^?]*)(\?.*)?$/);
            if (a) var w = a[1],
                l = a[4] ? q2ajx(a[4].substr(1)) : {};
            else {
                var a = i.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)\/([^?]*)(\?.*)?$/i);
                if (!a || !a[3]) return !0;
                var w = a[3].split("/"),
                    l = a[4] ? q2ajx(a[4].substr(1)) : {}
            }
            var n = {};
            switch (w[0]) {
                case "pages":
                    n.oid = l.oid || l.o, n.id = l.id, n.p = l.p;
                    break;
                case "ru":
                case "en":
                    n.p = w[1], n.global = w[0];
                    break;
                default:
                    if (w[0].match(/^page-?\d+_\d+$/)) {
                        var l = w[0].substr(4).split("_");
                        n.oid = l[0], n.id = l[1], n = extend(o, n)
                    } else if (w[0].match(/^note\d+_\d+$/)) {
                        var l = w[0].substr(4).split("_");
                        n.w = w[0]
                    }
            }
            if (n.w || n.oid && (n.id || n.p)) return showWiki(n), cancelEvent(r)
        }
    },
    edit: function() {
        if (!wkcur.canEdit) return !0;
        if ("wall" == wkcur.type) return wkcur.edit ? Wall.cancelEdit() : Wall.editPost(ge("wpe_edit" + wkcur.post), wkcur.post, {
            from: "wkview"
        }), !0;
        if (wkcur.edit) {
            if (wkcur.note) var params = {
                w: "note" + wkcur.oid + "_" + wkcur.nid
            };
            else var params = {
                oid: wkcur.oid,
                id: wkcur.pid,
                p: wkcur.p
            };
            return window.wkcur = !1, showWiki(params, !1, !1, {
                noloader: !0
            }), !0
        }
        wkcur.edit = !0;
        var params = {
            act: "edit",
            oid: wkcur.oid,
            load: 1,
            section: "edit"
        };
        wkcur.note ? (params.nid = wkcur.nid, params.note = 1) : params.id = wkcur.pid, wkcur.from && (params.from = wkcur.from), ajax.post("wkview.php", params, {
            stat: ["pages.js", "wk_editor.js", "wk_editor.css"],
            onDone: function(content, js, info, options) {
                wkcur.wkContent.innerHTML = content, hide(wkcur.wkRight), addClass(wkcur.wkBox, "wk_view_no_background"), eval(js), addEvent(wkLayerWrap, "scroll", WkView.onScroll), addEvent(window, "resize", WkView.onResize), WkView.onScroll(), WkView.updateSize()
            }
        })
    },
    onScroll: function(e, r) {
        switch (wkcur.lSTL && WkView.stlOnScroll(r), r || WkView.updateSize(!0), wkcur.type) {
            case "wall":
                return WkView.wallUpdateRepliesOnScroll(r);
            case "likes":
                return WkView.likesOnScroll(r);
            case "history":
                return WkView.historyOnScroll(r);
            case "market":
                if (window.Market) return Market.updateCommentsOnScroll(r);
                break;
            case "story":
                window.Stories && Stories.onResize()
        }
        if (!isFunction(WkView.customOnScroll) || !WkView.customOnScroll(r)) {
            var o = ge("wke_buttons_panel"),
                t = ge("wke_buttons_cont");
            if (o) {
                var i = getXY(t, !0)[1];
                wkcur.bottomSize || (wkcur.bottomSize = getSize(o));
                var a = wkcur.bottomSize[1],
                    w = window.innerHeight || document.documentElement.clientHeight;
                if (r && !wkcur.fixedBottom && i + 20 > w - a) wkLayerWrap.scrollTop += i + 20 - (w - a);
                else if (i > w - a) {
                    if (!wkcur.fixedBottom || r) {
                        wkcur.fixedBottom = !0;
                        var l = getSize(t);
                        addClass(wkcur.wkContent, "wke_bottom_fixed"), setStyle(o, {
                            width: l[0],
                            height: l[1]
                        }), setStyle(t, {
                            paddingTop: l[1]
                        })
                    }
                } else(wkcur.fixedBottom || r) && (wkcur.fixedBottom = !1, removeClass(wkcur.wkContent, "wke_bottom_fixed"), setStyle(o, {
                    width: null,
                    height: null
                }), setStyle(t, {
                    paddingTop: 0
                }));
                var n = ge("wke_controls"),
                    s = ge("wke_controls_cont");
                if (s) {
                    var c = getXY(s, !0);
                    if (c[1] < 0) {
                        if (!wkcur.fixedTop) {
                            wkcur.fixedTop = !0;
                            var k = getSize(s);
                            addClass(wkcur.wkContent, "wke_top_fixed"), setStyle(n, {
                                width: k[0],
                                height: k[1]
                            }), setStyle(s, {
                                paddingTop: k[1]
                            })
                        }
                    } else wkcur.fixedTop && (wkcur.fixedTop = !1, removeClass(wkcur.wkContent, "wke_top_fixed"), setStyle(n, {
                        width: null,
                        height: null
                    }), setStyle(s, {
                        paddingTop: 0
                    }))
                }
            }
        }
    },
    saveInfo: function(autosave) {
        var params = {
            page: wkcur.p,
            hash: wkcur.hash
        };
        return params.Body = wkcur.editor.val(), params.Body === !1 ? !1 : (params = wkcur.note ? extend(params, {
            act: "save",
            oid: wkcur.oid,
            nid: wkcur.nid,
            wysiwyg: 1,
            note: wkcur.note
        }) : extend(params, {
            act: "save",
            oid: wkcur.oid,
            id: wkcur.pid
        }), wkcur.pageTitle && (params.title = val(wkcur.pageTitle)), "page_new" == wkcur.type && (params.page_new = 1), wkcur.from && (params.from = wkcur.from), autosave && (wkcur.lockAutoSave || wkcur.note && curBox()) ? !1 : (wkcur.lockAutoSave = !0, void ajax.post(wkcur.note ? "wkview.php" : "al_pages.php", params, {
            onDone: function(text, data) {
                if (wkcur.lockAutoSave = !1, wkcur.editor.changed = !1, !autosave) {
                    var saveEl = ge("pages_save_info_wysiwyg");
                    saveEl && (saveEl.innerHTML = text, show(saveEl))
                }
                if ("market" == wkcur.from && data) ge("group_edit_market_wiki").innerHTML = data.html, eval(data.js);
                else if (data) {
                    if (data.nid && (wkcur.nid = data.nid), data.raw && (wkcur.wkRaw = data.raw), data.created && cur.chooseMedia) return nav.setLoc(extend(nav.objLoc, {
                        w: "note" + data.raw
                    })), autosave || WkView.hide(!1, !0), cur.pbNoteAdded = data, cur.chooseMedia("note", data.raw, data), !0;
                    var title = ge("share_note_title" + data.raw);
                    if (title && !autosave && (title.innerHTML = data.title), wkcur.note && wkcur.toStatus && !autosave) return WkView.hide(!1, !0), wkcur.reloadOnSave && (boxRefreshCoords(boxLoader), show(boxLoader), show(boxLayerWrap), nav.reload({
                        onDone: function() {
                            hide(boxLoader), hide(boxLayerWrap)
                        }
                    })), !0
                }
                return autosave ? !0 : void setTimeout(function() {
                    saveEl && fadeOut(saveEl, 200)
                }, 1500)
            },
            showProgress: function() {
                !autosave && lockButton(ge("wk_layer_save"))
            },
            hideProgress: function() {
                !autosave && unlockButton(ge("wk_layer_save"))
            },
            onFail: WkView.showError
        })))
    },
    initWkBox: function(title, html, options, script) {
        curBox() && curBox().type && curBox().type == options.type && (curBox().setOptions({
            onHide: !1
        }), curBox().hide());
        var box = showFastBox(extend({
            title: title
        }, options), html);
        options.wkRaw && (box.wkRaw = options.wkRaw), options.type && (box.type = options.type), options.commonClass && addClass(box.bodyNode, options.commonClass), script && eval(script), box.setOptions({
            onHide: function(e) {
                !e && nav.objLoc.w && nav.change({
                    w: !1
                }, void 0, {
                    asBox: !0
                })
            },
            onShow: function() {
                box.wkRaw && (nav.objLoc.w = box.wkRaw, nav.setLoc(nav.objLoc))
            }
        });
        var nl = extend(nav.objLoc, {
            w: options.wkRaw
        });
        return delete nl.z, nav.strLoc != nav.toStr(nl) && nav.setLoc(nl), box
    },
    evalScripts: function(e) {
        if ("SCRIPT" === e.tagName) e.parentNode.replaceChild(this.cloneNode(e), e);
        else
            for (var r = 0, o = e.childNodes; r < o.length;) this.evalScripts(o[r++])
    },
    cloneNode: function(e) {
        var r = ce(e.tagName.toLowerCase());
        r.text = e.innerHTML;
        for (var o = e.attributes.length - 1; o >= 0; o--) r.setAttribute(e.attributes[o].name, e.attributes[o].value);
        return r
    },
    show: function(title, html, options, script, ev) {
        if (options.asBox) return this.initWkBox(title, html, options, script), !0;
        window.wkcur ? (wkcur.shown && !isVisible(wkLayerWrap) && WkView.hide(!0, !0), each(wkcur._hide || [], function(e, r) {
            isFunction(r) && r()
        })) : this.init();
        var hlen = window.wkcur && wkcur.historyLen ? wkcur.historyLen : 0;
        window.wkcur && (wkcur.doBack || options.fromlist) || (hlen += 1);
        var toQueue = options.queue;
        if (toQueue && (layerQueue.push(), options.queue = !1), (window.wkcur || {}).shown && wkcur.root && nav.setLoc(wkcur.prevLoc), window.wkcur = {
                historyLen: hlen,
                _hide: [],
                _show: []
            }, (browser.iphone || browser.ipad) && (cur.wkStartScroll = scrollGetY()), options.edit && (cur._editMode = function() {
                return !0
            }, !window.WkEditor)) return stManager.add(["wk_editor.js", "wk_editor.css"], WkView.show.pbind(title, html, options, script, ev)), !1;
        if (cur.cancelTooltip = !0, window.tooltips && tooltips.hideAll(), boxQueue.hideAll(), isVisible(wkLayerWrap) || (otherList = !0, addEvent(window, "resize", WkView.onResize), addEvent(wkLayerWrap, "click", WkView.onClick), WkView.showLayer()), wkcur.noLocChange = 0, wkcur.noHistory = options.noLocChange, wkcur.hideTitle = options.hide_title ? 1 : 0, wkcur.shown = !0, wkcur.edit && (wkcur.edit = !1), extend(wkcur, options), wkcur.root) cur.nav.push(function(e, r, o, t) {
            return o = nav.toStr(o), o == wkcur.prevLoc ? (WkView.hide(!0), !1) : void 0
        }), !options.noLocChange && options.myLoc && nav.setLoc(options.myLoc);
        else {
            var referrer = document.URL;
            WkView.setLocation(options.noLocChange, toQueue), referrer == document.URL && (referrer = ""), setTimeout(window.comScoreUDM && comScoreUDM.pbind(locProtocol + "//" + location.host + "/wkview.php?comscorekw=pageview_candidate", referrer), 10), options.prevLoc && (wkcur.prevLoc = options.prevLoc)
        }
        ev && ev.pageX && ev.pageY && extend(wkcur, {
            oldX: ev.pageX,
            oldY: ev.pageY,
            oldT: vkNow()
        }), addClass(wkLayerWrap, "wk_dark"), addEvent(wkLayerWrap, "scroll", WkView.onScroll), addClass(layerBG, "wk_dark");
        var content = html,
            hideLeft = wkcur.historyLen > 1 ? "" : "display: none;";
        "wall" == options.type ? (addEvent(window, "resize", WkView.onResize), WkView.wallBeforeInitPost(options)) : options.edit ? addEvent(window, "resize", WkView.onResize) : options && (content = '<div class="wk_text wk_wiki_content' + (options.className ? " " + options.className : "") + '" onclick="return WkView.wikiClick(this, event);">' + content + "</div>"), wkcur.wkCont ? wkcur.wkContent.innerHTML = content : (wkLayer.innerHTML = '<div class="wk_cont">  <div id="wk_box" onclick="wkcur.wkClicked = true;">    <div id="wk_loader"></div>    <a id="wk_close_link" href="javascript: return false;" class="fl_r wk_close_link" onclick="return WkView.hide(false, true, event);">      ' + getLang("global_close") + '    </a>    <div id="wk_summary" class="fl_l"><span class="summary" id="wk_layer_title">' + title + '</span></div>    <div id="wk_content" tabindex="0">' + content + '</div>    <div class="clear"></div>  </div>  </div><div id="wk_left_wrap"><div id="wk_left" style="' + hideLeft + '" class="wk_left no_select"></div></div><div class="wk_left_nav no_select" id="wk_left_nav" style="' + hideLeft + '" onmousedown="wkcur.wkClicked = true; WkView.back();" onselectstart="return cancelEvent(event);"></div><div class="wk_right_nav no_select" id="wk_right_nav" onmousedown="if (!wkcur.noClickHide) { wkcur.wkClicked = true; WkView.hide(); }"><div id="wk_right" class="wk_close no_select"><div class="wk_close_inner"></div></div></div><div id="wk_left_arrow_bg" class="wk_arrow_bg no_select" onclick="return WkView.navigate(this, event, -1);" onmouseover="WkView.preloadArrow(false)"><div class="wk_arrow_bg_inner"></div><div id="wk_left_arrow" class="wk_arrow no_select"></div></div><div id="wk_right_arrow_bg" class="wk_arrow_bg no_select" onclick="return WkView.navigate(this, event, 1);" onmouseover="WkView.preloadArrow(true)"><div class="wk_arrow_bg_inner"></div><div id="wk_right_arrow" class="wk_arrow no_select"></div></div>', options.nocross && re(geByClass1("wk_close_inner", wkLayer)), extend(wkcur, {
            wkCont: wkLayer.firstChild,
            wkBox: ge("wk_box"),
            mvLoader: ge("wk_loader"),
            wkContent: ge("wk_content"),
            wkLeftNav: ge("wk_left_nav"),
            wkRightNav: ge("wk_right_nav"),
            wkLeft: ge("wk_left"),
            wkLeftWrap: ge("wk_left_wrap"),
            wkRight: ge("wk_right"),
            wkLeftArrow: ge("wk_left_arrow"),
            wkRightArrow: ge("wk_right_arrow"),
            wkLeftArrowBg: ge("wk_left_arrow_bg"),
            wkRightArrowBg: ge("wk_right_arrow_bg")
        }), "away" == options.wkRaw.substr(0, 4) && (this.evalScripts(wkLayer), setTimeout(function() {
            window._mediator && window._mediator.start({
                url: location.pathname + location.search
            })
        }, 1500))), toggle("wk_summary", title), wkcur.commonClass ? addClass(wkcur.wkBox, wkcur.commonClass) : wkcur.wkBox.className = "", wkcur.noCloseIcon && hide(wkcur.wkRight), wkcur.oid && wkcur.pid && (WkView.initSTL(), options.edit || (addEvent(wkLayerWrap, "scroll", WkView.onScroll), addEvent(window, "resize", WkView.onResize))), options.overflow ? addClass(wkcur.wkBox, "wk_overflow_hidden") : removeClass(wkcur.wkBox, "wk_overflow_hidden"), script && eval(script), WkView.updateSize(), removeEvent(document, "keydown", WkView.onKeyDown), addEvent(document, "keydown", WkView.onKeyDown), options.onLoaded && options.onLoaded(), shortCurrency(), WkView.updateArrows(), wkcur.wkContent.focus(), wkLayerWrap.scrollTop = 0, "wall" == options.type ? WkView.wallAfterInitPost() : options.toScroll ? (wkLayerWrap.scrollTop = options.toScroll, wkcur.toScroll = 0) : wkLayerWrap.scrollTop = 0, options.fromlist && WkView.preloadArrow(1 == options.fromlist), getAudioPlayer().updateCurrentPlaying(), window.updateAriaElements && updateAriaElements();
        var postLargeGif = domByClass(wkLayer, "page_gif_large");
        return postLargeGif && Page.showGif(domFC(postLargeGif)), window.LazyLoad && LazyLoad.scanDelayed(), !1
    },
    hide: function(e, r, o) {
        if (window.wkcur && (r || wkcur.shown)) {
            var t = !wkcur.wkRaw.match(/^recom_apps\d+$/) && !wkcur.wkRaw.match(/^app\d+$/);
            if ("story" == wkcur.type && !r && window.Stories && !e) return Stories.hideLayer();
            if (clearTimeout(wkcur.autosaveTimeout), clearTimeout(wkcur.showT), r || !wkcur.edit || !wkcur.editor || !wkcur.editor.changed) {
                each(wkcur._hide || [], function(e, r) {
                    isFunction(r) && r()
                });
                var i = !1;
                if (isVisible(wkLayerWrap) && (setTimeout(layerQueue.pop, 0), i = layerQueue.count() && "wiki" == layerQueue._layers[layerQueue._layers.length - 1][0] && !layerQueue._bl, i || (layers.wraphide(wkLayerWrap), layers.fullhide = !1)), window.tooltips && tooltips.destroy(this), removeEvent(document, "keydown", WkView.onKeyDown), removeClass(wkcur.wkContent, "wke_top_fixed"), wkcur.fixedTop = wkcur.fixedBottom = !1, i || (removeClass(wkLayerWrap, "wk_dark"), removeClass(layerBG, "wk_dark"), wkcur.shown = !1, removeEvent(wkLayerWrap, "click", WkView.onClick), removeEvent(wkLayerWrap, "scroll", WkView.onScroll), wkcur.wkContent.innerHTML = ""), wkcur.wkClicked = !1, wkcur.hideTitle = !1, wkcur.changeCanvasSize = !1, wkcur.onHide && isFunction(wkcur.onHide) && wkcur.onHide(), cur._editMode = !1, wkcur.root && e !== !0 ? WkView.backLocation() : wkcur.noLocChange || e === !0 ? t && __adsUpdate() : (2 === e ? nav.setLoc(hab.getLoc()) : WkView.backLocation(), t && __adsUpdate("lazy")), browser.iphone || browser.ipad) {
                    var a = scrollGetY();
                    Math.abs(a - cur.wkStartScroll) > 500 && scrollToY(cur.wkStartScroll, 0)
                }
                return delete wkcur.historyLen, getAudioPlayer().updateCurrentPlaying(), cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), window._mediator && window._mediator.isActive() && window._mediator.stop(), !1
            }
            if (wkcur.note && wkcur.toStatus && !e) return void WkView.saveInfo();
            var w = showFastBox(wkcur.lang.pages_close_title, wkcur.lang.pages_close_text, getLang("box_yes"), function() {
                w.hide(), WkView.hide(e, !0)
            }, getLang("box_no"))
        }
    },
    cmp: function(e, r) {
        var o = e.length,
            t = r.length;
        return t > o ? -1 : o > t ? 1 : r > e ? -1 : e > r ? 1 : 0
    },
    onClick: function(e) {
        if (wkcur.wkClicked || wkcur.noClickHide || e && cur.__mdEvent && e.target != cur.__mdEvent.target) return void(wkcur.wkClicked = !1);
        var r = Math.abs(e.pageX - intval(wkcur.oldX)),
            o = Math.abs(e.pageY - intval(wkcur.oldY));
        (r > 3 || o > 3) && vkNow() - intval(wkcur.oldT) > 300 && WkView.hide()
    },
    onKeyDown: function(e) {
        if (e = e || window.event, e.returnValue === !1) return !1;
        if (!cur.pvShown && e.keyCode == KEY.ESC) return WkView.hide(), cancelEvent(e);
        if (!(cur.pvShown || wkcur.edit || e.keyCode != KEY.LEFT && e.keyCode != KEY.RIGHT)) {
            var r = e && e.target || e.srcElement;
            return r && ("TEXTAREA" == r.tagName || "INPUT" == r.tagName || "DIV" == r.tagName && r.contentEditable && "inherit" != r.contentEditable) ? !0 : (WkView.navigate(null, e, e.keyCode == KEY.RIGHT ? 1 : -1), cancelEvent(e))
        }
        if (WkView.canEdit) {
            if (83 == e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) return WkView.saveInfo(), cancelEvent(e);
            if ((10 == e.keyCode || 13 == e.keyCode && (e.ctrlKey || e.metaKey && browser.mac)) && WkView.saveInfo(), cur.updTimeout) return;
            cur.updTimeout = setTimeout(function() {
                WkView.onResize(), cur.updTimeout = !1
            }, 200)
        }
    },
    onResize: function() {
        var e = lastWindowWidth,
            r = lastWindowHeight,
            o = sbWidth(),
            t = e - o - 2 - 120 - 34 - 50,
            i = r - 31 - 28 - 72;
        t > 1280 ? t = 1280 : t > 807 && 907 > t ? t = 807 : 604 > t && (t = 604), 453 > i && (i = 453), wkcur.mvWidth = t, wkcur.mvHeight = i;
        var a = !1,
            w = wkcur.mvVeryBig;
        wkcur.mvVeryBig = t > 1280 ? 2 : t > 807 ? 1 : !1, a = w != wkcur.mvVeryBig, WkView.onScroll(!1, !0), WkView.updateHeight(), WkView.updateArrows(), setTimeout(WkView.updateArrows, 0)
    },
    updateArrows: function() {
        var e = sbWidth() + 2;
        wkcur.wkLeft && (wkcur.wkLeft.style.left = "20px");
        var r = getSize(wkcur.wkBox),
            o = r[0],
            t = r[1],
            i = getSize(wkcur.wkLeftArrowBg)[0],
            a = i - 10,
            w = getSize(wkcur.wkLeftArrow)[0] || getSize(wkcur.wkRightArrow)[0];
        wkcur.wkLeftNav.style.width = Math.floor((lastWindowWidth - e - o) / 2) + "px", wkcur.wkRightNav.style.left = Math.floor((lastWindowWidth - e + o) / 2) + "px", wkcur.wkRightNav.style.width = Math.floor((lastWindowWidth - e - o) / 2) + "px", wkcur.wkClose && (wkcur.wkClose.style.left = lastWindowWidth - e - 37 + "px"), wkcur.wkRight.style.left = Math.floor((lastWindowWidth - e + o) / 2) + "px";
        var l = WkView.getNextWkRaws(),
            n = "intro" == wkcur.wkRaw;
        if (l[0] || l[1] || n) {
            var s = browser.mobile ? window.innerHeight : lastWindowHeight,
                c = (wkcur.wkCont.offsetHeight < s ? wkcur.wkCont.offsetTop + 10 + t / 2 : s / 2) - 8;
            l[0] || n && wkcur.introControlsCur ? (show(wkcur.wkLeftArrow), show(wkcur.wkLeftArrowBg), setStyle(wkcur.wkLeftArrowBg, {
                left: (lastWindowWidth - e - o) / 2 - i
            }), setStyle(wkcur.wkLeftArrow, {
                left: (lastWindowWidth - e - o) / 2 - a + (a - w) / 2,
                top: c
            })) : hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg), setStyle(wkcur.wkRight, {
                paddingBottom: (c - getXY(wkcur.wkRight, !0)[1] - 24) / 2
            }), l[1] || n && wkcur.introControls && wkcur.introControlsCur < wkcur.introControls.length - 1 ? (show(wkcur.wkRightArrow), show(wkcur.wkRightArrowBg), setStyle(wkcur.wkRightArrowBg, {
                left: (lastWindowWidth - e - o) / 2 + o
            }), setStyle(wkcur.wkRightArrow, {
                left: (lastWindowWidth - e - o) / 2 + o + (a - w) / 2,
                top: c
            })) : hide(wkcur.wkRightArrow, wkcur.wkRightArrowBg)
        } else hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg, wkcur.wkRightArrow, wkcur.wkRightArrowBg)
    },
    getNextWkRaws: function() {
        var e = !1,
            r = !1;
        if (isArray(wkcur.wkRawList) && wkcur.historyLen <= 1 && !wkcur.wkRawLoading) {
            var o = wkcur.wkRawList.length,
                t = indexOf(wkcur.wkRawList, wkcur.wkRaw);
            t > 0 && (e = wkcur.wkRawList[t - 1]), t >= 0 && o - 1 > t && (r = wkcur.wkRawList[t + 1]), wkcur.wkRawListLoop && o > 1 && (e = e ? e : wkcur.wkRawList[o - 1], r = r ? r : wkcur.wkRawList[0])
        }
        return [e, r]
    },
    navigate: function(e, r, o) {
        if ("intro" == wkcur.wkRaw) return WkView.introNext(o), cancelEvent(r), !1;
        var t = WkView.getNextWkRaws(),
            i = {};
        wkcur.from && (i.from = wkcur.from), o > 0 && t[1] && (wkcur.wkRawLoading = !0, addClass(wkcur.wkRightArrow, "wk_arrow_progress"), showProgress(wkcur.wkRightArrow), showWiki(extend(i, {
            w: t[1]
        }), !1, !1, {
            fromlist: 1,
            noloader: !0,
            preload: {
                cache: 1
            }
        }), cancelEvent(r)), 0 > o && t[0] && (wkcur.wkRawLoading = !0, addClass(wkcur.wkLeftArrow, "wk_arrow_progress"), hideProgress(wkcur.wkRightArrow), showWiki(extend(i, {
            w: t[0]
        }), !1, !1, {
            fromlist: -1,
            noloader: !0,
            preload: {
                cache: 1
            }
        }), cancelEvent(r))
    },
    updateHeight: function() {
        window.updateWndVScroll && updateWndVScroll();
        var e = browser.mobile ? window.innerHeight : lastWindowHeight,
            r = Math.max(wkcur.wkCont.offsetHeight, e);
        wkcur.wkLeftNav.style.height = wkcur.wkRightNav.style.height = r + "px";
        var o = wkcur.wkBox.offsetHeight;
        setStyle(wkcur.wkLeftArrowBg.firstChild, {
            height: o
        }), setStyle(wkcur.wkRightArrowBg.firstChild, {
            height: o
        })
    },
    updateSize: function(e) {
        if (wkcur.wkCont) {
            var r = getSize(wkcur.wkCont),
                o = document.documentElement,
                t = window.innerHeight || o.clientHeight || bodyNode.clientHeight,
                i = Math.max(positive((t - r[1] - 5) / 2), 14),
                a = i + 10,
                w = wkLayer.offsetHeight - r[1] + i + 90;
            wkcur.wkCont.style.top = i + "px", wkcur.wkRight.style.top = Math.max(a - wkLayerWrap.scrollTop, 16) + "px", wkcur.wkLeftArrowBg.style.paddingTop = wkcur.wkRightArrowBg.style.paddingTop = a + "px", wkcur.wkLeftArrowBg.style.paddingBottom = wkcur.wkRightArrowBg.style.paddingBottom = w + "px", e || (onBodyResize(), WkView.onResize())
        }
    },
    setLocation: function(e, r) {
        wkcur.prevLoc = {};
        for (var o in nav.objLoc)("w" != o || nav.objLoc[o] != wkcur.wkRaw && r) && (wkcur.prevLoc[o] = nav.objLoc[o]);
        if (!e) {
            var t = extend(nav.objLoc, {
                w: wkcur.wkRaw
            });
            delete t.z, nav.strLoc != nav.toStr(t) && nav.setLoc(t)
        }
    },
    backLocation: function() {
        var e = hab.getLoc();
        if (wkcur.prevLoc && wkcur.prevLoc != e) nav.setLoc(wkcur.prevLoc);
        else {
            var r = e.split("/");
            r.length > 1 && nav.setLoc(r[0])
        }
        layerQueue.noHistory()
    },
    showError: function(e) {
        window.wkcur && (delete wkcur.wkRawLoading, addClass(wkcur.wkRightArrow, "wk_arrow_progress"), addClass(wkcur.wkLeftArrow, "wk_arrow_progress"));
        var r = showFastBox({
            title: getLang("global_error")
        }, e, getLang("global_close"));
        return setTimeout(r.hide, 2e3), !0
    },
    onChange: function() {
        return wkcur.shown ? (clearTimeout(wkcur.autosaveTimeout), void(wkcur.autosaveTimeout = setTimeout(function() {
            wkcur.note && wkcur.toStatus && WkView.saveInfo(!0)
        }, 4e3))) : !1
    },
    likeOver: function(e) {
        var r = getSize(ge("wk_like_link")),
            o = r ? r[0] : 20;
        showTooltip(e, {
            url: "like.php",
            params: {
                act: "a_get_stats",
                object: wkcur.like_obj || wkcur.wkRaw,
                from: "wkview"
            },
            slide: 15,
            shift: [0, 8, 9],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            typeClass: "like_tt",
            className: "wk_like_tt",
            dir: "auto",
            init: function(e) {
                if (e.container) {
                    var r = geByClass1("bottom_pointer", e.container, "div"),
                        t = geByClass1("top_pointer", e.container, "div");
                    setStyle(r, {
                        marginLeft: o + 2
                    }), setStyle(t, {
                        marginLeft: o + 2
                    })
                }
            }
        })
    },
    like: function() {
        if (vk.id) {
            if (cur.viewAsBox) return void cur.viewAsBox();
            var e = !wkcur.liked;
            ajax.post("like.php", {
                act: "a_do_" + (e ? "" : "un") + "like",
                object: wkcur.like_obj || wkcur.wkRaw,
                hash: wkcur.likehash,
                from: "wkview"
            }, {
                onDone: function(r, o) {
                    return WkView.likeUpdate(e, r, o)
                }
            }), WkView.likeUpdate(e, wkcur.likes + (e ? 1 : -1))
        }
    },
    likeShare: function(e) {
        var r = wkcur.like_obj || wkcur.wkRaw,
            o = ge("like_share_" + r),
            t = isChecked(o);
        if (checkbox(o), ajax.post("like.php", {
                act: "a_do_" + (t ? "un" : "") + "publish",
                object: r,
                hash: e
            }, {
                onDone: WkView.likeUpdate.pbind(!0)
            }), ge("wk_like_link")) var i = val("wk_like_count"),
            a = hasClass(ge("wk_like_icon"), "my_like");
        else var w = ge("like_real_count_" + r),
            i = w ? w.value : val("like_count" + r),
            a = hasClass(ge("like_icon" + r), "my_like");
        WkView.likeUpdate(!0, intval(i) + (a ? 0 : 1))
    },
    likeShareCustom: function() {
        vk.id && showBox("like.php", {
            act: "publish_box",
            object: wkcur.like_obj || wkcur.wkRaw,
            list: "",
            from: "wkview"
        })
    },
    likeUpdate: function(e, r, o) {
        r = intval(r);
        var t = ge("wk_like_wrap"),
            i = (domByClass(t, "_icon"), domByClass(t, "_count"));
        if (i) {
            var a = t.tt || {},
                w = clone(a.opts || {}),
                l = domByClass(a.container, "_value"),
                n = domByClass(a.container, "_content"),
                s = domByClass(a.container, "_title");
            o && s && val(s, o), a && (a.likeInvalidated = !0), l && (l.value = r), wkcur.likes = r, animateCount(i, r), wkcur.liked = e, toggleClass(t, "my_like", e), toggleClass(t, "no_likes", !r), toggleClass(n, "me_hidden", !e), a.el && (r ? o === !1 ? a.destroy && a.destroy() : isVisible(a.container) || o || tooltips.show(a.el, extend(w, {
                showdt: 0
            })) : a.hide())
        }
    },
    showLikesPage: function(e, r, o) {
        cur.likesBox.loadTabContent("like.php", {
            act: "a_get_members",
            object: e,
            published: r,
            offset: o,
            wall: 1
        }, r)
    },
    extPageSubscribe: function(e, r, o, t, i) {
        if (!buttonLocked(e)) {
            cur.wkSubscribed = cur.wkSubscribed || {};
            var a = hasClass(e, "secondary"),
                w = {
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e),
                    onDone: function() {
                        cur.wkSubscribed[r] = !a, toggleClass(e, "secondary"), t && a && hide(e)
                    }
                };
            if (i = i || "", r > 0) ajax.post("al_friends.php", {
                act: a ? "remove" : "add",
                mid: r,
                hash: o,
                from: "wkview_extpage"
            }, w);
            else {
                var l = ajax.post.pbind("al_groups.php", {
                    act: a ? "a_leave" : "a_enter",
                    gid: -r,
                    hash: o,
                    from: "wkview_extpage",
                    t_src: i
                }, w);
                if (t && a) var n = showFastBox(t.title, t.text, t.btn, function() {
                    n.hide(), l()
                }, getLang("global_cancel"));
                else l()
            }
        }
    },
    wallBeforeInitPost: function(e) {
        if (window.tooltips && tooltips.destroyAll(), revertLastInlineVideo(), wkcur.postInited) return !1;
        wkcur.pageReplaced = [];
        for (var r, o, t = wkcur.post;;) {
            if (r = ge("post" + t), !r && cur.onepost && t == cur.oid + "_" + cur.pid && (r = ge("fw_post")), r = r || ge("reply_fakebox" + t) || ge("reply_box" + t) || ge("replies" + t) || ge("feedback_row_wall" + t) || wkcur.hl_reply && (ge("post" + wkcur.hl_reply) || ge("feedback_row_wall_reply" + wkcur.hl_reply)), !r) break;
            o = ce("div", {
                className: "wk_wall_post_placeholder",
                id: "wk_wall_post_placeholder_" + r.id
            }), r.parentNode.replaceChild(o, r), wkcur.pageReplaced.push([r, o])
        }
        cur.wallLayer = t, cur.wallLayerLike = wkcur.post_like, e.options.wall_tpl && (extend(window.lang, e.lang, e.options.wall_tpl.lang), extend(wkcur, {
            wallType: e.options.wall_type,
            wallTpl: e.options.wall_tpl,
            wallMyDeleted: {},
            tsDiff: e.options.wall_tpl && e.options.wall_tpl.abs_timestamp ? 900 * Math.round((vkNow() / 1e3 - e.options.wall_tpl.abs_timestamp) / 900) : 0,
            wallMyOpened: {},
            wallMyReplied: {},
            wallMyRepliesCnt: 0
        }), WkView.wallInitUpdates(), wkcur.timeUpdateInt = setInterval(function() {
            Wall.updateTimes(wkcur.wkContent)
        }, 1e4)), wkcur._hide.push(WkView.wallDeinitPost), wkcur.postInited = !0
    },
    wallAfterInitPost: function() {
        var e = wkcur.post,
            r = ge("reply_field" + e);
        cur.wkSubscribed && void 0 !== cur.wkSubscribed[intval(e)] && toggleClass(geByClass1("_wk_subscribe_btn", wkcur.wkBox), "secondary", cur.wkSubscribed[intval(e)]), delete cur.editing, r && placeholderInit(r, {
            editable: 1
        }), WkView.wallUpdateReplies(), wkcur.hl_reply ? setTimeout(Wall.scrollHighlightReply.pbind("post" + wkcur.hl_reply), 0) : setTimeout(function() {
            wkLayerWrap.scrollTop = wkcur.toScroll || 0, wkcur.toScroll = 0
        }, 0)
    },
    wallDeinitPost: function() {
        return wkcur.postInited ? (cur.wallLayer = !1, cur.wallLayerLike = !1, wkcur.edit && Wall.cancelEdit(), each(wkcur.pageReplaced, function() {
            var e = this[0],
                r = this[1];
            e && r && r.parentNode.replaceChild(e, r)
        }), clearInterval(wkcur.updatesCheckInt), clearInterval(wkcur.timeUpdateInt), revertLastInlineVideo(), window.tooltips && tooltips.destroyAll(), delete cur.editing, void delete wkcur.postInited) : !1
    },
    wallOnEdit: function(e, r) {
        wkcur.edit = !0, wkcur.editor = {
            changed: !0
        }
    },
    wallOnEdited: function(e) {
        wkcur.edit = !1
    },
    wallPostDelete: function(act, hash, force) {
        var post = wkcur.post;
        cur.wallMyDeleted && (cur.wallMyDeleted[post] = 1), ajax.post("al_wall.php", {
            act: act,
            post: post,
            hash: hash,
            confirm: force ? 1 : 0,
            from: "wkview"
        }, {
            onDone: function(msg, additional, need_confirm) {
                if (need_confirm) var box = showFastBox(msg, need_confirm, getLang("global_delete"), function() {
                    box.hide(), WkView.wallPostDelete(act, hash, 1)
                }, getLang("box_cancel"));
                else {
                    var p = ge("wl_post");
                    if (p) {
                        cur.pgPaused = !0, hide("wl_replies_wrap", "wl_post_actions_wrap", "wl_reply_form_wrap");
                        var del = domNS(p);
                        del && hasClass(del, "no_rows") ? val(del, msg) : (domPN(p).insertBefore(ce("div", {
                            id: "post_del" + post,
                            innerHTML: msg,
                            className: "no_rows"
                        }), domNS(p)), hide(p)), wkLayerWrap.scrollTop = 0, "spam" == act && eval(additional), WkView.updateSize()
                    }
                }
            },
            showProgress: lockButton.pbind("wpe_delete" + post),
            hideProgress: unlockButton.pbind("wpe_delete" + post)
        })
    },
    wallPostRestore: function(e) {
        var r = wkcur.post;
        return cur.wallMyDeleted && (cur.wallMyDeleted[r] = 0), ajax.post("al_wall.php", {
            act: "restore",
            post: r,
            hash: e,
            from: "wkview"
        }, {
            onDone: function() {
                var e = ge("wl_post");
                if (e && !isVisible(e)) {
                    cur.pgPaused = !1, show("wl_replies_wrap", "wl_post_actions_wrap", "wl_reply_form_wrap");
                    var r = domNS(e);
                    show(e), r && hasClass(r, "no_rows") && re(r), WkView.updateSize()
                }
            }
        }), !1
    },
    wallUpdateRepliesOnScroll: function(e) {
        if (wkcur.postInited) {
            var r = window.innerHeight || document.documentElement.clientHeight,
                o = ge("wl_replies_more");
            if (o && isVisible(o)) {
                var t = getXY(o, !0)[1];
                r + 500 > t && o.onclick()
            }
            var i = ge("wl_reply_form");
            if (i && !hasClass(i, "wl_post_reply_form_forbidden")) {
                var a = ge("wl_reply_form_wrap"),
                    w = getXY(a, !0)[1],
                    l = getSize(i);
                if (formH = l[1], e && wkcur.fixedBottom === !1 && r - formH < w + 20) wkLayerWrap.scrollTop += w + 20 - (r - formH);
                else if (isVisible(a) && r - formH < w) {
                    (!wkcur.fixedBottom || e) && (wkcur.fixedBottom = !0, addClass(i, "wl_reply_form_fixed"));
                    var n = wkcur.fixedBottom ? Math.min(0, Math.max(-wkLayerWrap.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null;
                    setStyle("wl_reply_form_wrap", {
                        width: l[0],
                        height: l[1],
                        bottom: s,
                        marginLeft: n
                    });
                    var s = Math.min(0, r - getXY("wl_replies_wrap", !0)[1] - formH);
                    setStyle(i, {
                        bottom: s
                    })
                } else(wkcur.fixedBottom || e) && (wkcur.fixedBottom = !1, removeClass(i, "wl_reply_form_fixed"), setStyle("wl_reply_form_wrap", {
                    width: null,
                    height: null,
                    marginLeft: null
                }))
            }
        }
    },
    wallShowMoreReplies: function() {
        if (wkcur.loadingReplies) return !1;
        var e = wkcur.offset + wkcur.loaded,
            r = wkcur.limit,
            o = ge("replies" + wkcur.post);
        return wkcur.count <= e || !o ? !1 : (wkcur.loadingReplies = !0, Wall.moreReplies(wkcur.post, (wkcur.reverse ? -1 : 1) * e, r, {
            from: "wkview",
            append: !0,
            rev: wkcur.reverse ? 1 : 0,
            onDone: function(e, r, o) {
                extend(wkcur, {
                    count: o.count,
                    loaded: wkcur.loaded + o.num
                }), WkView.wallUpdateReplies(), wkcur.loadingReplies = !1
            },
            onFail: function() {
                wkcur.loadingReplies = !1
            },
            showProgress: lockButton.pbind("wl_replies_more"),
            hideProgress: unlockButton.pbind("wl_replies_more")
        }), !1)
    },
    wallShowPreviousReplies: function(e) {
        if (wkcur.loadingReplies || wkcur.reverse) return !1;
        var r = 100,
            o = Math.max(0, wkcur.offset - r),
            t = Math.min(r, wkcur.offset - o),
            i = ge("replies" + wkcur.post);
        if (0 >= t || !i) return !1;
        wkcur.loadingReplies = !0;
        var a = i.offsetHeight;
        Wall.moreReplies(wkcur.post, o, t, {
            from: "wkview",
            onDone: function(r, o, t) {
                extend(wkcur, {
                    count: t.count,
                    offset: t.offset,
                    loaded: wkcur.loaded + t.num
                }), e && (wkLayerWrap.scrollTop += i.offsetHeight - a, setTimeout(Wall.scrollHighlightReply.pbind("post" + e), 0)), WkView.wallUpdateReplies(), wkcur.loadingReplies = !1
            },
            onFail: function() {
                wkcur.loadingReplies = !1
            },
            showProgress: addClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading"),
            hideProgress: removeClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading")
        })
    },
    wallUpdateReplies: function() {
        toggle("wl_replies_more", wkcur.offset + wkcur.loaded < wkcur.count);
        var e = ge("wl_replies_header"),
            r = langNumeric(wkcur.count, wkcur.lang.wall_N_replies),
            o = !1;
        !wkcur.reverse && wkcur.offset > 0 && (r = wkcur.offset > 100 ? langNumeric(100, wkcur.lang.wall_show_n_of_m_last).replace("{count}", wkcur.count) : langNumeric(wkcur.count, wkcur.lang.wall_show_all_n_replies), o = !0), val("wl_replies_header_label", r), toggleClass(e, "wl_replies_header_clickable", o);
        var t = ge("wl_replies_wrap"),
            i = ge("wl_reply_form");
        if (wkcur.count && t && !isVisible(t.firstChild) && show(t.firstChild), i) {
            var a = ge("wl_reply_form_wrap");
            i.parentNode != a && a.appendChild(i)
        }
        WkView.wallUpdateRepliesOnScroll(), WkView.updateSize()
    },
    wallInitUpdates: function() {
        var e = wkcur.options.add_queue_key;
        if (e && window.Notifier) {
            var r = (wkcur.wallAddQueue, function() {
                wkcur.wallAddQueue && Notifier.addKey(wkcur.wallAddQueue, Wall.updated.pbind(!0))
            });
            wkcur.wallAddQueue = e, r(), wkcur.updatesCheckInt = setInterval(r, 1e4)
        }
    },
    wallCancelEditReply: function() {
        var e = wkcur.post,
            r = ge("reply_field" + e),
            o = r && data(r, "composer");
        o ? Composer.reset(o) : val(r, ""), Wall.hideEditReply(e), WkView.wallUpdateReplies()
    },
    wallInverseReplies: function(e) {
        return wkcur.loadingReplies ? !1 : (wkcur.loadingReplies = !0, wkcur.reverse = !wkcur.reverse, wkcur.offset = 0, void Wall.moreReplies(wkcur.post, wkcur.offset, wkcur.limit, {
            from: "wkview",
            clear: !0,
            rev: wkcur.reverse ? 1 : 0,
            onDone: function(r, o, t) {
                domFC(e).className = wkcur.reverse ? "sort_rev_icon" : "sort_not_rev_icon", extend(wkcur, {
                    count: t.count,
                    loaded: t.num
                }), WkView.wallUpdateReplies(), wkcur.loadingReplies = !1
            },
            onFail: function() {
                wkcur.reverse = !wkcur.reverse, wkcur.loadingReplies = !1
            },
            showProgress: addClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading"),
            hideProgress: removeClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading")
        }))
    },
    likesInit: function() {
        extend(wkcur, {
            historyLen: wkcur.historyLen || 0
        }), WkView.initSTL(), WkView.likesTabInit(), addEvent(wkLayerWrap, "scroll", WkView.onScroll), addEvent(window, "resize", WkView.onResize), onBodyResize(), cur.wallTpl = cur.wallTpl || {}, cur.wallInited ? (wkcur._oldReplyForm = cur.wallTpl.reply_form, cur.wallTpl.reply_form = wkcur.wall_opts.wall_tpl.reply_form) : Wall.initWallOptions(wkcur.wall_opts), void 0 === cur.options ? cur.options = {
            reply_names: {}
        } : void 0 === cur.options.reply_names && (cur.options.reply_names = {}), extend(cur.options.reply_names, wkcur.reply_names), wkcur._hide.push(function() {
            removeEvent(wkLayerWrap, "scroll", WkView.onScroll), removeEvent(window, "resize", WkView.onResize), wkcur._oldReplyForm && (cur.wallTpl.reply_form = wkcur._oldReplyForm, wkcur._oldReplyForm = !1)
        })
    },
    likesTabInit: function() {
        wkcur.preload && ajax.preload("wkview.php", {
            act: "show",
            w: wkcur.wkRaw,
            offset: wkcur.offset
        }, wkcur.preload)
    },
    likesToTop: function() {
        var e = ge("tb_tabs_wrap"),
            r = getXY(e, !0)[1];
        wkcur.lSTL && wkcur.lSTL.el == ge("wk_box") && (wkcur.lSTLWas = 0), 0 > r && (wkLayerWrap.scrollTop += r + 1), WkView.likesOnScroll(), wkcur.lSTL && WkView.stlOnScroll()
    },
    likesTab: function(e) {
        var r = ge("likes_tab_" + e),
            o = r && domFC(r),
            t = gpeByClass("ui_tabs", o);
        if (!o || geByClass1("ui_tab_sel", t) == o) return !1;
        uiTabs.switchTab(o);
        var i = gpeByClass("wk_wiki_content", t);
        ge("tb_tabs_wrap");
        ajax.post("wkview.php", {
            act: "show",
            w: e + "/" + wkcur.like_obj,
            part: 1
        }, {
            cache: 1,
            showProgress: addClass.pbind(i, "box_loading"),
            hideProgress: removeClass.pbind(i, "box_loading"),
            onDone: function(e, r) {
                val("wk_likes_content", e), extend(wkcur, r), WkView.likesTabInit(), WkView.setLocation(), WkView.updateHeight(), WkView.likesToTop()
            }
        })
    },
    likesPreload: function() {
        ajax.post("wkview.php", {
            act: "show",
            w: wkcur.wkRaw,
            offset: wkcur.offset
        }, {
            cache: 1
        })
    },
    likesMore: function() {
        var e = ge("wk_likes_more_link");
        isButtonLocked(e) || ajax.post("wkview.php", {
            act: "show",
            w: wkcur.wkRaw,
            offset: wkcur.offset
        }, {
            onDone: function(r, o, t, i, a) {
                var w = ge("wk_likes_rows");
                if (w) {
                    if (a)
                        for (var l = geByClass("wk_likes_hidden", w), n = 0, s = l.length; s > n; ++n) w.appendChild(l[n]), removeClass(l[n], "wk_likes_hidden");
                    w.appendChild(cf(r)), wkcur.offset = o, t ? WkView.likesPreload() : hide(e),
                        WkView.updateHeight(), i && extend(cur.options.reply_names, i)
                }
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e),
            cache: 1
        })
    },
    likesOnScroll: function(e) {
        var r = lastWindowHeight,
            o = ge("wk_likes_more_link"),
            t = ge("tb_tabs"),
            i = ge("tb_tabs_wrap");
        getXY(i, !0)[1] < 0 ? wkcur.tbFixed || (setStyle(i, "height", domFC(t).offsetHeight), setStyle(domFC(t), "width", intval(getStyle(domFC(t), "width"))), addClass(t, "ui_tabs_fixed"), wkcur.tbFixed = !0) : wkcur.tbFixed && (removeClass(t, "ui_tabs_fixed"), wkcur.tbFixed = !1), isVisible(o) && r > getXY(o, !0)[1] && o.click()
    },
    likesBlacklistTip: function(e) {
        showTooltip(e, {
            text: getLang("like_block_liker"),
            shift: [8, 5, 5],
            black: 1
        })
    },
    likesBlacklist: function(e, r, o) {
        return e.tt && e.tt.destroy && e.tt.destroy(), showBox("like.php", {
            act: "spam",
            mid: r,
            object: wkcur.like_obj
        }), cancelEvent(o)
    },
    likesRecache: function(e) {
        wkcur.offset += e;
        for (var r in ajaxCache) r.match(new RegExp("^\\/wkview.php\\#act=show", "")) && delete ajaxCache[r]
    },
    likesRemove: function(e) {
        re("fans_fan_row" + e), WkView.likesRecache(-1), WkView.onScroll(), domFC(ge("wk_likes_rows")) || nav.reload()
    },
    historyInit: function() {
        addEvent(wkLayerWrap, "scroll", WkView.onScroll), addEvent(window, "resize", WkView.onResize), onBodyResize(), wkcur._hide.push(function() {
            removeEvent(wkLayerWrap, "scroll", WkView.onScroll), removeEvent(window, "resize", WkView.onResize)
        })
    },
    historyOnScroll: function() {
        if (wkcur.loadingHistory) return !1;
        var e = window.innerHeight || document.documentElement.clientHeight,
            r = ge("wk_history_more_link");
        if (r && isVisible(r)) {
            var o = getXY(r, !0)[1];
            e + 500 > o && r.onclick()
        }
    },
    historyShowMore: function() {
        if (wkcur.loadingHistory) return !1;
        var e = wkcur.offset;
        return wkcur.loadingHistory = !0, ajax.post("wkview.php", {
            act: "show",
            w: wkcur.wkRaw,
            offset: e,
            part: 1
        }, {
            onDone: function(e, r) {
                if (ge("wk_history_rows")) {
                    extend(wkcur, e), ge("wk_history_rows").appendChild(cf(r)), setTimeout(WkView.historyOnScroll, 500);
                    var o = wkcur.offset < wkcur.count && r;
                    toggle("wk_history_more_link", o), toggle("wk_history_empty", !o && !domFC(ge("wk_history_rows"))), toggleClass("wk_history_more", "wk_history_more_loading", o && !domFC(ge("wk_history_rows"))), wkcur.loadingHistory = !1
                }
            },
            onFail: function() {
                wkcur.loadingHistory = !1
            },
            showProgress: function() {
                hide("wk_history_more_link"), show("wk_history_more_progress")
            },
            hideProgress: function() {
                show("wk_history_more_link"), hide("wk_history_more_progress")
            }
        }), !1
    },
    preloadArrow: function(e) {
        var r = wkcur[e ? "wkRightArrow" : "wkLeftArrow"];
        if (!r.cached) {
            r.cached = !0;
            var o = WkView.getNextWkRaws(),
                t = o[e ? 1 : 0];
            if (t) {
                var i = {
                    w: t
                };
                if (t && "/query" == t.substr(-6)) {
                    var a = clone(nav.objLoc);
                    delete a[0], delete a.w, i.query = JSON.stringify(a)
                }
                wkcur.from && (i.from = wkcur.from), ajax.post("wkview.php", extend({
                    act: "show",
                    loc: nav.objLoc[0]
                }, i), {
                    cache: 1
                })
            }
        }
    },
    back: function() {
        return wkcur.historyLen > 1 ? (wkcur.doBack = 1, wkcur.historyLen -= 1, history.go(-1), !0) : void WkView.hide()
    },
    initSTL: function() {
        re(cur.lSTL), extend(wkcur, {
            lSTL: wkLayerWrap.appendChild(ce("div", {
                id: "layer_stl",
                innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang("global_to_top") + "</nobr>",
                el: ge("wk_box"),
                onclick: cancelEvent,
                onmousedown: WkView.stlDown,
                sc: WkView.stlOnScroll
            })),
            lSTLText: ge("layer_stl_text", wkLayerWrap),
            lSTLShown: 0,
            lSTLWas: 0,
            lSTLWasSet: 0
        }), cur.lSTL = wkcur.lSTL, wkcur._hide.push(function() {
            re(wkcur.lSTL, cur.lSTL)
        })
    },
    stlDown: function(e) {
        if (e = e || window.event, !checkEvent(e)) {
            if (!__afterFocus)
                if (wkcur.lSTLWasSet && wkcur.lSTLWas) {
                    var r = wkcur.lSTLWas;
                    wkcur.lSTLWas = 0, wkLayerWrap.scrollTop = r
                } else wkcur.lSTLWas = wkLayerWrap.scrollTop, wkLayerWrap.scrollTop = 0;
            return cancelEvent(e)
        }
    },
    stlOnScroll: function(e) {
        var r = wkLayerWrap.scrollTop,
            o = 200,
            t = wkcur.lSTLWas || r > o,
            i = 0;
        if (wkcur.lSTL.style.marginTop = r + "px", vk.staticheader) {
            var a = getSize("page_header_wrap")[1];
            wkcur.lSTLText.style.marginTop = Math.max(-Math.min(scrollGetY(), bodyNode.clientHeight - (window.lastWindowHeight || 0)), -a) + "px"
        }
        if (t ? (1 !== wkcur.lSTLShown && (show(wkcur.lSTL), wkcur.lSTLShown = 1), wkcur.lSTLWas && r > 500 && (wkcur.lSTLWas = 0), r > o ? (i = (r - o) / o, wkcur.lSTLWasSet && (wkcur.lSTLWasSet = 0, val(domLC(wkcur.lSTL), getLang("global_to_top")), removeClass(domLC(wkcur.lSTL), "down"))) : (i = (o - r) / o, wkcur.lSTLWas && (wkcur.lSTLWasSet || (wkcur.lSTLWasSet = 1, val(domLC(wkcur.lSTL), ""), addClass(domLC(wkcur.lSTL), "down"))))) : 0 !== wkcur.lSTLShown && (hide(wkcur.lSTL), wkcur.lSTLShown = 0), wkcur.wkLeft && wkcur.wkLeftNav) {
            var w = wkcur.historyLen > 1 && !t;
            toggle(wkcur.wkLeft, w), toggle(wkcur.wkLeftNav, w), setStyle(wkcur.wkLeftWrap, {
                opacity: 1 - Math.min(Math.max(r / o, 0), 1)
            }), w || setStyle(wkcur.wkLeft, {
                opacity: .4
            })
        }
        setStyle(wkcur.lSTL, {
            opacity: Math.min(Math.max(i, 0), 1)
        })
    },
    subscribe: function(e, r) {
        var o = e.tt && (e.tt.shown || e.tt.showing);
        o ? tooltips.hide(e, {
            fasthide: 1
        }) : e.tt && e.ttimer && (clearTimeout(e.ttimer), o = !0), ajax.post("/al_wall.php", {
            act: "toggle_subscribe",
            post: wkcur.post,
            hash: r
        }, {
            onDone: function(r) {
                WkView.setSubscribed(e, r.subscribed, o)
            },
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    setSubscribed: function(e, r, o) {
        e.innerHTML = wkcur.lang[r ? "wall_unsubscribe_post" : "wall_subscribe_post"], toggleClass(e, "wl_post_subscribed", r), o && WkView.showSubscribeTooltip(e), cur.onWKSubscribe && (cur.onWKSubscribe(r), delete cur.onWKSubscribe)
    },
    showSubscribeTooltip: function(e) {
        var r = hasClass(e, "wl_post_subscribed"),
            o = getSize(e);
        o[0];
        showTooltip(e, {
            dir: "left",
            asrtl: 1,
            text: function() {
                return wkcur.lang[r ? "wall_unsubscribe_post_tt" : "wall_subscribe_post_tt"]
            },
            shift: [260, -15],
            slideX: -10,
            showdt: 200,
            className: "subscr_post_tt"
        })
    },
    shareApp: function(e, r) {
        if (vk.id) {
            var o = {
                    act: "publish_box",
                    object: wkcur.like_obj,
                    url_hash: r,
                    list: "",
                    from: "wkview"
                },
                t = {
                    onDone: function() {
                        var o = e;
                        r && (o += "#" + r);
                        var t = cur.sbField && data(cur.sbField, "composer");
                        t && t.addMedia.checkURL(o)
                    }
                };
            showBox("like.php", o, t)
        }
    },
    _eof: 1
};
try {
    stManager.done("wkview.js")
} catch (e) {}