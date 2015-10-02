var Places = {

initPhotoMap: function(opts) {
  var map, isMapbox, isGoogle, CustomMarker, createMarker;
  if (!cur.iconLastNum) {
    cur.iconLastNum = 0;
  }
  if (opts.provider == 'mapbox') {
    cur.provider = 'mapbox';
    cur.providerId = 3;
    isMapbox = 1;
    if (!window.L || !window.L.mapbox) {
      var stat = ['mapbox.css', 'mapbox.js'];
      if (browser.msie && browser.version < 8) {
        stat.push('mapbox_ie.css');
      }
      stManager.add(stat, function() {
        Places.initPhotoMap(opts);
      });
      return false;
    }
  } else if (opts.provider == 'yandex2') {
    if (!window.yandexMapsInited) {
      window.yandexMapInit = function() {
        ymaps.modules.require(['package.standard'], function (Map, Placemark) {
          window.yandexMapsInited = true;
          Places.initPhotoMap(opts);
        });
      }
      var langCode = 'en_US';
      if (opts.countryCode == 'UA') {
        langCode = (cur.vkLngCode == 'uk' ? 'uk' : 'ru') + '_UA';
      } else if (cur.vkLngCode == 'ru') {
        langCode = 'ru_RU';
      }
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: (window.locProtocol || 'http:') + '//api-maps.yandex.ru/2.1/?lang='+langCode+'&onload=yandexMapInit&load=package.standard'
      }));
      return false;
    }
  }
  cur.photoMapOpts = opts;

  function unexpandPoint(point, sub) {
    if (!point.expanded) {
      return false;
    }
    if (!sub) {
      if (isMapbox) {
        map.addLayer(point.overlay);
      } else {
        point.overlay.setMap(map);
      }
    }
    point.expanded = false;
    var p = point.points;
    if (p) {
      for (i in p) {
        var subPoint = p[i];
        if (subPoint.overlay) {
          if (isMapbox) {
            map.removeLayer(subPoint.overlay);
          } else {
            subPoint.overlay.setMap(null);
          }
          unexpandPoint(subPoint, true)
        }
      }
    }
  }

  function expandPoint(point, possive) {
    if (point.diff && point.diff < 0.00002) {
      return false;
    }
    if (point.diff && point.diff <= (point.count + 1) * 0.000001) {
      return false;
    }
    var p = point.points;
    if (p) {
      if (point.expanded || possive) {
        return false;
      }
      var len = p.length;
      while (len--) {
        var subPoint = p[len];
        if (subPoint.overlay) {
          if (isMapbox) {
            map.addLayer(subPoint.overlay);
          } else {
            subPoint.overlay.setMap(map);
          }
        } else {
          if (isMapbox) {
            var pt = new L.LatLng(subPoint.lat, subPoint.lng);
            subPoint.overlay = createMarker(pt, map, subPoint.src, subPoint.count, subPoint.diff);
            subPoint.overlay.on('click', (pointClick).pbind(subPoint));
          } else {
            subPoint.overlay = new CustomMarker([subPoint.lat, subPoint.lng], map, subPoint.src, subPoint.count, subPoint.diff, (function(subPoint) {
              pointClick(subPoint);
            }).pbind(subPoint));
          }
        }
      }
      if (isMapbox) {
        map.removeLayer(point.overlay);
      } else {
        point.overlay.setMap(null);
      }
      point.expanded = true;
    } else if (!point.loading) {
      point.loading = true;
      ajax.post('al_places.php', {
        act: 'a_get_points',
        diff: point.diff || opts.diffZone,
        lat: point.lat,
        lng: point.lng,
        uid: opts.uid
      }, {
        onDone: function(points) {
          point.points = points;
          expandPoint(point, possive);
        },
        onFail: function() {
          point.loading = false;
        }
      })
    }
  }

  function checkPointsReq(points, mapBounds) {
    if (!points) {
      return false;
    }
    for (i in points) {
      var point = points[i];
      if (point.count <= 1) {
        continue;
      }
      var diff = (point.diff * 15) || opts.diffZone;
      var inside = (point.lat + diff > mapBounds.neLat && point.lat - diff < mapBounds.swLat && point.lng + diff > mapBounds.neLng && point.lng - diff < mapBounds.swLng);

      if (!inside) {
        if (point.expanded) {
          unexpandPoint(point);
        }
        continue;
      }
      if (point.expanded) {
        checkPointsReq(point.points, mapBounds);
      } else if (inside) {
        expandPoint(point);
      } else if (point.expanded) {
        unexpandPoint(point);
      }
    }
  }

  function updateMapPoints() {
    checkPointsReq(opts.points, getMapBounds());
  }

  function zoomToPoint(point) {
    var mapBounds = map.getBounds();
    if (isMapbox) {
      var ne = mapBounds.getNorthEast();
      var sw = mapBounds.getSouthWest();
      mapBounds = [[ne.lat, ne.lng], [sw.lat, sw.lng]];
    }
    var zoom =  map.getZoom();
    if (point.diff) {
      var needZoom = ((mapBounds[0][0] - mapBounds[1][0]) * 0.9) > point.diff * 2;
    } else {
      var needZoom = zoom < 17;
    }
    if (needZoom) {
      map.setZoom(zoom + 1)
      //zoomToPoint(point);
      setTimeout(zoomToPoint.pbind(point), 0)
    } else {
      updateMapPoints();
    }
  }

  function pointClick(point) {
    if (!opts.box) {
      showBox('al_places.php', {
        act: 'photos_box',
        lat: point.lat,
        lng: point.lng,
        diff: opts.diffZone,
        uid: opts.uid
      }, {
        stat: ['maps.js', 'places.js', 'places.css', 'ui_controls.js', 'ui_controls.css']
      });
      return false;
    }

    var photo = point.photo.split('_');
    if (point.overlay) {
      var elCont = ge('profile_map_icon_'+point.overlay.iconNum);
      var el = geByClass1('profile_map_first', elCont) || elCont;
      var cnt = geByClass1('profile_map_photo_count', el);
      if (cnt) {
        hide(cnt);
      }
      re('profile_map_photo_loader');
      var loader = ce('div', {id: 'profile_map_photo_loader'});
      el.appendChild(loader);
    }
    var diff = (point.diff || 0.000001);
    var list = 'map'+opts.uid+'_'+(point.lat - diff)+'_'+(point.lng - diff)+'_'+(point.lat + diff)+'_'+(point.lng + diff);
    return opts.showPlacePhoto(point.photo, list, {});
  }

  function getMapBounds() {
    var mapBounds = map.getBounds();
    var zoom = map.getZoom();
    if (zoom < 3) {
      var res = {
        swLat: -90,
        swLng: -90,
        neLat: 90,
        neLng: 90
      };
    } else {
      if (isMapbox) {
        var ne = mapBounds.getNorthEast();
        var sw = mapBounds.getSouthWest();
        var res = {
          swLat: sw.lat,
          swLng: sw.lng,
          neLat: ne.lat,
          neLng: ne.lng
        };
      } else {
        var res = {
          swLat: mapBounds[0][0],
          swLng: mapBounds[0][1],
          neLat: mapBounds[1][0],
          neLng: mapBounds[1][1]
        };
      }
    }
    return res;
  }

  function updatePhotosList() {
    var mapBounds = getMapBounds();
    ajax.post('al_places.php', {
      act: 'update_photos_list',
      uid: opts.uid,
      sw_lat: mapBounds.swLat,
      sw_lng: mapBounds.swLng,
      ne_lat: mapBounds.neLat,
      ne_lng: mapBounds.neLng
    }, {
      onDone: function(html) {
        ge('place_map_other').innerHTML = html;
      }
    })
    checkPointsReq(opts.points, mapBounds);
  }

  function setMapOpts(map) {
    if (opts.box) {
      cur.placeBoxMap = map;
      cur.placeBoxOpts = opts;
    } else {
      cur.placesPhotoMap = map;
      cur.placesPhotoOpts = opts;
    }
  }

  function onBoundsChanged(fast) {
    if (cur.editPhotosPlace) {
      fadeOut(ge('places_photo_hint_cont'), 200);
    }
    if (cur.mapMoveTimeout) {
      clearTimeout(cur.mapMoveTimeout);
    }
    cur.mapMoveTimeout = setTimeout(updateMapPoints, fast ? 0 : 200)
    if (firstTimeout) {
      firstTimeout = false;
      return false;
    }
    if (opts.box) {
      if (cur.mapMoveServerTimeout) {
        clearTimeout(cur.mapMoveServerTimeout);
      }
      cur.mapMoveServerTimeout = setTimeout(updatePhotosList, 500)
    }
  }

  function getIconHtml(imgSrc, cnt, diff, iconNum, addClass) {
    var html = '';
    if (cnt > 1 && diff) {
      html = '<span class="profile_map_photo_count">'+(cnt > 99 ? '99+' : cnt)+'</span>';
    }
    var len = Math.min(cnt - 1, 3);
    html = '<div'+(len ? '' : ' id="profile_map_icon_'+iconNum+'"')+' class="profile_map_photo profile_map_first" style="background: url('+imgSrc+') center center no-repeat;'+(len ? ' margin-left: -2px; margin-top: -4px;' : '')+'">'+html+'</div>';
    while(len--) {
      html = '<div'+(len ? '' : ' id="profile_map_icon_'+iconNum+'"')+' class="profile_map_photo"'+(len ? ' style="margin-left: -2px; margin-top: -4px;"' : '')+'>'+html+'</div>';
    }
    return html;
  }

  cur.editPhotosPlace = false;

  var firstTimeout = true;
  if (isMapbox) {
    createMarker = function(latlng, addToMap, src, count, diff) {
      var icon = new L.HtmlIcon({
         html: getIconHtml(src, count, diff, cur.iconLastNum)
      });
      cur.icon = icon;
      var m = new L.Marker(latlng, {
        draggable: false,
        icon: icon
      });
      if (addToMap) {
        map.addLayer(m);
      } else {
        map.removeLayer(m);
      }
      m.iconNum = cur.iconLastNum++;
      return m;
    }
    var mapboxApiId = 'vkmaps.map-an1xcr4f';
    var mapboxApiId_2x = 'vkmaps.map-40lc3e3w';
    if (opts.map) {
      map = opts.map;
    } else {
      map = L.mapbox.map(opts.cont, false, {zoomControl: false, scrollWheelZoom: false, touchZoom: false});
      L.mapbox.tileLayer(mapboxApiId,{
        detectRetina: true,
        retinaVersion: mapboxApiId_2x
      }).addTo(map);

    }
    setMapOpts(map);

    if (opts.bounds) {
      map.fitBounds([[opts.bounds.swlat, opts.bounds.swlng], [opts.bounds.nelat, opts.bounds.nelng]]);
    } else {
      if (!opts.lat && !opts.lng) {
        opts.lat = 30;
      }
      map.setView([opts.lat, opts.lng], 1)
    }
    if (!opts.nowheel) {
      map.on('moveend', onBoundsChanged.pbind(true));
      map.on('zoomend', onBoundsChanged.pbind(true));
    }

    if (opts.points) {
      var len = opts.points.length;
      while(len--) {
        var point = opts.points[len];
        var p = new L.LatLng(point.lat, point.lng);
        point.overlay = createMarker(p, point.points ? false : true, point.src, point.count, point.diff);
        point.overlay.on('click', (pointClick).pbind(point));
        if (point.points) {
          expandPoint(point);
        }
      }
    }

    map.on('click', (function(point) {
      if (!opts.box) {
        Places.showProfileBox(opts.uid);
      }
    }).bind(this));
  } else {
    CustomMarker = function(latlng, map, src, count, diff, clickHandler) {
      this.latlng = latlng;
      this.photoSrc = src;
      this.photoCount = count;
      this.photoDiff = diff;

      var markerHtml = getIconHtml(this.photoSrc, this.photoCount, this.photoDiff, cur.iconLastNum);
      this.iconNum = cur.iconLastNum++;

      var p = new ymaps.Placemark(latlng, {
          iconContent: markerHtml
      }, {
          preset: "islands#circleIcon",
          iconColor: '#FFFFFF'
      });
      if (clickHandler) {
        p.events.add('click', clickHandler);
      }

      this.p = p;

      //map.geoObjects.add(p);
      this.setMap(map);
    }

    CustomMarker.prototype.remove = function() {
      if (this.photoDiv) {
        this.photoDiv.parentNode.removeChild(this.photoDiv);
        this.photoDiv = null;
      }
    };

    CustomMarker.prototype.getPosition = function() {
     return this.latlng;
    };

    CustomMarker.prototype.setMap = function(m) {
      if (m) {
        m.geoObjects.add(this.p);
        this.map = m;
      } else if (this.map){
        this.map.geoObjects.remove(this.p);
        this.map = null;
      }
    };


    var mapOpts = {
      center: [opts.lat, opts.lng],
      controls: []
    }
    if (opts.nowheel) {
      mapOpts.scrollwheel = false;
      mapOpts.disableDoubleClickZoom = true;
    }
    if (opts.map) {
      map = opts.map;
    } else {
      map = new ymaps.Map(opts.cont, mapOpts, {suppressMapOpenBlock: true, suppressObsoleteBrowserNotifier: true});
    }
    setMapOpts(map);

    if (opts.bounds) {
      cur.a = map;
      map.setBounds([[opts.bounds.swlat, opts.bounds.swlng], [opts.bounds.nelat, opts.bounds.nelng]]);
    } else {
      if (!opts.lat && !opts.lng) {
        opts.lat = 30;
      }
      map.setCenter([opts.lat, opts.lng], 1);
    }

    if (opts.nowheel) {
      map.behaviors.disable('drag');
      map.behaviors.disable('scrollZoom');
    } else {
      map.events.add('boundschange', onBoundsChanged.pbind(false));
    }

    if (opts.points) {
      var len = opts.points.length;
      while(len--) {
        var point = opts.points[len];
        point.overlay = new CustomMarker([point.lat, point.lng], point.points ? null : map, point.src, point.count, point.diff, (function(point) {
          if (opts.box) {
            pointClick(point);
          } else {
            Places.showProfileBox(opts.uid);
          }
        }).pbind(point));
      }
    }

    map.events.add('click', (function(point) {
      if (!opts.box) {
        Places.showProfileBox(opts.uid);
      }
    }).bind(this));
  }
},

