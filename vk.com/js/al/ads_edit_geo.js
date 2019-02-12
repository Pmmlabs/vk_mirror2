var AdsEditGeo = {};

AdsEditGeo.MAP_PROVIDER = 'yandex2';

function AdsGeoEditor() {}

AdsGeoEditor.prototype.init = function(mapContainer, options, eventHandlers, geocoderEventHandlers) {
    var defaultOptions = {
        defaultMapCenter: undefined,
        defaultRadius: 500,
        allowedRadiuses: [500],
        defaultMask: 0,
        expandMapButton: false,
        locale: 'ru'
    };
    this.options = extend(defaultOptions, options || {});

    var defaultEventHandlers = {
        onMapClick: function() {},
        onAddingPointClick: function() {},
        onRefreshClick: function() {},
        onExpandClick: function() {},
        onPointAdded: function() {},
        onPointRemoved: function() {},
        onPointUpdated: function() {},
        onPointMarkerClicked: function() {},
        onMapBoundsChanged: function() {},
        onLoaded: function() {}
    };
    this.eventHandlers = extend(defaultEventHandlers, (eventHandlers || {}));

    this.mapContainer = mapContainer;
    mapContainer.innerHTML = getProgressHtml('', 'ads_edit_geo_map_loader');
    var mapOptions = {
        provider: AdsEditGeo.MAP_PROVIDER,
        lngcode: options.locale
    };

    this.map = new vkMaps.VKMap(mapContainer, mapOptions);
    this.points = [];
    this.adding_point = false;

    if (this.map.isLoaded(AdsEditGeo.MAP_PROVIDER)) {
        this.onMapLoaded();
    } else {
        this.map.load.addHandler(this.onMapLoaded.bind(this));
    }

    this.initGeocoder(undefined, geocoderEventHandlers);
};

