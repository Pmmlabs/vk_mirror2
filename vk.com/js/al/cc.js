var CC = {
    DUCK_ID: 733,
    ZING_COLORS: 5,
    ICE_MELTS_ID: 855,
    prepare: function(giftId) {
        if (giftId === 736 && !cur.zingImgs) {

            cur.zingImgs = [];

            for (var i = 0; i < CC.ZING_COLORS; i++) {
                var img = vkImage();
                img.src = '/images/gift/736/c' + (i + 1) + '.jpg?1';
                img.width = img.height = 256;
                cur.zingImgs.push(img);
            }

        } else {
            cur.soundCC = cur.soundCC || {};

            if (cur.soundCC[giftId]) return;

            var box = curBox();

            if (!window.Sound) {
                cur.soundCC[giftId] = {
                    play: function() {},
                    pause: function() {}
                };
            } else {
                if (giftId === 830 || giftId === 831) {
                    cur.soundCC[giftId] = new Sound('mp3/cc_gift_sound_2017');
                    statlogsValueEvent('gifts_play', 1, 'song', giftId);
                } else if (giftId === 675 || giftId === 747) {
                    cur.soundCC[giftId] = new Sound('mp3/cc_gift_sound_2016');
                    statlogsValueEvent('gifts_play', 1, 'song', giftId);
                } else if ([728, 729, 730].indexOf(giftId) !== -1) {
                    cur.soundCC[giftId] = new Sound('mp3/calendar');
                } else if (giftId === CC.DUCK_ID) {
                    cur.soundCC[giftId] = {
                        m: new Sound('mp3/duck_gift_sound_m'),
                        s: new Sound('mp3/duck_gift_sound_s'),
                    };
                    vkImage().src = '/images/gift/' + CC.DUCK_ID + '/t_256.png?2';
                } else if (giftId === CC.ICE_MELTS_ID) {
                    cur.soundCC[giftId] = new Sound('mp3/cc_ice_melts');
                }
            }

            function destroy() {
                CC.pauseSound();
                CC.hideDucks();
                delete cur.soundCC;
            }

            cur.destroy.push(destroy);
            box && box.setOptions({
                onHide: destroy
            });
        }
    },
    toggle: function(ref, giftId) {
        CC.prepare(giftId);

        if (giftId == 736 && cur.zingImgs.length == CC.ZING_COLORS && !hasClass(domPN(ref), 'fc_msg_media')) {
            if (!data(ref, 'zing_inited')) {
                each(cur.zingImgs, function() {
                    var imgEl = this.cloneNode();
                    ref.appendChild(imgEl);
                    addClass(imgEl, 'gift_zing');
                });
                data(ref, 'zing_inited', 1);
            }

            setTimeout(function() {
                var index = data(ref, 'zing_index') || 0;

                var imgs = geByClass('gift_zing', ref);

                if (index == cur.zingImgs.length) {
                    index = 0;
                    each(imgs, function(i) {
                        if (i > 0) {
                            removeClass(this, 'zing_shown');
                        }
                    });
                }

                addClass(imgs[index], 'zing_shown');

                data(ref, 'zing_index', index + 1);
            });

        } else if (inArray(giftId, [675, 728, 729, 730, 747, 830, 831, CC.ICE_MELTS_ID])) {
            if (cur.playingCC) {
                CC.pauseSound();
            } else {
                CC.playSound(cur.soundCC[giftId]);
            }
        } else if (giftId === CC.DUCK_ID) {
            CC.pauseSound();
            clearTimeout(cur.duckTO);
            cur.giftDuckClick = cur.giftDuckClick || 0;

            if (cur.giftDuckClick == 2) {
                cur.giftDuckClick = 0;
                return;
            }

            if (cur.giftDuckClick == 0) {
                CC.playSound(cur.soundCC[giftId].s);
            }
            if (cur.giftDuckClick == 1) {
                removeClass(ref, 'gift_duck_tease');
                CC.playSound(cur.soundCC[giftId].m);
                cur.duckTO = setTimeout(function() {
                    var count = 3,
                        parent = domPN(ref);
                    ducks = '<div class="gift_duck_wrap gift_duck_act" onclick="return CC.hideDucks(true);">';
                    for (var i = 0; i < count; i++) {
                        var style = 'top:' + ((Math.random() * 120 - 85) /*random range*/ - i * 256 /*overlap ducks*/ ) + 'px; left: ' + (Math.random() * 150 - 75) + 'px';
                        var rotDeg = (Math.random() * 10 - 5);
                        var imgStyle = 'transform: rotateZ(' + rotDeg + 'deg);-webkit-transform: rotateZ(' + rotDeg + 'deg);';
                        ducks += ('<div style="' + style + '" class="gift_duck_clone"><img style="' + imgStyle + '" src="/images/gift/' + CC.DUCK_ID + '/t_256.png?2"></div>');
                    }
                    ducks += '</div>';

                    ducks = se(ducks);
                    parent.appendChild(ducks);

                    setStyle(parent, {
                        'overflow': 'visible',
                        'position': 'relative'
                    });
                }, browser.safari ? 300 : 0);
            }
            cur.giftDuckClick++;
        }

        if ([728, 729, 730].indexOf(giftId) !== -1) {
            var gift = domPN(ref);
            !hasClass(gift, 'gift_rot') && addClass(gift, 'gift_rot');
        }

        return false;
    },
    toggleSound: function(scc, doPlay) {
        if (scc instanceof window.Sound) {
            doPlay ? scc.play() : scc.pause();
        } else {
            each(scc, function(k, s) {
                doPlay ? s.play() : s.pause();
            });
        }
        cur.playingCC = doPlay;
    },
    pauseSound: function() {
        if (cur.soundCC) {
            each(cur.soundCC, function(gif, s) {
                CC.toggleSound(s, false);
            })
        }
    },
    playSound: function(scc) {
        CC.toggleSound(scc, true);
    },
    hideDucks: function(reinit) {
        re(geByClass1('gift_duck_wrap'));
        if (reinit) {
            CC.pauseSound();
            CC.toggle(false, CC.DUCK_ID);
        }
        if (cur.soundCC) {
            delete cur.soundCC[CC.DUCK_ID];
        }
        if (reinit) CC.prepare(CC.DUCK_ID);
    },
    eof: 1
};

try {
    stManager.done('cc.js');
} catch (e) {}