showProfileBox: function(uid) {
  showBox('al_places.php', {
    act: 'photos_box',
    uid: uid
  }, {
    stat: ['maps.js', 'places.js', 'places.css', 'ui_controls.js', 'ui_controls.css']
  });
  return false;
},

setMarker: function(map, point) {
  cur.placeMarker = new vkMaps.Marker(point);
  cur.placeMarker.mousedown.addHandler(function() {
  });
  cur.placeMarker.dragend.addHandler(function(type, marker) {
    marker.update();
    Places.setPlaceStr(marker.location);
  });
  map.addMarkerWithData(cur.placeMarker, {
    draggable: true,
    icon: '/images/map/move.png',
    icon2x: '/images/map/move_2x.png',
    iconSize: [33, 32],
    iconAnchor: [16, 32],
    infoBubble: ''
  });
},

showMorePhotos: function(uid) {
  if (!cur.addPhotosOffset || cur.PlacesPhotosMoreBack) {
    return false;
  }
  var cont = ge('places_photo_more');
  cur.PlacesPhotosMoreBack = cont.innerHTML;
  ajax.post('al_places.php', {act: 'a_edit_photos', uid: uid, offset: cur.addPhotosOffset}, {
    onDone: function(html, offset, showmore) {
      cur.addPhotosOffset = offset;
      if (!showmore) {
        hide('places_photo_more');
      }
      var elsCont = ge('places_map_add_list');
      elsCont.appendChild(cf(html));
      cur.PlacesPhotosMoreBack = false;
    },
    showProgress: function() {
      cont.innerHTML = '<img src="/images/upload.gif">';
    },
    hideProgress: function() {
      cont.innerHTML = cur.PlacesPhotosMoreBack;
    }
  }, {stat: ['upload.js']})
},

