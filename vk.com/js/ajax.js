function Ajax(onDone, onFail, eval_res) {
    var _t = this;
    this.onDone = onDone;
    this.onFail = onFail;
    var tran = null;
    var calls = 0;
    try {
        tran = new XMLHttpRequest();
    } catch (e) {
        tran = null;
    }
    try {
        if (!tran) tran = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        tran = null;
    }
    try {
        if (!tran) tran = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
        tran = null;
    }

    var parseRes = function() {
        if (!tran || !tran.responseText) return;
        var res = tran.responseText.replace(/^[\s\n]+/g, '');

        if (res.substr(0, 10) == "<noscript>") {
            try {
                var arr = res.substr(10).split("</noscript>");
                eval(arr[0]);
                tran.responseText = arr[1];
            } catch (e) {}
        } else {}
    };
    this.get = function(u, q, f) {
        f = f || false;
        if (typeof(q) != 'string') q = ajx2q(q);
        u = u + (q ? ('?' + q) : '');
        tran.open('GET', u, !f);
        if (calls) {
            tran.onreadystatechange = function() {
                stateDisp();
            };
        }
        tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        tran.send('');
        calls++;
    };
    this.post = function(u, d, f) {
        f = f || false;
        if (typeof(d) != 'string') d = ajx2q(d);
        tran.open('POST', u, !f);
        if (calls) {
            tran.onreadystatechange = function() {
                stateDisp();
            };
        }
        tran.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        tran.send(d);
        calls++;
    };
    var stateDisp = function() {
        if (tran.readyState == 4) {
            if (tran.status >= 200 && tran.status < 300) {
                if (eval_res) parseRes();
                if (_t.onDone) _t.onDone(_t, tran.responseText);
            } else {
                if (_t.onFail) _t.onFail(_t, tran.responseText);
            }
        }
    }
    tran.onreadystatechange = stateDisp;
}

(function() {
    var ajaxObjs = {};
    window.Ajax.Get = function(p) {
        var a = (p.key) ? ajaxObjs[p.key] : null;
        if (!a) {
            a = new Ajax(p.onDone, p.onFail, p.eval);
            if (p.key) ajaxObjs[p.key] = a;
        }
        a.get(p.url, p.query, p.sync);
    }
    window.Ajax.Post = function(p) {
        var a = (p.key) ? ajaxObjs[p.key] : null;
        if (!a) {
            a = new Ajax(p.onDone, p.onFail, p.eval);
            if (p.key) ajaxObjs[p.key] = a;
        }
        a.post(p.url, p.query, p.sync);
    }
})();

function ajx2q(qa) {
    var query = [],
        q, i = 0;

    for (var key in qa) {
        if (qa[key] === undefined || qa[key] === null || typeof(qa[key]) == 'function') continue;
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(qa[key]));
    }
    return query.join('&');
}

