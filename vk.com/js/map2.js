function VkMap(elem, options) {

  var defaultOptions = {
    isPreview: false,
    onUpdateMapAddress: null,
    onClickPreview: null,
    type: 'yandex', // yandex or google
    logPrefix: null,
    onReady: null
  };

  this.elem = elem;
  this.options = extend(defaultOptions, options);

  if (this.options.logPrefix == null) {
    this.options.logPrefix = (this.options.isPreview ? '[preview] ' : '[box] ');
  }

  //debugLog(this.options.logPrefix + 'function VkMap');

  this.defaultAddress = {
    country: '',
    city: '',
    district: '',
    station: '',
    street: '',
    house: '',

    str: '',
    zoom: null,

    strCalculated: '',
    zoomCalculated: '',
    strShow: '',

    isDefault: true
  };

  this.points = [];
  this.pointsHash = '';

  this.restoreDefaultAddress();

  this.pendingUpdate = {
    address: false,
    zoom: false, // update only zoom
    points: false
  };

  this.yandex = {};
  this.google = {};

  this.API = null;

  var this_ = this;
  onDomReady(function() { this_.create(); });
};

VkMap.prototype.restoreDefaultAddress = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.restoreDefaultAddress');

  if (!this.address) {
    this.address = {};
  }

  this.address.country        = this.defaultAddress.country;
  this.address.city           = this.defaultAddress.city;
  this.address.district       = this.defaultAddress.district;
  this.address.station        = this.defaultAddress.station;
  this.address.street         = this.defaultAddress.street;
  this.address.house          = this.defaultAddress.house;

  this.address.str            = this.defaultAddress.str;
  this.address.zoom           = this.defaultAddress.zoom;

  this.address.strCalculated  = this.defaultAddress.strCalculated;
  this.address.zoomCalculated = this.defaultAddress.zoomCalculated;
  this.address.strShow        = this.defaultAddress.strShow;

  this.address.isDefault = this.defaultAddress.isDefault;
}

VkMap.prototype.updateAddress = function(address) {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.updateAddress');

  if (!address || (!address.str && !address.country)) {
    if (!this.address.isDefault) {
      this.restoreDefaultAddress();
      this.pendingUpdate.address = true;
    }
    return;
  }

  this.address.isDefault = false;
  this.address.strCalculated  = '';
  this.address.zoomCalculated = '';
  this.address.strShow        = '';

  if (address.zoom) {
    if (address.zoom != this.address.zoom) {
      this.address.zoom = address.zoom;
      this.pendingUpdate.zoom = true;
    }
  } else {
    this.address.zoom = this.defaultAddress.zoom;
  }

  if (address.str) {
    this.address.country  = '';
    this.address.city     = '';
    this.address.district = '';
    this.address.station  = '';
    this.address.street   = '';
    this.address.house    = '';

    if (address.str != this.address.str) {
      this.address.str = address.str;
      this.pendingUpdate.address = true;
    }

    return;
  }

  if (address.country != this.address.country) {
    this.pendingUpdate.address = true;
  }

  if ((!address.city && this.address.city)
      || (!address.district && this.address.district)
      || (!address.station && this.address.station)
      || (!address.street && this.address.street)
      || (!address.house && this.address.house)) {
    this.pendingUpdate.address = true;
  }

  if (address.city) {
    if ((address.city == this.address.city)) {
      if (address.district && (address.district != this.address.district)) {
        this.pendingUpdate.address = true;
      }
      if (address.station && (address.station != this.address.station)) {
        this.pendingUpdate.address = true;
      }
      if (address.street) {
        if (address.street == this.address.street) {
          if (address.house && (address.house != this.address.house)) {
            this.pendingUpdate.address = true;
          }
        } else {
          this.pendingUpdate.address = true;
        }
      }
    } else {
      this.pendingUpdate.address = true;
    }
  }

  this.address.country  = address.country;
  this.address.city     = (address.city     ? address.city : '');
  this.address.district = (address.district ? address.district : '');
  this.address.station  = (address.station  ? address.station : '');
  this.address.street   = (address.street   ? address.street : '');
  this.address.house    = (address.house    ? address.house : '');
}

VkMap.prototype.getShowAddress = function() {
  this.calculateAddress();
  return this.address.strShow;
}

