var PLAYER_JS_ADDED = 1;

var AudioObject = {
    flashVer: 0,
    fileInfo: new Array(),
    playbackTO: 0,
    curAudio: 0,
    images: {
        playmode: {
            play: "http://vkontakte.ru/images/play.gif",
            pause: "http://vkontakte.ru/images/pause.gif"
        },
        editmode: {
            play: "http://vkontakte.ru/images/play.png",
            pause: "http://vkontakte.ru/images/pause.png"
        },
        icon: (window.location.hostname.substr(-6) == "vk.com") ? "http://vkontakte.ru/images/favicon_vk.ico?2" : "http://vkontakte.ru/images/faviconnew.ico?2",
        pauseicon: (window.location.hostname.substr(-6) == "vk.com") ? "http://vk.com/images/pauseiconnew.ico?2" : "http://vkontakte.ru/images/pauseiconnew.ico?2",
        playicon: (window.location.hostname.substr(-6) == "vk.com") ? "http://vk.com/images/playiconnew.ico?2" : "http://vkontakte.ru/images/playiconnew.ico?2"
    },

    toggleRepeat: function() {
        if (!this.curAudio) return;
        var r = ge('repeat' + this.curAudio);
        if (hasClass(r, 'on')) {
            this.repeat = false;
            removeClass(r, 'on');
        } else {
            this.repeat = true;
            addClass(r, 'on');
        }
    },

    operate: function() {
        if (arguments.length == 3) {
            var id = arguments[0];
            var url = arguments[1];
            var duration = arguments[2];
        } else {
            var id = arguments[0];
            var host = arguments[1];
            var user = arguments[2];
            var file = arguments[3];
            var duration = arguments[4];
        }
        var decrypt = function(str, pwd) {
            if (!pwd || str.substr(0, 4) == 'http') return str;
            var r = '';
            for (var i = 0; i < pwd.length; i++)
                r += pwd.charCodeAt(i).toString();
            var s = Math.floor(r.length / 3),
                m = parseInt(r.charAt(s) + r.charAt(s * 2) + r.charAt(s * 3), 10),
                n = Math.round(pwd.length / 2),
                d = 8388607,
                l = parseInt(str.substring(str.length - 5, str.length), 16);
            str = str.substring(0, str.length - 5);
            r += l;
            if (r.length > 6) {
                var p = 0;
                for (var i = 0; i < r.length; i += 5)
                    p += parseInt(r.substr(i, 5), 10);
                r = p;
            }
            r = (m * r + n) % d;
            if (window.aud_mix) {
                r = window.aud_mix(r);
            }
            var c = '',
                t = '';
            for (var i = 0; i < str.length; i += 2) {
                c = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((r / d) * 255));
                t += String.fromCharCode(c);
                r = (m * r + n) % d;
            }
            return t;
        };

        if (!this.fileInfo[id]) {
            if (url) {
                var url = decrypt(url, window.aud_salt);
                this.fileInfo[id] = {
                    "dbid": id,
                    "url": url,
                    "duration": duration
                };
            } else {
                this.fileInfo[id] = {
                    "dbid": id,
                    "host": host,
                    "user": user,
                    "id": file,
                    "duration": duration
                };
            }
        }

        var oldId = this.getPlayerId();
        /*debugLog(oldId);
        debugLog(id);*/
        if (!oldId) {
            this.showPlayer(id);
        } else {
            if (id == oldId) {
                var p = ge("player");
                if (p) {
                    if (ge("player").isTrackPlaying()) {
                        this.changeState(id, "pause");
                    } else {
                        this.changeState(id, "play");
                    }
                }
                if (window.audio_player_id != undefined) playPause();
            } else {
                this.hidePlayer(oldId);
                setTimeout(function() {
                    AudioObject.showPlayer(id);
                }, 0);
            }
        }
    },

    playbackSent: 0,
    playback: function(id) {
        clearTimeout(this.playbackTO);
        //debugLog('playback: '+id);
        if (id && window.audioData && (audioData.hint || audioData.act == 'edit')) {
            var _t = this;
            var realId = parseInt(id);
            this.playbackTO = setTimeout(function() {
                Ajax.Post({
                    url: 'audio.php',
                    query: {
                        act: 'a_playback',
                        id: realId
                    }
                });
                _t.playbackSent = id;
            }, 10000);
        }
    },

    changeState: function(id, state, value) {
        var mode = (window.audioEditMode) ? "editmode" : "playmode";
        switch (state) {
            case 'play':
                this.setIcon(this.images.playicon);
                ge("imgbutton" + id).src = this.images[mode].pause;
                if (window.isValidFlash) ge("player").playTrack();
                if (!this.playbackSent) this.playback(id);
                break;

            case "pause":
                this.setIcon(this.images.pauseicon);
                ge("imgbutton" + id).src = this.images[mode].play;
                if (window.audioEditMode) {
                    this.hidePlayer(id);
                    return;
                } else {
                    if (window.isValidFlash) ge("player").pauseTrack();
                }
                this.playback();
                break;

            case "volume":
                this.curVolume = parseInt(value);
                createCookie("audio_vol", this.curVolume);
                break;

            case "init":
                ge('line' + id).style.display = "none";
                var r = ge('repeat' + id);
                if (r) {
                    if (this.repeat) {
                        addClass(r, 'on');
                    } else {
                        removeClass(r, 'on');
                    }
                    show(r);
                }
                break;
        }
    },

    setIcon: function(icon) {
        var ss = document.createElement('link');
        ss.rel = 'shortcut icon';
        ss.type = 'image/x-icon';
        ss.href = icon;

        var h = document.getElementsByTagName('HEAD')[0];
        var links = h.getElementsByTagName('link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].href == ss.href) return;
            if (links[i].rel == "shortcut icon" || links[i].rel == "icon")
                h.removeChild(links[i]);
        }
        h.appendChild(ss);
    },

    getHTML5Player: function(new_id) {
        var created = false;
        var name = "player";
        if (!ge('theAudio') || window.audio_player_id != new_id) {
            loadHtml5AudioPlayer(this, new_id);
            cur_id = new_id;
            created = true;
        }
        var player = document[name] || window[name];
        return {
            player: player,
            created: created
        };
    },

    getPlayer: function(current) {
        return false;
        var created = false;
        if (!this.curVolume)
            this.curVolume = parseInt(readCookie("audio_vol"));
        if (isNaN(this.curVolume)) {
            this.curVolume = 80;
            createCookie("audio_vol", this.curVolume);
        }

        var id = "player";
        if (!ge(id)) {
            var name = "/swf/audio_lite.swf?2"; // + Math.random();
            var so = new SWFObject(name, id, "100%", "14", "9", "");
            /*if (isWindowFocused && navigator.userAgent.indexOf("Firefox/3") == -1) {
              so.addParam("wmode", "transparent");
            } else if (isWindowFocused) {
              so.addParam("wmode", "opaque");
            }*/
            so.addParam("swliveconnect", "true");
            so.addParam("allowScriptAccess", "always");
            so.addVariable("volume", this.curVolume);
            for (var i in this.fileInfo[current]) {
                so.addVariable(i, this.fileInfo[current][i]);
            }
            this.flashVer = so.installedVer.major;
            window.isValidFlash = (this.flashVer >= 9);
            so.write("player" + current); //container.id);*/
            //window.isValidFlash = false;
            created = window.isValidFlash;
        }
        var player = document["player"] || window["player"];
        return {
            player: player,
            created: created
        };
    },

    getPlayerId: function() {
        var p = ge("player");
        if (!p) {
            if (window.audio_player_id != undefined) return window.audio_player_id;
            return false;
        }
        return p.getTrackId();
    },

    checkPlayer: function(id) {
        var res = this.getPlayer(id);
        if (!window.isValidFlash) {
            if ((browser.chrome && intval(browser.version) >= 4) ||
                (browser.safari && intval(browser.version) >= 4)) {
                var res = this.getHTML5Player(id);
                return res;
            }
            var message = getLang('audio_you_need_flash') + "<br/><br/>" + getLang('audio_do_you_want_flash');
            var noFlashMB = new AlertBox(getLang('audio_need_flash_title'), message, function() {
                document.location = "http://get.adobe.com/ru/flashplayer/";
            }, {
                boxType: 'CONFIRM'
            });
            noFlashMB.show();
            return false;
        }
        return res;
    },

    hidePlayer: function(id) {
        var p = ge("player");
        if (!p) {
            p = ge("theAudio");
            if (!p) return;
            if (!id) id = p.parentNode.parentNode.id.replace(new RegExp("[a-z]*"), "");
            hide("player" + id);
            var pParent = p.parentNode;
            var pTable = p.nextSibling;
            pParent.removeChild(p);
            pParent.removeChild(pTable);
            pParent.parentNode.removeChild(pParent);
        } else {
            if (!id) id = p.parentNode.id.replace(new RegExp("[a-z]*"), "");
            p.stopTrack();
            hide("player" + id);
            setTimeout(function() {
                p.parentNode.removeChild(p);
            }, 0);
        }
        if (window.audioEditMode) {
            ge("audio" + id).className = "audioEditRow";
        } else {
            setStyles(ge('line' + id), {
                borderTop: "dashed 1px #D8DfEA",
                background: "none"
            })
        }
        this.curAudio = null;
        var mode = (window.audioEditMode) ? "editmode" : "playmode";
        setTimeout(function() {
            hide('repeat' + id);
            removeClass(ge('audio_add' + id), 'active');
            show('line' + id);
        }, 0);
        ge("imgbutton" + id).src = this.images[mode].play;
        setTimeout(function() {
            AudioObject.setIcon(AudioObject.images.icon);
        }, 0);
    },

    showPlayer: function(id) {
        var player = this.checkPlayer(id).player;
        if (!player) return;
        var mode = (window.audioEditMode) ? "editmode" : "playmode";
        if (window.audioEditMode) {
            ge("audio" + id).className = "audioEditRowPlaying";
            //ge('line' + id).style.display = "none";
        } else {
            /*setStyles(ge('line' + suff + id),{
              borderTop: "0px",
              background: "no-repeat url('http://vkontakte.ru/images/player.gif')",
              position: "absolute"
            });*/
        }
        ge('line' + id).style.display = "none";
        var r = ge('repeat' + id);
        if (r) {
            if (this.repeat) {
                addClass(r, 'on');
            } else {
                removeClass(r, 'on');
            }
            show(r);
        }
        addClass(ge('audio_add' + id), 'active');

        ge("imgbutton" + id).src = this.images[mode].pause;
        this.setIcon(this.images.playicon);
        ge('player' + id).style.display = "";
        if (window.isValidFlash) ge('player').focus();
        this.curAudio = id;
        if (!this.playbackSent) this.playback(id);
    },

    nextTrack: function(id) {
        if (this.repeat) {
            this.hidePlayer(id);
            this.playback();
            this.playbackSent = 0;
            setTimeout(function() {
                ge('imgbutton' + id).onclick();
            }, 0);
            return;
        }
        var nextId = getSiblingsIds(ge('audio' + id))[1];
        this.hidePlayer(id);
        this.playback();
        this.playbackSent = 0;
        if (nextId && !window.audioEditMode) {
            setTimeout(function() {
                ge('imgbutton' + nextId).onclick();
            }, 0);
        }
        if (!nextId && window.audioData && !window.audioEditMode) {
            var playFirst = function() {
                var next = geByClass('audioRow', ge('audios'))[0];
                next = next && next.id.substr(5);
                if (next) setTimeout(function() {
                    ge('imgbutton' + next).onclick();
                }, 0);
            }
            if (!audioData.last) {
                var nextOffset = audioData.offset + 100;
                setTimeout(function() {
                    getPage(nextOffset, function() {
                        if (nextOffset != audioData.offset) return;
                        playFirst();
                    });
                }, 0);
            } else { //if(audioData.aid) { //cycle
                if (audioData.offset) {
                    setTimeout(function() {
                        getPage(0, function() {
                            playFirst();
                        });
                    }, 0);
                } else {
                    playFirst();
                }
            }
        }
    },

    stop: function() {
        if (this.curAudio) {
            this.hidePlayer();
            this.curAudio = null;
        }
    }
}