AdsGeoEditor.prototype.onMapLoaded = function() {
    var buttons = [{
        content: '',
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Hcm91cCAyNDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ItCa0LvQuNC6LdC/0L4t0YLQvtGH0LrQtS3QvdCwLdC60LDRgNGC0LUtKNCy0L7Qt9C80L7QttC90L7RgdGC0Ywt0YPQtNCw0LvQuNGC0Ywt0LzQtdGB0YLQvi3Qv9GA0Y/QvNC+LdGBLdC60LDRgNGC0YspIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTE0LjAwMDAwMCwgLTEzMDIuMDAwMDAwKSIgZmlsbD0iIzY2NjY2NiI+ICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MDEuMDAwMDAwLCAxMTU1LjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwLjAwMDAwMCwgMTAuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCAxMzcuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsOC40ODAwMzI2MiBDNSwxMC4wNTUyMDkyIDYuMzUxNDU3NTQsMTIuMjEyOTYyNCA3LjU3OTE2NjY2LDEzLjg2NTg2NyBDNy45MTM1NzE1NywxNC4zMTYwODcyIDkuNDYwOTk4NTQsMTYgOS40NjA5OTg1NCwxNiBDOS40NjA5OTg1NCwxNiAxMS4wMDk3MTE4LDE0LjQwMjU4MTYgMTEuMzA0OTE4NCwxNC4wMDM3NzkyIEMxMi41NjA2MDg0LDEyLjMwNzQzNDggMTMuOTk0ODk1NSwxMC4wMDczMDczIDEzLjk5NDg5NTUsOC40ODAwMzI2MiBDMTQuMTE2NDQ4Miw1Ljc2ODQzMzkzIDEyLjA1MDA1MzMsNCA5LjYxOTAwMDQxLDQgQzcuMDY2Mzk0OTIsNCA1LDUuNzY4NDMzOTMgNSw4LjQ4MDAzMjYyIFogTTkuNSwxMSBDMTAuODgwNzExOSwxMSAxMiw5Ljg4MDcxMTg3IDEyLDguNSBDMTIsNy4xMTkyODgxMyAxMC44ODA3MTE5LDYgOS41LDYgQzguMTE5Mjg4MTMsNiA3LDcuMTE5Mjg4MTMgNyw4LjUgQzcsOS44ODA3MTE4NyA4LjExOTI4ODEzLDExIDkuNSwxMSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjAsMS41IEwyMCwwIEwxNSwwIEwxNSwyIEwxOCwyIEwxOCw1IEwyMCw1IEwyMCwxLjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsMS41IEw1LDAgTDAsMCBMMCwyIEwzLDIgTDMsNSBMNSw1IEw1LDEuNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNTAwMDAwLCAyLjUwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMi41MDAwMDAsIC0yLjUwMDAwMCkgIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIwLDE2LjUgTDIwLDE1IEwxNSwxNSBMMTUsMTcgTDE4LDE3IEwxOCwyMCBMMjAsMjAgTDIwLDE2LjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNy41MDAwMDAsIDE3LjUwMDAwMCkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTE3LjUwMDAwMCwgLTE3LjUwMDAwMCkgIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsMTYuNSBMNSwxNSBMLTEuMTM2ODY4MzhlLTEzLDE1IEwtMS4xMzY4NjgzOGUtMTMsMTcgTDMsMTcgTDMsMjAgTDUsMjAgTDUsMTYuNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNTAwMDAwLCAxNy41MDAwMDApIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0yLjUwMDAwMCwgLTE3LjUwMDAwMCkgIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
        left: 10,
        top: 91,
        title: getLang('ads_geo_map_fit_tt'),
        onClick: this.updateMap.bind(this)
    }, {
        content: getLang('ads_geo_map_pin'),
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI5cHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDkgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+cGluX21hcDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ItCa0LvQuNC6LdC/0L4t0YLQvtGH0LrQtS3QvdCwLdC60LDRgNGC0LUtKNCy0L7Qt9C80L7QttC90L7RgdGC0Ywt0YPQtNCw0LvQuNGC0Ywt0LzQtdGB0YLQvi3Qv9GA0Y/QvNC+LdGBLdC60LDRgNGC0YspIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODIxLjAwMDAwMCwgLTE1MDYuMDAwMDAwKSI+ICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MDEuMDAwMDAwLCAxMTU1LjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMxNS4wMDAwMDAsIDM0NC4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgIDxnIGlkPSJwaW5fbWFwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjAwMDAwMCwgNy4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iT3ZhbC04OS0rLVNoYXBlLTE2Ij4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNC40ODAwMzI2MiBDMCw2LjA1NTIwOTIxIDEuMzUxNDU3NTQsOC4yMTI5NjI0MyAyLjU3OTE2NjY2LDkuODY1ODY3MDIgQzIuOTEzNTcxNTcsMTAuMzE2MDg3MiA0LjQ2MDk5ODU0LDEyIDQuNDYwOTk4NTQsMTIgQzQuNDYwOTk4NTQsMTIgNi4wMDk3MTE4MywxMC40MDI1ODE2IDYuMzA0OTE4NDMsMTAuMDAzNzc5MiBDNy41NjA2MDg0Myw4LjMwNzQzNDc2IDguOTk0ODk1NTMsNi4wMDczMDczMSA4Ljk5NDg5NTUzLDQuNDgwMDMyNjIgQzkuMTE2NDQ4MTcsMS43Njg0MzM5MyA3LjA1MDA1MzI2LDAgNC42MTkwMDA0MSwwIEMyLjA2NjM5NDkyLDAgMCwxLjc2ODQzMzkzIDAsNC40ODAwMzI2MiBaIiBpZD0iU2hhcGUtMTYiIGZpbGw9IiMyQjJGMzMiPjwvcGF0aD4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC04OSIgZmlsbD0iI0ZGRkZGRiIgY3g9IjQuNSIgY3k9IjQuNSIgcj0iMi41Ij48L2NpcmNsZT4gICAgICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
        maxWidth: 200,
        selectOnClick: true,
        left: 10,
        bottom: 10,
        onClick: function() {
            toggleClass(this.mapContainer, 'ads_geo_pin_map_cursor', !this.adding_point);
            this.adding_point = !this.adding_point;
            if (this.adding_point) {
                this.mapCursor = this.map.getMap().cursors.push('inherit');
            } else if (this.mapCursor) {
                this.mapCursor.remove();
                delete this.mapCursor;
            }
        }.bind(this)
    }];
    if (this.options.expandMapButton) {
        buttons.push({
            content: '',
            image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Db21iaW5lZCBTaGFwZTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ItCg0LXQttC40Lwt0LTQvtCx0LDQstC70LXQvdC40Y8t0L/QuNC90LAt0L3QsC3QutCw0YDRgtGDIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTIwLjAwMDAwMCwgLTI3NC4wMDAwMDApIiBmaWxsPSIjNjY2NjY2Ij4gICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwMS4wMDAwMDAsIDI1OS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTQyMi4wNjczNTgsMjYuMDY3MzU3OSBMNDI0Ljk2MTUxNywyMy41Mzg0ODI3IEw0MjYuNDYxNTE3LDI1LjAzODQ4MjcgTDQyMy45MzI2NDIsMjcuOTMyNjQyMSBMNDI3LDMxIEw0MTkuOTk3MDMsMzEgQzQxOS40NDYzODYsMzEgNDE5LDMwLjU0Njk2MzcgNDE5LDMwLjAwMjk2OTkgTDQxOSwyMyBMNDIyLjA2NzM1OCwyNi4wNjczNTc5IFogTTQzMS45MzI2NDIsMTkuOTMyNjQyMSBMNDI5LjAzODQ4MywyMi40NjE1MTczIEw0MjcuNTM4NDgzLDIwLjk2MTUxNzMgTDQzMC4wNjczNTgsMTguMDY3MzU3OSBMNDI3LDE1IEw0MzQuMDAyOTcsMTUgQzQzNC41NTM2MTQsMTUgNDM1LDE1LjQ1MzAzNjMgNDM1LDE1Ljk5NzAzMDEgTDQzNSwyMyBMNDMxLjkzMjY0MiwxOS45MzI2NDIxIFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==',
            top: 10,
            right: 10,
            title: getLang('ads_geo_map_expand_tt'),
            onClick: this.eventHandlers.onExpandClick
        });
    }
    this.map.addControls({
        zoom: 'small',
        buttons: buttons
    });
    this.map.click.addHandler(this.onMapClick.bind(this));
    this.map.boundschange.addHandler(this.onMapBoundsChanged.bind(this));
    this.tryGetCurrentPosition();
    this.inited = true;
    this.eventHandlers.onLoaded();
};