VkMap.prototype.updatePoints = function(points) {

  if (!points || this.options.isPreview) {
    return;
  }

  var str = '';
  for (var i_point in points) {
    str += points[i_point].name + points[i_point].address;
  }
  var length = str.length;

  if (this.pointsLength == length) {
    return;
  }
  this.pointsLength = length;

  this.points = [];
  for (var i_point in points) {
    this.points.push({address: points[i_point].address, name: points[i_point].name});
  }

  this.pendingUpdate.points = true;
}

VkMap.prototype.create = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.create');

  if (this.API === null) {
    this.loadAPI();
    return;
  }

  if (this.options.type == 'yandex') {
    this.yandexCreate();
  } else {
    this.googleCreate();
  }

  this.updateMap();
  if (typeof this.options.onReady == 'function') {
    setTimeout(this.options.onReady, 0);
  }
}

VkMap.prototype.destroy = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.destroy');

  if (this.options.type == 'yandex') {
    this.yandexDestroy();
  } else {
    this.googleDestroy();
  }
}

VkMap.prototype.updateMap = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.updateMap');

  var isUpdatePending = false;
  for (var updateType in this.pendingUpdate) {
    //debugLog(this.options.logPrefix + 'VkMap.prototype.updateMap, ' + updateType + ', ' + this.pendingUpdate[updateType]);
    isUpdatePending = isUpdatePending || this.pendingUpdate[updateType];
  }

  if (!isUpdatePending) {
    return;
  }

  this.calculateAddress();

  if (this.options.type == 'yandex') {
    this.yandexUpdateMap();
  } else {
    this.googleUpdateMap();
  }
}

VkMap.prototype.redraw = function() {
  if (this.options.type == 'yandex') {
    this.yandexRedraw();
  } else {
    this.googleRedraw();
  }
}

// Private functions

VkMap.prototype.calculateAddress = function() {
  if (this.address.strShow) {
    return;
  }

  this.address.zoomCalculated = 1;
  this.address.strCalculated = '';
  this.address.strShow = '';

  if (this.address.country) {
    this.address.zoomCalculated = 3;
    this.address.strCalculated = this.address.country;
    this.address.strShow = this.address.country;
    if (this.address.city) {
      this.address.zoomCalculated = 8;
      this.address.strCalculated += ', ' + this.address.city;
      this.address.strShow = this.address.strCalculated;
      if (this.address.street) {
        this.address.strShow = this.address.city;
        this.address.zoomCalculated = 13;
        this.address.strCalculated += ', ' + this.address.street;
        this.address.strShow += ', ' + this.address.street;
        if (this.address.house) {
          this.address.zoomCalculated = 14;
          this.address.strCalculated += ' ' + this.address.house;
          this.address.strShow += ', ' + this.address.house;
        }
        if (this.address.district) {
          this.address.strCalculated += ', ' + this.address.district;
          this.address.strShow += ', ' + this.address.district;
        }
      } else {
        if (this.address.station) {
          this.address.zoomCalculated = 13;
          this.address.strCalculated += ', ' + this.address.station;
          this.address.strShow = this.address.city + ', ' + this.address.station;
        } else if (this.address.district) {
          this.address.zoomCalculated = 11;
          this.address.strCalculated += ', ' + this.address.district;
          this.address.strShow = this.address.city + ', ' + this.address.district;
        }
      }
    }

    if (!this.options.isPreview) {
      this.address.zoomCalculated += 1;
      if (this.address.zoomCalculated > 17) {
        this.address.zoomCalculated = 17;
      }
    }
  } else if (this.address.str) {
    this.address.strCalculated = this.address.str;
    this.address.strShow = this.address.strCalculated;
    if (this.address.zoom) {
      this.address.zoomCalculated = this.address.zoom;
    }
  }
}