var ajaxHistory = $ah = new(function() {
    var _t = this;

    var curHash = "";
    var curHashes = {};
    var frame = null;
    var forceLoad = false;
    var order = null;

    _t.frameLoading = false;
    _t.enabled = false;
    _t.useCache = true;
    _t.onLoad = {};
    _t.cache = {};

    var setHash = function(hash) {
        hash = hash.replace("#", "");
        if (location.hash != "#" + hash) {
            location.hash = "#" + hash;
            if (isIE()) {
                frame.src = 'blank.html?ahHash=' + encodeURIComponent(hash);
                _t.frameLoading = true;
            }
        }
        return true;
    };
    var getHash = function() {
        if (!isIE()) return location.hash.replace("#", "");
        try {
            var hash = ge('ahFrame').contentWindow.document.location.search.match(/ahHash=(.*)$/);
            return decodeURIComponent((hash && hash[1]) || "").replace("#", "");
        } catch (e) {
            return curHash;
        }
    };
    var splitHash = function(hash) {
        if (!hash) return {};
        hash = hash.split("/");
        if (hash.length == 1) {
            if (!_t.onLoad['default']) return {};
            if (_t.onLoad['default'].show) hash[0] = _t.onLoad['default'].show.from(hash[0]);
            return {
                'default': sortParams(hash[0])
            };
        }
        var parsed = {};
        for (var i = 0; i < hash.length; i += 2) {
            var h = hash[i];
            var p = hash[i + 1];
            if (_t.onLoad[h].show) {
                p = sortParams(_t.onLoad[h].show.from(p));
            } else {
                p = sortParams(p);
                if (!p && _t.onLoad[h]) p = sortParams(_t.onLoad[h].def);
            }
            parsed[h] = p;
        }
        return parsed;
    };
    var joinHash = function(hash) {
        var joined = [];
        var def = true;
        for (var i in hash) {
            def = def && (i == 'default');
            var p = sortParams(hash[i]);
            if (_t.onLoad[i].show) {
                var p1 = _t.onLoad[i].show.to(splitParams(hash[i]));
                if (p1) p = p1;
            }
            joined.push(i + "/" + p);
        }
        if (def && joined[0]) return joined[0].split("/")[1];
        return joined.sort().join("/");
    };
    var splitParams = function(params) {
        if (!params) return {};
        if (typeof(params) != 'string') return params;
        if (!/&|=/.test(params)) return params;
        var vals = params.split("&");
        var p = {};
        for (var i = 0; i < vals.length; i++) {
            var v = vals[i].split("=");
            p[v[0]] = v[1];
        }
        return p;
    };
    var sortParams = function(params) {
        if (typeof(params) == 'number') return params + '';
        if (typeof(params) != 'string') {
            params = ajx2q(params);
        }
        return params.split("&").sort().join("&");
    };

    _t.init = function() {
        if (!this.enabled) return;
        for (var i in _t.onLoad) {
            var p = sortParams(_t.onLoad[i].def);
            curHashes[i] = p;
        };
        var handler = function() {
            var origHash = getHash();
            if (origHash == curHash && !forceLoad) return;
            var state = splitHash(origHash);
            var hash = joinHash(state);
            if (hash != curHash || forceLoad) {
                var ordered = order || _t.onLoad;
                for (var i in ordered) {
                    if (order) i = ordered[i];
                    var l = _t.onLoad[i];
                    var p = state[i] || sortParams(l.def);
                    if (p != curHashes[i] || i == forceLoad) {
                        forceLoad = false;
                        if (l.before && !l.before(splitParams(p))) {
                            curHashes[i] = p;
                            continue;
                        }
                        if (!_t.cache[i]) _t.cache[i] = {};
                        if (!_t.useCache || !_t.cache[i][p]) {
                            _t.getData(l, i, p, hash);
                        } else if (l.done) {
                            l.done({}, _t.cache[i][p]);
                        }
                        curHashes[i] = p;
                    }
                }
                curHash = hash;
                if (isIE()) {
                    if (location.hash != "#" + hash) location.hash = "#" + hash;
                }
            }
        };
        if (isIE()) {
            var initHash = encodeURIComponent(location.hash);
            document.body.innerHTML += "<iframe id='ahFrame' style='position:absolute;left:-1000px;width:0;height:0' src='/blank.html?ahHash=" + initHash + "'></iframe>";
            frame = ge('ahFrame');

            frame.attachEvent('onreadystatechange', function() {
                if (frame.contentWindow.document.readyState == 'complete') {
                    _t.frameLoading = false;
                    handler();
                }
            }, false);
            frame.attachEvent('onload', function() {
                if (_t.frameLoading) {
                    _t.frameLoading = false;
                    handler();
                }
            }, false);

            setInterval(function() {
                if (!_t.frameLoading && (location.hash.replace("#", "") != getHash())) {
                    setHash(location.hash);
                }
            }, 200);
        } else {
            setInterval(handler, 150);
        }
    };
    _t.go = function(s, params) {
        if (params === undefined) {
            params = s;
            s = 'default';
        }
        var state = splitHash(curHash);
        state[s] = sortParams(params);
        var hash = joinHash(state);
        setHash(hash);
        forceLoad = s;
    };
    _t.getData = function(loadObj, id, params, hash) {
        var a = new Ajax(
            (function(l, i, p, t) {
                return function(res, text) {
                    if (l.done) l.done(res, text);
                    if (t.useCache) _t.cache[i][p] = text;
                    t.frameLoading = false;
                };
            })(loadObj, id, params, _t),
            (function(l, i, p, t) {
                return function(res, text) {
                    if (l.fail) l.fail(res, text);
                    t.frameLoading = false;
                };
            })(loadObj, id, params, _t),
            true);
        a.post(loadObj.url, params);
    };
    _t.prepare = function(id, params) {
        _t.enabled = true;
        if (params === undefined) {
            params = id;
            id = 'default';
        }
        _t.onLoad[id] = params;
    };
    _t.validateHash = function(hash) {
        return joinHash(splitHash(hash));
    };
    _t.clearCache = function(id) {
        _t.cache[id] = {}
    };

})();

onDomReady(function() {
    ajaxHistory.init()
});