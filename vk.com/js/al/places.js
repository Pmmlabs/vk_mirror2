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
                stManager.add(stat, function() {
                    Places.initPhotoMap(opts);
                });
                return false;
            }
        } else if (opts.provider == 'yandex2') {
            if (!window.yandexMapsInited) {
                window.yandexMapInit = function() {
                    ymaps.modules.require(['package.standard'], function(Map, Placemark) {
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
                var apiKey = '5567f562-b9ff-41b8-86b7-1549d0d460fe';
                headNode.appendChild(ce('script', {
                    type: 'text/javascript',
                    src: 'https://enterprise.api-maps.yandex.ru/2.1/?lang=' + langCode +
                        '&onload=yandexMapInit&load=package.standard&apikey=' + apiKey,
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
            if (point.loading || !point.points || point.expanded || possive) return false;
            var p = point.points,
                len = p.length;
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
        }

        function checkPointsReq(points, mapBounds, toBeExpanded) {
            if (!points) return false;
            if (!toBeExpanded) {
                opts.diff = Math.max((mapBounds.neLat - mapBounds.swLat), (mapBounds.neLng - mapBounds.swLng));
                toBeExpanded = {};
            }
            var i = points.length;
            while (i--) {
                if (points[i].loading || points[i].count <= 1) continue;
                var point = points[i],
                    diff = point.diff * 20;
                if (
                    diff > opts.diff &&
                    point.lat >= mapBounds.swLat - diff &&
                    point.lat <= mapBounds.neLat + diff &&
                    point.lng >= mapBounds.swLng - diff &&
                    point.lng <= mapBounds.neLng + diff
                ) {
                    if (point.expanded) {
                        checkPointsReq(point.points, mapBounds, toBeExpanded);
                    } else {
                        toBeExpanded[point.photo.split('_')[1]] = point;
                    }
                } else if (point.expanded) {
                    unexpandPoint(point);
                }
            }
            return toBeExpanded;
        }

        function updateMapPoints() {
            var toBeExpanded = checkPointsReq(opts.points, getMapBounds()),
                id = null,
                params = {
                    uid: opts.uid,
                    act: 'a_get_points',
                    points: [],
                    ids: [],
                    diffs: []
                };
            for (id in toBeExpanded) {
                toBeExpanded[id].loading = true;
                params.points.push(id);
                params.ids.push(toBeExpanded[id].ids);
                params.diffs.push(toBeExpanded[id].diff);
            }
            if (params.points.length === 0) return;
            if (opts.diff) {
                delete params.diffs;
                params.diff = opts.diff;
            } else {
                params.diffs = params.diffs.join(',');
            }
            params.points = params.points.join(',');
            params.ids = params.ids.join(',');
            ajax.post('al_places.php', params, {
                onDone: function(points, data) {
                    for (var id in data) {
                        if (!points[id]) continue;
                        points[id].loading = false;
                        if (!data[id].length) continue;
                        points[id].points = data[id];
                        expandPoint(points[id]);
                    }
                }.pbind(toBeExpanded),
                onFail: function(points) {
                    for (var id in points) points[id].loading = false;
                }.pbind(toBeExpanded)
            });
        }

        function zoomToPoint(point) {
            var mapBounds = map.getBounds();
            if (isMapbox) {
                var ne = mapBounds.getNorthEast();
                var sw = mapBounds.getSouthWest();
                mapBounds = [
                    [ne.lat, ne.lng],
                    [sw.lat, sw.lng]
                ];
            }
            var zoom = map.getZoom();
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
                var elCont = ge('profile_map_icon_' + point.overlay.iconNum);
                var el = geByClass1('profile_map_first', elCont) || elCont;
                var cnt = geByClass1('profile_map_photo_count', el);
                if (cnt) {
                    hide(cnt);
                }
                // re('profile_map_photo_loader');
                showProgress(el, 'profile_map_photo_loader');
            }
            var diff = (point.diff || 0.000001);
            var list = 'map' + opts.uid + '_' + (point.lat - diff) + '_' + (point.lng - diff) + '_' + (point.lat + diff) + '_' + (point.lng + diff);
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
                    if (ge('place_map_other')) {
                        ge('place_map_other').innerHTML = html;
                        window.tooltips && tooltips.destroyAll();
                    }
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
                html = '<span class="profile_map_photo_count">' + (cnt > 99 ? '99+' : cnt) + '</span>';
            }
            var len = Math.min(cnt - 1, 3);
            html = '<div' + (len ? '' : ' id="profile_map_icon_' + iconNum + '"') + ' class="profile_map_photo profile_map_first" style="background: url(' + imgSrc + ') center center no-repeat;' + (len ? ' margin-left: -2px; margin-top: -4px;' : '') + '">' + html + '</div>';
            while (len--) {
                html = '<div' + (len ? '' : ' id="profile_map_icon_' + iconNum + '"') + ' class="profile_map_photo"' + (len ? ' style="margin-left: -2px; margin-top: -4px;"' : '') + '>' + html + '</div>';
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
                map = L.mapbox.map(opts.cont, false, {
                    zoomControl: false,
                    scrollWheelZoom: false,
                    touchZoom: false
                });
                L.mapbox.tileLayer(mapboxApiId, {
                    detectRetina: true,
                    retinaVersion: mapboxApiId_2x
                }).addTo(map);

            }
            setMapOpts(map);

            if (opts.bounds) {
                map.fitBounds([
                    [opts.bounds.swlat, opts.bounds.swlng],
                    [opts.bounds.nelat, opts.bounds.nelng]
                ]);
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
                while (len--) {
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
                } else if (this.map) {
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
                map = new ymaps.Map(opts.cont, mapOpts, {
                    suppressMapOpenBlock: true,
                    suppressObsoleteBrowserNotifier: true
                });
            }
            setMapOpts(map);

            if (opts.bounds) {
                cur.a = map;
                map.setBounds([
                    [opts.bounds.swlat, opts.bounds.swlng],
                    [opts.bounds.nelat, opts.bounds.nelng]
                ]);
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
                while (len--) {
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

    showMorePhotos: function(btn, uid) {
        if (!cur.addPhotosOffset || buttonLocked(btn)) {
            return false;
        }
        ajax.post('al_places.php', {
            act: 'a_edit_photos',
            uid: uid,
            offset: cur.addPhotosOffset
        }, {
            onDone: function(html, offset, showmore) {
                cur.addPhotosOffset = offset;
                if (!showmore) {
                    hide(btn);
                }
                if (ge('places_map_add_list')) {
                    ge('places_map_add_list').appendChild(cf(html));
                }
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },

    addPhotos: function(obj, uid) {
        showBox('al_places.php', {
            act: 'a_edit_photos',
            uid: uid
        });
    },

    selectPhoto: function(photo_id, geohash) {
        showBox('/al_places.php', {
            act: 'show_photo_place',
            edit: 1,
            geohash: geohash || '',
            photo: photo_id
        });
        return false;
    },

    savePhotos: function(btn, hash) {
        var loc = cur.placeMarker.location;
        var params = {
            act: 'save_photos_places',
            pids: cur.mapPids,
            lat: loc.lat,
            lng: loc.lon,
            hash: hash
        };
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

    showPlaceTT: function(obj, text) {
        showTooltip(obj, {
            black: 1,
            text: text,
            center: 1,
            shift: [0, 6, 6]
        });
    },

    showPhotoPlace: function(lat, lng, ev) {
        var map = cur.placeBoxMap;
        map.setCenter([lat, lng], 16);
        animate(boxLayerWrap, {
            scrollTop: 0
        }, 200);
        if (ev) {
            cancelEvent(ev);
        }
    }

}

try {
    stManager.done('places.js');
} catch (e) {}