addPhotos: function(obj, uid) {
  ajax.post('al_places.php', {act: 'a_edit_photos', uid: uid}, {
    onDone: function(html, js, offset) {
      hide('places_edit_step_0');
      show('places_edit_step_1');
      hide('places_edit_step_2');
      hide('places_edit_step_3');
      hide('place_map_cont');
      cur.addPhotosOffset = offset;
      cur.editPhotosPlace = true;
      cur.placesFixedBottom = false;
      var editCont = ge('place_map_edit');
      editCont.innerHTML = html;
      show(editCont);
      hide('place_map_other');

      /*var tt = ge('places_photo_hint_cont');
      if (tt) {
        fadeIn(tt, 100);
      } else {
        var mapCont = ge('place_map_cont');
        var tt = ce('div', {
          innerHTML: '<div class="places_photo_hint">'+getLang('places_select_position')+'</div><div id="places_photo_pointer"></div>',
          className: 'places_photo_hint_cont',
          id: 'places_photo_hint_cont'
        });
        mapCont.parentNode.insertBefore(tt, mapCont);
        var w = getSize(tt)[0];
        tt.style.marginLeft = intval((666 - w) / 2) + 'px';
        ge('places_photo_pointer').style.marginLeft = intval((w/2) - 10)+ 'px';
      }
      show('places_photos_save_panel');
      Places.setMarker(cur.vkmap.getCenter());*/
      cur.onPlaceScroll();
      if (js) {
        eval('(function() {'+js+'})();')
      }
    },
    showProgress: function() {
      lockButton(obj);
    },
    hideProgress: function() {
      unlockButton(obj);
    }
  })
},

