var Gifts = {
    deleteGift: function(el, gift, giftData, opts) {
        opts = opts || {};
        ajax.post('al_gifts.php', {
            act: 'delete',
            mid: opts.mid,
            gift: giftData,
            hash: opts.hash
        }, {
            onDone: function(text) {
                var p = ge('gift' + gift);
                if (!p) return;
                if (domNS(domFC(p))) {
                    domNS(domFC(p)).innerHTML = text;
                } else {
                    p.appendChild(ce('div', {
                        className: 'gift_deleted',
                        innerHTML: text
                    }));
                    hide(domFC(p));
                    if (window.Pagination && !curBox()) Pagination.recache(-1);
                }
            },
            showProgress: addClass.pbind(el, 'gift_progress'),
            hideProgress: removeClass.pbind(el, 'gift_progress')
        });
    },
    restoreGift: function(el, gift, giftData, opts) {
        opts = opts || {};
        ajax.post('al_gifts.php', {
            act: 'restore',
            mid: opts.mid,
            gift: giftData,
            hash: opts.hash
        }, {
            onDone: function() {
                var p = ge('gift' + gift);
                if (!p || !domNS(domFC(p))) return;
                re(domNS(domFC(p)));
                show(domFC(p));
            }
        });
    },
    markSpamGift: function(el, gift, giftData, opts) {
        opts = opts || {};
        ajax.post('al_gifts.php', {
            act: 'mark_spam',
            mid: opts.mid,
            gift: giftData,
            hash: opts.hash
        }, {
            onDone: function(text) {
                ge('gift_mark_spam' + gift).innerHTML = text;
            }
        });
    },
    initGiftsBox: function(box, opts) {
        box.setOptions({
            width: 638,
            bodyStyle: 'padding: 0',
            grey: true,
            hideButtons: true,
            onShow: function() {
                if (cur.gftbxWasScroll) {
                    boxLayerWrap.scrollTop = cur.gftbxWasScroll;
                    cur.gftbxWasScroll = false;
                }
            }
        });
        if (opts.lang) {
            cur.lang = extend(cur.lang || {}, opts.lang);
        }

        extend(cur, {
            gftbxOffset: opts.offset,
            gftbxAutoload: true,
            gftbxWasScroll: false,
            gftbxMid: opts.mid
        });

        ajax.preload('al_gifts.php', {
            act: 'box',
            mid: opts.mid,
            offset: opts.offset
        }, opts.preload);

        window.uiScrollBox && uiScrollBox.init(box, {
            onShow: function() {
                addEvent(boxLayerWrap, 'scroll', Gifts.onGiftsScroll);
                setTimeout(cur.chooseAudioScroll, 0);
            },
            onHide: function() {
                removeEvent(boxLayerWrap, 'scroll', Gifts.onGiftsScroll);
                // cur.gftbxMid = cur.gftbxOffset = false;
            }
        });
        addEvent(boxLayerWrap, 'scroll', Gifts.onGiftsScroll);

        var oldScroll = boxLayerWrap.scrollTop;
        elfocus(geByClass1('_scroll_node', box.bodyNode));
        boxLayerWrap.scrollTop = oldScroll;

        onBodyResize();
        Gifts.onGiftsScroll();
    },
    moreGifts: function() {
        var moreBtn = ge('gifts_more_link');
        if (buttonLocked(moreBtn)) return;
        ajax.post('al_gifts.php', {
            act: 'box',
            mid: cur.gftbxMid,
            offset: cur.gftbxOffset
        }, {
            onDone: function(rows, newOffset, needMore) {
                var el = ce('div', {
                        innerHTML: rows
                    }),
                    cnt = ge('gifts_rows');
                if (!cnt) return;

                for (var e = domFC(el); e; e = domFC(el)) {
                    cnt.appendChild(e);
                }
                cur.gftbxOffset = newOffset;
                if (needMore) {
                    Gifts.preloadGifts();
                } else {
                    hide(moreBtn);
                }
            },
            showProgress: lockButton.pbind(moreBtn),
            hideProgress: unlockButton.pbind(moreBtn),
            cache: 1
        });
        cur.gftbxAutoload = true;
    },
    preloadGifts: function() {
        ajax.post('al_gifts.php', {
            act: 'box',
            mid: cur.gftbxMid,
            offset: cur.gftbxOffset
        }, {
            cache: 1
        });
    },
    onGiftsScroll: function() {
        if (!cur.gftbxAutoload) return;
        var bt = lastWindowHeight,
            objMore = ge('gifts_more_link');
        if (isVisible(objMore) && (bt > getXY(objMore, true)[1])) {
            objMore.click();
        }
    },
    showGiftBox: function(mid, ev, ref) {
        if (window.Profile) {
            return Profile.showGiftBox(mid, ev, ref);
        }
        cur.gftbxWasScroll = boxLayerWrap.scrollTop;
        boxLayerWrap.scrollTop = 0;
        if (cur.viewAsBox) return cur.viewAsBox();

        return !showBox('al_gifts.php', {
            act: 'get_gift_box',
            mid: mid,
            fr: (mid == vk.id ? 1 : 0),
            ref: ref
        }, {
            stat: ['gifts.css', 'wide_dd.js', 'wide_dd.css'],
            cache: 1
        }, ev);
    }
}

try {
    stManager.done('gifts.js');
} catch (e) {}