AdsGeoEditor.prototype.tryGetCurrentPosition = function() {
    if (!navigator.geolocation) {
        return;
    }
    navigator.geolocation.getCurrentPosition(
        function(position) {
            if (!position || !position.coords || !position.coords.latitude || !position.coords.longitude) {
                return;
            }

            this.options.defaultMapCenter = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };

            if (this.points.length == 0) {
                this.updateMap();
            }
        }.bind(this),
        function(error) {}, {
            maximumAge: 3600000
        });
}

AdsGeoEditor.prototype.onMapClick = function(event, map, options) {
    if (!this.adding_point) {
        return;
    }

    var point = options.location;

    this.addPoint(point.lat, point.lon);

    this.geocoder.geocode({
        lat: point.lat,
        lon: point.lon
    });
};

AdsGeoEditor.prototype.onMapBoundsChanged = function(event, map, options) {
    this.eventHandlers.onMapBoundsChanged(options);
};

AdsGeoEditor.prototype.initGeocoder = function(options, eventHandlers) {
    var defaultOptions = {};
    this.geocoderOptions = extend(defaultOptions, options || {});

    var defaultEventHandlers = {
        onSuccess: function() {},
        onFail: function() {}
    };
    this.geocoderEventHandlers = extend(defaultEventHandlers, (eventHandlers || {}));

    this.geocoder = new vkMaps.Geocoder(AdsEditGeo.MAP_PROVIDER, function(response, request_id) {
        var pointArray = request_id.split(',');
        var point = this.getPointByLatLon(pointArray[0], pointArray[1]);
        if (!point) {
            return;
        }
        if (response.text_name) {
            point.caption = response.text_name;
        }
        this.updateMarkerForPoint(point);

        this.geocoderEventHandlers.onSuccess(point.id);
        this.eventHandlers.onPointUpdated(point.id, point, {
            caption: true
        });
    }.bind(this), function(response, request_id) {
        var pointArray = request_id.split(',');
        var point = this.getPointByLatLon(pointArray[0], pointArray[1]);
        if (!point) {
            return;
        }
        this.geocoderEventHandlers.onFail(point.id);
    }.bind(this));
};

AdsGeoEditor.prototype.setMask = function(mask) {
    this.options.defaultMask = mask;

    for (var i = 0; i < this.points.length; ++i) {
        var point = this.points[i];
        point.mask = mask;

        this.eventHandlers.onPointUpdated(point.id, point, {
            mask: true
        });
    }
};