step2: function() {
  hide('places_edit_step_0');
  show('places_edit_step_1');
  hide('places_edit_step_2');
  hide('places_edit_step_3');
  hide('place_map_cont');
  show('place_map_edit');
  hide('place_map_point');
  hide('place_map_other');
  cur.vkmap.removeMarker(cur.placeMarker);
},

cancelAdd: function() {
  cur.editPhotosPlace = false;
  show('places_edit_step_0');
  hide('places_edit_step_1');
  hide('places_edit_step_2');
  hide('places_edit_step_3');
  show('place_map_cont');
  hide('place_map_edit');
  hide('place_map_point');
  show('place_map_other');
  cur.vkmap.removeMarker(cur.placeMarker);
},

selectPhoto: function(pids, photoSrc, lat, lng) {
  cur.mapPids = pids;
  hide('places_edit_step_0');
  hide('places_edit_step_1');
  show('places_edit_step_2');
  hide('places_edit_step_3');
  hide('place_map_edit');
  show('place_map_point');
  var mapChoose = new vkMaps.VKMap('place_map_point_cont', {
    provider: cur.provider || 'google',
    providerId: cur.providerId || 2,
    lngcode: cur.vkLngCode,
  });
  cur.placesChooseMap = mapChoose;
  placeholderSetup(ge('place_map_point_search'), {back: true});
  var pCont = ge('place_map_point');
  var els = geByClass('places_map_preview', pCont);
  for (var i in els) {
    re(els[i]);
  }
  pCont.appendChild(ce('div', {
    innerHTML: '<div class="places_map_preview_cont"><img src="'+photoSrc+'" class="places_map_preview_img" align="center" /></div>',
    className: 'places_map_preview'
  }));

  mapChoose.addMapTypeControls();
  mapChoose.addControls({zoom: 'large', pan: false});
  if (!cur.lastSelectLat && !cur.lastSelectLng) {
    var lastPos = ls.get('last_map_pos');
    if (lastPos) {
      cur.lastSelectLat = lastPos[0];
      cur.lastSelectLng = lastPos[1];
      cur.lastSelectZoom = lastPos[2];
    }
  }

  var loc = cur.vkmap.getCenter();
  if (lat || lng) {
    var point = new vkMaps.LatLonPoint(lat, lng);
    mapChoose.setCenterAndZoom(point, 14);
    Places.setMarker(mapChoose, point);
    Places.setPlaceStr(point, true);
  } else {
    var point = new vkMaps.LatLonPoint(cur.lastSelectLat || loc.lat, cur.lastSelectLng || loc.lon);
    mapChoose.setCenterAndZoom(point, cur.lastSelectZoom || cur.vkmap.getZoom());
  }

  mapChoose.click.addHandler((function(eventType, map, place) {
    mapChoose.removeMarker(cur.placeMarker);
    Places.setMarker(mapChoose, place.location);
    Places.setPlaceStr(place.location);

      //fadeOut(ge('places_photo_hint_cont'), 200);
  }).bind(this));
},