VkMap.prototype.yandexCreate = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.yandexCreate');
  
  if (!this.options.key) {
    throw('YMaps API key not found');
  }

  if (this.yandex.map) {
    return;
  }

  this.yandex.map = new YMaps.Map(this.elem);

  if (this.options.isPreview) {
    this.yandex.map.disableDblClickZoom();
    this.yandex.map.disableDragging();
    this.yandex.map.disableHotKeys();
    this.yandex.map.disableMagnifier();
    this.yandex.map.disableRightButtonMagnifier();
    this.yandex.map.disableRuler();
    this.yandex.map.disableScrollZoom();

    // TODO: Not wirk in Opera. Fix it.
    this.yandex.map.addCursor(YMaps.Cursor.POINTER);
    if (this.options.onClickPreview) {
      YMaps.Events.observe(this.yandex.map, this.yandex.map.Events.Click, this.options.onClickPreview);
    }
  } else {
    this.yandex.map.addControl(new YMaps.Zoom());
    this.yandex.map.addControl(this.yandexGetTypeControl())
    this.yandex.map.enableScrollZoom();
  }

  YMaps.Events.observe(this.yandex.map, this.yandex.map.Events.Update, function () {
    if (!this.yandex.map) {
      return;
    }
    if (this.options.isPreview) {
      this.yandexRemoveCopyrightPart();
      this.yandexFixCopyrights();
    } else {
      if (!this.yandex.isSliderFixed) {
        this.yandexFixSliderFocus();
        this.yandex.isSliderFixed = true;
      }
    }
  }, this);
}

VkMap.prototype.yandexGetTypeControl = function() {
  var types = [[1, getLang('places_map_roadmap')], [2, getLang('places_map_satellite')], [3, getLang('places_map_hybrid')]];
  var width = 80;

  var map;

  function onChange(value) {
    if (!map) {
      return;
    }

    value = parseInt(value);
    switch (value) {
      case 2:
        map.setType(YMaps.MapType.SATELLITE);
        break;
      case 3:
        map.setType(YMaps.MapType.HYBRID);
        break;
      case 1:
      default:
        map.setType(YMaps.MapType.MAP);
        break;
    }
  }

  function onAddToMap(newMap, newPosition) {
    map = newMap;
    var position = newPosition || new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(10, 10));

    var container = YMaps.jQuery('<div></div>')
    container.css({
      position: "absolute",
      zIndex: YMaps.ZIndex.CONTROL,
      background: '#fff',
      padding: 0,
      margin: 0
    });
    position.apply(container);
    container.appendTo(map.getContainer());

    container2 = YMaps.jQuery('<input id="map_change_type_control"></input>')
    container2.css({ padding: 0, margin: 0 });
    container2.appendTo(container);

    new Dropdown(ge('map_change_type_control'), types, {
      width: width,
      onChange: onChange
    });

  };

  function onRemoveFromMap() {
  };

  return {
    onAddToMap: onAddToMap,
    onRemoveFromMap: onRemoveFromMap
  };
}

VkMap.prototype.googleGetTypeControl = function() {
  var
    types = [[1, getLang('places_map_roadmap')], [2, getLang('places_map_satellite')], [3, getLang('places_map_hybrid')]],
    width = 80,
    container = document.createElement('div'),
    input = document.createElement('input'),
    map;
  
  function onChange(value) {
    if (!map) {
      return;
    }
    
    value = parseInt(value);
    switch (value) {
      case 2:
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;
      case 3:
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        break;
      case 1:
      default:
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        break;
    }
  }


  map = this.google.map;
  setStyle(container, {
    position: 'absolute',
    zIndex: 10000,
    background: '#FFF',
    padding: 0,
    margin: 10
  });

  input.id = 'map_change_type_control';
  setStyle(input, {
    padding: 0,
    margin: 0
  });
  container.appendChild(input);

  new Dropdown(input, types, {
    width: width,
    onChange: onChange
  });

  return container;
}

VkMap.prototype.yandexRemoveCopyright = function() {
  var divs = this.elem.getElementsByTagName('div');
  var j = 0;
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'YMaps-copyrights') {
      divs[i].innerHTML = '';
      if (++j >= 2) break;
    } else if (divs[i].className == 'YMaps-logo') {
      divs[i].style.bottom = '5px';
      if (++j >= 2) break;
    }
  }
}

VkMap.prototype.yandexRemoveCopyrightPart = function() {
  var divs = this.elem.getElementsByTagName('div');
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'YMaps-copyrights') {
      var begin = divs[i].innerHTML.search(/<a/i);
      var end = divs[i].innerHTML.search(/<\/a>/i) + 4;
      divs[i].innerHTML = divs[i].innerHTML.substr(begin, end - begin);
      break;
    }
  }
}