AdsGeoEditor.prototype.setPointsFromString = function(pointsString) {
    while (this.points.length) {
        this.removePoint(this.points[0].id);
    }
    this.points = [];
    var points = pointsString.split(';');
    for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        if (!point) {
            continue;
        }
        var pointInfo = point.split(',');
        if (pointInfo[4] && pointInfo.length > 5) {
            pointInfo[4] = pointInfo.slice(4).join(',');
            pointInfo.splice(5);
        }

        this.addPoint(pointInfo[0], pointInfo[1], pointInfo[2], pointInfo[3], pointInfo[4]);
    }
    this.updateMap();
};

AdsGeoEditor.prototype.setPointsFromArray = function(pointsArray) {
    while (this.points.length) {
        this.removePoint(this.points[0].id);
    }
    this.points = [];

    for (var i = 0; i < pointsArray.length; ++i) {
        var point = pointsArray[i];
        if (!point) {
            continue;
        }

        this.addPoint(point.lat, point.lon, point.radius, point.mask, point.caption, point.audience, point.audienceGeoNearOnly);
    }
    this.updateMap();
};

AdsGeoEditor.prototype.savePointsToString = function() {
    var result = [];
    for (var i = 0; i < this.points.length; ++i) {
        var point = this.points[i];

        result.push([
            parseFloat(point.lat).toFixed(5),
            parseFloat(point.lon).toFixed(5),
            point.radius,
            this.options.defaultMask,
            point.caption
        ].join(','));
    }

    return result.join(';');
};

AdsGeoEditor.prototype.addPoint = function(lat, lon, radius, mask, caption, audience, audienceGeoNearOnly) {
    var originalRadius = radius;
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    radius = parseInt(radius);
    audience = (audience === undefined) ? audience : parseInt(audience);

    if (lat < -80 || lat > 80) {
        return false;
    }
    if (lon < -180 || lon > 180) {
        return false;
    }
    if (isNaN(radius)) {
        if (originalRadius !== undefined) {
            return false;
        }
    } else {
        if (!inArray(radius, this.options.allowedRadiuses)) {
            return false;
        }
    }

    var pointLat = lat.toFixed(5);
    var pointLon = lon.toFixed(5);
    var pointRadius = radius || this.options.defaultRadius;
    var pointMask = parseInt(mask) || this.options.defaultMask;
    var pointCaption = caption || ('(' + pointLat + ', ' + pointLon + ')');
    var id = [pointLat, pointLon, pointRadius].join(',');

    if (this.getPointIndexById(id) !== undefined) {
        return false;
    }
    if (this.getPointByLatLon(lat, lon) !== undefined) {
        return false;
    }

    var newPoint = {
        id: id,
        lat: lat,
        lon: lon,
        radius: pointRadius,
        mask: pointMask,
        caption: pointCaption,
        marker: undefined,
        audience: audience,
        audienceGeoNearOnly: audienceGeoNearOnly
    };

    this.points.push(newPoint);

    this.eventHandlers.onPointAdded(newPoint);

    this.addMarkerForPoint(newPoint);
    return newPoint.id;
};

AdsGeoEditor.prototype.removePoint = function(pointID) {
    var pointIndex = this.getPointIndexById(pointID);
    var point = this.points[pointIndex];
    if (!point) {
        return;
    }

    if (point.marker) {
        this.removeMarkerForPoint(point);
    }
    this.points.splice(pointIndex, 1);

    this.eventHandlers.onPointRemoved(pointID);
};

AdsGeoEditor.prototype.setPointRadius = function(pointID, newRadius) {
    var pointIndex = this.getPointIndexById(pointID);
    var point = this.points[pointIndex];
    if (!point) {
        return;
    }

    point.id = [
        parseFloat(point.lat).toFixed(5),
        parseFloat(point.lon).toFixed(5),
        newRadius
    ].join(',');
    point.radius = parseInt(newRadius);
    point.audience = undefined;
    point.audienceGeoNearOnly = undefined;
    this.updateMarkerForPoint(point);
    this.eventHandlers.onPointUpdated(pointID, point, {
        id: true,
        radius: true,
        audience: true
    });

    return point.id;
};

AdsGeoEditor.prototype.setPointAudience = function(pointID, newAudience, newAudienceGeoNearOnly) {
    var pointIndex = this.getPointIndexById(pointID);
    var point = this.points[pointIndex];
    if (!point) {
        return;
    }

    point.audience = newAudience;
    point.audienceGeoNearOnly = newAudienceGeoNearOnly;
    this.updateMarkerForPoint(point);
    this.eventHandlers.onPointUpdated(pointID, point, {
        audience: true
    });

    return point.id;
};

