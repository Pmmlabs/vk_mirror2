var FansBox = {
    init: function(box, opts) {
        extend(cur, {
            fnbxOffsets: cur.fnbxOffsets || {},
            fnbxPhCache: cur.fnbxPhCache || {},
            fnbxPhShown: cur.fnbxPhShown || {},
            fnbxIdolsList: cur.fnbxIdolsList || {},
            fnbxIdolsCache: cur.fnbxIdolsCache || {},
            fnbxIdolsIndex: cur.fnbxIdolsIndex || {},
            fnbxIdolsProcessed: cur.fnbxIdolsProcessed || {},
            fnbxIdolsQuery: cur.fnbxIdolsQuery || '',

            fnbxAutoload: true,
            fnbxWasScroll: false,
            fnbxHash: opts.hash,
            fnbxOwnerId: opts.ownerId,
            fnbxObjectId: opts.objectId || '',
            fnbxId: box.tbId,
            fnbxSearchLink: opts.searchLink || '',
            fnbxPage: opts.address || 'al_fans.php',
            fnbxVars: opts.getVars || FansBox.fnbxVars
        });
        cur.fnbxOffsets[opts.tab] = opts.offset;

        ajax.preload(cur.fnbxPage, extend(cur.fnbxVars(opts.tab), {
            offset: opts.offset
        }), opts.preload);

        var bodyStyle = 'padding: 0;';
        if (!isVisible(box.titleWrap)) {
            bodyStyle += 'margin-top: 50px;';
        }
        box.setOptions({
            width: opts.intro ? 630 : 638,
            bodyStyle: bodyStyle,
            noRefreshCoords: true
        });

        var oldScroll = boxLayerWrap.scrollTop;
        elfocus(geByClass1('_scroll_node', box.bodyNode));
        boxLayerWrap.scrollTop = oldScroll;

        window.uiScrollBox && uiScrollBox.init(box, {
            onShow: function() {
                if (cur.fnbxWasScroll) {
                    boxLayerWrap.scrollTop = cur.fnbxWasScroll;
                    cur.fnbxWasScroll = false;
                }
                setTimeout(FansBox.onScroll, 0);
            },
            onHide: function() {
                if (opts.onHide) {
                    opts.onHide();
                }
            }
        });

        if (!box.tbDeinit) {
            extend(box, {
                tbDeinit: function() {
                    cur.fnbxOwnerId = cur.fnbxOffsets = cur.fnbxPhShown = false;
                    re(cur.lSTL);
                    removeEvent(boxLayerWrap, 'scroll', FansBox.onScroll);
                },
                tbcShowProgress: function() {
                    hide('fans_idol_search');
                    if (cur.fnbxSearchLink) hide(cur.fnbxSearchLink);
                },
                tbcOnLoad: function() {
                    if (curBox().tbVis == 'idols') {
                        if (ge('fans_rowsidols')) {
                            show('fans_idol_search');
                            var oid = cur.fnbxOwnerId;
                            if (!cur.fnbxIdolsList[oid]) {
                                cur.fnbxIdolsList[oid] = 'loading';
                                ajax.post('/al_fans.php', {
                                    act: 'load_idols',
                                    oid: oid
                                }, {
                                    onDone: function(result) {
                                        if (!cur.fnbxIdolsList) return;

                                        var rf = (cur.fnbxIdolsList[oid] == 'update'),
                                            upd = rf || (cur.fnbxIdolsList[oid] == 'more');
                                        cur.fnbxIdolsCache[oid] = {
                                            all: []
                                        };
                                        var processed = cur.fnbxIdolsProcessed;
                                        for (var i = 0, count = result.length; i < count; ++i) {
                                            if (processed[result[i][0]] !== undefined) {
                                                result[i][1] = processed[result[i][0]];
                                            }
                                            cur.fnbxIdolsCache[oid].all.push(i);
                                        }
                                        cur.fnbxIdolsList[oid] = result;

                                        cur.fnbxIdolsIndex[oid] = new vkIndexer(cur.fnbxIdolsCache[oid].all, function(obj) {
                                            return cur.fnbxIdolsList[oid][obj][2];
                                        }, upd ? function() {
                                            if (cur.fnbxOwnerId == oid && curBox().tbId == cur.fnbxId && curBox().tbVis == 'idols') {
                                                FansBox.moreIdols(rf);
                                            }
                                        } : function() {});
                                    }
                                });
                            } else if (cur.fnbxIdolsQuery) {
                                FansBox.moreIdols(true);
                            }
                        }
                    } else {
                        hide('fans_idol_search');
                        if (cur.fnbxSearchLink) show(cur.fnbxSearchLink);
                    }
                }
            });
            addEvent(boxLayerWrap, 'scroll', FansBox.onScroll);
        }

        box.tbcOnLoad();

        if (cur.fnbxLoaded) cur.fnbxLoaded();
        onBodyResize();
        setTimeout(FansBox.onScroll, 0);
    },
    fnbxVars: function(tab) {
        return {
            act: cur.fnbxAct || 'box',
            oid: cur.fnbxOwnerId,
            tab: tab
        };
    },
    getHighlight: function(q) {
        var indxr = cur.fnbxIdolsIndex[cur.fnbxOwnerId],
            delimiter = indxr.delimiter,
            trimmer = indxr.trimmer;

        q += ' ' + (parseLatin(q) || '');
        q = escapeRE(q).replace(/&/g, '&amp;');
        q = q.replace(trimmer, '').replace(delimiter, '|');
        return {
            re: new RegExp('(' + q + ')', 'gi'),
            val: '<span class="highlight">$1</span>'
        }
    },
    moreIdols: function(force) {
        var oid = cur.fnbxOwnerId,
            list = cur.fnbxIdolsList[oid];
        if (!oid || curBox().tbId != cur.fnbxId) return;

        if (!list || list == 'loading' || list == 'update' || list == 'more') {
            if (list == 'loading') cur.fnbxIdolsList[oid] = 'more';
            return;
        }

        var list = cur.fnbxIdolsCache[oid].all,
            input = ge('sb_search_' + cur.fnbxId),
            q = trim(val(input));

        if (!isVisible(curBox().tbSearch)) {
            q = '';
        }

        var refresh = (force || q != cur.fnbxIdolsQuery),
            highlight = false;
        cur.fnbxIdolsQuery = q;
        if (q) {
            list = cur.fnbxIdolsCache[oid]['_' + q];
            if (list === undefined) {
                var tmp = cur.fnbxIdolsIndex[oid].search(q),
                    mp = {};
                list = [];
                for (var i = 0, l = tmp.length; i < l; ++i) {
                    if (!mp[tmp[i]]) {
                        mp[tmp[i]] = true;
                        list.push(tmp[i]);
                    }
                }
                list.sort(function(a, b) {
                    return a - b;
                });
                cur.fnbxIdolsCache[oid]['_' + q] = list;
            }
            highlight = FansBox.getHighlight(q);
        }

        var len = list.length,
            cont = ge('fans_rowsidols'),
            more = ge('fans_more_linkidols');
        if (!len) {
            hide(more);
            val(cont, FansBox.genIdolEmpty(val(input)));
            return;
        }

        var start = refresh ? 0 : cont.childNodes.length,
            end = Math.min(len, start + 32),
            html = [];
        for (var i = start; i < end; ++i) {
            var row = cur.fnbxIdolsList[oid][list[i]],
                name = row[2];
            if (!row) continue;
            row = FansBox.genIdolRow(row, highlight ? name.replace(highlight.re, highlight.val) : name);
            if (refresh) {
                html.push(row);
            } else {
                cont.appendChild(se(row));
            }
        }
        if (refresh) {
            val(cont, html.join(''));
            curBox().tbToTop();
        }
        toggle(more, end < len);
    },
    genIdolEmpty: function(q) {
        var lnk = '<a href="/search?c[section]=groups&c[q]=' + encodeURIComponent(q) + '">';
        var text = trim(q) ? (getLang('fans_idols_not_found') + '<br>' + getLang('groups_you_can_find').replace('{term}', lnk + clean(q) + '</a>').replace('{link}', lnk).replace('{/link}', '</a>')) : getLang('fans_no_idols');
        return '<div class="no_rows">' + text + '</div>';
    },
    genIdolRow: function(row, name) {
        var oid = row[0],
            evs = row[6] ? ' onmouseover="uiPhotoZoom.over(this, ' + oid + ', {onBeforeShow: FansBox.beforePhotoShow, showOpts: {onHide: FansBox.backToBox}});"' : '',
            href = '/' + (row[4] ? row[4] : (oid > 0 ? 'id' + oid : 'public' + (-oid))),
            photo = row[3],
            size = getLang('public_N_followers', row[5], true),
            non = ' style="display: none"',
            status = row[7].length ? row[7] : getLang(oid > 0 ? 'profile_own_profile' : 'groups_type_public'),
            btns = vk.id && vk.id != oid;
        var feed_act = row[8] ? '<a onclick="FansBox.feedToggle(this, ' + oid + ')">' + getLang('public_feedunblock') + '</a>' : '';
        return ['\
<div class="fans_idol_row inl_bl">\
  <div class="fans_idolph_wrap fl_l"', evs, '>\
    <a class="fans_idol_ph" href="', href, '">\
      <img class="fans_idol_img" src="', photo, '" />\
    </a>\
  </div>\
  <div class="fans_idol_info">\
    <div class="fans_idol_name"><a class="fans_idol_lnk" href="', href, '">', name, '</a></div>\
    <div class="fans_idol_status">', status, '</div><div class="fans_idol_size">', size, '</div>\
    <div id="fans_idol_sub', oid, '" class="button_blue fans_idol_sub"', ((row[1] || !btns) ? non : ''), '>\
      <button class="flat_button button_small" onclick="FansBox.subscribe(this, ', oid, ')">', getLang('public_subscribe'), '</button>\
    </div>\
    <div id="fans_idol_unsub', oid, '" class="fans_idol_unsub"', (row[1] && btns ? '' : non), '>\
      <button class="flat_button button_small secondary" onclick="FansBox.unsubscribe(this, ', oid, ')">', getLang('public_unsubscribe'), '</button>\
    </div>\
  </div>\
</div>'].join('');
    },

    resetSearch: function() {
        val('fans_idol_search_inp', '');
        FansBox.moreIdols(true);
        setTimeout(elfocus.pbind('fans_idol_search_inp'), 0);
    },
    more: function() {
        var t = curBox().tbCur;
        if (t == 'idols') return FansBox.moreIdols();
        var moreBtn = ge('fans_more_link' + t);
        if (buttonLocked(moreBtn)) return;
        ajax.post(cur.fnbxPage, extend(cur.fnbxVars(t), {
            offset: cur.fnbxOffsets[t]
        }), {
            onDone: function(rows, newOffset, needMore) {
                var el = ce('div', {
                        innerHTML: rows
                    }),
                    cnt = ge('fans_rows' + t);
                if (!cnt) return;

                var noRows = geByClass1('no_rows', cnt);
                if (rows && noRows) {
                    re(noRows);
                }
                for (var e = domFC(el); e; e = domFC(el)) {
                    cnt.appendChild(e);
                }
                cur.fnbxOffsets[t] = newOffset;
                if (needMore) {
                    FansBox.preload();
                } else {
                    hide(moreBtn);
                }
            },
            showProgress: lockButton.pbind(moreBtn),
            hideProgress: unlockButton.pbind(moreBtn),
            cache: 1
        });
        cur.fnbxAutoload = true;
    },
    preload: function() {
        var t = curBox().tbCur;
        ajax.post(cur.fnbxPage, extend(cur.fnbxVars(t), {
            offset: cur.fnbxOffsets[t]
        }), {
            cache: 1
        });
    },
    markSubsc: function(oid, v) {
        cur.fnbxIdolsProcessed[oid] = v;
        var lst = cur.fnbxIdolsList[cur.fnbxOwnerId];
        if (lst && lst.length) {
            for (var i = 0, l = lst.length; i < l; ++i) {
                if (lst[i][0] == oid) {
                    cur.fnbxIdolsList[cur.fnbxOwnerId][i][1] = v;
                    break;
                }
            }
        }
    },

    subscribe: function(el, oid) {
        ajax.post('al_feed.php', {
            act: 'subscr',
            oid: oid,
            hash: cur.fnbxHash
        }, {
            onDone: function() {
                hide('fans_idol_sub' + oid);
                show('fans_idol_unsub' + oid);
                show('fans_idol_feedact' + oid);
                if (cur.fnbxOwnerId == vk.id) {
                    FansBox.recache(1);
                }
                FansBox.markSubsc(oid, 1);
            },
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el)
        });
    },
    blacklistTip: function(el) {
        showTooltip(el, {
            text: getLang('fans_block_fan'),
            shift: [8, 5, 5],
            black: 1
        });
    },
    blacklist: function(el, oid, ev) {
        if (el.tt && el.tt.destroy) el.tt.destroy();
        cur.fnbxWasScroll = boxLayerWrap.scrollTop;
        showBox('/al_fans.php', {
            act: 'block',
            oid: oid
        }, {
            params: {
                width: 440
            }
        });
        return cancelEvent(ev);
    },
    unsubscribe: function(el, oid) {
        ajax.post('/al_fans.php', {
            act: 'unsub',
            oid: oid,
            hash: cur.fnbxHash,
            from: 'box'
        }, {
            onDone: function() {
                show('fans_idol_sub' + oid);
                hide('fans_idol_unsub' + oid);
                hide('fans_idol_feedact' + oid);
                if (cur.fnbxOwnerId == vk.id) {
                    FansBox.recache(-1);
                }
                FansBox.markSubsc(oid, 0);
            },
            showProgress: lockButton.pbind(el),
            hideProgress: unlockButton.pbind(el)
        })
    },
    feedToggle: function(el, oid) {
        ajax.post('/al_fans.php', {
            act: 'feedtgl',
            oid: oid,
            hash: cur.fnbxHash,
            from: 'box'
        }, {
            onDone: function(val, str) {
                el.innerHTML = str;
                if (cur.fnbxOwnerId == vk.id) {
                    FansBox.recache(-1);
                }
                var lst = cur.fnbxIdolsList[cur.fnbxOwnerId];
                if (lst && lst.length) {
                    for (var i = 0, l = lst.length; i < l; ++i) {
                        if (lst[i][0] == oid) {
                            cur.fnbxIdolsList[cur.fnbxOwnerId][i][0] = val;
                            break;
                        }
                    }
                }
            },
            showProgress: function() {
                el.innerHTML = '<span class="progress_inline"></span>';
            }
        });
    },
    onScroll: function() {
        var box = curBox();
        if (!cur.fnbxAutoload || !box) return;
        var bt = lastWindowHeight,
            objMore = ge('fans_more_link' + box.tbCur);
        if (isVisible(objMore) && (bt > getXY(objMore, true)[1])) {
            objMore.click();
        }
    },
    recache: function(d) {
        cur.fnbxOffsets[curBox().tbCur] += d;
        for (var i in ajaxCache) {
            if (i.match(new RegExp('^\\/' + cur.fnbxPage + '\\#act=' + (cur.fnbxAct || 'box'), ''))) {
                delete(ajaxCache[i]);
            }
        }
    },
    remove: function(oid) {
        re('fans_fan_row' + oid);
        FansBox.recache(-1);
        FansBox.onScroll();
        var curTab = curBox().tbCur;
        if (!domFC(ge('fans_rows' + curTab))) {
            curBox().hide();
            nav.reload();
        }
    },
    backToBox: function() {
        cur.fnbxLoaded = function() {
            var t = curBox().tbVis,
                cont = ge('fans_rows' + t),
                s = cur.fnbxBack.scroll;
            if (t != cur.fnbxBack.tab) {
                curBox().tbTab(cur.fnbxBack.tab);
                return;
            }
            extend(cur, {
                fnbxOffsets: cur.fnbxBack.offsets,
                fnbxIdolsQuery: cur.fnbxBack.query
            });
            domPN(cont).replaceChild(cur.fnbxBack.cont, cont);
            toggle('fans_more_link' + t, !!cur.fnbxBack.vis);
            unlockButton('fans_more_link' + t);
            cur.fnbxLoaded = cur.fnbxBack = false;

            boxLayerWrap.scrollTop = s;
            val('fans_idol_search_inp', cur.fnbxIdolsQuery);
            if (t == 'idols' && cur.fnbxIdolsQuery) {
                elfocus('fans_idol_search_inp');
                show('fans_reset_search');
            }
            setTimeout(function() {
                boxLayerWrap.scrollTop = s;
                onBodyResize();
                FansBox.onScroll();
            }, 0);
        }

        if (!cur.fnbxBack) return;

        cur.fnbxOwnerId = cur.fnbxBack.oid;
        cur.fnbxObjectId = cur.fnbxBack.objectId;
        var boxVars = cur.fnbxVars(cur.fnbxBack.initial);
        if (boxVars.w) {
            nav.change({
                w: boxVars.w
            });
        } else {
            var params = cur.audioListenersOnDone ? cur.audioListenersOnDone : {};
            showBox(cur.fnbxPage, boxVars, extend({
                cache: 1
            }, params));
        }
    },
    beforePhotoShow: function() {
        var box = curBox();
        if (!box) return;
        var t = box.tbCur;
        cur.fnbxPhShown = false;
        extend(cur, {
            fnbxBack: {
                tab: t,
                initial: box.tbInitial,
                oid: cur.fnbxOwnerId,
                objectId: cur.fnbxObjectId,
                offsets: cur.fnbxOffsets,
                scroll: boxLayerWrap.scrollTop,
                query: cur.fnbxIdolsQuery,
                vis: isVisible('fans_more_link' + t),
                cont: ge('fans_rows' + t),
                instance: box.tbInstance
            }
        });
    }
};

try {
    stManager.done('fansbox.js');
} catch (e) {}