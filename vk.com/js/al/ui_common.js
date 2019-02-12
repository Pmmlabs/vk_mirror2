var uiTabs = {
    initTabs: function(tabs, from_tab) {
        if (browser.msie && intval(browser.version) < 10) return;
        if (browser.opera && intval(browser.version) < 15) return;
        if (hasClass(tabs, 'ui_tabs_sliding')) return;
        var width = getSize(from_tab)[0],
            left = from_tab.offsetLeft;
        var slider = geByClass1('_ui_tabs_slider', tabs);
        if (!domData(tabs, 'inited')) {
            var mstyles = {
                width: width + 'px',
                marginLeft: left
            };
            setStyle(slider, mstyles);
        }
    },

    tryInit: function(tabs) {
        if (domData(tabs, 'inited')) {
            return;
        }
        var tab = geByClass1('ui_tab_group_sel', tabs) || geByClass1('ui_tab_sel', tabs);
        if (tab) {
            uiTabs.initTabs(tabs, tab);
        }
        domData(tabs, 'inited', 1);
    },

    goTab: function(el, e, forceNav) {
        if (checkEvent(e)) return true;
        var tabs = gpeByClass('ui_tabs', el);
        if (!forceNav && geByClass1('ui_tab_sel', tabs) == el) return false;
        uiTabs.switchTab(el);
        uiTabs.showProgress(tabs);
        return nav.go(el, e, {
            tab: el
        });
    },
    switchTab: function(el, opts) {
        var tabs = gpeByClass('ui_tabs', el),
            cur_tab = geByClass1('ui_tab_sel', tabs),
            to_group = null,
            from_group = null,
            from_tab = hasClass(cur_tab, 'ui_tab_group_item') ? (from_group = gpeByClass('ui_tab_group', cur_tab)) : cur_tab,
            to_tab = hasClass(el, 'ui_tab_group_item') ? (to_group = gpeByClass('ui_tab_group', el)) : el;
        if (el != cur_tab) {
            if (el != to_tab) {
                uiTabs.toggleGroup(to_tab, false);
                uiTabs.resetLabel(to_tab, el);
            }
            if (from_tab) {
                uiTabs.initTabs(tabs, from_tab);
                opts = opts || {};
                if (!opts.noAnim && to_tab !== from_tab) {
                    addClass(tabs, 'ui_tabs_sliding');
                    clearTimeout(cur.tabSlidingTO);
                    cur.tabSlidingTO = setTimeout(removeClass.pbind(tabs, 'ui_tabs_sliding'), 300);
                }

                var slider = geByClass1('_ui_tabs_slider', tabs);
                var mleft = intval(slider.style.marginLeft);
                var mstyles = {
                    width: getSize(to_tab)[0] + 'px'
                };

                mstyles[cssTransformProp] = 'translateX(' + (to_tab.offsetLeft - mleft) + 'px)';

                setStyle(slider, mstyles);
                if (cur_tab != from_tab && to_tab != from_tab) uiTabs.resetLabel(from_tab);
                from_tab != cur_tab && removeClass(from_tab, 'ui_tab_group_sel');
                removeClass(cur_tab, 'ui_tab_sel');
            }
            to_tab != el && addClass(to_tab, 'ui_tab_group_sel');
            addClass(el, 'ui_tab_sel');
            from_group && removeClass(from_group, 'ui_tab_hide_separator');
            if (to_group) {
                tabs = geByClass1('ui_tab_group_items', to_group, 'div').children;
                var last = null;
                each(tabs, function(i, tab) {
                    if (tab.tagName === 'SPAN') {
                        last = tab;
                    } else if (!hasClass(domFC(tab), 'ui_tab_sel') && !hasClass(tab, 'unshown')) {
                        last = null;
                    }
                });
                last && addClass(to_group, 'ui_tab_hide_separator');
            }
        }
        return false;
    },
    resetLabel: function(el, donor) {
        var label = geByClass1('ui_tab_group_label', el, 'span');
        if (label) label.innerHTML = (donor || label).getAttribute('data-default-label');
    },
    toggleGroup: function(el, s) {
        var vt = data(el, 'visibletimer');
        vt && clearTimeout(vt);
        data(el, 'visibletimer', setTimeout(toggleClass.pbind(el, 'visible', s), s ? 0 : 100));
        toggleClass(el, 'shown', s);
    },
    showGroup: function(el) {
        var ht = data(el, 'hidetimer');
        if (ht) {
            clearTimeout(ht);
            data(el, 'hidetimer', 0);
        }
        uiTabs.toggleGroup(el, true);
    },
    hideGroup: function(el) {
        var ht = data(el, 'hidetimer');
        if (ht) return;
        data(el, 'hidetimer', setTimeout(function() {
            uiTabs.toggleGroup(el, false);
            data(el, 'hidetimer', 0);
        }, 200));
    },
    showProgress: function(el) {
        if (!hasClass(el, 'ui_tabs')) {
            el = gpeByClass('ui_tabs', el);
        }
        addClass(el, 'ui_tabs_loading');
    },
    hideProgress: function(el) {
        if (!hasClass(el, 'ui_tabs')) {
            el = gpeByClass('ui_tabs', el);
        }
        removeClass(el, 'ui_tabs_loading');
    },
    showSearch: function(el, e) {
        if (cur.viewAsBox) {
            return cur.viewAsBox();
        }
        if (checkEvent(e)) return true;
        var tabs = gpeByClass('ui_tabs', el),
            ui_search = domByClass(tabs, 'ui_search'),
            ui_search_field = domByClass(tabs, '_field');
        addClass(tabs, 'ui_tabs_search_opened');
        uiSearch.focus(ui_search_field);
        return false;
    },
    hideSearch: function(el, e) {
        if (checkEvent(e)) return true;
        var tabs = gpeByClass('ui_tabs', el);
        removeClass(tabs, 'ui_tabs_search_opened');
        return false;
    }
}

var uiActionsMenu = {
    keyToggle: function(el, ev) {
        if (!checkKeyboardEvent(ev)) {
            return false;
        }
        var wrap = domClosest('_ui_menu_wrap', el);
        wrap && uiActionsMenu.toggle(wrap, !hasClass(wrap, 'shown'));
    },
    toggle: function(el, s, options) {
        var dummyMenu = data(el, 'dummyMenu');
        if (dummyMenu) {
            el = dummyMenu;
        }
        toggleClass(el, 'shown', s);

        var onhide = attr(el, 'onHide')
        if (onhide && !hasClass(el, 'shown')) {
            eval(onhide);
        }

        if (options && options.onToggle) {
            var script = options.onToggle.replace('{isShow}', '' + s);
            eval(script);
        }
    },
    show: function(el, ev, options) {
        var ht = data(el, 'hidetimer');
        if (ht) {
            clearTimeout(ht);
            data(el, 'hidetimer', 0);
        }
        var _m = data(el, 'origMenu');
        if (_m && (ht = data(_m, 'hidetimer'))) {
            clearTimeout(ht);
            data(el, 'hidetimer', 0);
        }

        if (options && options.delay) {
            if (cur.uiActionsMenuShowTimeout) {
                clearTimeout(cur.uiActionsMenuShowTimeout);
            }
            var delay = options.delay;
            delete options.delay;
            cur.uiActionsMenuShowTimeout = setTimeout(uiActionsMenu.show.pbind(el, ev, options), delay);
            return;
        } else if (cur.uiActionsMenuShowTimeout) {
            clearTimeout(cur.uiActionsMenuShowTimeout);
            delete cur.uiActionsMenuShowTimeout;
        }

        if (options && options.appendParentCls) {
            var menu = geByClass1('_ui_menu', el);
            var menuWrap;
            var appendEl;
            if (menu) {
                appendEl = domClosest(options.appendParentCls, menu);
                menuWrap = domClosest('_ui_menu_wrap', el);
                var newWrap = se('<div class="' + menuWrap.className + ' ui_actions_menu_dummy_wrap' + '" onmouseover="uiActionsMenu.show(this);" onmouseout="uiActionsMenu.hide(this);"></div>');
                newWrap.appendChild(menu);
                appendEl.appendChild(newWrap);
                data(el, 'dummyMenu', newWrap);
                data(newWrap, 'origMenu', el);
                el = newWrap;

                data(menu, 'top', intval(getStyle(menu, 'top')));
                data(menu, 'left', intval(getStyle(menu, 'left')));
                data(menu, 'right', intval(getStyle(menu, 'right')));

                if (options.processHoverCls) {
                    var row = domClosest(options.processHoverCls, menuWrap);
                    addEvent(el, 'mouseover', addClass.pbind(row, 'hover'));
                    addEvent(el, 'mouseout', removeClass.pbind(row, 'hover'));
                }
            } else {
                el = data(el, 'dummyMenu');
            }

            var origEl = data(el, 'origMenu');
            menu = geByClass1('_ui_menu', el);
            menuWrap = domClosest('_ui_menu_wrap', origEl);
            appendEl = domClosest(options.appendParentCls, menu);

            setStyle(menu, {
                display: 'block'
            });
            var parXY = getXY(appendEl),
                curXY = getXY(menuWrap);

            var top = data(menu, 'top'),
                left = data(menu, 'left'),
                right = data(menu, 'right'),
                styles = {
                    top: curXY[1] - parXY[1] + top
                }; // 10 - menu-slide-offset
            if (right) {
                styles.right = getSize(appendEl)[0] + parXY[0] - curXY[0] - getSize(menuWrap)[0] + right;
            } else {
                styles.left = curXY[0] - parXY[0] + left;
            }
            setStyle(menu, styles);
        }
        var menu = geByClass1('_ui_menu', el);
        if (options && options.autopos) {
            if (menu && !hasClass(el, 'shown')) {
                removeClass(el, 'ui_actions_menu_left');
                var elY = getXY(el)[1],
                    elH = getSize(el)[1],
                    menuH = getSize(menu)[1],
                    dy = options.dy || 10,
                    menuX = getXY(menu)[0];
                removeClass(el, 'ui_actions_menu_top');
                addClass(el, 'no_transition');
                if (elY + elH + dy + menuH > (browser.mozilla ? getSize('page_wrap')[1] : scrollGetY() + (window.lastWindowHeight || 0))) {
                    addClass(el, 'ui_actions_menu_top');
                }
                if (elY - dy - menuH < scrollGetY() + getSize('page_header_wrap')[1]) {
                    removeClass(el, 'ui_actions_menu_top');
                }
                toggleClass(el, 'ui_actions_menu_left', menuX < 0);
                removeClass(el, 'no_transition');
            }
        }
        if (options && options.scroll && options.maxHeight) {
            menu.style.maxHeight = (intval(options.maxHeight) || 200) + 'px';
            menu.__uiScroll__ || new uiScroll(menu);
        }
        uiActionsMenu.toggle(el, true, options);
    },
    hide: function(el, ev, options) {
        if (cur.uiActionsMenuShowTimeout) {
            clearTimeout(cur.uiActionsMenuShowTimeout);
            delete cur.uiActionsMenuShowTimeout;
        }
        var delay = data(el, 'hidedelay');
        if (delay) {
            data(el, 'hidedelay', false);
        } else {
            delay = 200;
        }
        var ht = data(el, 'hidetimer');
        if (ht) {
            return;
        }
        data(el, 'hidetimer', setTimeout(function() {
            uiActionsMenu.toggle(el, false, options);
            data(el, 'hidetimer', 0);
        }, delay));
    },
    hideDelay: function(el, delay) {
        data(el, 'hidedelay', delay);
    }
}

