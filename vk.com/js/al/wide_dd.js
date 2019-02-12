(function() {

    var wdd = {
        _textEvent: function(e) {
            var el = e.target,
                id = el.dd,
                dd = cur.wdd[id];
            switch (e.type) {
                case 'focus':
                    el.focused = true;
                    if (!el.active || dd.opts.noMultiSelect && dd.chosen && dd.chosen[1] == val(el)) {
                        val(el, '');
                        el.style.color = '';
                        el.active = 1;
                        el.phd = false;
                    }

                    wdd._updateTextInput(dd);
                    wdd._updateList(dd);
                    if (dd.opts.onTextFocus) dd.opts.onTextFocus();
                    break;

                case 'blur':
                    el.focused = false;
                    if (!(el.active = (!el.phd && el.value) ? 1 : '')) { // not val(el)
                        if (isEmpty(dd.selected) && !dd.chosen) {
                            val(el, el.ph);
                            el.style.color = '#777';
                            el.phd = true;
                        } else if (dd.chosen && !val(el)) {
                            val(el, (el.tagName == 'INPUT' ? unclean(dd.chosen[1]) : dd.chosen[1]));
                        } else {
                            hide(el);
                            if (!dd.full) show(dd.add);
                        }
                    } else if (dd.over && dd.opts.chooseOnBlur && dd.opts.chooseOnBlur(dd.over)) {
                        wdd.select(id);
                        hide(el);
                        if (!dd.full) show(dd.add);
                    }

                    wdd._hideList(dd);
                    if (dd.opts.onTextBlur) dd.opts.onTextBlur();
                    break;

                case 'keydown':
                case 'keypress':
                    clearTimeout(dd.updateTimer);
                    dd.updateTimer = setTimeout(wdd._updateList.pbind(dd, false), 0);

                    var el = ge('wddi' + dd.over + '_' + id);
                    if (e.keyCode == KEY.UP) {
                        if (el && domPS(el)) {
                            wdd.over(id, domPS(el).id.replace(/^wddi/, '').replace(new RegExp('_' + id + '$', ''), ''), true);
                        }
                        e.canceled = true;
                        return cancelEvent(e);
                    } else if (e.keyCode == KEY.DOWN) {
                        if (el && domNS(el)) {
                            wdd.over(id, domNS(el).id.replace(/^wddi/, '').replace(new RegExp('_' + id + '$', ''), ''), true);
                        }
                        e.canceled = true;
                        return cancelEvent(e);
                    } else if (e.keyCode == KEY.RETURN) {
                        wdd.select(id);
                        e.canceled = true;
                        return cancelEvent(e);
                    } else if (e.keyCode == KEY.ESC) {
                        dd.text.blur();
                        e.canceled = true;
                        return cancelEvent(e);
                    }
                    break;
            }
        },
        _getTextValue: function() {
            return this.active ? this.value : '';
        },
        _widenTextInput: function(dd) {
            if (vk.rtl) {
                dd.text.style.width = (Math.max((dd.text.offsetTop > 20 ? dd.fullWidth : dd.partWidth) - dd.fullWidth + (dd.text.offsetLeft + dd.text.offsetWidth) - 2, dd.addWidth) - dd.textDelta) + 'px';
            } else {
                dd.text.style.width = (Math.max((dd.text.offsetTop > 20 ? dd.fullWidth : dd.partWidth) - (dd.text.offsetLeft - dd.textOffset) - 2, dd.addWidth) - dd.textDelta) + 'px';
            }
            wdd._showList(dd);
        },
        _updateTextInput: function(dd) {
            if (!dd.addWidth) return;
            dd.text.style.width = (dd.addWidth - dd.textDelta) + 'px';
            setTimeout(wdd._widenTextInput.pbind(dd), 0);
        },
        _focusText: function(dd) {
            if (dd.full || dd.disabled) {
                return;
            }
            hide(dd.add);
            show(dd.text);
            wdd._updateTextInput(dd);
            setTimeout(elfocus.pbind(dd.text), 0);
        },

        _clickEvent: function(dd, e) {
            if (e.target == dd.arrow) return;
            if (e.target == dd.text.parentNode) {
                return wdd._focusText(dd);
            }
            for (var el = e.target; el && el != dd.text.parentNode; el = el.parentNode) {
                if (el == dd.add) {
                    return wdd._focusText(dd);
                }
            }
        },
        _arrDownEvent: function(dd, e) {
            if (isVisible(dd.listWrap)) {
                wdd._hideList(dd);
            } else {
                wdd._focusText(dd);
            }
        },
        _afterInit: function(dd) {
            wdd._index(dd);
            if (!browser.opera_mobile) {
                wdd._textEvent({
                    target: dd.text,
                    type: dd.text.focused ? 'focus' : 'blur'
                });
            }
            extend(dd, {
                addWidth: getSize(dd.add)[0],
                textDelta: getSize(dd.text)[0] - intval(getStyle(dd.text, 'width')),
                fullWidth: getSize(domPN(dd.text))[0] - 4,
                textOffset: dd.text.offsetLeft
            });
            dd.partWidth = dd.fullWidth - getSize(dd.arrow)[0];
            if (dd.text.focused) {
                wdd._updateList(dd);
            } else {
                wdd._updateTextInput(dd);
            }
            addEvent(dd.text.parentNode, 'click', wdd._clickEvent.pbind(dd));
            addEvent(dd.arrow, 'mousedown', wdd._arrDownEvent.pbind(dd));

            if (dd.opts.noMultiSelect && dd.opts.chosen) {
                wdd.choose(dd.id, false, dd.opts.chosen, true);
            }
        },

        _updateList: function(dd, force, q) {
            if (!dd.cache['']) return;

            q = q !== undefined ? q : trim(val(dd.text));
            if (dd.lastQ === q && !force) {
                wdd._showList(dd);
                return;
            }
            dd.lastQ = q;
            clearTimeout(dd.requestTimer);

            var custom = dd.opts.custom,
                data = custom && custom(q);
            if (data) {
                wdd._renderList(dd, data);
            } else {
                data = dd.cache[q];
                if (data) {
                    wdd._renderList(dd, data, true);
                } else {
                    data = wdd._search(dd, q);
                    wdd._renderList(dd, data, !dd.opts.url);
                    if (dd.opts.url) {
                        dd.requestTimer = setTimeout(wdd._requestList.pbind(dd), dd.opts.requestWait);
                    }
                }
            }
        },
        _index: function(dd) {
            var def = dd.opts.defaultItems,
                items = dd.opts.items,
                defIds = [],
                i, l;
            for (i = 0, l = def.length; i < l; ++i) {
                defIds.push(i);
            }
            dd.cache[''] = defIds;

            for (i = 0, l = items.length; i < l; ++i) {
                wdd._indexItem(dd, i, items[i]);
            }
        },
        _indexItem: function(dd, k, v) {
            var i, j, l, words = '',
                keys = dd.opts.searchKeys,
                indexedKeys = {};
            for (i = 0, l = keys.length; i < l; ++i) {
                words += ' ' + (v[keys[i]] || '').replace(dd.opts.delimeter, ' ').replace(/<[^>]*>/g, '');
            }
            words += (parseLatin(words) || '') + (parseCyr(words) || '');
            words = trim(words.toLowerCase()).split(/\s+/);
            for (i = 0; i < words.length; i++) {
                for (j = 1; j <= dd.opts.wholeIndex; j++) {
                    var key = words[i].substr(0, j);
                    if (indexedKeys[key]) continue;
                    if (!dd.index[key]) dd.index[key] = [];
                    dd.index[key].push(k);
                    indexedKeys[key] = 1;
                }
            }
        },
        _search: function(dd, q) {
            q = trim(q.toLowerCase().replace(dd.opts.delimeter, ' '));
            if (!q) {
                return dd.cache[''];
            }

            var whole = dd.opts.wholeIndex;
            if (q.length <= whole && q.indexOf(' ') == -1) {
                return dd.index[q] || [];
            }

            q = q.split(' ');
            var minSize = 0,
                minQ = '',
                i, l, res;
            for (i = 0, l = q.length; i < l; ++i) {
                var part = q[i].substr(0, whole);
                var items = dd.index[part];
                if (!minQ || !items || items.length < minSize) {
                    minSize = items ? items.length : 0;
                    minQ = part;
                }
                if (!minSize) return [];
            }

            var res = [],
                keys = dd.opts.searchKeys,
                len = keys.length,
                qlen = q.length;
            for (i = 0, l = dd.index[minQ].length; i < l; ++i) {
                var v = dd.index[minQ][i],
                    item = dd.opts.items[v];
                var fail = false,
                    words = '',
                    key;
                for (var j = 0; j < len; ++j) {
                    words += ' ' + (item[keys[j]] || '').replace(dd.opts.delimeter, ' ').replace(/<[^>]*>/g, '');
                }
                words += (parseLatin(words) || '') + (parseCyr(words) || '');
                words = words.toLowerCase();
                for (j = 0; j < qlen; ++j) {
                    if (words.indexOf(' ' + q[j]) == -1) {
                        fail = true;
                        break;
                    }
                }
                if (!fail) {
                    res.push(v);
                }
            }
            return res;
        },
        _requestList: function(dd) {
            var q = trim(val(dd.text));
            if (!q) return;

            ajax.post(dd.opts.url, extend({
                str: q
            }, dd.opts.params || {}), {
                onDone: function(data) {
                    dd.cache[q] = wdd._search(dd, q).concat(data);
                    wdd._renderList(dd, data, true, true);
                }
            });
        },
        _renderList: function(dd, data, showEmpty, append) {
            var html = [],
                shown = 0,
                q = dd.lastQ,
                hl = wdd._highlight,
                markfn = dd.opts.itemMark;
            if (dd.outdated) append = false;
            if (append) {
                shown = (dd.list.__uiScroll__ ? dd.list.__uiScroll__.content : dd.list).childNodes.length;
            } else {
                dd.shown = {};
                shown = 0;
            }
            for (var i = 0, l = data.length; i < l; ++i) {
                var item = data[i];
                if (!isArray(item)) {
                    item = dd.opts.items[item];
                }

                var id = item[0] + '',
                    id_ = id + '_',
                    cl = '';
                if (dd.selected[id_] || dd.shown[id_] || dd.selCount && item[8] > 0) continue;
                dd.shown[id_] = item;

                var onlineClass = isArray(item[3]) ? '' : ' ' + onlinePlatformClass(markfn(item));
                var img = item[3] ? '<b class="fl_l wddi_thumb' + onlineClass + '"><img class="wddi_img" src="' + (isArray(item[3]) ? '/images/community_' + (window.devicePixelRatio >= 2 ? 100 : 50) + '.png' : item[3]) + '" /></b>' : '',
                    cl;
                if (shown) {
                    cl = 'wddi';
                } else {
                    cl = 'wddi_over';
                    dd.over = id;
                }
                var text = q && hl(item[1] || '', q) || (item[1] || ''),
                    sub = q && hl(item[2] || '', q) || (item[2] || '');
                html.push('\
<div class="' + cl + '" onmousedown="WideDropdown.over(\'' + dd.id + '\', \'' + clean(id) + '\'); WideDropdown.select(\'' + dd.id + '\', event)" onmousemove="WideDropdown.over(\'' + dd.id + '\', \'' + clean(id) + '\')" id="wddi' + id + '_' + dd.id + '" onclick="">\
  <div class="wddi_data">' + img + '\
    <div class="wddi_text">' + text + '</div>\
    <div class="wddi_sub">' + sub + '</div>\
  </div>\
</div>');
                ++shown;
            }
            html = html.join('');
            if (!shown && showEmpty) {
                html = '<div class="wddi_no">' + (q ? dd.opts.noResult : dd.opts.introText) + '</div>';
            }
            if (append) {
                (dd.list.__uiScroll__ ? dd.list.__uiScroll__.content : dd.list).innerHTML += html;
            } else if (html) {
                dd.outdated = false;
                (dd.list.__uiScroll__ ? dd.list.__uiScroll__.content : dd.list).innerHTML = html;
            } else {
                dd.outdated = true;
            }
            if (!dd.outdated) {
                dd.list.style.height = (shown > 5) ? '242px' : '';
                wdd._showList(dd);
                dd.scroll && dd.scroll.scrollTop();
                setTimeout(wdd._checkScroll.pbind(dd), 0);
            }
            wdd._updatePos(dd);
        },
        _highlight: function(label, q) {
            var terms = [escapeRE(q)],
                termRus = parseLatin(q),
                termLat = parseCyr(q);

            if (termRus !== null) {
                terms.push(escapeRE(termRus));
            }
            if (termLat !== null) {
                terms.push(escapeRE(termLat));
            }
            var re = new RegExp('(?![^&;]+;)(?!<[^<>]*)((\\(*)(' + terms.join('|') + '))(?![^<>]*>)(?![^&;]+;)', 'gi');
            return label.replace(re, '$2<span class="wdd_hl">$3</span>');
        },
        _checkScroll: function(dd) {
            if (dd.scroll === void 0) {
                dd.scroll = false;
                stManager.add(['ui_common.css', 'ui_common.js'], function() {
                    dd.scroll = new uiScroll(dd.list, {
                        global: true
                    });
                });
            }
        },
        _updatePos: function(dd) {
            var mt = dd.opts.toup ? -getSize(dd.listWrap)[1] - (dd.opts.input && getSize(dd.opts.input)[1] || 0) : getSize(dd.listWrap.parentNode)[1];
            dd.listWrap.style.marginTop = mt + 'px';
        },
        _showList: function(dd) {
            if (!dd.text.focused || dd.disabled) return;
            if (!isVisible(dd.listWrap)) {
                ge(dd.listWrap).style.display = 'block';
                dd.scroll && dd.scroll.update();
                wdd._updateList(dd, true);
            }
            wdd._updatePos(dd);
            addClass(dd.container, 'wdd_focused');
        },
        _hideList: function(dd) {
            hide(dd.listWrap);
            removeClass(dd.container, 'wdd_focused');
        },
        _updateImgs: function(dd, noAnim) {
            var el = dd.img;
            if (!dd.img) return;

            noAnim = dd.opts.noAnim ? dd.opts.noAnim : noAnim;

            var i = 0,
                text = [],
                imgs = [],
                cnt = 0,
                t;
            for (var k in dd.selected) {
                var item = dd.selected[k],
                    img = item[3],
                    href = item[4],
                    onl = item[5],
                    ids = item[6]; // item[7] is custom
                if (isArray(img)) {
                    for (var j = 0, l = img.length, el; j < l; ++j) {
                        el = clone(item);
                        el[0] = ids[j]; // for online status
                        el[3] = img[j];
                        el[4] = href[j];
                        el[5] = onl[j];
                        imgs.push(el);
                    }
                } else {
                    imgs.push(item);
                }
            }
            cnt = imgs.length;
            for (var k in imgs) {
                var item = imgs[k],
                    img = item[3],
                    href = item[4],
                    cl, t, n, o, r;
                if (cnt > 3) {
                    ++i;
                    cl = 'wdd_img_tiny ' + ((i == 1 || i == 4) ? 'fl_l' : 'fl_r');
                } else if (cnt == 3) {
                    cl = (i++ ? 'wdd_img_tiny fl_r' : 'wdd_img_half fl_l');
                } else if (cnt == 2) {
                    cl = 'wdd_img_half ' + (i++ ? 'fl_r' : 'fl_l');
                } else {
                    cl = 'wdd_img_full';
                }
                text.push(href ? ('<a href="' + href + '" class="' + cl + '">') : '<div class="' + cl + '">');
                text.push('<img class="wdd_img" src="' + img + '" />');
                text.push(href ? '</a>' : '</div>');
                if (i >= 4) break;
            }
            t = text.join('') || dd.opts.defImgText || '';
            dd.imgRand = false;
            if (noAnim === true) {
                val(dd.img, t);
            } else {
                o = ce('div', {
                    className: 'wdd_img_layer',
                    innerHTML: t
                });
                r = dd.imgRand = Math.random();
                for (n = domFC(dd.img); n && n.className == 'wdd_img_layer';) n = domNS(n);
                animate(n ? dd.img.insertBefore(o, n) : dd.img.appendChild(o), {
                    opacity: 1
                }, 150, function() {
                    if (dd.imgRand === r) {
                        val(dd.img, t);
                    }
                });
            }
        },

        init: function(el, opts) {
            if (!(el = ge(el))) return false;

            stManager.add(['notifier.css', 'notifier.js']); // for black scrollbar

            var id = el.id;
            if (!el.id) return false;

            if (!cur.wdd) {
                cur.wdd = {};
            } else if (cur.wdd[id]) {
                return false;
            }

            opts = extend({ // defaults
                cacheLength: 10000,
                requestWait: 300,
                wholeIndex: 2,
                maxItems: 29,
                noAnim: false,
                searchKeys: [1],
                defaultItems: opts.items || [],
                items: opts.defaultItems || [],
                itemMark: function(item) {
                    return intval(item[5]);
                }
            }, opts || {});

            var dd = {
                id: id,
                container: el,
                text: geByClass1('wdd_text', el),
                arrow: geByClass1('wdd_arr', el),
                img: opts.img && ge(opts.img),
                opts: opts,
                selected: {},
                selCount: 0,
                index: {},
                delimeter: /[\s\(\)\.,\-]+/g,
                cache: {}
            };
            if (dd.text.ph = dd.text.getAttribute('placeholder') || '') {
                el.setAttribute('placeholder', '');
            }
            dd.text.dd = id;
            if (opts.toup) {
                addClass(el, 'wdd_toup');
            }

            dd.add = el.insertBefore(ce('div', {
                className: 'wdd_add fl_l',
                innerHTML: '\
<div class="wdd_add2">\
  <table cellspacing="0" cellpadding="0"><tr>\
    <td><div class="wdd_add3">\
      <nobr>' + getLang('global_add') + '</nobr>\
    </div></td>\
    <td><div class="wdd_add_plus" onmousedown="WideDropdown.focus(\'' + id + '\')"></div></td>\
  </table>\
</div>'
            }), dd.text);
            dd.bubbles = el.insertBefore(ce('div', {
                className: 'wdd_bubbles'
            }), dd.add);
            dd.listWrap = el.insertBefore(ce('div', {
                className: 'wdd_lwrap',
                innerHTML: '<div class="wdd_list"></div>'
            }, {
                display: 'none',
                width: opts.width || getSize(el)[0]
            }), el.firstChild);
            dd.list = geByClass1('wdd_list', dd.listWrap);

            if (!browser.opera_mobile) {
                dd.text.active = val(dd.text) ? 1 : '';
                dd.text.getValue = wdd._getTextValue.bind(dd.text);
                addEvent(dd.text, 'focus blur ' + (browser.opera ? 'keypress' : 'keydown'), wdd._textEvent)
            }

            setTimeout(wdd._afterInit.pbind(dd), 0);

            return (cur.wdd[id] = dd);
        },
        initSelect: function(el, opts) {
            if (!(el = ge(el))) return false;

            stManager.add(['notifier.css', 'notifier.js']); // for black scrollbar

            var id = el.id;
            if (!el.id) return false;

            if (!cur.wdd) {
                cur.wdd = {};
            } else if (cur.wdd[id]) {
                return false;
            }

            opts = extend({ // defaults
                cacheLength: 10000,
                requestWait: 300,
                wholeIndex: 2,
                maxItems: 29,
                searchKeys: [1],
                defaultItems: opts.items || [],
                items: opts.defaultItems || [],
                itemMark: function(item) {
                    return intval(item[5]);
                }
            }, opts || {});

            var dd = {
                id: id,
                container: el,
                text: opts.text || geByClass1('wdd_text', el),
                opts: opts,
                selected: {},
                selCount: 0,
                index: {},
                delimeter: /[\s\(\)\.,\-]+/g,
                cache: {}
            };
            dd.text.dd = id;
            if (opts.toup) {
                addClass(el, 'wdd_toup');
            }

            dd.listWrap = el.insertBefore(ce('div', {
                className: 'wdd_lwrap',
                innerHTML: '<div class="wdd_list"></div>'
            }, {
                display: 'none',
                width: opts.width || getSize(el)[0]
            }), el.firstChild);
            dd.list = geByClass1('wdd_list', dd.listWrap);

            setTimeout(wdd._index.pbind(dd), 0);

            return (cur.wdd[id] = dd);
        },
        deinit: function(el, c) {
            if (!c) c = cur;
            if (!c.wdd || !(el = ge(el))) return false;

            var id = el.id;
            if (!el.id) return false;

            var dd = c.wdd[id];
            if (!dd) return false;

            cleanElems(dd.text, domPN(dd.text));
            delete(c.wdd[id]);

            return true;
        },
        items: function(id, def, list) {
            var dd = cur.wdd[id];
            if (!list) list = def;
            extend(dd, {
                index: {},
                cache: {}
            });
            extend(dd.opts, {
                defaultItems: def || [],
                items: list || []
            });
            wdd._index(dd);
            wdd._updateList(dd, true);
        },
        over: function(id, item, keys) {
            var dd = cur.wdd[id];
            if (dd.over == item) return;
            dd.over && replaceClass('wddi' + dd.over + '_' + id, 'wddi_over', 'wddi');
            dd.over = item;
            var el = ge('wddi' + dd.over + '_' + id);
            replaceClass(el, 'wddi', 'wddi_over');
            keys && dd.scroll && dd.scroll.scrollIntoView(el.firstElementChild || el);
        },
        choose: function(id, e, item, noFire) {
            var dd = cur.wdd[id],
                sel = item ? item[0] : dd.over,
                sel_ = sel + '_';
            if (!item) item = dd.shown[sel_];
            if (sel === undefined || !item) return;

            dd.over = false;

            if (dd.opts.onItemSelect && dd.opts.onItemSelect(item) === false) {
                return e && cancelEvent(e);
            }

            dd.chosen = item;

            val(dd.text, (dd.text.tagName == 'INPUT' ? unclean(item[1]) : item[1]));
            dd.text.style.color = '';
            dd.text.blur();
            wdd._textEvent({
                target: dd.text,
                type: dd.text.focused ? 'focus' : 'blur'
            });

            var res = dd.opts.onChange && !noFire ? dd.opts.onChange(1, sel) : true,
                noAnim = (res === 1);
            if (res !== 0) {
                setTimeout(wdd._updateImgs.pbind(dd, noAnim), 0);
            }

            return e && cancelEvent(e);
        },
        select: function(id, e, item) {
            var dd = cur.wdd[id],
                sel = item ? item[0] : dd.over,
                sel_ = sel + '_';
            if (dd.opts.noMultiSelect) {
                return this.choose(id, e, item);
            }
            if (!item) item = dd.shown[sel_];
            if (sel === undefined || dd.selected[sel_] || !item) return;

            dd.over = false;

            if (dd.opts.onItemSelect && dd.opts.onItemSelect(item) === false) {
                return e && cancelEvent(e);
            }

            dd.selected[sel_] = item;
            ++dd.selCount;
            dd.full = (dd.opts.maxItems && dd.selCount >= dd.opts.maxItems || item[8] > 0);

            dd.bubbles.appendChild(ce('div', {
                id: 'wddb' + sel_ + id,
                className: 'summary_tab_sel fl_l',
                innerHTML: '\
<div class="summary_tab2">\
  <table cellspacing="0" cellpadding="0"><tr>\
    <td><div class="summary_tab3">\
      <nobr>' + item[1] + '</nobr>\
    </div></td>\
    <td><div class="summary_tab_x" onmousedown="WideDropdown.deselect(\'' + id + '\', \'' + clean(sel + '') + '\', event)"></div></td>\
  </table>\
</div>'
            }));

            val(dd.text, '');
            dd.text.blur();
            wdd._textEvent({
                target: dd.text,
                type: dd.text.focused ? 'focus' : 'blur'
            });
            if (dd.full) {
                hide(dd.add);
                dd.arrow.style.visibility = 'hidden';
            } else {
                wdd._updateList(dd, true);
            }

            var res = dd.opts.onChange ? dd.opts.onChange(1, sel) : true,
                noAnim = (res === 1);
            if (res !== 0) {
                setTimeout(wdd._updateImgs.pbind(dd, noAnim), 0);
            }

            return e && cancelEvent(e);
        },
        updimgs: function(id) {
            var dd = cur.wdd[id],
                res = dd.opts.onChange ? dd.opts.onChange(0) : true,
                noAnim = (res === 1);
            if (res !== 0) {
                setTimeout(wdd._updateImgs.pbind(dd, noAnim), 0);
            }
        },
        deselect: function(id, sel, e) {
            var dd = cur.wdd[id];
            if (dd.disabled) {
                if (e) return cancelEvent(e);
                return;
            }
            if (sel === undefined) {
                dd.selCount = dd.full = 0;
                dd.arrow.style.visibility = 'hidden';
                for (var i in dd.selected) {
                    delete(dd.selected[i]);
                }
                val(dd.bubbles, '');
                dd.text.blur();
                hide(dd.add);
                show(dd.text);
                dd.text.style.width = (dd.partWidth - dd.textDelta - 2) + 'px';
                wdd._updateList(dd, true);
                wdd._updateImgs(dd);
            } else {
                var sel_ = sel + '_';
                if (!dd.selected[sel_]) return;

                delete(dd.selected[sel_]);
                re('wddb' + sel_ + id);

                if (dd.selCount) {
                    --dd.selCount;
                }
                dd.full = 0;
                dd.arrow.style.visibility = '';

                dd.text.blur();
                if (dd.selCount) {
                    show(dd.add);
                    hide(dd.text)
                } else {
                    hide(dd.add);
                    show(dd.text);
                    wdd._updateTextInput(dd);
                }

                wdd._updateList(dd, true);
            }

            var res = dd.opts.onChange ? dd.opts.onChange(-1, sel) : true,
                noAnim = (res === 1);
            if (res !== 0) {
                setTimeout(wdd._updateImgs.pbind(dd, noAnim), 0);
            }

            if (e) return cancelEvent(e);
        },
        focus: function(id) {
            wdd._focusText(cur.wdd[id]);
        },
        clear: function(id) {
            var dd = cur.wdd[id];
            val(dd.text, '');
            dd.text.blur();
            wdd._textEvent({
                target: dd.text,
                type: dd.text.focused ? 'focus' : 'blur'
            });
            wdd._updateList(dd, true);
        },
        disable: function(id, value) {
            var dd = cur.wdd[id];
            if (value && !dd.disabled) {
                dd.disabled = true;
                addClass(id, 'wdd_disabled');
            } else if (!value && dd.disabled) {
                dd.disabled = false;
                removeClass(id, 'wdd_disabled');
                wdd._updateList(dd, true);
            }
        }
    };

    window.WideDropdown = wdd;
})();

try {
    stManager.done('wide_dd.js');
} catch (e) {}