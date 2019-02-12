/*
  Options:
    - type
    - historyItems - history items (do not pass anything to disable history)
    - onlyShowSuggestions(bool) - not write suggested value to search input on select suggestion and not triggerSearch
    - fetchSuggestionsFn(function) - custom fetch suggestions function for provide suggestions:
                                     if it used then hints are ignored
    - onSelectSuggestion(suggestionId, suggestionValue, suggestionEl) - callback raised while suggestion element are selected
    - onAcceptSuggestion(suggestionId, suggestionValue, suggestionEl) - callback raised while suggestion element are accepted
                                                                        by click or enter

    - onSearch - callback (searchQuery, suggestedSearchQuery)
*/
function Suggester(inputEl, opts) {
    this._inputEl = inputEl;
    this.setOptions(opts);
    this._opts.history = !!this._opts.historyItems;

    this._fetchTO = false;

    this._candidateQuery = '';

    this._suggestions = {};

    addEvent(this._inputEl, 'input keyup keydown change valueChanged refresh', this._onInputValueChanged.bind(this));
    addEvent(this._inputEl, 'click', this._onInputClick.bind(this));

    var searchBtn = geByClass1('_ui_search_button_search', this._parentEl());
    if (searchBtn) {
        addEvent(searchBtn, 'click', (function() {
            if (this.value()) {
                this._hideSuggestions(true);
                this._triggerSearch(this.value(), true);
            }
            this._inputEl.focus();
        }).bind(this));
    }
}

Suggester.FETCH_DELAY = 250;
Suggester.FETCH_TIMEOUT = 9500;
Suggester.SEARCH_TRIGGER_DELAY = 200;

Suggester.prototype._onInputClick = function() {
    var q = this.value();

    if (!this._isSuggestionsShown() && !q && this._opts.history && this._opts.historyItems) {
        this._showSuggestions(this._opts.historyItems, true);
    }

    if (!this._isSuggestionsShown() && q && this._suggestions[q]) {
        this._showSuggestions(this._suggestions[q]);
    }
}

Suggester.prototype._onInputValueChanged = function(event) {
    if (event.type == 'valueChanged') { // value was changed programmatically by val(input, 'foo')
        if (!this.value()) {
            this._hideSuggestions(true);
            this._triggerSearch('');
        }
    }

    if (event.type == 'refresh') {
        if (!this.value()) {
            this._hideSuggestions(true);
        }
    }

    if (event.keyCode === KEY.DEL) {
        // forget about suggestion candidate
        this._candidateIsNotAppropriateForUser = true;
        this._candidateQuery = '';
    } else {
        this._candidateIsNotAppropriateForUser = false;
    }

    var needCancelEvent = false;

    if (event.type == 'keydown') {
        this._prevCaretPos = this._prevCaretPos || 0;

        if (this._candidateQuery) {
            // check user wants to use suggestion (tab / right arrow while at the end of query)
            if (event.keyCode == KEY.TAB || (event.keyCode == KEY.RIGHT && this._inputEl.selectionStart == this._inputEl.value.length && this._prevCaretPos == this._inputEl.selectionStart)) {
                if (!this._opts.onlyShowSuggestions) {
                    this._inputEl.value = this._candidateQuery;
                }

                this._candidateQuery = '';
                this._renderCandidate(); // will hide candidate
                this._hideSuggestions();
                this._fetchSuggestions();

                if (event.keyCode == KEY.TAB) {
                    needCancelEvent = true;
                }
            }
        }

        setTimeout((function() {
            this._prevCaretPos = this._inputEl.selectionStart;
        }).bind(this));

        if (event.keyCode == KEY.UP || event.keyCode == KEY.DOWN) {
            if (this._isSuggestionsShown()) {
                this._selectSuggestion(event.keyCode == KEY.DOWN);
                return false;
            }
        }

        if (event.keyCode == KEY.ENTER) {
            this._onAcceptSuggestion();
            this._cancelFetchSuggestion();
            this._hideSuggestions(true);
            this._triggerSearch(this.value(), true);
            return;
        }

    } else if (event.type == 'keyup') {
        switch (event.keyCode) {
            case KEY.ESC:
                if (this._isSuggestionsShown()) {
                    this._triggerSearch(this.value(), this._candidateQuery ? this._candidateQuery : true);
                    this._hideSuggestions(true);
                } else {
                    this._inputEl.value = '';
                    this._triggerSearch('');
                }
                break;

            case KEY.ENTER:
            case KEY.RIGHT:
            case KEY.LEFT:
            case KEY.TAB:
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
            case 35: // pageup
            case 36: // pagedown
                break;

            case KEY.UP:
            case KEY.DOWN:
                break;

            default:
                var value = this.value();

                if (value.length > 1) {
                    // enough symbols to fetch suggestions
                    this._fetchSuggestions();
                    this._renderCandidate();
                } else {
                    this._hideSuggestions(true);
                }

                if (this._candidateIsNotAppropriateForUser) {
                    this._triggerSearchDelayed(value);
                } else {
                    this._triggerSearchDelayed(value, this._getFirstSuggestion(value));
                }
        }
    }

    setTimeout((function() {
        if (!this.value()) {
            this._candidateQuery = '';
        }
        this._renderCandidate();
    }).bind(this))

    if (needCancelEvent) {
        return false;
    }
}