var uiRightMenu = {
    initMenu: function(menu, noPseudoInit) {
        if (browser.msie && intval(browser.version) < 10) return;
        if (browser.opera && intval(browser.version) < 15) return;
        if (hasClass(menu, 'ui_rmenu_sliding')) return;

        var firstItem = geByClass1('ui_rmenu_item', menu);
        var selectedItem = geByClass1('ui_rmenu_item_sel', menu);
        var cur_item = selectedItem || firstItem;
        var height = getSize(cur_item)[1];
        var top = getXY(cur_item)[1] - getXY(menu)[1];
        var scroller = geByClass1('_ui_rmenu_slider', menu);

        if (!noPseudoInit) {
            var mstyles = {
                height: height,
                top: selectedItem ? top : 0
            };

            setStyle(scroller, mstyles);
            addClass(menu, 'ui_rmenu_sliding');
        }
    },
    go: function(el, e, link, opts) {
        if (checkEvent(e)) return true;
        var menu = gpeByClass('ui_rmenu', el);
        if (!(opts || {}).ignoreSelected && geByClass1('ui_rmenu_item_sel', menu) == el) return false;
        uiRightMenu.switchMenu(el);
        uiRightMenu.showProgress(el);
        if (link === false) {
            return false;
        }
        return nav.go(link || el, e, extend({
            fromMenu: true
        }, opts || {}));
    },
    switchMenu: function(el, force) {
        var menu = gpeByClass('ui_rmenu', el),
            cur_item = geByClass1('ui_rmenu_item_sel', menu);

        if (el == cur_item && !force) return false;

        uiRightMenu.initMenu(menu);

        var height = getSize(el)[1];
        var top = getXY(el)[1] - getXY(menu)[1],
            hidden = [],
            shown = [];

        if (hasClass(menu, '_ui_rmenu_auto_expand')) {
            var sublists = geByClass('_ui_rmenu_sublist', menu),
                newSublist = hasClass(el, '_ui_rmenu_subitem') ? gpeByClass('_ui_rmenu_sublist', el) : (hasClass(domNS(el), '_ui_rmenu_sublist') ? domNS(el) : false);
            each(sublists, function() {
                if (isVisible(this) && this !== newSublist) {
                    hidden.push(this);
                    hide(this);
                }
            });
            if (newSublist && !isVisible(newSublist)) {
                shown.push(newSublist);
                show(newSublist);
            }
            top = el.offsetTop;
            each(hidden, function() {
                show(this);
            });
            each(shown, function() {
                hide(this);
            });
        }
        var scroller = geByClass1('_ui_rmenu_slider', menu);
        var mtop = intval(scroller.style.top);
        var mstyles = {
            height: height
        };

        if (browser.msie_edge) {
            mstyles.marginTop = (top - mtop) + 'px';
        } else {
            mstyles[cssTransformProp] = 'translateY(' + (top - mtop) + 'px)';
        }

        setStyle(scroller, mstyles);
        removeClass(cur_item, 'ui_rmenu_item_sel');
        addClass(el, 'ui_rmenu_item_sel');
        if (hasClass(menu, '_ui_rmenu_auto_expand')) {
            each(hidden.concat(shown), function() {
                uiRightMenu.toggleSubmenu(this);
            });
        } else if (hasClass(el, '_ui_rmenu_subitem') && !isVisible(domPN(el))) {
            uiRightMenu.toggleSubmenu(domPN(el));
        }
        return false;
    },
    fixScroller: function(el) {
        var menu = gpeByClass('ui_rmenu', el);
        if (!menu || !isVisible(el)) return;
        var sliding = hasClass(menu, 'ui_rmenu_sliding'),
            height = getSize(el)[1];
        sliding && uiRightMenu.hideSliding(menu);

        var top = el.offsetTop,
            scroller = geByClass1('_ui_rmenu_slider', menu),
            mtop = intval(scroller.style.top),
            mstyles = {
                height: height
            };

        if (browser.msie_edge) {
            mstyles.marginTop = (top - mtop) + 'px';
        } else {
            mstyles[cssTransformProp] = 'translateY(' + (top - mtop) + 'px)';
        }

        setStyle(scroller, mstyles);
        el.offsetLeft; // rendering fix

        sliding && uiRightMenu.showSliding(menu);
    },
    unselectAll: function(menu) {
        removeClass(menu, 'ui_rmenu_sliding');
        removeClass(geByClass1('ui_rmenu_item_sel', menu), 'ui_rmenu_item_sel');
    },
    hideSliding: function(menu) {
        removeClass(menu, 'ui_rmenu_sliding');
    },
    showSliding: function(menu) {
        addClass(menu, 'ui_rmenu_sliding');
    },
    showProgress: function(el) {
        if (!hasClass(el, 'ui_rmenu')) {
            el = gpeByClass('ui_rmenu', el);
        }

        var loadingEl = geByClass1('ui_rmenu_loading_item', el);
        loadingEl && removeClass(loadingEl, 'ui_rmenu_loading_item');

        var selected = geByClass1('ui_rmenu_item_sel', el);
        hideProgress(el);
        showProgress(domFC(selected).parentNode, '', '', false);

        addClass(el, 'ui_rmenu_loading');
        addClass(selected, 'ui_rmenu_loading_item');
    },
    hideProgress: function(el) {
        if (!hasClass(el, 'ui_rmenu')) {
            el = gpeByClass('ui_rmenu', el);
        }
        hideProgress(el);

        var menu = gpeByClass('ui_rmenu', el);
        removeClass(el, 'ui_rmenu_loading');

        uiRightMenu.hideSliding(menu);

        var loadingEl = geByClass1('ui_rmenu_loading_item', menu);
        loadingEl && removeClass(loadingEl, 'ui_rmenu_loading_item');
    },
    toggleSubmenu: function(name, ref) {
        var menu = gpeByClass('ui_rmenu', ref);
        var el, submenu;

        if (typeof name == 'string') {
            submenu = geByClass1('_ui_rmenu_' + name + '_list', menu);
        } else {
            submenu = name;
            name = submenu.getAttribute('data-sublist-id');
        }
        el = geByClass1('_ui_rmenu_' + name + '_toggle', menu);
        if (!submenu) return false;

        if (ref !== undefined) {
            uiRightMenu.hideSliding(menu);
        }
        el && toggleClass(el, 'ui_rmenu_item_expanded', !isVisible(submenu));
        slideToggle(submenu, (submenu && getSize(submenu)[1] ? 100 : 0));
        setTimeout(updateNarrow, 100);

        var onToggle = domData(el, 'on-toggle');
        if (onToggle) {
            setTimeout(function() {
                eval(onToggle);
            }, 150);
        }

        return false;
    }
}

var uiPageBlock = {
    showSaved: function(id) {
        var el = ge(id),
            block = el && gpeByClass('page_block', el),
            saved = block && geByClass1('page_block_saved', block);
        if (!el || !block || !saved) return;

        var callback = animate.pbind(saved, {
            opacity: 1
        }, 200, animate.pbind(saved, {
            opacity: 0
        }, 2000));
        uiPageBlock.scrollToStart(block, callback);
    },
    scrollToStart: function(block, callback) {
        var y = getXY(block)[1],
            maxDistance = 60,
            duration = 200;
        if (scrollGetY() > y - maxDistance) {
            scrollToY(y - maxDistance, duration);
            if (callback) {
                setTimeout(callback, duration);
            }
        } else if (callback) {
            callback();
        }
    }
}

var uiSearch = {
    destroy: function(el) {
        var input = uiSearch.getFieldEl(el);
        uiSearch.stopEvents(input);
        removeData(input);
    },

    getWrapEl: function(el) {
        return domClosest('_wrap', el);
    },
    getFieldEl: function(el) {
        el = ge(el);
        if (hasClass('_field', el)) return el;
        return domByClass(uiSearch.getWrapEl(el), '_field');
    },
    stopEvents: function(el) {
        var events = (data(el, 'eventHandlers') || []);
        each(events, function(i, evt) {
            evt.stop();
        });
    },
    startEvents: function(el) {
        var events = (data(el, 'eventHandlers') || []);
        each(events, function(i, evt) {
            evt.stop();
            evt.start();
        });
    },
    init: function(el, options) {
        if (!el) {
            return;
        }

        el = uiSearch.getFieldEl(el);

        if (!el) {
            return;
        }

        var wrapEl = uiSearch.getWrapEl(el);
        var delayedInitOptions = !options && domData(wrapEl, 'init-options');

        if (delayedInitOptions) {
            domData(wrapEl, 'init-options', null);
            uiSearch.init(el, eval('(function() { return ' + delayedInitOptions + ' })()'));
            return;
        }

        if (data(el, 'inited')) return;
        data(el, 'inited', 1);

        var onKeyDown = uiSearch.onKeyDown.pbind(el);
        var onBuffer = function(ev) {

            // ignore ie firing input event on placeholder disappear
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/274987/
            if (ev.type === 'input' && browser.msie) {
                var value = val(el);
                if (value === (domData(el, 'prev-value') || '')) {
                    return;
                } else {
                    domData(el, 'prev-value', value);
                }
            }

            setTimeout(uiSearch.onChanged.pbind(el, false, ev), 0);
        }
        var onBlur = uiSearch.onBlurred.pbind(el);

        placeholderInit(el);
        data(el, 'opts', options);

        if (options.suggester) {
            options.suggester.instance = new Suggester(el, extend(options.suggester, {
                type: options.suggester.type,
                historyItems: options.suggester.history ? options.suggester.historyItems : false,
                onSearch: function(query, suggestedQuery, fromHistory) {
                    if (!query) {
                        if (!options.allowFiltersForEmpty) {
                            uiSearch.removeAllFilters(el);
                        }
                        uiSearch.hideProgress(el);
                    }

                    toggleClass(wrapEl, 'ui_search_field_empty', !query);

                    options.onChange && options.onChange.call(el, query, suggestedQuery, fromHistory);
                }
            }));

            var mainHandler = {
                start: function() {
                    addEvent(el, 'blur', onBlur);
                    options.onBlur && addEvent(el, 'blur', options.onBlur);
                    options.onFocus && addEvent(el, 'focus', options.onFocus);
                },
                stop: function() {
                    removeEvent(el, 'blur', onBlur);
                    options.onBlur && removeEvent(el, 'blur', options.onBlur);
                    options.onFocus && removeEvent(el, 'focus', options.onFocus);
                }
            };
        } else {
            var searchBtn = geByClass1('_ui_search_button_search', wrapEl),
                onBtnClick = function(ev) {
                    uiSearch.onEnter(el, ev);
                    elfocus(el);
                }
            var mainHandler = {
                start: function() {
                    addEvent(el, 'keydown', onKeyDown);
                    addEvent(el, 'paste cut input', onBuffer);
                    addEvent(el, 'blur', onBlur);
                    options.onBlur && addEvent(el, 'blur', options.onBlur);
                    options.onFocus && addEvent(el, 'focus', options.onFocus);
                    searchBtn && addEvent(searchBtn, 'click', onBtnClick);
                },
                stop: function() {
                    removeEvent(el, 'keydown', onKeyDown);
                    removeEvent(el, 'paste cut input', onBuffer);
                    removeEvent(el, 'blur', onBlur);
                    options.onBlur && removeEvent(el, 'blur', options.onBlur);
                    options.onFocus && removeEvent(el, 'focus', options.onFocus);
                    searchBtn && removeEvent(searchBtn, 'click', onBtnClick);
                }
            };
        }

        mainHandler.start();
        data(el, 'eventHandlers', [mainHandler]);

        if (options.params) {
            var content = se(trim(options.params.html));

            options.paramsTooltip = new ElementTooltip(geByClass1('_ui_search_params_button', wrapEl), {
                appendTo: wrapEl,
                content: content,
                autoShow: false,
                customShow: true,
                offset: [0, -2],
                shift: options.params.shift ? options.params.shift : 0
            });

            options.paramsTooltip.build(); // initiate content to be attached to dom, so init script run correctly

            setTimeout(function() { // next tick needed
                (function initScript() {
                    eval(options.params.script);
                }).call(el)
            });
        }

        if (options.fixed) {
            uiSearch.setFixed(el);
        }

        if (!options.noAutoDestroy) {
            cur.destroy.push(uiSearch.stopEvents.pbind(el));
        }

        uiSearch.initFilters(el, options);
        if (isFunction(options.onInit)) {
            options.onInit(el, options);
        }
    },
    getOptions: function(el) {
        var wrapEl = uiSearch.getWrapEl(el);
        var el = geByClass1('_field', wrapEl);
        return data(el, 'opts');
    },
    toggleParameters: function(btn) {
        var wrapEl = uiSearch.getWrapEl(btn);
        var el = geByClass1('_field', wrapEl);
        var opts = data(el, 'opts');

        opts.paramsTooltip && opts.paramsTooltip.toggle();
    },

    // tells suggester to save query
    saveHistorySearch: function(el, q, objectOwnerId, objectId, totalCount, totalCountHash) {
        if (!q) {
            q = val(el);
        }

        var options = uiSearch.getOptions(el);
        if (options.suggester && options.suggester.instance) {
            options.suggester.instance.saveHistoryItem(q, objectOwnerId, objectId, totalCount, totalCountHash);
        }
    },

    onEnter: function(el, ev) {
        el = uiSearch.getFieldEl(el);
        var opts = data(el, 'opts'),
            value = el.getValue();
        opts.onEnter && opts.onEnter(el, value, ev);
        return cancelEvent(ev);
    },

    onKeyDown: function(el, ev) {
        if (cur.preventInputActions && [KEY.RETURN, KEY.ESC, KEY.DOWN, KEY.UP].indexOf(ev.keyCode) != -1) return cancelEvent(ev);

        if (ev.keyCode == KEY.RETURN) {
            return uiSearch.onEnter(el, ev);
        } else if (ev.keyCode == KEY.ESC) {
            var needCancel = !!val(el);
            uiSearch.reset(el, false, ev);
            return needCancel ? cancelEvent(ev) : true;
        }

        setTimeout.pbind(uiSearch.onChanged.pbind(el, false, ev), 0);
    },

    onBlurred: function(el, ev) {
        var opts = data(el, 'opts');
        opts.onBlur && opts.onBlur.call(el, ev);
    },

    onChanged: function(el, noFire, ev) {
        el = uiSearch.getFieldEl(el);

        var opts = data(el, 'opts'),
            wrap = uiSearch.getWrapEl(el),
            value = el.getValue ? el.getValue() : el.value;

        toggleClass(wrap, 'ui_search_field_empty', !trim(value));

        if (!value && !opts.allowFiltersForEmpty) {
            uiSearch.removeAllFilters(el);
        }

        if (!noFire) {
            opts.onChange && opts.onChange.call(el, value, ev);
        }
    },

    focus: function(el) {
        el = uiSearch.getFieldEl(el);
        elfocus(el);
    },

    reset: function(el, noFire, ev) {
        el = uiSearch.getFieldEl(el);

        var opts = data(el, 'opts');
        var wrap = uiSearch.getWrapEl(el);
        var value = el.getValue ? el.getValue() : el.value;

        if (value) {
            val(el, '');
            uiSearch.onChanged(el, noFire, ev);
            if (!noFire) {
                opts.onEnter && opts.onEnter(el, '');
            }
            elfocus(el);
        } else if (opts.in_tabs) {
            uiTabs.hideSearch(wrap);
        }

        window.tooltips && tooltips.destroyAll();
    },
    showProgress: function(el) {
        el = uiSearch.getFieldEl(el);
        var wrap = uiSearch.getWrapEl(el);

        addClass(wrap, 'ui_search_loading');

        var val = el.getValue ? trim(el.getValue()) : el.value
        toggleClass(wrap, 'ui_search_field_empty', !val);
    },
    hideProgress: function(el) {
        el = uiSearch.getFieldEl(el);
        var wrap = uiSearch.getWrapEl(el);

        removeClass(wrap, 'ui_search_loading');

        var val = el.getValue ? trim(el.getValue()) : el.value
        toggleClass(wrap, 'ui_search_field_empty', !val);
    },
    scrollResize: function(el) {
        if (browser.mobile) return;

        el = uiSearch.getFieldEl(el);
        var wrap = uiSearch.getWrapEl(el),
            wrapPN = wrap && domPN(wrap),
            isFixed = wrap && hasClass(wrap, 'ui_search_fixed'),
            block = ge(cur.uiSearchPageBlock) || gpeByClass('page_block', el),
            headH = vk.staticheader ? Math.max(0, getSize(ge('page_header'))[1] - scrollNode.scrollTop) : getSize(ge('page_header'))[1],
            top,
            inBox = wrap && isAncestor(wrap, boxLayerWrap);
        if (!wrap || !wrapPN || !inBox && !gpeByClass('scroll_fix', wrap) || el.ignoreFixed && !isFixed || !isVisible(wrapPN)) return;

        var needFix = inBox ? getXY(wrapPN, true)[1] < 0 : getXY(wrapPN, true)[1] < headH;
        if (needFix) {
            var w = intval(getStyle(el, 'width'))
            if (!isFixed && w) {
                setStyle(wrapPN, 'height', getSize(wrap)[1]);
                setStyle(wrap, 'width', w);
                addClass(wrap, 'ui_search_fixed');
            }
            var ml = Math.min(0, Math.max(-bodyNode.scrollLeft, bodyNode.clientWidth - getSize(ge('page_layout'))[0]));
            setStyle(wrap, {
                marginLeft: ml
            });
            if (block) {
                var blockPos = getXY(block)[1] + getSize(block)[1] - scrollGetY() - el.offsetHeight;
                top = Math.min(headH, Math.max(-el.offsetHeight, blockPos));
                if (top !== cur.lastUISearchPos) {
                    setStyle(wrap, 'top', top);
                    cur.lastUISearchPos = top;
                }
            }
        } else if (isFixed) {
            setStyle(wrapPN, 'height', '');
            setStyle(wrap, {
                top: '',
                marginLeft: ''
            });
            cur.lastUISearchPos = false;
            removeClass(wrap, 'ui_search_fixed');
        }
    },
    setStatic: function(el) {
        el.ignoreFixed = true;
        var wrap = uiSearch.getWrapEl(el),
            wrapPN = wrap && domPN(wrap);
        if (!wrap || !wrapPN) return;
        setStyle(wrapPN, 'height', '');
        setStyle(wrap, {
            top: '',
            marginLeft: ''
        });
        cur.lastUISearchPos = false;
        removeClass(wrap, 'ui_search_fixed');
    },
    setFixed: function(el) {
        el.ignoreFixed = false;

        if (!data(el, 'resizeEventHandler')) {
            var scrollNode = isAncestor(el, boxLayerWrap) ? boxLayerWrap : window,
                onSearchScroll = uiSearch.scrollResize.pbind(el),
                eventHandler = {
                    stop: removeEvent.pbind(scrollNode, 'scroll', onSearchScroll),
                    start: addEvent.pbind(scrollNode, 'scroll', onSearchScroll)
                };
            data(el, 'eventHandlers', (data(el, 'eventHandlers') || []).concat([eventHandler]));
            data(el, 'resizeEventHandler', true);
            eventHandler.start();
        }

        uiSearch.scrollResize(el);
    },
    initFilters: function(el, options) {
        if (!el) {
            return;
        }

        var parent = uiSearch.getWrapEl(el);
        var link = geByClass1('ui_search_fltr_control', parent);
        var eventHandler = {
            start: function() {
                addEvent(link, 'click', function(e) {
                    if (!hasClass(link, 'shown') || hasClass(e.target, 'ui_search_fltr_control')) {
                        toggleFilters(link);
                    }
                });
                addEvent(link, 'mouseover', function() {
                    if (!hasClass(link, 'shown')) {
                        return;
                    }
                    var ht = data(link, 'hidetimer');
                    if (ht) {
                        clearTimeout(ht);
                        data(link, 'hidetimer', 0);
                    }
                    toggleFilters(link, true);
                });
                addEvent(link, 'mouseout', function() {
                    var ht = data(link, 'hidetimer');
                    if (ht) {
                        return;
                    }
                    data(link, 'hidetimer', setTimeout(function() {
                        toggleFilters(link, false);
                        data(link, 'hidetimer', 0);
                    }, 200));
                });
            },
            stop: removeEvent.pbind(link, 'click mouseover mouseout')
        };

        data(el, 'eventHandlers', (data(el, 'eventHandlers') || []).concat([eventHandler]));
        eventHandler.start();

        function toggleFilters(el, s) {
            toggleClass(el, 'shown', s);
        }

        var filtersTokensPaneEl = uiSearch._getFiltersPane(el);
        addEvent(filtersTokensPaneEl, 'click', function(event) {
            if (hasClass(event.target, 'token_title') || hasClass(event.target, 'token_del')) {
                var token = gpeByClass('token', event.target),
                    fid = domData(token, 'id');
                uiSearch.removeFilter(el, fid);
            }
        });
    },
    removeAllFilters: function(el) {
        var filtersPane = uiSearch._getFiltersPane(el);
        var filters = data(filtersPane, 'cur_filters');

        each(extend({}, filters), function(fid) {
            uiSearch.removeFilter(el, fid, true);
        });
    },
    toggleFilter: function(el, id, title, toggle) {
        if (toggle) {
            uiSearch.addFilter(el, id, title);
        } else {
            uiSearch.removeFilter(el, id);
        }
    },
    addFilter: function(el, id, title) {
        if (!id || !title) return;
        var filtersPane = uiSearch._getFiltersPane(el);

        var curFilters = data(filtersPane, 'cur_filters') || {};
        curFilters[id] = title;
        data(filtersPane, 'cur_filters', curFilters);

        uiSearch._renderFilters(el);
    },
    removeFilter: function(el, id, isReseting) {
        var filtersPane = uiSearch._getFiltersPane(el);

        var curFilters = data(filtersPane, 'cur_filters') || {};

        if (curFilters[id]) {
            delete curFilters[id];
            data(filtersPane, 'cur_filters', curFilters);

            var options = uiSearch.getOptions(el);
            options.onFilterRemoved && options.onFilterRemoved(id, el, isReseting);

            uiSearch._renderFilters(el);
        }
    },
    _getFiltersPane: function(el) {
        var parent = uiSearch.getWrapEl(el) || el;
        return geByClass1('ui_search_filters_pane', parent);
    },

    _renderFilters: function(el) {
        clearTimeout(data(el, 'renderFiltersTO'));
        data(el, 'renderFiltersTO', setTimeout(uiSearch._doRenderFilters.pbind(el)));
    },
    _doRenderFilters: function(el) {
        var filtersPane = uiSearch._getFiltersPane(el);
        var filters = data(filtersPane, 'cur_filters') || {};

        var filtersPlaceEl = geByClass1('ui_search_filters', filtersPane);

        if (!filtersPlaceEl) {
            return;
        }

        if (isEmpty(filters)) {
            removeClass(filtersPane, 'expanded');

            setTimeout(function() {
                filtersPlaceEl.innerHTML = '';
                hide(filtersPane);
            }, 200);
        } else {
            show(filtersPane);
            addClassDelayed(filtersPane, 'expanded');

            var tokens = [],
                grouping = {},
                i = 0;
            each(filters, function(id, name) {
                var after = false,
                    before = false;
                var tok = id.match(/(.*?)_([^_]+)$/);
                var tokType = tok && tok[2] || false;

                tok = tok && tok[1] || false;
                if (tok) {
                    if (grouping[tok] !== undefined && tokType === 'from') {
                        before = grouping[tok];
                    } else if (grouping[tok] !== undefined) {
                        after = grouping[tok] + 1;
                    }
                    grouping[tok] = i;
                }

                var tokHtml = '<div class="token" id="token' + id + '" data-id="' + id + '"> \
                         <div class="token_title">' + replaceEntities(clean(name)) + '</div> \
                         <div class="token_del"></div> \
                       </div>';

                if (before !== false) {
                    tokens.splice(before, 0, tokHtml);
                } else if (after !== false) {
                    tokens.splice(after, 0, tokHtml);
                } else {
                    tokens.push(tokHtml);
                }

                i++;
            });

            filtersPlaceEl.innerHTML = tokens.join('');
        }
    }
}

