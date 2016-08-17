/*
 * VKontakte maps library
 * based on Mapstraction library
 */

(function() {
var apis = {};

var invoke = function(sApiId, sObjName, sFnName, oScope, args) {
  if (!hasImplementation(sApiId, sObjName, sFnName)) {
    throw 'Method ' + sFnName + ' of object ' + sObjName + ' is not supported by API ' + sApiId + '.';
  }
  if (typeof(apis[sApiId][sObjName].deferrable) != 'undefined' && apis[sApiId][sObjName].deferrable[sFnName] === true) {
    vkMaps.deferUntilLoaded.call(oScope, function() {
      return apis[sApiId][sObjName][sFnName].apply(oScope, args);
    });
  } else {
    return apis[sApiId][sObjName][sFnName].apply(oScope, args);
  }
};

var hasImplementation = function(sApiId, sObjName, sFnName) {
  if (typeof(apis[sApiId]) == 'undefined') {
    throw 'API ' + sApiId + ' not loaded.';
  }
  if(typeof(apis[sApiId][sObjName]) == 'undefined') {
    throw 'Object definition ' + sObjName + ' in API ' + sApiId + ' not loaded.';
  }
  return typeof(apis[sApiId][sObjName][sFnName]) == 'function';
};

var vkMaps = window.vkMaps = {
  register: function(sApiId, oApiImpl) {
    if (!apis.hasOwnProperty(sApiId)) {
      apis[sApiId] = {};
    }
    vkMaps.util.merge(apis[sApiId], oApiImpl);
  },
  addProxyMethods: function(func, aryMethods, bWithApiArg) {
    for(var i = 0; i < aryMethods.length; i++) {
      var sMethodName = aryMethods[i];
      if (bWithApiArg) {
        func.prototype[sMethodName] = new Function('return this.invoker.go(\'' + sMethodName + '\', arguments, {overrideApi: true});');
      } else {
        func.prototype[sMethodName] = new Function('return this.invoker.go(\'' + sMethodName + '\', arguments);');
      }
    }
  },
  deferUntilLoaded: function(fnCall) {
    if (this.loaded[this.api] === false) {
      var scope = this;
      this.onload[this.api].push(fnCall);
    } else {
      fnCall.call(this);
    }
  },
  addEvents: function(oEvtSrc, aEvtNames) {
    for (var i = 0; i < aEvtNames.length; i++) {
      var sEvtName = aEvtNames[i];
      if (sEvtName in oEvtSrc) {
        throw 'Event or method ' + sEvtName + ' already declared.';
      }
      oEvtSrc[sEvtName] = new vkMaps.Event(sEvtName, oEvtSrc);
    }
  }
};

vkMaps.Event = function(sEvtName, oEvtSource) {
  var handlers = [];
  if (!sEvtName) {
    throw 'Event name must be provided';
  }
  this.addHandler = function(fn, ctx) {
    handlers.push({context: ctx, handler: fn});
  };
  this.removeHandler = function(fn, ctx) {
    for (var i = 0; i < handlers.length; i++) {
      if (handlers[i].handler == fn && handlers[i].context == ctx) {
        handlers.splice(i, 1);
      }
    }
  };
  this.removeAllHandlers = function() {
    handlers = [];
  };
  this.fire = function(oEvtArgs) {
    var args = [sEvtName, oEvtSource, oEvtArgs];
    for (var i = 0; i < handlers.length; i++) {
      handlers[i].handler.apply(handlers[i].context, args);
    }
  };
};

vkMaps.Invoker = function(aobj, asClassName, afnApiIdGetter) {
  var obj = aobj,
  sClassName = asClassName,
  fnApiIdGetter = afnApiIdGetter,
  defOpts = {
    overrideApi: false,
    context: null,
    fallback: null
  };
  this.go = function(sMethodName, args, oOptions){
    if (typeof args !== 'undefined') {
      args = Array.prototype.slice.apply(args);
    } else {
      args = [];
    }
    if (typeof(oOptions) == 'undefined') {
      oOptions = defOpts;
    }
    var sApiId;
    if(oOptions.overrideApi) {
      sApiId = args.shift();
    } else {
      sApiId = fnApiIdGetter.apply(obj);
    }
    if (typeof(sApiId) != 'string') {
      throw 'API ID not available.';
    }
    if (typeof(oOptions.context) != 'undefined' && oOptions.context !== null) {
      args.push(oOptions.context);
    }
    if(typeof(oOptions.fallback) == 'function' && !hasImplementation(sApiId, sClassName, sMethodName)) {
      return oOptions.fallback.apply(obj, args);
    } else {
      return invoke(sApiId, sClassName, sMethodName, obj, args);
    }
  };
};

vkMaps.util = {
  merge: function(oRecv, oGive) {
    for (var sPropName in oGive) {
      if (oGive.hasOwnProperty(sPropName)) {
        if (!oRecv.hasOwnProperty(sPropName)) {
          oRecv[sPropName] = oGive[sPropName];
        } else {
          vkMaps.util.merge(oRecv[sPropName], oGive[sPropName]);
        }
      }
    }
  },
  loadLib: function(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    if (callback) {
      if(script.addEventListener){
        addEvent(script, 'load', callback);
      } else if(script.attachEvent) {
        var done = false;
        addEvent(script, 'readystatechange', function() {
          if (!done && inArray(this.readyState, ['loaded', 'complete'])) {
            done = true;
            callback();
          }
        });
      }
    }
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(script);
    return;
  },
  getLibUrl: function(base, params) {
    var query = [];
    for (var paramName in params) {
      query.push(paramName+'='+encodeURIComponent(params[paramName]));
    }
    return base + '?' + query.join('&');
  },
  getAvailableProviders : function () {
    var providers = [];
    for (var propertyName in apis)  {
      if (apis.hasOwnProperty(propertyName)) {
        providers.push(propertyName);
      }
    }
    return providers;
  }
};

var init = function() {
  this.invoker.go('init', [this.currentElement, this.api]);
  var loaded = (typeof this.loaded != 'undefined' ) ? (this.loaded[this.api] === true) : true;
  if (loaded) {
    this.applyOptions();
  }
  return loaded;
};

var VKMap = vkMaps.VKMap = function(element, opts, debug) {
  if (typeof(opts) == 'object') {
    var api = opts.provider;
  } else {
    var api = opts;
  }

  if (!api) {
    api = vkMaps.util.getAvailableProviders()[0];
  }

  this.api = api;
  this.maps = {};
  if (element) {
    this.currentElement = ge(element);
    this.element = element;
  }
  this.eventListeners = [];
  this.markers = [];
  this.controls = [];
  this.loaded = {};
  this.onload = {};
  this.lngcode = opts.lngcode || 'en';
  this.onload[api] = [];
  this.options = {
    enableScrollWheelZoom: true,
    enableDragging: true
  };
  this.setTypesList();
  this.addControlsArgs = {};
  this.invoker = new vkMaps.Invoker(this, 'VKMap', function() {
    return this.api;
  });
  if (element) {
    vkMaps.addEvents(this, ['load', 'click', 'endPan', 'changeZoom', 'markerAdded', 'markerRemoved']);
  } else {
    vkMaps.addEvents(this, ['load']);
  }
  init.apply(this);
};

vkMaps.load = function(api, callback, lngcode, ver) {
  switch (api) {
    case 'yandex2':
      if (window.ymaps) {
        callback();
      } else {
        if (window.yandex2MapsInited) {
          callback();
        } else {
          window.yandex2MapInit = function() {
            ymaps.modules.require(['package.standard'], function (Map, Placemark) {
              window.yandex2MapsInited = true;
              callback();
            });
          }
          var lng = 'ru_RU';
          if (cur.countryCode == 'UA') {
            lng = (lngcode && lngcode == 'ua' ? 'uk' : 'ru') + '_UA';
          } else if (lngcode && lngcode != 'ru' && lngcode != 'br') {
            lng = 'en_US';
          }
          headNode.appendChild(ce('script', {
            type: 'text/javascript',
            src: (window.locProtocol || 'http:') + '//api-maps.yandex.ru/2.1/?lang='+lng+'&onload=yandex2MapInit&load=package.standard'
          }));
        }
      }
      break;
    case 'yandex':
      if (window.YMaps) {
        callback();
      } else {
        vkMaps.util.loadLib(vkMaps.util.getLibUrl(
          (window.locProtocol || 'http:') + '//api-maps.yandex.ru/'+(ver ? ver : '1.1')+'/index.xml',
          {
            key: ([
              'AGzlA0wBAAAAokbPJgIA_zBVgmsPMsMpjxEq4umhgUT8SaUAAAAAAAAAAAANQY4j1Xt0b5km4jLx23VAo8goxw==',
              'AKPeBEwBAAAA0qePSQIA03AwA4O4ze6XTqIecsNp7REB6VYAAAAAAAAAAADNzChqedeUxsCAyYkFUHiD7MPITA=='
            ])[/^(?:.+\.)?vk.com$/i.test(location.hostname) ? 1 : 0],
            loadByRequire: 1
          }
        ), function() {
          YMaps.load(function() {
            callback();
          });
        });
      }
      break;
    case 'google':
      if (window.google && google.maps) {
        callback();
      } else {
        window.gMapsInit = function() {
          callback();
          delete window.gMapsInit;
        };
        vkMaps.util.loadLib(vkMaps.util.getLibUrl(
          (window.locProtocol || 'http:') + '//maps.google.com/maps/api/js',
          {
            sensor: 'false',
            callback: 'gMapsInit',
            language: lngcode || 'en'
          }
        ));
      }
      break;
    case 'mapbox':
      if (window.L && window.L.mapbox) {
        callback();
      } else {
        var stat = ['mapbox.css', 'mapbox.js'];
        if (browser.msie && browser.version < 8) {
          stat.push('mapbox_ie.css');
        }
        stManager.add(stat, function() {
          callback();
        });
      }
      break;
  }
}


VKMap.ROAD = 1;
VKMap.SATELLITE = 2;
VKMap.HYBRID = 3;

vkMaps.addProxyMethods(VKMap, [
  'applyOptions',
  'addControls',
  'getMap',
  'addSmallControls',
  'addLargeControls',
  'addMapTypeControls',
  'addMarker',
  'removeMarker',
  'getBounds',
  'setBounds',
  'getCenter',
  'setCenter',
  'getMapType',
  'setMapType',
  'getZoom',
  'setZoom',
  'setCenterAndZoom',
  'resizeTo',
  'removeMap'
]);

VKMap.prototype.reInit = function() {
  init.apply(this);
};
VKMap.prototype.setTypesList = function() {
  VKMap.TYPES_LIST = [
    [VKMap.ROAD, getLang('places_map_roadmap')],
    [VKMap.SATELLITE, getLang('places_map_satellite')],
    [VKMap.HYBRID, getLang('places_map_hybrid')]
  ];
};
VKMap.prototype.setOptions = function(oOpts) {
  vkMaps.util.merge(this.options, oOpts);
  this.applyOptions();
};
VKMap.prototype.setOption = function(sOptName, vVal) {
  this.options[sOptName] = vVal;
  this.applyOptions();
};
VKMap.prototype.enableScrollWheelZoom = function() {
  this.setOption('enableScrollWheelZoom', true);
};
VKMap.prototype.dragging = function(on) {
  this.setOption('enableDragging', on);
};
VKMap.prototype.swap = function(element, api, noControlsAdd) {
  if (this.api === api) {
    return;
  }

  var center = this.getCenter(),
  zoom = this.getZoom();
  hide(this.currentElement);
  this.currentElement = ge(element);
  show(this.currentElement);

  this.api = api;
  this.onload[api] = [];

  if (this.maps[this.api] === undefined) {
    if (init.apply(this) !== true) {
      return false;
    }
    for (var i = 0; i < this.markers.length; i++) {
      this.addMarker(this.markers[i], true);
    }
  }
  this.setCenterAndZoom(center, zoom);
  if (!noControlsAdd) {
    this.addControls(this.addControlsArgs);
  }
};
VKMap.prototype.isLoaded = function(api) {
  if (api === null) {
    api = this.api;
  }
  return (this.loaded[api] === true);
};
VKMap.prototype.setDefer = function(deferred) {
  this.loaded[this.api] = !deferred;
};
VKMap.prototype.runDeferred = function() {
  while(this.onload[this.api].length > 0) {
    this.onload[this.api].shift().apply(this);
  }
};
VKMap.prototype.clickHandler = function(lat, lon, me) {
  this.callEventListeners('click', {
    location: new LatLonPoint(lat, lon)
  });
};
VKMap.prototype.moveendHandler = function(me) {
  this.callEventListeners('moveend', {});
};
VKMap.prototype.addEventListener = function() {
  var listener = {};
  listener.event_type = arguments[0];
  listener.callback_function = arguments[1];

  if (arguments.length == 3) {
    listener.back_compat_mode = false;
    listener.callback_object = arguments[2];
  } else {
    listener.back_compat_mode = true;
    listener.callback_object = null;
  }
  this.eventListeners.push(listener);
};
VKMap.prototype.callEventListeners = function(sEventType, oEventArgs) {
  oEventArgs.source = this;
  for (var i = 0; i < this.eventListeners.length; i++) {
    var evLi = this.eventListeners[i];
    if (evLi.event_type == sEventType) {
      if(evLi.back_compat_mode) {
        if(evLi.event_type == 'click') {
          evLi.callback_function(oEventArgs.location);
        } else {
          evLi.callback_function();
        }
      } else {
        var scope = evLi.callback_object || this;
        evLi.callback_function.call(scope, oEventArgs);
      }
    }
  }
};
VKMap.prototype.addMarker = function(marker, old) {
  marker.mapstraction = this;
  marker.api = this.api;
  marker.location.api = this.api;
  marker.map = this.maps[this.api];
  var propMarker = this.invoker.go('addMarker', arguments);
  marker.setChild(propMarker);
  if (!old) {
    this.markers.push(marker);
  }
  this.markerAdded.fire({'marker': marker});
};
VKMap.prototype.addMarkerWithData = function(marker, data) {
  marker.addData(data);
  this.addMarker(marker);
};
VKMap.prototype.removeMarker = function(marker) {
  var current_marker;
  for(var i = 0; i < this.markers.length; i++) {
    current_marker = this.markers[i];
    if (marker == current_marker) {
      this.invoker.go('removeMarker', arguments);
      marker.onmap = false;
      this.markers.splice(i, 1);
      this.markerRemoved.fire({'marker': marker});
      break;
    }
  }
};
VKMap.prototype.removeAllMarkers = function() {
  var current_marker;
  while(this.markers.length > 0) {
    current_marker = this.markers.pop();
    this.invoker.go('removeMarker', [current_marker]);
  }
};


var LatLonPoint = vkMaps.LatLonPoint = function(lat, lon) {
  this.lat = lat;
  this.lon = lon;
  this.invoker = new vkMaps.Invoker(this, 'LatLonPoint');
};
vkMaps.addProxyMethods(LatLonPoint, ['fromProprietary', 'toProprietary'], true);


var BoundingBox = vkMaps.BoundingBox = function(swlat, swlon, nelat, nelon) {
  this.sw = new LatLonPoint(swlat, swlon);
  this.ne = new LatLonPoint(nelat, nelon);
};
BoundingBox.prototype.getSouthWest = function() {
  return this.sw;
};
BoundingBox.prototype.getNorthEast = function() {
  return this.ne;
};

var Marker = vkMaps.Marker = function(point) {
  this.api = null;
  this.location = point;
  this.onmap = false;
  this.proprietary_marker = false;
  this.attributes = [];
  this.invoker = new vkMaps.Invoker(this, 'Marker', function(){
    return this.api;
  });
  vkMaps.addEvents(this, ['openInfoBubble', 'closeInfoBubble', 'click', 'mousedown', 'dragend']);
};

vkMaps.addProxyMethods(Marker, ['fromProprietary', 'hide', 'openBubble', 'closeBubble', 'show', 'toProprietary', 'update']);

Marker.prototype.setChild = function(some_proprietary_marker) {
  this.proprietary_marker = some_proprietary_marker;
  some_proprietary_marker.VKMap_marker = this;
  this.onmap = true;
};
Marker.prototype.setLabel = function(labelText) {
  this.labelText = labelText;
};
Marker.prototype.addData = function(options) {
  for(var sOptKey in options) {
    if (options.hasOwnProperty(sOptKey)) {
      switch(sOptKey) {
        case 'label':
          this.setLabel(options.label);
        break;
        case 'infoBubble':
          this.setInfoBubble(options.infoBubble);
        break;
        case 'icon':
          if(options.iconSize && options.iconAnchor) {
            this.setIcon(options.icon, options.iconSize, options.iconAnchor, options.icon2x);
          } else if(options.iconSize) {
            this.setIcon(options.icon, options.iconSize, false, options.icon2x);
          } else {
            this.setIcon(options.icon, false, false, options.icon2x);
          }
        break;
        case 'iconShadow':
          if(options.iconShadowSize) {
            this.setShadowIcon(options.iconShadow, [options.iconShadowSize[0], options.iconShadowSize[1]]);
          } else {
            this.setIcon(options.iconShadow);
          }
        break;
        case 'infoDiv':
          this.setInfoDiv(options.infoDiv[0],options.infoDiv[1]);
        break;
        case 'draggable':
          this.setDraggable(options.draggable);
        break;
        case 'hover':
          this.setHover(options.hover);
          this.setHoverIcon(options.hoverIcon);
        break;
        case 'hoverIcon':
          this.setHoverIcon(options.hoverIcon);
        break;
        case 'openBubble':
          this.openBubble();
        break;
        case 'closeBubble':
          this.closeBubble();
        break;
        case 'groupName':
          this.setGroupName(options.groupName);
        break;
        case 'clickable':
          this.clickable = options.clickable;
        break;
        default:
          this.setAttribute(sOptKey, options[sOptKey]);
        break;
      }
    }
  }
};
Marker.prototype.setInfoBubble = function(infoBubble) {
  this.infoBubble = infoBubble;
};
Marker.prototype.setInfoDiv = function(infoDiv,div) {
  this.infoDiv = infoDiv;
  this.div = div;
};
Marker.prototype.setIcon = function(iconUrl, iconSize, iconAnchor, retinaUrl) {
  this.iconUrl = iconUrl;
  if (iconSize) {
    this.iconSize = iconSize;
  }
  if (retinaUrl) {
    this.iconRetinaUrl = retinaUrl;
  }
  if (iconAnchor) {
    this.iconAnchor = iconAnchor;
  }
};
Marker.prototype.setIconSize = function(iconSize) {
  if (iconSize) {
    this.iconSize = iconSize;
  }
};
Marker.prototype.setIconAnchor = function(iconAnchor) {
  if (iconAnchor) {
    this.iconAnchor = iconAnchor;
  }
};
Marker.prototype.setShadowIcon = function(iconShadowUrl, iconShadowSize) {
  this.iconShadowUrl = iconShadowUrl;
  if (iconShadowSize) {
    this.iconShadowSize = iconShadowSize;
  }
};
Marker.prototype.setHoverIcon = function(hoverIconUrl) {
  this.hoverIconUrl = hoverIconUrl;
};
Marker.prototype.setDraggable = function(draggable) {
  this.draggable = draggable;
};
Marker.prototype.setHover = function(hover) {
  this.hover = hover;
};
Marker.prototype.setGroupName = function(sGrpName) {
  this.groupName = sGrpName;
};
Marker.prototype.setAttribute = function(key,value) {
  this.attributes[key] = value;
};
Marker.prototype.getAttribute = function(key) {
  return this.attributes[key];
};
})();