Suggester.prototype._onAcceptSuggestion = function() {
    var selectedEl = geByClass1('ui_search_suggestion_selected', this._parentEl());
    if (selectedEl && isFunction(this._opts.onAcceptSuggestion)) {
        this._opts.onAcceptSuggestion(domData(selectedEl, 'id'), domData(selectedEl, 'value'), selectedEl);
    }
}

Suggester.prototype._cancelFetchSuggestion = function() {
    clearTimeout(this._fetchTimeout);
    clearTimeout(this._fetchTO);
    this._fetchTimeout = this._fetchTO = 0;
}

Suggester.prototype._selectSuggestion = function(down) {
    var className = 'ui_search_suggestion_selected';

    var selectedEl = geByClass1(className, this._parentEl());
    removeClass(selectedEl, className);

    if (down) {
        selectedEl = domNS(selectedEl) || geByClass1('ui_search_sugg_list_item', this._parentEl());
    } else {
        var items = geByClass('ui_search_sugg_list_item', this._parentEl());
        selectedEl = domPS(selectedEl) || items[items.length - 1];
    }

    addClass(selectedEl, className);

    this._candidateQuery = ''; // user select some variant, so candidate is not needed anymore

    if (selectedEl && isFunction(this._opts.onSelectSuggestion)) {
        this._opts.onSelectSuggestion(domData(selectedEl, 'id'), domData(selectedEl, 'value'), selectedEl);
    }
    if (!this._opts.onlyShowSuggestions) {
        this._inputEl.value = domData(selectedEl, 'value');
        this._triggerSearchDelayed(this.value(), true);
    }
}

Suggester.prototype._parentEl = function() {
    return gpeByClass('_wrap', this._inputEl);
}

Suggester.prototype._renderCandidate = function() {
    var shadowEl = geByClass1('_ui_search_suggester_shadow', this._parentEl());
    if (!shadowEl) {
        return;
    }

    var v = this.value();

    if (this._candidateQuery && this._candidateQuery.indexOf(v.toLowerCase()) === 0) {
        shadowEl.innerHTML = '<span class="ui_search_suggester_shadow_hidden">' + v + '</span>' + this._candidateQuery.substring(v.length)
        show(shadowEl);

        return true;
    } else {
        shadowEl.innerHTML = '';
        hide(shadowEl);

        return false;
    }
}

Suggester.prototype._isSuggestionsShown = function() {
    return !!this._suggestionsShown;
}

Suggester.prototype._hideSuggestions = function(andForgetCandidate) {
    if (andForgetCandidate) {
        this._candidateQuery = '';
        this._renderCandidate();
    }

    var suggListEl = geByClass1('_ui_search_sugg_list', this._parentEl());
    hide(suggListEl);

    hide(geByClass1('_ui_search_suggester_shadow', this._parentEl()));

    this._onWindowMouseDown && removeEvent(window, 'mousedown', this._onWindowMouseDown);
    this._renderCandidate();
    this._suggestionsShown = false;
}