var uiScrollBox = {
    init: function(box, opts) {
        if (cur.lSTL) re(cur.lSTL);

        opts = opts || {};
        var wrapEl = opts.parent = opts.parent || boxLayerWrap;

        extend(cur, {
            lSTLWrap: wrapEl,
            lSTL: wrapEl.appendChild(ce('div', {
                id: 'layer_stl',
                innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang('global_to_top') + '</nobr>',
                el: box.bodyNode,
                onclick: cancelEvent,
                onmousedown: uiScrollBox.lSTLDown,
                sc: uiScrollBox.onScroll
            })),
            lSTLText: ge('layer_stl_text', wrapEl),
            lSTLShown: 0,
            lSTLWas: 0,
            lSTLWasSet: 0,
            lSTLOpts: opts
        });

        if (box) {
            box.setOptions({
                onShow: uiScrollBox.show,
                onHide: uiScrollBox.hide
            });
        }

        if (!box || !box.scrollInited) {
            addEvent(wrapEl, 'scroll', uiScrollBox.onScroll);
            box.scrollInited = true;
        }

        onBodyResize();
        uiScrollBox.onScroll();
    },
    hide: function() {
        var opts = cur.lSTLOpts;

        if (opts && opts.parent) {
            removeEvent(opts.parent, 'scroll', uiScrollBox.onScroll);
            hide(cur.lSTL);
            cur.lSTLShown = 0;
            if (opts.onHide) {
                opts.onHide();
            }
        }
    },
    show: function() {
        var opts = cur.lSTLOpts;

        if (opts && opts.parent) {
            addEvent(opts.parent, 'scroll', uiScrollBox.onScroll);
            setTimeout(uiScrollBox.onScroll, 0);
            if (opts.onShow) {
                opts.onShow();
            }
        }
    },
    lSTLDown: function(e) {
        e = e || window.event;
        if (checkEvent(e)) return;

        var wrap = cur.lSTLWrap;

        if (!__afterFocus) {
            var to = 0,
                st = wrap.scrollTop;
            if (cur.lSTLWasSet && cur.lSTLWas) {
                to = cur.lSTLWas;
                cur.lSTLWas = 0;
            } else {
                cur.lSTLWas = st;
            }
            wrap.scrollTop = to;
        }
        return cancelEvent(e);
    },
    onScroll: function() {
        if (!cur.lSTL) return;

        var wrap = cur.lSTLWrap;

        var st = wrap.scrollTop,
            mx = 200,
            vis = cur.lSTLWas || (st > mx),
            o = 0;
        cur.lSTL.style.marginTop = Math.min(st, boxLayer.scrollHeight - cur.lSTL.scrollHeight - 1) + 'px';
        if (vk.staticheader) {
            var headH = getSize('page_header_wrap')[1];
            cur.lSTLText.style.marginTop = Math.max(-Math.min(scrollGetY(), bodyNode.clientHeight - (window.lastWindowHeight || 0)), -headH) + 'px';
        }

        if (!vis) {
            if (cur.lSTLShown !== 0) {
                hide(cur.lSTL);
                cur.lSTLShown = 0;
            }
        } else {
            if (cur.lSTLShown !== 1) {
                show(cur.lSTL);
                cur.lSTLShown = 1;
            }
            if (cur.lSTLWas && st > 500) {
                cur.lSTLWas = 0;
            }
            if (st > mx) {
                o = (st - mx) / mx;
                if (cur.lSTLWasSet) {
                    cur.lSTLWasSet = 0;
                    val(domLC(cur.lSTL), getLang('global_to_top'));
                    removeClass(domLC(cur.lSTL), 'down');
                }
            } else {
                o = (mx - st) / mx;
                if (cur.lSTLWas) {
                    if (!cur.lSTLWasSet) {
                        cur.lSTLWasSet = 1;
                        val(domLC(cur.lSTL), '');
                        addClass(domLC(cur.lSTL), 'down');
                    }
                }
            }
        }
        setStyle(cur.lSTL, {
            opacity: Math.min(Math.max(o, 0), 1)
        });
    }
}