(function() {
var init = function() {
  this.invoker.go('init');
};

var Geocoder = vkMaps.Geocoder = function (api, callback, error_callback) {
  this.api = api;
  this.geocoders = {};
  this.callback = callback;
  this.error_callback = error_callback || function(){};
  this.invoker = new vkMaps.Invoker(this, 'Geocoder', function(){
    return this.api;
  });
  init.apply(this);
};

vkMaps.addProxyMethods(Geocoder, ['geocode', 'geocode_callback']);

Geocoder.prototype.swap = function(api) {
  if (this.api == api) {
    return;
  }
  this.api = api;
  if (!this.geocoders.hasOwnProperty(this.api)) {
    init.apply(this);
  }
};
})();

function YGeocoderResponseToJson(response) {
  var resp = {street: '', locality: '', region: '', country: ''};
  var locLev;
  if ((locLev = response.AddressDetails.Country)) {
    resp.country = locLev.CountryName;
    if (locLev.AdministrativeArea) {
      locLev = locLev.AdministrativeArea;
    }
    resp.region = locLev.AdministrativeAreaName;
    if (locLev.Locality) {
      locLev = locLev.Locality;
    }
    resp.locality = locLev.LocalityName;
    if (locLev.Thoroughfare) {
      locLev = locLev.Thoroughfare;
    }
    resp.street = locLev.ThoroughfareName;
  }
  var ypoint = response.getGeoPoint();
  ybounds = response.getBounds(),
    ltop = ybounds.getLeftTop(),
    rbottom = ybounds.getRightBottom();
  resp.pointLat = ypoint.getLat();
  resp.pointLng = ypoint.getLng();
  resp.boundTop = ltop.getLat();
  resp.boundLeft = ltop.getLng();
  resp.boundBottom = rbottom.getLat();
  resp.boundRight = rbottom.getLng();
  return resp;
}

