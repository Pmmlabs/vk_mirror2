var Gifts = {
    deleteGift: function(o, t, i, e) {
        e = e || {}, ajax.post("al_gifts.php", {
            act: "delete",
            mid: e.mid,
            gift: i,
            hash: e.hash
        }, {
            onDone: function(o) {
                var i = ge("gift" + t);
                i && (domNS(domFC(i)) ? domNS(domFC(i)).innerHTML = o : (i.appendChild(ce("div", {
                    className: "gift_deleted",
                    innerHTML: o
                })), hide(domFC(i)), window.Pagination && !curBox() && Pagination.recache(-1)))
            },
            showProgress: addClass.pbind(o, "gift_progress"),
            hideProgress: removeClass.pbind(o, "gift_progress")
        })
    },
    restoreGift: function(o, t, i, e) {
        e = e || {}, ajax.post("al_gifts.php", {
            act: "restore",
            mid: e.mid,
            gift: i,
            hash: e.hash
        }, {
            onDone: function() {
                var o = ge("gift" + t);
                o && domNS(domFC(o)) && (re(domNS(domFC(o))), show(domFC(o)))
            }
        })
    },
    markSpamGift: function(o, t, i, e) {
        e = e || {}, ajax.post("al_gifts.php", {
            act: "mark_spam",
            mid: e.mid,
            gift: i,
            hash: e.hash
        }, {
            onDone: function(o) {
                ge("gift_mark_spam" + t).innerHTML = o
            }
        })
    },
    initGiftsBox: function(o, t) {
        o.setOptions({
            width: 638,
            bodyStyle: "padding: 0",
            grey: !0,
            hideButtons: !0,
            onShow: function() {
                cur.gftbxWasScroll && (boxLayerWrap.scrollTop = cur.gftbxWasScroll, cur.gftbxWasScroll = !1)
            }
        }), t.lang && (cur.lang = extend(cur.lang || {}, t.lang)), extend(cur, {
            gftbxOffset: t.offset,
            gftbxAutoload: !0,
            gftbxWasScroll: !1,
            gftbxMid: t.mid
        }), ajax.preload("al_gifts.php", {
            act: "box",
            mid: t.mid,
            offset: t.offset
        }, t.preload), window.uiScrollBox && uiScrollBox.init(o, {
            onShow: function() {
                addEvent(boxLayerWrap, "scroll", Gifts.onGiftsScroll), setTimeout(cur.chooseAudioScroll, 0)
            },
            onHide: function() {
                removeEvent(boxLayerWrap, "scroll", Gifts.onGiftsScroll)
            }
        }), addEvent(boxLayerWrap, "scroll", Gifts.onGiftsScroll);
        var i = boxLayerWrap.scrollTop;
        elfocus(geByClass1("_scroll_node", o.bodyNode)), boxLayerWrap.scrollTop = i, onBodyResize(), Gifts.onGiftsScroll()
    },
    moreGifts: function() {
        var o = ge("gifts_more_link");
        buttonLocked(o) || (ajax.post("al_gifts.php", {
            act: "box",
            mid: cur.gftbxMid,
            offset: cur.gftbxOffset
        }, {
            onDone: function(t, i, e) {
                var s = ce("div", {
                        innerHTML: t
                    }),
                    r = ge("gifts_rows");
                if (r) {
                    for (var a = domFC(s); a; a = domFC(s)) r.appendChild(a);
                    cur.gftbxOffset = i, e ? Gifts.preloadGifts() : hide(o)
                }
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o),
            cache: 1
        }), cur.gftbxAutoload = !0)
    },
    preloadGifts: function() {
        ajax.post("al_gifts.php", {
            act: "box",
            mid: cur.gftbxMid,
            offset: cur.gftbxOffset
        }, {
            cache: 1
        })
    },
    onGiftsScroll: function() {
        if (cur.gftbxAutoload) {
            var o = lastWindowHeight,
                t = ge("gifts_more_link");
            isVisible(t) && o > getXY(t, !0)[1] && t.click()
        }
    },
    showGiftBox: function(o, t, i) {
        return window.Profile ? Profile.showGiftBox(o, t, i) : (cur.gftbxWasScroll = boxLayerWrap.scrollTop, boxLayerWrap.scrollTop = 0, cur.viewAsBox ? cur.viewAsBox() : !showBox("al_gifts.php", {
            act: "get_gift_box",
            mid: o,
            fr: o == vk.id ? 1 : 0,
            ref: i
        }, {
            stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
            cache: 1
        }, t))
    }
};
try {
    stManager.done("gifts.js")
} catch (e) {}