var uiPhotoZoom = {
    over: function(obj, uid, opts) {
        if (browser.mobile || vk.widget) return;

        if (!hasClass(obj, 'ui_zoom_wrap')) {
            addClass(obj, 'ui_zoom_wrap');
        }
        cur.bigphCache = cur.bigphCache || {};
        opts = opts || {};
        var o = domFC(obj),
            ch = cur.bigphCache[uid];
        if (o.tagName != 'A' || !hasClass(o, 'ui_zoom_outer')) {
            o = obj.insertBefore(se('<a class="ui_zoom_outer" href="' + (ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + uid)) + '" aria-label="' + clean(getLang('global_photo_full_size')) + '"><div class="ui_zoom_inner"><div class="ui_zoom"><div class="ui_zoom_icon"></div></div></div></a>'), domFC(obj))
            o._uid = uid;
            o.offsetHeight;
            addClass(o, 'ui_zoom_added');
        }
        o.onclick = uiPhotoZoom.click.pbind(obj, uid, opts);

        if (opts.fastLoad) {
            uiPhotoZoom.load(obj, uid, opts);
        }
    },
    click: function(obj, uid, opts, ev) {
        if (ev && checkEvent(ev) !== false) return;

        if (!opts.fastLoad) {
            uiPhotoZoom.load(obj, uid, opts);
        }

        var ch = cur.bigphCache[uid];
        if (!ch) return;
        if (ch == 'load' || ch == 'show') {
            cur.bigphCache[uid] = 'show';
            return cancelEvent(ev);
        }

        opts.onBeforeShow && opts.onBeforeShow();
        extend(ch, extend({
            jumpTo: {
                z: 'albums' + uid
            }
        }, opts.showOpts || {}));

        return showPhoto(ch._id, 'album' + uid + '_0/rev', ch, ev);
    },
    load: function(obj, uid, opts) {
        var o = domFC(obj),
            ch = cur.bigphCache[uid];
        if (ch === undefined) {
            cur.bigphCache[uid] = 'load';
            ajax.post('al_photos.php', {
                act: 'fast_get_photo',
                oid: uid
            }, {
                onDone: function(res) {
                    if (!res) {
                        obj.onmouseover = function() {};
                        re(o);
                        return;
                    }
                    var sh = (cur.bigphCache[uid] == 'show');
                    cur.bigphCache[uid] = res;
                    o.href = '/photo' + res._id + '?all=1';
                    if (sh) uiPhotoZoom.click(obj, uid, opts);
                },
                onFail: function() {
                    obj.onmouseover = function() {};
                    re(domFC(obj));
                    return true;
                }
            });
        }
    }
}

