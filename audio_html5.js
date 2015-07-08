var audio_prSliderW = 14;
var audio_volLineW = 41;
var audio_moveState = 0;
var audio_curPrX = 0;
var audio_prLineW = 1;
var audio_curVolX = 0;
var audio_wasVolX = 0;
//var audio_notLoaded = 1;
var audio_player_id = 0;
var audio_is_wall = false;
var audio_cont = null;

function playPause() {
  var p = ge('theAudio');
  if (!p) {
    audio_player_id = 0;
    return;
  }
  if (!p.paused && window.audioEditMode) {
    AudioObject.hidePlayer(audio_player_id);
    return;
  }
  PlayAudio();
}

function PlayAudio() {
  var p = ge('theAudio');
  if (!p) {
    audio_player_id = 0;
    return;
  } else {
    if (isNaN(p.duration)) {
      p.src = getUrl();
      p.load();
    }

    if (p.paused) {
      p.play();
    } else {
      //if (window.audioEditMode) {
      //  AudioObject.hidePlayer(audio_player_id);
      //} else {
        p.pause();
      //}
    }
  }
}

function onErr(e) {
  alert('Audio loading error: ' + e.target.error.code);
}

function defX(e) {
  var hscroll = (browser.ipad || browser.iphone4 || browser.ipod4) ? 0 : (document.all ? document.scrollLeft : window.pageXOffset);//window.scrollX);
  return intval(e.clientX + hscroll);
}
function prDrag(div) {
  audio_moveState = 1;
  fadeTo(ge('audio_prSlider'), 200, 0.5);
}
function volDrag(div) {
  audio_moveState = 2;
}
function prClick() {
  onPrMove();
  prDrag();
}
function volClick() {
  onVolMove();
  volDrag();
}

document.onmouseup = function() {
  if (audio_moveState == 1 && !ge('theAudio').paused)
    fadeTo(ge('audio_prSlider'), 200, 1);

  audio_moveState = 0;
}
document.onmousemove = function() { 
  if (audio_moveState == 1) { onPrMove(); } else 
  if (audio_moveState == 2) { onVolMove(); }
}

function onPrMove() {
  var p = ge('theAudio');
  if ((browser.ipad || browser.iphone4 || browser.ipod4) && p.readyState != HTMLMediaElement.HAVE_FUTURE_DATA && p.readyState != HTMLMediaElement.HAVE_ENOUGH_DATA){
    //console.log('p.readyState ' + p.readyState + '   HTMLMediaElement.HAVE_FUTURE_DATA ' + HTMLMediaElement.HAVE_FUTURE_DATA);
    return;
  }
  if (p.paused) p.play();
  var e = window.event;
  var xy = getXY(ge('audio_progress-line'));
  audio_curPrX = defX(e) - xy[0] - 7;
  if (audio_curPrX < 0) audio_curPrX = 0;
  if (audio_curPrX > audio_prLineW) audio_curPrX = audio_prLineW;
  ge('audio_prSlider').style.left = audio_curPrX + 'px';
  updTimeEx();
}

function updTimeEx() {
  var p = ge('theAudio');
  if (p && !isNaN(p.duration)) {
    try{
      p.currentTime = p.startTime + (p.duration * audio_curPrX) / audio_prLineW;
    }catch(e){
      reCreateAudioPlayer();
    };
  }
  updTime();
}

function onVolMove() {
  var e = window.event;
  var xy = getXY(ge('audio_volume-line'));
  audio_curVolX = defX(e) - xy[0] - 3;
  if (audio_curVolX < 0) audio_curVolX = 0;
  if (audio_curVolX > audio_volLineW) audio_curVolX = audio_volLineW;
  updVol();
}

function updVol() {
  if (!ge('audio_volSlider')) return;
  var vol = intval(audio_curVolX) / audio_volLineW;
  ge('audio_volSlider').style.left = audio_curVolX + 'px';
  ge('audio_volume-line').style.opacity = 0.5 + 0.5 * vol;
  ge('theAudio').volume = vol;
  stateChanged(audio_player_id, 'volume', intval(100*vol));
}

/*function addZero(s) {
  s = intval(s);
  return (s<10) ? '0'+s : s;
}
function formatTime(sec) {
  var s, m, h;
  s = parseInt(sec);
  m = parseInt(s/60); s %= 60;
  h = parseInt(m/60); m %= 60;
  return (h>0 ? h+':' : '') + addZero(m) + ':' + addZero(s);
}*/
function updTime() {
  var p = ge('theAudio');
  if (p && !isNaN(p.duration) && p.duration > 0 && audio_moveState != 1) {
    ge('audio_prSlider').style.left = ((audio_prLineW * (p.currentTime - p.startTime)) / p.duration) + 'px';
    if (p.duration - p.currentTime <= 1){
      p.pause();
      onEnded();
    }
  }
  //ge('curtime').innerHTML = formatTime(p.currentTime);
  //ge('duration').innerHTML = formatTime(p.duration);
}

function onPlay() {
  stateChanged(audio_player_id, 'play');
  fadeTo(ge('audio_prSlider'), 200, 1);
}
function onPause() {
  stateChanged(audio_player_id, 'pause');
  fadeTo(ge('audio_prSlider'), 200, 0.5);
}
function onProgress(e) {
  //var p = ge('theAudio');
  //for (var i in p) { console.log(i); }
  //console.log( "onProgress() p.buffered " + p.buffered.start + ', ' + p.buffered.end + '   len ' + p.buffered.length );
  //if (p.totalBytes != undefined && p.totalBytes > 0) {
  //  var ratio = parseInt((100*p.bufferedBytes) / p.totalBytes);
  //  setStyle(ge('audio_progress-line'), {width:ratio+'%'});
  //}
}