setPlaceStr: function(loc, noRemember) {
  if (!noRemember) {
    cur.lastSelectLat = loc.lat;
    cur.lastSelectLng = loc.lon;
    cur.lastSelectZoom = Math.min(16, cur.placesChooseMap.getZoom());
    ls.set('last_map_pos', [cur.lastSelectLat, cur.lastSelectLng, cur.lastSelectZoom]);
  }
  vkMaps.load('yandex', function() {
    var geocoder = new vkMaps.Geocoder('yandex', function(place) {
      hide('places_edit_step_0');
      hide('places_edit_step_1');
      hide('places_edit_step_2');
      show('places_edit_step_3');
      cur.lastSelectedPlace = place;
      var placeInfo = [];

      if (place.place) {
        placeInfo.push(place.place);
      } else if (place.street) {
        placeInfo.push(place.street);
      } else if (place.region) {
        placeInfo.push(place.region);
      }
      if (place.locality) {
        placeInfo.push(place.locality);
      } else if (place.country) {
        placeInfo.push(place.country);
      }
      for (var i in placeInfo) {
        if (placeInfo[i].length > 26) {
          placeInfo[i] = placeInfo[i].substr(0, 24)+'..';
        }
      }
      var str = placeInfo.join(', ');
      ge('place_map_edit_add').innerHTML = getLang('places_add_to_point').replace('%s', str);
    });
    geocoder.geocode({lat: loc.lat, lon: loc.lon, language: cur.vkLngCode})
  });
},