var uiScroll = (function() {
    var self = function(container, options) {
        if (!(container = self.ge(container))) throw new Error("uiScroll container is undefined");
        if (container.__uiScroll__) container.__uiScroll__.destroy();

        // set options

        this.options = extend({
            global: false,
            native: false,
            theme: "default",
            reversed: false,
            autoresize: true,
            preserveEdgeBelow: false,
            barMinHeight: 30,
            preserveEdgeBelowThreshold: 20,
            stopScrollPropagation: true,
            stopScrollPropagationAlways: false,
            minContentHeight: 0,
            onmoreThreshold: null,
            hidden: false,
            shadows: false,
            scrollElements: [],
            onresize: null,
            onscroll: null,
            onscrollstart: null,
            onscrollstop: null,
            ondrag: null,
            ondragstart: null,
            ondragstop: null,
            onupdate: null,
            onmore: null,
            noForceReFlow: false,
            noLazyLoadWatch: false
        }, options);

        if (this.options.native) this.options.shadows = false;
        if (browser.mobile) this.options.stopScrollPropagation = false;
        if (!isArray(this.options.scrollElements)) this.options.scrollElements = [];

        this.removeEvents = [];
        this.removeElements = [];
        this.dragging = false;
        this.dragged = false;
        this.released = true;
        this.noMore = false;
        this.dragY = null;
        this.dragScroll = null;
        this.shadowTop = false;
        this.shadowBottom = false;
        this.unnecessary = false;
        this.disabled = false;
        this.stopped = true;
        this.stoppedTimeout = null;
        this.fixSizeDefault = null;
        this.animation = null;
        this.barOuterHeight = null;
        this.barInnerHeight = null;
        this.currentFrame = null;
        this.blockerScrollTop = 500;

        // set user events

        this.emitter = new EventEmitter();
        isFunction(this.options.onresize) && this.emitter.addListener('resize', this.options.onresize);
        isFunction(this.options.onscroll) && this.emitter.addListener('scroll', this.options.onscroll);
        isFunction(this.options.onscrollstart) && this.emitter.addListener('scrollstart', this.options.onscrollstart);
        isFunction(this.options.onscrollstop) && this.emitter.addListener('scrollstop', this.options.onscrollstop);
        isFunction(this.options.ondrag) && this.emitter.addListener('drag', this.options.ondrag);
        isFunction(this.options.ondragstart) && this.emitter.addListener('dragstart', this.options.ondragstart);
        isFunction(this.options.ondragstop) && this.emitter.addListener('dragstop', this.options.ondragstop);
        isFunction(this.options.onupdate) && this.emitter.addListener('update', this.options.onupdate);
        isFunction(this.options.onmore) && this.emitter.addListener('more', this.options.onmore);

        // create html

        this.el = {
            container: container,
            overflow: ce('div', {
                className: 'ui_scroll_overflow'
            }),
            outer: ce('div', {
                className: 'ui_scroll_outer'
            }, {
                margin: this.options.stopScrollPropagation ? this.blockerScrollTop + 'px 0' : void 0
            }),
            inner: ce('div', {
                className: 'ui_scroll_inner tt_noappend'
            }),
            shadowTop: ce('div', {
                className: 'ui_scroll_shadow_top'
            }),
            shadowBottom: ce('div', {
                className: 'ui_scroll_shadow_bottom'
            }),
            content: ce('div', {
                className: 'ui_scroll_content clear_fix'
            }),
            barContainer: ce('div', {
                className: 'ui_scroll_bar_container'
            }),
            barOuter: ce('div', {
                className: 'ui_scroll_bar_outer'
            }),
            barInner: ce('div', {
                className: 'ui_scroll_bar_inner'
            })
        };
        data(this.el.container, 'ui-scroll', this);
        var frag = cf(),
            containerClasses = ['ui_scroll_container'];
        each(isArray(this.options.theme) ? this.options.theme : trim(this.options.theme + '').split(/\s+/), function(k, v) {
            v && containerClasses.push('ui_scroll_' + v + '_theme');
        });
        addClass(this.el.container, containerClasses.join(' '));
        this.options.hidden && addClass(this.el.container, 'ui_scroll_hidden');
        while (this.el.container.firstChild) this.el.content.appendChild(this.el.container.firstChild);
        this.el.outer.appendChild(this.el.inner);
        this.el.inner.appendChild(this.el.content);
        if (this.options.stopScrollPropagation) {
            this.el.blocker = ce('div', {
                className: 'ui_scroll_blocker'
            });
            this.addEvent(this.el.blocker, 'scroll', this.fixBlocker.bind(this), true);
            this.el.blocker.appendChild(this.el.outer);
            this.el.overflow.appendChild(this.el.blocker);
        } else {
            this.el.overflow.appendChild(this.el.outer);
        }
        frag.appendChild(this.el.overflow);
        if (this.options.native) {
            addClass(this.el.container, 'ui_scroll_native');
        } else {
            this.el.barOuter.appendChild(this.el.barInner);
            this.el.barContainer.appendChild(this.el.barOuter);
            frag.appendChild(this.el.barContainer);
            if (this.options.shadows) {
                this.el.overflow.appendChild(this.el.shadowTop);
                this.el.overflow.appendChild(this.el.shadowBottom);
            }
            browser.mobile || this.options.scrollElements.push(this.el.barContainer);
        }
        if (this.options.autoresize) {
            var contentSensor = self.addResizeSensor(this.el.inner, this.resize.bind(this, true)),
                containerSensor = self.addResizeSensor(this.el.overflow, this.resize.bind(this, false));
            this.removeElements.push(contentSensor[0]);
            this.removeElements.push(containerSensor[0]);
            this.startResizeListening = function() {
                contentSensor[1]();
                containerSensor[1]();
            };
        }
        this.removeElements.push(this.el.overflow, this.el.barContainer);
        this.el.container.appendChild(frag);

        if (this.options.reversed) this.el.outer.scrollTop = this.el.outer.scrollHeight;

        // set api

        this.el.container.__uiScroll__ = this.api = {
            container: this.el.container,
            scroller: this.el.outer,
            content: this.el.content,

            emitter: this.emitter,

            ondragstart: this.dragstart.bind(this),
            ondragstop: this.dragstop.bind(this),
            ondrag: this.drag.bind(this),

            destroy: this.destroy.bind(this),
            disable: this.disable.bind(this, true),
            enable: this.disable.bind(this, false),
            scrollTop: this.scrollTop.bind(this, true),
            scrollBottom: this.scrollBottom.bind(this, true),
            scrollBy: this.scrollBy.bind(this),
            scrollIntoView: this.scrollIntoView.bind(this, true),

            update: this.init.bind(this),
            updateAbove: this.updateAbove.bind(this),
            updateBelow: this.updateBelow.bind(this),

            data: {
                scrollTop: null,
                scrollBottom: null,
                scrollHeight: null,
                viewportHeight: null
            }
        };

        this.init();

        if (!this.options.noLazyLoadWatch) {
            window.LazyLoad && LazyLoad.watch(this.el.outer);
            window.LazyLoad && LazyLoad.scanDelayed();
        }

        // init handlers

        var wheelEvents = 'onwheel' in this.el.outer ? 'wheel' : (document.onmousewheel !== void 0 ? 'mousewheel' : (browser.mozilla ? 'MozMousePixelScroll' : 'DOMMouseScroll'));

        this.addEvent(this.el.container, wheelEvents, function(ev) {
            this.animation && this.animation.stop();
            if (!this.disabled && this.options.stopScrollPropagation) {
                if (this.unnecessary) {
                    this.options.stopScrollPropagationAlways && cancelEvent(ev);
                } else {
                    this.isScrollEventUnused(ev) ? cancelEvent(ev) : stopEvent(ev);
                }
            }
        }.bind(this), !this.options.stopScrollPropagation);

        this.options.native || this.addEvent(this.el.barContainer, 'mousedown', this.dragstart.bind(this));

        each(this.options.scrollElements, function(k, v) {
            this.addEvent(v, wheelEvents, function(ev) {
                if (this.disabled || this.unnecessary) return;
                this.scrollBy(this.scrollEventDelta(ev));
                if (this.options.stopScrollPropagation || !this.isScrollEventUnused(ev)) cancelEvent(ev);
            }.bind(this));
        }.bind(this));

        if (this.options.reversed) {
            this.addEvent(this.el.container, 'mousedown touchstart pointerdown', function(ev) {
                this.released = false;
                this.noMore = true;
                var handler = this.addEvent(document, 'mouseup contextmenu touchend pointerup', function(ev) {
                    removeEvent(document, 'mouseup contextmenu touchend pointerup', handler);
                    this.released = true;
                    if (this.noMore && this.stopped && !this.dragging) {
                        this.noMore = false;
                        this.more();
                    }
                }.bind(this));
            }.bind(this));
        }

        this.addEvent(this.el.outer, 'scroll', function() {
            if (this.update()) {
                if (this.stopped) {
                    this.stopped = false;
                    this.emitEvent('scrollstart');
                } else if (!this.options.native && this.stopped === false) { // prevent adding class after single scroll event
                    this.stopped = 0;
                    addClass(this.el.container, 'ui_scroll_scrolled');
                }
                this.emitEvent('scroll');
                this.stoppedTimeout && clearTimeout(this.stoppedTimeout);
                this.stoppedTimeout = setTimeout(function() {
                    if (!this.stopped) {
                        this.stopped = true;
                        this.options.native || removeClass(this.el.container, 'ui_scroll_scrolled');
                        this.emitEvent('scrollstop');
                        if (this.noMore && this.released && !this.dragging) {
                            this.noMore = false;
                            this.more();
                        }
                    }
                }.bind(this), 200);
            }
        }.bind(this));

        return this.api;
    };

    self.prototype = {

        init: function() {
            this.options.stopScrollPropagation && this.fixBlocker();
            if (!this.inited) {
                if (!this.el.container.scrollWidth || this.disabled) return;
                this.fixSize(true);
                this.options.autoresize && this.startResizeListening();
                this.options.global || cur.destroy.push(this.destroy.bind(this));
                this.inited = true;
            }
            this.update(true);
            return this.api;
        },

        addEvent: function(target, event, handler, passive) {
            this.removeEvents.push([target, event, handler]);
            addEvent(target, event, handler, void 0, void 0, passive ? {
                passive: true
            } : void 0);
            return handler;
        },

        destroy: function() {
            this.disabled = true;
            this.fixSize();

            this.animation && this.animation.stop();
            this.moreTimeout && clearTimeout(this.moreTimeout);
            this.dragstopHandler && removeEvent(document, 'mouseup contextmenu', this.dragstopHandler);
            this.dragHandler && removeEvent(document, 'mousemove', this.dragHandler);
            each(this.removeEvents, function(k, v) {
                removeEvent.apply(null, v);
            });

            if (this.el.overflow.parentNode == this.el.container) {
                var frag = cf();
                while (this.el.content.firstChild) frag.appendChild(this.el.content.firstChild);
                this.el.container.appendChild(frag);
            }

            removeData(this.el.container, 'ui-scroll');
            this.el.container.className = this.el.container.className.replace(/\bui_scroll_.+?\b/g, ' ');
            each(this.removeElements, function(k, v) {
                re(v);
            });
            this.el.container.scrollTop = this.api.data.scrollTop;
            delete this.el.container.__uiScroll__;
            return this.api;
        },

        updateAbove: function(callback) {
            if (isFunction(callback)) {
                this.animation && this.animation.stop();
                var scrollBottom = this.el.outer.scrollHeight - this.el.outer.scrollTop - this.el.overflow.offsetHeight;
                callback();
                this.el.outer.scrollTop = this.el.outer.scrollHeight - this.el.overflow.offsetHeight - scrollBottom;
            }
            return this.api;
        },

        updateBelow: function(callback) {
            if (isFunction(callback)) {
                this.animation && this.animation.stop();
                var needScroll = this.options.preserveEdgeBelow && this.api.data.scrollBottom <= this.options.preserveEdgeBelowThreshold;
                callback();
                needScroll && this.scrollBottom(false);
            }
            return this.api;
        },

        fixBlocker: function() {
            if (browser.chrome && !this.options.noForceReFlow) {
                this.forceReFlow();
            }
            this.el.blocker.scrollTop = this.blockerScrollTop;
        },
        forceReFlow: function() {
            this.el.blocker.style.display = 'inline-block';
            this.el.blocker.offsetHeight;
            this.el.blocker.style.display = '';
        },

        fixSize: function(param) {
            if (this.options.native) return;
            if (param && this.fixSizeDefault == null) this.fixSizeDefault = this.el.container.style.width;
            setStyle(this.el.container, 'width', param ? (getSize(this.el.container, true)[0] || this.fixSizeDefault || '') : this.fixSizeDefault || '');
        },

        emitEvent: function(type) {
            this.disabled || this.inited && this.emitter.emitEvent(type, [this.api]);
        },

        scrollEventDelta: function(ev) {
            var delta = 0,
                deltaMode = ev.deltaMode !== void(0) ? ev.deltaMode : (ev.type == 'MozMousePixelScroll' ? 0 : 1),
                pixelsPerLine = 15,
                pixelsPerPage = pixelsPerLine * 30;
            if (ev.type == 'wheel') { // gecko >= 17, ie9 - 11, webkit
                delta = ev.deltaY;
            } else if (ev.wheelDeltaX !== void(0) && ev.wheelDeltaY !== void(0)) { // presto, old webkit
                delta = 1 / 40 * -ev.wheelDeltaY;
                if (browser.mac && browser.opera) delta *= 0.1;
            } else if (ev.wheelDelta !== void(0)) { // old ie
                delta = 1 / 40 * -ev.wheelDelta;
            } else if (ev.detail && ev.axis === 2) { // gecko < 17
                delta = ev.detail;
            }
            return delta * (deltaMode == 1 ? pixelsPerLine : (deltaMode == 2 ? pixelsPerPage : 1));
        },

        isScrollEventUnused: function(ev, delta) {
            var delta = this.scrollEventDelta(ev);
            return delta > 0 ? !this.api.data.scrollBottom : !this.api.data.scrollTop;
        },

        resize: function(content) {
            if (!content && this.options.preserveEdgeBelow) {
                var needScroll = this.options.preserveEdgeBelow && this.api.data.scrollBottom <= this.options.preserveEdgeBelowThreshold;
                if (this.update(true)) {
                    this.emitEvent('resize');
                    needScroll && this.scrollBottom();
                    this.options.stopScrollPropagation && !content && this.fixBlocker();
                }
            } else if (this.update(true)) {
                this.options.stopScrollPropagation && !content && this.fixBlocker();
                this.emitEvent('resize');
            }
        },

        disable: function(disabled) {
            this.disabled = !!disabled;
            if (disabled) {
                this.animation && this.animation.stop();
                this.fixSize();
            } else {
                this.fixSize(true);
                this.options.stopScrollPropagation && this.fixBlocker();
                this.update(true);
            }
            toggleClass(this.el.container, 'ui_scroll_disabled', this.disabled);
            return this.api;
        },

        dragstart: function(ev) {
            if (this.disabled || this.dragging || this.options.native) return;
            if (!ev) ev = window.event;
            this.dragging = true;
            this.animation && this.animation.stop();
            if (this.options.reversed) this.noMore = true;

            addEvent(document, 'mouseup contextmenu', this.dragstartHandler = this.dragstop.bind(this));
            addEvent(document, 'mousemove', this.dragHandler = this.drag.bind(this));

            this.dragScroll = this.options.reversed ? this.api.data.scrollBottom : this.api.data.scrollTop;
            this.dragY = ev.screenY;

            cancelEvent(ev);
            this.emitEvent('dragstart');
            return this.api;
        },

        dragstop: function(ev) {
            if (this.disabled || !this.dragging || this.options.native) return;
            if (!ev) ev = window.event;
            this.dragging = false;

            this.dragstopHandler && removeEvent(document, 'mouseup contextmenu', this.dragstopHandler);
            this.dragHandler && removeEvent(document, 'mousemove', this.dragHandler);

            setStyle(bodyNode, 'cursor', '');
            removeClass(this.el.container, 'ui_scroll_dragging');

            if (this.dragged) {
                if (this.noMore) {
                    this.noMore = false;
                    this.more();
                }
            } else {
                if (this.options.reversed) this.noMore = true;
                this.scrollTop(false, ((ev.pageY - getXY(this.el.barOuter)[1]) - (this.barInnerHeight / 2)) * (Math.max(this.options.minContentHeight, this.api.data.scrollHeight) - this.api.data.viewportHeight) / (this.barOuterHeight - this.barInnerHeight), 0, function() {
                    if (this.noMore) {
                        this.noMore = false;
                        this.more();
                    }
                }.bind(this));
            }

            this.dragged = false;
            ev && ev.type !== 'contextmenu' && cancelEvent(ev);
            this.emitEvent('dragstop');
            return this.api;
        },

        drag: function(ev) {
            if (this.disabled || !this.dragging || this.options.native) return;
            if (!ev) ev = window.event;

            var offset = (ev.screenY - this.dragY) * (this.api.data.scrollHeight / this.el.barOuter.scrollHeight);
            this.el.outer.scrollTop = this.options.reversed ? (this.el.outer.scrollHeight - this.el.overflow.offsetHeight - this.dragScroll + offset) : (this.dragScroll + offset);

            if (!this.dragged) {
                this.dragged = true;
                setStyle(bodyNode, 'cursor', 'pointer');
                addClass(this.el.container, 'ui_scroll_dragging');
            }

            cancelEvent(ev);
            this.emitEvent('drag');
            return this.api;
        },

        scroll: function(px, duration, callback) {
            this.animation && this.animation.stop();
            if (this.el.outer.scrollTop == px) this.update(true);
            if (duration) {
                duration = typeof duration === 'number' && isFinite(duration) && !(duration % 1) ? Math.abs(duration) : 300;
                this.animation = new Fx.Base({
                    scrollTop: this.el.outer.scrollTop
                }, {
                    transition: Fx.Transitions.easeOutCubic,
                    onStep: function(now) {
                        this.el.outer.scrollTop = now.scrollTop;
                    }.bind(this),
                    duration: duration,
                    onComplete: isFunction(callback) ? callback.pbind(this.api) : void 0
                }).start({
                    scrollTop: this.el.outer.scrollTop
                }, {
                    scrollTop: px
                });
            } else {
                this.el.outer.scrollTop = px;
                isFunction(callback) && callback(this.api);
            }
            return this.api;
        },

        scrollTop: function(needFixBlocker, px, duration, callback) {
            needFixBlocker && this.options.stopScrollPropagation && this.fixBlocker();
            if (this.disabled || this.dragging) return;
            return this.scroll(intval(px), duration, callback);
        },

        scrollBottom: function(needFixBlocker, px, duration, callback) {
            needFixBlocker && this.options.stopScrollPropagation && this.fixBlocker();
            if (this.disabled || this.dragging) return;
            return this.scroll(this.el.outer.scrollHeight - this.el.overflow.offsetHeight - intval(px), duration, callback);
        },

        scrollBy: function(px, duration, callback) {
            if (this.disabled || this.dragging) return;
            return this.scroll(this.el.outer.scrollTop + intval(px), duration, callback);
        },

        scrollIntoView: function(needFixBlocker, el, duration, callback) {
            needFixBlocker && this.options.stopScrollPropagation && this.fixBlocker();
            if ((el = self.ge(el)) && el.compareDocumentPosition && (el.compareDocumentPosition(this.el.content) & Node.DOCUMENT_POSITION_CONTAINS)) {
                var elY = getXY(el)[1],
                    overflowY = getXY(this.el.overflow)[1],
                    elHeight = getSize(el)[1];
                if (elY <= overflowY && elY + elHeight >= overflowY + this.api.data.viewportHeight || elY >= overflowY && elY + elHeight <= overflowY + this.api.data.viewportHeight) {
                    if (isFunction(callback)) duration ? setTimeout(callback.bind(this.api), 0) : callback(this.api);
                } else if (elHeight > this.api.data.viewportHeight || elY < overflowY) {
                    this.scrollTop(false, elY - overflowY + this.api.data.scrollTop - (this.options.shadows ? getSize(this.el.shadowTop)[1] : 0), duration, callback);
                } else {
                    this.scrollTop(false, elY - overflowY + this.api.data.scrollTop + elHeight - this.api.data.viewportHeight + (this.options.shadows ? getSize(this.el.shadowBottom)[1] : 0), duration, callback);
                }
            }
            return this.api;
        },

        nextFrame: (function() {
            var nextFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    return setTimeout(callback, 1);
                },
                cancelFrame = window.cancelAnimationFrame ||
                window.cancelRequestAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;
            return function(callback) {
                this.currentFrame && cancelFrame(this.currentFrame);
                this.currentFrame = nextFrame(callback);
            }
        })(),

        update: function(notScrollEvent) {
            var contentHeight, unnecessary, scrollTop = this.el.outer.scrollTop;
            if (
                this.inited && !this.disabled && (
                    notScrollEvent && (
                        (contentHeight = this.el.inner.offsetHeight),
                        (this.api.data.viewportHeight !== (this.api.data.viewportHeight = this.el.overflow.offsetHeight) || this.api.data.scrollHeight !== contentHeight)
                    ) || this.api.data.scrollTop !== scrollTop
                )
            ) {
                if (notScrollEvent) this.api.data.scrollHeight = contentHeight;
                this.api.data.scrollTop = Math.max(0, Math.min(this.api.data.scrollHeight - this.api.data.viewportHeight, Math.max(0, scrollTop)));
                this.api.data.scrollBottom = Math.max(0, this.api.data.scrollHeight - this.api.data.scrollTop - this.api.data.viewportHeight);

                if (!this.options.native) {
                    contentHeight = Math.max(this.options.minContentHeight, this.api.data.scrollHeight);
                    unnecessary = contentHeight <= this.api.data.viewportHeight;

                    if (!unnecessary) {
                        if (notScrollEvent) {
                            this.barOuterHeight = this.el.barOuter.offsetHeight;
                            this.barInnerHeight = Math.max(this.options.barMinHeight, (this.barOuterHeight * this.api.data.viewportHeight) / contentHeight);
                            this.el.barInner.style.height = this.barInnerHeight + 'px';
                        }
                        this.nextFrame(function(translate) {
                            this.style[browser.msie9 ? 'msTransform' : 'transform'] = translate;
                        }.bind(
                            this.el.barInner,
                            'translateY(' + (this.barOuterHeight - this.barInnerHeight) * this.api.data.scrollTop / (contentHeight - this.api.data.viewportHeight) + 'px)'));
                    }

                    if (this.options.shadows) {
                        if (this.shadowTop != (this.api.data.scrollTop && !unnecessary)) {
                            toggleClass(this.el.container, 'ui_scroll_shadow_top_visible', this.shadowTop = this.api.data.scrollTop && !unnecessary);
                        }
                        if (this.shadowBottom != (this.api.data.scrollBottom && !unnecessary)) {
                            toggleClass(this.el.container, 'ui_scroll_shadow_bottom_visible', this.shadowBottom = this.api.data.scrollBottom && !unnecessary);
                        }
                    }

                    if (this.unnecessary !== unnecessary) {
                        toggleClass(this.el.container, 'ui_scroll_unnecessary', unnecessary);
                        this.unnecessary = unnecessary;
                        this.options.stopScrollPropagation && this.fixBlocker();

                        // for pretty bar height and position while hiding, can't use percent all the time because of calculation inaccuracy
                        if (unnecessary && this.barInnerHeight && this.barOuterHeight) {
                            this.nextFrame(function(translate) {
                                this.el.barInner.style.height = this.barInnerHeight * 100 / this.barOuterHeight + '%';
                                this.el.barInner.style[browser.msie9 ? 'msTransform' : 'transform'] = 'translateY(' + ((this.barOuterHeight - this.barInnerHeight) * this.api.data.scrollTop / (contentHeight - this.api.data.viewportHeight)) * 100 / this.barInnerHeight + '%)';
                            }.bind(this));
                        }
                    }
                };

                this.emitEvent('update');
                if (!this.options.noLazyLoadWatch) {
                    window.LazyLoad && LazyLoad.scanDelayed(this.el.outer);
                }
                if (!this.options.reversed || scrollTop >= 0) this.more();
                return true;
            }
            return false;
        },

        more: function() {
            if (!this.noMore && (this.options.reversed ? this.api.data.scrollTop : this.api.data.scrollBottom) <= (this.options.onmoreThreshold !== null ? this.options.onmoreThreshold : this.api.data.viewportHeight * 2)) {
                this.emitEvent('more');
            }
        }

    };

    self.ge = function(el) {
        return el = isString(el) && el[0] === '_' ? geByClass1(el) : ge(el);
    };

    self.addResizeSensor = function(el, callback) {
        if (!(el = self.ge(el)) || !isFunction(callback)) return;
        if (browser.msie9 || browser.opera && browser.version < 13) {
            var started = false,
                loaded = false,
                addListener = function() {
                    if (!sensor.contentDocument) return setTimeout(addListener, 100);
                    sensor.contentDocument.defaultView.removeEventListener('resize', callback);
                    sensor.contentDocument.defaultView.addEventListener('resize', callback);
                    callback();
                },
                sensor = ce('object', {
                    type: 'text/html',
                    className: 'ui_scroll_resize_object',
                    data: browser.msie9 ? "javascript: '<script>window.onload = function(){document.write(\\'<script>document.domain=\\\"" + document.domain + "\\\"<\\\\/script>\\');document.close()}<\/script>'" : "about:blank", // ie access denied bug
                    onload: function() {
                        loaded = true;
                        started && addListener();
                    }
                });

            el.appendChild(sensor);

            return el.__resizeSensor__ = [sensor, function() {
                started = true;
                loaded && addListener();
            }];
        } else {
            var sensor = ce('div', {
                    className: 'ui_scroll_resize_sensor'
                }),
                expand = ce('div', {
                    className: 'ui_scroll_resize_sensor ui_scroll_resize_expand'
                }),
                shrink = ce('div', {
                    className: 'ui_scroll_resize_sensor ui_scroll_resize_shrink'
                }),
                expandChild = ce('div'),
                shrinkChild = ce('div'),
                last = null;
            expand.appendChild(expandChild);
            shrink.appendChild(shrinkChild);
            sensor.appendChild(expand);
            sensor.appendChild(shrink);

            el.appendChild(sensor);

            return el.__resizeSensor__ = [sensor, expand.onscroll = shrink.onscroll = function() { // update here
                var width = (el.offsetWidth || 10000) + 10,
                    height = (el.offsetHeight || 10000) + 10;
                expandChild.style.width = width + 'px';
                expandChild.style.height = height + 'px';
                expand.scrollLeft = width;
                expand.scrollTop = height;
                shrink.scrollLeft = width;
                shrink.scrollTop = height;
                last !== (last = width + ' ' + height) && callback();
            }];
        }
    };

    self.scrollEventDelta = self.prototype.scrollEventDelta;

    return self;
})();