VkMap.prototype.yandexFixCopyrights = function() {
  var divs = this.elem.getElementsByTagName('div');
  var copyrights;
  var logo;
  var j = 0;
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'YMaps-copyrights') {
      copyrights = divs[i];
      if (++j >= 2) break;
    } else if (divs[i].className == 'YMaps-logo') {
      logo = divs[i];
      if (++j >= 2) break;
    }
  }

  fixCopyrights(copyrights);
  fixCopyrights(logo);

  function fixCopyrights(elem) {
    if (!elem || !elem.style) {
      return;
    }
    elem.style.setProperty('z-index', '99', 'important');
    var children = elem.childNodes;
    for (var i = 0; i < children.length; i++) {
      fixCopyrights(children[i]);
    }
  }
}

VkMap.prototype.yandexFixSliderFocus = function() {
  var inputs = this.elem.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    var className = inputs[i].parentNode.className;
    if (className == 'YMaps-slider-grab') {
      inputs[i].setAttribute('onfocus', 'this.blur()');
      break;
    }
  }
}

VkMap.prototype.yandexDestroy = function() {
  if (!this.yandex.map) {
    return;
  }
  this.yandex.map.destructor();
  delete this.yandex.map;
}

VkMap.prototype.googleCreate = function() {  
  if (this.google.map) {
    return;
  }
  
  this.google.map = new google.maps.Map(this.elem, {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
   
  if (this.options.isPreview) {
    this.google.map.setOptions({
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      draggable: false,
      keyboardShortcuts: false,
      scrollwheel: false
    });
    if (this.options.onClickPreview) {
      google.maps.event.addListener(this.google.map, 'click', this.options.onClickPreview);   
    }
  } else {
    this.google.map.setOptions({
      mapTypeControl: false,
      navigationControl: true,
      scrollwheel: true
    });
    this.google.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.googleGetTypeControl());
  }
}

VkMap.prototype.googleDestroy = function() {
}

VkMap.prototype.yandexUpdateMap = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.yandexUpdateMap');

  if (!this.yandex.map) {
    return;
  }

  if (this.pendingUpdate.address) {
    this.yandexUpdateMapAddress();
  }
  if (this.pendingUpdate.points) {
    this.yandexUpdateMapPoints();
  }
}

VkMap.prototype.yandexUpdateMapAddress = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.yandexUpdateMapAddress');

  function setCenter() {
    // Always not
    if (false && this.yandex.mapUpdated) {
      this.yandex.map.setZoom(this.address.zoomCalculated, {smooth: false});
      var this_ = this;
      this.yandex.map.panTo(this.yandex.pointer.getGeoPoint(), {flying: true, callback: function() { finalUpdate.call(this_); }});
    } else {
      this.yandex.map.setCenter(this.yandex.pointer.getGeoPoint(), this.address.zoomCalculated);
      this.yandex.mapUpdated = true;
      finalUpdate.call(this, true);
    }
  }
  function finalUpdate(success) {
    //debugLog('finalUpdate, ' + success);
    if (success) {
      this.pendingUpdate.address = false;
      this.pendingUpdate.zoom = false;
      if (this.options.onUpdateMapAddress) {
        this.options.onUpdateMapAddress(!this.address.isDefault);
      }
    }
  }

  if (this.address.isDefault) {
    if (this.yandex.pointer) {
      this.yandex.map.removeOverlay(this.yandex.pointer);
      this.yandex.pointer = null;
    }
    this.yandex.map.setCenter(new YMaps.GeoPoint(1, 1), this.address.zoomCalculated);
    finalUpdate.call(this, true);
  } else {
    var geocoder = new YMaps.Geocoder(this.address.strCalculated, {results: 1});
    if (geocoder) {
      YMaps.Events.observe(geocoder, geocoder.Events.Load, function () {
        if (!this.yandex.map) {
          return;
        }
        if (geocoder.length()) {
          if (this.yandex.pointer) {
            this.yandex.map.removeOverlay(this.yandex.pointer);
            this.yandex.pointer = null;
          }
          this.yandex.pointer = this.yandexGetPointerMain(geocoder.get(0).getGeoPoint());
          this.yandex.pointer.description = this.address.strShow;
          this.yandex.map.addOverlay(this.yandex.pointer);
          setCenter.call(this);
        }
      }, this);
      YMaps.Events.observe(geocoder, geocoder.Events.Fault, function () {
        if (!this.yandex.map) {
          return;
        }
        finalUpdate.call(this);
      }, this);
    } else {
      finalUpdate.call(this);
    }
  }
}

