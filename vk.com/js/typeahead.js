var Registry = [];
var _registryIndex = 0;
var _lastKeyCode = -1;
var _names;
var _ids;
var _images;
var _networks;


var TypeAhead = function(rootEl, formEl, textBoxEl, idEl, defaultOptions, instructions, useFilter, onSuccessHandler, onInputChangeHandler, onUpHandler, onDownHandler, onListElMouseDownHandler, placeholderText, showNoMatches, override_resize, positionEl) {
    this.resize = !override_resize;
    this.getMatchSingleTerm = function(term, document) {
        var str = "";
        var len = term.length;
        if (!document) return '';
        var curDocument = document;

        // first check at beginning of string.
        var index = 0;
        index = curDocument.toUpperCase().indexOf(term.toUpperCase());
        if (index == -1) {
            return str;
        }

        var match = curDocument.substring(0, len);
        str += '<span class="suggest">' + match + '</span>';

        var moreMatches = 0;
        curDocument = curDocument.substring(index + len);
        while ((index = curDocument.toUpperCase().indexOf(term.toUpperCase())) != -1) {
            var pre = curDocument.substring(0, index);
            if (pre) {
                str += pre;
            }
            var match = curDocument.substring(index, index + len);
            if (match) {
                str += '<span class="suggest">' + match + '</span>';
            }
            curDocument = curDocument.substring(index + len);
            moreMatches = 1;
        }
        if (moreMatches) {
            str += curDocument;
        }
    }

    this.getMatchMultipleTerms = function(terms, document) {
        if (!document) return '';
        var termsArr = terms.split(/\s+/);
        var docArr = document.split(/\s+/);

        var str = "";
        for (var docIdx in docArr) {
            var matchFound = 0;
            var doc = docArr[docIdx];
            for (var termIdx in termsArr) {
                var term = termsArr[termIdx];

                // if we found a match
                if (doc.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                    matchFound = 1;
                    break;
                }
            }

            if (docIdx > 0) {
                str += ' ';
            }

            if (matchFound) {
                var len = term.length;
                var pre = doc.substring(0, len);
                var suf = doc.substring(len);
                str += '<span class="suggest">' + pre + '</span>' + suf;
            } else {
                str += doc;
            }
        }

        return str;
    }

    this.onListChange = function() {
        this.selectedIndex = -1;
        if (!this.pEvent) {
            this.idEl.value = -1;
        }
        var dropDownEl = this.dropDownEl;
        if (dropDownEl && dropDownEl.childNodes) {
            this.dropDownCount = dropDownEl.childNodes.length;
        }

        this.lastTypedValue = this.currentInputValue;
        var filter = this.currentInputValue.toUpperCase();
        filter = filter.replace(/^\s+|\s+$/, '');
        if (filter == "" || this.dropDownCount == 0 || this.pEvent) {
            this.dropDownEl.hide();
            //			this.defaultDropDownEl.hide();
        } else {
            this.dropDownEl.show();
            this.defaultDropDownEl.show();
        }

        var matchFound = false;
        if (filter.length > 0) {
            for (var i = 0; i < this.dropDownCount; i++) {
                if (!matchFound) {
                    matchFound = true;
                    this.selectedIndex = i;
                    this.selectedEl = this.dropDownEl.childNodes[i];
                }

                // try matching the name
                var str = this.getMatchSingleTerm(filter, this.dropDownEl.childNodes[i]._value);
                if (!str) {
                    str = this.getMatchMultipleTerms(filter, this.dropDownEl.childNodes[i]._value);
                }
                this.dropDownEl.childNodes[i].setName(str);

                // try matching the location
                str = this.getMatchSingleTerm(filter, this.dropDownEl.childNodes[i]._loc);
                if (!str) {
                    str = this.getMatchMultipleTerms(filter, this.dropDownEl.childNodes[i]._loc);
                }
                this.dropDownEl.childNodes[i].setLoc(str);
            }

            if (!matchFound) {
                for (var i = 0; i < this.defaultDropDownCount; i++) {
                    if (this.defaultDropDownEl.childNodes[i]._value.toUpperCase().indexOf(filter) == 0) {
                        matchFound = true;
                        this.selectedIndex = i;
                        this.selectedEl = this.defaultDropDownEl.childNodes[i];
                        break;
                    }
                }
            }
        }

        var value = this.currentInputValue;

        var keyIgnore = false;
        switch (this.lastKeyCode) {
            case 8:
            case 33:
            case 34:
            case 35:
            case 35:
            case 36:
            case 37:
            case 39:
            case 45:
            case 46:
                keyIgnore = true;
                break;
            case 27:
                keyIgnore = true;
                break;
            default:
                break;
        }

        if (!keyIgnore && matchFound && !this.pEvent /* IE focus bug */ ) {
            this.selectedEl.select();
        } else {}

        this._noMatches = false;
        if (this.dropDownCount == 0) {
            if (this.textBoxEl.value != "" && this.textBoxEl.value != this.textBoxEl.ph) {
                this._noMatches = true;
                if (this.showNoMatches) {
                    this.defaultTextEl.setText("No Matches Found");
                }
            } else {
                this.defaultTextEl.setDefault();
            }

            this.defaultDropDownEl.show();

            if (this.showNoMatches) {
                this.defaultTextEl.show();
            }
        } else {
            this.defaultTextEl.hide();
        }

        if (this.dropDownCount >= 1 && this.selectedEl && this.getUnselectedLength() == this.selectedEl._value.length) {
            this.idEl.value = this.selectedEl._id;
            if (this.dropDownCount == 1) {
                this.onTypeAheadSuccess();
            } else {
                this.textBoxEl.style.abackground = "#E3ECF3";
            }
        } else {
            this.onTypeAheadFailure();
        }
        if (this.lastKeyCode == 27) {
            this.textBoxEl.blur();
        }

        this.setFrame();
        this.pEvent = 0;
    }

    this.setFrame = function() {
        if (this.goodFrame) {
            this.goodFrame.style.height = (this.containerEl.offsetHeight) + "px";
            this.goodFrame.style.width = (this.textBoxEl.offsetWidth) + "px";
        }
    }

    this.onTypeAheadSuccess = function() {
        this.dropDownEl.hide();
        this.textBoxEl.style.abackground = "#E3ECF3";
        if (this.onSuccess && !this.pEvent) {
            this.onSuccess(this);
        }
    }

    this.onTypeAheadFailure = function() {
        this.textBoxEl.style.abackground = "#FFFFFF";
    }

    this.refocus = function() {
        this.reFocused = true;
        this.textBoxEl.blur();
        setTimeout("Registry[" + this.registryIndex + "].focus();", 10);
    }

    this.focus = function() {
        this.textBoxEl.focus();
    }

    this.handleKeyUp = function(event) {
        if (!event && window.event) {
            event = window.event;
        }

        // avoids double-firing of events in safari
        if (event.keyCode == 40 || event.keyCode == 38) {
            if (this.isSafari && (this.fireCount++ % 2 == 1)) {
                //return;
            }
            //this.refocus();
        }

        // fast typing check
        var value = this.textBoxEl.value;
        var sLen = this.getSelectedLength();
        var uLen = this.getUnselectedLength();
        if (sLen > 0 && uLen != -1) {
            value = value.substring(0, uLen);
        }
        this.currentInputValue = value;

        var keyIgnore = false;
        switch (this.lastKeyCode) {
            case 8:
            case 13:
            case 9:
                keyIgnore = true;
                break;
            case 38:
                keyIgnore = true;
                //				this.selectPrevDropDown();
                if (this.onUp) {
                    this.onUp(this);
                }
                break;
            case 40:
                keyIgnore = true;
                //				this.selectNextDropDown();
                if (this.onDown) {
                    this.onDown(this);
                }
                break;
        }

        this.pEvent = 0;
        if (event.pEvent) {
            this.pEvent = event.pEvent;
        }

        if (!keyIgnore && /*this.currentInputValue != this.lastInputValue &&*/ this.onInputChange) {
            this.onInputChange(this);
        }
        if (this.lastKeyCode == 13) {

            this.lastKeyCode = -1;
            _lastKeyCode = -1;
        }

        this.lastInputValue = this.currentInputValue;
    }

    this.getSelectedLength = function() {
        var el = this.textBoxEl;
        var len = -1;
        if (el.createTextRange) {
            var selection = document.selection.createRange().duplicate();
            len = selection.text.length;
        } else if (el.setSelectionRange) {
            len = el.selectionEnd - el.selectionStart;
        }
        return len;
    }


    this.getUnselectedLength = function() {
        var el = this.textBoxEl;
        var len = 0;
        if (el.createTextRange) {
            var selection = document.selection.createRange().duplicate();
            selection.moveEnd("textedit", 1);
            len = el.value.length - selection.text.length;
        } else if (el.setSelectionRange) {
            len = el.selectionStart;
        } else {
            len = -1;
        }
        return len;
    }

    this.handleKeyDown = function(event) {
        if (!event && window.event) {
            event = window.event;
        }
        if (event) {
            this.lastKeyCode = event.keyCode;
            _lastKeyCode = event.keyCode;
        }

        switch (this.lastKeyCode) {
            case 38:
                break;
            case 40:
                break;
            case 27:
                this.textBoxEl.value = "";
                break;
            case 13:
            case 9:
                //formEl.onsubmit();
                if (this.selectedIndex != -1) {
                    this.textBoxEl.value = this.selectedEl._value;
                    this.defaultTextEl.hide();
                    this.onTypeAheadSuccess();
                }
                this.dropDownEl.hide();
                this.defaultDropDownEl.hide();
                this.setFrame();
                break;
            case 3:
                this.dropDownEl.hide();
                this.defaultDropDownEl.hide();
                this.setFrame();
                break;
        }

        switch (this.lastKeyCode) {
            case 38:
                this.selectPrevDropDown();
                if (this.onUp) {
                    this.onUp(this);
                }
                break;
            case 40:
                this.selectNextDropDown();
                if (this.onDown) {
                    this.onDown(this);
                }
                break;
        }

        if (event && (event.keyCode == 13 || event.keyCode == 38 || event.keyCode == 40)) {
            event.cancelBubble = true;
            event.returnValue = false;
        }
    }

    this.selectPrevDropDown = function() {
        this.selectDropDown(this.selectedIndex - 1);
    }
    this.selectNextDropDown = function() {
        this.selectDropDown(this.selectedIndex + 1);
    }

    this.selectDropDown = function(index) {
        this.textBoxEl.value = this.lastTypedValue;
        if (this.textBoxEl.onchange)
            this.textBoxEl.onchange();

        if ((this.dropDownCount + this.defaultDropDownCount) <= 0) {
            return;
        }

        if (this.dropDownCount > 0) {
            this.dropDownEl.show();
            this.defaultDropDownEl.show();
        } else {
            this.dropDownEl.hide();
            //this.defaultDropDownEl.hide();
        }
        this.setFrame();

        var usingDefaultDropDown = false;
        if (index >= this.dropDownCount && this.defaultDropDownCount > 0) {
            usingDefaultDropDown = true;
        }

        if (index >= this.dropDownCount + this.defaultDropDownCount) {
            index = this.dropDownCount + this.defaultDropDownCount - 1;
        }

        if (this.selectedIndex != -1 && index != this.selectedIndex) {
            this.selectedIndex = -1;
            this.selectedEl.unselect();
        }

        if (index < 0) {
            this.selectedIndex = -1;

            // commented out. safari issue erasing the text box
            //		this.textBoxEl.focus();
            return;
        }

        this.selectedIndex = index;
        if (usingDefaultDropDown) {
            this.selectedEl = this.defaultDropDownEl.childNodes[index - this.dropDownCount];
        } else {
            this.selectedEl = this.dropDownEl.childNodes[index];
        }
        this.selectedEl.select();

        // this.textBoxEl.value = this.selectedEl._value;
    }

    this.displaySuggestList = function(names, ids, locs) {
        if (names.length != ids.length) {
            return false;
        }

        var dropDownEl = this.dropDownEl;
        while (dropDownEl.childNodes.length > 0) {
            dropDownEl.removeChild(dropDownEl.childNodes[0]);
        }

        if (this.selectedEl) {
            this.selectedEl.unselect();
        }

        //match_i used to cap items shown in non-ajax version
        var match_i = 0;
        var termsArr;
        var term;
        var matchFound;
        var name, name_full;
        var match_id;
        var filter = this.currentInputValue.toUpperCase();
        filter = filter.replace(/^\s+|\s+$/, '');
        for (var i = 0; i < names.length && match_i < 10; i++) {
            name_full = names[i];
            name = names[i].split("<br>")[0] || names[i];
            if (this.useFilter) {
                if (!filter) {
                    continue;
                }

                match_id = ids[i];
                if (window._ignoreList && _ignoreList[match_id] && _ignoreList[match_id] == 1) {
                    continue;
                }

                matchFound = 0;
                if (name.toUpperCase().indexOf(filter) == 0) {
                    matchFound = 1;
                }

                if (!matchFound) {
                    termsArr = name.split(/\s+/);
                    for (var termIdx in termsArr) {
                        term = termsArr[termIdx];
                        if (term.toUpperCase().indexOf(filter) == 0) {
                            matchFound = 1;
                            break;
                        }
                    }
                }

                if (!matchFound) {
                    continue;
                }

                match_i++;
            }

            var listEl = this.createListElement(name_full, ids[i], locs[i], i);
            dropDownEl.appendChild(listEl);
        }

        // now reset the indexes for the default drop down
        for (var i = 0; i < this.defaultDropDownEl.childNodes.length; i++) {
            var listEl = this.defaultDropDownEl.childNodes[i];
            listEl._index = i + this.dropDownEl.childNodes.length;
        }

        return true;
    }

    this.createListElement = function(name, id, loc, index) {
        var listEl = document.createElement("div");
        listEl._value = name;
        listEl._loc = loc;
        listEl._id = id;
        listEl._index = index;

        listEl.setName = function(name) {
            this.nameEl.innerHTML = name;
        }

        listEl.setLoc = function(loc) {
            if (this.locEl)
                this.locEl.innerHTML = loc;
        }

        listEl.select = function() {
            this.className = "list_element_container_selected";
            this.nameEl.className = "list_element_name_selected";
            if (this.locEl) {
                this.locEl.className = "list_element_loc_selected";
                ge('to_image').src = this.locEl.innerHTML;
                ge('to_url').href = 'profile.php?id=' + id;
            }
            if (oThis.idEl) {
                oThis.idEl.value = this._id;
            }
        }

        listEl.unselect = function() {
            this.className = "list_element_container";
            this.nameEl.className = "list_element_name";
            if (this.locEl) {
                this.locEl.className = "list_element_loc";
            }
            //if(oThis.idEl)
            //{
            //    oThis.idEl.value = -1;
            //}
        }

        listEl.onmousedown = function() {
            oThis.textBoxEl.value = this._value;
            if (oThis.idEl) {
                oThis.idEl.value = this._id;
            }
            oThis.onTypeAheadSuccess();

            //if(oThis.formEl)
            //{
            //   oThis.formEl.submit();
            //}

            if (oThis.onListElMouseDown) {
                oThis.onListElMouseDown(oThis, this);
            }
            oThis.setFrame();
        }

        listEl.onmouseover = function() {
            if (oThis.selectedEl) {
                oThis.selectedEl.unselect();
            }
            oThis.selectedEl = this;
            oThis.selectedIndex = this._index;
            this.select();
        }

        listEl.onmouseout = function() {
            this.unselect();
        }
        listEl.style.zIndex = "101";

        var dividerEl;
        if (index == -1) {
            dividerEl = this.createDivider();
            listEl.appendChild(dividerEl);
        }

        var nameEl = document.createElement("div");
        nameEl.className = "list_element_name";
        nameEl.innerHTML = name;
        listEl.appendChild(nameEl);
        listEl.nameEl = nameEl;
        listEl.locEl = locEl;

        if (loc) {
            var locEl = document.createElement("div");
            locEl.className = "list_element_loc";
            locEl.innerHTML = loc;
            locEl.setAttribute("id", "test" + id);
            listEl.appendChild(locEl);
            listEl.locEl = locEl;
        }

        dividerEl = this.createDivider();
        listEl.appendChild(dividerEl);

        listEl.unselect();

        return listEl;
    }

    this.createDivider = function() {
        var dividerEl = document.createElement("div");
        dividerEl.className = "list_element_divider";
        return dividerEl;
    }

    this.createDropDownContainer = function() {
        var containerEl = document.createElement("div");
        containerEl.className = "dropdown-container";
        this.containerEl = containerEl;
        this.positionDropDown();
    }

    this.createDropDown = function() {
        /*
            var dropDownHeaderEl = document.createElement("div");
            dropDownHeaderEl.className = "header";
            dropDownHeaderEl.style.display = "none";
            dropDownHeaderEl.innerHTML = "Did you mean...";
            
            this.containerEl.appendChild(dropDownHeaderEl);
            this.dropDownHeaderEl = dropDownHeaderEl;
        */

        var dropDownEl = document.createElement("div");
        dropDownEl.className = "dropdown";
        dropDownEl.style.display = "none";
        dropDownEl.style.zIndex = "101";

        dropDownEl.hide = function() {
            this.style.display = "none";
            //      oThis.dropDownHeaderEl.style.display = "none";
        }
        dropDownEl.show = function() {
            this.style.display = "";
            //      oThis.dropDownHeaderEl.style.display = "";

            // safari doesn't always position this correctly on initialization, so explicitly call it here.
            oThis.positionDropDown();
        }

        this.containerEl.appendChild(dropDownEl);
        this.dropDownEl = dropDownEl;
    }

    this.createDefaultDropDown = function() {
        var defaultDropDownHeaderEl = document.createElement("div");
        defaultDropDownHeaderEl.className = "typeahead_header";
        defaultDropDownHeaderEl.style.display = "none";
        defaultDropDownHeaderEl.innerHTML = "Search elsewhere...";

        this.containerEl.appendChild(defaultDropDownHeaderEl);
        this.defaultDropDownHeaderEl = defaultDropDownHeaderEl;

        var defaultDropDownEl = document.createElement("div");
        defaultDropDownEl.style.display = "none";

        defaultDropDownEl.show = function() {
            if (oThis.defaultDropDownCount > 0) {
                this.style.display = "";
                oThis.defaultDropDownHeaderEl.style.display = "";
            } else {
                oThis.dropDownEl.style.borderBottom = "1px solid #777";
            }
        }

        defaultDropDownEl.hide = function() {
            this.style.display = "none";
            oThis.defaultDropDownHeaderEl.style.display = "none";
        }


        defaultDropDownEl.className = "default-dropdown";
        defaultDropDownEl.hide();
        this.containerEl.appendChild(defaultDropDownEl);
        this.defaultDropDownEl = defaultDropDownEl;
        this.defaultDropDownCount = defaultDropDownEl.childNodes.length;
    }

    this.createDefaultText = function() {
        var defaultTextEl = document.createElement("div");
        defaultTextEl.className = "default-text";
        defaultTextEl.style.display = "none";

        defaultTextEl.hide = function() {
            this.style.display = "none";
        }

        defaultTextEl.show = function() {
            this.style.display = "";
            if (oThis.defaultDropDownCount == 0) {
                this.style.borderBottom = "1px solid #777";
            }
        }

        defaultTextEl.setDefault = function() {
            this.innerHTML = instructions;
        }

        defaultTextEl.setText = function(text) {
            this.innerHTML = text;
        }

        defaultTextEl.setDefault();

        if (!this.defaultOptions) {
            defaultTextEl.style.borderBottom = "0px solid";
        }

        this.containerEl.appendChild(defaultTextEl);
        this.defaultTextEl = defaultTextEl;
    }

    this.positionDropDown = function() {
        var containerEl = this.containerEl;
        if (containerEl) {
            var posEl = this.positionEl || this.textBoxEl;
            if (this.resize) {
                var offX = this.isIE ? 9 : this.isOpera ? 0 : 1;
                var offY = this.isIE ? 10 : 0;
                containerEl.style.left = elementX(posEl) + offX + "px";
                containerEl.style.top = elementY(posEl) + posEl.offsetHeight + offY + "px";
            }
            if (!this.isIE) {
                containerEl.style.width = posEl.offsetWidth + "px";
            } else {
                containerEl.style.width = posEl.offsetWidth + "px";
            }
        }
    }

    this.getText = function() {
        return this.textBoxEl.value;
    }

    this.getSelectedText = function() {
        return this.selectedEl ? this.selectedEl._value : '';
    }

    this.noMatches = function() {
        return this._noMatches;
    }

    this.getID = function() {
        return this.selectedEl ? this.selectedEl._id : 0;
    }

    this.setText = function(q, reset) {
        this.textBoxEl.setText(q, reset);
    }

    this.init = function() {
        this._noMatches = false;
        this.registryIndex = _registryIndex;
        Registry[_registryIndex++] = this;

        this.lastKeyCode = -1;

        this.currentInputValue = textBoxEl.value;
        this.lastTypedValue = "";
        this.lastInputValue = "";

        this.dropDownCount = 0;
        this.defaultDropDownCount = 0;

        this.selectedIndex = -1;
        this.selectedEl = null;

        this.reFocused = false;

        textBoxEl.setAttribute("placeholder", placeholderText);
        textBoxEl.style.color = '#777';
        textBoxEl.ph = placeholderText;

        textBoxEl.oThis = this;

        if (textBoxEl.onblur)
            textBoxEl._onblur = textBoxEl.onblur;
        textBoxEl.onblur = function() {
            if (textBoxEl._onblur)
                textBoxEl._onblur();
            if (!oThis.reFocused) {
                oThis.dropDownEl.hide();
                oThis.defaultTextEl.hide();
                oThis.defaultDropDownEl.hide();
            }
            if (oThis.selectedIndex == -1) {
                //this.value = "";
                oThis.idEl.value = -1;
            }
            oThis.reFocused = false;

            var ph = this.getAttribute("placeholder");
            if (this.isFocused && ph && (this.value == "" || this.value == ph)) {
                this.isFocused = 0;
                this.value = ph;
                this.style.color = '#777';
            }
            oThis.setFrame();
        }

        textBoxEl.onfocus = function() {
            // need this because this is called from a setTimeout
            var oThis = this.oThis;
            if (!this.isFocused) {
                this.isFocused = 1;
                if (oThis.selectedIndex == -1 && this.value == this.getAttribute("placeholder")) {
                    this.value = '';
                }

            }
            if (oThis.dropDownCount > 0 || oThis.defaultTextEl.innerHTML != '') {
                if (oThis.dropDownCount == 0) {
                    oThis.defaultTextEl.show();
                }

                if (this.createTextRange) {
                    var t = this.createTextRange();
                    t.moveStart("character", 0);
                    t.select();
                } else if (this.setSelectionRange) {
                    this.setSelectionRange(0, this.value.length);
                }

                oThis.dropDownEl.show();
                oThis.defaultDropDownEl.show();
                oThis.positionDropDown();
                oThis.setFrame();
            }
            this.style.color = '#000';
        }

        textBoxEl.onkeyup = function(event) {
            oThis.handleKeyUp(event);
        }

        textBoxEl.setText = function(q, reset) {
            var ph = this.getAttribute("placeholder");
            this.isFocused = 0;
            if (q) {
                this.style.color = '#000';
                this.value = q;
                var ev = new Object();
                ev.keyCode = 0;
                ev.pEvent = 1;
                oThis.handleKeyUp(ev);
            } else if (ph && ph != "") {
                if (reset) {
                    this.value = "";
                    this.style.color = '#000';
                } else {
                    this.value = ph;
                    this.style.color = '#777';
                }
                this.isFocused = 0;
                oThis.textBoxEl.style.abackground = "#FFFFFF";
            } else {
                this.value = "";
                oThis.textBoxEl.style.abackground = "#FFFFFF";
            }
        }

        if (formEl) {
            formEl.onsubmit = function() {
                oThis.setFrame();
                if (_lastKeyCode == 13) {
                    _lastKeyCode = -1;
                    return false;
                }
                if (oThis.selectedIndex != -1 && oThis.selectedEl) {
                    oThis.idEl.value = oThis.selectedEl._id;
                }
                //this.submit();
                return true;
            }
        }
        this.formEl = formEl;

        this.textBoxEl = textBoxEl;
        this.positionEl = positionEl;

        this.idEl = idEl;
        this.onInputChange = onInputChangeHandler;
        this.onSuccess = onSuccessHandler;
        this.defaultOptions = defaultOptions;
        this.useFilter = useFilter;
        this.onUp = onUpHandler;
        this.onDown = onDownHandler;
        this.onListElMouseDown = onListElMouseDownHandler;
        this.showNoMatches = showNoMatches;

        this.fireCount = 0;
        this.isIE = 0;
        this.isSafari = 0;
        this.isOpera = 0;
        if (navigator) {
            this.browser = navigator.userAgent.toLowerCase();
            if (this.browser.indexOf("safari") != -1) {
                this.isSafari = 1;
            }
            if (this.browser.indexOf("msie") != -1) {
                this.isIE = 1;
            }
            if (this.browser.indexOf("opera") != -1) {
                this.isOpera = 1;
            }
        }

        //var blank_spot = ge('blank_spot');
        var blank_spot = rootEl;
        this.createDropDownContainer();
        this.createDropDown();
        this.createDefaultText();
        this.createDefaultDropDown();
        this.positionDropDown();
        var savior = document.createElement("div");
        savior.id = "savior";
        this.containerEl.id = "dropdown";
        this.goodFrame = null;
        if (rootEl) {
            if (blank_spot && this.isIE) {
                rootEl.appendChild(savior);
            }
            rootEl.appendChild(this.containerEl);
        }

        if (blank_spot == rootEl && this.isIE) {
            var goodFrame = document.createElement('iframe');
            goodFrame.id = "goodFrame";
            goodFrame.style.width = "0px";
            goodFrame.style.height = "0px";
            goodFrame.style.zIndex = "98";
            blank_spot.insertBefore(goodFrame, blank_spot.firstChild);
            blank_spot.style.zIndex = "99";
            this.goodFrame = goodFrame;
        }
    }

    var oThis = this;
    this.init();

    if (!window.onresize) {
        window.onresize = function(event) {
            for (var idx in Registry) {
                Registry[idx].positionDropDown();
            }
        }
    }


    if (textBoxEl.onkeydown)
        textBoxEl._onkeydown = textBoxEl.onkeydown;
    textBoxEl.onkeydown = function(event) {
        oThis.handleKeyDown(event);
        if (textBoxEl._onkeydown)
            textBoxEl._onkeydown();
    }
}