function YGeocoderResponseFromJson(resp) {
  resp.point = new vkMaps.LatLonPoint(resp.pointLat, resp.pointLng);
  resp.bounds = new vkMaps.BoundingBox(resp.boundTop, resp.boundLeft, resp.boundBottom, resp.boundRight);
  delete resp['pointLat'];
  delete resp['pointLng'];
  delete resp['boundTop'];
  delete resp['boundLeft'];
  delete resp['boundBottom'];
  delete resp['boundRight'];
  return resp;
}

function YCustomZoomControl(offices) {
  this.onAddToMap = function (map, position) {
    this.container = YMaps.jQuery("<div class=\"ymap_zoom_wrap\"><div class=\"ymap_zoom_btn\" id=\"ymap_zoom_wrap_p\" data-z=\"1\">+</div><div class=\"ymap_zoom_btn\" id=\"ymap_zoom_wrap_m\" data-z=\"-1\">-</div></div>");
    this.map = map;
    this.position = position || new YMaps.ControlPosition(YMaps.ControlPosition.TOP_LEFT, new YMaps.Size(10, 10));

    this.container.css({
      position: "absolute",
      zIndex: YMaps.ZIndex.CONTROL,
    });

    this.container.find('.ymap_zoom_btn').bind('click', function() {
      map.zoomBy(parseInt(this.getAttribute('data-z')), { smooth: true });
    });

    this.position.apply(this.container);
    this.container.appendTo(this.map.getContainer());
  }

  this.onRemoveFromMap = function () {
  };
}

