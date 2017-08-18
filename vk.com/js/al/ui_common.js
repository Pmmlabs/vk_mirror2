function OList(t, e, i, s) {
    0 === i.length && (i = {}), s = s || {}, this.indexer = new vkIndexer(e, s.getName ? s.getName : function(t) {
        return t[1]
    }), this.owners = e, this.tpl = s.tpl, this.rsTpl = s.rsTpl, this.idIndex = s.idIndex || 0, this.selected = i, this.getUnsorted = s.getUnsorted, this.unsortedIndex = s.unsortedIndex || 0, this.box = t, this.filter = s.filter, s.onTabUpdate && (this.onTabUpdate = s.onTabUpdate), s.onListClick && (this.onListClick = s.onListClick), t.setButtons(getLang("global_save"), function(i) {
        var n = {},
            r = [],
            l = [];
        each(e, function() {
            !o.invertedSelection && o.selected[this[o.idIndex]] || o.invertedSelection && !o.selected[this[o.idIndex]] ? (n[this[o.idIndex]] = this, r.push(this[o.idIndex])) : l.push(this[o.idIndex])
        }), cur.onOListSave(r, l, n, s.ret || {}, i) !== !1 && t.hide(200)
    }, getLang("global_cancel")), s.box_options && t.setOptions(s.box_options);
    var o = this;
    this.scrollNode = geByClass1("privacy_olist", t.bodyNode), this.moreEl = geByClass1("olist_more", t.bodyNode, "a"), this.olistEl = geByClass1("olist", t.bodyNode, "div"), this.olistFilter = ge("olist_filter_actions"), this.sel = s.sel || 0, this.tabs = geByClass1("ui_tabs", t.bodyNode), this.noSelMsg = s.noSelMsg || getLang("friends_no_user_selected"), this.invertedSelection = !1;
    var n = geByClass1("olist_tab_sel", this.tabs);
    this.selCnt = intval(val(geByClass1("ui_tab_count", n)));
    var r = this.filter ? this.filter : this.filter = ge("olist_filter");
    setTimeout(elfocus.pbind(r), 100), this.moreEl && (isVisible(this.moreEl) ? this.moreEl.onclick = function(t) {
        return o.renderList("", 60), cancelEvent(t)
    } : (re(this.moreEl), show(this.moreEl))), addEvent(this.olistEl, "click", this.onMouseEvent.bind(this)), addEvent(this.scrollNode, "scroll", this.onScroll.bind(this));
    var l = o.sel ? o.sel > 0 ? "sel" : "unsel" : "all",
        a = geByClass1("olist_tab_" + l, o.tabs);
    a = a && geByClass1("ui_tab", a), (cur.onOListTabChange = function(t, e) {
        t && uiTabs.switchTab(t), void 0 === e && (e = void 0 === o.selPrev ? 0 : o.selPrev), o.selPrev = o.sel, o.sel = e, o.renderList(val(r), 0, e), setTimeout(elfocus.pbind(r), 100)
    })(a, o.sel), cur.onOlistChange = o.renderList.bind(this), cur.onOlistSelect = o.onOlistSelect.bind(this), cur.onOlistFilters = o.onOlistFilters.bind(this)
}

