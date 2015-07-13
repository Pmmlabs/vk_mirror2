var prSliderW = 15;
var volLineW = 41;
var cur_res = -1;
var inside = 0;
var moveState = 0;
//var prX0 = 0;
//var prX1 = -1;
//var volX0 = 0;
//var volX1 = -1;
var curPrX = 0;
var prLineW = 1;
var curVolX = 0;
var wasVolX = 0;
var notLoaded = 1;

function pathToHD(res) {
  var s = (video_host.substr(0, 4) == "http")
    ? video_host
    : 'http://cs' + video_host + '.vkontakte.ru/';

  return s + 'u' + video_uid + '/videos/' + video_vtag + '.' + res + '.mov';
}

function initVideoLinks() {
  if (video_no_flv)      { ge('button240').style.display = 'block'; }
  if (video_max_hd >= 1) { ge('button360').style.display = 'block'; }
  if (video_max_hd >= 2) { ge('button480').style.display = 'block'; }
  if (video_max_hd >= 3) { ge('button720').style.display = 'block'; }

  if (video_no_flv) { changeQuality(240); }
  else { changeQuality(360); }
}

function onMetadata() {
  var video = ge('theVideo');
  var player = ge('html5-player');
  var cont = ge('flash_player_container_outer');
  var bg = ge('bg');
  var ratio = video.videoWidth / video.videoHeight;
  var h = (ratio < 1.34) ? '455px' : '360px';
  if (!fixed_player_size) { h = '100%'; }
  cont.style.height = h;
  player.style.height = h;
  bg.style.height = h;
  video.style.height = h;

  video.style.display = 'block';
  centerPopup();
  animate(ge('menuLayer'), {bottom:40}, 200);
}

function changeQuality(res, force) {
  if (res == cur_res) return;
  cur_res = res;
  onPause();
  qualityBut.setAttribute('data-value', res + 'p');
  var video = ge('theVideo');
  video.pause();
  video.style.display = 'none';
  animate(ge('menuLayer'), {bottom:40}, 200);
  video.src = pathToHD(res);
  video.load();
}

function logoOver(){ge('logo1').className='logo2';}
function logoOut(){ge('logo1').className='logo1';}
function onLogo(){window.open('/');}

function popupOver() {}
function popupOut() {}

function PlayVideo() {
  var video = ge('theVideo');
  if (video.paused) video.play();
  else video.pause();
}

function onErr(e) {
  alert('Video loading error: ' + e.target.error.code);
}

function showMenu(e) {
  inside = 1;
  animate(ge('menuLayer'), {bottom:40}, 200);//40-gh
}
function hideMenu(e) {
  inside = 0;
  if (!ge('theVideo').paused) {
    setTimeout(function(){
      if (inside == 0) {
        animate(ge('menuLayer'), {bottom:0}, 200);//-gh
      }
    }, 1500);
  }
}

function defX(e) {
  return intval(e.clientX + window.scrollX);
}
function prDrag(div) {
  //var e = window.event;
  //prX0 = defX(e);
  //prX1 = curPrX;
  moveState = 1;
}
function volDrag(div) {
  //var e = window.event;
  //volX0 = defX(e);
  //volX1 = curVolX;
  moveState = 2;
}
function prClick() {
  onPrMove();
  prDrag();
}
function volClick() {
  onVolMove();
  volDrag();
}

document.onmouseup = function() { moveState = 0; }
document.onmousemove = function() {
  if (moveState == 1) { onPrMove(); } else
  if (moveState == 2) { onVolMove(); }
}

function onPrMove() {
  var e = window.event;
  var xy = getXY(ge('progress-line'));
  curPrX = defX(e) - xy[0] - 7;// + prX1 - prX0;
  if (curPrX < 0) curPrX = 0;
  if (curPrX > prLineW) curPrX = prLineW;
  ge('prSlider').style.left = curPrX + 'px';

  var video = ge('theVideo');
  video.currentTime = (video.duration * curPrX) / prLineW;
  updTime();
}