function onSuspend() {
  setStyle(ge('audio_progress-line'), {width:'100%'});
}

function onMetadata() {
  //ge('theAudio').play();
}
function onPlaying() {
  //console.log('onPlaying');
  if (audio_curPrX > 0) {
    updTimeEx();
  }
  setInterval(updTime, 1000);
}
function onCanPlay() {
  setTimeout(function(){ge('theAudio').play();}, 1000);
  //audio_notLoaded = 0;
  //showLoading();
}
function onEnded() {
  if (audio_moveState == 0){
    nextTrack(audio_player_id);
    //stateChanged(audio_player_id, audio_is_wall, 'finished', '');
  }
}

function getUrl() {
  var info = audio_cont.fileInfo[audio_player_id];
  if (info.url != undefined) {
    return info.url;
  }
  return 'http://cs' + info.host + '.vkontakte.ru/u' + info.user + '/audio/' + info.id + '.mp3';
}

function touchHandler(e)
{
  var touches = e.changedTouches,
    first = touches[0],
    type = '';
  
  var p = ge('theAudio');
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
  if (e.target == ge('audio_white-line') || e.target == ge('audio_progress-line') || e.target == ge('audio_prSlider')) {
    e.preventDefault();
  }
}

function initAudio() {
  var p = ge('theAudio');
  p.src = getUrl();
  p.load();

  p.volume = audio_curVolX / audio_volLineW;
  addEvent(p, 'canplay', onCanPlay);
  addEvent(p, 'playing', onPlaying);
  addEvent(p, 'play', onPlay);
  addEvent(p, 'pause', onPause);
  addEvent(p, 'progress', onProgress);
  addEvent(p, 'onerror', onErr);
  addEvent(p, 'suspend', onSuspend);

  if (browser.ipad || browser.iphone4 || browser.ipod4) {
    document.addEventListener('touchstart', touchHandler, true);
    document.addEventListener('touchmove', touchHandler, true);
    document.addEventListener('touchend', touchHandler, true);
  }

  setTimeout(function(){p.play();}, 100);
}

function initAudioHtml5() {
  var vv = audio_cont.curVolume / 100;
  audio_curVolX = audio_wasVolX = intval(audio_volLineW*vv);
  audio_curPrX = 0;
  ge('audio_prSlider').style.left = '0px';
  audio_prLineW = getSize(ge('audio_white-line'))[0] - audio_prSliderW;

  initAudio();
  updVol();
}

function audioHtml5Code(ww) {
var ypos = (browser.ipad || browser.iphone4 || browser.ipod4) ? '-12' : '5';
var res =
'<div id="audio-player" style="width:' + ww + 'px;display:block;position:relative;top:' + ypos + 'px">'+
 '<audio id="theAudio"></audio>'+
 '<table width="100%" border="0" cellpadding="0" cellspacing="0">'+
   '<tr valign="top">'+
     '<td style="width:100%;padding:0px 0px 0px 0px">'+
     '<div id="audio_white-line" style="width:100%;height:15px;position:relative;display:block;top:-5px;background-color:#fff;cursor:pointer;-webkit-user-select:none" onmousedown="prClick(this);"></div>'+
     '<div id="audio_progress-line" style="width:100%;height:1px;margin:0;position:relative;display:block;top:-8px;background-color:#5F7D9D;cursor:pointer;-webkit-user-select:none" onmousedown="prClick(this);">'+
       '<div id="audio_prSlider" style="display:block;position:relative;width:14px;height:5px;left:0%;border:0;padding:0;margin:-7px 0 0 0;background-color:#5F7D9D;-webkit-user-select:none;cursor:pointer" onmousedown="prDrag(this);"></div>'+
     '</div>'+
     '</td>';

if (!browser.ipad && !browser.iphone4 && !browser.ipod4){
  res += '<td style="padding:0px 0px 0px 10px"></td>' +
     '<td style="padding:1px 0px 0px 0px">'+
       '<div id="audio_white-volume-line" style="width:50px;height:15px;position:relative;top:-5px;display:block;background-color:#fff;cursor:pointer;-webkit-user-select:none" onmousedown="volClick(this);"></div>'+
       '<div id="audio_volume-line" style="width:50px;height:1px;position:relative;top:-9px;margin:0;background-color:#5F7D9D;cursor:pointer;-webkit-user-select:none" onmousedown="volClick(this);">'+
         '<div id="audio_volSlider" style="left:0%;border:0;padding:0;margin:-7px 0 0 0;display:block;width:7px;height:5px;position:relative;background-color:#5F7D9D;-webkit-user-select:none;cursor:pointer" onmousedown="volDrag(this);"></div>'+
       '</div>'+
     '</td>';
}

res += '</tr>'+
 '</table>'+
'</div>';
return res;
}

function reCreateAudioPlayer() {
  var p = ge('player' + audio_player_id);
  p.innerHTML = audioHtml5Code("100%");// audio_is_wall ? 290 : 343 );
  p.style.padding = '0';
  show('player' + audio_player_id);
  setTimeout(initAudioHtml5, 200);
}

function insertAudioHtml5(obj, id) {
  audio_cont = obj;
  audio_player_id = id;
  reCreateAudioPlayer();
  stateChanged(audio_player_id, 'init');
}