VkMap.prototype.googleUpdateMapAddress = function() {
  function setCenter() {
    console.log('setCenter');
    if (false && this.google.mapUpdated) {

    } else {
      console.log(this.google.pointer.getPosition());
      this.google.map.setCenter(this.google.pointer.getPosition());
      this.google.map.setZoom(this.address.zoomCalculated);
      this.google.mapUpdated = true;
      finalUpdate.call(this, true);
    }
  }

  function finalUpdate(success) {
    debugLog('finalUpdate, ' + success);
    if (success) {
      this.pendingUpdate.address = false;
      this.pendingUpdate.zoom = false;
      if (this.options.onUpdateMapAddress) {
        this.options.onUpdateMapAddress(!this.address.isDefault);
      }
    }
  }

  if (this.address.isDefault) {
    if (this.google.pointer) {
      this.google.pointer.setMap(null);
      this.google.pointer = null;
    }
    this.google.map.setCenter(new google.maps.LatLng(1, 1));
    this.google.map.setZoom(this.address.zoomCalculated);
    finalUpdate.call(this, true);
  } else {
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
      var _this = this;
      geocoder.geocode({address: this.address.strCalculated}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (!_this.google.map) {
            return;
          }
          if (_this.google.pointer) {
            _this.google.pointer.setMap(null);
            _this.google.pointer = null;
          }
          console.log(results[0].geometry.location);
          _this.google.pointer = _this.googleGetPointerMain(results[0].geometry.location);
          _this.google.pointer.description = _this.address.strShow;
          _this.google.pointer.setMap(_this.google.map);
          setCenter.call(_this);
        } else {
          if (!_this.google.map) {
            return;
          }
          finalUpdate.call(_this);
        }
      });
    } else {
      finalUpdate.call(_this);
    }
  }
}

VkMap.prototype.yandexUpdateMapPoints = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.yandexUpdateMapPoints');

  this.pendingUpdate.points = false;

  if (!this.points || !this.points.length) {
    return;
  }

  var geocodeCallCount = 0, listeners = [];

  for (var i_point in this.points) {
    geocode.call(this, this.points[i_point]);
    continue;
    /*
    var geocoder = new YMaps.Geocoder(this.points[i_point].address, {results: 1});
    this.points[i_point].observers = YMaps.Events.observe(geocoder, [geocoder.Events.Load, geocoder.Events.Fault], function () {
      if (!this.yandex.map) {
        return;
      }
      if (geocoder.length()) {
        this.points[i_point].point = geocoder.get(0).getGeoPoint();
        //var placemark = this.yandexGetPointerSub(this.points[i_point].point);
        //placemark.name = this.points[i_point].name;
        //placemark.description = this.points[i_point].address;
        //this.yandex.map.addOverlay(placemark);
      }
    }, this);
    */
  }

  function geocode(point) {
    var geocoderLocal = new YMaps.Geocoder(point.address, {results: 1});

    geocodeCallCount++;

    listeners = listeners.concat(
      YMaps.Events.observe(geocoderLocal, [geocoderLocal.Events.Load, geocoderLocal.Events.Fault], function (geocoderLocal) {
        if (!this.yandex.map) {
          return;
        }
        if (geocoderLocal.length()) {
          point.result = geocoderLocal.get(0);
        }
        geocodeCallCount--;
        isFinish.call(this);
      }, this)
    );
  }
  function isFinish() {
    if (!geocodeCallCount) {
      if (this.yandex.pointsGroup) {
        this.yandex.map.removeOverlay(this.yandex.pointsGroup);
      }
      this.yandex.pointsGroup = new YMaps.OverlayGroup();

      for (var i_point in this.points) {
        var point = this.points[i_point].result.getGeoPoint();
        var randomX = (Math.random() - 0.5) / 5000;
        var randomY = (Math.random() - 0.5) / 5000;
        point.setX(point.getX() + randomX);
        point.setY(point.getY() + randomY);
        var placemark = this.yandexGetPointerSub(point);
        placemark.name = this.points[i_point].name;
        placemark.description = this.points[i_point].address;
        this.yandex.pointsGroup.add(placemark);
      }
      this.yandex.map.addOverlay(this.yandex.pointsGroup);
      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].cleanup();
      }
    }
  }
}