function onVolMove() {
  var e = window.event;
  var xy = getXY(ge('volume-line'));
  curVolX = defX(e) - xy[0] - 3;// + volX1 - volX0;
  if (curVolX < 0) curVolX = 0;
  if (curVolX > volLineW) curVolX = volLineW;
  updVol();
}
function onVolumeBut() {
  if (curVolX > 0) {
    wasVolX = curVolX;
    curVolX = 0;
  } else {
    curVolX = wasVolX;
  }
  updVol()
}
function updVol() {
  var vol = intval(curVolX) / volLineW;
  var vb = ge('volume-button');
  if (vol > 0.67) { vb.setAttribute('value', 'max'); } else
  if (vol > 0.34) { vb.setAttribute('value', 'ave'); } else
  if (vol > 0.1)  { vb.setAttribute('value', 'min'); } else {
    vb.setAttribute('value', 'off');
  }
  ge('volSlider').style.left = curVolX + 'px';
  ge('volume-line').style.opacity = 0.5 + 0.5 * vol;
  ge('theVideo').volume = vol;
}

function centerPopup() {
  var sz = getSize(ge('bg'));
  show('popup-bk','video_title','big-play','video_author');
  setStyle(ge('loadingGif2'), {
    left:(sz[0] - 16) / 2,
    top:(sz[1] - 4) / 2
    });
  setStyle(ge('popup1'), {
    position:'absolute',
    left:(sz[0] - 320) / 2,
    top:(sz[1] - 100) / 2
    });
}

function addZero(s) {
  s = intval(s);
  return (s<10) ? '0'+s : s;
}
function formatTime(sec) {
  var s, m, h;
  s = parseInt(sec);
  m = parseInt(s/60); s %= 60;
  h = parseInt(m/60); m %= 60;
  return (h>0 ? h+':' : '') + addZero(m) + ':' + addZero(s);
}
function updTime() {
  var video = ge('theVideo');
  if (video) {
    ge('prSlider').style.left = ((prLineW * video.currentTime) / video.duration) + 'px';
    ge('curtime').innerHTML = formatTime(video.currentTime);
    ge('duration').innerHTML = formatTime(video.duration);
  }
}
function onDurationChange() {
  updTime();
}

function onPlay() {
  showLoading();
  ge('playButton').className = 'pause-button';
  ge('popup1').style.display='none';
}
function onPause() {
  ge('playButton').className = 'play-button';
  ge('popup1').style.display='block';
}
function onProgress(e) {
  var ratio = parseInt((100*e.loaded) / e.total);
  setStyle(ge('progress-line'), {width:ratio+'%'});
}
function onSuspend() {
  setStyle(ge('progress-line'), {width:'100%'});
}

function onLoadStart() {
  notLoaded = 1;
}
function onCanPlay() {
  notLoaded = 0;
  showLoading();
}
function onEnded() {
  ge('theVideo').pause();
  ge('theVideo').currentTime = 0;
  updTime();
}

function showLoading() {
  ge('video_cont').style.display = notLoaded ? 'none' : 'block';
  ge('loadingGif2').style.display  = notLoaded ? 'block' : 'none';
}

function initVideo() {
  var video = ge('theVideo');

  video.volume = curVolX / volLineW;
  addEvent(video, 'loadstart', onLoadStart);
  addEvent(video, 'canplay', onCanPlay);
  addEvent(video, 'play', onPlay);
  addEvent(video, 'pause', onPause);
  addEvent(video, 'progress', onProgress);
  addEvent(video, 'onerror', onErr);

  addEvent(video, 'durationchange', onDurationChange);
  addEvent(video, 'ended', onEnded);
  addEvent(video, 'suspend', onSuspend);
}

function calcPrLineW() {
  prLineW = getSize(ge('gray-line'))[0] - prSliderW;
  updTime();
}

function initHTML5Player() {
  ge('theVideo').removeAttribute('controls', '');
  ge('menuBk').style.display = 'block';
  ge('menuControls').style.display = 'block';
  curVolX = wasVolX = intval(volLineW*0.65);
  ge('volSlider').style.left = curVolX + 'px';
  ge('volume-line').style.opacity = 0.75;
  ge('video_title').innerHTML = decodeURIComponent(video_title).replace(/\+/g, ' ');
  ge('video_author').innerHTML = decodeURIComponent(video_author).replace(/\+/g, ' ');

  cur_res = -1;
  initVideoLinks();
  initVideo();
/*
  var xy = getXY(ge('progress-line'));
  prX1 = -xy[0] - 7;
  xy = getXY(ge('volume-line'));
  volX1 = -xy[0] - 4;
*/
  var pl = ge('html5-player');
  addEvent(pl, 'mouseover', showMenu);
  addEvent(pl, 'mouseout', hideMenu);

  if (!fixed_player_size) {
    setStyle(pl, {width:'100%',height:'100%'});
  }
  centerPopup();
  calcPrLineW();

  setInterval(function(){
    if (moveState != 1) { updTime(); }
  }, 1000);
}