Suggester.prototype._showSuggestions = function(data, isHistory) {
    // hide previous list
    this._hideSuggestions();

    data = data || [];

    var currValue = trim(this.value());
    //data = data.filter(function(item) {
    //  return item[3] != currValue;
    //});

    if (data.length == 0) {
        return;
    }

    // build list html
    {
        var suggListEl = geByClass1('_ui_search_sugg_list', this._parentEl());

        var itemsHtml = '';
        if (isHistory) {
            itemsHtml += '<div class="ui_search_sugg_history_header">' + getLang('global_recent_search_history') + '</div>';
        }

        itemsHtml += '<div>';

        var renderedCount = 0;
        var self = this;
        each(data, function(i, item) {
            if (currValue == item[3] && !self._opts.onlyShowSuggestions) {
                return
            }

            var removeHistory = '';
            if (isHistory) {
                removeHistory = '<a class="ui_search_sugg_list_item_remove" data-hash="' + item[4] + '" data-id="' + item[0] + '">' + getLang('global_remove_history_search_item') + '</a>';
            }

            var historyItemCls = isHistory ? 'ui_search_sugg_list_item_history' : '';
            itemsHtml += '<div class="ui_search_sugg_list_item ' + historyItemCls + '" data-value="' + item[3] + '" data-id="' + item[0] + '">' + item[1] + removeHistory + '</div>';

            renderedCount++
        });

        if (renderedCount == 0) {
            return
        }

        itemsHtml += '</div>';

        suggListEl.innerHTML = itemsHtml;

        show(suggListEl);
    }

    // add event listeners to list
    {
        removeEvent(suggListEl, 'click');
        addEvent(suggListEl, 'click', (function(event) {
            if (hasClass(event.target, 'ui_search_sugg_list_item_remove')) {
                var itemId = domData(event.target, 'id');
                var removeHash = domData(event.target, 'hash');
                var index = domChildIndex(domPN(event.target));
                re(domPN(event.target));

                this._opts.historyItems.splice(index, 1);
                if (this._opts.historyItems.length == 0) {
                    this._hideSuggestions();
                }

                ajax.post('al_search.php', {
                    act: 'remove_history_item',
                    hash: removeHash,
                    item_id: itemId,
                    type: this._opts.type
                });

                return false;
            }

            if (hasClass(event.target, 'ui_search_sugg_list_item')) {
                var value = domData(event.target, 'value');
                this._onAcceptSuggestion();
                this._hideSuggestions(true);
                if (!this._opts.onlyShowSuggestions) {
                    this._inputEl.value = value;
                    this._triggerSearch(value, true, true);
                }
                elfocus(this._inputEl);
            }
        }).bind(this));

        removeEvent(suggListEl, 'mousemove');
        addEvent(suggListEl, 'mousemove', (function(event) {
            if (hasClass(event.target, 'ui_search_sugg_list_item')) {
                removeClass(geByClass1('ui_search_suggestion_selected', suggListEl), 'ui_search_suggestion_selected');
                addClass(event.target, 'ui_search_suggestion_selected');
            }
        }).bind(this));

        removeEvent(suggListEl, 'mouseleave');
        addEvent(suggListEl, 'mouseleave', (function(event) {
            removeClass(geByClass1('ui_search_suggestion_selected', suggListEl), 'ui_search_suggestion_selected');
        }).bind(this));
    }

    // if user didn't hit DEL previously prepare candidate query to show as shadow suggestion
    if (!this._candidateIsNotAppropriateForUser && !isHistory) {
        this._candidateQuery = data[0][3];
        if (!this._renderCandidate()) {
            this._candidateQuery = '';
        }
    }

    // add global event listener for list hiding
    addEvent(window, 'mousedown', this._onWindowMouseDown = (function(event) {
        if (!domClosest('_wrap', event.target) || hasClass(event.target, '_ui_search_params_button')) { // check that click wasn't inside search wrap
            this._hideSuggestions(true);
        }
    }).bind(this));

    this._suggestionsShown = true;
}

