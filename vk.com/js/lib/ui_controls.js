function debug(t) {
    UI_CONTROLS_DEBUG && debugLog(t)
}

function inherit(t, e) {
    var i = function() {};
    i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t, t.superclass = e.prototype
}

function createChildClass(className, parent, proto) {
    var code = "function " + className + " (a, b, c, d) {    if (this == window || this.setInterval) return new " + className + '(a, b, c, d);    this.__className = "' + className + '";    return this.__construct__(arguments);  };';
    window.execScript ? window.execScript(code) : window.eval(code), childClass = eval("(" + className + ")"), inherit(childClass, parent), "common" in proto && (extend(childClass, proto.common), proto.common = childClass), extend(childClass.prototype, proto)
}

function UiControl(t) {
    return this.__construct__(t)
}

function Dropdown(t, e, i) {
    return i || (i = {}), new Selector(t, i.autocomplete ? e : [], extend({
        introText: "",
        multiselect: !1,
        autocomplete: !1,
        selectedItems: i.selectedItem
    }, i, {
        defaultItems: e
    }))
}

function Autocomplete(t, e, i) {
    return new Selector(t, e, i)
}

function Radiobuttons(t, e, i) {
    var s = t.id;
    Radiobutton._radio_buttons[s] = [], Radiobutton._callbacks[s] = [], each(e, function(t, e) {
        new Radiobutton(ge(s + e[0]), {
            label: e[1],
            width: i.width,
            resultField: s
        })
    }), Radiobutton.select(s, void 0 !== i.selected ? i.selected : t.value), Radiobutton.setChangeEvent(s, function(e) {
        t.value = e, isFunction(i.onChange) && i.onChange(e)
    })
}

function UiUtil(t) {
    return this.__construct__(t)
}

function InlineDropdown(t, e) {
    if (this.constructor != InlineDropdown) throw new Error("InlineDropdown was called without 'new' operator");
    if (t = ge(t)) {
        if (!t.nodeType) throw new Error("First argument not a DOM element");
        if (!hasClass(t, "idd_wrap")) {
            if (this._opts = e || {}, this._items = e.items ? clone(e.items) : JSON.parse(t.getAttribute("data-items")), !this._items) throw new Error("No items provided");
            this._title = e.keepTitle ? e.title || t.innerHTML : "", this._selectable = e.keepTitle ? e.keepSelected : !0, this._iddEl = se('<div class="idd_wrap" id="' + t.id + '"><div class="idd_selected_value ' + (e.withArrow ? "idd_arrow" : "") + '" tabindex="0" role="link">' + t.innerHTML + '</div><input type="hidden" id="' + t.id + '_input" name="' + (t.getAttribute("name") || t.id) + '" /></div>');
            var i = this;
            if (each(t.className.split(" "), function(t, e) {
                    addClass(i._iddEl, e)
                }), each(t.attributes, function(t, e) {
                    0 == e.name.indexOf("data-") && i._iddEl.setAttribute(e.name, e.value)
                }), t.parentNode.replaceChild(this._iddEl, t), this._els = {
                    valueEl: geByClass1("idd_selected_value", this._iddEl),
                    itemsContentEl: geByClass1("idd_items_content", this._iddEl),
                    hiddenInputEl: geByTag1("input", this._iddEl)
                }, this._opts.autoShow) {
                var s = !1;
                addEvent(this._iddEl, "mouseenter", function() {
                    s = !0, clearTimeout(i._autoShowTimeout), i._autoShowTimeout = setTimeout(function() {
                        s && i._onClick()
                    }, 100)
                }), addEvent(this._iddEl, "mouseleave", function() {
                    clearTimeout(i._autoShowTimeout), s = !1
                })
            }
            addEvent(this._iddEl, "click", this._onClick.bind(this)), this._rebuildDropdown();
            var o = !1;
            void 0 !== e.selected ? o = e.selected : t.hasAttribute("data-value") && (o = t.getAttribute("data-value")), o !== !1 && this.select(o, !0)
        }
    }
}

function showMask(t, e) {
    if (!data(t, "mask")) {
        var i = getSize(t),
            s = getXY(t),
            o = getXY("page_layout");
        e = e ? '<div class="el_mask_progress_wrap"><div class="el_mask_progress"></div></div>' : "";
        var n = se('<div class="el_mask">' + e + "</div>");
        setStyle(n, {
            width: i[0],
            height: i[1],
            left: s[0] - o[0],
            top: s[1] - o[1]
        }), t.parentNode.appendChild(n), data(t, "mask", n)
    }
}

function hideMask(t) {
    re(data(t, "mask")), data(t, "mask", null)
}

function addTootlip(t, e) {
    function i(t) {
        var e = data(this, "tt");
        ge(e.getAttribute("id")) || (each(geByClass("ntt"), re), geByTag1("body").appendChild(e)), addClass(e, "ntt_vis")
    }

    function s(t) {
        setTimeout(i.pbind(this), 200)
    }

    function o(t) {}
    if (t = ge(t), !t || !t.nodeType) throw new Error("First argument not a DOM element");
    if (!data(t, "tt")) {
        var n = (new NTooltip(t, e), t.getAttribute("id") || ""),
            a = se('<div class="ntt" id="ntt_' + n + '"></div>');
        data(t, "tt", a), addEvent(t, "mouseenter", s), addEvent(t, "mouseleave", o)
    }
}