searchPhotoPlace: function() {
  var str = val(ge('place_map_point_search'));

  vkMaps.load('yandex', function() {
    var geocoder = new vkMaps.Geocoder('yandex', function(place) {
      cur.placesChooseMap.setBounds(place.bounds)
      cur.placesChooseMap.removeMarker(cur.placeMarker);
      Places.setPlaceStr(place.point);
      Places.setMarker(cur.placesChooseMap, place.point);
    }, function() {
      notaBene('place_map_point_search');
    });
    geocoder.geocode({address: str, language: cur.vkLngCode})
  });
},

onEditScroll: function(resize) {
  var y = boxLayerWrap.scrollTop;
  var panel = ge('places_photos_save_buttons');
  if (!panel) return;
  var py = getXY(ge('places_photos_save_panel'), true)[1];
  if (!cur.boxPhotosBottomSize) {
    cur.boxPhotosBottomSize = getSize(panel);
  }

  var ph = cur.boxPhotosBottomSize[1];

  var wndHeight = window.innerHeight || document.documentElement.clientHeight;

  if (resize && !cur.placesFixedBottom && wndHeight - ph < py + 20) {
    boxLayerWrap.scrollTop += py + 20 - (wndHeight - ph);
  } else if (wndHeight - ph < py) {
    if (!cur.placesFixedBottom || resize) {
      cur.placesFixedBottom = true;
      setStyle(panel, {
        position: 'fixed',
        top: (wndHeight - ph) + 'px'
      });
      addClass(panel, 'places_panel_fixed');
    }
  } else {
    if (cur.placesFixedBottom || resize) {
      cur.placesFixedBottom = false;
      setStyle(panel, {
        position: 'static',
        top: '0px'
      });
      removeClass(panel, 'places_panel_fixed');
    }
  }

  if (resize && cur.placesFixedBottom) {
    setStyle(panel, {left: (getXY(curBox().bodyNode)[0] + 1)+'px'})
  }
},

savePhotos: function(btn, hash) {
  var loc = cur.placeMarker.location;
  var params = {act: 'save_photos_places', pids: cur.mapPids, lat: loc.lat, lng: loc.lon, hash: hash};
  if (cur.lastSelectedPlace) {
    var place = cur.lastSelectedPlace;
    extend(params, {
      geo_country: place.country,
      geo_locality: place.locality,
      geo_region: place.region,
      geo_street: place.street,
      geo_place: place.place,
      geo_lang: cur.vkLngCode,
      geo_code: place.countryCode
    });
  }
  ajax.post('al_places.php', params, {
    onDone: function() {
      //Places.cancelAdd();
      Places.updateBox();
    },
    showProgress: function() {
      lockButton(btn);
    },
    hideProgress: function() {
      unlockButton(btn);
    }
  })
},