Suggester.prototype._triggerSearchDelayed = function(value, suggestedValue) {
    clearTimeout(this._triggerSearchTO);

    var delay = this._opts.search_trigger_delay || Suggester.SEARCH_TRIGGER_DELAY;
    this._triggerSearchTO = setTimeout(function() {
        this._triggerSearch(value, suggestedValue);
    }.bind(this), delay);
}

Suggester.prototype._triggerSearch = function(value, suggestedValue, fromHistory) {
    if (!value) {
        suggestedValue = '';
    }

    value = trim(value);

    if (suggestedValue === true) {
        suggestedValue = value;
    }

    suggestedValue = suggestedValue !== (void 0) ? trim(suggestedValue) : suggestedValue;

    if (this._lastTriggeredSearch !== undefined) {
        if (!this._lastTriggeredSearch && !value) {
            return
        }
    }

    if (this._lastTriggeredSearch && this._lastTriggeredSearch == value) {
        if (this._lastTriggeredSuggestedSearch && suggestedValue === (void 0) || this._lastTriggeredSuggestedSearch == suggestedValue) {
            return
        }
    }

    this._lastTriggeredSearch = value;
    this._lastTriggeredSuggestedSearch = suggestedValue;

    this._opts.onSearch && this._opts.onSearch(value, suggestedValue, fromHistory);
}

Suggester.prototype.value = function() {
    return trim(this._inputEl.value) ? this._inputEl.value : '';
}

Suggester.prototype._getFirstSuggestion = function(q) {
    if (this._suggestions[q] && this._suggestions[q][0]) {
        return this._suggestions[q][0][3]
    } else {
        return false
    }
}

Suggester.prototype._onSuggestionsFetched = function(q, data) {
    var value = trim(this.value());

    if (value == q) { // ensure we have actual query
        this._suggestions[q] = data;
        this._showSuggestions(data);

        if (data.length) {
            // if some data fetched so search one of it
            if (this._candidateIsNotAppropriateForUser) {
                this._triggerSearch(value);
            } else {
                this._triggerSearch(value, this._candidateQuery ? this._candidateQuery : true);
            }
        } else {
            // else use currently typed query
            this._triggerSearch(value, true);
        }
    }
}

Suggester.prototype.saveHistoryItem = function(q, objectOwnerId, objectId, totalCount, totalCountHash) {
    if (!totalCount || !this._opts.history) {
        return
    }

    var hist = this._opts.historyItems || [];
    for (var i = 0, len = hist.length; i < len; i++) {
        if (hist[i][1] == q) {
            return;
        }
    }

    ajax.post('al_search.php', {
        act: 'save_history_item',
        type: this._opts.type,
        q: q,
        object_owner_id: objectOwnerId,
        object_id: objectId,
        total_count: totalCount,
        total_count_hash: totalCountHash,
        hash: this._opts.saveHash
    }, {
        onDone: (function(history) {
            if (history) {
                this._opts.historyItems = history || [];
            }
        }).bind(this)
    });
}

Suggester.prototype.setOptions = function(options, extendOptions) {
    if (extendOptions) {
        this._opts = extend(this._opts, options);
    } else {
        this._opts = extend(options, {});
    }
}

Suggester.prototype._fetchSuggestions = function() {
    clearTimeout(this._fetchTO);

    var value = trim(this.value());
    if (value.length < 2) { // do not search suggestions for too short queries
        return;
    }

    if (!isFunction(this._opts.fetchSuggestionsFn)) {
        this._fetchTO = setTimeout((function() {

            this._fetchTimeout = setTimeout((function() {
                this._fetchTimeout = 0;
                this._onSuggestionsFetched(value, []);
            }).bind(this), Suggester.FETCH_TIMEOUT);

            ajax.post('/hints.php', {
                act: 'a_gsearch_hints',
                q: value,
                section: this._opts.type
            }, {
                onDone: (function(data) {
                    if (this._fetchTimeout) {
                        clearTimeout(this._fetchTimeout);
                        this._onSuggestionsFetched(value, data);
                    }

                }).bind(this),

                cache: 1
            });

        }).bind(this), Suggester.FETCH_DELAY);
    } else {
        this._onSuggestionsFetched(value, this._opts.fetchSuggestionsFn(value));
    }
}

try {
    stManager.done('suggester.js');
} catch (e) {}