VkMap.prototype.yandexGetPointerMain = function(point) {
  var style = new YMaps.Style();
  style.iconStyle = new YMaps.IconStyle();
  style.iconStyle.href = (window.base_domain ? base_domain : '/') + 'images/map/pointer.png?1'; // TODO: move to css
  style.iconStyle.size = new YMaps.Size(28, 29);
  style.iconStyle.offset = new YMaps.Point(-8, -27); // pointer
  //style.iconStyle.offset = new YMaps.Point(-12, -13); // pointer2

  var placemark = new YMaps.Placemark(point, {hasBalloon: true});
  placemark.setOptions({style: style});

  if (this.options.isPreview) {
    placemark.setOptions({hasBalloon: false});
    if (this.options.onClickPreview) {
      YMaps.Events.observe(placemark, placemark.Events.Click, this.options.onClickPreview);
    }
  }

  return placemark;
}

VkMap.prototype.googleGetPointerMain = function(point) {
  var placemark = new google.maps.Marker({
    position: point,
    icon: base_domain + 'images/map/pointer.png?1'
  });

  return placemark;
};

VkMap.prototype.yandexGetPointerSub = function(point) {
  var style = new YMaps.Style();
  style.iconStyle = new YMaps.IconStyle();
  style.iconStyle.href = base_domain + 'images/map/pointer_event.png?1'; // TODO: move to css
  style.iconStyle.size = new YMaps.Size(28, 29);
  style.iconStyle.offset = new YMaps.Point(-8, -27); // pointer

  var placemark = new YMaps.Placemark(point, {hasBalloon: true});
  placemark.setOptions({style: style});

  return placemark;
}

VkMap.prototype.googleUpdateMap = function() {
  if (!this.google.map) {
    return;
  }

  if (this.pendingUpdate.address) {
    this.googleUpdateMapAddress();
  }
}

VkMap.prototype.yandexUpdateMapAddress = function() {
  //debugLog(this.options.logPrefix + 'VkMap.prototype.yandexUpdateMapAddress');

  function setCenter() {
    // Always not
    if (false && this.yandex.mapUpdated) {
      this.yandex.map.setZoom(this.address.zoomCalculated, {smooth: false});
      var this_ = this;
      this.yandex.map.panTo(this.yandex.pointer.getGeoPoint(), {flying: true, callback: function() { finalUpdate.call(this_); }});
    } else {
      this.yandex.map.setCenter(this.yandex.pointer.getGeoPoint(), this.address.zoomCalculated);
      this.yandex.mapUpdated = true;
      finalUpdate.call(this, true);
    }
  }
  function finalUpdate(success) {
    //debugLog('finalUpdate, ' + success);
    if (success) {
      this.pendingUpdate.address = false;
      this.pendingUpdate.zoom = false;
      if (this.options.onUpdateMapAddress) {
        this.options.onUpdateMapAddress(!this.address.isDefault);
      }
    }
  }

  if (this.address.isDefault) {
    if (this.yandex.pointer) {
      this.yandex.map.removeOverlay(this.yandex.pointer);
      this.yandex.pointer = null;
    }
    this.yandex.map.setCenter(new YMaps.GeoPoint(1, 1), this.address.zoomCalculated);
    finalUpdate.call(this, true);
  } else {
    var geocoder = new YMaps.Geocoder(this.address.strCalculated, {results: 1});
    if (geocoder) {
      YMaps.Events.observe(geocoder, geocoder.Events.Load, function () {
        if (!this.yandex.map) {
          return;
        }
        if (geocoder.length()) {
          if (this.yandex.pointer) {
            this.yandex.map.removeOverlay(this.yandex.pointer);
            this.yandex.pointer = null;
          }
          this.yandex.pointer = this.yandexGetPointerMain(geocoder.get(0).getGeoPoint());
          this.yandex.pointer.description = this.address.strShow;
          this.yandex.map.addOverlay(this.yandex.pointer);
          setCenter.call(this);
        }
      }, this);
      YMaps.Events.observe(geocoder, geocoder.Events.Fault, function () {
        if (!this.yandex.map) {
          return;
        }
        finalUpdate.call(this);
      }, this);
    } else {
      finalUpdate.call(this);
    }
  }
}