vkMaps.register('yandex', {
VKMap: {
  init: function(element, api) {
    vkMaps.load(api, (function() {
      var yandexMap = this.maps[api] = new YMaps.Map(element);
      YMaps.Events.observe(yandexMap, yandexMap.Events.Click, (function(map, mouseEvent) {
        var lat = mouseEvent.getCoordPoint().getY(),
        lon = mouseEvent.getCoordPoint().getX();
        var _this = this;
        clearTimeout(this._curClickTO);
        this._curClickTO = setTimeout(function() {
          _this.click.fire({'location': new vkMaps.LatLonPoint(lat, lon)});
        }, 250);
      }).bind(this));

      YMaps.Events.observe(yandexMap, yandexMap.Events.DblClick, (function(map, mouseEvent) {
        clearTimeout(this._curClickTO);
        var map = this.getMap();
        map.setZoom(map.getZoom() + 1, { position: mouseEvent.getCoordPoint(), smooth: true });
      }).bind(this));

      YMaps.Events.observe(yandexMap, yandexMap.Events.SmoothZoomEnd, (function(map) {
        this.changeZoom.fire();
      }).bind(this));
      this.loaded[api] = true;
      this.load.fire();
    }).bind(this));
  },
  applyOptions: function(){
    var map = this.maps[this.api];
    if (!map) {
      return;
    }
    if(this.options.enableScrollWheelZoom){
      map.enableScrollZoom({smooth: true});
    }
    if (this.options.enableDragging) {
      map.enableDragging();
    } else {
      map.disableDragging();
    }
  },
  resizeTo: function(width, height){
    this.currentElement.style.width = width;
    this.currentElement.style.height = height;
    this.maps[this.api].redraw();
  },
  addControls: function(args) {
    var map = this.maps[this.api];
    if (args.zoom == 'large') {
      this.addLargeControls();
    }
    else if (args.zoom == 'small') {
      this.addSmallControls();
    }
    if (args.pan) {
      this.controls.unshift(new YMaps.ToolBar());
      this.addControlsArgs.pan = true;
      map.addControl(this.controls[0]);
    }
    if (args.scale) {
      this.controls.unshift(new YMaps.ScaleLine());
      this.addControlsArgs.scale = true;
      map.addControl(this.controls[0]);
    }
    if (args.overview) {
      if (typeof(args.overview) != 'number') {
        args.overview = 5;
      }
      this.controls.unshift(new YMaps.MiniMap(args.overview));
      this.addControlsArgs.overview = true;
      map.addControl(this.controls[0]);
    }
  },
  getMap: function() {
    return this.maps[this.api];
  },
  addSmallControls: function() {
    var map = this.maps[this.api];
    this.controls.unshift(new YMaps.SmallZoom());
    this.addControlsArgs.zoom = 'small';
    map.addControl(this.controls[0]);
  },
  addLargeControls: function() {
    var map = this.maps[this.api];
    this.controls.unshift(new YCustomZoomControl());
    this.addControlsArgs.zoom = 'large';
    map.addControl(this.controls[0]);
  },
  addMapTypeControls: function() {
    var me = this, map = this.maps[this.api],
    onChange = function(type) {
      this.setMapType(intval(type));
    },
    onAddToMap = function(ymap, position) {
      var position = new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(10, 10)),
      div = ce('div', {className: 'places_map_type'}, {position: "absolute", zIndex: YMaps.ZIndex.CONTROL, backgroundColor: '#FFF', padding: 0, margin: 0}),
      input = ce('input', {id: 'yandex_type_dd'}, {padding: 0, margin: 0});
      position.apply(div);
      ymap.getContainer().appendChild(div).appendChild(input);
      new Dropdown(ge('yandex_type_dd'), vkMaps.VKMap.TYPES_LIST, {
        width: 120,
        dark: 1,
        onChange: onChange.bind(me)
      });
    },
    onRemoveFromMap = function() {

    };
    this.controls.unshift({onAddToMap: onAddToMap, onRemoveFromMap: onRemoveFromMap});
    this.addControlsArgs.map_type = true;
    map.addControl(this.controls[0]);
  },
  setCenterAndZoom: function(point, zoom) {
    var map = this.maps[this.api],
    pt = point.toProprietary(this.api);
    map.setCenter(pt, zoom);
  },
  addMarker: function(marker, old) {
    var map = this.maps[this.api],
    pin = marker.toProprietary(this.api);
    map.addOverlay(pin);
    return pin;
  },
  removeMarker: function(marker) {
    var map = this.maps[this.api];
    map.removeOverlay(marker.proprietary_marker);
  },
  getCenter: function() {
    var map = this.maps[this.api],
    pt = map.getCenter(),
    point = new vkMaps.LatLonPoint(pt.getLat(),pt.getLng());
    return point;
  },
  setCenter: function(point, options) {
    var map = this.maps[this.api],
    pt = point.toProprietary(this.api);
    map.setCenter(pt);
  },
  setZoom: function(zoom) {
    var map = this.maps[this.api];
    map.setZoom(zoom);
  },
  getZoom: function() {
    var map = this.maps[this.api],
    zoom = map.getZoom();
    return zoom;
  },
  getZoomLevelForBoundingBox: function(bbox) {
    var map = this.maps[this.api];
    var ne = bbox.getNorthEast().toProprietary(this.api);
    var sw = bbox.getSouthWest().toProprietary(this.api);
    var zoom = new YMaps.GeoBounds(ne, sw).getMapZoom(map);

    return zoom;
  },
  setMapType: function(type) {
    var map = this.maps[this.api];
    switch(type) {
      case vkMaps.VKMap.ROAD:
        map.setType(YMaps.MapType.MAP);
        break;
      case vkMaps.VKMap.SATELLITE:
        map.setType(YMaps.MapType.SATELLITE);
        break;
      case vkMaps.VKMap.HYBRID:
        map.setType(YMaps.MapType.HYBRID);
        break;
      default:
        map.setType(type || YMaps.MapType.MAP);
    }
  },
  getMapType: function() {
    var map = this.maps[this.api],
    type = map.getType();
    switch(type) {
      case YMaps.MapType.MAP:
        return vkMaps.vkMap.ROAD;
      case YMaps.MapType.SATELLITE:
        return vkMaps.vkMap.SATELLITE;
      case YMaps.MapType.HYBRID:
        return vkMaps.vkMap.HYBRID;
      default:
        return null;
    }
  },
  getBounds: function () {
    var map = this.maps[this.api],
    gbox = map.getBounds(),
    lb = gbox.getLeftBottom(),
    rt = gbox.getRightTop();
    return new vkMaps.BoundingBox(lb.getLat(), lb.getLng(), rt.getLat(), rt.getLng());
  },
  setBounds: function(bounds){
    var map = this.maps[this.api],
    sw = bounds.getSouthWest(),
    ne = bounds.getNorthEast(),
    leftBottom = new YMaps.GeoPoint(sw.lon, sw.lat),
    rightTop = new YMaps.GeoPoint(ne.lon, ne.lat),
    ybounds = new YMaps.GeoBounds(leftBottom, rightTop);
    map.setZoom(ybounds.getMapZoom(map));
    map.setCenter(ybounds.getCenter());
  },
  removeMap: function() {
    var map = this.maps[this.api];
    map.destructor();
  }
},

LatLonPoint: {
  toProprietary: function() {
    return new YMaps.GeoPoint(this.lon, this.lat);
  },
  fromProprietary: function(yandexPoint) {
    this.lat = yandexPoint.getLat();
    this.lon = yandexPoint.getLng();
    return this;
  }
},

Marker: {
  toProprietary: function() {
    var options = {
      hideIcon: false,
      hasBalloon: false,
      draggable: this.draggable
    };
    if (this.iconUrl) {
      var style = new YMaps.Style(),
      icon = style.iconStyle = new YMaps.IconStyle();
      icon.href = this.iconUrl;
      if (this.iconSize) {
        icon.size = new YMaps.Point(this.iconSize[0], this.iconSize[1]);
        var anchor;
        if (this.iconAnchor) {
          anchor = new YMaps.Point(-this.iconAnchor[0], -this.iconAnchor[1]);
        }
        else {
          anchor = new YMaps.Point(0, 0);
        }
        icon.offset = anchor;
      }
      if (this.iconShadowUrl) {
        icon.shadow = new YMaps.IconShadowStyle();
        icon.shadow.href = this.iconShadowUrl;
        if (this.iconShadowSize) {
          icon.shadow.size = new YMaps.Point(this.iconShadowSize[0], this.iconShadowSize[1]);
          icon.shadow.offset = new YMaps.Point(0, 0);
        }
      }
      options.style = style;
    }
    var ymarker = new YMaps.Placemark(this.location.toProprietary('yandex'), options);
    if (this.hoverIconUrl) {
      var me = this;
      YMaps.Events.observe(ymarker, ymarker.Events.MouseEnter, function(map, mouseEvent) {
        var markerOptions = ymarker.getOptions();
        if (! me.iconUrl) {
          me.iconUrl = ymarker._icon._context._computedStyle.iconStyle.href;
          markerOptions.style = ymarker._icon._context._computedStyle;
        }
        markerOptions.style.iconStyle.href = me.hoverIconUrl;
        ymarker.setOptions(markerOptions);
      });
      YMaps.Events.observe(ymarker, ymarker.Events.MouseLeave, function(map, mouseEvent) {
        var markerOptions = ymarker.getOptions();
        markerOptions.style.iconStyle.href = me.iconUrl;
        ymarker.setOptions(markerOptions);
      });
    }
    if (this.labelText) {
      ymarker.name = this.labelText;
    }
    if (this.infoBubble) {
      ymarker.setOptions({hasBalloon: true, hideIcon: true});
      ymarker.setBalloonContent(this.infoBubble);
    }
    YMaps.Events.observe(ymarker, ymarker.Events.DragEnd, function(ymarker) {
      var latLon = new vkMaps.LatLonPoint().fromProprietary('yandex', ymarker.getGeoPoint());
      this.VKMap_marker.location = latLon;
      if (this.VKMap_marker.dragend) {
        this.VKMap_marker.dragend.fire(latLon);
      }
    });
    return ymarker;
  },
  openBubble: function() {
    this.proprietary_marker.openBalloon();
  },
  closeBubble: function() {
    this.proprietary_marker.closeBalloon();
  },
  hide: function() {
    this.proprietary_marker._$iconContainer.addClass("YMaps-display-none");
  },
  show: function() {
    this.proprietary_marker._$iconContainer.removeClass("YMaps-display-none");
  },
  update: function() {
    point = new vkMaps.LatLonPoint();
    point.fromProprietary('yandex', this.proprietary_marker.getGeoPoint());
    this.location = point;
  }
},

Geocoder: {
  init: function() {
    var me = this;
  },
  geocode: function(address) {
    var VKMap_geocoder = this;
    if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
      address.address = [address.street, address.locality, address.region, address.country ].join(', ');
    }
    var q = null, s = 1;
    if (address.lat && address.lon) {
      s = 0;
      address.address = new YMaps.GeoPoint(address.lon, address.lat);
      q = { act: 'ya_get_geocoder_coords', lat: address.lat, lon: address.lon };
    } else {
      var b = address.bounds, lat = 0, lon = 0;
      if (b) {
        lat = (b.ne.lat + b.sw.lat) / 2;
        lon = (b.ne.lon + b.sw.lon) / 2;
      }
      q = { act: 'ya_get_geocoder_string', addr: address.address, lon: lon, lat: lat };
    }

    ajax.post('al_places.php', q, {
      onDone: function(found, resp) {
        if (isObject(resp)) {
          VKMap_geocoder.callback(YGeocoderResponseFromJson(resp));
        } else {
          VKMap_geocoder.error_callback('');
        }
      },
      onFail: function(error) {
        VKMap_geocoder.error_callback(error);
      }
    });
  },
  geocode_callback: function(response) {
    var return_location = {street: '', locality: '', region: '', country: ''};
    var locLev;
    if ((locLev = response.AddressDetails.Country)) {
      return_location.country = locLev.CountryName;
      if (locLev.AdministrativeArea) {
        locLev = locLev.AdministrativeArea;
      }
      return_location.region = locLev.AdministrativeAreaName;
      if (locLev.Locality) {
        locLev = locLev.Locality;
      }
      return_location.locality = locLev.LocalityName;
      if (locLev.Thoroughfare) {
        locLev = locLev.Thoroughfare;
      }
      return_location.street = locLev.ThoroughfareName;
    }
    var ypoint = response.getGeoPoint();
    ybounds = response.getBounds(),
    ltop = ybounds.getLeftTop(),
    rbottom = ybounds.getRightBottom();
    return_location.point = new vkMaps.LatLonPoint(ypoint.getLat(), ypoint.getLng());
    return_location.bounds = new vkMaps.BoundingBox(ltop.getLat(), ltop.getLng(), rbottom.getLat(), rbottom.getLng());
    this.callback(return_location);
  }
}
});