function Slider(t, e) {
    if (this.constructor != Slider) throw new Error("Slider was called without 'new' operator");
    if (!t) throw new Error("No element was provided for Slider");
    t = ge(t), this.options = e || {
        size: 1
    }, this.options.backValue = this.options.backValue || 0;
    var i = 100 * this.options.backValue,
        s = this.options.withBackLine ? '<div class="slider_back" style="width:' + i + '%"></div>' : "",
        o = '<div class="slider_slide"><div class="slider_loading_bar" style="opacity: 0; display: none;"></div> ' + s + ' <div class="slider_amount"></div> <div class="slider_handler"></div> </div>';
    this._el = ce("div", {
        innerHTML: o,
        className: "slider",
        id: t.getAttribute("id") || ""
    });
    for (var n = t.classList || [], r = this, l = 0, a = n.length; a > l; l++) addClass(this._el, n[l]);
    each(this._el.attributes, function(t, e) {
        ("id" != e.name || "class" != e.name) && r._el.setAttribute(e.name, e.value)
    }), t.parentNode.replaceChild(this._el, t), data(this._el, "slider", this), this._amountEl = geByClass1("slider_amount", this._el), this._handlerEl = geByClass1("slider_handler", this._el), this._slideEl = geByClass1("slider_slide", this._el), this._backEl = geByClass1("slider_back", this._el), this._progressEl = geByClass1("slider_loading_bar", this._el), this.options.color && (setStyle(this._amountEl, {
        backgroundColor: this.options.color
    }), setStyle(this._handlerEl, {
        backgroundColor: this.options.color
    })), this.options.backColor && setStyle(this._slideEl, {
        backgroundColor: this.options.backColor
    }), addClass(this._el, "slider_size_" + this.options.size), this.options.debounce && (this._onValueChangeDebounced = debounce(this._onValueChange, this.options.debounce)), e.formatHint && (addEvent(this._el, "mousemove", this._ev_onMouseOver = this._onMouseOver.bind(this)), addEvent(this._el, "mouseleave", this._ev_onMouseLeave = this._onMouseLeave.bind(this))), addEvent(this._el, "mousedown", this._ev_onMouseDown = this._onMouseDown.bind(this)), this.setValue(this.options.value || 0, this.options.fireChangeEventOnInit ? !1 : !0, !1), this.setBackValue(this.options.backValue)
}
var uiTabs = {
        initTabs: function(t, e) {
            if (!(browser.msie && intval(browser.version) < 10 || browser.opera && intval(browser.version) < 15 || hasClass(t, "ui_tabs_sliding"))) {
                var i = getSize(e)[0],
                    s = e.offsetLeft,
                    o = geByClass1("_ui_tabs_slider", t);
                if (!domData(t, "inited")) {
                    var n = {
                        width: i + "px",
                        marginLeft: s
                    };
                    setStyle(o, n)
                }
            }
        },
        tryInit: function(t) {
            if (!domData(t, "inited")) {
                var e = geByClass1("ui_tab_group_sel", t) || geByClass1("ui_tab_sel", t);
                e && uiTabs.initTabs(t, e), domData(t, "inited", 1)
            }
        },
        goTab: function(t, e, i) {
            if (checkEvent(e)) return !0;
            var s = gpeByClass("ui_tabs", t);
            return i || geByClass1("ui_tab_sel", s) != t ? (uiTabs.switchTab(t), uiTabs.showProgress(s), nav.go(t, e, {
                tab: t
            })) : !1
        },
        switchTab: function(t, e) {
            var i = gpeByClass("ui_tabs", t),
                s = geByClass1("ui_tab_sel", i),
                o = null,
                n = null,
                r = hasClass(s, "ui_tab_group_item") ? n = gpeByClass("ui_tab_group", s) : s,
                l = hasClass(t, "ui_tab_group_item") ? o = gpeByClass("ui_tab_group", t) : t;
            if (t != s) {
                if (t != l && (uiTabs.toggleGroup(l, !1), uiTabs.resetLabel(l, t)), r) {
                    uiTabs.initTabs(i, r), e = e || {}, e.noAnim || l === r || (addClass(i, "ui_tabs_sliding"), clearTimeout(cur.tabSlidingTO), cur.tabSlidingTO = setTimeout(removeClass.pbind(i, "ui_tabs_sliding"), 300));
                    var a = geByClass1("_ui_tabs_slider", i),
                        h = intval(a.style.marginLeft),
                        d = {
                            width: getSize(l)[0] + "px"
                        };
                    d[cssTransformProp] = "translateX(" + (l.offsetLeft - h) + "px)", setStyle(a, d), s != r && l != r && uiTabs.resetLabel(r), r != s && removeClass(r, "ui_tab_group_sel"), removeClass(s, "ui_tab_sel")
                }
                if (l != t && addClass(l, "ui_tab_group_sel"), addClass(t, "ui_tab_sel"), n && removeClass(n, "ui_tab_hide_separator"), o) {
                    i = geByClass1("ui_tab_group_items", o, "div").children;
                    var u = null;
                    each(i, function(t, e) {
                        "SPAN" === e.tagName ? u = e : hasClass(domFC(e), "ui_tab_sel") || hasClass(e, "unshown") || (u = null)
                    }), u && addClass(o, "ui_tab_hide_separator")
                }
            }
            return !1
        },
        resetLabel: function(t, e) {
            var i = geByClass1("ui_tab_group_label", t, "span");
            i && (i.innerHTML = (e || i).getAttribute("data-default-label"))
        },
        toggleGroup: function(t, e) {
            var i = data(t, "visibletimer");
            i && clearTimeout(i), data(t, "visibletimer", setTimeout(toggleClass.pbind(t, "visible", e), e ? 0 : 100)), toggleClass(t, "shown", e)
        },
        showGroup: function(t) {
            var e = data(t, "hidetimer");
            e && (clearTimeout(e), data(t, "hidetimer", 0)), uiTabs.toggleGroup(t, !0)
        },
        hideGroup: function(t) {
            var e = data(t, "hidetimer");
            e || data(t, "hidetimer", setTimeout(function() {
                uiTabs.toggleGroup(t, !1), data(t, "hidetimer", 0)
            }, 200))
        },
        showProgress: function(t) {
            hasClass(t, "ui_tabs") || (t = gpeByClass("ui_tabs", t)), addClass(t, "ui_tabs_loading")
        },
        hideProgress: function(t) {
            hasClass(t, "ui_tabs") || (t = gpeByClass("ui_tabs", t)), removeClass(t, "ui_tabs_loading")
        },
        showSearch: function(t, e) {
            if (checkEvent(e)) return !0;
            var i = gpeByClass("ui_tabs", t),
                s = (domByClass(i, "ui_search"), domByClass(i, "_field"));
            return addClass(i, "ui_tabs_search_opened"), uiSearch.focus(s), !1
        },
        hideSearch: function(t, e) {
            if (checkEvent(e)) return !0;
            var i = gpeByClass("ui_tabs", t);
            return removeClass(i, "ui_tabs_search_opened"), !1
        }
    },
    uiActionsMenu = {
        keyToggle: function(t, e) {
            if (!checkKeyboardEvent(e)) return !1;
            var i = domClosest("_ui_menu_wrap", t);
            i && uiActionsMenu.toggle(i, !hasClass(i, "shown"))
        },
        toggle: function(el, s) {
            var dummyMenu = data(el, "dummyMenu");
            dummyMenu && (el = dummyMenu), toggleClass(el, "shown", s);
            var onhide = attr(el, "onHide");
            onhide && !hasClass(el, "shown") && eval(onhide)
        },
        show: function(t, e, i) {
            var s = data(t, "hidetimer");
            s && (clearTimeout(s), data(t, "hidetimer", 0));
            var o = data(t, "origMenu");
            if (o && (s = data(o, "hidetimer")) && (clearTimeout(s), data(t, "hidetimer", 0)), i && i.delay) {
                cur.uiActionsMenuShowTimeout && clearTimeout(cur.uiActionsMenuShowTimeout);
                var n = i.delay;
                return delete i.delay, void(cur.uiActionsMenuShowTimeout = setTimeout(uiActionsMenu.show.pbind(t, e, i), n))
            }
            if (cur.uiActionsMenuShowTimeout && (clearTimeout(cur.uiActionsMenuShowTimeout), delete cur.uiActionsMenuShowTimeout), i && i.appendParentCls) {
                var r, l, a = geByClass1("_ui_menu", t);
                if (a) {
                    l = domClosest(i.appendParentCls, a), r = domClosest("_ui_menu_wrap", t);
                    var h = se('<div class="' + r.className + ' ui_actions_menu_dummy_wrap" onmouseover="uiActionsMenu.show(this);" onmouseout="uiActionsMenu.hide(this);"></div>');
                    if (h.appendChild(a), l.appendChild(h), data(t, "dummyMenu", h), data(h, "origMenu", t), t = h, data(a, "top", intval(getStyle(a, "top"))), data(a, "left", intval(getStyle(a, "left"))), data(a, "right", intval(getStyle(a, "right"))), i.processHoverCls) {
                        var d = domClosest(i.processHoverCls, r);
                        addEvent(t, "mouseover", addClass.pbind(d, "hover")), addEvent(t, "mouseout", removeClass.pbind(d, "hover"))
                    }
                } else t = data(t, "dummyMenu");
                var u = data(t, "origMenu");
                a = geByClass1("_ui_menu", t), r = domClosest("_ui_menu_wrap", u), l = domClosest(i.appendParentCls, a), setStyle(a, {
                    display: "block"
                });
                var c = getXY(l),
                    p = getXY(r),
                    m = data(a, "top"),
                    g = data(a, "left"),
                    v = data(a, "right"),
                    _ = {
                        top: p[1] - c[1] + m
                    };
                v ? _.right = getSize(l)[0] + c[0] - p[0] - getSize(r)[0] + v : _.left = p[0] - c[0] + g, setStyle(a, _)
            }
            var a = geByClass1("_ui_menu", t);
            if (i && i.autopos && a && !hasClass(t, "shown")) {
                removeClass(t, "ui_actions_menu_left");
                var f = getXY(t)[1],
                    b = getSize(t)[1],
                    w = getSize(a)[1],
                    S = i.dy || 10,
                    C = getXY(a)[0];
                removeClass(t, "ui_actions_menu_top"), addClass(t, "no_transition"), f + b + S + w > (browser.mozilla ? getSize("page_wrap")[1] : scrollGetY() + (window.lastWindowHeight || 0)) && addClass(t, "ui_actions_menu_top"), f - S - w < scrollGetY() + getSize("page_header_wrap")[1] && removeClass(t, "ui_actions_menu_top"), toggleClass(t, "ui_actions_menu_left", 0 > C), removeClass(t, "no_transition")
            }
            i && i.scroll && i.maxHeight && (a.style.maxHeight = (intval(i.maxHeight) || 200) + "px", a.__uiScroll__ || new uiScroll(a)), uiActionsMenu.toggle(t, !0)
        },
        hide: function(t, e) {
            cur.uiActionsMenuShowTimeout && (clearTimeout(cur.uiActionsMenuShowTimeout), delete cur.uiActionsMenuShowTimeout);
            var i = data(t, "hidetimer");
            i || data(t, "hidetimer", setTimeout(function() {
                uiActionsMenu.toggle(t, !1), data(t, "hidetimer", 0)
            }, 200))
        }
    },
    uiRightMenu = {
        initMenu: function(t, e) {
            if (!(browser.msie && intval(browser.version) < 10 || browser.opera && intval(browser.version) < 15 || hasClass(t, "ui_rmenu_sliding"))) {
                var i = geByClass1("ui_rmenu_item", t),
                    s = geByClass1("ui_rmenu_item_sel", t),
                    o = s || i,
                    n = getSize(o)[1],
                    r = o.offsetTop,
                    l = geByClass1("_ui_rmenu_slider", t);
                if (!e) {
                    var a = {
                        height: n,
                        top: s ? r : 0
                    };
                    setStyle(l, a), addClass(t, "ui_rmenu_sliding")
                }
            }
        },
        go: function(t, e, i, s) {
            if (checkEvent(e)) return !0;
            var o = gpeByClass("ui_rmenu", t);
            return (s || {}).ignoreSelected || geByClass1("ui_rmenu_item_sel", o) != t ? (uiRightMenu.switchMenu(t), uiRightMenu.showProgress(t), i === !1 ? !1 : nav.go(i || t, e, extend({
                fromMenu: !0
            }, s || {}))) : !1
        },
        switchMenu: function(t, e) {
            var i = gpeByClass("ui_rmenu", t),
                s = geByClass1("ui_rmenu_item_sel", i);
            if (t == s && !e) return !1;
            var o = hasClass(t, "_audio_album_item");
            uiRightMenu.initMenu(i, o);
            var n = getSize(t)[1],
                r = t.offsetTop,
                l = [],
                a = [],
                h = domPN(t);
            if (o && (r += getXY(h)[1] - getXY(i)[1]), hasClass(i, "_ui_rmenu_auto_expand")) {
                var d = geByClass("_ui_rmenu_sublist", i),
                    u = hasClass(t, "_ui_rmenu_subitem") ? gpeByClass("_ui_rmenu_sublist", t) : hasClass(domNS(t), "_ui_rmenu_sublist") ? domNS(t) : !1;
                each(d, function() {
                    isVisible(this) && this !== u && (l.push(this), hide(this))
                }), u && !isVisible(u) && (a.push(u), show(u)), r = t.offsetTop, each(l, function() {
                    show(this)
                }), each(a, function() {
                    hide(this)
                })
            }
            var c = geByClass1("_ui_rmenu_slider", i),
                p = intval(c.style.top),
                m = {
                    height: n
                };
            return browser.msie_edge ? m.marginTop = r - p + "px" : m[cssTransformProp] = "translateY(" + (r - p) + "px)", setStyle(c, m), removeClass(s, "ui_rmenu_item_sel"), addClass(t, "ui_rmenu_item_sel"), hasClass(i, "_ui_rmenu_auto_expand") ? each(l.concat(a), function() {
                uiRightMenu.toggleSubmenu(this)
            }) : hasClass(t, "_ui_rmenu_subitem") && !isVisible(domPN(t)) && uiRightMenu.toggleSubmenu(domPN(t)), !1
        },
        fixScroller: function(t) {
            var e = gpeByClass("ui_rmenu", t);
            if (e && isVisible(t)) {
                var i = hasClass(e, "ui_rmenu_sliding"),
                    s = hasClass(t, "_audio_album_item"),
                    o = getSize(t)[1];
                i && uiRightMenu.hideSliding(e);
                var n = t.offsetTop,
                    r = geByClass1("_ui_rmenu_slider", e),
                    l = intval(r.style.top),
                    a = {
                        height: o
                    };
                s && (n += getXY(domPN(t))[1] - getXY(e)[1]), browser.msie_edge ? a.marginTop = n - l + "px" : a[cssTransformProp] = "translateY(" + (n - l) + "px)", setStyle(r, a), t.offsetLeft, i && uiRightMenu.showSliding(e)
            }
        },
        unselectAll: function(t) {
            removeClass(t, "ui_rmenu_sliding"), removeClass(geByClass1("ui_rmenu_item_sel", t), "ui_rmenu_item_sel")
        },
        hideSliding: function(t) {
            removeClass(t, "ui_rmenu_sliding")
        },
        showSliding: function(t) {
            addClass(t, "ui_rmenu_sliding")
        },
        showProgress: function(t) {
            hasClass(t, "ui_rmenu") || (t = gpeByClass("ui_rmenu", t));
            var e = geByClass1("ui_rmenu_loading_item", t);
            e && removeClass(e, "ui_rmenu_loading_item");
            var i = geByClass1("ui_rmenu_item_sel", t);
            hideProgress(t), showProgress(domFC(i), "", "", !0), addClass(t, "ui_rmenu_loading"), addClass(i, "ui_rmenu_loading_item")
        },
        hideProgress: function(t) {
            hasClass(t, "ui_rmenu") || (t = gpeByClass("ui_rmenu", t)), hideProgress(t);
            var e = gpeByClass("ui_rmenu", t);
            removeClass(t, "ui_rmenu_loading"), uiRightMenu.hideSliding(e);
            var i = geByClass1("ui_rmenu_loading_item", e);
            i && removeClass(i, "ui_rmenu_loading_item")
        },
        toggleSubmenu: function(name, ref) {
            var menu = gpeByClass("ui_rmenu", ref),
                el, submenu;
            if ("string" == typeof name ? submenu = geByClass1("_ui_rmenu_" + name + "_list", menu) : (submenu = name, name = submenu.getAttribute("data-sublist-id")), el = geByClass1("_ui_rmenu_" + name + "_toggle", menu), !submenu) return !1;
            void 0 !== ref && uiRightMenu.hideSliding(menu), el && toggleClass(el, "ui_rmenu_item_expanded", !isVisible(submenu)), slideToggle(submenu, submenu && getSize(submenu)[1] ? 100 : 0), setTimeout(updateNarrow, 100);
            var onToggle = domData(el, "on-toggle");
            return onToggle && setTimeout(function() {
                eval(onToggle)
            }, 150), !1
        }
    },
    uiPageBlock = {
        showSaved: function(t) {
            var e = ge(t),
                i = e && gpeByClass("page_block", e),
                s = i && geByClass1("page_block_saved", i);
            if (e && i && s) {
                var o = animate.pbind(s, {
                    opacity: 1
                }, 200, animate.pbind(s, {
                    opacity: 0
                }, 2e3));
                uiPageBlock.scrollToStart(i, o)
            }
        },
        scrollToStart: function(t, e) {
            var i = getXY(t)[1],
                s = 60,
                o = 200;
            scrollGetY() > i - s ? (scrollToY(i - s, o), e && setTimeout(e, o)) : e && e()
        }
    },
    uiSearch = {
        destroy: function(t) {
            var e = uiSearch.getFieldEl(t);
            uiSearch.stopEvents(e), data(e, "opts", {}), data(e, "inited", 0), data(e, "eventHandlers", {})
        },
        getWrapEl: function(t) {
            return domClosest("_wrap", t)
        },
        getFieldEl: function(t) {
            return t = ge(t), hasClass("_field", t) ? t : domByClass(uiSearch.getWrapEl(t), "_field")
        },
        stopEvents: function(t) {
            var e = data(t, "eventHandlers") || [];
            each(e, function(t, e) {
                e.stop()
            })
        },
        startEvents: function(t) {
            var e = data(t, "eventHandlers") || [];
            each(e, function(t, e) {
                e.stop(), e.start()
            })
        },
        init: function(el, options) {
            if (el && (el = uiSearch.getFieldEl(el))) {
                var wrapEl = uiSearch.getWrapEl(el),
                    delayedInitOptions = !options && domData(wrapEl, "init-options");
                if (delayedInitOptions) return domData(wrapEl, "init-options", null), void uiSearch.init(el, eval("(function() { return " + delayedInitOptions + " })()"));
                if (!data(el, "inited")) {
                    data(el, "inited", 1);
                    var onKeyDown = uiSearch.onKeyDown.pbind(el),
                        onBuffer = function(t) {
                            setTimeout(uiSearch.onChanged.pbind(el, !1, t), 0)
                        },
                        onBlur = uiSearch.onBlurred.pbind(el);
                    if (placeholderInit(el), data(el, "opts", options), options.suggester) {
                        options.suggester.instance = new Suggester(el, extend(options.suggester, {
                            type: options.suggester.type,
                            historyItems: options.suggester.history ? options.suggester.historyItems : !1,
                            onSearch: function(t, e, i) {
                                t || (uiSearch.removeAllFilters(el), uiSearch.hideProgress(el)), toggleClass(wrapEl, "ui_search_field_empty", !t), options.onChange && options.onChange.call(el, t, e, i)
                            }
                        }));
                        var mainHandler = {
                            start: function() {
                                addEvent(el, "blur", onBlur), options.onBlur && addEvent(el, "blur", options.onBlur), options.onFocus && addEvent(el, "focus", options.onFocus)
                            },
                            stop: function() {
                                removeEvent(el, "blur", onBlur), options.onBlur && removeEvent(el, "blur", options.onBlur), options.onFocus && removeEvent(el, "focus", options.onFocus)
                            }
                        }
                    } else var searchBtn = geByClass1("_ui_search_button_search", wrapEl),
                        onBtnClick = function(t) {
                            uiSearch.onEnter(el, t), elfocus(el)
                        },
                        mainHandler = {
                            start: function() {
                                addEvent(el, "keydown", onKeyDown), addEvent(el, "paste cut input", onBuffer), addEvent(el, "blur", onBlur), options.onBlur && addEvent(el, "blur", options.onBlur), options.onFocus && addEvent(el, "focus", options.onFocus), searchBtn && addEvent(searchBtn, "click", onBtnClick)
                            },
                            stop: function() {
                                removeEvent(el, "keydown", onKeyDown), removeEvent(el, "paste cut input", onBuffer), removeEvent(el, "blur", onBlur), options.onBlur && removeEvent(el, "blur", options.onBlur), options.onFocus && removeEvent(el, "focus", options.onFocus), searchBtn && removeEvent(searchBtn, "click", onBtnClick)
                            }
                        };
                    if (mainHandler.start(), data(el, "eventHandlers", [mainHandler]), options.params) {
                        var content = se(trim(options.params.html));
                        options.paramsTooltip = new ElementTooltip(geByClass1("_ui_search_params_button", wrapEl), {
                            appendTo: wrapEl,
                            content: content,
                            autoShow: !1,
                            offset: [0, 10],
                            shift: options.params.shift ? options.params.shift : 0
                        }), options.paramsTooltip.build(), setTimeout(function() {
                            (function initScript() {
                                eval(options.params.script)
                            }).call(el)
                        })
                    }
                    options.fixed && uiSearch.setFixed(el), options.noAutoDestroy || cur.destroy.push(uiSearch.stopEvents.pbind(el)), uiSearch.initFilters(el, options)
                }
            }
        },
        getOptions: function(t) {
            var e = uiSearch.getWrapEl(t),
                t = geByClass1("_field", e);
            return data(t, "opts")
        },
        toggleParameters: function(t) {
            var e = uiSearch.getWrapEl(t),
                i = geByClass1("_field", e),
                s = data(i, "opts");
            s.paramsTooltip && s.paramsTooltip.toggle()
        },
        saveHistorySearch: function(t, e, i, s, o, n) {
            e || (e = val(t));
            var r = uiSearch.getOptions(t);
            r.suggester && r.suggester.instance && r.suggester.instance.saveHistoryItem(e, i, s, o, n)
        },
        onEnter: function(t, e) {
            t = uiSearch.getFieldEl(t);
            var i = data(t, "opts"),
                s = t.getValue();
            return i.onEnter && i.onEnter(t, s, e), cancelEvent(e)
        },
        onKeyDown: function(t, e) {
            if (cur.preventInputActions && -1 != [KEY.RETURN, KEY.ESC, KEY.DOWN, KEY.UP].indexOf(e.keyCode)) return cancelEvent(e);
            if (e.keyCode == KEY.RETURN) return uiSearch.onEnter(t, e);
            if (e.keyCode == KEY.ESC) {
                var i = !!val(t);
                return uiSearch.reset(t, !1, e), i ? cancelEvent(e) : !0
            }
            setTimeout.pbind(uiSearch.onChanged.pbind(t, !1, e), 0)
        },
        onBlurred: function(t, e) {
            var i = data(t, "opts");
            i.onBlur && i.onBlur.call(t, e)
        },
        onChanged: function(t, e, i) {
            t = uiSearch.getFieldEl(t);
            var s = data(t, "opts"),
                o = uiSearch.getWrapEl(t),
                n = t.getValue ? t.getValue() : t.value;
            toggleClass(o, "ui_search_field_empty", !trim(n)), n || uiSearch.removeAllFilters(t), e || s.onChange && s.onChange.call(t, n, i)
        },
        focus: function(t) {
            t = uiSearch.getFieldEl(t), elfocus(t)
        },
        reset: function(t, e, i) {
            t = uiSearch.getFieldEl(t);
            var s = data(t, "opts"),
                o = uiSearch.getWrapEl(t),
                n = t.getValue ? t.getValue() : t.value;
            n ? (val(t, ""), uiSearch.onChanged(t, e, i), e || s.onEnter && s.onEnter(t, ""), elfocus(t)) : s.in_tabs && uiTabs.hideSearch(o), window.tooltips && tooltips.destroyAll()
        },
        showProgress: function(t) {
            t = uiSearch.getFieldEl(t);
            var e = uiSearch.getWrapEl(t);
            addClass(e, "ui_search_loading");
            var i = t.getValue ? trim(t.getValue()) : t.value;
            toggleClass(e, "ui_search_field_empty", !i)
        },
        hideProgress: function(t) {
            t = uiSearch.getFieldEl(t);
            var e = uiSearch.getWrapEl(t);
            removeClass(e, "ui_search_loading");
            var i = t.getValue ? trim(t.getValue()) : t.value;
            toggleClass(e, "ui_search_field_empty", !i)
        },
        scrollResize: function(t) {
            if (!browser.mobile) {
                t = uiSearch.getFieldEl(t);
                var e, i = uiSearch.getWrapEl(t),
                    s = i && domPN(i),
                    o = i && hasClass(i, "ui_search_fixed"),
                    n = ge(cur.uiSearchPageBlock) || gpeByClass("page_block", t),
                    r = vk.staticheader ? Math.max(0, getSize(ge("page_header"))[1] - scrollNode.scrollTop) : getSize(ge("page_header"))[1],
                    l = i && isAncestor(i, boxLayerWrap);
                if (i && s && (l || gpeByClass("scroll_fix", i)) && (!t.ignoreFixed || o) && isVisible(s)) {
                    var a = l ? getXY(s, !0)[1] < 0 : getXY(s, !0)[1] < r;
                    if (a) {
                        var h = intval(getStyle(t, "width"));
                        !o && h && (setStyle(s, "height", getSize(i)[1]), setStyle(i, "width", h), addClass(i, "ui_search_fixed"));
                        var d = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge("page_layout"))[0]));
                        if (setStyle(i, {
                                marginLeft: d
                            }), n) {
                            var u = getXY(n)[1] + getSize(n)[1] - scrollGetY() - t.offsetHeight;
                            e = Math.min(r, Math.max(-t.offsetHeight, u)), e !== cur.lastUISearchPos && (setStyle(i, "top", e), cur.lastUISearchPos = e)
                        }
                    } else o && (setStyle(s, "height", ""), setStyle(i, {
                        top: "",
                        marginLeft: ""
                    }), cur.lastUISearchPos = !1, removeClass(i, "ui_search_fixed"))
                }
            }
        },
        setStatic: function(t) {
            t.ignoreFixed = !0;
            var e = uiSearch.getWrapEl(t),
                i = e && domPN(e);
            e && i && (setStyle(i, "height", ""), setStyle(e, {
                top: "",
                marginLeft: ""
            }), cur.lastUISearchPos = !1, removeClass(e, "ui_search_fixed"))
        },
        setFixed: function(t) {
            if (t.ignoreFixed = !1, !data(t, "resizeEventHandler")) {
                var e = isAncestor(t, boxLayerWrap) ? boxLayerWrap : window,
                    i = uiSearch.scrollResize.pbind(t),
                    s = {
                        stop: removeEvent.pbind(e, "scroll", i),
                        start: addEvent.pbind(e, "scroll", i)
                    };
                data(t, "eventHandlers", (data(t, "eventHandlers") || []).concat([s])), data(t, "resizeEventHandler", !0), s.start()
            }
            uiSearch.scrollResize(t)
        },
        initFilters: function(t, e) {
            function i(t, e) {
                toggleClass(t, "shown", e)
            }
            if (t) {
                var s = uiSearch.getWrapEl(t),
                    o = geByClass1("ui_search_fltr_control", s),
                    n = {
                        start: function() {
                            addEvent(o, "click", function(t) {
                                (!hasClass(o, "shown") || hasClass(t.target, "ui_search_fltr_control")) && i(o)
                            }), addEvent(o, "mouseover", function() {
                                if (hasClass(o, "shown")) {
                                    var t = data(o, "hidetimer");
                                    t && (clearTimeout(t), data(o, "hidetimer", 0)), i(o, !0)
                                }
                            }), addEvent(o, "mouseout", function() {
                                var t = data(o, "hidetimer");
                                t || data(o, "hidetimer", setTimeout(function() {
                                    i(o, !1), data(o, "hidetimer", 0)
                                }, 200))
                            })
                        },
                        stop: removeEvent.pbind(o, "click mouseover mouseout")
                    };
                data(t, "eventHandlers", (data(t, "eventHandlers") || []).concat([n])), n.start();
                var r = uiSearch._getFiltersPane(t);
                addEvent(r, "click", function(e) {
                    if (hasClass(e.target, "token_title") || hasClass(e.target, "token_del")) {
                        var i = gpeByClass("token", e.target),
                            s = domData(i, "id");
                        uiSearch.removeFilter(t, s)
                    }
                })
            }
        },
        removeAllFilters: function(t) {
            var e = uiSearch._getFiltersPane(t),
                i = data(e, "cur_filters");
            each(extend({}, i), function(e) {
                uiSearch.removeFilter(t, e, !0)
            })
        },
        toggleFilter: function(t, e, i, s) {
            s ? uiSearch.addFilter(t, e, i) : uiSearch.removeFilter(t, e)
        },
        addFilter: function(t, e, i) {
            if (e && i) {
                var s = uiSearch._getFiltersPane(t),
                    o = data(s, "cur_filters") || {};
                o[e] = i, data(s, "cur_filters", o), uiSearch._renderFilters(t)
            }
        },
        removeFilter: function(t, e, i) {
            var s = uiSearch._getFiltersPane(t),
                o = data(s, "cur_filters") || {};
            if (o[e]) {
                delete o[e], data(s, "cur_filters", o);
                var n = uiSearch.getOptions(t);
                n.onFilterRemoved && n.onFilterRemoved(e, t, i), uiSearch._renderFilters(t)
            }
        },
        _getFiltersPane: function(t) {
            var e = uiSearch.getWrapEl(t) || t;
            return geByClass1("ui_search_filters_pane", e)
        },
        _renderFilters: function(t) {
            clearTimeout(data(t, "renderFiltersTO")), data(t, "renderFiltersTO", setTimeout(uiSearch._doRenderFilters.pbind(t)))
        },
        _doRenderFilters: function(t) {
            var e = uiSearch._getFiltersPane(t),
                i = data(e, "cur_filters") || {},
                s = geByClass1("ui_search_filters", e);
            if (isEmpty(i)) removeClass(e, "expanded"), setTimeout(function() {
                s.innerHTML = "", hide(e)
            }, 200);
            else {
                show(e), addClassDelayed(e, "expanded");
                var o = [],
                    n = {},
                    r = 0;
                each(i, function(t, e) {
                    var i = !1,
                        s = !1,
                        l = t.match(/(.*?)_([^_]+)$/),
                        a = l && l[2] || !1;
                    l = l && l[1] || !1, l && (void 0 !== n[l] && "from" === a ? s = n[l] : void 0 !== n[l] && (i = n[l] + 1), n[l] = r);
                    var h = '<div class="token" id="token' + t + '" data-id="' + t + '">                          <div class="token_title">' + clean(e) + '</div>                          <div class="token_del"></div>                        </div>';
                    s !== !1 ? o.splice(s, 0, h) : i !== !1 ? o.splice(i, 0, h) : o.push(h), r++
                }), s.innerHTML = o.join("")
            }
        }
    },
    uiScrollBox = {
        init: function(t, e) {
            cur.lSTL && re(cur.lSTL), e = e || {};
            var i = e.parent = e.parent || boxLayerWrap;
            extend(cur, {
                lSTLWrap: i,
                lSTL: i.appendChild(ce("div", {
                    id: "layer_stl",
                    innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang("global_to_top") + "</nobr>",
                    el: t.bodyNode,
                    onclick: cancelEvent,
                    onmousedown: uiScrollBox.lSTLDown,
                    sc: uiScrollBox.onScroll
                })),
                lSTLText: ge("layer_stl_text", i),
                lSTLShown: 0,
                lSTLWas: 0,
                lSTLWasSet: 0,
                lSTLOpts: e
            }), t && t.setOptions({
                onShow: uiScrollBox.show,
                onHide: uiScrollBox.hide
            }), t && t.scrollInited || (addEvent(i, "scroll", uiScrollBox.onScroll), t.scrollInited = !0), onBodyResize(), uiScrollBox.onScroll()
        },
        hide: function() {
            var t = cur.lSTLOpts;
            t && t.parent && (removeEvent(t.parent, "scroll", uiScrollBox.onScroll), hide(cur.lSTL), cur.lSTLShown = 0, t.onHide && t.onHide())
        },
        show: function() {
            var t = cur.lSTLOpts;
            t && t.parent && (addEvent(t.parent, "scroll", uiScrollBox.onScroll), setTimeout(uiScrollBox.onScroll, 0), t.onShow && t.onShow())
        },
        lSTLDown: function(t) {
            if (t = t || window.event, !checkEvent(t)) {
                var e = cur.lSTLWrap;
                if (!__afterFocus) {
                    var i = 0,
                        s = e.scrollTop;
                    cur.lSTLWasSet && cur.lSTLWas ? (i = cur.lSTLWas, cur.lSTLWas = 0) : cur.lSTLWas = s, e.scrollTop = i
                }
                return cancelEvent(t)
            }
        },
        onScroll: function() {
            if (cur.lSTL) {
                var t = cur.lSTLWrap,
                    e = t.scrollTop,
                    i = 200,
                    s = cur.lSTLWas || e > i,
                    o = 0;
                if (cur.lSTL.style.marginTop = Math.min(e, boxLayer.scrollHeight - cur.lSTL.scrollHeight - 1) + "px", vk.staticheader) {
                    var n = getSize("page_header_wrap")[1];
                    cur.lSTLText.style.marginTop = Math.max(-Math.min(scrollGetY(), bodyNode.clientHeight - (window.lastWindowHeight || 0)), -n) + "px"
                }
                s ? (1 !== cur.lSTLShown && (show(cur.lSTL), cur.lSTLShown = 1), cur.lSTLWas && e > 500 && (cur.lSTLWas = 0), e > i ? (o = (e - i) / i, cur.lSTLWasSet && (cur.lSTLWasSet = 0, val(domLC(cur.lSTL), getLang("global_to_top")), removeClass(domLC(cur.lSTL), "down"))) : (o = (i - e) / i, cur.lSTLWas && (cur.lSTLWasSet || (cur.lSTLWasSet = 1, val(domLC(cur.lSTL), ""), addClass(domLC(cur.lSTL), "down"))))) : 0 !== cur.lSTLShown && (hide(cur.lSTL), cur.lSTLShown = 0), setStyle(cur.lSTL, {
                    opacity: Math.min(Math.max(o, 0), 1)
                })
            }
        }
    },
    uiPhotoZoom = {
        over: function(t, e, i) {
            if (!browser.mobile && !vk.widget) {
                hasClass(t, "ui_zoom_wrap") || addClass(t, "ui_zoom_wrap"), cur.bigphCache = cur.bigphCache || {}, i = i || {};
                var s = domFC(t),
                    o = cur.bigphCache[e];
                "A" == s.tagName && hasClass(s, "ui_zoom_outer") || (s = t.insertBefore(se('<a class="ui_zoom_outer" href="' + (o && o._id ? "/photo" + o._id + "?all=1" : "/albums" + e) + '" aria-label="' + clean(getLang("global_photo_full_size")) + '"><div class="ui_zoom_inner"><div class="ui_zoom"><div class="ui_zoom_icon"></div></div></div></a>'), domFC(t)), s._uid = e, s.offsetHeight, addClass(s, "ui_zoom_added")), s.onclick = uiPhotoZoom.click.pbind(t, e, i), i.fastLoad && uiPhotoZoom.load(t, e, i)
            }
        },
        click: function(t, e, i, s) {
            if (!s || checkEvent(s) === !1) {
                i.fastLoad || uiPhotoZoom.load(t, e, i);
                var o = cur.bigphCache[e];
                if (o) return "load" == o || "show" == o ? (cur.bigphCache[e] = "show", cancelEvent(s)) : (i.onBeforeShow && i.onBeforeShow(), extend(o, extend({
                    jumpTo: {
                        z: "albums" + e
                    }
                }, i.showOpts || {})), showPhoto(o._id, "album" + e + "_0/rev", o, s))
            }
        },
        load: function(t, e, i) {
            var s = domFC(t),
                o = cur.bigphCache[e];
            void 0 === o && (cur.bigphCache[e] = "load", ajax.post("al_photos.php", {
                act: "fast_get_photo",
                oid: e
            }, {
                onDone: function(o) {
                    if (!o) return t.onmouseover = function() {}, void re(s);
                    var n = "show" == cur.bigphCache[e];
                    cur.bigphCache[e] = o, s.href = "/photo" + o._id + "?all=1", n && uiPhotoZoom.click(t, e, i)
                },
                onFail: function() {
                    return t.onmouseover = function() {}, re(domFC(t)), !0
                }
            }))
        }
    },
    uiScroll = function() {
        var t = function(e, i) {
            if (!(e = t.ge(e))) throw new Error("uiScroll container is undefined");
            e.__uiScroll__ && e.__uiScroll__.destroy(), this.options = extend({
                global: !1,
                "native": !1,
                theme: "default",
                reversed: !1,
                autoresize: !0,
                preserveEdgeBelow: !1,
                barMinHeight: 30,
                preserveEdgeBelowThreshold: 20,
                stopScrollPropagation: !0,
                stopScrollPropagationAlways: !1,
                minContentHeight: 0,
                onmoreThreshold: null,
                hidden: !1,
                shadows: !1,
                scrollElements: [],
                onresize: null,
                onscroll: null,
                onscrollstart: null,
                onscrollstop: null,
                ondrag: null,
                ondragstart: null,
                ondragstop: null,
                onupdate: null,
                onmore: null
            }, i), this.options["native"] && (this.options.shadows = !1), browser.mobile && (this.options.stopScrollPropagation = !1), isArray(this.options.scrollElements) || (this.options.scrollElements = []), this.removeEvents = [], this.removeElements = [], this.dragging = !1, this.dragged = !1, this.released = !0, this.noMore = !1, this.dragY = null, this.dragScroll = null, this.shadowTop = !1, this.shadowBottom = !1, this.unnecessary = !1, this.disabled = !1, this.stopped = !0, this.stoppedTimeout = null, this.fixSizeDefault = null, this.animation = null, this.barOuterHeight = null, this.barInnerHeight = null, this.currentFrame = null, this.blockerScrollTop = 500, this.emitter = new EventEmitter, isFunction(this.options.onresize) && this.emitter.addListener("resize", this.options.onresize), isFunction(this.options.onscroll) && this.emitter.addListener("scroll", this.options.onscroll), isFunction(this.options.onscrollstart) && this.emitter.addListener("scrollstart", this.options.onscrollstart), isFunction(this.options.onscrollstop) && this.emitter.addListener("scrollstop", this.options.onscrollstop), isFunction(this.options.ondrag) && this.emitter.addListener("drag", this.options.ondrag), isFunction(this.options.ondragstart) && this.emitter.addListener("dragstart", this.options.ondragstart), isFunction(this.options.ondragstop) && this.emitter.addListener("dragstop", this.options.ondragstop), isFunction(this.options.onupdate) && this.emitter.addListener("update", this.options.onupdate), isFunction(this.options.onmore) && this.emitter.addListener("more", this.options.onmore), this.el = {
                container: e,
                overflow: ce("div", {
                    className: "ui_scroll_overflow"
                }),
                outer: ce("div", {
                    className: "ui_scroll_outer"
                }, {
                    margin: this.options.stopScrollPropagation ? this.blockerScrollTop + "px 0" : void 0
                }),
                inner: ce("div", {
                    className: "ui_scroll_inner tt_noappend"
                }),
                shadowTop: ce("div", {
                    className: "ui_scroll_shadow_top"
                }),
                shadowBottom: ce("div", {
                    className: "ui_scroll_shadow_bottom"
                }),
                content: ce("div", {
                    className: "ui_scroll_content clear_fix"
                }),
                barContainer: ce("div", {
                    className: "ui_scroll_bar_container"
                }),
                barOuter: ce("div", {
                    className: "ui_scroll_bar_outer"
                }),
                barInner: ce("div", {
                    className: "ui_scroll_bar_inner"
                })
            };
            var s = cf(),
                o = ["ui_scroll_container"];
            for (each(isArray(this.options.theme) ? this.options.theme : trim(this.options.theme + "").split(/\s+/), function(t, e) {
                    e && o.push("ui_scroll_" + e + "_theme")
                }), addClass(this.el.container, o.join(" ")), this.options.hidden && addClass(this.el.container, "ui_scroll_hidden"); this.el.container.firstChild;) this.el.content.appendChild(this.el.container.firstChild);
            if (this.el.outer.appendChild(this.el.inner), this.el.inner.appendChild(this.el.content), this.options.stopScrollPropagation ? (this.el.blocker = ce("div", {
                    className: "ui_scroll_blocker"
                }), this.addEvent(this.el.blocker, "scroll", this.fixBlocker.bind(this), !0), this.el.blocker.appendChild(this.el.outer), this.el.overflow.appendChild(this.el.blocker)) : this.el.overflow.appendChild(this.el.outer), s.appendChild(this.el.overflow), this.options["native"] ? addClass(this.el.container, "ui_scroll_native") : (this.el.barOuter.appendChild(this.el.barInner), this.el.barContainer.appendChild(this.el.barOuter), s.appendChild(this.el.barContainer), this.options.shadows && (this.el.overflow.appendChild(this.el.shadowTop), this.el.overflow.appendChild(this.el.shadowBottom)), browser.mobile || this.options.scrollElements.push(this.el.barContainer)), this.options.autoresize) {
                var n = t.addResizeSensor(this.el.inner, this.resize.bind(this, !0)),
                    r = t.addResizeSensor(this.el.overflow, this.resize.bind(this, !1));
                this.removeElements.push(n[0]), this.removeElements.push(r[0]), this.startResizeListening = function() {
                    n[1](), r[1]()
                }
            }
            this.removeElements.push(this.el.overflow, this.el.barContainer), this.el.container.appendChild(s), this.options.reversed && (this.el.outer.scrollTop = this.el.outer.scrollHeight), this.el.container.__uiScroll__ = this.api = {
                container: this.el.container,
                scroller: this.el.outer,
                content: this.el.content,
                emitter: this.emitter,
                ondragstart: this.dragstart.bind(this),
                ondragstop: this.dragstop.bind(this),
                ondrag: this.drag.bind(this),
                destroy: this.destroy.bind(this),
                disable: this.disable.bind(this, !0),
                enable: this.disable.bind(this, !1),
                scrollTop: this.scrollTop.bind(this, !0),
                scrollBottom: this.scrollBottom.bind(this, !0),
                scrollBy: this.scrollBy.bind(this),
                scrollIntoView: this.scrollIntoView.bind(this, !0),
                update: this.init.bind(this),
                updateAbove: this.updateAbove.bind(this),
                updateBelow: this.updateBelow.bind(this),
                data: {
                    scrollTop: null,
                    scrollBottom: null,
                    scrollHeight: null,
                    viewportHeight: null
                }
            }, this.init();
            var l = "onwheel" in this.el.outer ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : browser.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll";
            return this.addEvent(this.el.container, l, function(t) {
                this.animation && this.animation.stop(), !this.disabled && this.options.stopScrollPropagation && (this.unnecessary ? this.options.stopScrollPropagationAlways && cancelEvent(t) : this.isScrollEventUnused(t) ? cancelEvent(t) : stopEvent(t))
            }.bind(this), !this.options.stopScrollPropagation), this.options["native"] || this.addEvent(this.el.barContainer, "mousedown", this.dragstart.bind(this)), each(this.options.scrollElements, function(t, e) {
                this.addEvent(e, l, function(t) {
                    this.disabled || this.unnecessary || (this.scrollBy(this.scrollEventDelta(t)), (this.options.stopScrollPropagation || !this.isScrollEventUnused(t)) && cancelEvent(t))
                }.bind(this))
            }.bind(this)), this.options.reversed && this.addEvent(this.el.container, "mousedown touchstart pointerdown", function(t) {
                this.released = !1, this.noMore = !0;
                var e = this.addEvent(document, "mouseup contextmenu touchend pointerup", function(t) {
                    removeEvent(document, "mouseup contextmenu touchend pointerup", e), this.released = !0, this.noMore && this.stopped && !this.dragging && (this.noMore = !1, this.more())
                }.bind(this))
            }.bind(this)), this.addEvent(this.el.outer, "scroll", function() {
                this.update() && (this.stopped ? (this.stopped = !1, this.emitEvent("scrollstart")) : this.options["native"] || this.stopped !== !1 || (this.stopped = 0, addClass(this.el.container, "ui_scroll_scrolled")), this.emitEvent("scroll"), this.stoppedTimeout && clearTimeout(this.stoppedTimeout), this.stoppedTimeout = setTimeout(function() {
                    this.stopped || (this.stopped = !0, this.options["native"] || removeClass(this.el.container, "ui_scroll_scrolled"), this.emitEvent("scrollstop"), this.noMore && this.released && !this.dragging && (this.noMore = !1, this.more()))
                }.bind(this), 200))
            }.bind(this)), this.api
        };
        return t.prototype = {
            init: function() {
                if (this.options.stopScrollPropagation && this.fixBlocker(), !this.inited) {
                    if (!this.el.container.scrollWidth || this.disabled) return;
                    this.fixSize(!0), this.options.autoresize && this.startResizeListening(), this.options.global || cur.destroy.push(this.destroy.bind(this)), this.inited = !0
                }
                return this.update(!0), this.api
            },
            addEvent: function(t, e, i, s) {
                return this.removeEvents.push([t, e, i]), addEvent(t, e, i, void 0, void 0, s ? {
                    passive: !0
                } : void 0), i
            },
            destroy: function() {
                if (this.disabled = !0, this.fixSize(), this.animation && this.animation.stop(), this.moreTimeout && clearTimeout(this.moreTimeout), this.dragstopHandler && removeEvent(document, "mouseup contextmenu", this.dragstopHandler), this.dragHandler && removeEvent(document, "mousemove", this.dragHandler), each(this.removeEvents, function(t, e) {
                        removeEvent.apply(null, e)
                    }), this.el.overflow.parentNode == this.el.container) {
                    for (var t = cf(); this.el.content.firstChild;) t.appendChild(this.el.content.firstChild);
                    this.el.container.appendChild(t)
                }
                return this.el.container.className = this.el.container.className.replace(/\bui_scroll_.+?\b/g, " "), each(this.removeElements, function(t, e) {
                    re(e)
                }), this.el.container.scrollTop = this.api.data.scrollTop, delete this.el.container.__uiScroll__, this.api
            },
            updateAbove: function(t) {
                if (isFunction(t)) {
                    this.animation && this.animation.stop();
                    var e = this.el.outer.scrollHeight - this.el.outer.scrollTop - this.el.overflow.offsetHeight;
                    t(), this.el.outer.scrollTop = this.el.outer.scrollHeight - this.el.overflow.offsetHeight - e
                }
                return this.api
            },
            updateBelow: function(t) {
                if (isFunction(t)) {
                    this.animation && this.animation.stop();
                    var e = this.options.preserveEdgeBelow && this.api.data.scrollBottom <= this.options.preserveEdgeBelowThreshold;
                    t(), e && this.scrollBottom(!1)
                }
                return this.api
            },
            fixBlocker: function() {
                browser.chrome && (this.el.blocker.style.display = "inline-block", this.el.blocker.offsetHeight, this.el.blocker.style.display = ""), this.el.blocker.scrollTop = this.blockerScrollTop
            },
            fixSize: function(t) {
                this.options["native"] || (t && null == this.fixSizeDefault && (this.fixSizeDefault = this.el.container.style.width), setStyle(this.el.container, "width", t ? getSize(this.el.container, !0)[0] || this.fixSizeDefault || "" : this.fixSizeDefault || ""))
            },
            emitEvent: function(t) {
                this.disabled || this.inited && this.emitter.emitEvent(t, [this.api])
            },
            scrollEventDelta: function(t) {
                var e = 0,
                    i = void 0 !== t.deltaMode ? t.deltaMode : "MozMousePixelScroll" == t.type ? 0 : 1,
                    s = 15,
                    o = 30 * s;
                return "wheel" == t.type ? e = t.deltaY : void 0 !== t.wheelDeltaX && void 0 !== t.wheelDeltaY ? (e = .025 * -t.wheelDeltaY, browser.mac && browser.opera && (e *= .1)) : void 0 !== t.wheelDelta ? e = .025 * -t.wheelDelta : t.detail && 2 === t.axis && (e = t.detail), e * (1 == i ? s : 2 == i ? o : 1)
            },
            isScrollEventUnused: function(t, e) {
                var e = this.scrollEventDelta(t);
                return e > 0 ? !this.api.data.scrollBottom : !this.api.data.scrollTop
            },
            resize: function(t) {
                if (!t && this.options.preserveEdgeBelow) {
                    var e = this.options.preserveEdgeBelow && this.api.data.scrollBottom <= this.options.preserveEdgeBelowThreshold;
                    this.update(!0) && (this.emitEvent("resize"), e && this.scrollBottom(), this.options.stopScrollPropagation && !t && this.fixBlocker())
                } else this.update(!0) && (this.options.stopScrollPropagation && !t && this.fixBlocker(), this.emitEvent("resize"))
            },
            disable: function(t) {
                return this.disabled = !!t, t ? (this.animation && this.animation.stop(), this.fixSize()) : (this.fixSize(!0), this.options.stopScrollPropagation && this.fixBlocker(), this.update(!0)), toggleClass(this.el.container, "ui_scroll_disabled", this.disabled), this.api
            },
            dragstart: function(t) {
                return this.disabled || this.dragging || this.options["native"] ? void 0 : (t || (t = window.event), this.dragging = !0, this.animation && this.animation.stop(), this.options.reversed && (this.noMore = !0), addEvent(document, "mouseup contextmenu", this.dragstartHandler = this.dragstop.bind(this)), addEvent(document, "mousemove", this.dragHandler = this.drag.bind(this)), this.dragScroll = this.options.reversed ? this.api.data.scrollBottom : this.api.data.scrollTop, this.dragY = t.screenY, cancelEvent(t), this.emitEvent("dragstart"), this.api)
            },
            dragstop: function(t) {
                return this.disabled || !this.dragging || this.options["native"] ? void 0 : (t || (t = window.event), this.dragging = !1, this.dragstopHandler && removeEvent(document, "mouseup contextmenu", this.dragstopHandler), this.dragHandler && removeEvent(document, "mousemove", this.dragHandler), setStyle(bodyNode, "cursor", ""), removeClass(this.el.container, "ui_scroll_dragging"), this.dragged ? this.noMore && (this.noMore = !1, this.more()) : (this.options.reversed && (this.noMore = !0), this.scrollTop(!1, (t.pageY - getXY(this.el.barOuter)[1] - this.barInnerHeight / 2) * (Math.max(this.options.minContentHeight, this.api.data.scrollHeight) - this.api.data.viewportHeight) / (this.barOuterHeight - this.barInnerHeight), 0, function() {
                    this.noMore && (this.noMore = !1, this.more())
                }.bind(this))), this.dragged = !1, t && "contextmenu" !== t.type && cancelEvent(t), this.emitEvent("dragstop"), this.api)
            },
            drag: function(t) {
                if (!this.disabled && this.dragging && !this.options["native"]) {
                    t || (t = window.event);
                    var e = (t.screenY - this.dragY) * (this.api.data.scrollHeight / this.el.barOuter.scrollHeight);
                    return this.el.outer.scrollTop = this.options.reversed ? this.el.outer.scrollHeight - this.el.overflow.offsetHeight - this.dragScroll + e : this.dragScroll + e, this.dragged || (this.dragged = !0, setStyle(bodyNode, "cursor", "pointer"), addClass(this.el.container, "ui_scroll_dragging")), cancelEvent(t), this.emitEvent("drag"), this.api
                }
            },
            scroll: function(t, e, i) {
                return this.animation && this.animation.stop(), this.el.outer.scrollTop == t && this.update(!0), e ? (e = "number" != typeof e || !isFinite(e) || e % 1 ? 300 : Math.abs(e), this.animation = new Fx.Base({
                    scrollTop: this.el.outer.scrollTop
                }, {
                    transition: Fx.Transitions.easeOutCubic,
                    onStep: function(t) {
                        this.el.outer.scrollTop = t.scrollTop
                    }.bind(this),
                    duration: e,
                    onComplete: isFunction(i) ? i.pbind(this.api) : void 0
                }).start({
                    scrollTop: this.el.outer.scrollTop
                }, {
                    scrollTop: t
                })) : (this.el.outer.scrollTop = t, isFunction(i) && i(this.api)), this.api
            },
            scrollTop: function(t, e, i, s) {
                return t && this.options.stopScrollPropagation && this.fixBlocker(), this.disabled || this.dragging ? void 0 : this.scroll(intval(e), i, s)
            },
            scrollBottom: function(t, e, i, s) {
                return t && this.options.stopScrollPropagation && this.fixBlocker(), this.disabled || this.dragging ? void 0 : this.scroll(this.el.outer.scrollHeight - this.el.overflow.offsetHeight - intval(e), i, s)
            },
            scrollBy: function(t, e, i) {
                return this.disabled || this.dragging ? void 0 : this.scroll(this.el.outer.scrollTop + intval(t), e, i)
            },
            scrollIntoView: function(e, i, s, o) {
                if (e && this.options.stopScrollPropagation && this.fixBlocker(), (i = t.ge(i)) && i.compareDocumentPosition && i.compareDocumentPosition(this.el.content) & Node.DOCUMENT_POSITION_CONTAINS) {
                    var n = getXY(i)[1],
                        r = getXY(this.el.overflow)[1],
                        l = getSize(i)[1];
                    r >= n && n + l >= r + this.api.data.viewportHeight || n >= r && n + l <= r + this.api.data.viewportHeight ? isFunction(o) && (s ? setTimeout(o.bind(this.api), 0) : o(this.api)) : l > this.api.data.viewportHeight || r > n ? this.scrollTop(!1, n - r + this.api.data.scrollTop - (this.options.shadows ? getSize(this.el.shadowTop)[1] : 0), s, o) : this.scrollTop(!1, n - r + this.api.data.scrollTop + l - this.api.data.viewportHeight + (this.options.shadows ? getSize(this.el.shadowBottom)[1] : 0), s, o)
                }
                return this.api
            },
            nextFrame: function() {
                var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                        return setTimeout(t, 1)
                    },
                    e = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
                return function(i) {
                    this.currentFrame && e(this.currentFrame), this.currentFrame = t(i)
                }
            }(),
            update: function(t) {
                var e, i, s = this.el.outer.scrollTop;
                return this.inited && !this.disabled && (t && (e = this.el.inner.offsetHeight, this.api.data.viewportHeight !== (this.api.data.viewportHeight = this.el.overflow.offsetHeight) || this.api.data.scrollHeight !== e) || this.api.data.scrollTop !== s) ? (t && (this.api.data.scrollHeight = e), this.api.data.scrollTop = Math.max(0, Math.min(this.api.data.scrollHeight - this.api.data.viewportHeight, Math.max(0, s))), this.api.data.scrollBottom = Math.max(0, this.api.data.scrollHeight - this.api.data.scrollTop - this.api.data.viewportHeight), this.options["native"] || (e = Math.max(this.options.minContentHeight, this.api.data.scrollHeight), i = e <= this.api.data.viewportHeight, i || (t && (this.barOuterHeight = this.el.barOuter.offsetHeight, this.barInnerHeight = Math.max(this.options.barMinHeight, this.barOuterHeight * this.api.data.viewportHeight / e), this.el.barInner.style.height = this.barInnerHeight + "px"), this.nextFrame(function(t) {
                    this.style[browser.msie9 ? "msTransform" : "transform"] = t
                }.bind(this.el.barInner, "translateY(" + (this.barOuterHeight - this.barInnerHeight) * this.api.data.scrollTop / (e - this.api.data.viewportHeight) + "px)"))), this.options.shadows && (this.shadowTop != (this.api.data.scrollTop && !i) && toggleClass(this.el.container, "ui_scroll_shadow_top_visible", this.shadowTop = this.api.data.scrollTop && !i), this.shadowBottom != (this.api.data.scrollBottom && !i) && toggleClass(this.el.container, "ui_scroll_shadow_bottom_visible", this.shadowBottom = this.api.data.scrollBottom && !i)), this.unnecessary !== i && (toggleClass(this.el.container, "ui_scroll_unnecessary", i), this.unnecessary = i, this.options.stopScrollPropagation && this.fixBlocker(), i && this.barInnerHeight && this.barOuterHeight && this.nextFrame(function(t) {
                    this.el.barInner.style.height = 100 * this.barInnerHeight / this.barOuterHeight + "%", this.el.barInner.style[browser.msie9 ? "msTransform" : "transform"] = "translateY(" + (this.barOuterHeight - this.barInnerHeight) * this.api.data.scrollTop / (e - this.api.data.viewportHeight) * 100 / this.barInnerHeight + "%)"
                }.bind(this)))), this.emitEvent("update"), (!this.options.reversed || s >= 0) && this.more(), !0) : !1
            },
            more: function() {
                !this.noMore && (this.options.reversed ? this.api.data.scrollTop : this.api.data.scrollBottom) <= (null !== this.options.onmoreThreshold ? this.options.onmoreThreshold : 2 * this.api.data.viewportHeight) && this.emitEvent("more")
            }
        }, t.ge = function(t) {
            return t = isString(t) && "_" === t[0] ? geByClass1(t) : ge(t)
        }, t.addResizeSensor = function(e, i) {
            if ((e = t.ge(e)) && isFunction(i)) {
                if (browser.msie9 || browser.opera && browser.version < 13) {
                    var s = !1,
                        o = !1,
                        n = function() {
                            return r.contentDocument ? (r.contentDocument.defaultView.removeEventListener("resize", i), r.contentDocument.defaultView.addEventListener("resize", i), void i()) : setTimeout(n, 100)
                        },
                        r = ce("object", {
                            type: "text/html",
                            className: "ui_scroll_resize_object",
                            data: browser.msie9 ? "javascript: '<script>window.onload = function(){document.write(\\'<script>document.domain=\\\"" + document.domain + "\\\"<\\\\/script>\\');document.close()}</script>'" : "about:blank",
                            onload: function() {
                                o = !0, s && n()
                            }
                        });
                    return e.appendChild(r), e.__resizeSensor__ = [r, function() {
                        s = !0, o && n()
                    }]
                }
                var r = ce("div", {
                        className: "ui_scroll_resize_sensor"
                    }),
                    l = ce("div", {
                        className: "ui_scroll_resize_sensor ui_scroll_resize_expand"
                    }),
                    a = ce("div", {
                        className: "ui_scroll_resize_sensor ui_scroll_resize_shrink"
                    }),
                    h = ce("div"),
                    d = ce("div"),
                    u = null;
                return l.appendChild(h), a.appendChild(d), r.appendChild(l), r.appendChild(a), e.appendChild(r), e.__resizeSensor__ = [r, l.onscroll = a.onscroll = function() {
                    var t = (e.offsetWidth || 1e4) + 10,
                        s = (e.offsetHeight || 1e4) + 10;
                    h.style.width = t + "px", h.style.height = s + "px", l.scrollLeft = t, l.scrollTop = s, a.scrollLeft = t, a.scrollTop = s, u !== (u = t + " " + s) && i()
                }]
            }
        }, t
    }();