function removeTooltip(t, e) {}
var UI_CONTROLS_DEBUG = !1;
if (window.vk || (vk = {}), void 0 === window._ui) {
    var _ui = {
        _guid: 0,
        _sel: !1,
        _uids: [!1],
        reg: function(t) {
            return _ui._uids.push(t), ++_ui._guid
        },
        sel: function(t) {
            if (void 0 !== t) {
                var e = _ui.selobj();
                e && e._blur && e._blur(), _ui._sel = t
            }
            return _ui._sel
        },
        selobj: function(t) {
            return _ui._sel && void 0 !== t && (_ui._uids[_ui._sel] = t), _ui._uids[_ui._sel]
        }
    };
    addEvent(document, "keypress keydown mousedown", function(t) {
        if (_ui.sel()) {
            var e = _ui.selobj();
            if (!e) return _ui.sel(!1);
            if (e.container && e.container != ge(e.container.id)) return _ui.selobj(!1), _ui.sel(!1);
            e.onEvent(t)
        }
    })
}
extend(UiControl.prototype, {
    CSS: {},
    defaultOptions: null,
    dom: {},
    __construct__: function(t) {
        return this.beforeInit && this.beforeInit.apply(this, t) === !1 ? !1 : this.initOptions && this.initOptions.apply(this, t) === !1 ? !1 : this.init.apply(this, t) === !1 ? !1 : this.initDOM && this.initDOM.apply(this, t) === !1 ? !1 : (this.initEvents && this.initEvents.apply(this, t), this.afterInit && this.afterInit.apply(this, t), this)
    },
    beforeInit: null,
    initOptions: null,
    init: null,
    initDOM: null,
    initEvents: null,
    afterInit: null,
    show: null,
    hide: null
}), createChildClass("Selector", UiControl, {
    CSS: {},
    defaultOptions: {
        selectedItems: [],
        selectedItemsDelimiter: ",",
        defaultItems: [],
        multiselect: !0,
        selectable: !0,
        multinostop: !1,
        autocomplete: !0,
        dropdown: !0,
        listStyle: !1,
        limitedListHeight: !0,
        maxItems: 50,
        selectFirst: !0,
        dividingLine: "smart",
        resultField: void 0,
        customField: void 0,
        enableCustom: !1,
        multiCustom: !1,
        valueIsCustom: !1,
        valueForCustom: -1,
        width: 300,
        height: 250,
        resultListWidth: 0,
        progressBar: !1,
        imageId: void 0,
        noImageSrc: "http://vk.com/images/question_s.gif",
        hrefPrefix: "id",
        noBlur: !1,
        zeroDefault: !1,
        customArrow: !1,
        customArrowWidth: 0,
        big: !1,
        withIcons: !1,
        tokenPrefix: !1,
        addCustomTokenOnKeys: [],
        placeholder: "",
        placeholderColor: "#7C7F82",
        placeholderColorBack: "#7C7F82",
        zeroPlaceholder: !1,
        nativePlaceholder: !1,
        hidePlaceholderOnSelected: !0,
        introText: "Start typing",
        disabledText: "",
        noResult: getLang("search_nothing_found"),
        cacheLength: 100,
        indexkeys: void 0,
        includeLabelsOnMatch: !1,
        preventDuplicates: !1,
        onShow: void 0,
        onHide: void 0,
        onChange: void 0,
        onTagAdd: void 0,
        onTagRemove: void 0,
        onItemSelect: void 0,
        onTokenSelected: void 0,
        onTokenMouseOver: void 0,
        onTokenMouseOut: void 0,
        onTokenClick: void 0,
        customSearch: !1,
        chooseFirst: !1,
        maxItemsShown: function(t) {
            return t > 6 ? 500 : t > 4 ? 200 : t > 2 ? 150 : 100
        },
        highlight: function(t, e) {
            var i = [escapeRE(e)],
                s = parseLatin(e),
                o = parseCyr(e);
            null !== s && i.push(escapeRE(s)), null !== o && i.push(escapeRE(o));
            var n = new RegExp("(?![^&;]+;)(?!<[^<>]*)((\\(*)(" + i.join("|") + "))(?![^<>]*>)(?![^&;]+;)", "gi");
            return t.replace(n, "$2<em>$3</em>")
        },
        formatResult: function(t) {
            return t[1] + ("string" == typeof t[2] ? " <span>" + t[2] + "</span>" : "")
        },
        lastOptionWithoutCommaAtEnd: !1
    },
    controlName: "Selector",
    beforeInit: function(t) {
        if (null === t || t.autocomplete) {
            try {
                console.error("Can't init ", t)
            } catch (e) {}
            return !1
        }
        this.guid = _ui.reg(this)
    },
    initOptions: function(t, e, i) {
        if (!i.width) {
            var s = intval(getStyle(t, "width"));
            s > 0 && (i.width = s)
        }
        this.options = extend({}, this.defaultOptions, {
            resultField: t.name || "selectedItems",
            customField: t.name ? t.name + "_custom" : "selectedItems_custom"
        }, this.prepareOptionsText(i || {})), (this.options.dark || this.options.big_text) && (this.options.big = 1), this.options.highlight = this.options.highlight || function(t) {
            return t
        }, !isArray(this.options.selectedItems) && isEmpty(this.options.selectedItems) && (this.options.selectedItems = []), t.value && !this.options.selectedItems.length && (this.options.selectedItems = t.value), this.options.width = parseInt(this.options.width) > 0 ? parseInt(this.options.width) : this.defaultOptions.width, this.options.height = parseInt(this.options.height) > 0 ? parseInt(this.options.height) : this.defaultOptions.height, this.options.resultListWidth = parseInt(this.options.resultListWidth) > 0 ? parseInt(this.options.resultListWidth) : this.options.width, this.options.imageId && (this.options.imageId = ge(this.options.imageId))
    },
    init: function(t, e) {
        this.disableSomeFeatures = 0 === location.pathname.indexOf("/join"), this.dataURL = "string" == typeof e ? e : null, this.dataItems = isArray(e) ? e : [], this.currentList = this.dataItems, this.dataURL ? this.cache = new Cache(this.options) : this.indexer = new Indexer(this.dataItems, {
            indexkeys: this.options.indexkeys,
            includeLabelsOnMatch: this.options.includeLabelsOnMatch,
            preventDuplicates: this.options.preventDuplicates
        }), this._selectedItems = [], this.input = t, this.disabled = !1, this.mouseIsOver = !1, this.hasFocus = 0, this.scrollbarWidth = 0, this.timeout = null, this.readOnly = this.options.autocomplete ? "" : 'readonly="true"', this.requestTimeout = null, this.selectedTokenId = 0, this.selectorWidth = this.options.width
    },
    initDOM: function(t, e) {
        var i = this;
        this.container = ce("div", {
            id: "container" + this.guid,
            className: "selector_container" + (i.options.autocomplete ? "" : " dropdown_container") + (i.options.big ? " big" : "") + (i.options.big_text ? " big_text" : "") + (i.options.withIcons ? " with_icons" : "") + (browser.mobile ? " mobile_selector_container" : "") + (i.options.noArr ? " dropdown_noarr" : "") + (i.options.listStyle ? " list_style" : "") + (i.options.limitedListHeight ? " limited_height" : ""),
            innerHTML: i._containerHtml()
        }, {
            width: i.options.width + "px"
        }), t.parentNode.replaceChild(this.container, t), each({
            selector: "selector",
            resultList: "result_list",
            input: "selector_input",
            placeholder: "placeholder_wrap1",
            placeholderContent: "placeholder_content",
            selectedItemsContainer: "selected_items",
            selectedItemsContainerWrap: "selected_items_wrap",
            resultField: "resultField",
            customField: "customField",
            dropdownButton: "selector_dropdown"
        }, function(t, e) {
            i[t] = geByClass(e, i.container)[0]
        }), browser.chrome && (this.resultList.style.opacity = 1), t.autocomplete = "1", i.options.dividingLine && addClass(this.resultList, "dividing_line"), this.resultList.style.width = i.options.resultListWidth + "px", this.options.dropdown && this.initDropdown(), this.updatePlaceholder(), this.select = new Select(this.resultList, {
            selectFirst: i.options.selectFirst,
            height: i.options.height,
            onItemActive: function(t, e) {
                i.showImage(t), i.activeItemValue = t, i._ariaOnItemActive(e)
            },
            onItemSelect: i._selectItem.bind(i),
            forAutocomplete: i.options.autocomplete,
            forDropDown: !0,
            onShow: function() {
                _ui.sel(i.guid), i.highlightInput(!0), isFunction(i.options.onShow) && i.options.onShow(), i._ariaOnSelectShow()
            },
            onHide: function() {
                _ui.sel(!1), i.highlightInput(!1), isFunction(i.options.onHide) && i.options.onHide(), i._ariaOnSelectHide()
            },
            onEsc: i._ariaRestoreFocus.bind(i)
        }), this._initAria()
    },
    _containerHtml: function() {
        var t = this.options.dropdown ? '<td id="dropdown' + this.guid + '" class="selector_dropdown" role="button" aria-hidden="true">&nbsp;</td>' : "",
            e = this.options.limitedListHeight ? '<div class="selected_items_wrap"><div class="scroll_fader_top"></div>' : "",
            i = this.options.limitedListHeight ? '<div class="scroll_fader_bottom"></div></div>' : "";
        return '<table cellspacing="0" cellpadding="0" class="selector_table">       <tr>         <td class="selector">           <div class="placeholder_wrap1">             <div class="placeholder_wrap2">               <div class="placeholder_content" aria-hidden="true"></div>               <div class="placeholder_cover"></div>             </div>           </div>' + e + '            <span class="selected_items"></span>            ' + i + '            <input type="text" class="selector_input" ' + this.readOnly + ' />            <input type="hidden" name="' + this.options.resultField + '" id="' + this.options.resultField + '" value="" class="resultField">            <input type="hidden" name="' + this.options.customField + '" id="' + this.options.customField + '" value="" class="customField">          </td>' + t + '        </tr>     </table>    <div class="results_container">      <div class="result_list" style="display:none;"></div>    </div>'
    },
    initEvents: function() {
        function t(t) {
            return t.deltaY > 0 && i.resultList.scrollTop + i.resultList.offsetHeight >= i.resultList.childNodes[0].offsetHeight ? cancelEvent(t) : i.resultList.scrollTop <= 0 && t.deltaY < 0 ? cancelEvent(t) : void 0
        }

        function e(t) {
            return this.container.showBottomFader || this.container.showTopFader ? !this.container.showBottomFader && t.deltaY > 0 ? cancelEvent(t) : !this.container.showTopFader && t.deltaY < 0 ? cancelEvent(t) : void 0 : !0
        }
        var i = this;
        this.options.dropdown && this.initDropdownEvents(), addEvent(this.resultList, "mouseenter", function() {
            addEvent(this.resultList, browserFeatures.wheelEvent, t)
        }.bind(this)), addEvent(this.resultList, "mouseleave", function() {
            removeEvent(this.resultList, browserFeatures.wheelEvent, t)
        }.bind(this)), this.options.limitedListHeight && (addEvent(this.selectedItemsContainer, "scroll", this.updateSelectedItemsScroll.bind(this)), this.updateSelectedItemsScroll({
            target: this.selectedItemsContainer
        }), addEvent(this.resultList, "mouseenter", function() {
            addEvent(this.selectedItemsContainer, browserFeatures.wheelEvent, e.bind(this))
        }.bind(this)), addEvent(this.resultList, "mouseleave", function() {
            removeEvent(this.selectedItemsContainer, browserFeatures.wheelEvent, e.bind(this))
        }.bind(this)));
        var s = browser.opera || browser.mozilla ? "keypress" : "keydown",
            o = browser.opera ? "keypress" : "keydown";
        this.onEvent = function(t) {
            if ("mousedown" == t.type) {
                for (var e = !0, n = t.target; n && n != n.parentNode;) {
                    if (n == i.container) {
                        e = !1;
                        break
                    }
                    n = n.parentNode
                }
                e && (i.select.hide(), i.deselectTokens())
            }
            t.type == s && i.handleKeyboardEventOutside(t), t.type == o && i.select.handleKeyEvent(t), "keypress" == t.type && i.select._doQuickSearch(t)
        }, this.disableSomeFeatures ? addEvent(this.input, "paste keypress keydown focus blur", this.handleKeyboardEvent, !1, {
            self: this
        }) : addEvent(this.input, "keydown keypress change paste cut drop input focus blur", this.handleKeyboardEvent, !1, {
            self: this
        }), addEvent(this.selector, "mousedown", function(t) {
            for (var e = !1, s = t.target; null !== s;) {
                if (hasClass(s, "token")) {
                    e = !0;
                    break
                }
                s = s.parentNode
            }
            return e ? !0 : i.onInputClick(t)
        }, !1, {
            self: this
        })
    },
    updateSelectedItemsScroll: function(t) {
        var e = t.target.scrollTop + this.selectedItemsContainer.offsetHeight < this.selectedItemsContainer.scrollHeight;
        this.container.showBottomFader !== e && (setTimeout(toggleClass.bind(this, this.container, "show_bottom_fader", e), 0), this.container.showBottomFader = e);
        var i = t.target.scrollTop > 0;
        this.container.showTopFader !== i && (setTimeout(toggleClass.bind(this, this.container, "show_top_fader", i), 0), this.container.showTopFader = i)
    },
    afterInit: function() {
        this.updateInput();
        var t = this;
        if (void 0 !== this.options.selectedItems)
            if (isArray(this.options.selectedItems))
                for (var e in this.options.selectedItems) this._selectItem(this.options.selectedItems[e], !1);
            else each((this.options.selectedItems + "").split(this.options.selectedItemsDelimiter), function(e, i) {
                t._selectItem(i, !1)
            });
        this._selectedItems.length || this.options.autocomplete || this.options.multiselect || !this.options.defaultItems.length || this._selectItem(this.options.defaultItems[0], !1)
    },
    prepareOptionsText: function(t) {
        return each(["disabledText", "placeholder"], function() {
            this in t && (t[this] = winToUtf(stripHTML(t[this])))
        }), t
    },
    fadeButtonToColor: function() {
        if (this.options.customArrow || this.options.big, 0) {
            var t = vk && vk.rtl || window.is_rtl,
                e = t ? {
                    backgroundColor: "#E1E8ED",
                    borderRightColor: "#D2DBE0"
                } : {
                    backgroundColor: "#E1E8ED",
                    borderLeftColor: "#D2DBE0"
                },
                i = this;
            animate(this.dropdownButton, e, 200, function() {
                i.mouseIsOver || (i.select.isVisible() ? i.dropdownButton.style.backgroundColor = i.dropdownButton.style[t ? "borderRightColor" : "borderLeftColor"] = "" : i.fadeButtonToWhite())
            })
        }
    },
    fadeButtonToWhite: function() {
        if (this.options.customArrow || this.options.big, 0) {
            var t = this,
                e = vk && vk.rtl || window.is_rtl;
            animate(this.dropdownButton, e ? {
                backgroundColor: "#FFFFFF",
                borderRightColor: "#FFFFFF"
            } : {
                backgroundColor: "#FFFFFF",
                borderLeftColor: "#FFFFFF"
            }, 200, function() {
                t.dropdownButton.style.backgroundColor = t.dropdownButton.style[e ? "borderRightColor" : "borderLeftColor"] = "", t.mouseIsOver && t.fadeButtonToColor()
            })
        }
    },
    initDropdown: function() {
        this.scrollbarWidth = this.options.customArrowWidth || this.options.big && 25 || window.sbWidth(), this.scrollbarWidth <= 3 && (this.scrollbarWidth = browser.mobile ? 20 : 14), this.options.customArrow || (this.dropdownButton.style.width = this.scrollbarWidth + 1 + "px"), this.selectorWidth -= this.scrollbarWidth
    },
    initDropdownEvents: function() {
        var t = this;
        addEvent(this.dropdownButton, "mouseover", function() {
            addClass(this, "selector_dropdown_hover")
        }), addEvent(this.dropdownButton, "mouseout", function() {
            removeClass(this, "selector_dropdown_hover")
        }), addEvent(this.container, "mouseover", function(e) {
            t.mouseIsOver = !0, t.disabled || t.fadeButtonToColor()
        }), addEvent(this.container, "mouseout", function() {
            t.mouseIsOver = !1, t.disabled || setTimeout(function() {
                if (!t.mouseIsOver)
                    if (t.select.isVisible()) {
                        var e = vk && vk.rtl || window.is_rtl;
                        t.dropdownButton.style.backgroundColor = t.dropdownButton.style[e ? "borderRightColor" : "borderLeftColor"] = ""
                    } else t.fadeButtonToWhite()
            }, 0)
        }), addEvent(this.dropdownButton, "mousedown", function() {
            t.disabled || (t.select.isVisible() ? t.select.toggle() : t.showDefaultList())
        })
    },
    destroyDropdown: function() {
        vk.al && cleanElems(this.dropdownButton), removeEvent(this.container, "mouseover"), removeEvent(this.container, "mouseout"), this.scrollbarWidth = 0, this.selectorWidth = this.options.width
    },
    destroy: function() {
        if (vk.al && !this.destroyed) {
            this.destroyDropdown();
            var t = ge(this.options.imageId);
            t && removeEvent(t, "click"), this.select.destroy(), cleanElems(this.container, this.input, this.selector, this.resultList, this.placeholderContent);
            for (var e = this.selectedItemsContainer.firstChild; e; e = e.nextSibling) cleanElems(e, e.firstChild.nextSibling);
            this.destroyed = !0
        }
    },
    updateInput: function() {
        var t = vk && vk.rtl || window.is_rtl;
        if (!this.options.autocomplete && this.options.multiselect && this._selectedItems.length) hide(this.input);
        else {
            if (isVisible(this.input) || show(this.input), (t || this.options.multiselect) && !this.input.offsetParent && this.container.parentNode) {
                var e = this.container.parentNode,
                    i = this.container.nextSibling;
                utilsNode.appendChild(this.container)
            }
            this.input.style.width = "20px";
            var s = this.options.big ? 12 : 9;
            if (this._selectedItems.length)
                if (t) var o = (this.input.offsetParent ? this.input.offsetParent.offsetWidth : this.selectorWidth) - this.input.offsetLeft - this.input.offsetWidth;
                else var o = this.input.offsetLeft;
            else var o = 0;
            var n = this.selectorWidth - o - s;
            this.options.noArr && (n += 22), this.scrollbarWidth || (n -= 1), this.input.style.width = Math.max(20, n) + "px", e && (i ? e.insertBefore(this.container, i) : e.appendChild(this.container))
        }
        this.updatePlaceholder()
    },
    updatePlaceholder: function() {
        if (!this.disableSomeFeatures) {
            var t = "0" == this.resultField.value && this.options.zeroPlaceholder,
                e = this.disabled && this.options.disabledText ? this.options.disabledText : this.options.placeholder,
                i = this.hasFocus ? this.options.placeholderColorBack : this.options.placeholderColor,
                s = (t || this.disabled) && this.options.placeholderColor || "#222",
                o = !(this._selectedItems.length && this.options.multiselect && this.options.hidePlaceholderOnSelected || this.input.value.length && !this.options.nativePlaceholder || t);
            this.options.nativePlaceholder || vk.a11y ? (hide(this.placeholder), this.input.setAttribute("placeholder", o ? e : "")) : (e !== this.placeholderTextPrev && (this.placeholderContent.innerHTML = e), i !== this.placeholderColorPrev && animate(this.placeholderContent, {
                color: i
            }, 200), s !== this.placeholderInputColorPrev && (this.input.style.color = s), o !== this.placeholderVisiblePrev && toggle(this.placeholder, o)), this.placeholderTextPrev = e, this.placeholderColorPrev = i, this.placeholderInputColorPrev = s, this.placeholderVisiblePrev = o
        }
    },
    handleKeyboardEvent: function(t) {
        var e = t.data.self;
        switch (t.type) {
            case "paste":
            case "cut":
            case "drop":
            case "input":
                clearTimeout(e.timeout), e.timeout = setTimeout(function() {
                    e.onChange()
                }, 0);
                break;
            case "keypress":
                if (t.which == KEY.RETURN && browser.opera && e.options.enableCustom && (e.options.multiCustom || null === e.select.selectedItem() || void 0 === e.select.selectedItem())) return e.select.hide(), e.options.noBlur ? isFunction(e.options.onChange) && (e.updateCustom(), e.options.onChange(e.resultField.value)) : e.input.blur(), !1;
                if (t.which == KEY.SPACE || t.which > 40 && !t.metaKey) {
                    if ((e.readOnly || e.disabled) && vk.a11y) return;
                    clearTimeout(e.timeout), e.timeout = setTimeout(function() {
                        e.onChange()
                    }, 0)
                }
                break;
            case "keydown":
                switch (e.options.addCustomTokenOnKeys && inArray(t.which, e.options.addCustomTokenOnKeys) && (t.keyCode = KEY.RETURN), t.keyCode) {
                    case KEY.DOWN:
                        if (!e.select.isVisible()) return setTimeout(e.showDefaultList.bind(e), 0), !1;
                        break;
                    case KEY.DEL:
                        if (e.input.value.length > 0) clearTimeout(e.timeout), e.timeout = setTimeout(e.onChange.bind(e), 0);
                        else {
                            if (e.selectedTokenId) {
                                for (var i = 0, s = e._selectedItems.length - 2; s >= 0; s--) e._selectedItems[s][0] == e.selectedTokenId && e._selectedItems[s + 1] && (i = e._selectedItems[s + 1][0]);
                                e.removeTagData(e.selectedTokenId), i ? e.selectToken(i) : e.readOnly || setTimeout(function() {
                                    e.input.focus()
                                }, 0)
                            } else e.hasFocus && e._selectedItems.length && e.selectToken(e._selectedItems[e._selectedItems.length - 1][0]);
                            cancelEvent(t)
                        }
                        return !0;
                    case KEY.RETURN:
                        if (!browser.opera && e.options.enableCustom && (e.options.multiCustom || null === e.select.selectedItem() || void 0 === e.select.selectedItem())) return e.select.hide(), e.options.noBlur ? isFunction(e.options.onChange) && (e.updateCustom(), e.options.onChange(e.resultField.value)) : e.input.blur(), !1;
                        break;
                    case KEY.ESC:
                        e.input.blur()
                }
                break;
            case "focus":
                if (e.disabled || e.select.isVisible() || e.focusSelf || vk.a11y || e.showDefaultList(), e.focusSelf = !1, (e.disabled || e.readOnly) && !vk.a11y) return e.input.blur(), !0;
                0 != e._selectedItems.length && !e.options.multiselect || e.options.enableCustom || (browser.mozilla ? setTimeout(function() {
                    e.input.value = ""
                }, 0) : e.input.value = ""), addClass(e.input, "focused"), e.input.style.color = "#222", e.hasFocus++, e.updatePlaceholder();
                break;
            case "blur":
                if (isFunction(e.options.chooseFirst) && e.options.chooseFirst(e.input.value)) return e.select.active = 0, isFunction(e.select.options.onItemSelect) && e.select.options.onItemSelect(e.select.selectedItem(), void 0, !0), cancelEvent(t);
                if (e.readOnly) return !0;
                if (vk.a11y && e.select.isVisible()) return;
                e.disabled || (e.updateCustom(), clearTimeout(e.requestTimeout), e.changeAfterBlur && isFunction(e.options.onChange) && (e.options.enableCustom && e._selectedItems.length || e.options.onChange(""), e.changeAfterBlur = !1), e.options.onBlur && e.options.onBlur()), removeClass(e.input, "focused"), e.hasFocus = 0, e.updatePlaceholder()
        }
        return !0
    },
    updateCustom: function(t) {
        var e = this;
        if (e.options.enableCustom && (e.input.value.length || t && t.length)) {
            var i = e.input.value || t;
            if (0 == e._selectedItems.length || e.options.multiCustom) {
                var s = !0,
                    o = !1;
                if (e.options.multiCustom) {
                    i = i.split(e.options.selectedItemsDelimiter), i.length > 1 && (o = i.slice(1).join(e.options.selectedItemsDelimiter)), i = trim(i[0]);
                    for (var n = 0, a = this._selectedItems.length; a > n; n++)
                        if (this._selectedItems[n][1] == i) {
                            s = !1;
                            break
                        }
                }
                s && (e.resultField.value = parseInt(!e.options.valueForCustom), e.customField.value = i, e.options.valueIsCustom ? e._selectItem([i, i], !0, !0) : (e._selectItem([e.options.valueForCustom, i], !0, !0), e.options.multiCustom && this.options.valueForCustom--)), o && e.updateCustom(o)
            }
        } else 0 == e._selectedItems.length ? e.input.value = "" : e.options.multiselect && (e.input.value = "");
        e.updatePlaceholder()
    },
    handleKeyboardEventOutside: function(t) {
        var e;
        if (this.disabled || this.input.value.length > 0 && this.hasFocus || !this.hasFocus && 0 == this.selectedTokenId) return !0;
        switch (t.keyCode) {
            case KEY.RETURN:
                return !1;
            case KEY.LEFT:
                for (e = this._selectedItems.length - 1; e >= 0; e--)
                    if (!this.selectedTokenId || this._selectedItems[e][0] == this.selectedTokenId && e > 0) {
                        this.selectedTokenId && e--, this.selectToken(this._selectedItems[e][0]), this.input.blur();
                        break
                    }
                return !1;
            case KEY.RIGHT:
                for (e = 0; e < this._selectedItems.length; e++)
                    if (this._selectedItems[e][0] == this.selectedTokenId) {
                        e < this._selectedItems.length - 1 ? (this.selectToken(this._selectedItems[e + 1][0]), this.input.blur()) : this.readOnly || (this.deselectTokens(), this.input.focus());
                        break
                    }
                return !1
        }
        return !0
    },
    onInputClick: function(t) {
        var e = t.data.self;
        e.disabled || (e.deselectTokens(), e.select.isVisible() ? e.input.readOnly ? (e.focusSelf = !0, e.select.toggle()) : e.onChange() : e.showDefaultList(), e.readOnly ? e.input.blur() : e.input.focus())
    },
    highlightInput: function(t) {
        t ? addClass(this.container, "selector_focused") : removeClass(this.container, "selector_focused")
    },
    selectToken: function(t) {
        this.options.multiselect && this.options.selectable && (this.select.hide(), removeClass(ge("bit_" + this.guid + "_" + this.selectedTokenId), "token_selected"), addClass(ge("bit_" + this.guid + "_" + t), "token_selected"), this.selectedTokenId = t, isFunction(this.options.onTokenSelected) && this.options.onTokenSelected(t), this.showImage(t))
    },
    deselectTokens: function() {
        this.selectedTokenId && this.options.multiselect && this.options.selectable && (removeClass(ge("bit_" + this.guid + "_" + this.selectedTokenId), "token_selected"), this.selectedTokenId = 0, isFunction(this.options.onTokenSelected) && this.options.onTokenSelected(), this.showImage())
    },
    _blur: function() {
        this.select.hide()
    },
    showImage: function(t, e) {
        if (!this.options.imageId) return !1;
        var i = ge(this.options.imageId);
        if (!i) return !1;
        if (void 0 === e) {
            t || (t = this.resultField.value.split(this.options.selectedItemsDelimiter)[0]);
            var s = this._selectedItems.concat(this.currenDataItems);
            if (s && s.length)
                for (var o in s)
                    if (s[o] && s[o][0] == t) {
                        e = s[o];
                        break
                    }
        }
        return void 0 !== e && "string" == typeof e[3] && e[3].length ? "none" == e[3] ? i.style.display = "none" : (i.style.display = "", i.setAttribute("src", e[3]), i.parentNode.href = "/" + this.options.hrefPrefix + e[0], removeEvent(i.parentNode, "click")) : (i.style.display = "", i.setAttribute("src", this.options.noImageSrc), i.parentNode.href = "#", addEvent(i.parentNode, "click", function() {
            return !0
        })), !0
    },
    _selectItem: function(t, e, i) {
        if (null !== t && void 0 !== t) {
            void 0 === e && (e = !0);
            var s;
            if (-2e9 == t) s = [this.curTerm, this.curTerm, getLang("mail_enter_email_address"), "/images/pics/contact_info.png", 0, ""];
            else if ("string" == typeof t && -1 != t.indexOf("@")) s = [t, t, getLang("mail_enter_email_address"), "/images/pics/contact_info.png", 0, ""];
            else if ("object" == typeof t) s = t;
            else {
                var o = [];
                each([this.dataItems, this.options.defaultItems, this.receivedData], function(t, e) {
                    e && e.length && (o = o.concat(e))
                });
                for (var n in o)
                    if (o[n][0] == t || o[n] == t) {
                        s = o[n];
                        break
                    }
            }
            if ("object" != typeof s && (s = [t, t]), s[0] = s[0].toString(), s[1] = s[1].toString(), this.changeAfterBlur = !1, s[0] === this.resultField.value) return this.options.multiselect || (this.input.value = winToUtf(stripHTML(s[1])), this.showImage(), (this.input.value.length || !this.options.placeholder) && addClass(this.input, "selected"), this.updatePlaceholder()), this._ariaRestoreFocus(), void this.select.hide();
            if (this._selectedItems.length >= this.options.maxItems) return void this.select.hide();
            this.deselectTokens(), this.addTagData(s), this.showImage(), this.options.multiselect ? (this.input.value = "", this.dataURL ? this.select.clear() : this.select.removeItem(s[0])) : (this.input.value = "0" == s[0] && s[1] == this.options.placeholder ? "" : winToUtf(stripHTML(s[1])), addClass(this.input, "selected"), this.updatePlaceholder()), this.select.hide(), this.updateInput(), i && this.options.multiselect && !this.readOnly ? setTimeout(function() {
                this.options.multinostop || (this.focusSelf = !0), hide(this.input), show(this.input), this.input.focus()
            }.bind(this), 100) : this.options.noBlur || this.input.blur(), e && (this.options.multiselect && isFunction(this.options.onTagAdd) && this.options.onTagAdd(s, this.resultField.value), isFunction(this.options.onChange) && this.options.onChange(this.resultField.value, s)), this._updateOptionsAriaSelected(!0), this._ariaRestoreFocus()
        }
    },
    addTagData: function(t) {
        if (t && !(t.length < 2)) {
            if (!this.options.multiselect) return this._selectedItems.splice(0, this._selectedItems.length, t), void(this.resultField.value = t[0]);
            for (var e in this._selectedItems)
                if (this._selectedItems[e][0] == t[0]) return void this.selectToken(this._selectedItems[e][0]);
            this._selectedItems.push(t);
            var i = [];
            for (e in this._selectedItems) i.push(this._selectedItems[e][0]);
            this.resultField.value = i.join(this.options.selectedItemsDelimiter), this.input.style.width = "1px";
            var s = ce("div", {
                id: "bit_" + this.guid + "_" + t[0],
                className: "token"
            });
            s.setAttribute("data-id", t[0]);
            var o, n = Math.max(this.selector.clientWidth, getSize(s)[0]),
                a = this;
            o = this.options.tokenPrefix ? '<span class="token_prefix">' + this.options.tokenPrefix + "</span>" : "<span></span>";
            var l = clean(stripHTML(t[1])),
                r = clean(getLang("global_delete")) + " " + l,
                h = vk.a11y ? ' tabindex="0" aria-label="' + r + '" ' : "";
            s.innerHTML = o + '<span class="token_inner"><span class="x" role="button"' + h + '></span><span class="l"><span class="lc">' + l + "</span>" + (t[5] ? t[5] : "") + "</span>", vk.a11y && (attr(s, "tabindex", -1), attr(s, "role", "option")), addEvent(s, "click", function(e) {
                return isFunction(a.options.onTokenClick) && a.options.onTokenClick(s.getAttribute("data-id"), e), a.selectToken(t[0]), !1
            }), addEvent(s, "dblclick", function() {
                return t[4] && (a.removeTagData(s.getAttribute("data-id")), each(t[4], function(t, e) {
                    a._selectItem(e, !1)
                })), !1
            }), addEvent(s, "mouseover", function(e) {
                addClass(s, "token_hover"), a.showImage(s.getAttribute("data-id"), t), isFunction(a.options.onTokenMouseOver) && a.options.onTokenMouseOver(s.getAttribute("data-id"), e)
            }), addEvent(s, "mouseout", function(t) {
                removeClass(s, "token_hover"), a.showImage(a.activeItemValue ? a.activeItemValue : a.selectedTokenId), isFunction(a.options.onTokenMouseOut) && a.options.onTokenMouseOut(s.getAttribute("data-id"), t)
            });
            var d = s.firstChild.nextSibling.firstChild;
            addEvent(d, "mousedown", function() {
                return a.select.hide(), a.removeTagData(s.getAttribute("data-id")), !a.readOnly && a.hasFocus && a.input.focus(), !1
            }), a.selectedItemsContainer.appendChild(s);
            for (var c = s.firstChild.nextSibling.firstChild.nextSibling, u = c.innerHTML; s.offsetWidth > n && u.length > 3;) u = u.substr(0, u.length - 2), c.innerHTML = u + "...";
            return this.options.limitedListHeight && (this.selectedItemsContainerWrap.style.display = "none", this.selectedItemsContainerWrap.offsetHeight, this.selectedItemsContainerWrap.style.display = "block", this.updateSelectedItemsScroll({
                target: this.selectedItemsContainer
            }), animate(this.selectedItemsContainer, {
                scrollTop: this.selectedItemsContainer.scrollHeight
            })), s
        }
    },
    removeTagData: function(t) {
        this.selectedTokenId = 0;
        var e = ge("bit_" + this.guid + "_" + t);
        if (!e) return !1;
        var s = e.firstChild.nextSibling.firstChild;
        vk.al && cleanElems(e, s), e.parentNode.removeChild(e);
        var o, n = [];
        for (i in this._selectedItems) this._selectedItems[i][0] != t ? n.push(this._selectedItems[i][0]) : o = i;
        return void 0 == o ? !1 : (this.resultField.value = n.join(this.options.selectedItemsDelimiter), isFunction(this.options.onTagRemove) && this.options.onTagRemove(this._selectedItems[o], this.resultField.value), isFunction(this.options.onChange) && this.options.onChange(this.resultField.value), this._selectedItems.splice(o, 1), this.options.multiselect && (this.defaultList = !1), this.showImage(), this.updateInput(), this.options.limitedListHeight && (this.selectedItemsContainerWrap.style.display = "none", this.selectedItemsContainerWrap.offsetHeight, this.selectedItemsContainerWrap.style.display = "block", this.updateSelectedItemsScroll({
            target: this.selectedItemsContainer
        })), this._updateOptionsAriaSelected(!0), !1)
    },
    replaceTagID: function(t, e) {
        for (var i in this._selectedItems)
            if (this._selectedItems[i][0] == t) {
                this._selectedItems[i][0] = e;
                var s = [];
                for (i in this._selectedItems) s.push(this._selectedItems[i][0]);
                this.resultField.value = s.join(this.options.selectedItemsDelimiter);
                var o = ge("bit_" + this.guid + "_" + t);
                return o.setAttribute("id", "bit_" + this.guid + "_" + e), o.setAttribute("data-id", e), o
            }
    },
    replaceTagText: function(t, e) {
        for (var i in this._selectedItems)
            if (this._selectedItems[i][0] == t) {
                this._selectedItems[i][1] = e;
                var s = ge("bit_" + this.guid + "_" + t),
                    o = geByClass1("lc", s);
                o.innerHTML = clean(stripHTML(e));
                break
            }
        this.selectedItemsContainerWrap.style.display = "none", this.selectedItemsContainerWrap.offsetHeight, this.selectedItemsContainerWrap.style.display = "block", this.updateSelectedItemsScroll({
            target: this.selectedItemsContainer
        })
    },
    highlightTag: function(t) {
        var e = ge("bit_" + this.guid + "_" + t);
        return e ? (animate(this.selectedItemsContainer, {
            scrollTop: e.offsetTop - this.selectedItemsContainer.clientHeight / 2
        }), removeClass(e, "long_transition"), addClass(e, "highlighted"), void setTimeout(function() {
            addClass(e, "long_transition"), removeClass(e, "highlighted"), setTimeout(removeClass.pbind(e, "long_transition"), 2100)
        }, 1e3)) : !1
    },
    onChange: function() {
        var t = trim(this.input.value.toLowerCase());
        if (this.options.multiselect || (this._selectedItems.length && (this.changeAfterBlur = !0), this._clear()), this.updatePlaceholder(), clearTimeout(this.requestTimeout), 0 == t.length) return void this.showDefaultList();
        this.curTerm = t;
        var e, i = isFunction(this.options.customSearch) && this.options.customSearch(t);
        return i ? void this.receiveData(t, i) : void(this.dataURL ? (e = this.cache.getData(t), null === e ? this.requestTimeout = setTimeout(function() {
            this.request(this.receiveData.bind(this), this.showNoDataList.bind(this))
        }.bind(this), 300) : e && e.length ? this.receiveData(t, e) : this.showNoDataList()) : (e = this.indexer.search(t), e && e.length ? this.receiveData(t, e) : this.showNoDataList()))
    },
    showNoDataList: function() {
        (this.hasFocus || this.readOnly) && (this._showSelectList(this.options.noResult), this.defaultList = !1)
    },
    showDefaultList: function() {
        var t = hasClass(this.container, "reverse"),
            e = this.needsReverse();
        if (t != e && (this.currenDataItems && this.setSelectContent(this.currenDataText || "", this.currenDataItems), toggleClass(this.container, "reverse", e), t = e), this.defaultList && this.select.hasItems()) this.options.multiselect || !this._selectedItems.length ? this.select.show() : this.select.show(this._selectedItems[0][0]);
        else {
            this.defaultList = !0;
            var i = null;
            this._showSelectList(i, this.options.defaultItems.length || this.options.zeroDefault ? this.options.defaultItems : this.dataItems)
        }
        t ? (!this._selectedItems.length, setStyle(this.resultList, {
            bottom: getSize(this.container)[1] - 1
        })) : setStyle(this.resultList, {
            bottom: "auto"
        })
    },
    showDataList: function(t, e) {
        this.defaultList = !1, this._showSelectList(null, t, e)
    },
    needsReverse: function() {
        var t, e = window.scrollGetY ? scrollGetY() : getScroll()[1],
            i = getXY(this.container)[1] || 0,
            s = getSize(this.container)[1] || 22,
            o = this.options.height || 250,
            n = this.options.minHeight || 0,
            a = (window.pageNode && window.browser.mozilla ? Math.min(getSize(pageNode)[1], window.lastWindowHeight) : window.lastWindowHeight) || getScroll()[3],
            l = this.resultList && this.resultList.firstChild;
        if (l && l.firstChild) {
            var r = getStyle(this.resultList, "display"),
                h = getStyle(this.resultList, "visibility");
            setStyle(this.resultList, {
                visibility: "hidden",
                display: "block"
            }), t = getSize(this.resultList)[1], setStyle(this.resultList, {
                visibility: h,
                display: r
            })
        } else t = n ? n : this.currenDataItems ? this.currenDataItems.length * getSize(this.container)[1] : o;
        return t > o && (t = o), i + s + t - e > a && i - t - e > 0 && i - t > 40
    },
    setSelectContent: function(t, e, i) {
        e = isArray(e) && e.length ? e : [];
        var s = [];
        this.select.clear(), t && s.push(["", t, !0]);
        var o;
        if (e.length) {
            for (o in e) "object" != typeof e[o] && (e[o] = [e[o], e[o]]);
            if (this.options.multiselect && (e = this.filterData(e)), "smart" == this.options.dividingLine) {
                removeClass(this.resultList, "dividing_line");
                for (o in e) "string" == typeof e[o][2] && e[o][2].length && addClass(this.resultList, "dividing_line")
            }
            var n = this.options.autocomplete && i ? this.options.maxItemsShown(i.length) : e.length,
                a = this;
            for (o = 0; o < e.length; ++o) {
                var l = e[o];
                if (!n) break;
                var r = a.options.formatResult(l);
                if (i && (r = a.options.highlight(r, i)) && --n, r) {
                    var h = [l[0], r];
                    h.push("1" === l[5]), "label" === l[3] && h.push(1), s.push(h)
                }
            }
        }
        t && s.length > 1 && (s = s.slice(1)), this.select.content(s)
    },
    _showSelectList: function(t, e, i) {
        return this.currenDataItems = e, this.currenDataText = t, this.setSelectContent(t, e, i), this.select.hasItems() ? this.options.multiselect || !this._selectedItems.length ? this.select.show() : this.select.show(this._selectedItems[0][0]) : this.select.hide(), this._updateOptionsAriaSelected(!1), !0
    },
    receiveData: function(t, e) {
        t == this.curTerm && ("" !== t && e && e.length && this.hasFocus ? (this.receivedData = e, this.showDataList(e, t)) : this.select.hide())
    },
    filterData: function(t) {
        var e = [],
            i = this;
        return each(t, function(t) {
            for (var s in i._selectedItems)
                if (this[0] == i._selectedItems[s][0]) return;
            e.push(this)
        }), e
    },
    request: function(success, failure) {
        if (this.dataURL) {
            var term = trim(this.input.value.toLowerCase()),
                self = this;
            if (0 != term.length)
                if (this.options.al) ajax.post(this.dataURL, {
                    str: term
                }, {
                    onDone: function(t) {
                        self.options.onData && self.options.onData(t), self.cache.setData(term, t), t.length ? isFunction(success) && success(term, t) : isFunction(failure) && failure(term)
                    },
                    onFail: function() {
                        self.cache.setData(term, []), isFunction(failure) && failure(term)
                    },
                    showProgress: show.pbind(this.options.progressBar),
                    hideProgress: hide.pbind(this.options.progressBar)
                });
                else {
                    var sep = -1 == this.dataURL.indexOf("?") ? "?" : "&",
                        url = this.dataURL + sep + "str=" + encodeURIComponent(term),
                        done = function(data) {
                            self.options.progressBar && hide(self.options.progressBar);
                            try {
                                data = eval("(" + data + ")")
                            } catch (e) {}
                            data.length ? (self.cache.setData(term, data), isFunction(success) && success(term, data)) : (self.cache.setData(term, []), isFunction(failure) && failure(term))
                        };
                    if (vk.al) ajax.plainpost(url, {}, done);
                    else {
                        var aj = new Ajax(function(t, e) {
                            done(e)
                        });
                        aj.post(url)
                    }
                    this.options.progressBar && show(this.options.progressBar)
                }
        }
    },
    doSort: function(t) {
        var e, i, s;
        if (t.length && !(t.length < 2))
            for (e = 0; e < t.length - 1; e++)
                for (i = e + 1; i < t.length; i++) t[e][1] > t[i][1] && (s = t[e], t[e] = t[i], t[i] = s)
    },
    disable: function(t) {
        if (t && !this.disabled) {
            this.disabled = !0, addClass(this.container, "disabled");
            var e = getSize(this.container);
            this.options.disabledText && (this.input.value = ""), this.container.appendChild(ce("div", {
                className: "hide_mask"
            }, {
                position: "absolute",
                background: "#000",
                width: e[0] + "px",
                height: e[1] + "px",
                marginTop: -e[1] + "px",
                opacity: "0"
            })), this.input.blur(), this.input.style.color = "", this.select.hide()
        } else !t && this.disabled && (this.disabled = !1, this.options.autocomplete && (this.input.value = ""), removeClass(this.container, "disabled"), this.container.removeChild(geByClass("hide_mask", this.container)[0]));
        this.updatePlaceholder()
    },
    _clear: function() {
        return this.showImage(), this.options.multiselect && (this.selectedTokenId = 0, this.selectedItemsContainer.innerHTML = "", this.defaultList = !1), this.options.multiselect || this.options.autocomplete ? (removeClass(this.input, "selected"), this.resultField.value = "", this._selectedItems.splice(0, this._selectedItems.length)) : this._selectedItems[0] != this.options.defaultItems[0] && this._selectItem(this.options.defaultItems[0], !1), !1
    },
    setURL: function(t) {
        "string" == typeof t && (this.dataURL = t, this.cache ? this.cache.flush() : this.cache = new Cache(this.options), this.indexer && delete this.indexer, this.dataItems = [])
    },
    setData: function(t) {
        if (isArray(t)) {
            if (this.options.autocomplete) this.dataItems = t, this.dataURL = null;
            else if (this.select.clear(), this.options.defaultItems = t, !this.options.multiselect)
                if (!this._selectedItems.length && this.options.defaultItems.length) this._selectItem(this.options.defaultItems[0], !1);
                else if (this._selectedItems.length) {
                var e = !1;
                for (var i in this.options.defaultItems) {
                    var s = this.options.defaultItems[i][0] || this.options.defaultItems[i];
                    if (s == this._selectedItems[0][0] || s == this._selectedItems[0][0]) {
                        e = !0;
                        break
                    }
                }
                e ? this._selectItem(this._selectedItems[0][0], !1) : this._selectItem(this.options.defaultItems[0], !1)
            }
            this.indexer ? this.indexer.setData(t) : this.indexer = new Indexer(t), this.cache && delete this.cache
        }
    },
    focus: function() {
        this.readOnly || setTimeout(elfocus.pbind(this.input), 0)
    },
    selectItem: function(t, e) {
        this._selectItem(t, e)
    },
    setOptions: function(t) {
        if (t = this.prepareOptionsText(t), extend(this.options, t), "maxItems" in t && this.options.maxItems >= 0)
            for (var e = this._selectedItems.length - 1; e >= this.options.maxItems; e--) this.removeTagData(this._selectedItems[e][0]);
        if ("defaultItems" in t && (this.select.clear(), this.select.isVisible(this.container) && this.showDefaultList()), "enableCustom" in t && this.options.enableCustom && !this.options.autocomplete && (this.options.autocomplete = t.autocomplete = !0), "width" in t && (this.container.style.width = this.resultList.style.width = this.options.width + "px", this.selectorWidth = this.options.width - this.scrollbarWidth), "dropdown" in t) {
            var i = geByClass("selector_dropdown", this.container)[0];
            !this.options.dropdown && i ? (this.destroyDropdown(), i.parentNode.removeChild(i)) : !i && this.options.dropdown && (i = this.container.firstChild.rows[0].insertCell(1), i.id = "dropdown" + this.guid, i.className = "selector_dropdown", i.innerHTML = "&nbsp;", this.dropdownButton = i, this.initDropdown(), this.initDropdownEvents())
        }
        "autocomplete" in t && (this.options.autocomplete ? (removeClass(this.container, "dropdown_container"), this.input.readOnly = !1, this.readOnly = "") : (addClass(this.container, "dropdown_container"), this.input.readOnly = !0, this.options.enableCustom = !1, this.readOnly = 'readonly="true"')), ("width" in t || "autocomplete" in t || "dropdown" in t || "placeholder" in t || "disabledText" in t) && this.updateInput()
    },
    val: function(t, e) {
        return void 0 !== t && this._selectItem(t, void 0 === e ? !1 : e), this.resultField.value
    },
    val_full: function() {
        return this.options.multiselect ? this._selectedItems : this._selectedItems.length ? this._selectedItems[0] : [this.resultField.value, this.input.value]
    },
    customVal: function(t, e) {
        return void 0 !== t && (this.customField.value = t, this.selectItem([this.options.valueForCustom, t], void 0 === e ? !1 : e)), this.customField.value
    },
    selectedItems: function() {
        return this._selectedItems
    },
    clear: function() {
        this._clear(), this.input.value = "", this.updateInput()
    },
    _initAria: function() {
        vk.a11y && (this.options.noBlur = !0, attr(this.input, "aria-owns", this.select.getListContainerId()), attr(this.input, "aria-controls", this.select.getListContainerId()), attr(this.input, "role", "combobox"), this.options.autocomplete ? attr(this.input, "aria-autocomplete", "list") : attr(this.input, "aria-readonly", "true"), this._ariaMakeFocusAnchor())
    },
    _updateOptionsAriaSelected: function(t) {
        if (vk.a11y) {
            var e = this,
                i = domChildren(this.select.list),
                s = e.val().split(",");
            each(i, function() {
                if (~s.indexOf(this.getAttribute("val"))) {
                    if (this.setAttribute("aria-label", getLang("global_dropdown_aria_label_selected") + clean(this.textContent)), this.setAttribute("aria-selected", !0), !e.options.multiselect && !t) return !1
                } else t && (this.setAttribute("aria-selected", !1), this.setAttribute("aria-label", ""))
            })
        }
    },
    _ariaOnSelectHide: function() {
        vk.a11y && (this.val() || (this.input.value = "", this.updatePlaceholder()), attr(this.input, "aria-haspopup", !1))
    },
    _ariaOnSelectShow: function() {
        vk.a11y && attr(this.input, "aria-haspopup", !0)
    },
    _ariaRestoreFocus: function() {
        vk.a11y && this.ariaAnchor && this.ariaAnchor.focus()
    },
    _ariaMakeFocusAnchor: function() {
        var t = ce("span");
        addClass(t, "blind_label"), attr(t, "tabindex", -1), this.container.appendChild(t), this.ariaAnchor = t
    },
    _ariaOnItemActive: function(t) {
        vk.a11y && t && attr(this.input, "aria-activedescendant", t.id)
    }
}), createChildClass("Select", UiControl, {
    common: {
        _sel: window.Select && Select._sel || [],
        reg: function(t) {
            return this._sel.push(t), this._sel.length
        },
        destroy: function(t) {
            this._sel[t - 1] = !1
        },
        itemMouseMove: function(t, e, i) {
            this._sel[t - 1].onMouseMove(e, i)
        },
        itemMouseDown: function(t, e, i) {
            this._sel[t - 1].onMouseDown(e, i)
        }
    },
    CSS: {
        FIRST: "first",
        LAST: "last",
        ACTIVE: "active",
        SCROLLABLE: "result_list_scrollable",
        LABEL: "label"
    },
    controlName: "SelectList",
    initOptions: function(t, e) {
        this.options = e || {}
    },
    init: function(t, e) {
        this.container = t, this.active = -1, this.data = [], this.uid = this.common.reg(this), this.maxHeight = this.options.height ? this.options.height : 250
    },
    getListContainerId: function() {
        return "list_options_container_" + this.uid
    },
    initDOM: function() {
        this.list = ce("ul"), this.list.id = this.getListContainerId(), this._initAriaDom(), this.container.appendChild(this.list)
    },
    _initAriaDom: function() {
        vk.a11y && (this.list.setAttribute("role", "listbox"), this.list.setAttribute("tabindex", "-1"))
    },
    show: function(t) {
        var e = isVisible(this.container);
        e || this.performShow();
        var i, s;
        if (t) {
            for (s = 0; s < this.list.childNodes.length; s++)
                if (i = this.list.childNodes[s], i.getAttribute("val") == t) {
                    this.highlight(s, i, !0);
                    break
                }
        } else if (this.options.selectFirst) {
            var o, n = !1;
            for (s = 0; s < this.list.childNodes.length; s++)
                if (o = n ? this.list.childNodes.length - 1 - s : s, i = this.list.childNodes[o], !i.getAttribute("dis")) {
                    this.highlight(o, i);
                    break
                }
        }!e && isFunction(this.options.onShow) && this.options.onShow(), this._ariaOnShow()
    },
    hide: function() {
        isVisible(this.container) && (hide(this.container), isFunction(this.options.onHide) && this.options.onHide(), this.highlight(-1), isFunction(this.options.onItemActive) && this.options.onItemActive(), this._ariaOnHide())
    },
    handleKeyEvent: function(t) {
        if (!isVisible(this.container)) return !0;
        switch (t.keyCode) {
            case KEY.UP:
                return this.movePosition(-1), cancelEvent(t);
            case KEY.DOWN:
                return this.movePosition(1), cancelEvent(t);
            case KEY.TAB:
                this.hide();
                break;
            case KEY.RETURN:
                return isFunction(this.options.onItemSelect) && this.active > -1 && this.options.onItemSelect(this.selectedItem(), void 0, !0), cancelEvent(t), !1;
            case KEY.ESC:
                return isFunction(this.options.onEsc) && this.options.onEsc(), this.hide(), !1;
            case KEY.PAGEUP:
            case KEY.PAGEDOWN:
                return !1
        }
        return !0
    },
    _doQuickSearch: function(t) {
        var e = String.fromCharCode(t.keyCode || t.charCode).toLowerCase(),
            i = this.list.childNodes,
            s = this;
        if (e) {
            this.currSearchStr = this.currSearchStr || "", s.quickSearchTimer && clearTimeout(s.quickSearchTimer), s.quickSearchTimer = setTimeout(function() {
                s.currSearchStr = ""
            }, 1e3), this.currQuickSearchIndex = this.currQuickSearchIndex || 0, this.currQuickSearchChar != e && (this.currQuickSearchIndex = 0, this.currQuickSearchChar = e), this.currSearchStr += e;
            for (var o = this.currQuickSearchIndex; o < i.length; o++) {
                var n = i[o].innerHTML.toLowerCase();
                if (0 == n.indexOf(this.currSearchStr)) {
                    this.currQuickSearchIndex = o + 1, this.currQuickSearchPreventMouseMove = !0, setTimeout(function() {
                        s.currQuickSearchPreventMouseMove = !1
                    }, 1500), this.highlight(o, i[o]);
                    break
                }
                o == i.length - 1 && (this.currQuickSearchIndex = 0)
            }
        }
    },
    clear: function() {
        this.highlight(-1), this.list.innerHTML = "", this.updateContainer()
    },
    destroy: function() {
        this.clear(), Select.destroy(this.uid)
    },
    selectedItem: function() {
        if (this.active >= 0) {
            var t = this.list.childNodes[this.active],
                e = t.getAttribute("val") || t.innerHTML;
            return e
        }
    },
    movePosition: function(t) {
        var e = intval(this.active) + intval(t);
        for (0 > e ? this.container.scrollTop = 0 : e + 1 > this.list.childNodes.length && (this.container.scrollTop = this.list.offsetTop + this.list.offsetHeight - this.container.offsetHeight);;) {
            if (e + 1 > this.list.childNodes.length || 0 > e) {
                if (this.options.cycle) break;
                return !1
            }
            var i = this.list.childNodes[e];
            if (i && !i.getAttribute("dis")) break;
            e++
        }
        return this.highlight(e, this.list.childNodes[e]), !0
    },
    highlight: function(t, e, i) {
        return -1 != this.active && removeClass(this.list.childNodes[this.active], this.CSS.ACTIVE), e ? (this.active = t, addClass(e, this.CSS.ACTIVE), isFunction(this.options.onItemActive) && this.options.onItemActive(e.getAttribute("val") || e.innerHTML, e), e.offsetTop + e.offsetHeight + this.list.offsetTop > this.container.offsetHeight + this.container.scrollTop - 1 ? this.container.scrollTop = e.offsetTop + this.list.offsetTop + e.offsetHeight - this.container.offsetHeight + 1 : e.offsetTop + this.list.offsetTop < this.container.scrollTop && (this.container.scrollTop = e.offsetTop + this.list.offsetTop), i && (this.container.scrollTop = e.offsetTop - this.container.offsetHeight / 2), void this._ariaFocusOnActiveItem(e)) : void(this.active = -1)
    },
    onMouseMove: function(t, e) {
        return this.currQuickSearchPreventMouseMove ? !1 : hasClass(e, "active") ? !1 : (this.highlight(t, e), !0)
    },
    onMouseDown: function(t, e) {
        var i = e.getAttribute("val") || e.innerHTML;
        isFunction(this.options.onItemSelect) && this.options.onItemSelect(i, void 0, !0), this.hide()
    },
    updateContainer: function() {
        this.container && hasClass(this.container, "reverse");
        this.maxHeight < this.list.offsetHeight ? (this.container.style.height = this.maxHeight + "px", addClass(this.container, this.CSS.SCROLLABLE)) : (removeClass(this.container, this.CSS.SCROLLABLE), this.container.style.height = "auto")
    },
    content: function(t) {
        var e, i, s, o, n, a, l, r, h, d = [],
            c = t.length;
        for (e = 0; c > e; ++e) i = t[e], s = i[0], o = i[1], n = i[2], a = i[3], l = this.uid + ", " + e, h = this._getOptionId(e), s = void 0 === s || null === s ? "" : s.toString(), o = (void 0 === o || null === o ? "" : o.toString()) || s, r = 1 === a, d.push("<li ", n ? 'dis="1"' : 'onmousemove="Select.itemMouseMove(' + l + ', this)" onmousedown="Select.itemMouseDown(' + l + ', this)" onclick="Select.itemMouseDown(' + l + ', this)"', ' val="', s.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), '" class="', r ? this.CSS.LABEL + " " : "", n ? "disabled " : "", e == c - 1 ? this.CSS.LAST + " " : "", (e ? "" : this.CSS.FIRST) + '" role="option" aria-selected="false" tabindex="-1" id="' + h + '">', o, "</li>");
        return this.list.innerHTML = d.join(""), this.updateContainer(), !0
    },
    _getOptionId: function(t) {
        return "option_" + this.getListContainerId() + "_" + (t + 1)
    },
    removeItem: function(t) {
        var e, i, s = this.list.childNodes,
            o = s.length;
        if (t !== e) {
            for (i = 0; o > i; ++i) {
                var n = s[i];
                if (n.getAttribute("val") == t || n.innerHTML == t) {
                    n.setAttribute("dis", "1"), hide(n);
                    break
                }
            }
            for (i = 0; o > i; ++i)
                if (isVisible(s[i])) {
                    addClass(s[i], this.CSS.FIRST);
                    break
                }
            for (i = o; i > 0; --i)
                if (isVisible(s[i - 1])) {
                    addClass(s[i - 1], this.CSS.LAST);
                    break
                }
            this.updateContainer()
        }
    },
    performShow: function() {
        this.list.style.position = "absolute", this.list.style.visibility = "hidden", show(this.container), this.updateContainer(), this.list.style.position = "relative", this.list.style.visibility = "visible"
    },
    isVisible: function() {
        return isVisible(this.container)
    },
    hasItems: function() {
        return this.list.childNodes.length > 0
    },
    toggle: function() {
        this.isVisible(this.container) ? this.hide() : this.show()
    },
    _ariaFocusOnActiveItem: function(t) {
        vk.a11y && !this.options.forAutocomplete && t && t.focus()
    },
    _ariaOnShow: function() {
        vk.a11y && this.list && attr(this.list, "aria-expanded", !0)
    },
    _ariaOnHide: function() {
        vk.a11y && this.list && attr(this.list, "aria-expanded", !1)
    }
}), createChildClass("Checkbox", UiControl, {
    CSS: {
        STANDART: "checkbox_"
    },
    defaultOptions: {
        checkedValue: 1,
        notCheckedValue: "",
        width: 300,
        containerClass: "",
        inline: !1,
        label: "checkbox"
    },
    beforeInit: function() {
        this.guid = _ui.reg(this)
    },
    controlName: "CheckBox",
    initOptions: function(t, e) {
        return t ? (this.options = extend({}, this.defaultOptions, {
            checked: t.value,
            resultField: t.name || t.id || "checkbox"
        }, e), this.options.checked = intval(this.options.checked) ? !0 : !1, void(intval(this.options.width) > 0 ? this.options.width = intval(this.options.width) : "auto" === this.options.width || (this.options.width = this.defaultOptions.width))) : !1
    },
    init: function() {
        this.disabled = !1
    },
    initDOM: function(t, e) {
        this.container = ce("div", {
            id: "container" + this.guid,
            className: "checkbox_container" + (this.options.inline ? " inline" : "") + (this.options.containerClass ? " " + this.options.containerClass : ""),
            innerHTML: '<table cellpadding=0 cellspacing=0><tr><td class="checkbox"><div class="checkbox_off"></div></td><td class="checkbox_label">' + this.options.label + '<input type="hidden" name="' + this.options.resultField + '" id="' + this.options.resultField + '" value="' + (this.options.checked ? this.options.checkedValue : this.options.notCheckedValue) + '"></td></tr></table>'
        }, {
            width: isNumeric(this.options.width) ? this.options.width + "px" : "auto"
        }), t.parentNode.replaceChild(this.container, t), this.checkbox = geByClass("checkbox_off", this.container)[0], this.resultField = ge(this.options.resultField)
    },
    initEvents: function() {
        addEvent(this.container, "click mouseover mouseout", this.handleMouseEvent, !1, {
            self: this
        })
    },
    afterInit: function() {
        this.setState(this.options.checked, !1, !0)
    },
    destroy: function() {
        vk.al && !this.destroyed && (removeEvent(this.container, "click mouseover mouseout", this.handleMouseEvent), this.destroyed = !0)
    },
    show: function() {
        show(this.container)
    },
    hide: function() {
        hide(this.container)
    },
    handleMouseEvent: function(t) {
        "click" == t.type ? t.data.self.disabled || t.data.self.setState(!t.data.self.options.checked) : (t.data.self.is_over = "mouseover" == t.type, t.data.self.updateClass())
    },
    disable: function(t) {
        t && !this.disabled ? (this.disabled = !0, addClass(this.container, "disabled")) : !t && this.disabled && (this.disabled = !1, removeClass(this.container, "disabled"))
    },
    updateClass: function() {
        this.checkbox.className = "checkbox_" + (this.options.checked ? "on" : "off") + (this.is_over ? "_over" : "")
    },
    setState: function(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = !1), t = t ? !0 : !1, (this.options.checked != t || i) && (this.options.checked = t, this.updateClass(), this.resultField.value = this.options.checked ? this.options.checkedValue : this.options.notCheckedValue, e && isFunction(this.options.onChange) && this.options.onChange(this.resultField.value))
    },
    setOptions: function(t) {
        extend(this.options, t), ("checked" in t || "checkedValue" in t || "notCheckedValue" in t) && this.setState(this.options.checked, !1, !0)
    },
    checked: function(t) {
        return void 0 !== t && this.setState(t), this.options.checked
    },
    val: function() {
        return this.resultField.value
    }
}), window.Radiobutton || createChildClass("Radiobutton", UiControl, {
    common: {
        _radio_buttons: {},
        _callbacks: {},
        deselect: function(t) {
            if (t in this._radio_buttons)
                for (var e = 0; e < this._radio_buttons[t].length; ++e) this._radio_buttons[t][e].checked(!1)
        },
        select: function(t, e) {
            if (t in this._radio_buttons)
                for (var i = 0; i < this._radio_buttons[t].length; ++i)
                    if (this._radio_buttons[t][i].val() == e) return void this._radio_buttons[t][i].checked(!0)
        },
        val: function(t) {
            if (!(t in this._radio_buttons)) return null;
            for (var e = 0; e < this._radio_buttons[t].length; ++e)
                if (this._radio_buttons[t][e].checked()) return this._radio_buttons[t][e].val();
            return null
        },
        setChangeEvent: function(t, e) {
            isFunction(e) ? this._callbacks[t] = e : delete this._callbacks[t]
        },
        destroy: function(t) {
            for (; t in this._radio_buttons && this._radio_buttons[t].length;) this._radio_buttons[t][0].destroy()
        }
    },
    CSS: {
        STANDART: "radiobutton_",
        CONTAINER: "radiobtn_container"
    },
    defaultOptions: {
        checked: !1,
        width: 300,
        label: "radiobutton"
    },
    controlName: "Radiobutton",
    beforeInit: function() {
        this.guid = _ui.reg(this)
    },
    initOptions: function(t, e) {
        return t ? (this.options = extend({}, this.defaultOptions, {
            value: t.value,
            resultField: t.name || "radiobutton"
        }, e), this.options.checked = intval(this.options.checked) ? !0 : !1, void(this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width)) : !1
    },
    init: function() {
        this.disabled = !1, this.is_over = !1, this.inputName = this.options.resultField
    },
    initDOM: function(t, e) {
        this.container = ce("div", {
            id: "container" + this.guid,
            className: this.CSS.CONTAINER,
            innerHTML: '<table cellpadding=0 cellspacing=0><tr><td class="radiobtn"><div class="radiobtn_off"><div></div></div></td><td class="radiobtn_label">' + this.options.label + '<input type="radio" id="' + t.id + '" name="' + this.options.resultField + '" value="' + (this.options.checked ? 'checked="true"' : "") + '"></td></tr></table>'
        }, {
            width: this.options.width + "px"
        }), t.parentNode.replaceChild(this.container, t), this.radiobutton = geByClass("radiobtn_off", this.container)[0], this.resultField = this.container.getElementsByTagName("input")[0], this.resultField.value = this.options.value
    },
    initEvents: function() {
        this.handleMouseEventHandler = function(t) {
            this.handleMouseEvent(t)
        }.bind(this), addEvent(this.container, "click mouseover mouseout", this.handleMouseEventHandler, !1, {
            self: this
        })
    },
    afterInit: function() {
        isArray(this.common._radio_buttons[this.inputName]) || (this.common._radio_buttons[this.inputName] = []), this.common._radio_buttons[this.inputName].push(this), this.setState(this.options.checked, !1, !0)
    },
    destroy: function() {
        if (vk.al && !this.destroyed) {
            for (var t = 0; t < this.common._radio_buttons[this.inputName].length; ++t)
                if (this.common._radio_buttons[this.inputName][t] === this) {
                    this.common._radio_buttons[this.inputName].splice(t, 1);
                    break
                }
            this.common._radio_buttons[this.inputName].length || (delete this.common._radio_buttons[this.inputName], this.common.setChangeEvent(this.inputName)), removeEvent(this.container, "click mouseover mouseout", this.handleMouseEventHandler), this.destroyed = !0
        }
    },
    handleMouseEvent: function(t) {
        var e = t.data.self;
        "click" == t.type ? e.disabled || e.options.checked || e.setState(!0) : (e.is_over = "mouseover" == t.type && !this.disabled, e.updateClass())
    },
    disable: function(t) {
        t && !this.disabled ? (this.disabled = !0, addClass(this.container, "disabled")) : !t && this.disabled && (this.disabled = !1, removeClass(this.container, "disabled"))
    },
    updateClass: function() {
        this.radiobutton.className = "radiobtn_" + (this.options.checked ? "on" : "off") + (this.is_over ? "_over" : "")
    },
    setState: function(t, e, i) {
        void 0 === e && (e = !0), i = i || !1, t = t ? !0 : !1, (this.options.checked != t || i) && (t && this.common.deselect(this.inputName), this.options.checked = t, this.updateClass(), this.resultField.checked = t, e && (this.options.checked && isFunction(this.options.onSelect) && this.options.onSelect(this.resultField.value), isFunction(this.options.onChange) && this.options.onChange(this.resultField.value, t), t && isFunction(this.common._callbacks[this.inputName]) && this.common._callbacks[this.inputName](this.resultField.value)))
    },
    setOptions: function(t) {
        extend(this.options, t), "checked" in t && this.setState(this.options.checked, !1)
    },
    checked: function(t) {
        return void 0 !== t && this.setState(t), this.options.checked
    },
    val: function() {
        return this.resultField.value
    }
}), createChildClass("Autosize", UiControl, {
    common: {
        _autosize_helpers: null
    },
    CSS: {},
    defaultOptions: {
        height: 0,
        minHeight: 0,
        padding: 0,
        isTextArea: !1
    },
    controlName: "Autosize",
    beforeInit: function() {
        this.guid = _ui.reg(this), this.common._autosize_helpers && ge("autosize_helpers") || document.body.appendChild(this.common._autosize_helpers = ce("div", {
            id: "autosize_helpers"
        }, {
            position: "absolute",
            left: "-10000px",
            top: "-10000px"
        }))
    },
    initOptions: function(t, e) {
        this.options = extend({}, this.defaultOptions, e), this.options.checked = intval(this.options.checked) ? !0 : !1, this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width
    },
    init: function(t) {
        this.input = t, this.oldValue = "", this.oldHeight = 0, this.overflowAuto = !1
    },
    initDOM: function(t) {
        this.minHeight = positive(this.options.minHeight) || positive(getStyle(t, "height")), this.maxHeight = positive(this.options.height), this.fontSize = positive(getStyle(t, "fontSize"));
        var e = positive(getStyle(t, "width")),
            i = {
                wordWrap: "break-word",
                width: (0 > e ? 0 : e) + "px",
                fontFamily: getStyle(t, "fontFamily"),
                fontSize: this.fontSize + "px",
                lineHeight: getStyle(t, "lineHeight")
            };
        this.options.isTextArea && (i.boxSizing = getStyle(t, "boxSizing"), i.padding = getStyle(t, "padding")), 1 > e && (e = intval(getStyle(t, "width", !1))), this.defaultOptions.padding && (e -= 2 * this.defaultOptions.padding), this.common._autosize_helpers.appendChild(this.helper = ce(this.options.isTextArea ? "textarea" : "div", !1, i)), this.input.helper = this.helper, setStyle(this.input, "overflow", "hidden")
    },
    initEvents: function() {
        addEvent(this.input, "keydown keypress keyup", this.updateSize, !1, {
            self: this
        })
    },
    afterInit: function() {
        this.update()
    },
    updateSize: function(t) {
        var e, i = t.data.self,
            s = i.input.value;
        if ("keyup" != t.type && (13 != t.keyCode || t.ctrlKey || t.altKey || (s += "\n")), s != i.oldValue) {
            if (i.oldValue = s, i.options.isTextArea ? (i.helper.value = s, e = i.helper.scrollHeight + i.fontSize) : (i.helper.innerHTML = trim(replaceChars(s)).replace(/<br>$/, "<br>&nbsp;"), e = getSize(i.helper, !0)[1] + i.fontSize + 4), e = Math.max(e, i.minHeight), i.maxHeight > 0 && e > i.maxHeight) {
                if (e = i.maxHeight, !i.overflowAuto) {
                    if (browser.mozilla) var o = i.input.selectionStart;
                    i.overflowAuto = !0, setStyle(i.input, {
                        overflow: "auto",
                        overflowX: "hidden"
                    }), browser.mozilla && i.input.setSelectionRange(o, o), i.oldHeight = e
                }
            } else if (i.overflowAuto) {
                if (i.overflowAuto = !1, browser.mozilla) var o = i.input.selectionStart;
                i.input.style.overflow = "hidden", browser.mozilla && i.input.setSelectionRange(o, o)
            }(!i.options.preventEnter || 13 != t.keyCode || t.shiftKey) && i.oldHeight != e && (i.input.style.height = (i.oldHeight = e) + "px", i.options.onResize && i.options.onResize(e))
        }
    },
    update: function() {
        this.updateSize({
            data: {
                self: this
            }
        })
    }
}), createChildClass("DropdownMenu", UiControl, {
    common: {
        pageContainer: null
    },
    defaultOptions: {
        title: "Menu",
        hideOnClick: !0,
        showHover: !0,
        updateTarget: !0,
        alwaysMenuToUp: !1,
        columnsCount: !1,
        offsetLeft: -7,
        offsetTop: -4,
        onSelect: function() {},
        updateHeader: function(t, e) {
            return e
        }
    },
    controlName: "DropdownMenu",
    beforeInit: function() {
        this.guid = _ui.reg(this), this.common.pageContainer || (this.common.pageContainer = document.body, browser.msie6 && ge("pageContainer") && (this.pageContainer = ge("pageContainer")))
    },
    initOptions: function(t, e) {
        !e.title && e.target && (e.title = e.target.innerHTML), this.options = extend({}, this.defaultOptions, e)
    },
    init: function(t, e) {
        this.visible = !1, this.offsetTop = 0, this.mouseTimer = 0, this.childMenus = [], this.childIsOver = !1, e.parentMenu && (this.parentMenu = e.parentMenu, this.parentMenu.childMenus.push(this)), this.isOver = !1, this.value = e.value || 0, this.items = {}
    },
    initDOM: function(t, e) {
        this.container = ce("div", {
            className: "dd_menu" + (e.containerClass ? " " + e.containerClass : ""),
            id: "dd_menu" + this.guid
        }), this.header = ce("div", {
            className: "dd_menu_header",
            innerHTML: "<div>" + this.options.title.replace(/\s+/g, "&nbsp;") + "</div>"
        }), this.body = ce("div", {
            className: "dd_menu_body",
            innerHTML: '<table cellspacing="0" cellpadding="0"><tbody><tr><td class="dd_menu_shad_l"><div></div></td><td><div class="dd_menu_shad_t2"></div><div class="dd_menu_shad_t"></div><div id="dd_rows_' + this.guid + '" class="dd_menu_rows"></div><div class="dd_menu_shad_b"></div><div class="dd_menu_shad_b2"></div></td><td class="dd_menu_shad_r"><div> </div></td></tr></tbody></table>'
        }), this.container.appendChild(this.header), this.container.appendChild(this.body), hide(this.header), hide(this.body), this.rows = ce("div", {
            id: "rows" + this.guid,
            className: "dd_menu_rows2"
        })
    },
    initEvents: function() {
        addEvent(this.container, "mouseover mouseout", this.handleMouseEvent, !1, {
            self: this
        })
    },
    afterInit: function(t, e) {
        this.setData(t);
        var i = this;
        onDomReady(function() {
            (i.common.pageContainer || window.pageNode).appendChild(i.container);
            var t = i.header,
                e = (i.body, i.options.target);
            if (ge("dd_rows_" + i.guid).appendChild(i.rows), i.setOptions(i.options), e && (-1 == e.innerHTML.indexOf("<") && (e.innerHTML = e.innerHTML.replace(/\s+/g, "&nbsp;")), e.onclick = function() {
                    return i.show(), !1
                }, "A" == e.tagName && (e.className += " dd_menu_target")), i.options.target && i.options.showHover) {
                var s, o = function() {
                    i.parentMenu && (i.parentMenu.childIsOver = !1), i.visible || hide(t), removeClass(t, "dd_header_hover")
                };
                i.showTargetHover = function() {
                    i.parentMenu && (i.parentMenu.childIsOver = !0), addClass(t, "dd_header_hover"), i.moveToTarget(), show(t), s = setTimeout(o, 100)
                }, addEvent(i.options.target, "mouseover", i.showTargetHover), addEvent(t, "mouseover", function() {
                    i.parentMenu && (i.parentMenu.childIsOver = !0), clearTimeout(s)
                }), addEvent(t, "mouseout", o)
            }
        })
    },
    moveTo: function(t, e) {
        if (t = intval(t), e = intval(e), extend(this.container.style, {
                top: e + "px",
                left: t + "px"
            }), setStyle(this.rows, "width", "auto"), this.options.columnsCount && (!browser.msie || browser.version >= 10)) {
            setStyle(this.rows, "columnCount", "auto"), setStyle(this.rows, "MozColumnCount", "auto"), setStyle(this.rows, "webkitColumnCount", "auto"), setStyle(this.rows, "height", "auto");
            var i = geByTag("a", this.rows).length,
                s = getSize(this.body),
                o = s[0] - 4,
                n = s[1] - 4;
            n > 500 && (n = Math.round(n / i) * Math.ceil(i / this.options.columnsCount), setStyle(this.rows, "columnCount", this.options.columnsCount.toString()), setStyle(this.rows, "MozColumnCount", this.options.columnsCount.toString()), setStyle(this.rows, "webkitColumnCount", this.options.columnsCount.toString()), setStyle(this.rows, "width", 2 * o + "px"), setStyle(this.rows, "height", n + "px"))
        }
        var a = getSize(this.header)[0],
            l = getSize(this.body)[0];
        a > l && setStyle(this.rows, "width", a - 2 + "px"), l = getSize(this.body)[0];
        var r = document.documentElement.clientWidth,
            h = t + l > r && t + a > l ? -a - 1 + "px" : "auto";
        setStyle(this.body, "right", h)
    },
    moveToTarget: function() {
        var t = getXY(this.options.target);
        this.moveTo(t[0] + this.options.offsetLeft, t[1] + this.options.offsetTop)
    },
    alignBody: function() {
        this.body.style.marginLeft = getSize(this.header)[0] - getSize(this.body)[0] + 1 + "px"
    },
    setData: function(t) {
        if (this.rows.innerHTML = "", isArray(t) && t.length)
            for (var e = 0; e < t.length; e++) this.addItem(t[e]);
        if (this.visible && this.menuToUp()) {
            var i = getSize(this.body)[1];
            this.body.style.top = -i + 3 + "px", addClass(this.container, "dd_up")
        }
    },
    addItem: function(t) {
        if (!t) return !1;
        var e = ce("a");
        if (isArray(t) && (t = {
                i: t[0],
                l: t[1],
                onClick: t[2],
                c: t[3],
                s: t[4],
                b: t[5],
                h: t[6],
                el: e
            }), t.onClick && !isFunction(t.onClick)) {
            var i = t.onClick;
            t.onClick = i.onClick, t.onMouseOver = i.onMouseOver, t.onMouseOut = i.onMouseOut
        }
        e.innerHTML = (this.options.checkable ? '<img src="/images/dropdead_check.gif">' : "") + t.l, t.i && (e.index = t.i), t.c && (e.className = t.c), t.s && extend(e.style, t.s), t.b && extend(e.style, {
            backgroundImage: "url('" + t.b + "')",
            paddingLeft: "27px"
        }), t.h && (e.href = t.h);
        var s = this;
        addEvent(e, "click", function(e) {
            s.value = e.data.item.i;
            var i = !0;
            if (isFunction(t.onClick) && t.onClick(e) === !1 && (i = !1), s.options.onSelect(e) === !1 && (i = !1), t.h) return !0;
            if (i ? s.hide() : cancelEvent(e), s.options.updateTarget && i) {
                var o = s.options.updateHeader(e.target.index, e.target.innerHTML);
                s.header.innerHTML = "<div>" + o + "</div>", s.options.target && (s.options.target.innerHTML = o.replace(/\s+/g, "&nbsp;"))
            }
        }, !1, {
            item: t
        }), isFunction(t.onMouseOver) && addEvent(e, "mouseover", t.onMouseOver), isFunction(t.onMouseOut) && addEvent(e, "mouseout", t.onMouseOut), browser.msie && (e.onmouseover = function() {
            addClass(e, "dd_a_hover")
        }, e.onmouseout = function() {
            removeClass(e, "dd_a_hover")
        }), this.items[t.i] = e, this.rows.appendChild(e), "left" == this.options.align && this.alignBody()
    },
    getRows: function() {
        return this.rows
    },
    setOptions: function(t) {
        extend(this.options, t), this.options.title && (this.header.innerHTML = "<div>" + this.options.title + "</div>"), "undefined" != typeof this.options.hideOnClick && (this.header.onclick = this.options.hideOnClick ? this.toggle.bind(this) : this.show.bind(this)),
            "left" == this.options.align && this.alignBody()
    },
    onHide: function(t) {
        this.visible = !1, t || !this.options.showHover ? hide(this.header) : addClass(this.header, "dd_header_hover"), hide(this.body), this.options.onHide && this.options.onHide()
    },
    toggle: function() {
        this.visible ? this.hide(!1) : this.show()
    },
    show: function() {
        if (!this.visible) {
            if (this.options.target && !this.options.showHover && this.moveToTarget(), clearTimeout(this.mouseTimer), show(this.header), show(this.body), this.options.showHover && removeClass(this.header, "dd_header_hover"), this.visible = !0, this.menuToUp()) {
                var t = getSize(this.body)[1];
                this.body.style.top = -t + 3 + "px", addClass(this.container, "dd_up")
            } else {
                var e = getSize(this.header)[1];
                this.body.style.top = e - 1 + "px", removeClass(this.container, "dd_up")
            }
            this.options.onShow && this.options.onShow(), _ui.sel(this.guid)
        }
    },
    menuToUp: function() {
        if (this.options.alwaysMenuToUp) return !0;
        var t = window.innerHeight,
            e = getSize(this.body)[1],
            i = getSize(this.header)[1],
            s = getXY(this.header)[1];
        !t && document.documentElement && (t = document.documentElement.clientHeight);
        var o = this.common.pageContainer.scrollTop;
        return o || browser.msie6 || (o = document.getElementsByTagName("html")[0].scrollTop), s - o > e ? i + s + e > t + o : !1
    },
    hide: function(t) {
        if (this.visible) {
            var e = this;
            if (e.childIsOver) return void(e.mouseTimer = setTimeout(e.hide.bind(e), 400));
            each(e.childMenus, function() {
                this.hide()
            });
            var i = void 0 !== this.options.fadeSpeed ? this.options.fadeSpeed : 100;
            t === !1 ? this.onHide(!1) : fadeOut(this.container, i, function() {
                show(e.container), e.onHide.call(e, !0), _ui.sel(!1)
            }), e.parentMenu && (e.parentMenu.childIsOver = !1)
        }
    },
    val: function() {
        return this.value
    },
    destroy: function() {
        if (vk.al && !this.destroyed) {
            removeEvent(this.options.target, "mouseover", this.showTargetHover), cleanElems(this.container, this.header);
            for (var t = this.rows.firstChild; t; t = t.nextSibling) cleanElems(t);
            this.destroyed = !0
        }
    },
    handleMouseEvent: function(t) {
        var e = t.data.self;
        e.isOver = "mouseover" == t.type, e.parentMenu && (e.parentMenu.childIsOver = e.isOver), clearTimeout(e.mouseTimer), "mouseout" == t.type && (e.mouseTimer = setTimeout(e.hide.bind(e), 400))
    },
    onEvent: function(t) {
        if (!inArray(t.type, ["keydown", "keypress", "keyup"]) || !inArray(t.keyCode, [16, 17, 18, 91])) {
            for (var e = !0, i = t.target; i && i != i.parentNode;) {
                if (i == this.container) {
                    e = !1;
                    break
                }
                i = i.parentNode
            }
            e && this.hide()
        }
    }
}), extend(UiUtil.prototype, {
    defaultOptions: null,
    __components: {},
    __cid: 0,
    storage: null,
    __construct__: function(t) {
        return this.beforeInit && this.beforeInit.apply(this, t), this.initOptions && this.initOptions.apply(this, t), this.init.apply(this, t), this.initEvents && this.initEvents.apply(this, t), this.afterInit && this.afterInit.apply(this, t), this.__components[(this.componentName ? this.componentName : this.__className) + this.__cid++] = this, this
    },
    beforeInit: null,
    initOptions: null,
    init: null,
    initEvents: null,
    afterInit: null
}), createChildClass("Cache", UiUtil, {
    defaultOptions: {
        cacheLength: 100
    },
    componentName: "Cache",
    initOptions: function(t) {
        this.options = extend({}, this.defaultOptions, t)
    },
    init: function() {
        this.storage = {}, this.length = 0
    },
    setData: function(t, e) {
        this.length > this.options.cacheLength && this.flush(), t in this.storage || this.length++, this.storage[t] = clone(e)
    },
    getData: function(t) {
        return this.options.cacheLength && this.length && t in this.storage ? this.storage[t] : null
    },
    flush: function() {
        delete this.storage, this.storage = {}, this.length = 0
    }
}), createChildClass("Indexer", UiUtil, {
    defaultOptions: {
        chars: 2,
        delimeter: /[\s\(\)\.,\-]+/
    },
    componentName: "Indexer",
    initOptions: function(t, e) {
        this.options = extend({}, this.defaultOptions, {
            indexkeys: [1]
        }, e)
    },
    init: function(t) {
        this.setData(t)
    },
    setData: function(t) {
        delete this.storage, this.storage = {
            data: clone(t),
            index: {}
        }, clearTimeout(this.indexTimer), this.indexTimer = setTimeout(this.createIndex.bind(this), 10)
    },
    createIndex: function() {
        this.storage.data.length && (this.storage.index = {}, debug("createIndex start, " + this.storage.data.length + " items"), this.lastLabel = null, each(this.storage.data, function(t, e) {
            "label" === e[3] && this.options.includeLabelsOnMatch && (this.lastLabel = t), this.indexItem(t, e, this.lastLabel)
        }.bind(this)), debug("createIndex ended"))
    },
    indexItem: function(t, e, i) {
        var s, o, n, a = "",
            l = {};
        for (s = 0; s < this.options.indexkeys.length; s++) e[this.options.indexkeys[s]] && (a += " " + e[this.options.indexkeys[s]].replace(this.options.delimeter, " ").replace(/<[^>]*>/g, "").replace(/[\u00AB\u00BB]/g, ""));
        for (a += (parseLatin(a) || "") + (parseCyr(a) || ""), a = trim(winToUtf(a).toLowerCase()).split(/\s+/), s = 0; s < a.length; s++)
            for (o = 1; o <= this.options.chars; o++) n = a[s].substr(0, o), l[n] || (l[n] = 1, void 0 === this.storage.index[n] && (this.storage.index[n] = []), i && i != t && this.storage.index[n].push(i), this.storage.index[n].push(t))
    },
    search: function(t) {
        debug("search start, index width: " + this.options.chars + ", data size: " + this.storage.data.length), t = trim(t.toLowerCase().replace(this.options.delimeter, " ")), debug("pattern: " + t + ", length: " + t.length);
        var e = this;
        if (!t) return debug("empty pattern, return whole list"), e.storage.data;
        if (t.length <= this.options.chars && -1 == t.indexOf(" ")) {
            debug("found whole pattern indexed");
            var i = [];
            return e.already_added = {}, each(this.storage.index[t] || [], function() {
                e.options.preventDuplicates && e.already_added[this] || (i.push(e.storage.data[this]), e.already_added[this] = !0)
            }), i
        }
        t = t.split(" ");
        var s = 0,
            o = "";
        each(t, function() {
            var t = e.storage.index[this.substr(0, e.options.chars)];
            return (!o || !t || t.length < s) && (s = t ? t.length : 0, o = this.substr(0, e.options.chars)), !s
        });
        var n = [];
        if (debug("index returned: " + s + " items"), !s) return n;
        debug("starting manual filter");
        var a = null;
        return e.already_added = {}, each(e.storage.index[o.substr(0, e.options.chars)], function(i, s) {
            var o, l = e.storage.data[s],
                r = !1,
                h = "";
            for ("label" === l[3] && (a = s), o = 0; o < e.options.indexkeys.length; o++) l[e.options.indexkeys[o]] && (h += " " + l[e.options.indexkeys[o]].replace(e.options.delimeter, " ").replace(/<[^>]*>/, "").replace(/[\u00AB\u00BB]/g, ""));
            for (h += (parseLatin(h) || "") + (parseCyr(h) || ""), h = winToUtf(h).toLowerCase(), o = 0; o < t.length; o++)
                if (-1 == h.indexOf(" " + t[o])) {
                    r = !0;
                    break
                }
            r || (e.options.includeLabelsOnMatch && a && (s == a || e.already_added[a] || (n.push(e.storage.data[a]), e.already_added[a] = !0), a = null), (e.options.preventDuplicates && !e.already_added[s] || !e.options.preventDuplicates) && n.push(l), e.already_added[s] = !0)
        }), debug("manual filter ended, found " + n.length + " items"), n
    },
    flush: function() {
        delete this.storage
    }
});
var curInlineEdit = !1;
window.inlineOnEvent || (window.inlineOnEvent = function(t) {
    if (curInlineEdit) {
        if ("mousedown" == t.type) {
            for (var e = !0, i = t.target; i && i != i.parentNode;) {
                if (i == curInlineEdit.container) {
                    e = !1;
                    break
                }
                i = i.parentNode
            }
            if (!e || !isVisible(curInlineEdit.container)) return;
            curInlineEdit.hide()
        }
        if ("keydown" == t.type) {
            if (!isVisible(curInlineEdit.container)) return;
            t.keyCode == KEY.ESC && curInlineEdit.hide(), t.keyCode == KEY.RETURN && (curInlineEdit.options.onConfirm && curInlineEdit.options.onConfirm.apply(curInlineEdit) === !1 || curInlineEdit.hide())
        }
    }
}, addEvent(document, "mousedown keydown", inlineOnEvent)), createChildClass("InlineEdit", UiControl, {
    common: {
        pageContainer: null
    },
    defaultOptions: {
        offsetLeft: -20 + (browser.msie7 ? 2 : browser.opera || browser.msie ? 3 : browser.safari || browser.chrome ? 0 : browser.mozilla ? 2 : 0),
        offsetTop: -20 + (browser.msie7 ? 2 : browser.opera || browser.msie ? 3 : browser.safari || browser.chrome ? 1 : browser.mozilla ? 3 : 0),
        top: 0,
        left: 0,
        width: "auto",
        flex: !1,
        mainTableHTML: '<tbody><tr><td class="inlFrame00"></td><td class="inlFrame01"><div></div></td><td class="inlFrame02"></td></tr>   <tr><td class="inlFrame10"></td><td class="inlContent">{content_table}</td><td class="inlFrame12"></td></tr>   <tr><td class="inlFrame20"></td><td class="inlFrame21"><div></div></td><td class="inlFrame22"></td></tr></tbody>',
        contentTableHTML: '<tbody>{content}   <tr>    <td class="inlButtonOk"><div class="button_blue button_wide"><button>{yeslabel}</button></div></td>    <td class="inlButtonCancel"><div class="button_gray button_wide"><button>{nolabel}</button></div></td>   </tr></tbody>',
        contentHTML: '<tr><td><input class="inlInput text" type="text" /></td></tr>',
        confirmLabel: getLang("global_save"),
        cancelLabel: getLang("global_cancel"),
        onBeforeShow: null,
        onShow: null,
        onHide: null,
        onConfirm: null,
        onCancel: null
    },
    controlName: "InlineEdit",
    beforeInit: function() {
        this.common.pageContainer || (this.common.pageContainer = document.body, browser.msie6 && ge("pageContainer") && (this.pageContainer = ge("pageContainer"))), this.guid = _ui.reg(this)
    },
    initOptions: function(t, e) {
        return t ? void(this.options = extend({}, this.defaultOptions, e)) : !1
    },
    init: function(t) {
        this.target = t
    },
    initDOM: function(t, e) {
        this.container = ce("div", {
            className: "inlContainer",
            id: "container" + this.guid,
            innerHTML: '<table class="inlMainTable">' + this.options.mainTableHTML.replace("{content_table}", '<table class="inlContentTable">' + this.options.contentTableHTML.replace("{content}", this.options.contentHTML).replace("{nolabel}", this.options.cancelLabel).replace("{yeslabel}", this.options.confirmLabel) + "</table>") + "</table>"
        }), this.mainTable = geByClass("inlMainTable", this.container)[0], this.mainCell = geByClass("inlContent", this.mainTable)[0], this.contentTable = geByClass("inlContentTable", this.mainCell)[0], setStyle(this.contentTable, "width", this.options.width), this.input = geByClass("inlInput", this.contentTable)[0], this.buttonOkCell = geByClass("inlButtonOk", this.contentTable)[0], this.buttonCancelCell = geByClass("inlButtonCancel", this.contentTable)[0], this.buttonOk = this.buttonOkCell.firstChild.firstChild, this.buttonCancel = this.buttonCancelCell.firstChild.firstChild, this.container.appendChild(this.mainTable), this.mainCell.appendChild(this.contentTable)
    },
    initEvents: function() {
        var t = this;
        createButton(this.buttonOk, function() {
            t.options.onConfirm && t.options.onConfirm.apply(t) === !1 || t.hide()
        }), createButton(this.buttonCancel, function() {
            t.options.onCancel && t.options.onCancel.apply(t) === !1 || t.hide()
        }), addEvent(this.target, "click", function() {
            return t.show(), !1
        }), this.onEvent = function(t) {}
    },
    afterInit: function(t, e) {
        this.options.afterInit && this.options.afterInit.apply(this);
        var i = this;
        onDomReady(function() {
            i.common.pageContainer.appendChild(i.container)
        })
    },
    hide: function() {
        isVisible(this.container) && (hide(this.container), curInlineEdit == this && (curInlineEdit = !1), this.options.onHide && this.options.onHide.apply(this))
    },
    moveTo: function(t, e) {
        setStyle(this.container, {
            top: intval(e) + "px",
            left: intval(t) + "px"
        })
    },
    moveToTarget: function() {
        var t = getXY(this.target);
        this.moveTo(t[0] + this.options.offsetLeft + this.options.left, t[1] + this.options.offsetTop + this.options.top)
    },
    setOptions: function(t) {
        extend(this.options, t)
    },
    toggle: function() {
        this.visible ? this.hide(!1) : this.show()
    },
    show: function() {
        isVisible(this.container) || (this.moveToTarget(), this.options.onBeforeShow && this.options.onBeforeShow.apply(this), show(this.container), curInlineEdit && curInlineEdit.hide(), curInlineEdit = this, this.input && elfocus(this.input), this.options.onShow && this.options.onShow.apply(this))
    }
}), InlineDropdown.IDD_HEADER_CORRECTION_LEFT = -10, InlineDropdown.IDD_HEADER_CORRECTION_TOP = -8, InlineDropdown.prototype._rebuildDropdown = function() {
    function t(t, i) {
        i = i || "";
        var s = l._opts.sublists && l._opts.sublists[t[0]] ? "idd_sublist" : "",
            n = '<div class="idd_item ' + i + " " + e + " " + s + '" id="' + o + "idd_item_" + t[0] + '" data-id="' + t[0] + '" tabindex="0" role="button">' + (l._opts.withIcon ? '<div class="idd_item_icon" id="' + t[0] + '"></div>' : "") + '<div class="idd_item_name">' + (l._opts.html ? l._opts.html(t) : t[1]) + "</div></div>";
        return n
    }
    var e = this._opts.withIcon ? "idd_with_icon" : "",
        i = this._opts.withArrow ? "idd_arrow" : "",
        s = this._opts.idPrefix ? this._opts.idPrefix : "",
        o = this._opts.idItemPrefix ? this._opts.idItemPrefix : "",
        n = '<div class="idd_header_wrap ' + e + '"><div class="idd_header ' + i + '" id="' + s + this._items[0][0] + '"></div></div>',
        a = '<div class="idd_items_wrap"><div class="idd_items_content">',
        l = this;
    each(this._items, function(e, i) {
        a += t(i)
    }), a += "</div></div>", this._els.popupItems = se(a), this._els.popupHeader = se(n);
    var l = this;
    addEvent(this._els.popupItems, "click", function(t) {
        var e = t.target;
        if ("a" == e.tagName.toLowerCase()) return void setTimeout(function() {
            l._hide()
        });
        for (; e && !hasClass(e, "idd_item");) e = e.parentNode;
        e && (l.select(e.getAttribute("data-id")) ? l._hide() : l._hoverItem(e)), cancelEvent(t)
    }), each(geByClass("idd_item", this._els.popupItems), function(t, e) {
        addEvent(e, "mouseenter", function(t) {
            InlineDropdown._preventMouseHover || l._hoverItem(t.currentTarget)
        }), addEvent(e, "mouseleave", function(t) {
            InlineDropdown._preventMouseHover || l._unhoverItem(t.currentTarget, t)
        })
    }), addEvent(this._els.popupItems, "mouseenter", function() {
        addEvent(this._els.popupItems, browserFeatures.wheelEvent, this._onWheel.bind(this))
    }.bind(this)), addEvent(this._els.popupItems, "mouseleave", function() {
        removeEvent(this._els.popupItems, browserFeatures.wheelEvent, this._onWheel.bind(this))
    }.bind(this))
}, InlineDropdown.prototype._onClick = function(t) {
    function e() {
        var t = getXY(s._iddEl)[1],
            e = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
        return t - e + 200 > window.innerHeight
    }

    function i(t) {
        function e(t) {
            return null != t && t === t.window
        }

        function i(t) {
            return e(t) ? t : 9 === t.nodeType && t.defaultView
        }
        var s, o, n = {
                top: 0,
                left: 0
            },
            a = t && t.ownerDocument;
        if (a) return s = a.documentElement, void 0 !== typeof t.getBoundingClientRect && (n = t.getBoundingClientRect()), o = i(a), [n.left + o.pageXOffset - s.clientLeft, n.top + o.pageYOffset - s.clientTop]
    }
    if (isVisible(this._els.popupEl)) return void this._hide();
    InlineDropdown._currIDD && InlineDropdown._currIDD._hide(), InlineDropdown._currIDD = this, window.tooltips && tooltips.hideAll();
    var s = this,
        o = this._els.popupEl = se('<div class="idd_popup"></div>');
    this._opts.alignLeft && addClass(o, "idd_align_left"), this.openToUp = 1 == this._opts.forceDir || "up" == this._opts.forceDir || -1 != this._opts.forceDir && "down" != this._opts.forceDir && e(), this.openToUp ? (o.appendChild(this._els.popupItems), o.appendChild(this._els.popupHeader)) : (o.appendChild(this._els.popupHeader), o.appendChild(this._els.popupItems));
    var n = geByClass1("idd_header", this._els.popupHeader);
    this._opts.keepTitle ? n.innerHTML = this._title : n.innerHTML = this._selected ? this._selected[1] : "", o.id = "idd_" + this._iddEl.id, this._iddEl.appendChild(o);
    var a = getSize(o),
        l = 0;
    getSize(this._els.popupItems.childNodes[0])[1] > a[1] && (l = sbWidth()), this._opts.checkable && (l += 30);
    var r = (i(geByClass1("idd_selected_value", this._iddEl)), getSize(this._els.valueEl)),
        h = (this._opts.withIcon ? 20 : 0, 0);
    this.openToUp && (h = -getSize(this._els.popupItems)[1]);
    var d = {
        marginTop: (this._opts.headerTop || InlineDropdown.IDD_HEADER_CORRECTION_TOP) - r[1] + h,
        width: a[0] + 8,
        opacity: 1
    };
    this._opts.alignLeft ? d[vk.rtl ? "marginRight" : "marginLeft"] = r[0] - InlineDropdown.IDD_HEADER_CORRECTION_LEFT : d.marginLeft = (this._opts.headerLeft || InlineDropdown.IDD_HEADER_CORRECTION_LEFT) - (this._opts.withIcon ? 20 : 0), setStyle(o, d), this._unhoverItem(), this._highlightItem(), this._initOutEvent(), this._initKeypressEvent(), this._opts.onShow && this._opts.onShow(this.ddEl), cancelEvent(t)
}, InlineDropdown.prototype._hide = function() {
    re(this._els.popupEl), this._els.popupEl = null, removeClass(this._hoveredItem, "idd_hover"), this._hoveredItem = null, this._deinitEvents(), this._hideSubmenu(), clearTimeout(this._hideSubmenuTimeout), this._opts.onHide && this._opts.onHide()
}, InlineDropdown.prototype._highlightItem = function(t) {
    if (this._selectable && this._els.popupEl) {
        if (void 0 === t) {
            if (!this._selected) return;
            t = this._selected[0]
        }
        var e = geByClass1("idd_hl", this._els.popupEl);
        e && removeClass(e, "idd_hl");
        var i = ge("idd_item_" + t);
        addClass(i, "idd_hl");
        var s = this;
        each(geByClass("idd_item", this._els.popupItems), function(t, e) {
            return e == i ? (s._els.popupItems.scrollTop = (t + 1) * getSize(e)[1] - getSize(s._els.popupItems)[1] / 2, !1) : void 0
        })
    }
}, InlineDropdown.prototype._onWheel = function(t) {
    var e = getSize(geByClass1("idd_items_content", this._els.popupItems))[1],
        i = getSize(this._els.popupItems)[1];
    e != i && (0 == this._els.popupItems.scrollTop && t.deltaY < 0 || this._els.popupItems.scrollTop == e - i && t.deltaY > 0) && cancelEvent(t)
}, InlineDropdown.prototype._onKeyDown = function(t) {
    switch (t.keyCode) {
        case 38:
        case 40:
        case 13:
        case 27:
            this._onKey(t.keyCode, t)
    }
}, InlineDropdown.prototype._onKeyPress = function(t) {
    this._onKey(t.which, t)
}, InlineDropdown.prototype._hideSubmenu = function() {
    removeClass(this._currSubmenuItem, "idd_hover_sublist_parent"), re(this._els.currCascade), delete this._currSubmenuItem, this._hoveredItem && this._showSubmenu(this._hoveredItem)
}, InlineDropdown.prototype._showSubmenu = function(t) {
    function e(t, e) {
        e = e || "";
        var i = '<div class="idd_item ' + e + " " + a + '" id="idd_item_' + t[0] + '" data-id="' + t[0] + '" role="button" tabindex="0">' + (o.withIcon ? '<div class="idd_item_icon" id="' + t[0] + '"></div>' : "") + '<div class="idd_item_name">' + (o.html ? o.html(t) : t[1]) + "</div></div>";
        return i
    }
    if (clearTimeout(this._hideSubmenuTimeout), t) {
        var i = this,
            s = t.getAttribute("data-id");
        if (this._opts.sublists && this._opts.sublists[s]) {
            if (addClass(t, "idd_hover_sublist_parent"), this._currSubmenuItem == t) return void clearTimeout(this._submenuHideTimeout);
            var o = this._opts.sublists[s],
                n = '<div class="idd_popup"><div class="idd_items_wrap"><div class="idd_items_content">',
                a = o.withIcon ? "idd_with_icon" : "";
            each(o.items, function(t, i) {
                n += e(i)
            }), n += "</div></div></div>", this._els.currCascade = se(n), this._iddEl.appendChild(this._els.currCascade);
            for (var l = getSize(this._els.popupEl), r = (getXY(this._els.popupEl), getSize(t)), h = getSize(this._els.currCascade), d = 0, c = t; null != (c = c.previousSibling);) d++;
            var u = l[0] + (this._opts.headerLeft || InlineDropdown.IDD_HEADER_CORRECTION_LEFT) - 1;
            setStyle(this._els.currCascade, {
                marginLeft: u - 3,
                marginTop: r[1] * d + 6 - (this.openToUp ? l[1] : 0),
                "z-index": 200,
                width: h[0] + 30
            }), setTimeout(function() {
                cssAnim(i._els.currCascade, {
                    marginLeft: u,
                    opacity: 1
                }, {
                    duration: 140
                })
            }, 10), each(geByClass("idd_item", this._els.currCascade), function(t, e) {
                addEvent(e, "mouseenter", function(t) {
                    i._isInSubmenu = !0, InlineDropdown._preventMouseHover || i._hoverItem(t.currentTarget, null, !0)
                }), addEvent(e, "mouseleave", function(t) {
                    i._isInSubmenu = !1, InlineDropdown._preventMouseHover || i._unhoverItem()
                })
            }), addEvent(this._els.currCascade, "click", function(t) {
                var e = t.target;
                if ("a" == e.tagName.toLowerCase()) return void setTimeout(function() {
                    i._hide()
                });
                for (; e && !hasClass(e, "idd_item");) e = e.parentNode;
                if (e) {
                    var s = !0,
                        n = e.getAttribute("data-id"),
                        a = geByClass1("idd_item_name", e).innerHTML;
                    o.onSelect ? s = o.onSelect(n, a) : i._opts.onSelect && (s = i._opts.onSelect(n, a)), s && i._hide()
                }
                cancelEvent(t)
            }), this._currSubmenuItem = t
        }
    }
}, InlineDropdown.prototype._hoverItem = function(t, e, i) {
    var s = this;
    if (this._unhoverItem(), addClass(t, "idd_hover"), this._hoveredItem = t, e && t) {
        var o = t.getAttribute("id"),
            s = this;
        each(geByClass("idd_item"), function(e, i) {
            return i.getAttribute("id") == o ? (s._els.popupItems.scrollTop = getSize(t)[1] * (e + 1) - getSize(s._els.popupItems)[1] / 2, clearTimeout(InlineDropdown._preventMouseHover), InlineDropdown._preventMouseHover = setTimeout(function() {
                InlineDropdown._preventMouseHover = null
            }, 100), !1) : void 0
        })
    }
    if (clearTimeout(this._hideSubmenuTimeout), i) addClass(this._currSubmenuItem, "idd_hover_sublist_parent");
    else {
        var n = this._currSubmenuItem == t;
        this._currSubmenuItem && !n && (this._hideSubmenuTimeout = setTimeout(function() {
            s._hideSubmenu()
        }, 200)), this._currSubmenuItem || this._showSubmenu(t), removeClass(this._currSubmenuItem, "idd_hover_sublist_parent")
    }
}, InlineDropdown.prototype._unhoverItem = function(t, e) {
    this._hoveredItem && removeClass(this._hoveredItem, "idd_hover"), this._hoveredParentItem && removeClass(this._hoveredParentItem, "idd_hover"), clearTimeout(InlineDropdown._preventMouseHover)
}, InlineDropdown.prototype._onKey = function(t, e) {
    geByClass1("idd_items_content", this._els.popupItems);
    if (38 == t || 40 == t) {
        var i = this,
            s = this._hoveredItem || geByClass1("idd_hl", this._els.popupItems) || geByClass1("idd_item", this._els.popupItems);
        s.getAttribute("data-id"), getSize(s)[1];
        return s = 38 == t ? s.previousSibling : s.nextSibling, i._hoverItem(s, !0), cancelEvent(e), !1
    }
    13 == t ? this._hoveredItem && this.select(this._hoveredItem.getAttribute("data-id")) && this._hide() : 27 == t ? this._hide() : this._quickSearch(t)
}, InlineDropdown.prototype._quickSearch = function(t) {
    var e = this;
    if (void 0 !== t) {
        var i = String.fromCharCode(t).toLowerCase();
        if (!i) return;
        setTimeout(function() {
            e._currSearchStr = ""
        }, 600), this._currSearchStr = this._currSearchStr || "", this._currQuickSearchIndex = this._currQuickSearchIndex || 0, 1 == this._currSearchStr.length && this._currSearchStr[0] == i || (this._currSearchStr += i)
    }
    for (var s = this._items, o = this._currQuickSearchIndex; o < s.length; o++) {
        var n = s[o][1].toLowerCase();
        if (1 == this._currSearchStr.length && this._currSearchStr == n[0] || this._currSearchStr.length > 1 && n.indexOf(this._currSearchStr) >= 0) {
            this._currQuickSearchIndex = o + 1, this._hoverItem(ge("idd_item_" + s[o][0]), !0), o == s.length - 1 && (this._currQuickSearchIndex = 0);
            break
        }
        o == s.length - 1 && (this._currQuickSearchIndex = 0, t && this._quickSearch())
    }
}, InlineDropdown.prototype._deinitEvents = function() {
    removeEvent(window, "click", InlineDropdown._window_onOuterClick), removeEvent(window, "keypress", InlineDropdown._window_onKeyPress), removeEvent(window, "keydown", InlineDropdown._window_onKeyDown)
}, InlineDropdown.prototype._initKeypressEvent = function() {
    addEvent(window, "keypress", InlineDropdown._window_onKeyPress = this._onKeyPress.bind(this)), addEvent(window, "keydown", InlineDropdown._window_onKeyDown = this._onKeyDown.bind(this))
}, InlineDropdown.prototype._onOuterClick = function(t) {
    for (var e = t.target, i = !0; e && e != document;) {
        if (hasClass(e, "idd_popup")) {
            i = !1;
            break
        }
        e = e.parentNode
    }
    i && this._hide()
}, InlineDropdown.prototype._initOutEvent = function() {
    var t = this;
    setTimeout(function() {
        addEvent(window, "click", InlineDropdown._window_onOuterClick = t._onOuterClick.bind(t))
    }), this._opts.autoHide > 0 && (addEvent(this._iddEl, "mouseleave", function() {
        clearTimeout(t._leaveTimeout), t._leaveTimeout = setTimeout(function() {
            t._isInSubmenu || t._hide()
        }, t._opts.autoHide)
    }), addEvent(this._iddEl, "mouseenter", function() {
        clearTimeout(t._leaveTimeout)
    }))
}, InlineDropdown.prototype.deinit = function() {
    this._deinitEvents()
}, InlineDropdown.prototype.setItems = function(t) {
    this._items = clone(t), this.select(t[0][0], !0), this._rebuildDropdown()
}, InlineDropdown.prototype.getElement = function() {
    return this._iddEl
}, InlineDropdown.prototype.getSelected = function() {
    return this._selected
}, InlineDropdown.prototype.select = function(t, e) {
    if (!this._opts.sublists || !this._opts.sublists[t]) {
        var i = !1;
        if (each(this._items, function(e, s) {
                return s[0] == t ? (i = s, !1) : void 0
            }), i === !1) throw new Error("No item found for selection");
        this._selected = i, this._opts.keepTitle || (this._els.valueEl.innerHTML = i[1]), val(this._els.hiddenInputEl, t);
        var s = !0;
        if (!e && this._opts.onSelect) try {
            s = !this._opts.onSelect(i[0], i)
        } catch (o) {
            console.error(o)
        }
        return s
    }
}, InlineDropdown.prototype.val = function(t, e) {
    return void 0 !== t ? this.select(t, e) : this.getSelected() ? this.getSelected()[0] : ""
};
try {
    jsDispatcher.triggerOnload("lib/ui_controls")
} catch (e) {}
try {
    stManager.done("ui_controls.js")
} catch (e) {}