vkMaps.register('yandex2', {
VKMap: {
  init: function(element, api) {
    vkMaps.load(api, (function() {
      var yandexMap = this.maps[api] = new ymaps.Map(element, {center: [0, 0], controls: [], zoom: 10}, { suppressMapOpenBlock: true, suppressObsoleteBrowserNotifier: true });
      yandexMap.events.add('click', (function(ev) {
        var coords = ev.get('coords');
        this.click.fire({'location': new vkMaps.LatLonPoint(coords[0], coords[1])});
      }).bind(this));
      yandexMap.events.add('actionend', (function(ev) {
        var act = ev.get('action');
        if (act == 'zoom') {
          this.changeZoom.fire();
        } else {
         debugLog('action event end ', act);
        }
      }).bind(this));

      this.loaded[api] = true;
      this.load.fire();
    }).bind(this), this.lngcode, this.ver);
  },
  applyOptions: function(){
    var map = this.maps[this.api];
    if (!map) {
      return;
    }
    if(this.options.enableScrollWheelZoom){
      map.behaviors.enable('scrollZoom');
    }
    if (this.options.enableDragging) {
      map.behaviors.enable('drag');
    } else {
      map.behaviors.disable('drag');
    }
  },
  resizeTo: function(width, height){
    this.currentElement.style.width = width;
    this.currentElement.style.height = height;
    this.maps[this.api].redraw();
  },
  addControls: function(args) {
    var map = this.maps[this.api];
    //map.controls.remove('all');
    if (args.zoom == 'large') {
      this.addLargeControls();
    } else if (args.zoom == 'small') {
      this.addSmallControls();
    }
    if (args.pan) {
      this.controls.unshift(new ymaps.control.ToolBar());
      this.addControlsArgs.pan = true;
      map.addControl(this.controls[0]);
    }
    if (args.scale) {
      this.controls.unshift('scaleLine');
      this.addControlsArgs.scale = true;
      map.addControl(this.controls[0]);
    }
    if (args.overview) {
      if (typeof(args.overview) != 'number') {
        args.overview = 5;
      }
      this.controls.unshift(new ymaps.control.MiniMap({ type: 'yandex#satellite' }, {size: [90, 90]}));
      this.addControlsArgs.overview = true;
      map.addControl(this.controls[0]);
    }
  },
  getMap: function() {
    return this.maps[this.api];
  },
  addSmallControls: function() {
    var map = this.maps[this.api];
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small"
      }
    });
    this.controls.unshift(zoomControl);
    map.controls.add(this.controls[0]);
  },
  addLargeControls: function() {
    var map = this.maps[this.api];
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "large",
        position:{top: 15, left: 15}
      }
    });
    this.controls.unshift(zoomControl);
    map.controls.add(this.controls[0]);
  },
  addMapTypeControls: function() {
    var TypeLayout = ymaps.templateLayoutFactory.createClass('<div class="places_map_type" style="right:0px;top:0px;position: absolute;backgroundColor:#FFF;padding:0;margin:10px;"><input id="yandex_type_dd" style="padding:0px; margin: 0px;"></input></div>', {
        build: function() {
            TypeLayout.superclass.build.call(this);
        },
        clear: function() {
            this._controlListeners.removeAll();
            TypeLayout.superclass.clear.call(this);
        }
    });

    var TypeSelector = function() {
      this.events = new ymaps.event.Manager();
      this.options = new ymaps.option.Manager();
      this.state = new ymaps.data.Manager();
    };

    TypeSelector.prototype = {
        setParent: function(parent) {
            this.parent = parent;
            if (parent) {
                var map = parent.getMap();
                this.layout = new TypeLayout({
                    map: map,
                    options: this.options
                });
                this.layout.setParentElement(map.panes.get('controls').getElement());
            } else {
                this.layout.setParentElement(null);
            }
        },
        getParent: function() {
            return this.parent;
        }
    };
    var typeDD = new TypeSelector();

    var me = this, map = this.maps[this.api];
    var onChange = function(type) {
      this.setMapType(intval(type));
    };
    this.addControlsArgs.map_type = true;

    map.controls.add(typeDD);
    this.controls.unshift(typeDD);

    new Dropdown(ge('yandex_type_dd'), vkMaps.VKMap.TYPES_LIST, {
      width: 120,
      dark: 1,
      onChange: onChange.bind(me)
    });
  },
  setCenterAndZoom: function(point, zoom) {
    var map = this.maps[this.api],
    pt = point.toProprietary(this.api);
    map.setCenter(pt, zoom);
  },
  addMarker: function(marker, old) {
    var map = this.maps[this.api],
    pin = marker.toProprietary(this.api);
    map.geoObjects.add(pin);
    return pin;
  },
  removeMarker: function(marker) {
    var map = this.maps[this.api];
    map.geoObjects.remove(marker.proprietary_marker);
  },
  getCenter: function() {
    var map = this.maps[this.api],
    pt = map.getCenter(),
    point = new vkMaps.LatLonPoint(pt[0], pt[1]);
    return point;
  },
  setCenter: function(point, options) {
    var map = this.maps[this.api];
    map.setCenter(point.toProprietary(this.api));
  },
  setZoom: function(zoom) {
    var map = this.maps[this.api];
    map.setZoom(zoom);
  },
  getZoom: function() {
    var map = this.maps[this.api];
    return map.getZoom();
  },
  getZoomLevelForBoundingBox: function(bbox) {
    var map = this.maps[this.api];
    var ne = bbox.getNorthEast(), sw = bbox.getSouthWest();
    var s = getSize(map.container.getElement());
    var cz = ymaps.util.bounds.getCenterAndZoom([[ne.lat, ne.lon], [sw.lat, sw.lon]], s);
    return cz.zoom;
  },
  setMapType: function(type) {
    var map = this.maps[this.api];
    switch(type) {
      case vkMaps.VKMap.ROAD:
        map.setType('yandex#map');
        break;
      case vkMaps.VKMap.SATELLITE:
        map.setType('yandex#satellite');
        break;
      case vkMaps.VKMap.HYBRID:
        map.setType('yandex#hybrid');
        break;
      default:
        map.setType(type || 'yandex#map');
    }
  },
  getMapType: function() {
    var map = this.maps[this.api],
    type = map.getType();
    switch(type) {
      case 'yandex#map':
        return vkMaps.vkMap.ROAD;
      case 'yandex#satellite':
        return vkMaps.vkMap.SATELLITE;
      case 'yandex#hybrid':
        return vkMaps.vkMap.HYBRID;
      default:
        return null;
    }
  },
  getBounds: function () {
    var map = this.maps[this.api];
    var gbox = map.getBounds();
    return new vkMaps.BoundingBox(gbox[0][0], gbox[0][1], gbox[1][0], gbox[1][1]);
  },
  setBounds: function(bounds){
    var map = this.maps[this.api];
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    map.setBounds([[sw.lat, sw.lon], [ne.lat, ne.lon]]);
  },
  removeMap: function() {
    var map = this.maps[this.api];
    map.destroy();
  }
},

LatLonPoint: {
  toProprietary: function() {
    return [this.lat, this.lon];
  },
  fromProprietary: function(yandexPoint) {
    var c = yandexPoint;
    if (isObject(yandexPoint)) {
      var c = yandexPoint.getCoordinates();
    }
    this.lat = c[0];
    this.lon = c[1];
    return this;
  }
},

Marker: {
  toProprietary: function() {
    var options = {
      hideIcon: false,
      hasBalloon: false,
      draggable: this.draggable
    };

    var iconUrl = this.iconUrl ? (window.devicePixelRatio >= 2 && this.iconRetinaUrl ? this.iconRetinaUrl : this.iconUrl) : '';

    if (iconUrl) {
      options.iconLayout = 'default#image';
      options.iconImageHref = iconUrl;
      if (this.iconSize) {
        options.iconImageSize = this.iconSize;
        if (this.iconAnchor) {
          options.iconImageOffset = [-this.iconAnchor[0], -this.iconAnchor[1]];
        } else {
          options.iconImageOffset = [0,0];
        }
      }

      if (this.iconShadowUrl) {
        //  установить тень иконки
        options.iconShadowlayout = 'default#image';
        options.iconShadowImageHref = this.iconShadowUrl;
        if (this.iconShadowSize) {
          options.iconShadowImageSize = this.iconShadowSize;
          options.iconShadowImageOffset = [0,0];
        }
      }
    }
    var properties = {};
    if (this.infoBubble) {
      options.hasBalloon = true;
      options.hideIcon = true;
      properties.balloonContent = this.infoBubble;
    }

    var ymarker = new ymaps.Placemark(this.location.toProprietary('yandex2'), properties, options);
    if (this.hoverIconUrl) {
      var me = this;
      ymarker.events.add('mouseenter', function(e) {
        ymarker.options.set('iconImageHref', this.hoverIconUrl);
      });
      ymarker.events.add('mouseleave', function(e) {
        ymarker.options.set('iconImageHref', iconUrl);
      });
    }
    if (this.labelText) {
      ymarker.hint = this.labelText;
    }
    ymarker.events.add('dragend', function(e) {
      var latLon = new vkMaps.LatLonPoint().fromProprietary('yandex2', ymarker.geometry);
      ymarker.VKMap_marker.location = latLon;
      if (ymarker.VKMap_marker.dragend) {
        ymarker.VKMap_marker.dragend.fire(latLon);
      }
    });
    return ymarker;
  },
  openBubble: function() {
    this.proprietary_marker.balloon.open();
  },
  closeBubble: function() {
    this.proprietary_marker.balloon.close();
  },
  hide: function() {
    this.proprietary_marker.options.set('visible', false);
  },
  show: function() {
    this.proprietary_marker.options.set('visible', true);
  },
  update: function() {
    point = new vkMaps.LatLonPoint();
    point.fromProprietary('yandex2', this.proprietary_marker.geometry);
    this.location = point;
  }
},