function stateChanged(id, action, value) {
    AudioObject.changeState(id, action, value);
}

var startSiblings;

function getSiblingsIds(elem) {
    var prev, next, el = elem;
    while (el.previousSibling) {
        prev = el = el.previousSibling;
        if (prev.id && prev.id.indexOf('audio') === 0)
            break;
        prev = null;
    }
    el = elem;
    while (el.nextSibling) {
        next = el = el.nextSibling;
        if (next.id && next.id.indexOf('audio') === 0)
            break;
        next = null;
    }
    return [(prev && prev.id) ? prev.id.substr(5) : 0, (next && next.id) ? next.id.substr(5) : 0];
}

function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }
    var locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0];
    document.cookie = name + '=' + value + expires + '; path=/; domain=.' + locDomain;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function showLyrics(id, lid) {
    var lyricsDiv = ge('lyrics' + id);
    if (lyricsDiv.shown != 1) {
        show(lyricsDiv);
        var ajaxLyrics = new Ajax();
        ajaxLyrics.onDone = function(ajaxLyrics, responseText) {
            lyricsDiv.innerHTML = "<div style='margin:5px 10px 15px 40px;'>" + responseText + "</div>";
            lyricsDiv.shown = 1;
        };
        ajaxLyrics.post('/audio.php', {
            'act': 'getLyrics',
            'lid': lid
        });
        lyricsDiv.innerHTML = "<div style='text-align: center; height: 50px; padding: 30px 10px 10px 10px'><img valign='middle' src='http://vkontakte.ru/images/progress7.gif'></div>";
    } else {
        lyricsDiv.innerHTML = "";
        lyricsDiv.shown = 0;
        hide(lyricsDiv);
    }
}

