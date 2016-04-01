var Doge = {

show: function() {
  if (Doge.shown) {
    return false;
  }
  Doge.shown = true;
  var dogeDom = ge('vk_doge');
  if (!dogeDom) {
    var src = '/images/pics/nichosi'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png';
    var srcStr = '/images/pics/nichosi_str'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png';
    var dogeDom = ce('a', {
      id: 'vk_doge',
      innerHTML: '<div style="font-family: \'Comic Sans MS\', cursive; font-size: 24px; position: absolute; margin-top: -56px; width: 150px; text-align: center; opacity: 0;filter: alpha(opacity=0);">WOW</div><img id="nichosi_str" style="position: absolute;" src="'+srcStr+'" width="150" height=37"><img src="'+src+'" width="150" height=150">',
    }, {
      position: 'fixed',
      bottom: -150,
      right: 50,
      width: 150,
      height: 150,
      padding: '35px 35px 0px 35px',
      zIndex: 110
    });
    utilsNode.appendChild(dogeDom);
  }
  debugLog(dogeDom);
  show(dogeDom);
  animate(dogeDom, {bottom: 0}, {duration: 150})
  var nStr = ge('nichosi_str');
  setStyle(nStr, {marginTop: 0});
  setTimeout(function() {
    animate(nStr, {marginTop: -20}, {duration: 300, transition:function(t, b, c, d) { return c * cubicBezier(.47,4.29,.51,.3, t/d, 4/d) + b; }});
  }, 150);
  setTimeout(Doge.hide, 1000);
},

hide: function() {
  var dogeDom = ge('vk_doge');
  var nStr = ge('nichosi_str');
  animate(nStr, {marginTop: -180}, {duration: 200});
  animate(dogeDom, {bottom: -150}, 200, function() {
    animate(nStr, {marginTop: 0}, {duration: 150, transition: Fx.Transitions.swiftOut, onComplete: function() {
      hide(dogeDom);
      Doge.shown = false;
    }});
  });
},

updateLikes: function() {
  var likes = geByClass('post_like_link');
  for(var i in likes) {
    likes[i].innerHTML = 'Such Like';
  }
  var onlines = geByClass('online');
  for(var i in onlines) {
    if (onlines[i].tagName == 'SPAN') {
      onlines[i].innerHTML = 'So Online';
    }
  }
},

initSound: function(url) {
  if (!window.Sound) {
    cur.sound = {play: function () {}, stop: function() {}};
  } else {
    cur.sound = new Sound(url, {forceMp3: true, forcePath: url});
  }
},

blowTimer: function(el) {
  if (cur.blowing) {
    return false;
  }
  if (cur.blowed) {
    return nav.go(el);
  }
  Doge.initSound('mp3/boom.mp3');
  cur.blowing = true;
  var st = 'style="font-size: 2em; text-align: center; font-weight: bold;"';
  showDoneBox('<div ' + st + '>3</div>', {w: 20, out: 3000});
  var start = new Date().getTime(), el = geByClass1('top_result_baloon');
  var interval = setInterval(function() {
    var now = 3000 - (new Date().getTime() - start);
    if (now <= 0) {
      clearInterval(interval);
      Doge.blowImages();
    } else {
      el.innerHTML = '<div ' + st + '>' + Math.ceil(now / 1000) + '</div>';
    }
  }, 100);
},

blowImages: function() {
  var imgs = geByTag('img', bodyNode);
  cur.sound.play();
  each(imgs, function(i, img) {
    if (img.parentNode === bodyNode || !isVisible(img)) return;
    var sz = getSize(img), pos = getXY(img),
        centerPos = [lastWindowWidth / 2, scrollGetY() + lastWindowHeight / 2], centerSz = [0, 0], bg, step = 1500;
    if (!sz[0] || !sz[1]) return;
    bg = ce('div', {}, {width: sz[0], height: sz[1], backgroundColor: '#f1f1f1', display: 'inline-block', border: '0px', margin: '0px', padding: '0px'});
    img.parentNode.insertBefore(bg, img);
    bodyNode.insertBefore(img, domFC(bodyNode));
    setStyle(img, {position: 'absolute', left: pos[0], top: pos[1], width: sz[0], height: sz[1], zIndex: 100});
    var dx = pos[0] - centerPos[0] + (sz[0] - centerSz[0]) / 2,
        dy = pos[1] - centerPos[1] + (sz[1] - centerSz[1]) / 2;
    animate(img, {left: pos[0] + step * dx / Math.abs(dx), top: step * dy / Math.abs(dx)}, {duration: 1000, transition: Fx.Transitions.linear, onComplete: function() {
      re(img);
      cur.blowing = false;
      cur.blowed = true;
    }})
  });
},

eof:1};