Geocoder: {
  init: function() {
    var me = this;
  },
  geocode: function(address) {
    var VKMap_geocoder = this;
    if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
      address.address = [address.street, address.locality, address.region, address.country ].join(', ');
    }
    var q = null, s = 1;
    if (address.lat && address.lon) {
      s = 0;
      address.address = new YMaps.GeoPoint(address.lon, address.lat);
      q = { act: 'ya_get_geocoder_coords', lat: address.lat, lon: address.lon };
      if (cur.countryCode && cur.countryCode == 'UA') {
        q['country'] = cur.countryCode;
      }
    } else {
      var b = address.bounds, lat = 0, lon = 0;
      if (b) {
        lat = (b.ne.lat + b.sw.lat) / 2;
        lon = (b.ne.lon + b.sw.lon) / 2;
      }
      q = { act: 'ya_get_geocoder_string', addr: address.address, lon: lon, lat: lat };
    }

    ajax.post('al_places.php', q, {
      onDone: function(found, resp) {
        if (isObject(resp)) {
          VKMap_geocoder.callback(YGeocoderResponseFromJson(resp));
        } else {
          VKMap_geocoder.error_callback('');
        }
      },
      onFail: function(error) {
        VKMap_geocoder.error_callback(error);
      }
    });
  },
  geocode_callback: function(response) {
    var return_location = {street: '', locality: '', region: '', country: ''};
    var locLev;
    if ((locLev = response.AddressDetails.Country)) {
      return_location.country = locLev.CountryName;
      if (locLev.AdministrativeArea) {
        locLev = locLev.AdministrativeArea;
      }
      return_location.region = locLev.AdministrativeAreaName;
      if (locLev.Locality) {
        locLev = locLev.Locality;
      }
      return_location.locality = locLev.LocalityName;
      if (locLev.Thoroughfare) {
        locLev = locLev.Thoroughfare;
      }
      return_location.street = locLev.ThoroughfareName;
    }
    var ypoint = response.getGeoPoint();
    ybounds = response.getBounds(),
    ltop = ybounds.getLeftTop(),
    rbottom = ybounds.getRightBottom();
    return_location.point = new vkMaps.LatLonPoint(ypoint.getLat(), ypoint.getLng());
    return_location.bounds = new vkMaps.BoundingBox(ltop.getLat(), ltop.getLng(), rbottom.getLat(), rbottom.getLng());
    this.callback(return_location);
  }
}
});