function createElement(name, attrs, styles) {
    var el = document.createElement(name);
    for (attr in attrs) {
        el[attr] = attrs[attr];
    }
    setStyles(el, styles);
    return el;
}

function setStyles(el, styles) {
    if (el && el.style) {
        for (st in styles) {
            el.style[st] = styles[st];
        }
    }
}

fixOperaTimeout = 0;

if (window.addEventListener) {
    window.addEventListener("scroll", function() {
        if (browser.opera && browser.version < 10.50) {
            //fix opera transparent flash - refresh page head
            clearTimeout(fixOperaTimeout);
            fixOperaTimeout = setTimeout(function() {
                head = document.getElementsByTagName("head")[0];
                head.innerHTML = head.innerHTML;
            }, 300);
        }
    }, false);
}

window.debug_mode = false;

function operate(id, host, user, file, dur) {
    var a = arguments;
    if (a.length == 3) {
        AudioObject.operate(a[0], a[1], a[2]);
    } else {
        AudioObject.operate(a[0], a[1], a[2], a[3], a[4]);
    }
}

function nextTrack(id) {
    AudioObject.nextTrack(id);
}

function addMeAudio(wid, oid, aid, hash, el) {
    if (posting_on_wall) {
        return;
    }
    posting_on_wall = true;
    if (wid) show('adding' + wid + 'progress');
    var failed = function() {
        if (wid) hide('adding' + wid + 'progress');
        posting_on_wall = false;
    }
    Ajax.Send('audio.php', {
        act: 'a_add',
        aid: aid,
        oid: oid,
        hash: hash,
        from_profile: ge('my_audios') ? 1 : ''
    }, {
        onSuccess: function(obj, text) {
            posting_on_wall = false;
            if (ge('my_audios')) {
                var response = eval('(' + text + ')');
                ge('my_audios').innerHTML = response.html;
                ge('audios_how_much').innerHTML = '(' + response.how_much + ')';
                if (response.script) eval(response.script);
            }
            if (el && hasClass(el, 'add_audio_plus')) {
                var p = el.parentNode;
                data(el, 'tooltip').hide();
                p.innerHTML = '<div class="add_audio_plus done"></div>';
            }
            if (wid) {
                hide('adding' + wid + 'progress');
                show('adding' + wid + 'done');
                hide('adding' + wid + 'link');
                var prev_node = ge('adding' + wid + 'link').previousSibling,
                    next_node = ge('adding' + wid + 'link').nextSibling;
                if (prev_node && prev_node.tagName && prev_node.tagName.toLowerCase() == 'span') {
                    hide(prev_node);
                } else if (next_node && next_node.tagName && next_node.tagName.toLowerCase() == 'span') {
                    hide(next_node);
                }
            }
            if (wid) setTimeout(function() {
                fadeOut(ge('adding' + wid + 'done'), 500);
            }, 1000);
        },
        onFail: failed,
        onCaptchaShow: failed
    });
}

