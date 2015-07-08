var html5audio = {
  audio_prSliderW: 14,
  audio_volLineW: 41,

  playPause: function() {
    var p = ge('the_audio');
    if (!p) {
      html5audio.audio_player_id = 0;
      return;
    } else {
      if (isNaN(p.duration)) {
        p.src = getUrl();
        p.load();
      }

      if (p.paused) {
        p.play();
        audioPlayer.change(html5audio.audio_player_id, 'play');
      } else {
        p.pause();
        audioPlayer.change(html5audio.audio_player_id, 'pause');
      }
    }
  },

  stopHTML5Audio: function() {
    html5audio.audio_player_id = 0;
    var p = ge('the_audio');
    if (!p) return;
    var pParent = p.parentNode;
    var pTable = p.nextSibling;
    pParent.removeChild(p);
    pParent.removeChild(pTable);
    pParent.parentNode.removeChild(pParent);

    removeEvent(document, 'mouseup', html5audio.docMouseUp);
    removeEvent(document, 'mousemove', html5audio.docMouseMove);
  },

  onErr: function(url, e) {
    topError('Audio loading error: ' + e.target.error.code, {dt: -1, type: 101, url: url, code: e.target.error.code});
  },

  defX: function(e) {
    var hscroll = (browser.ipad || browser.iphone4 || browser.ipod4) ? 0 : (document.all ? document.scrollLeft : window.pageXOffset);
    return intval(e.clientX + hscroll);
  },

  prDrag: function(div) {
    html5audio.audio_moveState = 1;
    fadeTo(ge('audio_pr_slider'), 200, 0.5);
  },

  volDrag: function(div) {
    html5audio.audio_moveState = 2;
  },

  prClick: function() {
    html5audio.onPrMove();
    html5audio.prDrag();
  },

  volClick: function() {
    html5audio.onVolMove();
    html5audio.volDrag();
  },

  onPrMove: function() {
    var p = ge('the_audio');
    if ((browser.ipad || browser.iphone4 || browser.ipod4) && p.readyState != HTMLMediaElement.HAVE_FUTURE_DATA && p.readyState != HTMLMediaElement.HAVE_ENOUGH_DATA){
      return;
    }
    if (p.paused) p.play();
    var e = window.event;
    var xy = getXY(ge('audio_progress_line'));
    html5audio.audio_curPrX = html5audio.defX(e) - xy[0] - 7;
    if (html5audio.audio_curPrX < 0) html5audio.audio_curPrX = 0;
    if (html5audio.audio_curPrX > html5audio.audio_prLineW) html5audio.audio_curPrX = html5audio.audio_prLineW;
    ge('audio_pr_slider').style.left = html5audio.audio_curPrX + 'px';
    html5audio.updTimeEx();
  },

  updTimeEx: function() {
    var p = ge('the_audio');
    if (p && !isNaN(p.duration)) {
      try {
        p.currentTime = p.startTime + (p.duration * html5audio.audio_curPrX) / html5audio.audio_prLineW;
      } catch(e) {
        html5audio.initHTML5Audio(html5audio.audio_player_id);
      };
    }
    html5audio.updTime();
  },

  onVolMove: function() {
    var e = window.event;
    var xy = getXY(ge('audio_volume_line'));
    html5audio.audio_curVolX = html5audio.defX(e) - xy[0] - 3;
    if (html5audio.audio_curVolX < 0) html5audio.audio_curVolX = 0;
    if (html5audio.audio_curVolX > html5audio.audio_volLineW) html5audio.audio_curVolX = html5audio.audio_volLineW;
    html5audio.updVol(false);
  },

  updVol: function(init) {
    if (!ge('audio_vol_slider')) return;
    var vol = intval(html5audio.audio_curVolX) / html5audio.audio_volLineW;
    ge('audio_vol_slider').style.left = html5audio.audio_curVolX + 'px';
    ge('audio_volume_line').style.opacity = 0.5 + 0.5 * vol;
    ge('the_audio').volume = vol;
    if (!init) audioPlayer.change(html5audio.audio_player_id, 'volume', intval(100*vol));
  },

  updTime: function() {
    var p = ge('the_audio');
    if (p && !isNaN(p.duration) && p.duration > 0 && html5audio.audio_moveState != 1) {
      ge('audio_pr_slider').style.left = ((html5audio.audio_prLineW * (p.currentTime - p.startTime)) / p.duration) + 'px';
      if (p.duration - p.currentTime <= 1){
        p.pause();
        html5audio.onEnded();
      }
    }
  },

  onPlay: function() {
    audioPlayer.change(html5audio.audio_player_id, 'play');
    fadeTo(ge('audio_pr_slider'), 200, 1);
  },

  onPause: function() {
    if (html5audio.audio_player_id) {
      audioPlayer.change(html5audio.audio_player_id, 'pause');
      fadeTo(ge('audio_pr_slider'), 200, 0.5);
    }
  },

  onSuspend: function() {
    setStyle(ge('audio_progress_line'), {width:'100%'});
  },

  onPlaying: function() {
    if (html5audio.audio_curPrX > 0) {
      html5audio.updTimeEx();
    }
    setInterval(html5audio.updTime, 1000);
  },

  onCanPlay: function() {
    if (ge('the_audio')) setTimeout(function(){ge('the_audio').play();}, 1000);
  },

  onEnded: function() {
    if (html5audio.audio_moveState == 0){
      audioPlayer.nextTrack();
    }
  },

  getUrl: function() {
    var data = ge('audio_info' + html5audio.audio_player_id).value.split(',');
    return data[0];
  },

  touchHandler: function(e) {
    var touches = e.changedTouches,
      first = touches[0],
      type = '';

    var p = ge('the_audio');
    switch(e.type)
    {
      case 'touchstart': type = 'mousedown'; break;
      case 'touchmove':  type = 'mousemove'; break;
      case 'touchend':   type = 'mouseup'; break;
      default: return;
    }

    var simulatedEvent = document.createEvent('MouseEvent');
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
      first.screenX, first.screenY,
      first.clientX, first.clientY, false,
      false, false, false, 0, null);

    first.target.dispatchEvent(simulatedEvent);
    if (e.target == ge('audio_white_line') || e.target == ge('audio_progress_line') || e.target == ge('audio_pr_slider')) {
      e.preventDefault();
    }
  },

  startHTML5Audio: function() {
    html5audio.audio_curPrX = 0;
    html5audio.audio_prLineW = getSize(ge('audio_white_line'))[0] - html5audio.audio_prSliderW;
    html5audio.updVol(true);

    var p = ge('the_audio'), src = html5audio.getUrl();
    p.src = src;
    p.load();

    p.volume = html5audio.audio_curVolX / html5audio.audio_volLineW;
    addEvent(p, 'canplay', html5audio.onCanPlay);
    addEvent(p, 'playing', html5audio.onPlaying);
    addEvent(p, 'play', html5audio.onPlay);
    addEvent(p, 'pause', html5audio.onPause);
    addEvent(p, 'onerror', html5audio.onErr.pbind(src));
    addEvent(p, 'suspend', html5audio.onSuspend);

    if (browser.ipad || browser.iphone4 || browser.ipod4) {
      document.addEventListener('touchstart', html5audio.touchHandler, true);
      document.addEventListener('touchmove', html5audio.touchHandler, true);
      document.addEventListener('touchend', html5audio.touchHandler, true);
    }

    setTimeout(function(){p.play();}, 100);
  },

  audioHTML5Code: function() {
    var ypos = (browser.ipad || browser.iphone4 || browser.ipod4) ? '-12' : '5';
    var res = '\
<div id="audio_player" style="top:' + ypos + 'px">\
  <audio id="the_audio"></audio>\
  <table width="100%" border="0" cellpadding="0" cellspacing="0">\
    <tr valign="top">\
      <td style="width:100%;padding:0px 0px 0px 0px">\
        <div id="audio_white_line" onmousedown="html5audio.prClick(this);"></div>\
        <div id="audio_progress_line" onmousedown="html5audio.prClick(this);">\
          <div id="audio_pr_slider" onmousedown="html5audio.prDrag(this);"></div>\
        </div>\
      </td>';

    if (!browser.ipad && !browser.iphone4 && !browser.ipod4){
      res += '\
      <td style="padding:0px 0px 0px 10px"></td>\
      <td style="padding:1px 0px 0px 0px">\
        <div id="audio_white_volume_line" onmousedown="html5audio.volClick(this);"></div>\
        <div id="audio_volume_line" onmousedown="html5audio.volClick(this);">\
          <div id="audio_vol_slider" style="left:' + html5audio.audio_curVolX + 'px;" onmousedown="html5audio.volDrag(this);"></div>\
        </div>\
      </td>';
    }

    res += '\
    </tr>\
  </table>\
</div>';
    return res;
  },

  initHTML5Audio: function(id) {

    addEvent(document, 'mouseup', html5audio.docMouseUp);
    addEvent(document, 'mousemove', html5audio.docMouseMove);

    html5audio.audio_moveState = 0;
    html5audio.audio_player_id = id;
    audioPlayer.change(id, 'init');
    audioPlayer.initVolume();
    var vv = audioPlayer.volume / 100;
    html5audio.audio_curVolX = html5audio.audio_wasVolX = intval(html5audio.audio_volLineW*vv);

    var p = ge('player' + id);
    p.innerHTML = html5audio.audioHTML5Code();
    p.style.padding = '0px';
    show(p);

    setTimeout(html5audio.startHTML5Audio, 200);
  },

  docMouseUp: function() {
    if (html5audio.audio_moveState == 1 && !ge('the_audio').paused)
      fadeTo(ge('audio_pr_slider'), 200, 1);
    html5audio.audio_moveState = 0;
  },

  docMouseMove: function() {
    if (html5audio.audio_moveState == 1) { html5audio.onPrMove(); } else
    if (html5audio.audio_moveState == 2) { html5audio.onVolMove(); }
  }
}

try{stManager.done('html5audio.js');}catch(e){}