AdsGeoEditor.prototype.getPointByLatLon = function(lat, lon) {
    lat = parseFloat(lat).toFixed(5);
    lon = parseFloat(lon).toFixed(5);
    for (var i = 0; i < this.points.length; ++i) {
        if (
            parseFloat(this.points[i].lat).toFixed(5) == lat &&
            parseFloat(this.points[i].lon).toFixed(5) == lon
        ) {
            return this.points[i];
        }
    }

    return undefined;
};

AdsGeoEditor.prototype.getPointIndexById = function(id) {
    for (var i = 0; i < this.points.length; ++i) {
        if (this.points[i].id == id) {
            return i;
        }
    }

    return undefined;
};

AdsGeoEditor.prototype.havePointsWithUnallowedRadius = function() {
    return !!this.points.filter(function(p) {
        return !inArray(p.radius, this.options.allowedRadiuses)
    }.bind(this)).length;
};

AdsGeoEditor.prototype.removeMarkerForPoint = function(point) {
    if (!point.marker) {
        return;
    }

    this.map.removeMarker(point.marker);
    delete point.marker;
};

AdsGeoEditor.prototype.getMarkerInfoBubbleContent = function(point) {
    var audienceLabel = '<div class="ads_geo_point_reach">' + getLang('ads_geo_point_reach') + ' ' + this.formatPointAudience(point.audience, point.audienceGeoNearOnly, true) + ' <a data-title="' + getLang('ads_geo_point_reach_tt') + '" onmouseover="showHint(this, { width: 230, appendEl: gpeByClass(\'ads_edit_geo_radius_tt_container\', this) });">[?]</a></div>';

    return point.caption +
        audienceLabel +
        '<a class="ads_geo_map_remove_point" onclick="window.clickedRemovePointID=\'' + point.id + '\';setTimeout(function () { window.clickedRemovePointID = \'\';}, 100);">' +
        getLang('ads_geo_remove_point') +
        '</a>';
};

AdsGeoEditor.prototype.addMarkerForPoint = function(point) {
    var marker = new vkMaps.Marker(new vkMaps.LatLonPoint(point.lat, point.lon));

    marker.dragend.addHandler(function(event, marker, latLon) {
        var lat = latLon.lat.toFixed(5);
        var lon = latLon.lon.toFixed(5);

        var oldID = marker.getAttribute('pointID');
        var newID = lat + ',' + lon + ',' + marker.getAttribute('pointRadius');
        var newText = '(' + lat + ', ' + lon + ')';

        var pointIndex = this.getPointIndexById(oldID);
        var point = this.points[pointIndex];

        point.id = newID;
        point.lat = latLon.lat;
        point.lon = latLon.lon;
        point.caption = newText;
        point.audience = undefined;
        point.audienceGeoNearOnly = undefined;
        this.eventHandlers.onPointUpdated(oldID, point, {
            id: true,
            coords: true,
            caption: true,
            audience: true
        });

        marker.setAttribute('pointID', newID);

        this.updateMarkerForPoint(point);

        this.geocoder.geocode({
            lat: lat,
            lon: lon
        });
    }.bind(this));

    /*  marker.mouseenter.addHandler(function (event, marker, latLon) {
        var pointID = marker.getAttribute('pointID');
        this.highlightPoint(pointID, true);
      }.bind(this));
      marker.mouseleave.addHandler(function (event, marker, latLon) {
        var pointID = marker.getAttribute('pointID');
        this.highlightPoint(pointID, false);
      }.bind(this));*/
    marker.clickCircle.addHandler(function(event, marker, options) {
        this.onMapClick(event, marker.map, options);
    }.bind(this));

    this.map.addMarkerWithData(marker, {
        draggable: true,
        pointID: point.id,
        pointRadius: point.radius,
        icon: '/images/map/marker.png',
        icon2x: '/images/map/marker_2x.png',
        iconSize: [26, 23],
        iconAnchor: [7, 23],
        infoBubble: this.getMarkerInfoBubbleContent(point),
        circle: {
            radius: point.radius,
            fillColor: "#FFFFFF77",
            strokeColor: "#C1C9D1",
            strokeWidth: 1,
            cursor: 'drag'
        }
    });
    marker.clickInfoBubble.addHandler(function(eventType, eventMarker, e) {
        if (window.clickedRemovePointID) {
            this.removePoint(clickedRemovePointID);
            window.clickedRemovePointID = '';
        }
    }.bind(this));
    marker.click.addHandler(function(eventType, eventMarker, e) {
        this.eventHandlers.onPointMarkerClicked(eventMarker.getAttribute('pointID'));
    }.bind(this));
    point.marker = marker;
};