var UiScroll = uiScroll;

window.Scrollbar = window.Scrollbar || (function() {

    function _mousemove(ev) {
        if (!this.inited) return false;
        if (!ev) ev = window.event;
        if (this.isHorizontal) {
            var newScroll = Math.floor((this.contWidth() - this.scrollWidth) * Math.min(1, (ev.screenX - this.moveX) / (this.scrollbarSize - this.innerWidth - 6)));
            isFunction(this.options.onScroll) && this.options.onScroll(this.obj.scrollLeft - newScroll, this);
            this.obj.scrollLeft = newScroll;
        } else {
            var newScroll = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, (ev.screenY - this.moveY) / (this.scrollbarSize - this.innerHeight - 6)));
            isFunction(this.options.onScroll) && this.options.onScroll(this.obj.scrollTop - newScroll, this);
            this.obj.scrollTop = newScroll;
        }
        this.update(true);
        return false;
    }

    function _mouseup() {
        if (!this.inited) return false;
        this.moveY = this.moveX = this.isDown = false;
        this.isOut && this.contOut();
        removeEvent(document, 'mousemove', this.mouseMove);
        removeEvent(document, 'mouseup', this.mouseUp);
        setStyle(document.body, 'cursor', 'default');
        setStyle(this.obj, {
            pointerEvents: ''
        });
        removeClass(this.inner, 'scrollbar_hovered');
        isFunction(this.options.stopDrag) && this.options.stopDrag();
        isFunction(this.options.onHold) && this.options.onHold(false);
        return false;
    }

    function _mousedown(ev) {
        if (!this.inited) return false;
        if (this.moveY || checkEvent(ev)) return;
        if (!ev) ev = window.event;
        addEvent(document, 'mousemove', this.mouseMove);
        addEvent(document, 'mouseup', this.mouseUp);
        setStyle(document.body, 'cursor', 'pointer');
        setStyle(this.obj, {
            pointerEvents: 'none'
        });
        if (this.isHorizontal) {
            this.moveX = ev.screenX - (this.inner.offsetLeft || 0);
        } else {
            this.moveY = ev.screenY - (this.inner.offsetTop || 0);
        }
        addClass(this.inner, 'scrollbar_hovered');
        isFunction(this.options.startDrag) && this.options.startDrag();
        isFunction(this.options.onHold) && this.options.onHold(true);
        this.isDown = true;
        return cancelEvent(ev);
    }

    function _keydown(ev) {
        if (!ev) ev = window.event;
        switch (ev.keyCode) {
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
                return true;
        }
        this.update(true);
        return cancelEvent(ev);
    }

    function Scrollbar(obj, options) {
        var wheel = this.wheel.bind(this);

        this.obj = obj = ge(obj);
        this.options = extend({
            nomargin: false,
            horizontal: false,
            top: 0,
            bottom: 0,
            padding: 3,
            prefix: '',
            hidden: 0
        }, options || {});
        this.isHorizontal = this.options.horizontal;
        this.scrollProp = this.isHorizontal ? 'scrollLeft' : 'scrollTop';
        this.scrollDimensionProp = this.isHorizontal ? 'scrollWidth' : 'scrollHeight';
        this.topShadow = false;
        this.bottomShadow = false;
        this[this.scrollProp + 'Last'] = this.obj[this.scrollProp];
        this.destroyList = [];
        this.mouseDown = _mousedown.bind(this);
        this.mouseMove = _mousemove.bind(this);
        this.mouseUp = _mouseup.bind(this);
        this.initObjMouseWheel = function() {
            addEvent(obj, browserFeatures.wheelEvent, wheel)
        }
        this.destroyObjMouseWheel = function() {
            removeEvent(obj, browserFeatures.wheelEvent, wheel);
        }
        this.initScrollBarMouseWheel = function() {
            addEvent(this.scrollbar, browserFeatures.wheelEvent, wheel);
        }.bind(this)

        this.destroyScrollBarMouseWheel = function() {
            removeEvent(this.scrollbar, browserFeatures.wheelEvent, wheel);
        }.bind(this)

        setTimeout((function() {
            setStyle(obj, {
                overflow: 'hidden'
            });

            this.scrollbar = ce('div', {
                className: (this.options.prefix ? this.options.prefix + 'scrollbar_cont ' : '') + 'scrollbar_cont' + (this.isHorizontal ? ' scrollbar_cont_horiz' : '') + (this.options.hidden ? ' scrollbar_hidden' : '')
            });
            this.inner = ce('div', {
                className: (this.options.prefix ? this.options.prefix + 'scrollbar_inner ' : '') + 'scrollbar_inner'
            });
            this.scrollbar.appendChild(this.inner);

            var size = this.widthUpdated();

            if (this.options.shadows) {
                obj.parentNode.insertBefore(this.topShadowDiv = ce('div', {
                    className: (this.options.prefix ? this.options.prefix + 'scrollbar_top ' : '') + 'scrollbar_top'
                }, {
                    width: size[0]
                }), obj);
                obj.parentNode.insertBefore(this.bottomShadowDiv = ce('div', {
                    className: (this.options.prefix ? this.options.prefix + 'scrollbar_bottom ' : '') + 'scrollbar_bottom'
                }, {
                    width: size[0]
                }), obj.nextSibling);
            }

            obj.parentNode.insertBefore(this.scrollbar, obj);

            var keydown = _keydown.bind(this);

            // handle the case mouse is already over the scroll window
            var mouseMoveHandler = function() {
                this.initObjMouseWheel();
                removeEvent(obj, 'mousemove', mouseMoveHandler);
            }.bind(this);
            addEvent(obj, 'mouseleave', this.destroyObjMouseWheel)

            // Handle wheel events only when pointer is inside scroller
            // to improve overall scroll performance. See VKRED-6658 for details
            addEvent(obj, 'mouseenter', this.initObjMouseWheel);
            addEvent(obj, 'mousemove', mouseMoveHandler);
            addEvent(this.scrollbar, 'mouseenter', this.initScrollBarMouseWheel);
            addEvent(this.scrollbar, 'mouseleave', this.destroyScrollBarMouseWheel);

            this.options.scrollElements && each(this.options.scrollElements, function(i, e) {
                addEvent(e, browserFeatures.wheelEvent, wheel);
            });
            addEvent(this.scrollbar, 'mouseover', this.contOver.bind(this));
            addEvent(this.scrollbar, 'mouseout', this.contOut.bind(this));
            addEvent(this.scrollbar, 'mousedown', this.contDown.bind(this));

            if (browser.safari_mobile) {
                var touchstart = function(ev) {
                    if (this.isHorizontal) {
                        cur.touchX = ev.touches[0].pageX;
                    } else {
                        cur.touchY = ev.touches[0].pageY;
                    }
                }.bind(this);
                var touchmove = function(ev) {
                    if (this.isHorizontal) {
                        cur.touchDiff = cur.touchX - (cur.touchX = ev.touches[0].pageX);
                        obj.scrollLeft += cur.touchDiff;
                        obj.scrollLeft > 0 && this.shown !== false && this.update(true);
                    } else {
                        cur.touchDiff = cur.touchY - (cur.touchY = ev.touches[0].pageY);
                        obj.scrollTop += cur.touchDiff;
                        obj.scrollTop > 0 && this.shown !== false && this.update(true);
                    }
                    return cancelEvent(ev);
                }.bind(this);
                var touchend = function() {
                    cur.animateInt = setInterval(function() {
                        cur.touchDiff = cur.touchDiff * 0.9;
                        if (cur.touchDiff < 1 && cur.touchDiff > -1) {
                            clearInterval(cur.animateInt);
                        } else {
                            obj[self.scrollProp] += cur.touchDiff;
                            this.update(true);
                        }
                    }.bind(this), 0);
                }.bind(this);
                addEvent(obj, 'touchstart', touchstart);
                addEvent(obj, 'touchmove', touchmove);
                addEvent(obj, 'touchend', touchend);
                this.destroyList.push(function() {
                    removeEvent(obj, 'touchstart', touchstart);
                    removeEvent(obj, 'touchmove', touchmove);
                    removeEvent(obj, 'touchend', touchend);
                });
            }

            addEvent(this.inner, 'mousedown', this.mouseDown);
            if (!this.options.nokeys) {
                addEvent(window, 'keydown', keydown);
            } else {
                this.onkeydown = keydown;
            }

            this.destroyList.push(function() {
                removeEvent(obj, browserFeatures.wheelEvent, wheel);
                this.options.scrollElements && each(this.options.scrollElements, function(i, e) {
                    removeEvent(e, browserFeatures.wheelEvent, wheel);
                });
                removeEvent(this.inner, 'mousedown', this.mouseDown);
                removeEvent(window, 'keydown', keydown);
                removeEvent(obj, 'mousemove', mouseMoveHandler);
                re(this.scrollbar);
            }.bind(this));

            if (!this.isHorizontal) {
                if (this.contHeight() <= this.scrollHeight) {
                    hide(this.bottomShadowDiv);
                } else {
                    this.bottomShadow = true;
                }
            }

            this.options.onInit && this.options.onInit();
            this.inited = true;
            this.update(true);

            this.options.global || cur.destroy.push(this.destroy.bind(this));
        }).bind(this), 0);
    }

    Scrollbar.prototype = {

        wheel: function(ev) {
            if (this.disabled) return;
            if (!ev) ev = window.event;

            var delta = 0,
                stWas = this.obj[this.scrollProp];
            deltaMode = ev.deltaMode !== void(0) ? ev.deltaMode : (ev.type == 'MozMousePixelScroll' ? 0 : 1),
                pixelRatio = 1,
                pixelsPerLine = 15,
                pixelsPerPage = pixelsPerLine * 30;
            if (ev.type == 'wheel') {
                // gecko >= 17, webkit
                delta = -(this.isHorizontal ? ev.deltaX : ev.deltaY);
            } else if (ev.wheelDeltaX !== void(0) && ev.wheelDeltaY !== void(0)) {
                // presto, old webkit
                delta = 1 / 40 * (this.isHorizontal ? ev.wheelDeltaX : ev.wheelDeltaY);
                if (browser.mac && browser.opera)
                    delta *= 0.1;
            } else if (ev.wheelDelta !== void(0)) {
                // ie 8 - 11
                delta = 1 / 40 * ev.wheelDelta;
            } else if (ev.detail && ev.axis === (this.isHorizontal ? 1 : 2)) {
                // gecko < 17
                delta = -ev.detail;
            }
            delta = delta * pixelRatio * (deltaMode == 1 ? pixelsPerLine : (deltaMode == 2 ? pixelsPerPage : 1));
            if (!delta) return;

            this.obj[this.scrollProp] -= delta;
            isFunction(this.options.onScroll) && this.options.onScroll(delta, this);

            if (stWas != this.obj[this.scrollProp] && this.shown !== false) {
                this.update(true);
                addClass(this.inner, 'scrollbar_hovered');
                clearTimeout(this.moveTimeout);
                this.moveTimeout = setTimeout((function() {
                    removeClass(this.inner, 'scrollbar_hovered');
                }).bind(this), 300);
            }

            if ((this.shown || this.options.forceCancelEvent) && (!this.isHorizontal || stWas != this.obj[this.scrollProp])) return false;
        },

        setOptions: function(opts) {
            extend(this.options, opts);
        },

        widthUpdated: function() {
            var size = getSize(this.obj),
                s;

            if (this.isHorizontal) {
                s = {
                    marginLeft: this.options.top + 'px',
                    marginTop: (size[1] + 3) + 'px',
                    width: size[0] - this.options.top - this.options.bottom + 'px'
                };
            } else {
                s = {
                    marginTop: this.options.top + 'px',
                    marginLeft: this.options.nomargin ? 0 : (size[0] - (this.options.mlDiff || 7)) + 'px',
                    height: size[1] - this.options.top - this.options.bottom + 'px'
                }
            }

            if (this.options.nomargin) {
                if (this.options.right !== void(0) && this.options.right !== 'auto') {
                    s.right = this.options.right;
                    s.left = 'auto';
                } else if (this.options.left !== void(0)) {
                    s.right = 'auto';
                    s.left = this.options.left;
                }
            }
            this.scrollWidth = size[0];
            this.scrollHeight = size[1];
            this.scrollbarSize = size[this.isHorizontal ? 0 : 1] - this.options.top - this.options.bottom;

            setStyle(this.scrollbar, s);

            setTimeout((function() {
                removeClass(this.scrollbar, 'no_transition');
            }).bind(this));

            return size;
        },

        contOver: function() {
            this.isOut = false;
            this.shown && addClass(this.scrollbar, 'scrollbar_c_overed');
        },

        contOut: function() {
            this.isOut = true;
            if (this.isDown) return;
            removeClass(this.scrollbar, 'scrollbar_c_overed');
        },

        contDown: function(ev) {
            if (!ev) ev = window.event;
            if (this.isHorizontal) {
                var v = ev.offsetX - this.innerWidth / 2 + 5,
                    scrH = this.scrollbarSize - this.innerWidth;
                this.obj.scrollLeft = Math.floor((this.contWidth() - this.scrollWidth) * Math.min(1, v / scrH));
            } else {
                var v = ev.offsetY - this.innerHeight / 2 + 5,
                    scrH = this.scrollbarSize - this.innerHeight;
                this.obj.scrollTop = Math.floor((this.contHeight() - this.scrollHeight) * Math.min(1, v / scrH));
            }
            this.update(true);
            this.mouseDown(ev);
        },

        hide: function(anim) {
            hide(this.topShadowDiv, this.bottomShadowDiv, this.scrollbar);
            this.hidden = true;
        },

        show: function(anim) {
            show(this.topShadowDiv, this.bottomShadowDiv, this.scrollbar);
            this.hidden = false;
        },

        disable: function() {
            this.hide();
            this[this.scrollProp](0);
            this.disabled = true;
        },

        enable: function() {
            this.show();
            this.update();
            this.disabled = false;
        },

        getScrollHeight: function() {
            return this.scrollHeight;
        },

        scrollTop: function(top) {

            if (typeof top === 'undefined') {
                return this.obj.scrollTop;
            }

            this.obj.scrollTop = parseInt(top);
            this.update(false, true);
        },

        scrollBottom: function(bottom) {
            if (typeof bottom === 'undefined') {
                return this.contHeight() - this.scrollHeight - this.obj.scrollTop;
            }
            this.obj.scrollTop = this.contHeight(true) - this.scrollHeight - bottom;
            this.update(true, true);
        },

        smoothScroll: function(delta, fn, duration) {
            var newTop = this.obj.scrollTop + delta;

            if (typeof duration === 'undefined') {
                duration = 300;
            }

            var self = this;

            var tween = new Fx.Base({
                scrollTop: this.obj.scrollTop
            }, {
                transition: Fx.Transitions.easeOutCubic,
                onStep: function(now) {
                    self.obj.scrollTop = now.scrollTop;
                    self.update(true);
                },
                duration: duration,
                onComplete: function() {
                    if (fn) {
                        fn(scroll);
                    }
                }
            });

            tween.start({
                scrollTop: this.obj.scrollTop
            }, {
                scrollTop: newTop
            });

        },

        scrollLeft: function(left) {
            this.obj.scrollLeft = parseInt(left);
            this.update(false, true);
        },

        destroy: function(top) {
            each(this.destroyList || [], function(k, f) {
                f();
            });
        },

        contHeight: function() {
            return Math.round(this.options.contHeight || this.obj.scrollHeight);
        },

        contWidth: function() {
            return Math.round(this.options.contWidth || this.obj.scrollWidth);
        },

        val: function(value) {
            if (value) {
                this.obj[this.scrollProp] = value;
                this.update(true, true);
            }
            return this.obj[this.scrollProp];
        },

        update: function(noChange, updateScroll) {
            if (!this.inited || this.hidden) return;
            if (!noChange && (this.isHorizontal ? this.moveX : this.moveY)) return true;

            var size, innerSize, scrolled;

            if (updateScroll) {
                size = getSize(this.obj);
                if (this.isHorizontal) {
                    this.scrollWidth = size[0];
                    size = Math.round(this.scrollWidth - this.options.top - this.options.bottom);
                    if (this.scrollbarSize !== size) this.scrollbar.style.width = size + 'px';
                } else {
                    this.scrollHeight = size[1];
                    size = Math.round(this.scrollHeight - this.options.top - this.options.bottom);
                    if (this.scrollbarSize !== size) this.scrollbar.style.height = size + 'px';
                }
                this.scrollbarSize = size;
            }

            if (this.isHorizontal ? (size = this.contWidth()) <= Math.round(this.scrollWidth) : (size = this.contHeight()) <= Math.round(this.scrollHeight)) {
                hide(this.inner, this.bottomShadowDiv, this.topShadowDiv);
                this.scrollbar.style.pointerEvents = 'none';
                this.topShadow = this.bottomShadow = this.shown = false;
                isFunction(this.options.more) && (size - this.obj[this.scrollProp] < this[this.scrollDimensionProp] * 2) && this.options.more(this);
                this[this.scrollProp + 'Last'] = this.obj[this.scrollProp];
                return;
            } else if (!this.shown) {
                show(this.inner);
                this.scrollbar.style.pointerEvents = '';
                this.shown = true;
            }

            var scrolled = this.val();
            isFunction(this.options.scrollChange) && this.options.scrollChange(scrolled);
            this.lastProgress = Math.min(1, scrolled / (size - (this.isHorizontal ? this.scrollWidth : this.scrollHeight)));
            this.lastProgress > 0 != this.topShadow && ((this.topShadow = !this.topShadow) ? show : hide)(this.topShadowDiv);
            this.lastProgress < 1 != this.bottomShadow && ((this.bottomShadow = !this.bottomShadow) ? show : hide)(this.bottomShadowDiv);

            if (this.isHorizontal) {
                innerSize = Math.max(40, Math.floor(this.scrollbarSize * this.scrollWidth / size));
                if (innerSize !== this.innerWidth) this.inner.style.width = (this.innerWidth = innerSize) + 'px';
                this.inner.style.marginLeft = (this.scrollbarSize - innerSize - this.options.padding * 2) * this.lastProgress + this.options.padding + 'px';
            } else {
                innerSize = Math.max(40, Math.floor(this.scrollbarSize * this.scrollHeight / size));
                if (innerSize !== this.innerHeight) this.inner.style.height = (this.innerHeight = innerSize) + 'px';
                this.inner.style.marginTop = (this.scrollbarSize - innerSize - this.options.padding * 2) * this.lastProgress + this.options.padding + 'px';
            }

            isFunction(this.options.more) && (size - this.obj[this.scrollProp] < this[this.scrollDimensionProp] * 2) && this.options.more(this);
            this[this.scrollProp + 'Last'] = this.obj[this.scrollProp];
        },

        restore: function() {
            this.obj[this.scrollProp] = this[this.scrollProp + 'Last'];
        }
    };

    return Scrollbar;
})();

