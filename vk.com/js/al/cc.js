var CC = {
    DUCK_ID: 733,
    ZING_COLORS: 5,
    ICE_MELTS_ID: 855,
    prepare: function(u) {
        function n() {
            CC.pauseSound(), CC.hideDucks(), delete cur.soundCC
        }
        if (736 !== u || cur.zingImgs) {
            if (cur.soundCC = cur.soundCC || {}, cur.soundCC[u]) return;
            var C = curBox();
            window.Sound ? 830 === u || 831 === u ? (cur.soundCC[u] = new Sound("mp3/cc_gift_sound_2017"), statlogsValueEvent("gifts_play", 1, "song", u)) : 675 === u || 747 === u ? (cur.soundCC[u] = new Sound("mp3/cc_gift_sound_2016"), statlogsValueEvent("gifts_play", 1, "song", u)) : -1 !== [728, 729, 730].indexOf(u) ? cur.soundCC[u] = new Sound("mp3/calendar") : u === CC.DUCK_ID ? (cur.soundCC[u] = {
                m: new Sound("mp3/duck_gift_sound_m"),
                s: new Sound("mp3/duck_gift_sound_s")
            }, vkImage().src = "/images/gift/" + CC.DUCK_ID + "/t_256.png?2") : u === CC.ICE_MELTS_ID && (cur.soundCC[u] = new Sound("mp3/cc_ice_melts")) : cur.soundCC[u] = {
                play: function() {},
                pause: function() {}
            }, cur.destroy.push(n), C && C.setOptions({
                onHide: n
            })
        } else {
            cur.zingImgs = [];
            for (var e = 0; e < CC.ZING_COLORS; e++) {
                var i = vkImage();
                i.src = "/images/gift/736/c" + (e + 1) + ".jpg?1", i.width = i.height = 256, cur.zingImgs.push(i)
            }
        }
    },
    toggle: function(u, n) {
        if (CC.prepare(n), 736 != n || cur.zingImgs.length != CC.ZING_COLORS || hasClass(domPN(u), "fc_msg_media")) {
            if (inArray(n, [675, 728, 729, 730, 747, 830, 831, CC.ICE_MELTS_ID])) cur.playingCC ? CC.pauseSound() : CC.playSound(cur.soundCC[n]);
            else if (n === CC.DUCK_ID) {
                if (CC.pauseSound(), clearTimeout(cur.duckTO), cur.giftDuckClick = cur.giftDuckClick || 0, 2 == cur.giftDuckClick) return void(cur.giftDuckClick = 0);
                0 == cur.giftDuckClick && CC.playSound(cur.soundCC[n].s), 1 == cur.giftDuckClick && (removeClass(u, "gift_duck_tease"), CC.playSound(cur.soundCC[n].m), cur.duckTO = setTimeout(function() {
                    var n = 3,
                        C = domPN(u);
                    ducks = '<div class="gift_duck_wrap gift_duck_act" onclick="return CC.hideDucks(true);">';
                    for (var e = 0; n > e; e++) {
                        var i = "top:" + (120 * Math.random() - 85 - 256 * e) + "px; left: " + (150 * Math.random() - 75) + "px",
                            s = 10 * Math.random() - 5,
                            c = "transform: rotateZ(" + s + "deg);-webkit-transform: rotateZ(" + s + "deg);";
                        ducks += '<div style="' + i + '" class="gift_duck_clone"><img style="' + c + '" src="/images/gift/' + CC.DUCK_ID + '/t_256.png?2"></div>'
                    }
                    ducks += "</div>", ducks = se(ducks), C.appendChild(ducks), setStyle(C, {
                        overflow: "visible",
                        position: "relative"
                    })
                }, browser.safari ? 300 : 0)), cur.giftDuckClick++
            }
        } else data(u, "zing_inited") || (each(cur.zingImgs, function() {
            var n = this.cloneNode();
            u.appendChild(n), addClass(n, "gift_zing")
        }), data(u, "zing_inited", 1)), setTimeout(function() {
            var n = data(u, "zing_index") || 0,
                C = geByClass("gift_zing", u);
            n == cur.zingImgs.length && (n = 0, each(C, function(u) {
                u > 0 && removeClass(this, "zing_shown")
            })), addClass(C[n], "zing_shown"), data(u, "zing_index", n + 1)
        });
        if (-1 !== [728, 729, 730].indexOf(n)) {
            var C = domPN(u);
            !hasClass(C, "gift_rot") && addClass(C, "gift_rot")
        }
        return !1
    },
    toggleSound: function(u, n) {
        u instanceof window.Sound ? n ? u.play() : u.pause() : each(u, function(u, C) {
            n ? C.play() : C.pause()
        }), cur.playingCC = n
    },
    pauseSound: function() {
        cur.soundCC && each(cur.soundCC, function(u, n) {
            CC.toggleSound(n, !1)
        })
    },
    playSound: function(u) {
        CC.toggleSound(u, !0)
    },
    hideDucks: function(u) {
        re(geByClass1("gift_duck_wrap")), u && (CC.pauseSound(), CC.toggle(!1, CC.DUCK_ID)), cur.soundCC && delete cur.soundCC[CC.DUCK_ID], u && CC.prepare(CC.DUCK_ID)
    },
    eof: 1
};
try {
    stManager.done("cc.js")
} catch (e) {}