AdsGeoEditor.prototype.updateMarkerForPoint = function(point) {
    if (!point.marker) {
        return this.addMarkerForPoint(point);
    }

    point.marker.setAttribute('pointID', point.id);
    point.marker.setAttribute('pointRadius', point.radius);
    point.marker.proprietary_circle.geometry.setRadius(point.radius);

    point.marker.setCoordinates(point);
    point.marker.proprietary_circle.geometry.setCoordinates([point.lat, point.lon]);

    point.marker.setInfoBubbleContent(this.getMarkerInfoBubbleContent(point));
};

AdsGeoEditor.prototype.focusOnPoint = function(pointID) {
    var pointIndex = this.getPointIndexById(pointID);
    var point = this.points[pointIndex];
    if (!point) {
        return;
    }

    this.map.setCenter(new vkMaps.LatLonPoint(point.lat, point.lon), {
        pan: true
    });
};

AdsGeoEditor.prototype.highlightPoint = function(pointID, bright) {
    var pointIndex = this.getPointIndexById(pointID);
    var point = this.points[pointIndex];
    if (!point) {
        return;
    }

    if (!point.marker || !point.marker.proprietary_circle) {
        return;
    }

    point.marker.proprietary_circle.options.set('fillColor', bright ? '#FAFAFFBB' : '#FFFFFF77');
    point.marker.proprietary_circle.options.set('strokeColor', bright ? '#84ABD2' : '#C1C9D1');
};

AdsGeoEditor.prototype.updateMap = function(focusPointID) {
    var map = this.map;

    var boundingBoxPoints = this.points;

    if (!this.points.length) { // no points
        map.setCenterAndZoom(new vkMaps.LatLonPoint(this.options.defaultMapCenter.lat, this.options.defaultMapCenter.lon), 9);
        return;
    }

    var c = 1.1 * 1.0 / (111.0 * 1000.0); // deg/m (~111km per 1 degree + 10% safety zone)
    var boundingBox = [
        [80, 180],
        [-80, -180]
    ];

    if (focusPointID) {
        var focusPointIndex = this.getPointIndexById(focusPointID);
        var focusPoint = this.points[focusPointIndex];
        if (focusPoint) {
            boundingBoxPoints = [focusPoint];
        }
    }

    for (var i = 0; i < boundingBoxPoints.length; ++i) {
        var point = boundingBoxPoints[i];

        boundingBox[0][0] = Math.min(boundingBox[0][0], (point.lat - point.radius * c));
        boundingBox[1][0] = Math.max(boundingBox[1][0], (point.lat + point.radius * c));
        boundingBox[0][1] = Math.min(boundingBox[0][1], (point.lon - point.radius * c));
        boundingBox[1][1] = Math.max(boundingBox[1][1], (point.lon + point.radius * c));
    }
    map.setBounds(new vkMaps.BoundingBox(boundingBox[0][0], boundingBox[0][1], boundingBox[1][0], boundingBox[1][1]));
};

AdsGeoEditor.prototype.formatPointAudience = function(audience, audienceGeoNearOnly, long) {
    if (audience === undefined) {
        return getProgressHtml();
    }

    var audienceFirst = audience;
    var audienceLast = audienceGeoNearOnly;
    if (audienceLast == undefined) {
        audienceLast = audienceFirst;
        audienceFirst = undefined;
    }

    var prefix = '';
    if (audienceFirst !== undefined) {
        if (audienceFirst < 100) {
            prefix = '<100';
        } else {
            prefix = langNumeric(audienceFirst, '%s', true);
        }
    }

    var result;
    if (audienceLast < 100) {
        if (long) {
            result = '<' + getLang('ads_target_audience_short', 100);
        } else {
            result = '<100';
        }
    } else {
        if (long) {
            result = getLang('ads_target_audience_short', audienceLast, true);
        } else {
            result = langNumeric(audienceLast, '%s', true);
        }
    }

    return (prefix ? (prefix + ' / ') : '') + result;
};

try {
    stManager.done('ads_edit_geo.js');
} catch (e) {}