function OList(box, owners, selected, options) {
    if (selected.length === 0) selected = {};
    options = options || {};
    this.indexer = new vkIndexer(owners, options.getName ? options.getName : function(owner) {
        var name = owner[1];

        if (options.nameClass) {
            var nameEl = se(name);

            if (nameEl) {
                name = val(geByClass1(options.nameClass, nameEl)) || name;
            }
        }

        return name;
    });
    this.owners = owners;
    this.tpl = options.tpl;
    this.rsTpl = options.rsTpl;
    this.idIndex = options.idIndex || 0;
    this.selected = selected;
    this.getUnsorted = options.getUnsorted;
    this.unsortedIndex = options.unsortedIndex || 0;
    this.box = box;
    this.filter = options.filter;

    if (options.onTabUpdate) {
        this.onTabUpdate = options.onTabUpdate;
    }
    if (options.onListClick) {
        this.onListClick = options.onListClick;
    }

    box.setButtons(getLang('global_save'), function(btn) {
        var list = {},
            ids = [],
            inv = [];
        each(owners, function() {
            if (!self.invertedSelection && self.selected[this[self.idIndex]] || self.invertedSelection && !self.selected[this[self.idIndex]]) {
                list[this[self.idIndex]] = this;
                ids.push(this[self.idIndex]);
            } else {
                inv.push(this[self.idIndex])
            }
        });
        if (cur.onOListSave(ids, inv, list, options.ret || {}, btn) !== false) {
            box.hide(200);
        }
    }, getLang('global_cancel'));
    if (options.box_options) {
        box.setOptions(options.box_options);
    }

    var self = this;
    this.scrollNode = geByClass1('privacy_olist', box.bodyNode);
    this.moreEl = geByClass1('olist_more', box.bodyNode, 'a');
    this.olistEl = geByClass1('olist', box.bodyNode, 'div');
    this.olistFilter = ge('olist_filter_actions');
    this.sel = options.sel || 0;
    this.tabs = geByClass1('ui_tabs', box.bodyNode);
    this.noSelMsg = options.noSelMsg || getLang('friends_no_user_selected');
    this.invertedSelection = false;

    var selEl = geByClass1('olist_tab_sel', this.tabs);
    this.selCnt = intval(val(geByClass1('ui_tab_count', selEl)));

    var filter = this.filter ? this.filter : (this.filter = ge('olist_filter'));
    setTimeout(elfocus.pbind(filter), 100);

    if (this.moreEl) {
        if (!isVisible(this.moreEl)) {
            re(this.moreEl);
            show(this.moreEl);
        } else {
            this.moreEl.onclick = function(event) {
                self.renderList('', 60);
                return cancelEvent(event);
            }
        }
    }

    addEvent(this.olistEl, 'click', this.onMouseEvent.bind(this));
    addEvent(this.scrollNode, 'scroll', this.onScroll.bind(this));
    var selName = self.sel ? (self.sel > 0 ? 'sel' : 'unsel') : 'all',
        selTab = geByClass1('olist_tab_' + selName, self.tabs);
    selTab = selTab && geByClass1('ui_tab', selTab);

    (cur.onOListTabChange = function(el, tab) {
        el && uiTabs.switchTab(el);
        if (tab === undefined) {
            tab = self.selPrev === undefined ? 0 : self.selPrev;
        }
        self.selPrev = self.sel;
        self.sel = tab;
        self.renderList(val(filter), 0, tab);

        setTimeout(elfocus.pbind(filter), 100);
    })(selTab, self.sel);
    cur.onOlistChange = self.renderList.bind(this);
    cur.onOlistSelect = self.onOlistSelect.bind(this);
    cur.onOlistFilters = self.onOlistFilters.bind(this);

}
extend(OList.prototype, {
    onScroll: function() {
        var bodyWrap = domPN(this.box.bodyNode),
            moreEl = this.moreEl,
            scrollNode = this.scrollNode,
            sh = scrollNode.scrollHeight,
            st = scrollNode.scrollTop,
            h = scrollNode.offsetHeight || scrollNode.clientHeight;

        toggleClass(bodyWrap, 'olist_topsh', st > 0);
        toggleClass(bodyWrap, 'olist_botsh', st + h < sh);

        if (!moreEl || !moreEl.offsetTop || !moreEl.onclick) {
            return;
        }

        if (st + h + 200 >= sh) {
            moreEl.onclick();
        }
    },

    onMouseEvent: function(event) {
        var target = event.originalTarget || event.target;
        if (!hasClass(target, 'olist_item_wrap')) {
            target = gpeByClass('olist_item_wrap', target);
        }
        if (!target || target == bodyNode) return;
        if (hasClass(target, 'olist_item_loading')) {
            return cancelEvent(event);
        }

        if (checkEvent(event)) return true;
        this.box.changed = true;
        var id = target.id.match(/-?\d+/)[0],
            checked = !this.invertedSelection && this.selected[id] || this.invertedSelection && !this.selected[id];

        toggleClass(target, 'olist_item_wrap_on', !checked);
        this.selected[id] = !checked || this.invertedSelection;
        this.selCnt += !checked || this.invertedSelection ? 1 : -1;
        this.selTabUpdate();
        this.onListClick && this.onListClick(target, checked);

        if (this.scrollNode.scrollTop < 50) {
            var filter = this.filter;
            setTimeout(elfocus.pbind(filter), 100);
        }

        return cancelEvent(event);
    },
    onOlistSelect: function(type, event) {
        uiActionsMenu.toggle(this.olistFilter, false);
        var selCnt = this.selCnt,
            selected = this.selected;

        if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
            selected = {};
            selCnt = 0;
        }

        switch (type) {
            case 'all':
                selected = {};
                selCnt = 0;
                each(this.owners, function() {
                    selected[this[0]] = 1;
                    selCnt++;
                });
                break;

            case 'none':
                selected = {};
                selCnt = 0;
                break;

            case 'people':
                each(this.owners, function() {
                    if (this[0] > 0 && !selected[this[0]]) {
                        selected[this[0]] = 1;
                        selCnt++;
                    }
                });
                break;

            case 'groups':
                each(this.owners, function() {
                    if (this[0] < 0 && !selected[this[0]]) {
                        selected[this[0]] = 1;
                        selCnt++;
                    }
                });
                break;

            default:
                var list_id = intval(type.replace('list', '')),
                    mask = (1 << list_id);
                each(this.owners, function() {
                    if ((this[4] & mask) && !selected[this[0]]) {
                        selected[this[0]] = 1;
                        selCnt++;
                    }
                });
        }

        this.selCnt = selCnt;
        this.selected = selected;
        this.selTabUpdate();
        this.renderList();
        return false;
    },
    onOlistFilters: function(el, ev) {
        uiActionsMenu.show(el, ev);

        addEvent(document, 'mousedown', function(e) {
            uiActionsMenu.toggle(el, false);
            removeEvent(document, 'mousedown', arguments.callee);
        });

        return ev && cancelEvent(ev);
    },
    selTabUpdate: function() {
        if (this.isAlbumEdit) { // fixme: old layout used
            this.onTabUpdate && this.onTabUpdate();
            return;
        }

        if (!this.tabs) return;

        var cnt1 = this.selCnt,
            cnt2 = this.owners.length - cnt1,
            selEl = geByClass1('olist_tab_sel', this.tabs),
            unselEl = geByClass1('olist_tab_unsel', this.tabs);
        val(geByClass1('ui_tab_count', selEl), cnt1 || '');
        val(geByClass1('ui_tab_count', unselEl), cnt2 || '');
        if (this.onTabUpdate) {
            this.onTabUpdate();
        }
    },
    renderList: function(pattern, offset, sel) {
        offset = offset || 0;
        sel = sel || this.sel;
        var slice, selected, tpl,
            limit = offset ? 60 : 120,
            self = this;

        if (pattern) {
            pattern = pattern.replace(/\u2013|\u2014/g, '-');
        }

        slice = pattern ? this.indexer.search(pattern) : this.owners;
        if (self.unsortedIndex == sel && self.getUnsorted) {
            slice = self.getUnsorted(slice);
        }
        selected = this.selected;
        var inverted = self.invertedSelection ? !(this.sel < 0) : (this.sel < 0);
        tpl = self.tpl;
        if (sel && self.unsortedIndex != sel) {
            var sel_slice = [];
            each(slice, function() {
                var id = this[self.idIndex];
                if (!inverted && selected[id] || inverted && !selected[id]) {
                    sel_slice.push(this);
                    if (sel_slice.length > offset + limit) {
                        return false;
                    }
                }
            });
            slice = sel_slice;
        }

        var total = slice.length;
        slice = slice.slice(offset, offset + limit);
        var html = [];
        if (pattern) {
            pattern = clean(pattern);
            var term = escapeRE(pattern),
                termRus = parseLatin(pattern);
            if (termRus != null) {
                term = term + '|' + escapeRE(termRus);
            }
            var regexp = new RegExp('(?![^&;]+;)(?!<[^<>]*)((\\(*)(' + term + '))(?![^<>]*>)(?![^&;]+;)', 'gi');
        }
        var rsTpl = self.rsTpl ? self.rsTpl : function(obj, pattern, invertedSelection, selected, regexp) {
            var checked = !invertedSelection && selected[obj[0]] || invertedSelection && !selected[obj[0]];
            var label = obj[1];
            if (pattern) {
                label = pattern.indexOf(' ') == -1 ? label.split(' ') : [label];
                var tmp = '';
                for (var i in label) {
                    tmp += (i > 0 ? ' ' : '') + label[i].replace(regexp, '$2<em>$3</em>');
                }
                label = tmp;
            }
            return {
                id: obj[0],
                name: label,
                photo: obj[2],
                classname: checked ? ' olist_item_wrap_on' : '',
                link: obj[3] || (obj[0] > 0 ? ('id' + obj[0]) : ('club' + (-obj[0])))
            };
        }
        each(slice, function() {
            html.push(rs(tpl, rsTpl(this, pattern, self.invertedSelection, selected, regexp)));
        });
        if (!offset && !html.length) {
            html.push('<div class="no_rows">' + (pattern ? getLang('global_search_not_found').replace('{search}', pattern) : self.noSelMsg) + '</div>');
        }
        re(this.moreEl);
        html = html.join(' ');

        if (!offset) {
            val(this.olistEl, html);
        } else {
            this.olistEl.appendChild(cf(html));
        }
        if (total > offset + limit) {
            this.olistEl.appendChild(this.moreEl);
            this.moreEl.onclick = function(event) {
                self.renderList(pattern, offset + limit);
                return cancelEvent(event);
            }
        }
        if (self.box && self.box.scroll) {
            self.box.scroll.update(false, true);
        }
        self.onScroll();
    }
});