vkMaps.register('google', {
VKMap: {
  init: function(element, api) {
    vkMaps.load(api, (function() {
      var myOptions = {
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        mapTypeControlOptions: null,
        navigationControl: false,
        navigationControlOptions: null,
        panControl: false,
        panControlOption: null,
        scrollwheel: false
      };
      if (!this.addControlsArgs && loadoptions.addControlsArgs) {
        this.addControlsArgs = loadoptions.addControlsArgs;
      }
      if (this.addControlsArgs) {
        if (this.addControlsArgs.zoom) {
          myOptions.navigationControl = true;
          if (this.addControlsArgs.zoom == 'small') {
            myOptions.navigationControlOptions = {style: google.maps.NavigationControlStyle.SMALL};
          }
          if (this.addControlsArgs.zoom == 'large') {
            myOptions.navigationControlOptions = {style: google.maps.NavigationControlStyle.ZOOM_PAN};
          }
        }
      }
      if (element) {
        var map = new google.maps.Map(element, myOptions);
        google.maps.event.addListener(map, 'click', (function(location){
          this.click.fire({'location':
            new vkMaps.LatLonPoint(location.latLng.lat(), location.latLng.lng())
          });
        }).bind(this));
        google.maps.event.addListener(map, 'zoom_changed', (function(){
          this.changeZoom.fire();
        }).bind(this));
        google.maps.event.addListener(map, 'dragend', (function(){
          this.moveendHandler(this);
          this.endPan.fire();
        }).bind(this));
        this.maps[api] = map;
      }
      this.loaded[api] = true;
      this.load.fire();
    }).bind(this), this.lngcode);
  },
  applyOptions: function() {
    var map = this.maps[this.api];
    if (!map) {
      return;
    }
    var myOptions = [];
    if (this.options.enableDragging) {
      myOptions.draggable = true;
    }
    if (this.options.enableScrollWheelZoom){
      myOptions.scrollwheel = true;
    }
    map.setOptions(myOptions);
  },
  resizeTo: function(width, height) {
    this.currentElement.style.width = width;
    this.currentElement.style.height = height;
    var map = this.maps[this.api];
    google.maps.event.trigger(map,'resize');
  },
  addControls: function(args) {
    var map = this.maps[this.api];
    if (args.zoom || args.pan) {
      if (args.zoom == 'large'){
        this.addLargeControls();
      } else {
        this.addSmallControls();
      }
    }
    if (args.scale){
      var myOptions = {
        scaleControl:true,
        scaleControlOptions: {style:google.maps.ScaleControlStyle.DEFAULT}
      };
      map.setOptions(myOptions);
      this.addControlsArgs.scale = true;
    }
  },
  getMap: function() {
    return this.maps[this.api];
  },
  addSmallControls: function() {
    var map = this.maps[this.api];
    var myOptions = {
      navigationControl: true,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
    };
    map.setOptions(myOptions);

    this.addControlsArgs.pan = false;
    this.addControlsArgs.scale = false;
    this.addControlsArgs.zoom = 'small';
  },
  addLargeControls: function() {
    var map = this.maps[this.api];
    var myOptions = {
      navigationControl: true,
      navigationControlOptions: {style:google.maps.NavigationControlStyle.DEFAULT}
    };
    map.setOptions(myOptions);
    this.addControlsArgs.pan = false;
    this.addControlsArgs.zoom = 'large';
  },
  addMapTypeControls: function() {
    var map = this.maps[this.api], onChange, div, input;
    if (map.controls[google.maps.ControlPosition.TOP_RIGHT].length) {
      return;
    }
    onChange = function(type) {
      this.setMapType(intval(type));
    };
    div = ce('div', {className: 'places_map_type'}, {position: 'absolute', zIndex: 10000, background: '#FFF', padding: 0, margin: 10});
    input = ce('input', {id: 'google_type_dd'}, {padding: 0, margin: 0});
    div.appendChild(input);
    new Dropdown(input, vkMaps.VKMap.TYPES_LIST, {
      width: 120,
      dark: 1,
      onChange: onChange.bind(this)
    });
    this.controls.unshift(div);
    this.addControlsArgs.map_type = true;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.controls[0]);
  },
  setCenterAndZoom: function(point, zoom) {
    var map = this.maps[this.api];
    var pt = point.toProprietary(this.api);
    map.setCenter(pt);
    map.setZoom(zoom);
  },
  addMarker: function(marker, old) {
     return marker.toProprietary(this.api);
  },
  removeMarker: function(marker) {
    marker.hide();
  },
  declutterMarkers: function(opts) {
    var map = this.maps[this.api];
  },
  getCenter: function() {
    var map = this.maps[this.api];
    var pt = map.getCenter();
    return new vkMaps.LatLonPoint(pt.lat(),pt.lng());
  },
  setCenter: function(point, options) {
    var map = this.maps[this.api];
    var pt = point.toProprietary(this.api);
    if(options && options.pan) {
      map.panTo(pt);
    }
    else {
      map.setCenter(pt);
    }
  },
  setZoom: function(zoom) {
    var map = this.maps[this.api];
    map.setZoom(zoom);
  },
  getZoom: function() {
    var map = this.maps[this.api];
    return map.getZoom();
  },
  getZoomLevelForBoundingBox: function(bbox) {
    var map = this.maps[this.api];
    var sw = bbox.getSouthWest().toProprietary(this.api);
    var ne = bbox.getNorthEast().toProprietary(this.api);
    var gLatLngBounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(gLatLngBounds);
    return map.getZoom();
  },
  setMapType: function(type) {
    var map = this.maps[this.api];
    switch(type) {
      case vkMaps.VKMap.ROAD:
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        break;
      case vkMaps.VKMap.SATELLITE:
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;
      case vkMaps.VKMap.HYBRID:
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        break;
      default:
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }
  },
  getMapType: function() {
    var map = this.maps[this.api];
    var type = map.getMapTypeId();
    switch(type) {
      case google.maps.MapTypeId.ROADMAP:
        return vkMaps.VKMap.ROAD;
      case google.maps.MapTypeId.SATELLITE:
        return vkMaps.VKMap.SATELLITE;
      case google.maps.MapTypeId.HYBRID:
        return vkMaps.VKMap.HYBRID;
      default:
        return null;
    }
  },
  getBounds: function () {
    var map = this.maps[this.api];
    var gLatLngBounds = map.getBounds();
    if (!gLatLngBounds) {
      throw 'Bounds not available, map must be initialized';
    }
    var sw = gLatLngBounds.getSouthWest();
    var ne = gLatLngBounds.getNorthEast();
    return new vkMaps.BoundingBox(sw.lat(), sw.lng(), ne.lat(), ne.lng());
  },
  setBounds: function(bounds){
    var map = this.maps[this.api];
    var sw = bounds.getSouthWest().toProprietary(this.api);
    var ne = bounds.getNorthEast().toProprietary(this.api);
    var gLatLngBounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(gLatLngBounds);
  },
  removeMap: function() {
    var map = this.maps[this.api];

  }
},

LatLonPoint: {
  toProprietary: function() {
    return new google.maps.LatLng(this.lat, this.lon);
  },
  fromProprietary: function(googlePoint) {
    this.lat = googlePoint.lat();
    this.lon = googlePoint.lng();
  }
},

Marker: {
  toProprietary: function() {
    var options = {},
    ax = 0,
    ay = 0;
    if (this.iconAnchor) {
      ax = this.iconAnchor[0];
      ay = this.iconAnchor[1];
    }
    var gAnchorPoint = new google.maps.Point(ax,ay);
    if (this.iconUrl) {
       options.icon = new google.maps.MarkerImage(
        this.iconUrl,
        new google.maps.Size(this.iconSize[0], this.iconSize[1]),
        new google.maps.Point(0,0),
        gAnchorPoint
      );
      if (this.iconShadowUrl) {
        if (this.iconShadowSize) {
          var x = this.iconShadowSize[0];
          var y = this.iconShadowSize[1];
          options.shadow = new google.maps.MarkerImage(
            this.iconShadowUrl,
            new google.maps.Size(x,y),
            new google.maps.Point(0,0),
            gAnchorPoint
          );
        }
        else {
          options.shadow = new google.maps.MarkerImage(this.iconShadowUrl);
        }
      }
    }
    if (this.draggable){
      options.draggable = this.draggable;
    }
    if (this.labelText){
      options.title =  this.labelText;
    }
    if (this.imageMap){
      options.shape = {
        coord: this.imageMap,
        type: 'poly'
      };
    }
    options.position = this.location.toProprietary(this.api);
    options.map = this.map;
    var marker = new google.maps.Marker(options);
    if (this.infoBubble){
      var event_action = "click";
      if (this.hover) {
        event_action = "mouseover";
      }
      google.maps.event.addListener(marker, event_action, function() {
        marker.VKMap_marker.openBubble();
      });
    }
    if (this.clickable !== undefined) {
      marker.setClickable(this.clickable);
    }
    if (this.hoverIconUrl){
      var gSize = new google.maps.Size(this.iconSize[0], this.iconSize[1]),
      zerozero = new google.maps.Point(0,0),
      hIcon = new google.maps.MarkerImage(this.hoverIconUrl, gSize, zerozero, gAnchorPoint),
      Icon = new google.maps.MarkerImage(this.iconUrl, gSize, zerozero, gAnchorPoint);
      google.maps.event.addListener(marker, "mouseover", function() {
        marker.setIcon(hIcon);
      });
      google.maps.event.addListener(marker, "mouseout", function() {
        marker.setIcon(Icon);
      });
    }
    google.maps.event.addListener(marker, 'click', function() {
      marker.VKMap_marker.click.fire();
    });
    google.maps.event.addListener(marker, 'mousedown', function() {
      marker.VKMap_marker.mousedown.fire();
    });
    google.maps.event.addListener(marker, 'dragend', function() {
      marker.VKMap_marker.dragend.fire();
    });
    return marker;
  },
  openBubble: function() {
    var infowindow = new google.maps.InfoWindow({
         content: this.infoBubble
    });
    google.maps.event.addListener(infowindow, 'closeclick', function(closedWindow) {

    });
    this.openInfoBubble.fire({'marker': this});
    infowindow.open(this.map,this.proprietary_marker);
    this.proprietary_infowindow = infowindow;
  },
  closeBubble: function() {
    if (this.hasOwnProperty('proprietary_infowindow')) {
      this.proprietary_infowindow.close();
      this.closeInfoBubble.fire({'marker': this});
    }
  },
  hide: function() {
    this.proprietary_marker.setOptions({visible:false});
  },
  show: function() {
    this.proprietary_marker.setOptions({visible:true});
  },
  update: function() {
    var point = new vkMaps.LatLonPoint();
    point.fromProprietary('google', this.proprietary_marker.getPosition());
    this.location = point;
  }
},

Geocoder: {
  init: function() {
    this.geocoders[this.api] = new google.maps.Geocoder();
  },
  geocode: function(address){
    var me = this;
    if (address && address.lat && address.lon) {
      var opts = {location: new google.maps.LatLng(address.lat, address.lon)};
    } else if (address && address.location) {
      var opts = {location: address.location};
    } else {
      if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
        address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
      }
      var opts = {'address': address.address}
      if (address.bounds && this.api == 'google') {
        opts.bounds = address.bounds;
      }
    }
    if (address.language) {
      opts.language = address.language;
    }
    this.geocoders[this.api].geocode(opts, function(results, status) {
      me.geocode_callback(results, status);
    });
  },
  geocode_callback: function(results, status){
    var return_location = {};
    if (status != google.maps.GeocoderStatus.OK) {
      this.error_callback(status);
    }
    else {
      return_location.street = '';
      return_location.locality = '';
      return_location.region = '';
      return_location.country = '';
      var place = results[0];
      for (var i = 0; i < place.address_components.length; i++) {
        var addressComponent = place.address_components[i];
        for (var j = 0; j < addressComponent.types.length; j++) {
          var componentType = addressComponent.types[j];
          switch (componentType) {
            case 'country':
              return_location.country = addressComponent.long_name;
              return_location.countryCode = addressComponent.short_name;
              break;
            case 'administrative_area_level_1':
              return_location.region = addressComponent.long_name;
              break;
            case 'locality':
              return_location.locality = addressComponent.long_name;
              break;
            case 'route':
            case 'street_address':
              return_location.street = addressComponent.long_name;
              break;
            case 'train_station':
            case 'transit_station':
            case 'establishment':
              return_location.place = addressComponent.long_name;
              break;
          }
        }
      }
      return_location.point = new vkMaps.LatLonPoint(place.geometry.location.lat(), place.geometry.location.lng());
      var gbounds = place.geometry.viewport,
      ltop = gbounds.getSouthWest(),
      rbottom = gbounds.getNorthEast();
      return_location.bounds = new vkMaps.BoundingBox(ltop.lat(), ltop.lng(), rbottom.lat(), rbottom.lng());
      return_location.sourceBounds = place.geometry.bounds;
      this.callback(return_location);
    }
  }
}
});

vkMaps.mapboxApiId = 'vkmaps.map-an1xcr4f';
vkMaps.mapboxSatellite = 'vkmaps.map-b2y5af4k';
vkMaps.mapboxMixed = 'vkmaps.map-c1iw1x3v';
vkMaps.mapboxApiId_2x = 'vkmaps.map-40lc3e3w';