function htmlCode() {
return '<div id="html5-player">'+
 '<div id="bg" class="bg" onclick="PlayVideo()">'+
   '<div id="loadingGif2" class="loadingGif2"></div>'+
   '<div id="video_cont">'+
     '<video id="theVideo" width="100%" height="100%" onloadedmetadata="onMetadata()">'+
       'HTML5 not supported.<br>'+
     '</video>'+
   '</div>'+
 '</div>'+

 '<div id="menuLayer">'+
   '<div id="menuBk">'+
   '</div>'+

   '<div id="menuControls">'+
     '<table border="0" cellpadding="0" cellspacing="0">'+
       '<tr>'+
         '<td style="padding:12px 10px 5px 12px">'+
           '<div id="playButton" class="play-button" onclick="PlayVideo()"></div>'+
         '</td>'+

         '<td width="100%" style="padding:7px 0 0 0">'+
           '<table width="100%" border="0" cellpadding="1" cellspacing="0">'+
             '<tr>'+
               '<td>'+
                 '<div id="logo1" class="logo1" onmouseover="logoOver();" onmouseout="logoOut();" onclick="onLogo();"></div>'+
               '</td>'+
               '<td width="100%"></td>'+
               '<td>'+
                 '<div id="curtime" class="time1-text">00:00</div>'+
               '</td>'+
               '<td>'+
                 '<div id="duration" class="time2-text">00:00</div>'+
               '</td>'+
             '</tr>'+
             '<tr>'+
               '<td colspan="4">'+
                 '<div class="line-bk" onmousedown="prClick();"></div>'+
                 '<div id="gray-line" class="gray-line" style="width:100%"></div>'+
                 '<div id="progress-line" class="line" style="width:0%" onmousedown="prClick();"></div>'+
                 '<div id="prSlider" class="slider">'+
                   '<button class="progress-slider" onmousedown="prDrag(this);"></button>'+
                 '</div>'+
               '</td>'+
             '</tr>'+
           '</table>'+
         '</td>'+

         '<td style="padding:21px 0 9px 18px">'+
           '<div id="volume-button" class="volume-button" value="ave" onclick="onVolumeBut()"></div>'+
         '</td>'+
         '<td style="padding:25px 15px 0 0">'+
           '<div id="volLine" style="width:50px;margin:0">'+
             '<div class="line-bk" onmousedown="volClick();"></div>'+
             '<div id="volume-line" class="line" onmousedown="volClick();"></div>'+
             '<div id="volSlider" class="slider">'+
               '<button class="volume-slider" onmousedown="volDrag(this);"></button>'+
             '</div>'+
           '</div>'+
         '</td>'+
         '<td style="padding:14px 10px 5px 5px">'+
           '<div id="qualityBut" class="quality-button" data-value="480p">'+
             '<div class="quality-panel">'+
               '<button id="button720" value="720p" style="display:none" onclick="changeQuality(720);"></button>'+
               '<button id="button480" value="480p" style="display:none" onclick="changeQuality(480);"></button>'+
               '<button id="button360" value="360p" style="display:none" onclick="changeQuality(360);"></button>'+
               '<button id="button240" value="240p" style="display:none" onclick="changeQuality(240);"></button>'+
             '</div>'+
           '</div>'+
         '</td>'+

       '</tr>'+
     '</table>'+
   '</div>'+
 '</div>'+
 '<div id="popup1" onmouseover="popupOver()"; onmouseout="popupOut()" onclick="PlayVideo()">'+
   '<div id="popup-bk" class="popup-bk"></div>'+
   '<div id="video_title" class="video_title">Title</div>'+
   '<div id="big-play" class="big-play"></div>'+
   '<div id="video_author" class="video_author">Author</div>'+
 '</div>'+
'</div>';
}

function insertHTML5Player(html) {
  ge('video_player').innerHTML = html;
  ge('video_player').style.padding = '0';
  initHTML5Player();
}

function startHTML5() {
  insertHTML5Player(htmlCode());
}

onDomReady(function () {
  startHTML5();
});
