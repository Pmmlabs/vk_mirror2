var ThumbsEdit = {
  cache: function() {
    if (!cur._thEdCache) cur._thEdCache = {};
    return cur._thEdCache;
  },
  loaded: function() {
    if (!cur._thEdLoaded) cur._thEdLoaded = {};
    return cur._thEdLoaded;
  },
  cur: function() {
    if (!cur._thEdCur) cur._thEdCur = {};
    return cur._thEdCur;
  },
  convert: function(type, id, media) {
    var result = {type: type, remove: media.remove, click: media.click}, ids = id.split('_');
    switch (type) {
      case 'photo':
        result.photo = {owner_id: ids[0], pid: ids[1], sizes: media.sizes};
      break;
      case 'video':
        result.video = {owner_id: ids[0], vid: ids[1], duration: media.duration, sizes: media.sizes};
      break;
      case 'album':
        result.album = {owner_id: ids[0], aid: ids[1], title: media.title, size: media.size, thumb: {sizes: media.sizes}};
      break;
      case 'market_album':
        result.market_album = {owner_id: ids[0], aid: ids[1], title: media.title, msize: media.msize, thumb: {sizes: media.sizes}};
      break;
    }
    return result;
  },

  getMedias: function(el) {
    var res = [];

    el = ge(el);
    if (!el) return res;

    for (var arr = (ThumbsEdit.cache()[el.id] || {}).previews || [], i = 0, l = arr.length; i < l; ++i) {
      switch (arr[i].type) {
        case 'photo': res.push(['photo', arr[i].photo.owner_id + '_' + arr[i].photo.pid]); break;
        case 'video': res.push(['video', arr[i].video.owner_id + '_' + arr[i].video.vid]); break;
        case 'album': res.push(['album', arr[i].album.owner_id + '_' + arr[i].album.aid]); break;
        case 'market_album': res.push(['market_album', arr[i].market_album.owner_id + '_' + arr[i].market_album.aid])
          break;
      }
    }
    return res;
  },

  init: function(el, attachments, options){
    el = ge(el);
    if(!el) return;

    options = options === true || options === false ? {wide: options} : options || {};
    var opts = clone(options);

    var wide = opts.wide;
    var maxW = opts.width;
    var maxH = opts.height;
    if(!maxW || !maxH){
      maxW = el.parentNode.offsetWidth;
      maxH = maxW * 0.666;
    } else {
      opts.force = true;
    }
    if(wide === undefined){
      options.wide = opts.wide = wide = !!ThumbsEdit.getParent(el, 'wide_wall_module');
    }

    var _e = ThumbsEdit;
    var thumbs = _e.processThumbs(maxW, maxH, attachments, opts);
    var atts = [];

    each(attachments, function(k, a){
      if(a.type == 'photo' || a.type == 'video' || a.type == 'album' || a.type == 'market_album') atts[atts.length] = a;
    });
    _e.cache()[el.id] = {previews: atts, thumbs: thumbs.thumbs, height: thumbs.height, opts: options, wide: wide};

    (wide ? addClass : removeClass)(el, 'wide');
    el.innerHTML = '';
    each(thumbs.thumbs, function(k, t){
      el.appendChild(_e.thumbElement(t, k));
    });
    setStyle(el, {width: thumbs.width, height: thumbs.height});

  },
  getParent: function(node, className){
    var ref = node;
    while(!hasClass(ref, className) && ref.parentNode) ref = ref.parentNode;
    return ref.parentNode ? ref : null;
  },
  thumbElement: function(thumb, index){
    var style = { width: intval(thumb.width), height: intval(thumb.height) };

    var el = ce('div', { className: 'thumb_wrap fl_l' + (thumb.lastColumn ? ' last_column' : '') + (thumb.lastRow ? ' last_row' : '') + (thumb.msize ? ' thumb_market_album_wrap' : '') + (thumb.image.src.match('x_noalbum') ? ' thumb_no_cover' : '') }, style);
    var img = ce('img', { className: 'preview'});
    var overlay = ce('div', { className: 'overlay' });
    var xbutn = ce('div', { className: 'thumb_x_button', innerHTML: '<div class="thumb_x"></div>' });
    var draggable = ce('div', {className: 'draggable_thumb clear_fix' + (thumb.unsized ? ' unsized' + (thumb.single ? ' unsized_single' : '') : '')}, style);

    addEvent(draggable, 'click', function(e){
      if(ThumbsEdit.cur().updating || ThumbsEdit.getParent(e.target, 'thumb_x_button')) return;
      var t = ThumbsEdit.getParent(e.target, 'thumb_wrap');
      if (ThumbsEdit.cache()[t.parentNode.id].previews[t.getAttribute('index')].click) {
        ThumbsEdit.cache()[t.parentNode.id].previews[t.getAttribute('index')].click();
      }
    });

    addEvent(xbutn, 'click', function(e) {
      var t = ThumbsEdit.getParent(e.target, 'thumb_wrap');
      hide(t.firstChild);
      ThumbsEdit.removeMedia(t.parentNode.id, t.getAttribute('index'));
    });
    if (browser.msie && browser.version < 9) {
      xbutn.setAttribute('title', getLang('dont_attach'));
    } else {
      addEvent(xbutn, 'mouseover', function() {
        showTooltip(this, {text: getLang('dont_attach'), shift: [14, 3, 3], black: 1});
      });
    }

    addEvent(draggable, 'mousedown touchstart', ThumbsEdit.startDrag);

    var image   = thumb.old_image ? thumb.old_image : thumb.image;
    var cropped = ThumbsEdit.crop(thumb, thumb.width, thumb.height);

    if(!thumb.unsized){
      extend(img, {width: cropped.width, height: cropped.height});
      setStyle(img, {marginLeft: cropped.marginLeft, marginTop: cropped.marginTop});
      img.src = image.src;
    } else {
      setStyle(draggable, 'backgroundImage', 'url(' + image.src + ')')
    }

    if(thumb.old_image){
      ThumbsEdit.loadAndDisplayImage(img, thumb);
    }

    if(!thumb.unsized) draggable.appendChild(img);
    draggable.appendChild(overlay);
    draggable.appendChild(xbutn);
    el.appendChild(draggable);
    el.setAttribute('index', index);
    el.setAttribute('attachment', thumb.id);

    if(thumb.duration){
      if(thumb.single){
        draggable.appendChild(ce('div', {className: 'page_post_video_play_inline'}));
      } else {
        draggable.appendChild(ce('div', {className: 'duration', innerHTML: thumb.duration}));
      }
    }

    if((thumb.title || thumb.thumb) && !thumb.duration){
      var title = ce('div', {className: 'album_title'});
      title.appendChild(ce('div', {innerHTML: thumb.height > 100 ? thumb.title : ' ', className: 'fl_l title_text'}, {width: style.width - 70}));
      if (thumb.msize) {
        title.appendChild(ce('div', {innerHTML: thumb.msize, className: 'album_market_size'}));
      } else {
        title.appendChild(ce('div', {innerHTML: thumb.size, className: 'album_size'}));
      }
      draggable.appendChild(title);
    }

    return el;
  },
  loadAndDisplayImage: function(node, thumb){
    if(!node) return;

    var img = new Image();

    var image = thumb.image;
    var old_image = thumb.old_image;

    if(!old_image) return;

    if(ThumbsEdit.loaded()[image.src] && node.src != image.src){
      node.src = image.src;
      thumb.old_image = null;
      return;
    }

    var loader = function(){
      if(node.src == old_image.src){
        node.src = image.src;
        thumb.old_image = null;
        ThumbsEdit.loaded()[image.src] = true;
      }
      removeEvent(img, 'load', loader);
    };

    addEvent(img, 'load', loader);
    img.src = image.src;
  },

  move: function(arr, old_index, new_index){
    if(new_index >= arr.length){
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  },
  scale: function(width, height, max_width, max_height, crop){
    var w = intval(width);
    var h = intval(height);
    if(!max_height) max_height = max_width;
    if(width >= height && width > max_width){
      w = max_width;
      h = intval(height / (width / max_width));
    } else if((width < height) && height > max_height) {
      h = max_height;
      w = intval(width / (height / max_height));
    }
    return [w, h];
  },
  crop: function(thumb, width, height){
    if(thumb.vid){
      return {width: width, height: height};
    }

    var single = thumb.single;
    var image_size = thumb.image;
    var img_w = width;
    var img_h = height;
    var x = 0;
    var y = 0;

    if(image_size.width && image_size.height){
      var img_ratio = image_size.width / image_size.height;

      if (img_ratio < width / height) {
        if (single && image_size.width < width) {
          width = image_size.width;
          height = Math.min(height, image_size.height);
        }
        img_w = width;
        img_h = img_w / img_ratio;
        if (img_h > height) {
          y = -intval((img_h - height) / 2);
        }
      } else {
        if (single && image_size.height < height) {
          height = image_size.height;
          width = Math.min(width, image_size.width);
        }
        img_h = height;
        img_w = img_h * img_ratio;
        if (img_w > width) {
          x = -intval((img_w - width) / 2);
        }
      }
    }

    return {width: img_w, height: img_h, marginLeft: x, marginTop: thumb.isAlbum && thumb.single ? 0 : y};
  },

  getCoords: function(wrap, wrap_pos){
    var coords = [];
    var wpos = wrap_pos || getXY(wrap);
    each(wrap.childNodes, function(k, node){
      if(!hasClass(node, 'thumb_wrap')) return;
      var p = getXY(node);
      coords[coords.length] = {
        id: node.getAttribute('attachment'),
        x: intval(p[0] - wpos[0]),
        y: intval(p[1] - wpos[1]),
        width: intval(node.offsetWidth),
        height: intval(node.offsetHeight),
        index: intval(node.getAttribute('index')),
        node: node
      };
    });
    return coords;
  },

  startDrag: function(e){
    var touch = e.touches && e.touches.length == 1;
    var clck = e.button == undefined || e.button != 0 && !(e.button == 1 && browser.msie8);

    if((clck && !touch) || ThumbsEdit.getParent(e.target, 'thumb_x_button') || ThumbsEdit.cur().updating) {
      return;
    }

    var el = ThumbsEdit.getParent(e.target, 'draggable_thumb');
    var wr = ThumbsEdit.getParent(el, 'editable_thumbs');
    var cache = ThumbsEdit.cache()[wr.id];

    if(!cache || (cache.previews || []).length < 2) return;

    ThumbsEdit.cur().el = el;
    addEvent(window, 'mousemove touchmove', ThumbsEdit.drag);
    addEvent(window, 'mouseup touchend touchcancel', ThumbsEdit.drop);
    return touch || cancelEvent(e);
  },
  drag: function(e){
    var _e = ThumbsEdit;

    var el = _e.cur().el;

    if(e.touches && e.touches.length > 1) return _e.drop();

    var pageX = browser.android ? e.touches[0].pageX + (e.pageX || 0) : e.pageX;
    var pageY = browser.android ? e.touches[0].pageY + (e.pageY || 0) : e.pageY;
    var ecur = _e.cur();

    if(!hasClass(el, 'moving')){
      var wrap = el.parentNode.parentNode;
      var overlay = geByClass('overlay', el)[0];
      var img = geByClass('preview', el)[0];

      var i = intval(el.parentNode.getAttribute('index'));
      var thumb = _e.cache()[wrap.id].thumbs[i];
      var wpos = getXY(wrap);
      var pos = getXY(el.parentNode);
      var coords = _e.getCoords(wrap, wpos);

      //alert(pageX + ' ' + wpos[0] + ' ' + wpos[1]);

      ecur.id = wrap.id;
      ecur.i = i;
      ecur.to_i = i;
      ecur.x = pageX - pos[0];
      ecur.y = pageY - pos[1];
      ecur.t = thumb;
      ecur.w = thumb.width;
      ecur.h = thumb.height;
      ecur.pos = pos;
      ecur.wpos = wpos;
      ecur.crop = _e.crop(thumb, thumb.width, thumb.height);
      ecur.coords = coords;

      var scaled = _e.scale(thumb.width, thumb.height, 75);
      var w = scaled[0];
      var h = scaled[1];
      var x = intval((thumb.width - w) * (browser.android ? 0.5 : ecur.x / thumb.width));
      var y = intval((thumb.height - h) * (browser.android ? 0.5 : ecur.y / thumb.height));

      addClass(el, 'moving');
      setStyle(el, 'zIndex', 100);

      var anim    = {duration: 120, transition: Fx.Transitions.easeOutCubic};
      var cropped = _e.crop(thumb, w, h);

      animate(el, {opacity: 0.85, width: w, height: h, marginLeft: x, marginTop: y}, anim);
      animate(overlay, {opacity: 1}, anim);
      if(img) animate(img, cropped, anim);

    } else {
      var x = pageX - (ecur.pos[0] + ecur.x);
      var y = pageY - (ecur.pos[1] + ecur.y);
      setStyle(el, {left: x, top: y});

      var wpos = ecur.wpos;

      x = ecur.pos[0] + intval(el.style.marginLeft) + x - wpos[0];
      y = ecur.pos[1] + intval(el.style.marginTop) + y - wpos[1];

      var c = { x: x, y: y, offsetX: el.offsetWidth, offsetY: el.offsetHeight, index: ecur.i, node: el };
      var good = false; var to_index = ecur.i; var skip = -1;
      var margin = (_e.cache()[ecur.id] || {}).wide ? 6 : 3;

      each(ecur.coords, function(k, n){
        if(k == ecur.i || k == skip) return;

        n.offsetX = n.node.offsetWidth + margin;
        n.offsetY = n.node.offsetHeight + margin;

        var prev = ecur.coords[k - 1];
        var next = ecur.coords[k + 1];

        var cX = c.x + (c.offsetX / 2);
        var cY = c.y + (c.offsetY / 2);
        var ncX = n.x + (n.offsetX / 2);
        var ncY = n.y + (n.offsetY / 2);
        var fcX = c.x + c.offsetX;
        var fcY = c.y + c.offsetY;
        var fnX = n.x + n.offsetX;
        var fnY = n.y + n.offsetY;

        var mvert  = ((prev && prev.x == n.x && prev.y != n.y && n.y != 0) || (next && next.x == n.x && next.y != n.y)) && n.x != 0;
        var mleft  = cX >= ncX && ((next && ((cX <= next.x + (next.offsetX / 2) && ((next.offsetY == n.offsetY) || (cX < fnX))) || next.y != n.y)) || (!next && c.x <= fnX)) && cY > n.y && cY < fnY;
        var mright = cX < ncX && cX >= n.x && ((!prev || (prev.y != n.y && !(prev.x == n.x && !next))) && cY > n.y && cY < fnY);

        var mup = mvert && ((cY >= ncY && cY < fnY) && cX > n.x && cX < fnX);
        var mdown  = mvert && (cY < ncY && cY >= n.y && cX > n.x && cX < fnX);

        mleft = mleft && !mvert;
        mright = mright && !mvert && !mleft;

        var m = mleft || mright || mup || mdown;

        if(m){
          good = true;
          to_index = n.index < ecur.i && (mleft || mup) ? n.index + 1 : c.index < n.index && (mdown || mright) ? n.index - 1 : n.index;
        }

        if(to_index != ecur.i){
          setStyle(n.node, {left: mleft ? -2 : mright ? 2 : 0, top: mup ? -2 : mdown ? 2 : 0});
        } else {
          setStyle(n.node, {left: 0, top: 0});
        }

        if(mleft && next && next.y == n.y && next.x > n.x && c.index > n.index){
          setStyle(n.node, {left: 0, top: 0});
          setStyle(next.node, {left: 2, top: 0});
          skip = k+1;
        }

        if(mup && next && next.x == n.x && next.y > n.y && cY <= ncY){
          setStyle(next.node, {left: 0, top: 0});
          skip = k+1;
        }

        if(mdown && prev && prev.x == n.x && prev.y < n.y && cY <= ncY){
          setStyle(prev.node, {left: 0, top: -2});
          setStyle(n.node, {left: 0, top: 0});
        }
      });

      ecur.to_i = good ? to_index : ecur.i;
    }

    return cancelEvent(e);
  },
  drop: function(e){
    var _e = ThumbsEdit, ecur = _e.cur();

    ecur.updating = true;

    var el = ecur.el;
    var overlay = geByClass('overlay', el)[0];
    var img = geByClass('preview', el)[0];

    removeEvent(window, 'mousemove touchmove', ThumbsEdit.drag);
    removeEvent(window, 'mouseup touchend touchcancel', ThumbsEdit.drop);

    if(!hasClass(el, 'moving')) {
      ecur.updating = false;
      return cancelEvent(e);
    }

    if(ecur.to_i == ecur.i){
      var thumb = ecur.t;
      var cropped = ecur.crop;

      var anim = { duration: 120, transition: Fx.Transitions.easeOutCubic };

      animate(el, { marginTop: 0, marginLeft: 0, top: 0, left: 0, width: ecur.w, height: ecur.h, opacity: 1 }, extend(anim, { onComplete: function(){ setStyle(el, 'zIndex', null); ecur.updating = false; } }));
      animate(overlay, {opacity: 0}, anim);
      if(img) animate(img, cropped, anim);
    } else {
      var attachments = _e.cache()[ecur.id].previews;
      attachments = _e.move(attachments, ecur.i, ecur.to_i);
      _e.update(ecur.id, attachments);
      if ((_e.cache()[ecur.id].opts || {}).onMove) _e.cache()[ecur.id].opts.onMove();
    }

    removeClass(el, 'moving');
    return cancelEvent(e);
  },

  update: function(el, attachments){
    if(!(el = ge(el))) return;
    var id = el.id;

    var _e = ThumbsEdit;

    var wrap = ge(id);
    var cache = _e.cache()[wrap.id];
    var old_thumbs = cache.thumbs;
    var old_height = cache.height;

    var options = cache.opts;
    var opts = options === true || options === false ? {wide: options} : clone(options || {});
    var maxW = opts.width;
    var maxH = opts.height;
    if(!maxW || !maxH){
      maxW = el.parentNode.offsetWidth;
      maxH = maxW * 0.666;
    } else {
      opts.force = true;
    }
    var thumbs = _e.processThumbs(maxW, maxH, attachments, opts);

    var fake_wrap = ce('div');
    var fake = ce('div', {className: 'editable_thumbs' + (cache.wide ? ' wide' : '')});

    each(thumbs.thumbs, function(k, t){
      fake.appendChild(_e.thumbElement(t, k));
    });
    setStyle(fake, {width: thumbs.width, height: thumbs.height});
    setStyle(fake_wrap, {height: 0, overflow: 'hidden'});
    fake_wrap.appendChild(fake);
    wrap.parentNode.appendChild(fake_wrap);

    var wpos = getXY(fake);
    var coords = _e.getCoords(fake);

    each(coords, function(k, coord){
      var obj = null;
      for(var crds = _e.cur().coords, i = 0, l = crds.length; i < l; ++i) {
        if(crds[i].id == coord.id){
          obj = crds[i];
          break;
        }
      }
      if(obj == null) return;

      var draggable = geByClass('draggable_thumb', obj.node)[0];
      var overlay = geByClass('overlay', draggable)[0];
      var img = geByClass('preview', draggable)[0];
      var caption = geByClass('title_text', draggable)[0];

      var old_thumb = old_thumbs[obj.index];
      var thumb = null;

      each(thumbs.thumbs, function(k, t){
        if(t.id == old_thumb.id) {
          if(!_e.loaded()[t.image.src]) t.old_image = old_thumb.image;
          thumb = t;
        }
      });

      setStyle(obj.node, {left: 0, top: 0});
      if(obj.height != coord.height || obj.width != obj.width || coord.x != obj.x || coord.y != obj.y || obj.index == _e.cur().i){
        if(hasClass(draggable, 'moving')) fadeOut(overlay, 150);
        setTimeout(function(){
          animate(draggable, {top: coord.y - obj.y, left: coord.x - obj.x, marginLeft: 0, marginTop: 0, height: coord.height, width: coord.width, opacity: 1}, 150);
          var cropped = _e.crop(thumb, coord.width, coord.height);
          if(img) animate(img, cropped, 150);
          (thumb.unsized && thumb.single ? addClass : removeClass)(draggable, 'unsized_single');
        }, 4);
      }
      //var isTouch = typeof document.documentElement.ontouchstart != 'undefined';
      //if(!isTouch) _e.loadAndDisplayImage(img, thumb);
    });

    if(old_height != thumbs.height) { setTimeout(function(){ animate(wrap, {height: thumbs.height}, 150); }, 4); }

    setTimeout(function(){
      setStyle(wrap, {height: thumbs.height, width: thumbs.width});
      wrap.innerHTML = '';
      _e.cache()[id].thumbs = thumbs.thumbs;
      _e.cache()[id].previews = attachments;
      _e.cache()[id].height = thumbs.height;
      each(thumbs.thumbs, function(k, t){ wrap.appendChild(_e.thumbElement(t, k)); });
      fake_wrap.parentNode.removeChild(fake_wrap);
      _e.cur().updating = false;
    }, 150);
  },

  setWide: function(el, isWide, options){
    if(!(el = ge(el))) return;

    var obj = ThumbsEdit.cache()[el.id];
    var opts = clone(options || {});

    if (isWide === undefined) {
      isWide = !!ThumbsEdit.getParent(el, 'wide_wall_module');
    }
    opts.wide = isWide;

    if(obj.wide != isWide){
      ThumbsEdit.init(el, obj.previews, opts);
    }
  },
  hasMedia: function(el, media){
    if(!(el = ge(el))) return;

    var id = el.id, found = false, cache = ThumbsEdit.cache()[id];

    if(cache){
      var medias = cache.previews;
      for(var i=0; i<medias.length; i++){
        var m = medias[i];
        if(m[m.type].id == media) {
          found = true;
          break;
        }
      }
    }

    return found;
  },
  addMedia: function(el, media){
    if (!(el = ge(el)) || !media) return;

    var _e = ThumbsEdit;

    var id = el.id, cache = _e.cache()[id];

    if (!cache) return;

    var opts = clone(cache.opts), medias = clone(cache.previews);
    if (_e.hasMedia(el, media[media.type].id)){
      return;
    }
    if (medias.length == 10){
      return;
    }
    medias[medias.length] = media;

    _e.cache()[id] = null;
    _e.init(id, medias, opts);
  },
  refresh: function(el) {
    if (!(el = ge(el))) return;

    var _e = ThumbsEdit;

    var id = el.id, cache = _e.cache()[id];
    if (!cache) return;

    var opts = clone(cache.opts), medias = clone(cache.previews);
    _e.cache()[id] = null;
    _e.init(id, medias, opts);
  },
  removeAll: function(el) {
    if(!(el = ge(el))) return;

    var _e = ThumbsEdit, id = el.id, cache = _e.cache()[id];

    if(!cache) return;

    _e.cache()[id] = null;
    _e.init(id, [], cache.opts);
  },
  removeMedia: function(el, index){
    if(!(el = ge(el))) return null;
    index = intval(index);

    var obj = ThumbsEdit.cache()[el.id];
    if(!obj) return;

    var del = obj.previews.splice(index, 1), idr = del[0][del[0].type].id;
    each (el.childNodes, function(k, v) {
      if (v.getAttribute && v.getAttribute('attachment') == idr) {
        var tt = (geByClass1('thumb_x_button', v) || {}).tt;
        if (tt && tt.destroy) tt.destroy();
      }
    });

    ThumbsEdit.cur().coords = ThumbsEdit.getCoords(el);

    if(obj.previews.length == 0) ThumbsEdit.init(el, [], obj.opts);
    else ThumbsEdit.update(el, obj.previews);

    if (del[0] && del[0].remove) del[0].remove();

    return del;
  },
  removeById: function(el, attId) {
    if(!(el = ge(el))) return null;

    var arr = (ThumbsEdit.cache()[el.id] || {}).previews || [];
    for (var i = 0, l = arr.length; i < l; ++i) {
      if (
        (arr[i].type == 'photo' && arr[i].photo.id == attId) ||
        (arr[i].type == 'video' && arr[i].video.id == attId) ||
        (arr[i].type == 'album' && arr[i].album.id == attId) ||
        (arr[i].type == 'market_album' && arr[i].market_album.id == attId)
      ) {
        return ThumbsEdit.removeMedia(el, i);
      }
    }
    return null;
  },

  getRatio: function(thumb){
    if(thumb.vid){
      return 1.8;
    }
    if(thumb.thumb){
      return 279 / 185;
    }
    //var t = !!thumb.thumb ? thumb.thumb.sizes['x'] : thumb.sizes['x'];
    var t = thumb.sizes['x'];
    var ratio = t[1] == 0 || t[2] == 0 ? 1 : t[1] / t[2];
    return ratio;
  },
  getSize: function(thumb, width, height, single){
    if(!thumb) return {};

    if(thumb.vid) {
      var video_type = '';
      var vid_w = intval(width * (window.devicePixelRatio || 1));
      var vid_h = intval(height * (window.devicePixelRatio || 1));
      var has_l = !!thumb.sizes['l'];
      var has_y = !!thumb.sizes['y'];
      var video_width = 0;
      var video_height = 0;

      if(vid_w <= 130 && vid_h <= 98){
        video_type = 's';
        video_width = 130;
        video_height = 98;
      } else if(vid_w <= 320 && vid_h <= 240){
        video_type = has_l ? 'l' : 'm';
        video_width = 320;
        video_height = 240;
      } else {
        video_type = has_y ? 'y' : has_l ? 'l' : 'm';
        video_width = 640;
        video_height = 480;
      }

      return {width: video_width, height: video_height, src: thumb.sizes[video_type][0]}
    }

    var isAlbum = !!thumb.thumb;
    var image_sizes = isAlbum ? thumb.thumb.sizes : thumb.sizes;
    var pixel_ratio = window.devicePixelRatio || 1;
    var x_size = image_sizes['x'] || {};
    var ratio = (x_size[1] || 1) / (x_size[2] || 1);
    var min_s = 0;

    if (ratio > width / height) {
      min_s = height;
      if (ratio > 1.0) {
        min_s *= ratio;
      }
    } else {
      min_s = width;
      if (ratio < 1.0) {
        min_s /= ratio;
      }
    }
    //min_s *= pixel_ratio;
    height /= pixel_ratio;
    width /= pixel_ratio;

    var use_cropped = !single && !!image_sizes['o'];
    var photo_type = '';
    var image_size = null;

    if(min_s < 75){
      photo_type = 's';
    } else if(min_s < 130){
      photo_type = 'm';
    } else if(use_cropped && (image_size = image_sizes['o']) && image_size[1] >= width && image_size[2] >= height){
      photo_type = 'o';
    } else if(use_cropped && (image_size = image_sizes['p']) && image_size[1] >= width && image_size[2] >= height){
      photo_type = 'p';
    } else if(use_cropped && (image_size = image_sizes['q']) && image_size[1] >= width && image_size[2] >= height){
      photo_type = 'q';
    } else if(use_cropped && (image_size = image_sizes['r']) && image_size[1] >= width && image_size[2] >= height){
      photo_type = 'r';
    } else {
      photo_type = 'x';
    }

    var size = image_sizes[photo_type];
    if(!size[1] || !size[2]) thumb.unsized = true;

    return {src: size[0], width: size[1], height: size[2]};
  },
  compute: function(t, w, h, opt){
    t.id = t.vid ? 'video' + t.owner_id + '_' + t.vid : t.pid ? 'photo' + t.owner_id + '_' + t.pid : t.msize ? 'market_album' + t.owner_id + '_' + t.aid : 'album' + t.owner_id + '_' + t.aid;

    var res = {
      id: t.id,
      width: intval(w),
      height: intval(h),
      lastColumn: opt.lastColumn,
      lastRow: opt.lastRow,
      single: opt.single,
      image: ThumbsEdit.getSize(t, w, h, opt.single),
      unsized: t.unsized,
      orig: t
    };

    if (t.title && t.size != undefined){
      extend(res, {title: t.title, size: t.size, isAlbum: true});
    } else if(t.title && t.msize != undefined){
      extend(res, {title: t.title, msize: t.msize, isAlbum: true});
    }

    if(t.duration){
      var m = intval(t.duration / 60);
      var h = intval(m / 60);
      var s = t.duration - m * 60;
      m -= h * 60;

      res.duration = (h ? h + ':' : '') + (h < 1 || m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
    }

    if(res.unsized){
      res.ratio = 1;
    } else {
      res.ratio = res.image.width / res.image.height;
    }

    return res;
  },
  processThumbs: function(maxW, maxH, attachments, opts){
    var _e = ThumbsEdit;

    var getRatio = _e.getRatio;
    var compute  = _e.compute;
    var oi = function(o){
      return o == 'n' ? 1 : o == 'q' ? 2 : 0;
    }, sum = function(a){
      var sum = 0;
      each(a, function(k, f){ sum+=f; });
      return sum;
    }, getKeys = function(obj){
      var keys = [];
      each(obj, function(k, v){ keys[keys.length] = k; });
      return keys;
    }, multiThumbsHeight = function(ratios, width, margin){
      return (width - (ratios.length - 1) * margin) / sum(ratios);
    };

    opts = isObject(opts) ? opts : {};
    var wide = opts.wide;

    var videoIndexes = [], vIndex = 0;

    var thumbs = [], result = [];
    each(attachments, function(k, a){
      if(a.type == 'photo' || a.type == 'video' || a.type == 'album' || a.type == 'market_album') {
        thumbs[thumbs.length] = a[a.type];
      }
      if (a.type == 'video') {
        videoIndexes.push(vIndex);
      }
      vIndex ++;
    });

    var orients = '', orients_cnt = [0,0,0,0], ratios = [],
        cnt = thumbs.length;

    each(thumbs, function(k, t){
      var ratio = getRatio(t);
      var orient = ratio > 1.2 ? 'w' : ratio < 0.8 ? 'v' : 'q';
      orients += orient;
      orients_cnt[oi(orient)]++;
      ratios[ratios.length] = ratio;
    });

    var avg_ratio = ratios.length > 0 ? sum(ratios) / ratios.length : 1.0;
    var max_w, max_h, margin_w = wide ? 6 : 3, margin_h = margin_w;

    if(opts.force){
      max_w = maxW;
      max_h = maxH;
    } else {
      if(wide) {
        max_w = 537;
        max_h = 343;
      } else {
        if(maxW >= 381){
          max_w = 381;
          max_h = cnt == 1 ? 361 : 237;
        } else {
          max_w = 337;
          max_h = cnt == 1 ? 320 : 214;
        }
      }
      if(maxW < max_w){
        max_w = maxW;
        max_h = maxH;
      }
    }

    var max_ratio = max_w / max_h;
    var thumbs_width = 0;
    var thumbs_height = 0;

    if(cnt == 1){
      var opt = { lastColumn: 1, lastRow: 1, single: 1 };
      if(thumbs[0].thumb){
        thumbs_width = 279;
        thumbs_height = 185;
      } else if(ratios[0] >= 1.0 * max_ratio){
        thumbs_width = max_w;
        thumbs_height = Math.min(thumbs_width / ratios[0], max_h);
      } else {
        thumbs_height = max_h;
        thumbs_width = Math.min(thumbs_height * ratios[0], max_w);
      }
      var t = compute(thumbs[0], thumbs_width, thumbs_height, opt);
      if(!t.unsized && (t.image.width < thumbs_width && t.image.height <= max_h || t.image.height < thumbs_height && t.image.width <= max_w)){
        thumbs_width = t.image.width;
        thumbs_height = t.image.height;
        t = compute(thumbs[0], thumbs_width, thumbs_height, opt);
      }
      result[0] = t;
    }

    else if(cnt == 2) switch(orients){
      case 'ww':
        if (avg_ratio > 1.4 * max_ratio && (ratios[1] - ratios[0]) < 0.2) {
          var w = max_w;
          var h = Math.min(w / ratios[0], w / ratios[1], (max_h - margin_h) / 2.0);
          result[0] = compute(thumbs[0], w, h, { lastColumn: 1 });
          result[1] = compute(thumbs[1], w, h, { lastColumn: 1, lastRow: 1 });

          thumbs_width = max_w;
          thumbs_height = 2 * h + margin_h;
          break;
        }
      case 'vv':
      case 'qv':
      case 'vq':
      case 'qq':
        w = (max_w - margin_w) / 2;
        h = Math.min(w / ratios[0], w / ratios[1], max_h);
        result[0] = compute(thumbs[0], w, h, {lastRow: 1});
        result[1] = compute(thumbs[1], w, h, {lastRow: 1, lastColumn: 1});

        thumbs_width = max_w;
        thumbs_height = h;
        break;
      default:
        var w0 = intval((max_w - margin_w) / ratios[1] / (1 / ratios[0] + 1 / ratios[1]));
        var w1 = max_w - w0 - margin_w;
        var h = Math.min(max_h, w0 / ratios[0], w1 / ratios[1]);
        result[0] = compute(thumbs[0], w0, h, {lastRow: 1});
        result[1] = compute(thumbs[1], w1, h, {lastColumn: 1, lastRow: 1});

        thumbs_width = max_w;
        thumbs_height = h;
    } else if(cnt == 3){
      if ((ratios[0] > 1.2 * max_ratio || avg_ratio > 1.5 * max_ratio) && orients == 'www') {
        var w = max_w;
        var h_cover = Math.min(w / ratios[0], (max_h - margin_h) * 0.66);
        result[0] = compute(thumbs[0], w, h_cover, {lastColumn: 1});
        if (orients == 'www') {
          var w = intval(max_w - margin_w) / 2;
          var h = Math.min(max_h - h_cover - margin_h, w / ratios[1], w / ratios[2]);
          result[1] = compute(thumbs[1], w, h, {lastRow: 1});
          result[2] = compute(thumbs[2], max_w - w - margin_w, h, {lastColumn: 1, lastRow: 1});
        } else {
          var w0 = intval(((max_w - margin_w) / ratios[2]) / (1 / ratios[1] + 1 / ratios[2]));
          var w1 = max_w - w0 - margin_w;
          var h = Math.min(max_h - h_cover - margin_h, w0 / ratios[2], w1 / ratios[1]);

          result[1] = compute(thumbs[1], w0, h, {lastRow: 1});
          result[2] = compute(thumbs[2], w0, h, {lastRow: 1, lastColumn: 1});
        }
        thumbs_width = max_w;
        thumbs_height = h_cover + h + margin_h;
      } else {
        var h = max_h;
        var w_cover = intval(Math.min(h * ratios[0], (max_w - margin_w) * 0.75));
        result[0] = compute(thumbs[0], w_cover, h, {lastRow: 1});

        var h1 = ratios[1] * (max_h - margin_h) / (ratios[2] + ratios[1]);
        var h0 = max_h - h1 - margin_h;
        var w = Math.min(max_w - w_cover - margin_w, intval(h1 * ratios[2]), intval(h0 * ratios[1]));

        result[1] = compute(thumbs[1], w, h0, {lastColumn: 1});
        result[2] = compute(thumbs[2], w, h1, {lastColumn: 1, lastRow: 1});

        var thumbs_width = w_cover + w + margin_w;
        var thumbs_height = max_h;
      }
    } else if(cnt == 4){
      if ((ratios[0] > 1.2 * max_ratio || avg_ratio > 1.5 * max_ratio) && orients == 'wwww') {
        var w = max_w;
        var h_cover = Math.min(w / ratios[0], (max_h - margin_h) * 0.66);
        result[0] = compute(thumbs[0], w, h_cover, {lastColumn: 1});

        var h = (max_w - 2 * margin_w) / (ratios[1] + ratios[2] + ratios[3]);
        var w0 = intval(h * ratios[1]);
        var w1 = intval(h * ratios[2]);
        var w2 = w - w0 - w1 -  (2 * margin_w);
        var h = Math.min(max_h - h_cover - margin_h, h);

        result[1] = compute(thumbs[1], w0, h, {lastRow: 1});
        result[2] = compute(thumbs[2], w1, h, {lastRow: 1});
        result[3] = compute(thumbs[3], w2, h, {lastColumn: 1, lastRow: 1});

        thumbs_width = max_w;
        thumbs_height = h_cover + h + margin_h;
      } else {
        var h = max_h;
        var w_cover = Math.min(h * ratios[0], (max_w - margin_w) * 0.66);
        result[0] = compute(thumbs[0], w_cover, h, {lastRow: 1});

        var w = (max_h - 2 * margin_h) / (1 / ratios[1] + 1 / ratios[2] + 1 / ratios[3]);
        var h0 = intval(w / ratios[1]);
        var h1 = intval(w / ratios[2]);
        var h2 = h - h0 - h1 - (2 * margin_h);
        var w = Math.min(max_w - w_cover - margin_w, w);

        result[1] = compute(thumbs[1], w, h0, {lastColumn: 1});
        result[2] = compute(thumbs[2], w, h1, {lastColumn: 1});
        result[3] = compute(thumbs[3], w, h2, {lastColumn: 1, lastRow: 1});

        thumbs_width = w_cover + w + margin_w;
        thumbs_height = max_h;
      }
    } else {
      var ratios_cropped = [], i = 0;;
      if(avg_ratio > (videoIndexes.length ? 1.3 : 1.1)) {
        each(ratios, function(k, ratio){
          ratios_cropped[ratios_cropped.length] = Math.max(1.0, ratio);
        })
      } else {
        each(ratios, function(k, ratio){
          if (indexOf(videoIndexes, i) != -1) {
            ratios_cropped[ratios_cropped.length] = ratio;
          } else {
            ratios_cropped[ratios_cropped.length] = Math.min(1.0, ratio);
          }
          i++;
        });
      }

      var tries = {};

      var first_line, second_line, third_line;
      tries[(first_line = cnt) + ''] = [ multiThumbsHeight(ratios_cropped, max_w, margin_w) ];

      for(first_line = 1; first_line <= cnt - 1; first_line++){
        tries[first_line + ',' + (secont_line = cnt - first_line)] = [
          multiThumbsHeight(ratios_cropped.slice(0, first_line), max_w, margin_w),
          multiThumbsHeight(ratios_cropped.slice(first_line), max_w, margin_w)
        ];
      }

      for(first_line = 1; first_line <= cnt - 2; first_line++){
        for(second_line = 1; second_line <= cnt - first_line - 1; second_line++){
          tries[first_line + ',' + second_line + ',' + (third_line = cnt - first_line - second_line)] = [
            multiThumbsHeight(ratios_cropped.slice(0, first_line), max_w, margin_w),
            multiThumbsHeight(ratios_cropped.slice(first_line, first_line + second_line), max_w, margin_w),
            multiThumbsHeight(ratios_cropped.slice(first_line + second_line), max_w, margin_w)
          ];
        }
      }

      var opt_conf = null;
      var opt_diff = 0;
      var opt_height = 0;
      var opt_h;
      for(var conf in tries){
        var heights = tries[conf];
        var conf_h = sum(heights) + margin_h * (heights.length - 1);
        var conf_diff = Math.abs(conf_h - max_h);

        if(conf.indexOf(',') != -1){
          var conf_nums = conf.split(',');
          for(var i = 0; i<conf_nums.length; i++) conf_nums[i] = intval(conf_nums[i]);
          if (conf_nums[0] > conf_nums[1] || conf_nums[2] && conf_nums[1] > conf_nums[2]) {
            conf_diff += 50;
            conf_diff *= 1.5;
          }
        }
        if (opt_conf == null || conf_diff < opt_diff) {
          opt_conf = conf;
          opt_diff = conf_diff;
          opt_h = conf_h;
        }
      }

      var thumbs_remain = clone(thumbs);
      var ratios_remain = clone(ratios_cropped);
      var chunks = opt_conf.split(',');
      var opt_heights = tries[opt_conf];
      var last_row = chunks.length - 1;

      for(var i = 0; i<chunks.length; i++){
        var line_chunks_num = parseInt(chunks[i]);
        var line_thumbs = thumbs_remain.splice(0, line_chunks_num);
        var line_height = opt_heights.shift();
        var last_column = line_thumbs.length - 1;
        var opts = {};
        if (last_row == i) {
          opts.lastRow = true;
        }
        var width_remains = max_w;
        for(var j = 0; j<line_thumbs.length; j++){
          var thumb = line_thumbs[j];
          var thumb_ratio = ratios_remain.shift();
          var thumb_opts = opts;
          if(last_column == j){
            thumb_width = Math.ceil(width_remains);
            thumb_opts.lastColumn = true;
          } else {
            thumb_width = intval(thumb_ratio * line_height);
            width_remains -= thumb_width + margin_w;
          }
          result[result.length] = compute(thumb, thumb_width, line_height, thumb_opts);
        }
      }

      thumbs_width = max_w;
      thumbs_height = opt_h;
    }
    return {width: intval(thumbs_width), height: intval(thumbs_height), thumbs: result};
  }
}

try {stManager.done('thumbs_edit.js');}catch(e){}
