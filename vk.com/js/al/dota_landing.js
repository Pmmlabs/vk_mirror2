var DotaLanding = {
    init: function(hidden_buttons, video_id, timeLeft, autoplay_enabled, oneDayLang, twoDayLang, fiveDayLang) {
        DotaLanding.hiddenButtons = hidden_buttons;
        DotaLanding.countDownDiv = ge('dota_landing_countdown');
        DotaLanding.timeLeft = timeLeft;
        DotaLanding.oneDayLang = oneDayLang ? oneDayLang : '';
        DotaLanding.twoDayLang = twoDayLang ? twoDayLang : '';
        DotaLanding.fiveDayLang = fiveDayLang ? fiveDayLang : '';


        if (video_id) {
            DotaLanding.showVideo(video_id, autoplay_enabled);
        } else {
            DotaLanding.countDown();
        }

    },

    countDown: function() {
        var timeLeft = DotaLanding.timeLeft;
        var days = intval(timeLeft / (24 * 60 * 60 * 1000));
        if (timeLeft < 0) {
            timeLeft = (new Date().getTimezoneOffset() * 60 * 1000);
        } else {
            timeLeft += (new Date().getTimezoneOffset() * 60 * 1000);
        }
        timeLeft = new Date(timeLeft);
        var minutes = timeLeft.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        var seconds = timeLeft.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;
        var dayStr = '';
        var hours = timeLeft.getHours();
        if (days) {
            var langKey = '';
            switch (days) {
                case 1:
                    langKey = DotaLanding.oneDayLang;
                    break;
                case 2:
                case 3:
                case 4:
                    langKey = DotaLanding.twoDayLang;
                    break;
                default:
                    langKey = DotaLanding.fiveDayLang
            }
            dayStr = days + " " + langKey + ", ";
        } else {
            if (hours < 10) hours = '0' + hours;
        }
        DotaLanding.countDownDiv.innerHTML = dayStr + hours + ':' + minutes + ':' + seconds;
        DotaLanding.timeLeft -= 1000;
        setTimeout(DotaLanding.countDown, 1000);
    },


    subscribe: function(btn, hash, group_id, unsubscribe) {
        //if (DotaLanding.hiddenButtons) { return; }

        var buttons = gpeByClass('buttons', btn);
        var subscrButton = geByClass1('subscribe', buttons);
        var unsubscrButton = geByClass1('unsubscribe', buttons);
        var act = 'a_enter';
        if (unsubscribe) {
            act = 'a_leave';
        }
        ajax.post('al_public.php', {
            act: act,
            hash: hash,
            pid: group_id,
            gid: group_id
        }, {
            showProgress: function() {
                lockButton(btn)
            },
            hideProgress: function() {
                unlockButton(btn)
            },
            onDone: function() {
                toggleClass(buttons, 'in_club', !unsubscribe);
            },
            onError: unlockButton(btn)
        })
    },

    switchVideo: function(btn, video_id) {
        if (DotaLanding.curvideo == video_id) {
            return;
        }
        var container = gpeByClass('dota_landing_thumbnails', btn);
        each(container.children, function(i, elem) {
            removeClass(elem, 'dota_landing_thumbnails__item--active');
        });
        addClass(btn, 'dota_landing_thumbnails__item--active');
        DotaLanding.showVideo(video_id);
    },

    showVideo: function(video_id, autoplay_enabled) {
        if (typeof autoplay_enabled == 'undefined') {
            autoplay_enabled = 1;
        }
        if (DotaLanding.curvideo == video_id) {
            return;
        }
        DotaLanding.curvideo = video_id;
        var container = ge("dota_landing_video");
        cur.videoInlinePlayer && cur.videoInlinePlayer.pause() && cur.videoInlinePlayer.destroy();

        var oldVideo = geByClass1('video_box_wrap', geByClass1('dota_landing'));
        hide(oldVideo);
        show(container);
        showInlineVideo(video_id, '', {
            autoplay: autoplay_enabled
        }, false, container);
    },

    showTooltip: function(elem) {
        var shift = (getSize(elem)[0] - 300) / 2;
        showTooltip(elem, {
            text: getTemplate('dotaBostonTooltip'),
            className: 'dota_boston_tooltip',
            hasover: true,
            dir: 'top',
            shift: [-shift, 6],
            forcetodown: true,
            width: 300,
            showdt: 0,
            hidedt: 400
        })
    }
};



dotaLanding = DotaLanding;
try {
    stManager.done('dota_landing.js');
} catch (e) {}