vkMaps.register('mapbox', {
VKMap: {
  init: function(element, api) {
    vkMaps.load(api, (function() {
      var mapboxLogo = ce('a', {href: 'http://mapbox.com/about/maps/'}, {
        position: 'absolute',
        left: '7px',
        bottom: '5px',
        zIndex: 99999,
        display: 'block',
        width: '80px',
        height: '22px',
        textIndent: '-9999px',
        overflow: 'hidden',
        background: 'url(/images/mapbox'+(window.devicePixelRatio >= 2 ? '_2x' : '')+'.png) 0px 0px no-repeat',
        backgroundSize: '80px 22px',
      });
      element.appendChild(mapboxLogo);
      var mapboxMap = this.maps[api] = L.mapbox.map(element, false, {zoomControl: false});
      mapboxMap.on('click', (function(e) {
        this.click.fire({'location': new vkMaps.LatLonPoint(e.latlng.lat, e.latlng.lng)});
      }).bind(this));
      mapboxMap.on('zoomend', (function(e) {
        this.changeZoom.fire();
      }).bind(this));
      this.tileLayer = L.mapbox.tileLayer(vkMaps.mapboxApiId, {detectRetina: true, retinaVersion: vkMaps.mapboxApiId_2x}).addTo(mapboxMap);
      this.mapType = vkMaps.VKMap.ROAD;
      this.loaded[api] = true;
      this.load.fire();
    }).bind(this));
  },
  applyOptions: function(){
    var map = this.maps[this.api];
    if (!map) {
      return;
    }

    if (this.options.enableScrollWheelZoom){
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disbale();
    }
    if (this.options.enableDragging){
      map.dragging.enable();
    } else {
      map.dragging.disbale();
    }
  },
  resizeTo: function(width, height){
    this.currentElement.style.width = width;
    this.currentElement.style.height = height;
    this.maps[this.api].redraw();
  },
  addControls: function(args) {
    var map = this.maps[this.api];
    if (args.zoom == 'large') {
      this.addLargeControls();
    } else if (args.zoom == 'small') {
      this.addSmallControls();
    }
    if (args.pan) {
      this.controls.unshift(new L.Control.Layers());
      this.addControlsArgs.pan = true;
      map.addControl(this.controls[0]);
    }
    if (args.scale) {
      this.controls.unshift(new L.Control.Scale());
      this.addControlsArgs.scale = true;
      map.addControl(this.controls[0]);
    }
  },
  getMap: function() {
    return this.maps[this.api];
  },
  addSmallControls: function() {
    if (this.addedControls) {
      return;
    }
    this.addedControls = true;
    var map = this.maps[this.api];
    this.controls.unshift(new L.Control.Zoom());
    this.addControlsArgs.zoom = 'small';
    map.addControl(this.controls[0]);
  },
  addLargeControls: function() {
    if (this.addedControls) {
      return;
    }
    this.addedControls = true;
    var map = this.maps[this.api];
    this.controls.unshift(new L.Control.Zoom({}));
    this.addControlsArgs.zoom = 'large';
    map.addControl(this.controls[0]);
  },
  addMapTypeControls: function() {
    var me = this, map = this.maps[this.api];
    var onChange = function(type) {
      this.setMapType(intval(type));
    };
    var Control = L.Control.extend({
      options: {
          position: 'topright'
      },
      onAdd: function (map) {
        var div = geByClass1('places_map_type', map.getContainer());
        if (div) return div;
        div = ce('div', {className: 'places_map_type'}, {backgroundColor: '#FFF', padding: 0, margin: 10}),
        addEvent(div, 'click dblclick mousedown', function(e) {
          return cancelEvent(e);
        });
        input = ce('input', {padding: 0, margin: 0});
        div.appendChild(input);
        new Dropdown(input, vkMaps.VKMap.TYPES_LIST, {
          width: 120,
          dark: 1,
          onChange: onChange.bind(me)
        });
        return div;
      }
    });
    this.controls.unshift(new Control());
    this.addControlsArgs.map_type = true;
    map.addControl(this.controls[0]);
  },
  setCenterAndZoom: function(point, zoom) {
    var map = this.maps[this.api];
    map.setView([point.lat, point.lon], zoom)
    /*pt = point.toProprietary(this.api);
    map.setCenter(pt, zoom);*/
  },
  addMarker: function(marker, old) {
    var map = this.maps[this.api],
    pin = marker.toProprietary(this.api);
    map.addLayer(pin);
    return pin;
  },
  removeMarker: function(marker) {
    var map = this.maps[this.api];
    map.removeLayer(marker.proprietary_marker);
  },
  getCenter: function() {
    var map = this.maps[this.api],
    pt = map.getCenter(),
    point = new vkMaps.LatLonPoint(pt.lat, pt.lng);
    return point;
  },
  setCenter: function(point, options) {
    var map = this.maps[this.api],
    pt = point.toProprietary(this.api);
    map.panTo(pt);
  },
  setZoom: function(zoom) {
    var map = this.maps[this.api];
    map.setZoom(zoom);
  },
  getZoom: function() {
    var map = this.maps[this.api],
    zoom = map.getZoom();
    return zoom;
  },
  getZoomLevelForBoundingBox: function(bbox) {
    var map = this.maps[this.api];
    var ne = bbox.getNorthEast().toProprietary(this.api);
    var sw = bbox.getSouthWest().toProprietary(this.api);

    map.fitBounds([sw, ne]);
    return map.getZoom();
  },
  setMapType: function(type) {
    var map = this.maps[this.api];
    cur.m = map;
    map.removeLayer(this.tileLayer);
    this.mapType = type;

    switch(type) {
      case vkMaps.VKMap.ROAD:
        this.tileLayer = L.mapbox.tileLayer(vkMaps.mapboxApiId).addTo(map);
        break;
      case vkMaps.VKMap.SATELLITE:
        this.tileLayer = L.mapbox.tileLayer(vkMaps.mapboxSatellite).addTo(map);
        break;
      case vkMaps.VKMap.HYBRID:
        this.tileLayer = L.mapbox.tileLayer(vkMaps.mapboxMixed).addTo(map);
        break;
      default:
        this.tileLayer = L.mapbox.tileLayer(vkMaps.mapboxApiId).addTo(map);
    }
  },
  getMapType: function() {
    return this.mapType;
  },
  getBounds: function () {
    var map = this.maps[this.api],
    gbox = map.getBounds(),
    sw = gbox.getSouthWest(),
    ne = gbox.getNorthEast();
    return new vkMaps.BoundingBox(sw.lat, sw.lng, ne.lat, ne.lng);
  },
  setBounds: function(bounds){
    var map = this.maps[this.api],
    sw = bounds.getSouthWest(),
    ne = bounds.getNorthEast();
    map.fitBounds([
      [sw.lat, sw.lon],
      [ne.lat, ne.lon]
    ]);
  },
  removeMap: function() {
    var map = this.maps[this.api];
    map.remove();
  }
},

LatLonPoint: {
  toProprietary: function() {
    return new L.LatLng(this.lat, this.lon);
  },
  fromProprietary: function(mapboxPoint) {
    this.lat = mapboxPoint.lat;
    this.lon = mapboxPoint.lng;
    return this;
  }
},

Marker: {
  toProprietary: function() {
    var options = {
      draggable: this.draggable
    };
    if (this.iconUrl) {
      var iconPreps = {
        iconUrl: this.iconUrl,
        iconSize: this.iconSize,
        iconAnchor: this.iconAnchor
      }

      if (this.iconRetinaUrl) {
        iconPreps.iconRetinaUrl = this.iconRetinaUrl;
      }
      if (this.iconShadowUrl) {
        iconPreps.shadowUrl = this.iconShadowUrl;
        if (this.iconShadowSize) {
          iconPreps.shadowSize = this.iconShadowSize;
        }
      }
      if (this.iconShadowRetinaUrl) {
        iconPreps.shadowRetinaUrl = this.iconShadowRetinaUrl;
      }
      options.icon = L.icon(iconPreps);
    }
    if (this.labelText) {
      options.title = this.labelText;
    }
    var lmarker = new L.Marker(this.location.toProprietary('mapbox'), options);

    // need to add info baloon
    if (this.infoBubble) {
      ymarker.setOptions({hasBalloon: true, hideIcon: true});
      ymarker.setBalloonContent(this.infoBubble);
    }
    lmarker.on('dragend', function(e) {
      var latLon = new vkMaps.LatLonPoint().fromProprietary('mapbox', lmarker.getLatLng());
      this.VKMap_marker.location = latLon;
      if (this.VKMap_marker.dragend) {
        this.VKMap_marker.dragend.fire(latLon);
      }
    });

    return lmarker;
  },
  openBubble: function() {
    this.proprietary_marker.openBalloon();
  },
  closeBubble: function() {
    this.proprietary_marker.closeBalloon();
  },
  hide: function() {
    this.proprietary_marker.hide();
  },
  show: function() {
    this.proprietary_marker.show();
  },
  update: function() {
    point = new vkMaps.LatLonPoint();
    point.fromProprietary('mapbox', this.proprietary_marker.getLatLng());
    this.location = point;
  }
},

Geocoder: {
  init: function() {
    //this.geocoder = L.mapbox.geocoder(vkMaps.mapboxApiId);

    vkMaps.load('yandex', function() {
      this.geocoder = new vkMaps.Geocoder('yandex', (function(place) {
        this.callback(place);
      }).bind(this));
    });
  },
  geocode: function(address) {
    /*if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
      address.address = [address.street, address.locality, address.region, address.country ].join(', ');
    }
    debugLog('send query', address.address);
    this.geocoder.query(address.address, this.geocode_callback.bind(this));*/
  },
  geocode_callback: function(response) {
    //debugLog('geocode callback', response, arguments);
  }
}
});

try{stManager.done('maps.js');}catch(e){}