window.Scrollbar = window.Scrollbar || function() {
    function t(t) {
        if (!this.inited) return !1;
        if (t || (t = window.event), this.isHorizontal) {
            var e = Math.floor((this.contWidth() - this.scrollWidth) * Math.min(1, (t.screenX - this.moveX) / (this.scrollbarSize - this.innerWidth - 6)));
            isFunction(this.options.onScroll) && this.options.onScroll(this.obj.scrollLeft - e, this), this.obj.scrollLeft = e
        } else {
            var e = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, (t.screenY - this.moveY) / (this.scrollbarSize - this.innerHeight - 6)));
            isFunction(this.options.onScroll) && this.options.onScroll(this.obj.scrollTop - e, this), this.obj.scrollTop = e
        }
        return this.update(!0), !1
    }

    function e() {
        return this.inited ? (this.moveY = this.moveX = this.isDown = !1, this.isOut && this.contOut(), removeEvent(document, "mousemove", this.mouseMove), removeEvent(document, "mouseup", this.mouseUp), setStyle(document.body, "cursor", "default"), setStyle(this.obj, {
            pointerEvents: ""
        }), removeClass(this.inner, "scrollbar_hovered"), isFunction(this.options.stopDrag) && this.options.stopDrag(), isFunction(this.options.onHold) && this.options.onHold(!1), !1) : !1
    }

    function i(t) {
        if (!this.inited) return !1;
        if (!this.moveY && !checkEvent(t)) return t || (t = window.event), addEvent(document, "mousemove", this.mouseMove), addEvent(document, "mouseup", this.mouseUp), setStyle(document.body, "cursor", "pointer"), setStyle(this.obj, {
            pointerEvents: "none"
        }), this.isHorizontal ? this.moveX = t.screenX - (this.inner.offsetLeft || 0) : this.moveY = t.screenY - (this.inner.offsetTop || 0), addClass(this.inner, "scrollbar_hovered"), isFunction(this.options.startDrag) && this.options.startDrag(), isFunction(this.options.onHold) && this.options.onHold(!0), this.isDown = !0, cancelEvent(t)
    }

    function s(t) {
        switch (t || (t = window.event), t.keyCode) {
            case 40:
                this.obj[this.scrollProp] += 40;
                break;
            case 38:
                this.obj[this.scrollProp] -= 40;
                break;
            case 34:
                this.obj[this.scrollProp] += this[this.scrollDimensionProp];
                break;
            case 33:
                this.obj[this.scrollProp] -= this[this.scrollDimensionProp];
                break;
            default:
                return !0
        }
        return this.update(!0), cancelEvent(t)
    }

    function o(o, n) {
        var r = this.wheel.bind(this);
        this.obj = o = ge(o), this.options = extend({
            nomargin: !1,
            horizontal: !1,
            top: 0,
            bottom: 0,
            padding: 3,
            prefix: "",
            hidden: 0
        }, n || {}), this.isHorizontal = this.options.horizontal, this.scrollProp = this.isHorizontal ? "scrollLeft" : "scrollTop", this.scrollDimensionProp = this.isHorizontal ? "scrollWidth" : "scrollHeight", this.topShadow = !1, this.bottomShadow = !1, this[this.scrollProp + "Last"] = this.obj[this.scrollProp], this.destroyList = [], this.mouseDown = i.bind(this), this.mouseMove = t.bind(this), this.mouseUp = e.bind(this), this.initObjMouseWheel = function() {
            addEvent(o, browserFeatures.wheelEvent, r)
        }, this.destroyObjMouseWheel = function() {
            removeEvent(o, browserFeatures.wheelEvent, r)
        }, this.initScrollBarMouseWheel = function() {
            addEvent(this.scrollbar, browserFeatures.wheelEvent, r)
        }.bind(this), this.destroyScrollBarMouseWheel = function() {
            removeEvent(this.scrollbar, browserFeatures.wheelEvent, r)
        }.bind(this), setTimeout(function() {
            setStyle(o, {
                overflow: "hidden"
            }), this.scrollbar = ce("div", {
                className: (this.options.prefix ? this.options.prefix + "scrollbar_cont " : "") + "scrollbar_cont" + (this.isHorizontal ? " scrollbar_cont_horiz" : "") + (this.options.hidden ? " scrollbar_hidden" : "")
            }), this.inner = ce("div", {
                className: (this.options.prefix ? this.options.prefix + "scrollbar_inner " : "") + "scrollbar_inner"
            }), this.scrollbar.appendChild(this.inner);
            var t = this.widthUpdated();
            this.options.shadows && (o.parentNode.insertBefore(this.topShadowDiv = ce("div", {
                className: (this.options.prefix ? this.options.prefix + "scrollbar_top " : "") + "scrollbar_top"
            }, {
                width: t[0]
            }), o), o.parentNode.insertBefore(this.bottomShadowDiv = ce("div", {
                className: (this.options.prefix ? this.options.prefix + "scrollbar_bottom " : "") + "scrollbar_bottom"
            }, {
                width: t[0]
            }), o.nextSibling)), o.parentNode.insertBefore(this.scrollbar, o);
            var e = s.bind(this),
                i = function() {
                    this.initObjMouseWheel(), removeEvent(o, "mousemove", i)
                }.bind(this);
            if (addEvent(o, "mouseleave", this.destroyObjMouseWheel), addEvent(o, "mouseenter", this.initObjMouseWheel), addEvent(o, "mousemove", i), addEvent(this.scrollbar, "mouseenter", this.initScrollBarMouseWheel), addEvent(this.scrollbar, "mouseleave", this.destroyScrollBarMouseWheel), this.options.scrollElements && each(this.options.scrollElements, function(t, e) {
                    addEvent(e, browserFeatures.wheelEvent, r)
                }), addEvent(this.scrollbar, "mouseover", this.contOver.bind(this)), addEvent(this.scrollbar, "mouseout", this.contOut.bind(this)), addEvent(this.scrollbar, "mousedown", this.contDown.bind(this)), browser.safari_mobile) {
                var n = function(t) {
                        this.isHorizontal ? cur.touchX = t.touches[0].pageX : cur.touchY = t.touches[0].pageY
                    }.bind(this),
                    l = function(t) {
                        return this.isHorizontal ? (cur.touchDiff = cur.touchX - (cur.touchX = t.touches[0].pageX), o.scrollLeft += cur.touchDiff, o.scrollLeft > 0 && this.shown !== !1 && this.update(!0)) : (cur.touchDiff = cur.touchY - (cur.touchY = t.touches[0].pageY), o.scrollTop += cur.touchDiff, o.scrollTop > 0 && this.shown !== !1 && this.update(!0)), cancelEvent(t)
                    }.bind(this),
                    a = function() {
                        cur.animateInt = setInterval(function() {
                            cur.touchDiff = .9 * cur.touchDiff, cur.touchDiff < 1 && cur.touchDiff > -1 ? clearInterval(cur.animateInt) : (o[self.scrollProp] += cur.touchDiff, this.update(!0))
                        }.bind(this), 0)
                    }.bind(this);
                addEvent(o, "touchstart", n), addEvent(o, "touchmove", l), addEvent(o, "touchend", a), this.destroyList.push(function() {
                    removeEvent(o, "touchstart", n), removeEvent(o, "touchmove", l), removeEvent(o, "touchend", a)
                })
            }
            addEvent(this.inner, "mousedown", this.mouseDown), this.options.nokeys ? this.onkeydown = e : addEvent(window, "keydown", e), this.destroyList.push(function() {
                removeEvent(o, browserFeatures.wheelEvent, r), this.options.scrollElements && each(this.options.scrollElements, function(t, e) {
                    removeEvent(e, browserFeatures.wheelEvent, r)
                }), removeEvent(this.inner, "mousedown", this.mouseDown), removeEvent(window, "keydown", e), removeEvent(o, "mousemove", i), re(this.scrollbar)
            }.bind(this)), this.isHorizontal || (this.contHeight() <= this.scrollHeight ? hide(this.bottomShadowDiv) : this.bottomShadow = !0), this.options.onInit && this.options.onInit(), this.inited = !0, this.update(!0), this.options.global || cur.destroy.push(this.destroy.bind(this))
        }.bind(this), 0)
    }
    return o.prototype = {
        wheel: function(t) {
            if (!this.disabled) {
                t || (t = window.event);
                var e = 0,
                    i = this.obj[this.scrollProp];
                if (deltaMode = void 0 !== t.deltaMode ? t.deltaMode : "MozMousePixelScroll" == t.type ? 0 : 1, pixelRatio = 1, pixelsPerLine = 15, pixelsPerPage = 30 * pixelsPerLine, "wheel" == t.type ? e = -(this.isHorizontal ? t.deltaX : t.deltaY) : void 0 !== t.wheelDeltaX && void 0 !== t.wheelDeltaY ? (e = .025 * (this.isHorizontal ? t.wheelDeltaX : t.wheelDeltaY), browser.mac && browser.opera && (e *= .1)) : void 0 !== t.wheelDelta ? e = .025 * t.wheelDelta : t.detail && t.axis === (this.isHorizontal ? 1 : 2) && (e = -t.detail), e = e * pixelRatio * (1 == deltaMode ? pixelsPerLine : 2 == deltaMode ? pixelsPerPage : 1)) return this.obj[this.scrollProp] -= e, isFunction(this.options.onScroll) && this.options.onScroll(e, this), i != this.obj[this.scrollProp] && this.shown !== !1 && (this.update(!0), addClass(this.inner, "scrollbar_hovered"), clearTimeout(this.moveTimeout), this.moveTimeout = setTimeout(function() {
                    removeClass(this.inner, "scrollbar_hovered")
                }.bind(this), 300)), !this.shown && !this.options.forceCancelEvent || this.isHorizontal && i == this.obj[this.scrollProp] ? void 0 : !1
            }
        },
        setOptions: function(t) {
            extend(this.options, t)
        },
        widthUpdated: function() {
            var t, e = getSize(this.obj);
            return t = this.isHorizontal ? {
                marginLeft: this.options.top + "px",
                marginTop: e[1] + 3 + "px",
                width: e[0] - this.options.top - this.options.bottom + "px"
            } : {
                marginTop: this.options.top + "px",
                marginLeft: this.options.nomargin ? 0 : e[0] - (this.options.mlDiff || 7) + "px",
                height: e[1] - this.options.top - this.options.bottom + "px"
            }, this.options.nomargin && (void 0 !== this.options.right && "auto" !== this.options.right ? (t.right = this.options.right, t.left = "auto") : void 0 !== this.options.left && (t.right = "auto", t.left = this.options.left)), this.scrollWidth = e[0], this.scrollHeight = e[1], this.scrollbarSize = e[this.isHorizontal ? 0 : 1] - this.options.top - this.options.bottom, setStyle(this.scrollbar, t), setTimeout(function() {
                removeClass(this.scrollbar, "no_transition")
            }.bind(this)), e
        },
        contOver: function() {
            this.isOut = !1, this.shown && addClass(this.scrollbar, "scrollbar_c_overed")
        },
        contOut: function() {
            this.isOut = !0, this.isDown || removeClass(this.scrollbar, "scrollbar_c_overed")
        },
        contDown: function(t) {
            if (t || (t = window.event), this.isHorizontal) {
                var e = t.offsetX - this.innerWidth / 2 + 5,
                    i = this.scrollbarSize - this.innerWidth;
                this.obj.scrollLeft = Math.floor((this.contWidth() - this.scrollWidth) * Math.min(1, e / i))
            } else {
                var e = t.offsetY - this.innerHeight / 2 + 5,
                    i = this.scrollbarSize - this.innerHeight;
                this.obj.scrollTop = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, e / i))
            }
            this.update(!0), this.mouseDown(t)
        },
        hide: function(t) {
            hide(this.topShadowDiv, this.bottomShadowDiv, this.scrollbar), this.hidden = !0
        },
        show: function(t) {
            show(this.topShadowDiv, this.bottomShadowDiv, this.scrollbar), this.hidden = !1
        },
        disable: function() {
            this.hide(), this[this.scrollProp](0), this.disabled = !0
        },
        enable: function() {
            this.show(), this.update(), this.disabled = !1
        },
        getScrollHeight: function() {
            return this.scrollHeight
        },
        scrollTop: function(t) {
            return "undefined" == typeof t ? this.obj.scrollTop : (this.obj.scrollTop = parseInt(t), void this.update(!1, !0))
        },
        scrollBottom: function(t) {
            return "undefined" == typeof t ? this.contHeight() - this.scrollHeight - this.obj.scrollTop : (this.obj.scrollTop = this.contHeight(!0) - this.scrollHeight - t, void this.update(!0, !0))
        },
        smoothScroll: function(t, e, i) {
            var s = this.obj.scrollTop + t;
            "undefined" == typeof i && (i = 300);
            var o = this,
                n = new Fx.Base({
                    scrollTop: this.obj.scrollTop
                }, {
                    transition: Fx.Transitions.easeOutCubic,
                    onStep: function(t) {
                        o.obj.scrollTop = t.scrollTop, o.update(!0)
                    },
                    duration: i,
                    onComplete: function() {
                        e && e(scroll)
                    }
                });
            n.start({
                scrollTop: this.obj.scrollTop
            }, {
                scrollTop: s
            })
        },
        scrollLeft: function(t) {
            this.obj.scrollLeft = parseInt(t), this.update(!1, !0)
        },
        destroy: function(t) {
            each(this.destroyList || [], function(t, e) {
                e()
            })
        },
        contHeight: function() {
            return Math.round(this.options.contHeight || this.obj.scrollHeight)
        },
        contWidth: function() {
            return Math.round(this.options.contWidth || this.obj.scrollWidth)
        },
        val: function(t) {
            return t && (this.obj[this.scrollProp] = t, this.update(!0, !0)), this.obj[this.scrollProp]
        },
        update: function(t, e) {
            if (this.inited && !this.hidden) {
                if (!t && (this.isHorizontal ? this.moveX : this.moveY)) return !0;
                var i, s, o;
                if (e && (i = getSize(this.obj), this.isHorizontal ? (this.scrollWidth = i[0], i = Math.round(this.scrollWidth - this.options.top - this.options.bottom), this.scrollbarSize !== i && (this.scrollbar.style.width = i + "px")) : (this.scrollHeight = i[1], i = Math.round(this.scrollHeight - this.options.top - this.options.bottom), this.scrollbarSize !== i && (this.scrollbar.style.height = i + "px")), this.scrollbarSize = i), this.isHorizontal ? (i = this.contWidth()) <= Math.round(this.scrollWidth) : (i = this.contHeight()) <= Math.round(this.scrollHeight)) return hide(this.inner, this.bottomShadowDiv, this.topShadowDiv), this.scrollbar.style.pointerEvents = "none", this.topShadow = this.bottomShadow = this.shown = !1, isFunction(this.options.more) && i - this.obj[this.scrollProp] < 2 * this[this.scrollDimensionProp] && this.options.more(this), void(this[this.scrollProp + "Last"] = this.obj[this.scrollProp]);
                this.shown || (show(this.inner), this.scrollbar.style.pointerEvents = "", this.shown = !0);
                var o = this.val();
                isFunction(this.options.scrollChange) && this.options.scrollChange(o), this.lastProgress = Math.min(1, o / (i - (this.isHorizontal ? this.scrollWidth : this.scrollHeight))), this.lastProgress > 0 != this.topShadow && ((this.topShadow = !this.topShadow) ? show : hide)(this.topShadowDiv), this.lastProgress < 1 != this.bottomShadow && ((this.bottomShadow = !this.bottomShadow) ? show : hide)(this.bottomShadowDiv), this.isHorizontal ? (s = Math.max(40, Math.floor(this.scrollbarSize * this.scrollWidth / i)), s !== this.innerWidth && (this.inner.style.width = (this.innerWidth = s) + "px"), this.inner.style.marginLeft = (this.scrollbarSize - s - 2 * this.options.padding) * this.lastProgress + this.options.padding + "px") : (s = Math.max(40, Math.floor(this.scrollbarSize * this.scrollHeight / i)), s !== this.innerHeight && (this.inner.style.height = (this.innerHeight = s) + "px"), this.inner.style.marginTop = (this.scrollbarSize - s - 2 * this.options.padding) * this.lastProgress + this.options.padding + "px"), isFunction(this.options.more) && i - this.obj[this.scrollProp] < 2 * this[this.scrollDimensionProp] && this.options.more(this), this[this.scrollProp + "Last"] = this.obj[this.scrollProp]
            }
        },
        restore: function() {
            this.obj[this.scrollProp] = this[this.scrollProp + "Last"]
        }
    }, o
}(), extend(OList.prototype, {
    onScroll: function() {
        var t = domPN(this.box.bodyNode),
            e = this.moreEl,
            i = this.scrollNode,
            s = i.scrollHeight,
            o = i.scrollTop,
            n = i.offsetHeight || i.clientHeight;
        toggleClass(t, "olist_topsh", o > 0), toggleClass(t, "olist_botsh", s > o + n), e && e.offsetTop && e.onclick && o + n + 200 >= s && e.onclick()
    },
    onMouseEvent: function(t) {
        var e = t.originalTarget || t.target;
        if (hasClass(e, "olist_item_wrap") || (e = gpeByClass("olist_item_wrap", e)), e && e != bodyNode) {
            if (hasClass(e, "olist_item_loading")) return cancelEvent(t);
            if (checkEvent(t)) return !0;
            this.box.changed = !0;
            var i = e.id.match(/-?\d+/)[0],
                s = !this.invertedSelection && this.selected[i] || this.invertedSelection && !this.selected[i];
            if (toggleClass(e, "olist_item_wrap_on", !s), this.selected[i] = !s || this.invertedSelection, this.selCnt += !s || this.invertedSelection ? 1 : -1, this.selTabUpdate(), this.onListClick && this.onListClick(e, s), this.scrollNode.scrollTop < 50) {
                var o = this.filter;
                setTimeout(elfocus.pbind(o), 100)
            }
            return cancelEvent(t)
        }
    },
    onOlistSelect: function(t, e) {
        uiActionsMenu.toggle(this.olistFilter, !1);
        var i = this.selCnt,
            s = this.selected;
        switch (e.ctrlKey || e.metaKey || e.shiftKey || (s = {}, i = 0), t) {
            case "all":
                s = {}, i = 0, each(this.owners, function() {
                    s[this[0]] = 1, i++
                });
                break;
            case "none":
                s = {}, i = 0;
                break;
            case "people":
                each(this.owners, function() {
                    this[0] > 0 && !s[this[0]] && (s[this[0]] = 1, i++)
                });
                break;
            case "groups":
                each(this.owners, function() {
                    this[0] < 0 && !s[this[0]] && (s[this[0]] = 1, i++)
                });
                break;
            default:
                var o = intval(t.replace("list", "")),
                    n = 1 << o;
                each(this.owners, function() {
                    this[4] & n && !s[this[0]] && (s[this[0]] = 1, i++)
                })
        }
        return this.selCnt = i, this.selected = s, this.selTabUpdate(), this.renderList(), !1
    },
    onOlistFilters: function(t, e) {
        return uiActionsMenu.show(t, e), addEvent(document, "mousedown", function(e) {
            uiActionsMenu.toggle(t, !1), removeEvent(document, "mousedown", arguments.callee)
        }), e && cancelEvent(e)
    },
    selTabUpdate: function() {
        if (this.isAlbumEdit) return void(this.onTabUpdate && this.onTabUpdate());
        if (this.tabs) {
            var t = this.selCnt,
                e = this.owners.length - t,
                i = geByClass1("olist_tab_sel", this.tabs),
                s = geByClass1("olist_tab_unsel", this.tabs);
            val(geByClass1("ui_tab_count", i), t || ""), val(geByClass1("ui_tab_count", s), e || ""), this.onTabUpdate && this.onTabUpdate()
        }
    },
    renderList: function(t, e, i) {
        e = e || 0, i = i || this.sel;
        var s, o, n, r = e ? 60 : 120,
            l = this;
        t && (t = t.replace(/\u2013|\u2014/g, "-")), s = t ? this.indexer.search(t) : this.owners, l.unsortedIndex == i && l.getUnsorted && (s = l.getUnsorted(s)), o = this.selected;
        var a = l.invertedSelection ? !(this.sel < 0) : this.sel < 0;
        if (n = l.tpl, i && l.unsortedIndex != i) {
            var h = [];
            each(s, function() {
                var t = this[l.idIndex];
                return (!a && o[t] || a && !o[t]) && (h.push(this), h.length > e + r) ? !1 : void 0
            }), s = h
        }
        var d = s.length;
        s = s.slice(e, e + r);
        var u = [];
        if (t) {
            t = clean(t);
            var c = escapeRE(t),
                p = parseLatin(t);
            null != p && (c = c + "|" + escapeRE(p));
            var m = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + c + "))(?![^<>]*>)(?![^&;]+;)", "gi")
        }
        var g = l.rsTpl ? l.rsTpl : function(t, e, i, s, o) {
            var n = !i && s[t[0]] || i && !s[t[0]],
                r = t[1];
            if (e) {
                r = -1 == e.indexOf(" ") ? r.split(" ") : [r];
                var l = "";
                for (var a in r) l += (a > 0 ? " " : "") + r[a].replace(o, "$2<em>$3</em>");
                r = l
            }
            return {
                id: t[0],
                name: r,
                photo: t[2],
                classname: n ? " olist_item_wrap_on" : "",
                link: t[3] || (t[0] > 0 ? "id" + t[0] : "club" + -t[0])
            }
        };
        each(s, function() {
            u.push(rs(n, g(this, t, l.invertedSelection, o, m)))
        }), e || u.length || u.push('<div class="no_rows">' + (t ? getLang("global_search_not_found").replace("{search}", t) : l.noSelMsg) + "</div>"), re(this.moreEl), u = u.join(" "), e ? this.olistEl.appendChild(cf(u)) : val(this.olistEl, u), d > e + r && (this.olistEl.appendChild(this.moreEl), this.moreEl.onclick = function(i) {
            return l.renderList(t, e + r), cancelEvent(i)
        }), l.box && l.box.scroll && l.box.scroll.update(!1, !0), l.onScroll()
    }
});
var uiBox = {
    addShadows: function(t) {
        setTimeout(function() {
            var e = domFC(t.bodyNode),
                i = function() {
                    toggleClass(domPN(t.bodyNode), "box_topsh", e.scrollTop > 0), toggleClass(domPN(t.bodyNode), "box_botsh", e.scrollTop + (e.offsetHeight || e.clientHeight) < e.scrollHeight)
                };
            addEvent(e, "scroll", i), setTimeout(i, 10)
        }, 10)
    }
};
Slider.prototype.toggleAdState = function(t) {
    this._adState = !!t, toggleClass(this._el, "slider_ad_mode", !!t)
}, Slider.prototype.toggleAdMarker = function(t) {
    t = !!t;
    var e = geByClass1("slider_ad_marker", this._el);
    if (t) {
        if (!e) {
            var i = "onmouseover=\"showTooltip(this, {text: '" + getLang("global_audio_ad") + "', black: 1, shift: [16, 9, 10]})\"";
            e = se('<div class="slider_ad_marker_wrap" ' + i + '><div class="slider_ad_marker"></div></div>'), domPN(this._slideEl).insertBefore(e, this._slideEl), delete this._width, addClass(this._el, "slider_ad_marker_shown")
        }
    } else re(e), delete this._width, removeClass(this._el, "slider_ad_marker_shown")
}, Slider.prototype.showAdMarker = function(t) {
    var e = se('<div class="slider_ad_marker"></div>');
    domPN(this._slideEl).insertBefore(e, this._slideEl), delete this._width, addClass(this._el, "slider_ad_marker_shown")
}, Slider.prototype.isAdMode = function() {
    return hasClass(this._el, "slider_ad_mode")
}, Slider.prototype.toggleLoading = function(t) {
    t = !!t, toggle(this._progressEl, t), setStyle(this._progressEl, "opacity", t ? 1 : 0)
}, Slider.prototype.destroy = function(t) {
    this.options.formatHint && (removeEvent(this._el, "mousemove", this._ev_onMouseOver), removeEvent(this._el, "mouseleave", this._ev_onMouseLeave), removeEvent(this._el, "mousedown", this._ev_onMouseDown)), re(this._el), re(this._currHintEl)
}, Slider.prototype._updateHint = function(t, e) {
    this._currHintEl || (this._currHintEl = se('<div class="slider_hint" id="slider_hint"></div>'), this.options.hintClass && addClass(this._currHintEl, this.options.hintClass), this._el.appendChild(this._currHintEl)), this._width = this._width || getSize(this._slideEl)[0];
    var i = this._getPos(),
        s = Math.round(t.pageX - i[0]),
        o = this._width;
    if (s = e ? Math.min(Math.max(0, s), o) : s, s >= 0 && o >= s) {
        var n = s / o;
        this._currHintEl.innerHTML = this.options.formatHint ? this.options.formatHint.call(this, n) : n;
        var r = getSize(this._currHintEl);
        setStyle(this._currHintEl, {
            left: this._slideEl.offsetLeft + s - r[0] / 2,
            top: this._slideEl.offsetTop - r[1] - 10
        }), !e && this._toggleHint(!0)
    } else !e && this._toggleHint(!1);
    this.options.formatHint || this._toggleHint(!1)
}, Slider.prototype._toggleHint = function(t) {
    this.isAdMode() && (t = !1), toggleClass(this._currHintEl, "visible", t)
}, Slider.prototype._onMouseOver = function(t) {
    Slider._currenSliderDrag || hasClass(this._el, "active") || this._updateHint(t)
}, Slider.prototype._onMouseLeave = function(t) {
    hasClass(this._el, "active") || this._toggleHint(!1)
}, Slider.prototype._onMouseDown = function(t) {
    0 == t.button && (delete cur._sliderMouseUpNowEl, this._adState || (addEvent(window, "mousemove", this._ev_onMouseMove = this._onMouseMove.bind(this)), addEvent(window, "mouseup", this._ev_onMouseUp = this._onMouseUp.bind(this)), this._width = getSize(this._slideEl)[0], this._onMouseMove(t), Slider._currenSliderDrag = this, addClass(this._el, "active"), cancelEvent(t)))
}, Slider.prototype._onMouseUp = function(t) {
    cur._sliderMouseUpNowEl = this._el, removeEvent(window, "mousemove", this._ev_onMouseMove), removeEvent(window, "mouseup", this._ev_onMouseUp), clearTimeout(this._debounceto), this._onValueChange(), removeClass(this._el, "active"), Slider._currenSliderDrag = !1, this._toggleHint(!1), this.options.onEndDragging && this.options.onEndDragging(this._currValue)
}, Slider.prototype._onMouseMove = function(t) {
    var e = this._getPos(),
        i = Math.max(t.pageX, e[0]);
    i = Math.min(i, e[0] + this._width), i -= e[0], this.setValue(i / this._width, !0, !0), this._onValueChangeDebounced ? this._onValueChangeDebounced() : this._onValueChange(), this._toggleHint(!0), this._updateHint(t, !0), cancelEvent(t)
}, Slider.prototype._getPos = function() {
    return this._slidePos = getXY(this._slideEl)
}, Slider.LOGFBASE = 35, Slider.prototype._logf = function(t) {
    if (!this.options.log) return t;
    var e = Slider.LOGFBASE;
    return (Math.pow(e, t) - 1) / (e - 1)
}, Slider.prototype._unlogf = function(t) {
    function e(t, e) {
        return Math.log(e) / Math.log(t)
    }
    if (!this.options.log) return t;
    var i = Slider.LOGFBASE;
    return e(i, 1 + t * (i - 1))
}, Slider.prototype.setValue = function(t, e, i) {
    if (!hasClass(this._el, "active") || i) {
        var s = i ? this._logf(t) : t;
        if (this._currValue != s) {
            this._currValue = s;
            var o = i ? t : this._unlogf(t);
            o = 100 * o + "%", setStyle(this._amountEl, {
                width: o
            }), setStyle(this._handlerEl, {
                left: o
            }), !e && this._onValueChange()
        }
    }
}, Slider.prototype.setBackValue = function(t) {
    toggleClass(this._backEl, "slider_back_transition", t > this._backValue), this._backValue = t;
    var e = 100 * t + "%";
    setStyle(this._backEl, {
        width: e
    })
}, Slider.prototype._onValueChange = function() {
    this._lastValue = this._lastValue || 0, this._lastValue != this._currValue && (this._lastValue = this._currValue, this.options.onChange && this.options.onChange(this._currValue))
};
try {
    stManager.done("ui_common.js")
} catch (e) {}