VkMap.prototype.yandexRedraw = function() {
  if (!this.yandex.map) {
    return;
  }
  this.yandex.map.redraw();
}

VkMap.prototype.googleRedraw = function() {
  if (!this.google.map) {
    return;
  }
  google.maps.event.trigger(this.google.map, 'resize');
}

VkMap.prototype.setCenter = function(lat, lng) {
  switch (this.options.type) {
    case 'yandex':
      this.yandexSetCenter(lng, lat);
    break;
    case 'google':
      this.googleSetCenter(lat, lng);
    break;
  }
}

VkMap.prototype.yandexSetCenter = function(lng, lat) {
  if (!this.yandex.map) {
    return;
  }
  this.yandex.map.setCenter(new YMaps.GeoPoint(lng, lat), 18);
}

VkMap.prototype.googleSetCenter = function(lat, lng) {
  if (!this.google.map) {
    return;
  }
  this.google.map.setOptions({
    center: new google.maps.LatLng(lat, lng),
    zoom: 18
  });
}

VkMap.prototype.setPointer = function(lat, lng) {
  switch (this.options.type) {
    case 'yandex':
      this.yandexSetPointer(lng, lat);
    break;
    case 'google':
      this.googleSetPointer(lat, lng);
    break;
  }
}

VkMap.prototype.yandexSetPointer = function(lng, lat, name) {
  var pointer = this.yandexGetPointerMain(new YMaps.GeoPoint(lng, lat));
  pointer.name = name || '';
  pointer.setOptions({
    hasBalloon: false
  });
  if (this.yandex.pointer) {
    this.yandex.map.removeOverlay(this.yandex.pointer);
  } 
  this.yandex.pointer = pointer;
  this.yandex.map.addOverlay(pointer);
}

VkMap.prototype.googleSetPointer = function(lat, lng, name) {
  var pointer = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng)
  });
  if (this.google.pointer) {
    this.google.pointer.setMap(null);
  }
  this.google.pointer = pointer;
  this.google.pointer.setMap(this.google.map);
}

VkMap.prototype.checkYandexAPI = function() {
  var this_ = this;
  if (typeof YMaps === 'undefined') {
    setTimeout(function(){
      this_.checkYandexAPI();
    }, 100);
  } else {
    this.API = YMaps;
    YMaps.load('vkontakte', function(){
      this_.create();
    });
  }
}

VkMap.prototype.loadYandexAPI = function() {
  if (typeof YMaps === 'undefined') {
    try {
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: 'http://api-maps.yandex.ru/1.1/index.xml?loadByRequire=1&key=%key%'.replace('%key%', this.options.key)
      }));
    } catch(e) {
      attachScript(
        'yandex_maps_api_lib',
        'http://api-maps.yandex.ru/1.1/index.xml?loadByRequire=1&key=%key%'.replace('%key%', this.options.key)
      );
    }
  }
  this.checkYandexAPI();
}

VkMap.prototype.checkGoogleAPI = function() {
  if (typeof google !== 'undefined' && google.maps) {
    delete VkMap.onloadCallback;
    this.API = google.maps;
    this.create();
  }
}

VkMap.prototype.loadGoogleAPI = function() {
  var this_ = this;
  VkMap.onloadCallback = function() {
    this_.checkGoogleAPI();
  };
  if (typeof google === 'undefined' || !google.maps) {
    try {
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: 'http://maps.google.com/maps/api/js?sensor=false&callback=VkMap.onloadCallback'
      }));
    } catch(e) {
      attachScript(
        'google_maps_api_lib',
        'http://maps.google.com/maps/api/js?sensor=false&callback=VkMap.onloadCallback'
      );
    }
  }
  this.checkGoogleAPI();
}

VkMap.prototype.loadAPI = function() {
  switch(this.options.type) {
    case 'google':
      this.loadGoogleAPI();
    break;
    case 'yandex':
    default:
      this.loadYandexAPI();
  }
}

try{stManager.done('map2.js');}catch(e){}