function showExtraBox(extra, vars, elem) {
    if (extra && showZeroZoneBox('video_player_extra', function() {
            showExtraBox(extra, vars, elem);
        })) return false;

    if (!window.videoBox) {
        window.videoBox = new MessageBox({
            width: 629,
            bodyStyle: 'padding: 10px',
            closeButton: true,
            title: vars.title,
            onHideAttempt: function() {
                window.videoBox.content('');
                if (window.onVideoBoxHide) {
                    window.onVideoBoxHide();
                }
                return true;
            }
        });
    } else {
        window.videoBox.setOptions({
            width: 629,
            title: vars.title
        });
    }
    window.videoBox.content('<div style="height: 100px; background: url(\'/images/progress7.gif\') center center no-repeat;"></div>');

    window.videoBox.removeButtons();
    window.videoBox.addButton({
        label: global_close,
        onClick: function() {
            window.videoBox.hide();
        }
    });
    if (vars.status) {
        var params = {
            act: 'a_show_extra',
            status: vars.status
        };
    } else {
        var params = {
            act: 'a_show_extra',
            vid: vars.vid,
            oid: vars.oid,
            hash: vars.hash
        };
    }
    Ajax.Send('video.php', params, {
        onSuccess: function(obj, text) {
            var data = text.split('<!>');
            window.videoBox.content(data[0]);
            window.videoBox.addControlsText(data[1]);
            eval(data[2]);
        }
    });
    window.videoBox.show();
    return false;

    /*
    if (extra == 1 || extra == 21) { // YouTube
      var html = playerContainerHTML('http://img.youtube.com/vi/'+vars.vid+'/0.jpg', 480, '386');
      window.videoBox.content(html);
      hide('player_html5_msg');
      params = {allowFullScreen: true, allowscriptaccess: 'always', movie: 'http://www.youtube.com/v/'+vars.vid+'?fs=1&hl=en_US', wmode: 'opaque'};
      swfobject.embedSWF('http://www.youtube.com/v/'+vars.vid+'?fs=1&hl=en_US', 'video_player', 480, 385, '9', '', {}, params, {preventHide: true});
    } else if (extra == 2 || extra == 22) { // Vimeo
      window.videoBox.content('<iframe src="http://player.vimeo.com/video/'+vars.vid+'" width="480" height="386" frameborder="0"></iframe>');
    } else if (extra == 3 || extra == 23) { // RuTube
      var html = playerContainerHTML('', 480, '386');
      window.videoBox.content(html);
      hide('player_html5_msg');
      params = {allowFullScreen: true, allowscriptaccess: 'always', movie: 'http://video.rutube.ru/' + vars.vid, wmode: 'opaque'};
      swfobject.embedSWF('http://video.rutube.ru/' + vars.vid, 'video_player', 480, 385, '9', '', {}, params, {preventHide: true});
    } else if (extra == 4 || extra == 24) { // Russia.ru
      var html = playerContainerHTML('', 480, '386');
      window.videoBox.content(html);
      hide('player_html5_msg');

      params = {allowFullScreen: true, allowscriptaccess: 'always', movie: 'http://www.russia.ru/player/main.swf?103', wmode: 'opaque'};
      swfobject.embedSWF('http://www.russia.ru/player/main.swf?103', 'video_player', 480, 385, '9', '', {name: vars.vid, from: 'blog', bolg: true, adv: 'no'}, params, {preventHide: true});
    }


    var add_text = vars.linkText;
    var controls = '<span id="video_controls"><a href="'+vars.href+'" onclick="event.cancelBubble = true; return goAway(\''+vars.link+'\');">' + add_text + '</a></span>';

    window.videoBox.addControlsText(controls);
    window.videoBox.show();
    return false;
    */
}

