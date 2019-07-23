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
    wikiClick: function(e, o, t) {
        if (checkEvent(o)) return !0;
        t = t || {};
        for (var r = o.target; r && "A" != r.tagName;) r = r.parentNode;
        if (r && "A" == r.tagName) {
            var i = r.href;
            if (l = i.match(/^\/(page[^?]*)(\?.*)?$/)) var a = l[1],
                w = l[4] ? q2ajx(l[4].substr(1)) : {};
            else {
                var l;
                if (!(l = i.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)\/([^?]*)(\?.*)?$/i)) || !l[3]) return !0;
                a = l[3].split("/"), w = l[4] ? q2ajx(l[4].substr(1)) : {}
            }
            var s = {};
            switch (a[0]) {
                case "pages":
                    s.oid = w.oid || w.o, s.id = w.id, s.p = w.p;
                    break;
                case "ru":
                case "en":
                    s.p = a[1], s.global = a[0];
                    break;
                default:
                    if (a[0].match(/^page-?\d+_\d+$/)) {
                        w = a[0].substr(4).split("_");
                        s.oid = w[0], s.id = w[1], s = extend(t, s)
                    } else if (a[0].match(/^note\d+_\d+$/)) {
                        w = a[0].substr(4).split("_");
                        s.w = a[0]
                    }
            }
            if (s.w || s.oid && (s.id || s.p)) return showWiki(s), cancelEvent(o)
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
    onScroll: function(e, o) {
        switch (wkcur.lSTL && WkView.stlOnScroll(o), o || WkView.updateSize(!0), wkcur.type) {
            case "wall":
                return WkView.wallUpdateRepliesOnScroll(o);
            case "likes":
                return WkView.likesOnScroll(o);
            case "history":
                return WkView.historyOnScroll(o);
            case "market":
                if (window.Market) return Market.updateCommentsOnScroll(o);
                break;
            case "story":
                window.Stories && Stories.onResize()
        }
        if (!isFunction(WkView.customOnScroll) || !WkView.customOnScroll(o)) {
            var t = ge("wke_buttons_panel"),
                r = ge("wke_buttons_cont");
            if (t) {
                var i = getXY(r, !0)[1];
                wkcur.bottomSize || (wkcur.bottomSize = getSize(t));
                var a = wkcur.bottomSize[1],
                    w = window.innerHeight || document.documentElement.clientHeight;
                if (o && !wkcur.fixedBottom && w - a < i + 20) wkLayerWrap.scrollTop += i + 20 - (w - a);
                else if (w - a < i) {
                    if (!wkcur.fixedBottom || o) {
                        wkcur.fixedBottom = !0;
                        var l = getSize(r);
                        addClass(wkcur.wkContent, "wke_bottom_fixed"), setStyle(t, {
                            width: l[0],
                            height: l[1]
                        }), setStyle(r, {
                            paddingTop: l[1]
                        })
                    }
                } else(wkcur.fixedBottom || o) && (wkcur.fixedBottom = !1, removeClass(wkcur.wkContent, "wke_bottom_fixed"), setStyle(t, {
                    width: null,
                    height: null
                }), setStyle(r, {
                    paddingTop: 0
                }));
                var s = ge("wke_controls"),
                    n = ge("wke_controls_cont");
                if (n)
                    if (getXY(n, !0)[1] < 0) {
                        if (!wkcur.fixedTop) {
                            wkcur.fixedTop = !0;
                            var c = getSize(n);
                            addClass(wkcur.wkContent, "wke_top_fixed"), setStyle(s, {
                                width: c[0],
                                height: c[1]
                            }), setStyle(n, {
                                paddingTop: c[1]
                            })
                        }
                    } else wkcur.fixedTop && (wkcur.fixedTop = !1, removeClass(wkcur.wkContent, "wke_top_fixed"), setStyle(s, {
                        width: null,
                        height: null
                    }), setStyle(n, {
                        paddingTop: 0
                    }))
            }
        }
    },
    saveInfo: function(autosave) {
        var params = {
            page: wkcur.p,
            hash: wkcur.hash
        };
        return params.Body = wkcur.editor.val(), !1 !== params.Body && (params = wkcur.note ? extend(params, {
            act: "save",
            oid: wkcur.oid,
            nid: wkcur.nid,
            wysiwyg: 1,
            note: wkcur.note
        }) : extend(params, {
            act: "save",
            oid: wkcur.oid,
            id: wkcur.pid
        }), wkcur.pageTitle && (params.title = val(wkcur.pageTitle)), "page_new" == wkcur.type && (params.page_new = 1), wkcur.from && (params.from = wkcur.from), (!autosave || !(wkcur.lockAutoSave || wkcur.note && curBox())) && (wkcur.lockAutoSave = !0, void ajax.post(wkcur.note ? "wkview.php" : "al_pages.php", params, {
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
                if (autosave) return !0;
                setTimeout(function() {
                    saveEl && fadeOut(saveEl, 200)
                }, 1500)
            },
            showProgress: function() {
                autosave || lockButton(ge("wk_layer_save"))
            },
            hideProgress: function() {
                autosave || unlockButton(ge("wk_layer_save"))
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
            for (var o = 0, t = e.childNodes; o < t.length;) this.evalScripts(t[o++])
    },
    cloneNode: function(e) {
        var o = ce(e.tagName.toLowerCase());
        o.text = e.innerHTML;
        for (var t = e.attributes.length - 1; 0 <= t; t--) o.setAttribute(e.attributes[t].name, e.attributes[t].value);
        return o
    },
    show: function(title, html, options, script, ev) {
        if (options.asBox) return this.initWkBox(title, html, options, script), !0;
        window.wkcur ? (wkcur.shown && !isVisible(wkLayerWrap) && WkView.hide(!0, !0), each(wkcur._hide || [], function(e, o) {
            isFunction(o) && o()
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
        cur.cancelTooltip = !0, window.tooltips && tooltips.hideAll(), options.skipBoxesHide || boxQueue.hideAll(), isVisible(wkLayerWrap) || (otherList = !0, addEvent(window, "resize", WkView.onResize), addEvent(wkLayerWrap, "click", WkView.onClick), WkView.showLayer()), wkcur.noLocChange = 0, wkcur.noHistory = options.noLocChange, wkcur.isArchived = options.isArchived, wkcur.hideTitle = options.hide_title ? 1 : 0, wkcur.hideCloseButton = options.hideCloseButton ? 1 : 0, wkcur.shown = !0, wkcur.edit && (wkcur.edit = !1), extend(wkcur, options), wkcur.root ? (cur.nav.push(function(e, o, t, r) {
            if ((t = nav.toStr(t)) == wkcur.prevLoc) return WkView.hide(!0), !1
        }), !options.noLocChange && options.myLoc && nav.setLoc(options.myLoc)) : (WkView.setLocation(options.noLocChange, toQueue), options.prevLoc && (wkcur.prevLoc = options.prevLoc)), ev && ev.pageX && ev.pageY && extend(wkcur, {
            oldX: ev.pageX,
            oldY: ev.pageY,
            oldT: vkNow()
        }), addClass(wkLayerWrap, "wk_dark"), addEvent(wkLayerWrap, "scroll", WkView.onScroll), addClass(layerBG, "wk_dark");
        var content = html,
            hideLeft = 1 < wkcur.historyLen ? "" : "display: none;",
            hideCloseBtn = wkcur.hideCloseButton ? "display: none;" : "";
        if ("wall" == options.type ? (addEvent(window, "resize", WkView.onResize), WkView.wallBeforeInitPost(options)) : options.edit ? addEvent(window, "resize", WkView.onResize) : options && (content = '<div class="wk_text wk_wiki_content' + (options.className ? " " + options.className : "") + '" onclick="return WkView.wikiClick(this, event);">' + content + "</div>"), wkcur.wkCont ? wkcur.wkContent.innerHTML = content : (wkLayer.innerHTML = '<div class="wk_cont">  <div id="wk_box" onclick="wkcur.wkClicked = true;">    <div id="wk_loader"></div>    <a id="wk_close_link" href="javascript: return false;" class="fl_r wk_close_link" onclick="return WkView.hide(false, true, event);">      ' + getLang("global_close") + '    </a>    <div id="wk_summary" class="fl_l"><span class="summary" id="wk_layer_title">' + title + '</span></div>    <div id="wk_content" tabindex="0">' + content + '</div>    <div class="clear"></div>  </div>  <div id="wk_dots" class="wk_dots"></div>  </div><div id="wk_left_wrap"><div id="wk_left" style="' + hideLeft + '" class="wk_left no_select"></div></div><div class="wk_left_nav no_select" id="wk_left_nav" style="' + hideLeft + '" onmousedown="wkcur.wkClicked = true; WkView.back();" onselectstart="return cancelEvent(event);"></div><div class="wk_right_nav no_select" id="wk_right_nav" onmousedown="if (!wkcur.noClickHide) { wkcur.wkClicked = true; WkView.hide(); }"><div id="wk_right" class="wk_close no_select" style="' + hideCloseBtn + '"><div class="wk_close_inner"></div></div></div><div id="wk_left_arrow_bg" class="wk_arrow_bg no_select" onclick="return WkView.navigate(this, event, -1);" onmouseover="WkView.preloadArrow(false)"><div class="wk_arrow_bg_inner"></div><div id="wk_left_arrow" class="wk_arrow no_select"></div></div><div id="wk_right_arrow_bg" class="wk_arrow_bg no_select" onclick="return WkView.navigate(this, event, 1);" onmouseover="WkView.preloadArrow(true)"><div class="wk_arrow_bg_inner"></div><div id="wk_right_arrow" class="wk_arrow no_select"></div></div>', options.nocross && re(geByClass1("wk_close_inner", wkLayer)), extend(wkcur, {
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
                wkRightArrowBg: ge("wk_right_arrow_bg"),
                wkDots: ge("wk_dots")
            }), "away" == options.wkRaw.substr(0, 4) && (this.evalScripts(wkLayer), setTimeout(function() {
                window._mediator && window._mediator.start({
                    url: location.pathname + location.search
                })
            }, 1500))), toggle("wk_summary", title), options.withDots && options.wkRawList.length)
            for (var dotsCount = options.wkRawList.length, i = 0; i < dotsCount; i++) {
                var iRaw = options.wkRawList[i],
                    dotEl = se('<span class="wk_dots__dot" onclick="WkView.openRaw(event, \'' + iRaw + "')\"></span>");
                options.wkRaw == iRaw && addClass(dotEl, "wk_dots__dot_active"), wkcur.wkDots.appendChild(dotEl)
            }
        wkcur.commonClass ? addClass(wkcur.wkBox, wkcur.commonClass) : wkcur.wkBox.className = "", wkcur.noCloseIcon && hide(wkcur.wkRight), wkcur.oid && wkcur.pid && (WkView.initSTL(), options.edit || (addEvent(wkLayerWrap, "scroll", WkView.onScroll), addEvent(window, "resize", WkView.onResize))), options.overflow ? addClass(wkcur.wkBox, "wk_overflow_hidden") : removeClass(wkcur.wkBox, "wk_overflow_hidden"), script && eval(script), WkView.updateSize(), removeEvent(document, "keydown", WkView.onKeyDown), addEvent(document, "keydown", WkView.onKeyDown), options.onLoaded && options.onLoaded(), shortCurrency(), WkView.updateArrows(), wkcur.wkContent.focus(), wkLayerWrap.scrollTop = 0, "wall" == options.type ? WkView.wallAfterInitPost() : options.toScroll ? (wkLayerWrap.scrollTop = options.toScroll, wkcur.toScroll = 0) : wkLayerWrap.scrollTop = 0, options.fromlist && WkView.preloadArrow(1 == options.fromlist), getAudioPlayer().updateCurrentPlaying(), window.updateAriaElements && updateAriaElements();
        var postLargeGif = domByClass(wkLayer, "page_gif_large");
        if (postLargeGif && Page.showGif(domFC(postLargeGif)), window.LazyLoad && LazyLoad.scanDelayed(), ev && domClosest("bookmarks_row_type_product", ev.target) && options && options.wkRaw) {
            var productRaw = options.wkRaw.match(/^product(-?\d+)_(\d+)/);
            statlogsValueEvent("bookmarks_product_analytics", {
                item_type: "product",
                item_owner_id: intval(productRaw[1]),
                item_id: intval(productRaw[2]),
                time: window.getServerTime()
            })
        }
        return !1
    },
    hide: function(e, o, t) {
        if (window.wkcur && (o || wkcur.shown)) {
            var r = !wkcur.wkRaw.match(/^recom_apps\d+$/) && !wkcur.wkRaw.match(/^app\d+$/);
            if ("story" == wkcur.type && !o && window.Stories && !e) return Stories.hideLayer();
            if (clearTimeout(wkcur.autosaveTimeout), clearTimeout(wkcur.showT), o || !wkcur.edit || !wkcur.editor || !wkcur.editor.changed) {
                each(wkcur._hide || [], function(e, o) {
                    isFunction(o) && o()
                });
                var i = !1;
                if (isVisible(wkLayerWrap) && (setTimeout(layerQueue.pop, 0), (i = layerQueue.count() && "wiki" == layerQueue._layers[layerQueue._layers.length - 1][0] && !layerQueue._bl) || (layers.wraphide(wkLayerWrap), layers.fullhide = !1)), window.tooltips && tooltips.destroy(this), removeEvent(document, "keydown", WkView.onKeyDown), removeClass(wkcur.wkContent, "wke_top_fixed"), wkcur.fixedTop = wkcur.fixedBottom = !1, i || (removeClass(wkLayerWrap, "wk_dark"), removeClass(layerBG, "wk_dark"), wkcur.shown = !1, removeEvent(wkLayerWrap, "click", WkView.onClick), removeEvent(wkLayerWrap, "scroll", WkView.onScroll), wkcur.wkContent.innerHTML = ""), wkcur.wkClicked = !1, wkcur.hideTitle = !1, wkcur.changeCanvasSize = !1, wkcur.onHide && isFunction(wkcur.onHide) && wkcur.onHide(), cur._editMode = !1, wkcur.root && !0 !== e ? WkView.backLocation() : wkcur.noLocChange || !0 === e ? r && __adsUpdate() : (2 === e ? nav.setLoc(hab.getLoc()) : WkView.backLocation(), r && __adsUpdate("lazy")), browser.iphone || browser.ipad) {
                    var a = scrollGetY();
                    500 < Math.abs(a - cur.wkStartScroll) && scrollToY(cur.wkStartScroll, 0)
                }
                return delete wkcur.historyLen, getAudioPlayer().updateCurrentPlaying(), cur.gifAutoplayScrollHandler && cur.gifAutoplayScrollHandler(), window._mediator && window._mediator.isActive() && window._mediator.stop(), !1
            }
            if (wkcur.note && wkcur.toStatus && !e) return void WkView.saveInfo();
            var w = showFastBox(wkcur.lang.pages_close_title, wkcur.lang.pages_close_text, getLang("box_yes"), function() {
                w.hide(), WkView.hide(e, !0)
            }, getLang("box_no"))
        }
    },
    cmp: function(e, o) {
        var t = e.length,
            r = o.length;
        return t < r ? -1 : r < t ? 1 : e < o ? -1 : o < e ? 1 : 0
    },
    onClick: function(e) {
        if (wkcur.wkClicked || wkcur.noClickHide || e && cur.__mdEvent && e.target != cur.__mdEvent.target) wkcur.wkClicked = !1;
        else {
            var o = Math.abs(e.pageX - intval(wkcur.oldX)),
                t = Math.abs(e.pageY - intval(wkcur.oldY));
            (3 < o || 3 < t) && 300 < vkNow() - intval(wkcur.oldT) && WkView.hide()
        }
    },
    onKeyDown: function(e) {
        if (!1 === (e = e || window.event).returnValue) return !1;
        if (!cur.pvShown && e.keyCode == KEY.ESC) return WkView.hide(), cancelEvent(e);
        if (!(cur.pvShown || wkcur.edit || e.keyCode != KEY.LEFT && e.keyCode != KEY.RIGHT)) {
            var o = e && e.target || e.srcElement;
            return !(!o || !("TEXTAREA" == o.tagName || "INPUT" == o.tagName || "DIV" == o.tagName && o.contentEditable && "inherit" != o.contentEditable)) || (WkView.navigate(null, e, e.keyCode == KEY.RIGHT ? 1 : -1), cancelEvent(e))
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
            o = lastWindowHeight,
            t = e - sbWidth() - 2 - 120 - 34 - 50,
            r = o - 31 - 28 - 72;
        1280 < t ? t = 1280 : 807 < t && t < 907 ? t = 807 : t < 604 && (t = 604), r < 453 && (r = 453), wkcur.mvWidth = t, wkcur.mvHeight = r;
        var i = wkcur.mvVeryBig;
        wkcur.mvVeryBig = 1280 < t ? 2 : 807 < t && 1, wkcur.mvVeryBig, WkView.onScroll(!1, !0), WkView.updateHeight(), WkView.updateArrows(), setTimeout(WkView.updateArrows, 0)
    },
    updateArrows: function() {
        var e = sbWidth() + 2;
        wkcur.wkLeft && (wkcur.wkLeft.style.left = "20px");
        var o = getSize(wkcur.wkBox),
            t = o[0],
            r = o[1],
            i = getSize(wkcur.wkLeftArrowBg)[0],
            a = i - 10,
            w = getSize(wkcur.wkLeftArrow)[0] || getSize(wkcur.wkRightArrow)[0];
        wkcur.wkLeftNav.style.width = Math.floor((lastWindowWidth - e - t) / 2) + "px", wkcur.wkRightNav.style.left = Math.floor((lastWindowWidth - e + t) / 2) + "px", wkcur.wkRightNav.style.width = Math.floor((lastWindowWidth - e - t) / 2) + "px", wkcur.wkClose && (wkcur.wkClose.style.left = lastWindowWidth - e - 37 + "px"), wkcur.wkRight.style.left = Math.floor((lastWindowWidth - e + t) / 2) + "px";
        var l = WkView.getNextWkRaws(),
            s = "intro" == wkcur.wkRaw;
        if (l[0] || l[1] || s) {
            var n = browser.mobile ? window.innerHeight : lastWindowHeight,
                c = (wkcur.wkCont.offsetHeight < n ? wkcur.wkCont.offsetTop + 10 + r / 2 : n / 2) - 8;
            l[0] || s && wkcur.introControlsCur ? (show(wkcur.wkLeftArrow), show(wkcur.wkLeftArrowBg), setStyle(wkcur.wkLeftArrowBg, {
                left: (lastWindowWidth - e - t) / 2 - i
            }), setStyle(wkcur.wkLeftArrow, {
                left: (lastWindowWidth - e - t) / 2 - a + (a - w) / 2,
                top: c
            })) : hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg), setStyle(wkcur.wkRight, {
                paddingBottom: (c - getXY(wkcur.wkRight, !0)[1] - 24) / 2
            }), l[1] || s && wkcur.introControls && wkcur.introControlsCur < wkcur.introControls.length - 1 ? (show(wkcur.wkRightArrow), show(wkcur.wkRightArrowBg), setStyle(wkcur.wkRightArrowBg, {
                left: (lastWindowWidth - e - t) / 2 + t
            }), setStyle(wkcur.wkRightArrow, {
                left: (lastWindowWidth - e - t) / 2 + t + (a - w) / 2,
                top: c
            })) : hide(wkcur.wkRightArrow, wkcur.wkRightArrowBg)
        } else hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg, wkcur.wkRightArrow, wkcur.wkRightArrowBg)
    },
    getNextWkRaws: function() {
        var e = !1,
            o = !1;
        if (isArray(wkcur.wkRawList) && wkcur.historyLen <= 1 && !wkcur.wkRawLoading) {
            var t = wkcur.wkRawList.length,
                r = indexOf(wkcur.wkRawList, wkcur.wkRaw);
            0 < r && (e = wkcur.wkRawList[r - 1]), 0 <= r && r < t - 1 && (o = wkcur.wkRawList[r + 1]), wkcur.wkRawListLoop && 1 < t && (e = e || wkcur.wkRawList[t - 1], o = o || wkcur.wkRawList[0])
        }
        return [e, o]
    },
    recacheRaw: function(e) {
        return !!(cur.wkviewNavRecache && e && cur.wkviewNavRecache[e]) && (delete cur.wkviewNavRecache[e], !0)
    },
    openRaw: function(e, o) {
        cancelEvent(e), showWiki(extend({
            from: wkcur.from
        }, {
            w: o
        }), !1, !1, {
            fromlist: 1,
            noloader: !0,
            preload: {
                cache: wkcur.navNoCache || WkView.recacheRaw(o) ? 0 : 1
            }
        })
    },
    navigate: function(e, o, t) {
        if ("intro" == wkcur.wkRaw) return WkView.introNext(t), cancelEvent(o), !1;
        var r = WkView.getNextWkRaws(),
            i = {};
        wkcur.from && (i.from = wkcur.from), 0 < t && r[1] && (wkcur.wkRawLoading = !0, addClass(wkcur.wkRightArrow, "wk_arrow_progress"), showProgress(wkcur.wkRightArrow), showWiki(extend(i, {
            w: r[1]
        }), !1, !1, {
            fromlist: 1,
            noloader: !0,
            preload: {
                cache: wkcur.navNoCache || WkView.recacheRaw(r[1]) ? 0 : 1
            }
        }), cancelEvent(o)), t < 0 && r[0] && (wkcur.wkRawLoading = !0, addClass(wkcur.wkLeftArrow, "wk_arrow_progress"), hideProgress(wkcur.wkRightArrow), showWiki(extend(i, {
            w: r[0]
        }), !1, !1, {
            fromlist: -1,
            noloader: !0,
            preload: {
                cache: wkcur.navNoCache || WkView.recacheRaw(r[0]) ? 0 : 1
            }
        }), cancelEvent(o))
    },
    updateHeight: function() {
        window.updateWndVScroll && updateWndVScroll();
        var e = browser.mobile ? window.innerHeight : lastWindowHeight,
            o = Math.max(wkcur.wkCont.offsetHeight, e);
        wkcur.wkLeftNav.style.height = wkcur.wkRightNav.style.height = o + "px";
        var t = wkcur.wkBox.offsetHeight;
        setStyle(wkcur.wkLeftArrowBg.firstChild, {
            height: t
        }), setStyle(wkcur.wkRightArrowBg.firstChild, {
            height: t
        })
    },
    updateSize: function(e) {
        if (wkcur.wkCont) {
            var o = getSize(wkcur.wkCont),
                t = document.documentElement,
                r = window.innerHeight || t.clientHeight || bodyNode.clientHeight,
                i = Math.max(positive((r - o[1] - 5) / 2), 14),
                a = i + 10,
                w = wkLayer.offsetHeight - o[1] + i + 90;
            wkcur.wkCont.style.top = i + "px", wkcur.wkRight.style.top = Math.max(a - wkLayerWrap.scrollTop, 16) + "px", wkcur.wkLeftArrowBg.style.paddingTop = wkcur.wkRightArrowBg.style.paddingTop = a + "px", wkcur.wkLeftArrowBg.style.paddingBottom = wkcur.wkRightArrowBg.style.paddingBottom = w + "px", e || (onBodyResize(), WkView.onResize())
        }
    },
    setLocation: function(e, o) {
        for (var t in wkcur.prevLoc = {}, nav.objLoc)("w" != t || nav.objLoc[t] != wkcur.wkRaw && o) && (wkcur.prevLoc[t] = nav.objLoc[t]);
        if (!e) {
            var r = extend(nav.objLoc, {
                w: wkcur.wkRaw
            });
            delete r.order, delete r.z, nav.strLoc != nav.toStr(r) && nav.setLoc(r)
        }
    },
    backLocation: function() {
        var e = hab.getLoc();
        if (wkcur.prevLoc && wkcur.prevLoc != e) nav.setLoc(wkcur.prevLoc);
        else {
            var o = e.split("/");
            1 < o.length && nav.setLoc(o[0])
        }
        layerQueue.noHistory()
    },
    showError: function(e) {
        window.wkcur && (delete wkcur.wkRawLoading, addClass(wkcur.wkRightArrow, "wk_arrow_progress"), addClass(wkcur.wkLeftArrow, "wk_arrow_progress"));
        var o = showFastBox({
            title: getLang("global_error")
        }, e, getLang("global_close"));
        return setTimeout(o.hide, 2e3), !0
    },
    onChange: function() {
        if (!wkcur.shown) return !1;
        clearTimeout(wkcur.autosaveTimeout), wkcur.autosaveTimeout = setTimeout(function() {
            wkcur.note && wkcur.toStatus && WkView.saveInfo(!0)
        }, 4e3)
    },
    likeOver: function(e) {
        var o = getSize(ge("wk_like_link")),
            r = o ? o[0] : 20;
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
                    var o = geByClass1("bottom_pointer", e.container, "div"),
                        t = geByClass1("top_pointer", e.container, "div");
                    setStyle(o, {
                        marginLeft: r + 2
                    }), setStyle(t, {
                        marginLeft: r + 2
                    })
                }
            }
        })
    },
    like: function() {
        if (vk.id)
            if (cur.viewAsBox) cur.viewAsBox();
            else {
                var t = !wkcur.liked;
                ajax.post("like.php", {
                    act: "a_do_" + (t ? "" : "un") + "like",
                    object: wkcur.like_obj || wkcur.wkRaw,
                    hash: wkcur.likehash,
                    from: "wkview"
                }, {
                    onDone: function(e, o) {
                        return WkView.likeUpdate(t, e, o)
                    }
                }), WkView.likeUpdate(t, wkcur.likes + (t ? 1 : -1))
            }
    },
    likeShare: function(e) {
        var o = wkcur.like_obj || wkcur.wkRaw,
            t = ge("like_share_" + o),
            r = isChecked(t);
        if (checkbox(t), ajax.post("like.php", {
                act: "a_do_" + (r ? "un" : "") + "publish",
                object: o,
                hash: e
            }, {
                onDone: WkView.likeUpdate.pbind(!0)
            }), ge("wk_like_link")) var i = val("wk_like_count"),
            a = hasClass(ge("wk_like_icon"), "my_like");
        else {
            var w = ge("like_real_count_" + o);
            i = w ? w.value : val("like_count" + o), a = hasClass(ge("like_icon" + o), "my_like")
        }
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
    likeUpdate: function(e, o, t) {
        o = intval(o);
        var r = ge("wk_like_wrap"),
            i = (domByClass(r, "_icon"), domByClass(r, "_count"));
        if (i) {
            var a = r.tt || {},
                w = clone(a.opts || {}),
                l = domByClass(a.container, "_value"),
                s = domByClass(a.container, "_content"),
                n = domByClass(a.container, "_title");
            t && n && val(n, t), a && (a.likeInvalidated = !0), l && (l.value = o), wkcur.likes = o, animateCount(i, o), wkcur.liked = e, toggleClass(r, "my_like", e), toggleClass(r, "no_likes", !o), toggleClass(s, "me_hidden", !e), a.el && (o ? !1 === t ? a.destroy && a.destroy() : isVisible(a.container) || t || tooltips.show(a.el, extend(w, {
                showdt: 0
            })) : a.hide())
        }
    },
    showLikesPage: function(e, o, t) {
        cur.likesBox.loadTabContent("like.php", {
            act: "a_get_members",
            object: e,
            published: o,
            offset: t,
            wall: 1
        }, o)
    },
    extPageSubscribe: function(e, o, t, r, i, a) {
        if (!buttonLocked(e)) {
            cur.wkSubscribed = cur.wkSubscribed || {};
            var w = hasClass(e, "secondary"),
                l = {
                    showProgress: lockButton.pbind(e),
                    hideProgress: unlockButton.pbind(e),
                    onDone: function() {
                        cur.wkSubscribed[o] = !w, toggleClass(e, "secondary"), r && w && hide(e)
                    }
                };
            if (i = i || "", 0 < o) ajax.post("al_friends.php", {
                act: w ? "remove" : "add",
                mid: o,
                hash: t,
                from: "wkview_extpage"
            }, l);
            else {
                var s = ajax.post.pbind("al_groups.php", {
                    act: w ? "a_leave" : "a_enter",
                    gid: -o,
                    hash: t,
                    from: "wkview_extpage",
                    t_src: i,
                    ad_data: a || ""
                }, l);
                if (r && w) var n = showFastBox(r.title, r.text, r.btn, function() {
                    n.hide(), s()
                }, getLang("global_cancel"));
                else s()
            }
        }
    },
    wallBeforeInitPost: function(e) {
        if (window.tooltips && tooltips.destroyAll(), revertLastInlineVideo(), wkcur.postInited) return !1;
        wkcur.pageReplaced = [];
        for (var o, t, r = wkcur.post; !(o = ge("post" + r)) && cur.onepost && r == cur.oid + "_" + cur.pid && (o = ge("fw_post")), o = o || ge("reply_fakebox" + r) || ge("reply_box" + r) || ge("replies" + r) || ge("feedback_row_wall" + r) || wkcur.hl_reply && (ge("post" + wkcur.hl_reply) || ge("feedback_row_wall_reply" + wkcur.hl_reply));) t = ce("div", {
            className: "wk_wall_post_placeholder",
            id: "wk_wall_post_placeholder_" + o.id
        }), o.parentNode.replaceChild(t, o), wkcur.pageReplaced.push([o, t]);
        cur.wallLayer = r, cur.wallLayerLike = wkcur.post_like, e.options.wall_tpl && (extend(window.lang, e.lang, e.options.wall_tpl.lang), extend(wkcur, {
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
            o = ge("reply_field" + e);
        cur.wkSubscribed && void 0 !== cur.wkSubscribed[intval(e)] && toggleClass(geByClass1("_wk_subscribe_btn", wkcur.wkBox), "secondary", cur.wkSubscribed[intval(e)]), delete cur.editing, o && placeholderInit(o, {
            editable: 1
        }), WkView.wallUpdateReplies(), wkcur.hl_reply ? setTimeout(Wall.scrollHighlightReply.pbind("post" + wkcur.hl_reply), 0) : setTimeout(function() {
            wkLayerWrap.scrollTop = wkcur.toScroll || 0, wkcur.toScroll = 0
        }, 0)
    },
    wallDeinitPost: function() {
        if (!wkcur.postInited) return !1;
        cur.wallLayer = !1, cur.wallLayerLike = !1, wkcur.edit && Wall.cancelEdit(), each(wkcur.pageReplaced, function() {
            var e = this[0],
                o = this[1];
            e && o && o.parentNode.replaceChild(e, o)
        }), clearInterval(wkcur.updatesCheckInt), clearInterval(wkcur.timeUpdateInt), revertLastInlineVideo(), window.tooltips && tooltips.destroyAll(), delete cur.editing, delete wkcur.postInited
    },
    wallOnEdit: function(e, o) {
        wkcur.edit = !0, wkcur.editor = {
            changed: !0
        }
    },
    wallOnEdited: function(e) {
        wkcur.edit = !1
    },
    wallPostShowDeletedMessage: function(e, o) {
        var t = ge("wl_post");
        if (t && domData(t, "post-id") === e) {
            cur.pgPaused = !0, hide("wl_replies_wrap", "wl_post_actions_wrap", "wl_reply_form_wrap");
            var r = domNS(t);
            return r && hasClass(r, "no_rows") ? val(r, o) : (r = ce("div", {
                id: "post_del" + e,
                innerHTML: o,
                className: "no_rows"
            }), domPN(t).insertBefore(r, domNS(t)), hide(t)), cur.wkviewNavRecache || (cur.wkviewNavRecache = {}), cur.wkviewNavRecache[wkcur.wkRaw] = 1, wkLayerWrap.scrollTop = 0, WkView.updateSize(), !0
        }
        return !1
    },
    wallPostHideDeletedMessage: function(e) {
        var o = ge("wl_post");
        if (o && domData(o, "post-id") === e) {
            cur.pgPaused = !1, show("wl_replies_wrap", "wl_post_actions_wrap", "wl_reply_form_wrap");
            var t = domNS(o);
            return t && hasClass(t, "no_rows") && re(t), show(o), cur.wkviewNavRecache || (cur.wkviewNavRecache = {}), cur.wkviewNavRecache[wkcur.wkRaw] = 1, wkLayerWrap.scrollTop = 0, WkView.updateSize(), !0
        }
        return !1
    },
    wallPostSetArchiveState: function(e, o, t, r, i) {
        if (!actionsMenuItemLocked(e) && !linkLocked(e)) {
            var a = intval(o.split("_")[1]),
                w = hasClass(e, "ui_actions_menu_item");
            ajax.post("al_wall_archive.php", {
                act: "a_set_state",
                from: "wkview",
                hash: t,
                state: r ? 1 : 0,
                postId: a
            }, {
                onDone: function(e) {
                    i ? WkView.wallPostHideDeletedMessage(o) : WkView.wallPostShowDeletedMessage(o, e)
                },
                showProgress: w ? lockActionsMenuItem.pbind(e) : lockLink(e),
                hideProgress: w ? unlockActionsMenuItem.pbind(e) : unlockLink(e)
            })
        }
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
        var o = wkcur.post;
        return cur.wallMyDeleted && (cur.wallMyDeleted[o] = 0), ajax.post("al_wall.php", {
            act: "restore",
            post: o,
            hash: e,
            from: "wkview"
        }, {
            onDone: function() {
                var e = ge("wl_post");
                if (e && !isVisible(e)) {
                    cur.pgPaused = !1, show("wl_replies_wrap", "wl_post_actions_wrap", "wl_reply_form_wrap");
                    var o = domNS(e);
                    show(e), o && hasClass(o, "no_rows") && re(o), WkView.updateSize()
                }
            }
        }), !1
    },
    wallUpdateRepliesOnScroll: function(e) {
        if (wkcur.postInited) {
            var o = window.innerHeight || document.documentElement.clientHeight,
                t = ge("wl_replies_more");
            if (!t) {
                var r = ge("replies" + cur.wallLayer),
                    i = domLC(r);
                i && hasClass(i, "replies_next") && isVisible(i) && (t = i)
            }
            if (t && isVisible(t)) getXY(t, !0)[1] < o + 500 && t.onclick();
            var a = ge("wl_reply_form");
            if (a && !hasClass(a, "wl_post_reply_form_forbidden")) {
                var w = ge("wl_reply_form_wrap"),
                    l = getXY(w, !0)[1],
                    s = getSize(a);
                if (formH = s[1], e && !1 === wkcur.fixedBottom && o - formH < l + 20) wkLayerWrap.scrollTop += l + 20 - (o - formH);
                else if (isVisible(w) && o - formH < l) {
                    wkcur.fixedBottom && !e || (wkcur.fixedBottom = !0, addClass(a, "wl_reply_form_fixed"));
                    var n = wkcur.fixedBottom ? Math.min(0, Math.max(-wkLayerWrap.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0])) : null;
                    setStyle("wl_reply_form_wrap", {
                        width: s[0],
                        height: s[1],
                        bottom: c,
                        marginLeft: n
                    });
                    var c = Math.min(0, o - getXY("wl_replies_wrap", !0)[1] - formH);
                    setStyle(a, {
                        bottom: c
                    })
                } else(wkcur.fixedBottom || e) && (wkcur.fixedBottom = !1, removeClass(a, "wl_reply_form_fixed"), setStyle("wl_reply_form_wrap", {
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
            o = wkcur.limit,
            t = ge("replies" + wkcur.post);
        return wkcur.count <= e || !t || (wkcur.loadingReplies = !0, Wall.moreReplies(wkcur.post, (wkcur.reverse ? -1 : 1) * e, o, {
            from: "wkview",
            append: !0,
            rev: wkcur.reverse ? 1 : 0,
            onDone: function(e, o, t) {
                extend(wkcur, {
                    count: t.count,
                    loaded: wkcur.loaded + t.num
                }), WkView.wallUpdateReplies(), wkcur.loadingReplies = !1
            },
            onFail: function() {
                wkcur.loadingReplies = !1
            },
            showProgress: lockButton.pbind("wl_replies_more"),
            hideProgress: unlockButton.pbind("wl_replies_more")
        })), !1
    },
    wallShowPreviousReplies: function(r) {
        if (wkcur.loadingReplies || wkcur.reverse) return !1;
        var e = Math.max(0, wkcur.offset - 100),
            o = Math.min(100, wkcur.offset - e),
            i = ge("replies" + wkcur.post);
        if (o <= 0 || !i) return !1;
        wkcur.loadingReplies = !0;
        var a = i.offsetHeight;
        Wall.moreReplies(wkcur.post, e, o, {
            from: "wkview",
            onDone: function(e, o, t) {
                extend(wkcur, {
                    count: t.count,
                    offset: t.offset,
                    loaded: wkcur.loaded + t.num
                }), r && (wkLayerWrap.scrollTop += i.offsetHeight - a, setTimeout(Wall.scrollHighlightReply.pbind("post" + r), 0)), WkView.wallUpdateReplies(), wkcur.loadingReplies = !1
            },
            onFail: function() {
                wkcur.loadingReplies = !1
            },
            showProgress: addClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading"),
            hideProgress: removeClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading")
        }), StickersAnimation && StickersAnimation.reloadStickers()
    },
    wallUpdateReplies: function() {
        toggle("wl_replies_more", wkcur.offset + wkcur.loaded < wkcur.count);
        var e = ge("wl_replies_header"),
            o = langNumeric(wkcur.count, wkcur.lang.wall_N_replies),
            t = !1;
        !wkcur.reverse && 0 < wkcur.offset && (o = 100 < wkcur.offset ? langNumeric(100, wkcur.lang.wall_show_n_of_m_last).replace("{count}", wkcur.count) : langNumeric(wkcur.count, wkcur.lang.wall_show_all_n_replies), t = !0), val("wl_replies_header_label", o), toggleClass(e, "wl_replies_header_clickable", t);
        var r = ge("wl_replies_wrap"),
            i = ge("wl_reply_form");
        if (r && (wkcur.count && !isVisible(r.firstChild) && show(r.firstChild), toggleClass(r, "wl_replies_empty", !wkcur.count)), i) {
            var a = ge("wl_reply_form_wrap");
            i.parentNode != a && a.appendChild(i)
        }
        WkView.wallUpdateRepliesOnScroll(), WkView.updateSize()
    },
    wallInitUpdates: function() {
        var e = wkcur.options.add_queue_key;
        if (e && window.Notifier) {
            function o() {
                wkcur.wallAddQueue && Notifier.addKey(wkcur.wallAddQueue, Wall.updated.pbind(!0))
            }
            wkcur.wallAddQueue;
            wkcur.wallAddQueue = e, o(), wkcur.updatesCheckInt = setInterval(o, 1e4)
        }
    },
    wallCancelEditReply: function() {
        var e = wkcur.post,
            o = ge("reply_field" + e),
            t = o && data(o, "composer");
        t ? Composer.reset(t) : val(o, ""), Wall.hideEditReply(e), WkView.wallUpdateReplies()
    },
    wallInverseReplies: function(r) {
        if (wkcur.loadingReplies) return !1;
        wkcur.loadingReplies = !0, wkcur.reverse = !wkcur.reverse, wkcur.offset = 0, Wall.moreReplies(wkcur.post, wkcur.offset, wkcur.limit, {
            from: "wkview",
            clear: !0,
            rev: wkcur.reverse ? 1 : 0,
            onDone: function(e, o, t) {
                domFC(r).className = wkcur.reverse ? "sort_rev_icon" : "sort_not_rev_icon", extend(wkcur, {
                    count: t.count,
                    loaded: t.num
                }), WkView.wallUpdateReplies(), wkcur.loadingReplies = !1
            },
            onFail: function() {
                wkcur.reverse = !wkcur.reverse, wkcur.loadingReplies = !1
            },
            showProgress: addClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading"),
            hideProgress: removeClass.pbind("wl_replies_header_wrap", "wl_replies_header_loading")
        })
    },
    likesInit: function() {
        (extend(wkcur, {
            historyLen: wkcur.historyLen || 0
        }), WkView.initSTL(), WkView.likesTabInit(), addEvent(wkLayerWrap, "scroll", WkView.onScroll), addEvent(window, "resize", WkView.onResize), onBodyResize(), cur.wallTpl = cur.wallTpl || {}, cur.wallInited) ? hasClass(ge("wl_post"), "deep_active") && wkcur.wall_opts.wall_tpl.reply_form_new ? (wkcur._oldReplyFormNew = cur.wallTpl.reply_form_new, cur.wallTpl.reply_form_new = wkcur.wall_opts.wall_tpl.reply_form_new) : (wkcur._oldReplyForm = cur.wallTpl.reply_form, cur.wallTpl.reply_form = wkcur.wall_opts.wall_tpl.reply_form): Wall.initWallOptions(wkcur.wall_opts);
        void 0 === cur.options ? cur.options = {
            reply_names: {}
        } : void 0 === cur.options.reply_names && (cur.options.reply_names = {}), extend(cur.options.reply_names, wkcur.reply_names), wkcur._hide.push(function() {
            removeEvent(wkLayerWrap, "scroll", WkView.onScroll), removeEvent(window, "resize", WkView.onResize), wkcur._oldReplyForm && (cur.wallTpl.reply_form = wkcur._oldReplyForm, wkcur._oldReplyForm = !1), wkcur._oldReplyFormNew && (cur.wallTpl.reply_form_new = wkcur._oldReplyFormNew, wkcur._oldReplyFormNew = !1)
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
            o = getXY(e, !0)[1];
        wkcur.lSTL && wkcur.lSTL.el == ge("wk_box") && (wkcur.lSTLWas = 0), o < 0 && (wkLayerWrap.scrollTop += o + 1), WkView.likesOnScroll(), wkcur.lSTL && WkView.stlOnScroll()
    },
    likesTab: function(e) {
        var o = ge("likes_tab_" + e),
            t = o && domFC(o),
            r = gpeByClass("ui_tabs", t);
        if (!t || geByClass1("ui_tab_sel", r) == t) return !1;
        uiTabs.switchTab(t);
        var i = gpeByClass("wk_wiki_content", r);
        ge("tb_tabs_wrap");
        ajax.post("wkview.php", {
            act: "show",
            w: e + "/" + wkcur.like_obj,
            part: 1
        }, {
            cache: 1,
            showProgress: addClass.pbind(i, "box_loading"),
            hideProgress: removeClass.pbind(i, "box_loading"),
            onDone: function(e, o) {
                val("wk_likes_content", e), extend(wkcur, o), WkView.likesTabInit(), WkView.setLocation(), WkView.updateHeight(), WkView.likesToTop()
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
        var n = ge("wk_likes_more_link");
        isButtonLocked(n) || ajax.post("wkview.php", {
            act: "show",
            w: wkcur.wkRaw,
            offset: wkcur.offset
        }, {
            onDone: function(e, o, t, r, i) {
                var a = ge("wk_likes_rows");
                if (a) {
                    if (i)
                        for (var w = geByClass("wk_likes_hidden", a), l = 0, s = w.length; l < s; ++l) a.appendChild(w[l]), removeClass(w[l], "wk_likes_hidden");
                    a.appendChild(cf(e)), wkcur.offset = o, t ? WkView.likesPreload() : hide(n), WkView.updateHeight(), r && extend(cur.options.reply_names, r)
                }
            },
            showProgress: lockButton.pbind(n),
            hideProgress: unlockButton.pbind(n),
            cache: 1
        })
    },
    likesOnScroll: function(e) {
        var o = lastWindowHeight,
            t = ge("wk_likes_more_link"),
            r = ge("tb_tabs"),
            i = ge("tb_tabs_wrap");
        getXY(i, !0)[1] < 0 ? wkcur.tbFixed || (setStyle(i, "height", domFC(r).offsetHeight), setStyle(domFC(r), "width", intval(getStyle(domFC(r), "width"))), addClass(r, "ui_tabs_fixed"), wkcur.tbFixed = !0) : wkcur.tbFixed && (removeClass(r, "ui_tabs_fixed"), wkcur.tbFixed = !1), isVisible(t) && o > getXY(t, !0)[1] && t.click()
    },
    likesBlacklistTip: function(e) {
        showTooltip(e, {
            text: getLang("like_block_liker"),
            shift: [8, 5, 5],
            black: 1
        })
    },
    likesBlacklist: function(e, o, t) {
        return e.tt && e.tt.destroy && e.tt.destroy(), showBox("like.php", {
            act: "spam",
            mid: o,
            object: wkcur.like_obj
        }), cancelEvent(t)
    },
    likesRecache: function(e) {
        for (var o in wkcur.offset += e, ajaxCache) o.match(new RegExp("^\\/wkview.php\\#act=show", "")) && delete ajaxCache[o]
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
            o = ge("wk_history_more_link");
        o && isVisible(o) && getXY(o, !0)[1] < e + 500 && o.onclick()
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
            onDone: function(e, o) {
                if (ge("wk_history_rows")) {
                    extend(wkcur, e), ge("wk_history_rows").appendChild(cf(o)), setTimeout(WkView.historyOnScroll, 500);
                    var t = wkcur.offset < wkcur.count && o;
                    toggle("wk_history_more_link", t), toggle("wk_history_empty", !t && !domFC(ge("wk_history_rows"))), toggleClass("wk_history_more", "wk_history_more_loading", t && !domFC(ge("wk_history_rows"))), wkcur.loadingHistory = !1
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
        var o = wkcur[e ? "wkRightArrow" : "wkLeftArrow"];
        if (!o.cached) {
            o.cached = !0;
            var t = WkView.getNextWkRaws()[e ? 1 : 0];
            if (t) {
                var r = {
                    w: t
                };
                if (t && "/query" == t.substr(-6)) {
                    var i = clone(nav.objLoc);
                    delete i[0], delete i.w, r.query = JSON.stringify(i)
                }
                wkcur.from && (r.from = wkcur.from), ajax.post("wkview.php", extend({
                    act: "show",
                    loc: nav.objLoc[0]
                }, r), {
                    cache: 1
                })
            }
        }
    },
    back: function() {
        if (1 < wkcur.historyLen) return wkcur.doBack = 1, wkcur.historyLen -= 1, history.go(-1), !0;
        WkView.hide()
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
                    var o = wkcur.lSTLWas;
                    wkcur.lSTLWas = 0, wkLayerWrap.scrollTop = o
                } else wkcur.lSTLWas = wkLayerWrap.scrollTop, wkLayerWrap.scrollTop = 0;
            return cancelEvent(e)
        }
    },
    stlOnScroll: function(e) {
        var o = wkLayerWrap.scrollTop,
            t = wkcur.lSTLWas || 200 < o,
            r = 0;
        if (wkcur.lSTL.style.marginTop = o + "px", vk.staticheader) {
            var i = getSize("page_header_wrap")[1];
            wkcur.lSTLText.style.marginTop = Math.max(-Math.min(scrollGetY(), bodyNode.clientHeight - (window.lastWindowHeight || 0)), -i) + "px"
        }
        if (t ? (1 !== wkcur.lSTLShown && (show(wkcur.lSTL), wkcur.lSTLShown = 1), wkcur.lSTLWas && 500 < o && (wkcur.lSTLWas = 0), 200 < o ? (r = (o - 200) / 200, wkcur.lSTLWasSet && (wkcur.lSTLWasSet = 0, val(domLC(wkcur.lSTL), getLang("global_to_top")), removeClass(domLC(wkcur.lSTL), "down"))) : (r = (200 - o) / 200, wkcur.lSTLWas && (wkcur.lSTLWasSet || (wkcur.lSTLWasSet = 1, val(domLC(wkcur.lSTL), ""), addClass(domLC(wkcur.lSTL), "down"))))) : 0 !== wkcur.lSTLShown && (hide(wkcur.lSTL), wkcur.lSTLShown = 0), wkcur.wkLeft && wkcur.wkLeftNav) {
            var a = 1 < wkcur.historyLen && !t;
            toggle(wkcur.wkLeft, a), toggle(wkcur.wkLeftNav, a), setStyle(wkcur.wkLeftWrap, {
                opacity: 1 - Math.min(Math.max(o / 200, 0), 1)
            }), a || setStyle(wkcur.wkLeft, {
                opacity: .4
            })
        }
        setStyle(wkcur.lSTL, {
            opacity: Math.min(Math.max(r, 0), 1)
        })
    },
    subscribe: function(o, e) {
        var t = o.tt && (o.tt.shown || o.tt.showing);
        t ? tooltips.hide(o, {
            fasthide: 1
        }) : o.tt && o.ttimer && (clearTimeout(o.ttimer), t = !0), ajax.post("/al_wall.php", {
            act: "toggle_subscribe",
            post: wkcur.post,
            hash: e
        }, {
            onDone: function(e) {
                WkView.setSubscribed(o, e.subscribed, t)
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        })
    },
    setSubscribed: function(e, o, t) {
        e.innerHTML = wkcur.lang[o ? "wall_unsubscribe_post" : "wall_subscribe_post"], toggleClass(e, "wl_post_subscribed", o), t && WkView.showSubscribeTooltip(e), cur.onWKSubscribe && (cur.onWKSubscribe(o), delete cur.onWKSubscribe)
    },
    showSubscribeTooltip: function(e) {
        var o = hasClass(e, "wl_post_subscribed");
        getSize(e)[0];
        showTooltip(e, {
            dir: "left",
            asrtl: 1,
            text: function() {
                return wkcur.lang[o ? "wall_unsubscribe_post_tt" : "wall_subscribe_post_tt"]
            },
            shift: [260, -15],
            slideX: -10,
            showdt: 200,
            className: "subscr_post_tt"
        })
    },
    shareApp: function(t, r) {
        if (vk.id) {
            var e = {
                act: "publish_box",
                object: wkcur.like_obj,
                url_hash: r,
                list: "",
                from: "wkview"
            };
            showBox("like.php", e, {
                onDone: function() {
                    var e = t;
                    r && (e += "#" + r);
                    var o = cur.sbField && data(cur.sbField, "composer");
                    o && o.addMedia.checkURL(e)
                }
            })
        }
    },
    closeComments: function(e, r, i, o) {
        Wall.closeComments(e, r, i, o, function(t) {
            WkView.onCloseComments(t, r, i), wkcur.pageReplaced && wkcur.pageReplaced.length && wkcur.pageReplaced.forEach(function(e) {
                var o = e[0];
                o.id === "post" + r + "_" + i && Wall.onCloseComments(t, o)
            })
        })
    },
    onCloseComments: function(o, t, r, e) {
        var i = o ? geByClass1("wl_post_reply_form_forbidden") : ge("wl_reply_form");
        if (e || i) {
            var a = o ? ge("wl_reply_form") : geByClass1("wl_post_reply_form_forbidden"),
                w = ge("wl_post");
            wkcur.isArchived ? (toggleClass(w, "closed_comments", !0), hide(i)) : (toggleClass(w, "closed_comments", o), show(i)), hide(a);
            var l = geByClass1("action_closing_comments", w);
            domData(l, "closed", o), val(l, getLang(o ? "wall_open_comments" : "wall_closing_comments"))
        } else ajax.post("wkview.php", {
            act: "comment_box",
            owner_id: t,
            post_id: r
        }, {
            onDone: function(e) {
                e && (ge("wl_reply_form_wrap").appendChild(se(e)), o || wkcur.isArchived || WkView.wallAfterInitPost(), WkView.onCloseComments(o, t, r, !0))
            }
        })
    },
    _eof: 1
};
try {
    stManager.done("wkview.js")
} catch (e) {}