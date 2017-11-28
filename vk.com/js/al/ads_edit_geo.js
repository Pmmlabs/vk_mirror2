function AdsGeoEditor() {}
var AdsEditGeo = {};
AdsEditGeo.MAP_PROVIDER = "yandex2", AdsGeoEditor.prototype.init = function(t, i, o, e) {
    var n = {
        defaultMapCenter: void 0,
        defaultRadius: 500,
        allowedRadiuses: [500],
        defaultMask: 0,
        expandMapButton: !1,
        locale: "ru"
    };
    this.options = extend(n, i || {});
    var a = {
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
    this.eventHandlers = extend(a, o || {}), this.mapContainer = t, t.innerHTML = getProgressHtml("", "ads_edit_geo_map_loader");
    var d = {
        provider: AdsEditGeo.MAP_PROVIDER,
        lngcode: i.locale
    };
    this.map = new vkMaps.VKMap(t, d), this.points = [], this.adding_point = !1, this.map.isLoaded(AdsEditGeo.MAP_PROVIDER) ? this.onMapLoaded() : this.map.load.addHandler(this.onMapLoaded.bind(this)), this.initGeocoder(void 0, e)
}, AdsGeoEditor.prototype.onMapLoaded = function() {
    var t = [{
        content: "",
        image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Hcm91cCAyNDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ItCa0LvQuNC6LdC/0L4t0YLQvtGH0LrQtS3QvdCwLdC60LDRgNGC0LUtKNCy0L7Qt9C80L7QttC90L7RgdGC0Ywt0YPQtNCw0LvQuNGC0Ywt0LzQtdGB0YLQvi3Qv9GA0Y/QvNC+LdGBLdC60LDRgNGC0YspIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTE0LjAwMDAwMCwgLTEzMDIuMDAwMDAwKSIgZmlsbD0iIzY2NjY2NiI+ICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MDEuMDAwMDAwLCAxMTU1LjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwLjAwMDAwMCwgMTAuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCAxMzcuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsOC40ODAwMzI2MiBDNSwxMC4wNTUyMDkyIDYuMzUxNDU3NTQsMTIuMjEyOTYyNCA3LjU3OTE2NjY2LDEzLjg2NTg2NyBDNy45MTM1NzE1NywxNC4zMTYwODcyIDkuNDYwOTk4NTQsMTYgOS40NjA5OTg1NCwxNiBDOS40NjA5OTg1NCwxNiAxMS4wMDk3MTE4LDE0LjQwMjU4MTYgMTEuMzA0OTE4NCwxNC4wMDM3NzkyIEMxMi41NjA2MDg0LDEyLjMwNzQzNDggMTMuOTk0ODk1NSwxMC4wMDczMDczIDEzLjk5NDg5NTUsOC40ODAwMzI2MiBDMTQuMTE2NDQ4Miw1Ljc2ODQzMzkzIDEyLjA1MDA1MzMsNCA5LjYxOTAwMDQxLDQgQzcuMDY2Mzk0OTIsNCA1LDUuNzY4NDMzOTMgNSw4LjQ4MDAzMjYyIFogTTkuNSwxMSBDMTAuODgwNzExOSwxMSAxMiw5Ljg4MDcxMTg3IDEyLDguNSBDMTIsNy4xMTkyODgxMyAxMC44ODA3MTE5LDYgOS41LDYgQzguMTE5Mjg4MTMsNiA3LDcuMTE5Mjg4MTMgNyw4LjUgQzcsOS44ODA3MTE4NyA4LjExOTI4ODEzLDExIDkuNSwxMSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjAsMS41IEwyMCwwIEwxNSwwIEwxNSwyIEwxOCwyIEwxOCw1IEwyMCw1IEwyMCwxLjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsMS41IEw1LDAgTDAsMCBMMCwyIEwzLDIgTDMsNSBMNSw1IEw1LDEuNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNTAwMDAwLCAyLjUwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMi41MDAwMDAsIC0yLjUwMDAwMCkgIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIwLDE2LjUgTDIwLDE1IEwxNSwxNSBMMTUsMTcgTDE4LDE3IEwxOCwyMCBMMjAsMjAgTDIwLDE2LjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNy41MDAwMDAsIDE3LjUwMDAwMCkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTE3LjUwMDAwMCwgLTE3LjUwMDAwMCkgIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUsMTYuNSBMNSwxNSBMLTEuMTM2ODY4MzhlLTEzLDE1IEwtMS4xMzY4NjgzOGUtMTMsMTcgTDMsMTcgTDMsMjAgTDUsMjAgTDUsMTYuNSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNTAwMDAwLCAxNy41MDAwMDApIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC0yLjUwMDAwMCwgLTE3LjUwMDAwMCkgIj48L3BhdGg+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=",
        left: 10,
        top: 91,
        title: getLang("ads_geo_map_fit_tt"),
        onClick: this.updateMap.bind(this)
    }, {
        content: getLang("ads_geo_map_pin"),
        image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI5cHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDkgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+cGluX21hcDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ItCa0LvQuNC6LdC/0L4t0YLQvtGH0LrQtS3QvdCwLdC60LDRgNGC0LUtKNCy0L7Qt9C80L7QttC90L7RgdGC0Ywt0YPQtNCw0LvQuNGC0Ywt0LzQtdGB0YLQvi3Qv9GA0Y/QvNC+LdGBLdC60LDRgNGC0YspIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODIxLjAwMDAwMCwgLTE1MDYuMDAwMDAwKSI+ICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MDEuMDAwMDAwLCAxMTU1LjAwMDAwMCkiPiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMxNS4wMDAwMDAsIDM0NC4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgIDxnIGlkPSJwaW5fbWFwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjAwMDAwMCwgNy4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iT3ZhbC04OS0rLVNoYXBlLTE2Ij4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNC40ODAwMzI2MiBDMCw2LjA1NTIwOTIxIDEuMzUxNDU3NTQsOC4yMTI5NjI0MyAyLjU3OTE2NjY2LDkuODY1ODY3MDIgQzIuOTEzNTcxNTcsMTAuMzE2MDg3MiA0LjQ2MDk5ODU0LDEyIDQuNDYwOTk4NTQsMTIgQzQuNDYwOTk4NTQsMTIgNi4wMDk3MTE4MywxMC40MDI1ODE2IDYuMzA0OTE4NDMsMTAuMDAzNzc5MiBDNy41NjA2MDg0Myw4LjMwNzQzNDc2IDguOTk0ODk1NTMsNi4wMDczMDczMSA4Ljk5NDg5NTUzLDQuNDgwMDMyNjIgQzkuMTE2NDQ4MTcsMS43Njg0MzM5MyA3LjA1MDA1MzI2LDAgNC42MTkwMDA0MSwwIEMyLjA2NjM5NDkyLDAgMCwxLjc2ODQzMzkzIDAsNC40ODAwMzI2MiBaIiBpZD0iU2hhcGUtMTYiIGZpbGw9IiMyQjJGMzMiPjwvcGF0aD4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC04OSIgZmlsbD0iI0ZGRkZGRiIgY3g9IjQuNSIgY3k9IjQuNSIgcj0iMi41Ij48L2NpcmNsZT4gICAgICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=",
        maxWidth: 200,
        selectOnClick: !0,
        left: 10,
        bottom: 10,
        onClick: function() {
            toggleClass(this.mapContainer, "ads_geo_pin_map_cursor", !this.adding_point), this.adding_point = !this.adding_point, this.adding_point ? this.mapCursor = this.map.getMap().cursors.push("inherit") : this.mapCursor && (this.mapCursor.remove(), delete this.mapCursor)
        }.bind(this)
    }];
    this.options.expandMapButton && t.push({
        content: "",
        image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Db21iaW5lZCBTaGFwZTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ItCg0LXQttC40Lwt0LTQvtCx0LDQstC70LXQvdC40Y8t0L/QuNC90LAt0L3QsC3QutCw0YDRgtGDIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTIwLjAwMDAwMCwgLTI3NC4wMDAwMDApIiBmaWxsPSIjNjY2NjY2Ij4gICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwMS4wMDAwMDAsIDI1OS4wMDAwMDApIj4gICAgICAgICAgICAgICAgPHBhdGggZD0iTTQyMi4wNjczNTgsMjYuMDY3MzU3OSBMNDI0Ljk2MTUxNywyMy41Mzg0ODI3IEw0MjYuNDYxNTE3LDI1LjAzODQ4MjcgTDQyMy45MzI2NDIsMjcuOTMyNjQyMSBMNDI3LDMxIEw0MTkuOTk3MDMsMzEgQzQxOS40NDYzODYsMzEgNDE5LDMwLjU0Njk2MzcgNDE5LDMwLjAwMjk2OTkgTDQxOSwyMyBMNDIyLjA2NzM1OCwyNi4wNjczNTc5IFogTTQzMS45MzI2NDIsMTkuOTMyNjQyMSBMNDI5LjAzODQ4MywyMi40NjE1MTczIEw0MjcuNTM4NDgzLDIwLjk2MTUxNzMgTDQzMC4wNjczNTgsMTguMDY3MzU3OSBMNDI3LDE1IEw0MzQuMDAyOTcsMTUgQzQzNC41NTM2MTQsMTUgNDM1LDE1LjQ1MzAzNjMgNDM1LDE1Ljk5NzAzMDEgTDQzNSwyMyBMNDMxLjkzMjY0MiwxOS45MzI2NDIxIFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==",
        top: 10,
        right: 10,
        title: getLang("ads_geo_map_expand_tt"),
        onClick: this.eventHandlers.onExpandClick
    }), this.map.addControls({
        zoom: "small",
        buttons: t
    }), this.map.click.addHandler(this.onMapClick.bind(this)), this.map.boundschange.addHandler(this.onMapBoundsChanged.bind(this)), this.tryGetCurrentPosition(), this.inited = !0, this.eventHandlers.onLoaded()
}, AdsGeoEditor.prototype.tryGetCurrentPosition = function() {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(t) {
        t && t.coords && t.coords.latitude && t.coords.longitude && (this.options.defaultMapCenter = {
            lat: t.coords.latitude,
            lon: t.coords.longitude
        }, 0 == this.points.length && this.updateMap())
    }.bind(this), function(t) {}, {
        maximumAge: 36e5
    })
}, AdsGeoEditor.prototype.onMapClick = function(t, i, o) {
    if (this.adding_point) {
        var e = o.location;
        this.addPoint(e.lat, e.lon), this.geocoder.geocode({
            lat: e.lat,
            lon: e.lon
        })
    }
}, AdsGeoEditor.prototype.onMapBoundsChanged = function(t, i, o) {
    this.eventHandlers.onMapBoundsChanged(o)
}, AdsGeoEditor.prototype.initGeocoder = function(t, i) {
    var o = {};
    this.geocoderOptions = extend(o, t || {});
    var e = {
        onSuccess: function() {},
        onFail: function() {}
    };
    this.geocoderEventHandlers = extend(e, i || {}), this.geocoder = new vkMaps.Geocoder(AdsEditGeo.MAP_PROVIDER, function(t, i) {
        var o = i.split(","),
            e = this.getPointByLatLon(o[0], o[1]);
        e && (t.text_name && (e.caption = t.text_name), this.updateMarkerForPoint(e), this.geocoderEventHandlers.onSuccess(e.id), this.eventHandlers.onPointUpdated(e.id, e, {
            caption: !0
        }))
    }.bind(this), function(t, i) {
        var o = i.split(","),
            e = this.getPointByLatLon(o[0], o[1]);
        e && this.geocoderEventHandlers.onFail(e.id)
    }.bind(this))
}, AdsGeoEditor.prototype.setMask = function(t) {
    this.options.defaultMask = t;
    for (var i = 0; i < this.points.length; ++i) {
        var o = this.points[i];
        o.mask = t, this.eventHandlers.onPointUpdated(o.id, o, {
            mask: !0
        })
    }
}, AdsGeoEditor.prototype.setPointsFromString = function(t) {
    for (; this.points.length;) this.removePoint(this.points[0].id);
    this.points = [];
    for (var i = t.split(";"), o = 0; o < i.length; ++o) {
        var e = i[o];
        if (e) {
            var n = e.split(",");
            n[4] && n.length > 5 && (n[4] = n.slice(4).join(","), n.splice(5)), this.addPoint(n[0], n[1], n[2], n[3], n[4])
        }
    }
    this.updateMap()
}, AdsGeoEditor.prototype.setPointsFromArray = function(t) {
    for (; this.points.length;) this.removePoint(this.points[0].id);
    this.points = [];
    for (var i = 0; i < t.length; ++i) {
        var o = t[i];
        o && this.addPoint(o.lat, o.lon, o.radius, o.mask, o.caption, o.audience, o.audienceGeoNearOnly)
    }
    this.updateMap()
}, AdsGeoEditor.prototype.savePointsToString = function() {
    for (var t = [], i = 0; i < this.points.length; ++i) {
        var o = this.points[i];
        t.push([parseFloat(o.lat).toFixed(5), parseFloat(o.lon).toFixed(5), o.radius, this.options.defaultMask, o.caption].join(","))
    }
    return t.join(";")
}, AdsGeoEditor.prototype.addPoint = function(t, i, o, e, n, a, d) {
    var s = o;
    if (t = parseFloat(t), i = parseFloat(i), o = parseInt(o), a = void 0 === a ? a : parseInt(a), -80 > t || t > 80) return !1;
    if (-180 > i || i > 180) return !1;
    if (isNaN(o)) {
        if (void 0 !== s) return !1
    } else if (!inArray(o, this.options.allowedRadiuses)) return !1;
    var g = t.toFixed(5),
        I = i.toFixed(5),
        r = o || this.options.defaultRadius,
        M = parseInt(e) || this.options.defaultMask,
        A = n || "(" + g + ", " + I + ")",
        C = [g, I, r].join(",");
    if (void 0 !== this.getPointIndexById(C)) return !1;
    if (void 0 !== this.getPointByLatLon(t, i)) return !1;
    var c = {
        id: C,
        lat: t,
        lon: i,
        radius: r,
        mask: M,
        caption: A,
        marker: void 0,
        audience: a,
        audienceGeoNearOnly: d
    };
    return this.points.push(c), this.eventHandlers.onPointAdded(c), this.addMarkerForPoint(c), c.id
}, AdsGeoEditor.prototype.removePoint = function(t) {
    var i = this.getPointIndexById(t),
        o = this.points[i];
    o && (o.marker && this.removeMarkerForPoint(o), this.points.splice(i, 1), this.eventHandlers.onPointRemoved(t))
}, AdsGeoEditor.prototype.setPointRadius = function(t, i) {
    var o = this.getPointIndexById(t),
        e = this.points[o];
    return e ? (e.id = [parseFloat(e.lat).toFixed(5), parseFloat(e.lon).toFixed(5), i].join(","), e.radius = parseInt(i), e.audience = void 0, e.audienceGeoNearOnly = void 0, this.updateMarkerForPoint(e), this.eventHandlers.onPointUpdated(t, e, {
        id: !0,
        radius: !0,
        audience: !0
    }), e.id) : void 0
}, AdsGeoEditor.prototype.setPointAudience = function(t, i, o) {
    var e = this.getPointIndexById(t),
        n = this.points[e];
    return n ? (n.audience = i, n.audienceGeoNearOnly = o, this.updateMarkerForPoint(n), this.eventHandlers.onPointUpdated(t, n, {
        audience: !0
    }), n.id) : void 0
}, AdsGeoEditor.prototype.getPointByLatLon = function(t, i) {
    t = parseFloat(t).toFixed(5), i = parseFloat(i).toFixed(5);
    for (var o = 0; o < this.points.length; ++o)
        if (parseFloat(this.points[o].lat).toFixed(5) == t && parseFloat(this.points[o].lon).toFixed(5) == i) return this.points[o]
}, AdsGeoEditor.prototype.getPointIndexById = function(t) {
    for (var i = 0; i < this.points.length; ++i)
        if (this.points[i].id == t) return i
}, AdsGeoEditor.prototype.havePointsWithUnallowedRadius = function() {
    return !!this.points.filter(function(t) {
        return !inArray(t.radius, this.options.allowedRadiuses)
    }.bind(this)).length
}, AdsGeoEditor.prototype.removeMarkerForPoint = function(t) {
    t.marker && (this.map.removeMarker(t.marker), delete t.marker)
}, AdsGeoEditor.prototype.getMarkerInfoBubbleContent = function(t) {
    var i = '<div class="ads_geo_point_reach">' + getLang("ads_geo_point_reach") + " " + this.formatPointAudience(t.audience, t.audienceGeoNearOnly, !0) + ' <a data-title="' + getLang("ads_geo_point_reach_tt") + '" onmouseover="showHint(this, { width: 230, appendEl: gpeByClass(\'ads_edit_geo_radius_tt_container\', this) });">[?]</a></div>';
    return t.caption + i + '<a class="ads_geo_map_remove_point" onclick="window.clickedRemovePointID=\'' + t.id + "';setTimeout(function () { window.clickedRemovePointID = '';}, 100);\">" + getLang("ads_geo_remove_point") + "</a>"
}, AdsGeoEditor.prototype.addMarkerForPoint = function(t) {
    var i = new vkMaps.Marker(new vkMaps.LatLonPoint(t.lat, t.lon));
    i.dragend.addHandler(function(t, i, o) {
        var e = o.lat.toFixed(5),
            n = o.lon.toFixed(5),
            a = i.getAttribute("pointID"),
            d = e + "," + n + "," + i.getAttribute("pointRadius"),
            s = "(" + e + ", " + n + ")",
            g = this.getPointIndexById(a),
            I = this.points[g];
        I.id = d, I.lat = o.lat, I.lon = o.lon, I.caption = s, I.audience = void 0, I.audienceGeoNearOnly = void 0, this.eventHandlers.onPointUpdated(a, I, {
            id: !0,
            coords: !0,
            caption: !0,
            audience: !0
        }), i.setAttribute("pointID", d), this.updateMarkerForPoint(I), this.geocoder.geocode({
            lat: e,
            lon: n
        })
    }.bind(this)), i.clickCircle.addHandler(function(t, i, o) {
        this.onMapClick(t, i.map, o)
    }.bind(this)), this.map.addMarkerWithData(i, {
        draggable: !0,
        pointID: t.id,
        pointRadius: t.radius,
        icon: "/images/map/marker.png",
        icon2x: "/images/map/marker_2x.png",
        iconSize: [26, 23],
        iconAnchor: [7, 23],
        infoBubble: this.getMarkerInfoBubbleContent(t),
        circle: {
            radius: t.radius,
            fillColor: "#FFFFFF77",
            strokeColor: "#C1C9D1",
            strokeWidth: 1,
            cursor: "drag"
        }
    }), i.clickInfoBubble.addHandler(function(t, i, o) {
        window.clickedRemovePointID && (this.removePoint(clickedRemovePointID), window.clickedRemovePointID = "")
    }.bind(this)), i.click.addHandler(function(t, i, o) {
        this.eventHandlers.onPointMarkerClicked(i.getAttribute("pointID"))
    }.bind(this)), t.marker = i
}, AdsGeoEditor.prototype.updateMarkerForPoint = function(t) {
    return t.marker ? (t.marker.setAttribute("pointID", t.id), t.marker.setAttribute("pointRadius", t.radius), t.marker.proprietary_circle.geometry.setRadius(t.radius), t.marker.setCoordinates(t), t.marker.proprietary_circle.geometry.setCoordinates([t.lat, t.lon]), void t.marker.setInfoBubbleContent(this.getMarkerInfoBubbleContent(t))) : this.addMarkerForPoint(t)
}, AdsGeoEditor.prototype.focusOnPoint = function(t) {
    var i = this.getPointIndexById(t),
        o = this.points[i];
    o && this.map.setCenter(new vkMaps.LatLonPoint(o.lat, o.lon), {
        pan: !0
    })
}, AdsGeoEditor.prototype.highlightPoint = function(t, i) {
    var o = this.getPointIndexById(t),
        e = this.points[o];
    e && e.marker && e.marker.proprietary_circle && (e.marker.proprietary_circle.options.set("fillColor", i ? "#FAFAFFBB" : "#FFFFFF77"), e.marker.proprietary_circle.options.set("strokeColor", i ? "#84ABD2" : "#C1C9D1"))
}, AdsGeoEditor.prototype.updateMap = function(t) {
    var i = this.map,
        o = this.points;
    if (!this.points.length) return void i.setCenterAndZoom(new vkMaps.LatLonPoint(this.options.defaultMapCenter.lat, this.options.defaultMapCenter.lon), 9);
    var e = 1.1 / 111e3,
        n = [
            [80, 180],
            [-80, -180]
        ];
    if (t) {
        var a = this.getPointIndexById(t),
            d = this.points[a];
        d && (o = [d])
    }
    for (var s = 0; s < o.length; ++s) {
        var g = o[s];
        n[0][0] = Math.min(n[0][0], g.lat - g.radius * e), n[1][0] = Math.max(n[1][0], g.lat + g.radius * e), n[0][1] = Math.min(n[0][1], g.lon - g.radius * e), n[1][1] = Math.max(n[1][1], g.lon + g.radius * e)
    }
    i.setBounds(new vkMaps.BoundingBox(n[0][0], n[0][1], n[1][0], n[1][1]))
}, AdsGeoEditor.prototype.formatPointAudience = function(t, i, o) {
    if (void 0 === t) return getProgressHtml();
    var e = t,
        n = i;
    void 0 == n && (n = e, e = void 0);
    var a = "";
    void 0 !== e && (a = 100 > e ? "<100" : langNumeric(e, "%s", !0));
    var d;
    return d = 100 > n ? o ? "<" + getLang("ads_target_audience_short", 100) : "<100" : o ? getLang("ads_target_audience_short", n, !0) : langNumeric(n, "%s", !0), (a ? a + " / " : "") + d
};
try {
    stManager.done("ads_edit_geo.js")
} catch (e) {}