function showVideoBox(vars, elem, description, to_comments_text, add_text, add_hash, thumb, player_available, allow_html5, player_version) {
    var ww = vars['hd_def'] > 0 ? 607 : 480;
    var hh = 360;
    if (browser.opera && intval(browser.version) < 10) {
        ww = 480;
    }
    if (vars.extra) {
        return showExtraBox(vars.extra, vars, elem);
    }
    var t = this,
        a = arguments;
    if (showZeroZoneBox('video_player', function() {
            showVideoBox.apply(t, a);
        })) return false;

    var title = vars['md_title'];
    var author = vars['md_author'];
    description = description;

    if (!window.videoBox) {
        window.videoBox = new MessageBox({
            width: ww + 22,
            bodyStyle: 'padding: 10px',
            closeButton: true,
            onHideAttempt: function() {
                window.videoBox.content('');
                if (window.onVideoBoxHide) {
                    window.onVideoBoxHide();
                }
                return true;
            }
        });
        if (add_hash) {
            window.videoBox.setOptions({
                fullPageLink: elem.href
            });
        }
    } else {
        window.videoBox.setOptions({
            width: ww + 22
        });
    }
    window.videoBox.removeButtons();
    window.videoBox.addButton({
        label: global_close,
        onClick: function() {
            window.videoBox.hide();
        }
    });

    var controls = '';
    controls += '<span id="video_controls"><a href="/video' + vars['oid'] + '_' + vars['vid'] + '">' + to_comments_text + '</a> | <a href=\"javascript:reportVideo(' + vars['oid'] + ', ' + vars['vid'] + ')\">' + getLang('global_Complain_video') + '</span>';
    window.videoBox.addControlsText(controls);
    window.videoBox.setOptions({
        title: title
    });
    if (add_hash) {
        window.videoBox.setOptions({
            fullPageLink: elem.href
        });
    }

    var html = playerContainerHTML(thumb, '' + ww);
    html += '<div style="padding-top: 10px">' + description + '</div>';
    window.videoBox.content(html).show();
    loadFlashPlayer(vars, player_available, allow_html5, player_version);
    return false;
}