var Harold = {

width: 180, // 360
height: 128, // 256
offset: -30,

ttwidth: 242,
ttheight: 105,
ttoffset: -73,

init: function(lang, hash) {
  this.hash = hash;

  var loaded = 0,
    onload = function() {
      if (++loaded != 2) return;
      if (window.IdleManager) {
        var idleManager = new IdleManager({
          onIdleCb: function () {
            this.appear();
            idleManager.stop();
          }.bind(this),
          id: 'harold',
          idleTimeout: 1000,
          element: document,
          focusElement: window
        });
        idleManager.start();
        idleManager.activate();
      } else {
        this.appear();
      }
    }.bind(this);

  this.obj = ce('a', {href: 'https://new.vk.com/blog', target: '_blank'}, {cursor: 'pointer', position: 'fixed', bottom: -this.height, right: 70, width: this.width, height: this.height, zIndex: 110});
  this.tt = ce('img', {width: this.ttwidth, height: this.ttheight, 'className':'harold-tt'}, {top: -this.offset * 2, left: -210, 'pointer-events': 'none', position: 'absolute'});
  var img = ce('img', {width: this.width, height: this.height, 'className':'harold-main'});

  img.onload = onload;
  img.src = '/images/pics/Harold'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png';
  this.tt.onload = onload;
  this.tt.src = '/images/pics/Harold_str_'+lang+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png';

  this.obj.appendChild(this.tt);
  this.obj.appendChild(img);
  utilsNode.appendChild(this.obj);
},

appear: function() {
  animate(this.obj, {bottom: -(this.height + this.offset)}, {
    duration: 1500,
    transition:function(t, b, c, d) { return c * cubicBezier(.47,4.29,.51,.3, t/d, 4/d) + b; }
  });
  var onshow = this.show.bind(this),
    onhide = this.hide.bind(this),
    onclick = this.click.bind(this, onshow, onhide);
  addEvent(this.obj, 'mouseover', onshow);
  addEvent(this.obj, 'mouseout', onhide);
  addEvent(this.obj, 'click', onclick);
  addEvent(this.tt, 'click', onclick);
},

show: function() {
  this.ht  && clearTimeout(this.ht);
  animate(this.obj, {bottom: 0}, {
    duration: 400,
    transition: Fx.Transitions.swiftOut
  });
  this.tttm = setTimeout(function(){
      animate(this.tt, {top: this.ttoffset}, {
      duration: 150,
      transition: Fx.Transitions.swiftOut,
      onComplete: function() {
        this.tt.style.pointerEvents = 'all';
      }.bind(this)
    });
  }.bind(this), 150);
},

hide: function() {
  this.tttm  && clearTimeout(this.tttm);
  this.ht  && clearTimeout(this.ht);
  this.ht = setTimeout(function() {
    this.tt.style.pointerEvents = 'none';
    animate(this.tt, {top: -this.offset * 2}, {duration: 150, transition: function(t, b, c, d) { return c * cubicBezier(1,-0.01,.96,.77, t/d, 4/d) + b; }});
    animate(this.obj, {bottom: -(this.height + this.offset)}, 200);
  }.bind(this), 100);
},

click: function(onshow, onhide) {
  if (this.clicked) return;
  this.tttm  && clearTimeout(this.tttm);
  this.clicked = true;
  removeEvent(this.obj, 'mouseover', onshow);
  removeEvent(this.obj, 'mouseout', onhide);
  this.obj.style.pointerEvents = 'none';
  animate(this.tt, {top: -this.offset * 2}, {duration: 150, transition: function(t, b, c, d) { return c * cubicBezier(1,-0.01,.96,.77, t/d, 4/d) + b; }});
  animate(this.obj, {bottom: -this.height}, 200);
  ajax.post('al_index.php', {
    act: 'a_testredesign',
    hash: this.hash,
    harold: 1
  });
},

eof:1};

try{stManager.done('doge.js');}catch(e){}