updateBox: function() {
  var box = curBox();
  box.hide();
  showBox('al_places.php', {
    act: 'photos_box',
    add_more: '1',
    lat: cur.placeBoxOpts.lat,
    lng: cur.placeBoxOpts.lng,
    diff: cur.placeBoxOpts.diffZone,
    uid: cur.placeBoxOpts.uid
  });
},

checkHtml5Uploader: function() {
  return (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary ||  window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
},

uploadPhotos: function(obj, ev) {
  if (ev && (ev.button == 2 || ev.ctrlKey)) {
    if (photos.checkHtml5Uploader()) {
      obj.href += '&html5=1';
    }
    return true;
  }
  if (cur.uplId !== undefined && window.Upload && Upload.checked && Upload.checked[cur.uplId] && Places.checkHtml5Uploader()) {
    ge('photos_upload_input').click();
    return false;
  }
  return true;
},

onPhotoUploadStart: function(info, res) {
  var label = ge('places_photo_upload_area_label');
  setStyle(label, {background: 'none', paddingLeft: '0px'});
  label.innerHTML = '<div id="places_ph_add_progress"><div id="places_add_p_line"><div id="places_add_p_inner"></div></div><div id="places_add_p_str"></div></div>';
  if (info.num === undefined) {
    info = res;
  }
  if (info.totalCount > 1) {
    ge('places_add_p_str').innerHTML = langNumeric(info.num ? info.num + 1 : 1, cur.lang['photos_add_uploading_num_X']).replace('{count}', info.totalCount);
  } else {
    ge('places_add_p_str').innerHTML = getLang('photos_add_uploading');
  }
},

onPhotoUploadProgress: function(ind, upl, need) {
  var inner = ge('places_add_p_inner');
  var w = (upl / need) * 175;
  var oldWidth = intval(inner.style.width);
  if (ind.totalCount > 1) {
    ge('places_add_p_str').innerHTML = langNumeric(ind.num + 1, cur.lang['photos_add_uploading_num_X']).replace('{count}', ind.totalCount);
  }
  if (w > oldWidth) {
    animate(inner, {width: w}, 200);
  }
},

onPhotoUploadComplete: function(info, res) {
  var params, i = info.ind !== undefined ? info.ind : info;
  try {
    params = eval('(' + res + ')');
  } catch(e) {
    params = q2ajx(res);
  }
  cur.savedPhotos = cur.savedPhotos || {mid: params.mid, gid: params.gid, aid: params.aid, server: params.server};
  cur.savedPhotos.photos = cur.savedPhotos.photos || [];
  cur.savedPhotos.photos.push({photo: params.photos, hash: params.hash});
  return;
},

onPhotoUploadCompleteAll: function(info) {
  var query = {act: 'done_add', context: 1, from: 'profile_map'}, k = 1;

  if (!cur.savedPhotos.photos) {
    return;
  }
  for (var j in (cur.savedPhotos.photos || [])) {
    query['photo'+k] = cur.savedPhotos.photos[j].photo;
    query['hash'+k] = cur.savedPhotos.photos[j].hash;
    k++;
  }
  delete cur.savedPhotos.photos;
  query = extend(query, cur.savedPhotos);
  ajax.post('/al_photos.php', query, {
    onDone: function(photos, hash, oid, photoPreview) {
      Places.selectPhoto(photos, photoPreview);
    },
    onFail: function(text) {
      setTimeout(showFastBox(getLang('global_error'), text).hide, __debugMode ? 30000 : 3000);
    }
  })
},

showPlaceTT: function(obj, text) {
  showTooltip(obj, {black: 1, text: text, center:1, shift:[0, 4, 0]});
},

showPhotoPlace: function(lat, lng) {
  var map = cur.placeBoxMap;
  map.setCenter([lat, lng], 16);
  animate(boxLayerWrap, {scrollTop: 0}, 200);
}

}

try{stManager.done('places.js');}catch(e){}