function playerContainerHTML(thumb, width, height) {
    return (
        '<div id="fl_content">' +
        '<div id="flash_player_container_outer" style="height:' + (height || '360') + 'px;position: relative;">' +
        '<div id="flash_player_back" style="position:absolute;z-index:1;text-align:center;width:100%;"><img src="' + thumb + '" width="' + width + '" height="360"/></div>' +
        '<div id="flash_player_container" style="position:relative;z-index:2;text-align:center;width:100%;margin:auto">' +
        '<div id="video_player" style="padding-top:160px">' +
        '<div id="no_flash_info" style="margin:auto;width:320px;padding:10px;background:#FFFFFF;border:#CCCCCC 1px solid;position:relative;z-index:5;">' +
        '<div>' + player_needed + '</div>' +
        '<div id="player_html5_msg">' +
        '<div>' + video_player_flash_better + '</div>' +
        '<div><br/><a href="javascript:loadHtml5Player();">' + video_player_html5_msg + '</a></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
}

var video_host = '';
var video_uid = '';
var video_vtag = '';
var video_no_flv = 0;
var video_max_hd = '';
var video_title = '';
var video_author = '';
var fixed_player_size = true;

function loadFlashPlayer(vars, player_available, allow_html5, player_version) {
    var ww = vars['hd_def'] > 0 ? 607 : 480;
    var hh = 360;
    if (browser.opera && intval(browser.version) < 10) {
        ww = 480;
    }
    var params = {
        allowfullscreen: 'true',
        allowscriptaccess: 'always',
        wmode: 'opaque'
    };
    if (swfobject.hasFlashPlayerVersion('9')) {
        ge('video_player').innerHTML = '';
    } else {
        ge('flash_player_container').style.display = player_available ? 'block' : 'none';
        ge('video_player').style.padding = intval(allow_html5) ? '135px 0 0 0' : '160px 0 0 0';
        ge('player_html5_msg').style.display = intval(allow_html5) ? 'block' : 'none';
    }

    if (video_lang_vars != null) {
        extend(vars, video_lang_vars);
    }

    swfobject.embedSWF('/swf/VideoPlayer4_0.swf?' + player_version, 'video_player', '' + ww, '' + hh, '9', '', vars, params, {
        preventHide: true
    });

    video_host = vars['host'];
    video_uid = vars['uid'];
    video_vtag = vars['vtag'];
    video_no_flv = vars['no_flv'];
    video_max_hd = vars['hd'];
    video_title = vars['md_title'];
    video_author = vars['md_author'];

}

function loadHtml5Player() {
    changeCanvasSize(607, 360);
    if (window.prLineW == undefined) {
        addCss('css/video_html5.css');
        attachScript('html5_js', '/js/video_html5.js?6');
    } else {
        startHTML5();
    }
}

var audio_html5_attached = false;

function loadHtml5AudioPlayer(obj, id) {
    if (window.audio_prLineW != undefined) {
        insertAudioHtml5(obj, id);
        return;
    }
    if (!audio_html5_attached) {
        attachScript('audio_html5_js', '/js/audio_html5.js?178');
        audio_html5_attached = true;
    }
    setTimeout(function() {
        loadHtml5AudioPlayer(obj, id);
    }, 50);
}

function onVideoPlayStarted(oid, vid, hash) {}

function onVideoPlayFinished(oid, vid, hash) {}

function incViewCounter(oid, vid, hash) {
    ajax = new Ajax;
    ajax.onDone = function(ajax, responseText) {
        if (responseText.substr(0, 2) == 'ok') {
            var p = ge('videoViewsCount');
            if (p) {
                p.innerHTML = responseText.substr(2);
                var countContainer = ge('videoViewsCountContainer');
                var countSpace = ge('videoViewsCountSpace');
                if (countContainer) countContainer.style.display = 'inline';
                if (countSpace) countSpace.style.display = 'inline';
            }
        }
    };
    ajax.post("/video.php", {
        act: 'inc_view_counter',
        oid: oid,
        vid: vid,
        hash: hash
    });
}

function changeCanvasSize(w, h) {
    if (!browser.opera || intval(browser.version) >= 10) {
        ge('flash_player_back').innerHTML = '';
        setStyle(ge('video_player'), {
            width: w,
            height: h
        });
        setStyle(ge('flash_player_container_outer'), {
            height: h
        });
        if (window.videoBox != undefined) {
            window.videoBox.setOptions({
                width: w + 22
            });
        }
    }
}

onDomReady(function() {
    if (window.player_onload) {
        window.player_onload();
    }
})