var uiBox = {
    addShadows: function(box) {
        setTimeout(function() {
            var list = domFC(box.bodyNode);
            var onListScroll = function() {
                toggleClass(domPN(box.bodyNode), 'box_topsh', list.scrollTop > 0);
                toggleClass(domPN(box.bodyNode), 'box_botsh', list.scrollTop + (list.offsetHeight || list.clientHeight) < list.scrollHeight);
            }
            addEvent(list, 'scroll', onListScroll);
            setTimeout(onListScroll, 10);
        }, 10);
    }
}

/*
  width - optional (width of provided el will be taken)
  hintClass
  value - initial value
  debounce - debounce value for value change
  onChange - callback (value 0-1)
  fireChangeEventOnInit
  log - use logarithmic value change

  withBackLine
*/
function Slider(el, options) {
    if (this.constructor != Slider) {
        throw new Error('Slider was called without \'new\' operator');
    }
    if (!el) {
        throw new Error('No element was provided for Slider');
    }

    el = ge(el);
    this.options = options || {
        size: 1
    };
    this.options.backValue = this.options.backValue || 0;

    var backLineWidth = this.options.backValue * 100;
    var backLineHtml = this.options.withBackLine ? '<div class="slider_back" style="width:' + backLineWidth + '%"></div>' : '';

    var html = '<div class="slider_slide"><div class="slider_loading_bar" style="opacity: 0; display: none;"></div> ' + backLineHtml + ' <div class="slider_amount"></div> <div class="slider_handler"></div> </div>';
    this._el = ce('div', {
        innerHTML: html,
        className: 'slider',
        id: el.getAttribute('id') || ''
    });

    var classes = el.classList || [],
        _this = this;
    for (var i = 0, len = classes.length; i < len; i++) {
        addClass(this._el, classes[i]);
    }
    each(this._el.attributes, function(i, att) {
        if (att.name != 'id' || att.name != 'class') {
            _this._el.setAttribute(att.name, att.value);
        }
    });

    el.parentNode.replaceChild(this._el, el);

    data(this._el, 'slider', this);

    this._amountEl = geByClass1('slider_amount', this._el);
    this._handlerEl = geByClass1('slider_handler', this._el);
    this._slideEl = geByClass1('slider_slide', this._el);
    this._backEl = geByClass1('slider_back', this._el);
    this._progressEl = geByClass1('slider_loading_bar', this._el);

    if (this.options.color) {
        setStyle(this._amountEl, {
            backgroundColor: this.options.color
        });
        setStyle(this._handlerEl, {
            backgroundColor: this.options.color
        });
    }
    if (this.options.backColor) {
        setStyle(this._slideEl, {
            backgroundColor: this.options.backColor
        });
    }

    addClass(this._el, 'slider_size_' + this.options.size);

    if (this.options.debounce) {
        this._onValueChangeDebounced = debounce(this._onValueChange, this.options.debounce);
    }

    if (options.formatHint) {
        addEvent(this._el, 'mousemove', this._ev_onMouseOver = this._onMouseOver.bind(this));
        addEvent(this._el, 'mouseleave', this._ev_onMouseLeave = this._onMouseLeave.bind(this));
    }

    addEvent(this._el, 'mousedown', this._ev_onMouseDown = this._onMouseDown.bind(this));

    this.setValue(this.options.value || 0, this.options.fireChangeEventOnInit ? false : true, false);
    this.setBackValue(this.options.backValue);
};

Slider.prototype.toggleAdState = function(doShow) {
    this._adState = !!doShow;
    toggleClass(this._el, 'slider_ad_mode', !!doShow);
}

Slider.prototype.toggleAdMarker = function(doShow) {
    doShow = !!doShow;

    var markerEl = geByClass1('slider_ad_marker', this._el);

    if (doShow) {
        if (!markerEl) {
            var onmouseOver = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_audio_ad') + '\', black: 1, shift: [16, 9, 10]})"';
            markerEl = se('<div class="slider_ad_marker_wrap" ' + onmouseOver + '><div class="slider_ad_marker"></div></div>');
            domPN(this._slideEl).insertBefore(markerEl, this._slideEl);
            delete this._width;
            addClass(this._el, 'slider_ad_marker_shown');
        }
    } else {
        re(markerEl);
        delete this._width;
        removeClass(this._el, 'slider_ad_marker_shown');
    }
}

Slider.prototype.showAdMarker = function(position) {
    var markerEl = se('<div class="slider_ad_marker"></div>');
    domPN(this._slideEl).insertBefore(markerEl, this._slideEl);
    delete this._width;

    addClass(this._el, 'slider_ad_marker_shown');
}

Slider.prototype.isAdMode = function() {
    return hasClass(this._el, 'slider_ad_mode');
}

Slider.prototype.toggleLoading = function(showLoading) {
    showLoading = !!showLoading;

    toggle(this._progressEl, showLoading);
    setStyle(this._progressEl, 'opacity', showLoading ? 1 : 0);
}

Slider.prototype.destroy = function(event) {
    if (this.options.formatHint) {
        removeEvent(this._el, 'mousemove', this._ev_onMouseOver);
        removeEvent(this._el, 'mouseleave', this._ev_onMouseLeave);
        removeEvent(this._el, 'mousedown', this._ev_onMouseDown);
    }
    re(this._el);
    re(this._currHintEl);
}

Slider.prototype._updateHint = function(event, fromDragging) {
    if (!this._currHintEl) {
        this._currHintEl = se('<div class="slider_hint" id="slider_hint"></div>');
        this.options.hintClass && addClass(this._currHintEl, this.options.hintClass);
        this._el.appendChild(this._currHintEl);
    }

    this._width = this._width || getSize(this._slideEl)[0];

    var slidePos = this._getPos();
    var left = Math.round(event.pageX - slidePos[0]);
    var width = this._width;

    left = fromDragging ? Math.min(Math.max(0, left), width) : left;

    if (left >= 0 && left <= width) {
        var value = left / width;

        this._currHintEl.innerHTML = this.options.formatHint ? this.options.formatHint.call(this, value) : value;

        var hintSize = getSize(this._currHintEl);

        setStyle(this._currHintEl, {
            left: this._slideEl.offsetLeft + left - hintSize[0] / 2,
            top: this._slideEl.offsetTop - hintSize[1] - 10,
        });

        !fromDragging && this._toggleHint(true);
    } else {
        !fromDragging && this._toggleHint(false);
    }

    if (!this.options.formatHint) {
        this._toggleHint(false);
    }
}

Slider.prototype._toggleHint = function(show) {
    if (this.isAdMode()) {
        show = false;
    }

    toggleClass(this._currHintEl, 'visible', show);
}

Slider.prototype._onMouseOver = function(event) {
    if (!Slider._currenSliderDrag && !hasClass(this._el, 'active')) {
        this._updateHint(event);
    }
}

Slider.prototype._onMouseLeave = function(event) {
    if (!hasClass(this._el, 'active')) {
        this._toggleHint(false);
    }
}

Slider.prototype._onMouseDown = function(event) {
    if (event.button != 0) return;

    delete cur._sliderMouseUpNowEl;

    if (this._adState) {
        return;
    }

    addEvent(window, 'mousemove', this._ev_onMouseMove = this._onMouseMove.bind(this));
    addEvent(window, 'mouseup', this._ev_onMouseUp = this._onMouseUp.bind(this));

    this._width = getSize(this._slideEl)[0];

    this._onMouseMove(event);

    Slider._currenSliderDrag = this;

    addClass(this._el, 'active');
    cancelEvent(event);
}

Slider.prototype._onMouseUp = function(event) {
    cur._sliderMouseUpNowEl = this._el;

    removeEvent(window, 'mousemove', this._ev_onMouseMove);
    removeEvent(window, 'mouseup', this._ev_onMouseUp);

    clearTimeout(this._debounceto);

    this._onValueChange();
    removeClass(this._el, 'active');

    Slider._currenSliderDrag = false;

    this._toggleHint(false);

    this.options.onEndDragging && this.options.onEndDragging(this._currValue);
}

Slider.prototype._onMouseMove = function(event) {
    var slidePos = this._getPos();

    var left = Math.max(event.pageX, slidePos[0]);
    left = Math.min(left, slidePos[0] + this._width);
    left = left - slidePos[0];

    this.setValue(left / this._width, true, true);

    if (this._onValueChangeDebounced) {
        this._onValueChangeDebounced();
    } else {
        this._onValueChange();
    }

    this._toggleHint(true);
    this._updateHint(event, true);

    cancelEvent(event);
}

Slider.prototype._getPos = function() {
    return this._slidePos = getXY(this._slideEl);
}

Slider.LOGFBASE = 35;

Slider.prototype._logf = function(value) {
    if (!this.options.log) {
        return value;
    }

    var base = Slider.LOGFBASE;
    return (Math.pow(base, value) - 1) / (base - 1);
}

Slider.prototype._unlogf = function(value) {
    if (!this.options.log) {
        return value;
    }

    function baseLog(x, y) {
        return Math.log(y) / Math.log(x);
    }

    var base = Slider.LOGFBASE;
    return baseLog(base, 1 + value * (base - 1));
}

Slider.prototype.setValue = function(value /*0-1*/ , skipFireEvent, fromDragging) {
    if (hasClass(this._el, 'active') && !fromDragging) {
        return;
    }

    var newCurrentValue = fromDragging ? this._logf(value) : value;
    if (this._currValue == newCurrentValue) {
        return;
    }

    this._currValue = newCurrentValue;

    var left = fromDragging ? value : this._unlogf(value);
    left = left * 100 + '%';
    setStyle(this._amountEl, {
        width: left
    });
    setStyle(this._handlerEl, {
        left: left
    });

    !skipFireEvent && this._onValueChange();
}

Slider.prototype.setBackValue = function(value /*0-1*/ ) {
    toggleClass(this._backEl, 'slider_back_transition', value > this._backValue);
    this._backValue = value;

    var left = value * 100 + '%';
    setStyle(this._backEl, {
        width: left
    });
}

Slider.prototype._onValueChange = function() {
    this._lastValue = this._lastValue || 0;

    if (this._lastValue != this._currValue) {
        this._lastValue = this._currValue;
        this.options.onChange && this.options.onChange(this._currValue);
    }
}


try {
    stManager.done('ui_common.js');
} catch (e) {}