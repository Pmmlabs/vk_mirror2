var slide_show = function(elem) {
    if (!isVisible(elem)) slideDown(elem, 150);
}

var slide_hide = function(elem) {
    if (isVisible(elem)) slideUp(elem, 150);
}

var params = location.search.substr(1),
    ajaxPath = location.pathname;
if (params.length) {
    params = params.split('&');
    var search = '?';
    for (var i in params) {
        if (params[i].indexOf('c[') != 0) {
            search += params[i] + '&';
        }
    }
    search = search.substr(0, search.length - 1);
    ajaxPath += search;
}
if (ajaxPath.indexOf('?') != -1) {
    ajaxPath += '&ajax=1';
} else {
    ajaxPath += '?ajax=1';
}

var image_cache = {};

function preloadImages(text) {
    var m = {};
    var vk = location.host.indexOf('vk.com') != -1;
    if (qCur == 4) { // Video
        m = text.match(/<img src='http:\\\/\\\/[a-z0-9\\\/\._]*'/gi);
    } else if (qCur == 5) { // Ads
        if (vk) {
            m = text.match(/http:\\\/\\\/cs\d*\.vk\.com\\\/u\d*\\\/\d*\\\/[a-fs0-9_]*\.jpg/gi);
        } else {
            m = text.match(/http:\\\/\\\/cs\d*\.vkontakte\.ru\\\/u\d*\\\/\d*\\\/[a-fs0-9_]*\.jpg/gi);
        }
    } else if (qCur == 0 || qCur == 1 || qCur == 2 || qCur == 6 || qCur == 7 || qCur == 8 || qCur == 9) {
        if (vk) {
            m = text.match(/http:\\\/\\\/cs\d*\.vk\.com\\\/[ug]\d*\\\/[a-f0-9_]*\.jpg/gi);
        } else {
            m = text.match(/http:\\\/\\\/cs\d*\.vkontakte\.ru\\\/[ug]\d*\\\/[a-f0-9_]*\.jpg/gi);
        }
    }
    for (var i in m) {
        var val = '' + m[i];
        if (val.substr(0, 4) == '<img') {
            var val_len = val.length;
            val = val.substr(10).substr(0, val_len - 11);
        }
        if (val.substr(0, 4) == 'http') {
            var src = val.replace(/\\\\/g, '\\').replace(/\\\//g, '/');
            if (!image_cache[src]) {
                image_cache[src] = new Image();
                image_cache[src].src = src;
            }
        }
    }
}

function setSection(new_section) {
    var ns = ge(new_section);
    if (ns) {
        var selected = geByClass('sec_pad_sel', ge('sectionsFilter'));
        if (selected[0]) {
            selected = selected[0].parentNode;
            var cs_word = selected.firstChild.firstChild.innerHTML;
            selected.innerHTML = "<div onmouseover=\"this.className='sec_pad_over'\" onmouseout=\"this.className='sec_pad'\" onclick='return setSection(\"" + selected.id + "\");' class='sec_pad'><a href='#' onclick='return setSection(\"" + selected.id + "\")'>" + cs_word + "</a></div>";
        }
        var ns_word = ns.firstChild.firstChild.innerHTML;
        ns.innerHTML = "<div class='sec_pad_sel'><span>" + ns_word + "</span></div>";
    }
    getSection(new_section);
    // if (global_search) global_search.selMenu(new_section);
    return false;
}

function setCriteria(section, q) {
    ge('filterForm')['c[q]'].value = q;
    var currentSection = ge('section').value;
    ge('section').value = section;
    return currentSection != section;
}

var scroll_on_top = false;

function getPage(offset) {
    show('progressTop');
    show('progressBottom');
    updateResults(false, offset);
    scroll_on_top = true;
    return false;
}

function getSection(section) {
    var form = ge('filterForm');
    var query = serializeForm(form);
    for (var name in query) {
        if (name != 'c[q]' && name != 'c[section]')
            form[name].value = '';
    }
    ge('section').value = section;

    //if (!ge('q').value) return false;
    updateResults(true);
}

function updateResults(force, offset) {
    //if (!ge('q').value) return;
    debugLog(['force', force]);
    var form = ge('filterForm'),
        query = {};

    query = serializeForm(form);
    if (force === true) {
        query.uf = 1;
    }
    for (var i in query) {
        if (!query[i] || (form[i] && form[i]['active'] == '0') ||
            query[i] == '0' && i != 'c[country]' && i != 'c[lang]') delete query[i];
    }
    if (!query['c[section]']) {
        query['c[section]'] = 'people';
    }
    if (offset > 0) {
        query['offset'] = offset;
    }
    if (query['c[q]']) query['c[q]'] = query['c[q]'].replace(/\//g, ' ');
    if (!query['c[iphone]']) {
        query['c[noiphone]'] = '1';
    }
    ajaxHistory.go(query);
}

function updResults() { // no params are passed.
    updateResults();

    if (window.updateMap) {
        updateMap();
    }
}

function updatePage(ajaxObj, responseText) {
    var show_error = -1,
        result = {
            script: ''
        };
    try {
        result = eval('(' + responseText + ')');

        var str = '';
        for (var i in result) {
            str += ', ' + i;
        };
        debugLog('result=' + str);

        /*
        // Quick fix for preventing filters recreating if initial query gets from ajaxHistory
        if (result.auto) {
          if (window.autoRequest) {
            delete result.filters;
            delete result.q;
            delete result.script;
          } else {
            window.autoRequest = true;
          }
        }
        */

        var cache = true;
        if (result.auto && result.def_pos) {
            cache = false;
        }

        window.eventMapPoints = result.map_points;

        show_error = 1;
        ge('results').innerHTML = result.rows || 'Server error';
        show_error = 2;
        ge('pagesTop').innerHTML = result.pages || '';
        show_error = 3;
        ge('pagesBottom').innerHTML = result.pages || '';
        show_error = 4;
        ge('searchSummary').innerHTML = result.summary || '';
        show_error = 5;
        if (result.sections) {
            ge('sectionsFilter').innerHTML = result.sections;
        }
        setupReply();
        show_error = 6;

        var section = ge('section').value;

        if (result.filters) {
            ge('searchFilters').innerHTML = result.filters || '';
            section = ge('section').value;
            show_error = 7;
            if (result.q) {
                var inp_el = ge('search_input');
                inp_el.setValue(ge('q').value = result.q);
                if (window.iSearch && iSearch.select && iSearch.select.isVisible()) {
                    triggerEvent(ge('search_input'), 'keyup');
                }
            }
            show_error = 8;
            var results = ge('searchResults');
            show_error = 9;
            results.className = 'searchResults ' + section + 'Results';
            show_error = 10;
            show_error = 11;
        }

        if (result.ads && ge('filterAdsWrap')) {
            ge('filterAdsWrap').innerHTML = result.ads;
        }
        updateSearchBanners();

        show_error = 12;
        if (result.script) {
            eval(result.script);
        }
        show_error = 0;
        if (result.next_page) {
            ajaxHistory.addToCache(result.next_page.hash, result.next_page.text);
            preloadImages(result.next_page.text);
        } else if (result.next_hash) {
            ajaxHistory.preLoad(result.next_hash, function(obj, text) {
                preloadImages(text);
            });
        }
    } catch (e) {
        if (show_error > 0 && show_error < 12) {
            ge('results').innerHTML = 'Error ' + show_error + ': ' + e.message;
        } else if (show_error == 12) {
            ge('results').innerHTML = 'Script error: <br>' + result.script;
        } else if (show_error < 0) {
            ge('results').innerHTML = responseText;
        }
    }
    hide('progressTop');
    hide('progressBottom');
    if (scroll_on_top) {
        window.scroll(0, 0);
        scroll_on_top = false;
    }
    return cache;
}

function toggleFilter(obj, target) {
    if (obj.className == 'filterShut') {
        obj.className = 'filterOpen';
        slideDown(target, 200);
    } else {
        slideUp(target, 200, function() {
            obj.className = 'filterShut';
        });
    }
}

function onInputChange(e) {
    if (e.type != 'keydown') {
        updateResults(false, false);
    } else if (e.keyCode == 13) {
        updateResults(false, false);
        return false;
    }
}

function addAudio(el, params) {
    var aid = params.aid;
    if (!aid) return;
    ge('actionError' + aid).style.display = 'none';
    ge('actionMessage' + aid).style.display = 'none';
    Ajax.postWithCaptcha('audio.php', params, {
        onSuccess: function(res, text) {
            var container = el.parentNode;
            el.parentNode.innerHTML = text;
            dispatchIntro(6, {
                el: ge('actions' + aid)
            });
        },
        onFail: function(res, text) {
            if (text) {
                ge('actionError' + aid).style.display = 'block';
                ge('actionError' + aid).innerHTML = text;
            }
        }
    });
}

function showVideoMessage(vid, text) {
    var box = ge('actionMessage' + vid);
    if (!text) {
        hide(box);
    } else {
        box.innerHTML = text;
        show(box);
    }
}

// from audio.js
var posting = false;

function postAudioOnWall(hash, to_id, audio_id) {
    if (posting) {
        return;
    }
    posting = true;
    var callback = function(obj, text) {
        var r = eval('(' + text + ')');
        posting = false;
        if (r.url) {
            window.location = r.url;
        }
    }
    var params = {
        act: 'a_post_wall',
        hash: hash,
        to_id: to_id,
        media: 'audio',
        media_id: audio_id,
        redirect: 1
    };
    var stop = function(obj, text) {
        posting = false;
    }
    var options = {
        onSuccess: callback,
        onFail: stop,
        onCaptchaShow: stop,
        onCaptchaHide: stop
    };
    Ajax.Send('wall.php', params, options);
}

// from video.js
var posting = false;

function postVideoOnWall(hash, to_id, video_id) {
    if (posting) {
        return;
    }
    posting = true;
    var callback = function(obj, text) {
        var r = eval('(' + text + ')');
        posting = false;
        if (r.url) {
            window.location = r.url;
        }
    }
    var params = {
        act: 'a_post_wall',
        hash: hash,
        to_id: to_id,
        media: 'video',
        media_id: video_id,
        redirect: 1
    };
    var stop = function(obj, text) {
        posting = false;
    }
    var options = {
        onSuccess: callback,
        onFail: stop,
        onCaptchaShow: stop,
        onCaptchaHide: stop
    };
    Ajax.postWithCaptcha('wall.php', params, options);
}

// For inline photos viewing (newsfeed copy)
var shownPhotos = {};

function doShowPhoto(full_id, one_photo) {
    for (var i = 0; i < shownPhotos[full_id].length; ++i) {
        if (shownPhotos[full_id][i].id == one_photo) {
            showPhotoFast(full_id, i);
        }
    }
}

function showPhoto(el, full_id, one_photo, count) {
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
        return true;
    }
    var full_code = 1;
    if (window.showPhotoFast) {
        full_code = 0;
        if (shownPhotos[full_id]) {
            doShowPhoto(full_id, one_photo);
            return false;
        }
    }
    if (!window.showPhotoProgress) {
        window.showPhotoProgress = document.body.appendChild(ce('img', {
            src: '/images/upload.gif'
        }, {
            position: 'absolute',
            display: 'none',
            width: 32,
            height: 8
        }));
    }
    var img = el.firstChild,
        xy = getXY(img);
    showPhotoProgress.style.left = (xy[0] + Math.floor((img.width + 6) / 2) - 16) + 'px';
    showPhotoProgress.style.top = (xy[1] + Math.floor((img.height + 9) / 2) - 4) + 'px';
    show(showPhotoProgress);

    if (!window.showPhotoFast) {
        var ver = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(location.host) ? ('?' + Math.floor((Math.random() + 1) * 1000000000)) : '';
        addCss('css/photoview.css' + ver);
        attachScript('photoView', 'js/photoview.js' + ver);
    }
    Ajax.Send('newsfeed.php', {
        act: 'a_show_photos',
        full_code: full_code,
        full_id: full_id,
        photo: one_photo,
        count: count
    }, {
        onSuccess: function(o, t) {
            if (!t) {
                hide(showPhotoProgress);
                var p = el.parentNode;
                p.removeChild(el);
                if (!p.firstChild) {
                    var elem = ge('status' + full_id);
                    for (elem = elem.parentNode; elem.tagName.toLowerCase() != 'table'; elem = elem.parentNode) {}
                    hide(elem);
                }
                return;
            }
            if (full_code) {
                eval('(function(){' + t + '})()');
            } else {
                shownPhotos[full_id] = eval('(' + t + ')');
                doShowPhoto(full_id, one_photo);
            }
        },
        onCaptchaShow: hide.pbind(showPhotoProgress),
        onFail: hide.pbind(showPhotoProgress)
    });
    return false;
}

function updateSearchBanners() {
    var section = ge('section').value;
    var fnc = (section == 'video' || section == 'audio') ? hide : show;
    fnc('filterAdsWrap');
    fnc('banner1');
    fnc('banner2');
}

var iSearch = {
    init: function(options) {
        var self = this;
        this.guid = _ui.reg(this);
        this.cont = ge('quick_search');
        var resultContainer = ce('div', {
            className: 'results_container',
            innerHTML: '<div class="result_list"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div>'
        });
        this.cont.appendChild(resultContainer);
        this.resultList = geByClass('result_list', resultContainer)[0];
        this.resultListShadow = geByClass('result_list_shadow', resultContainer)[0];

        if (browser.chrome) this.resultList.style.opacity = 1;
        else if (!browser.safari) setStyle(this.resultListShadow, 'top', browser.mozilla ? 0 : (browser.msie && browser.version < 8) ? 0 : -1);
        this.resultList.style.width = this.resultListShadow.style.width = resultContainer.style.width = '240px';
        this.select = new Select(this.resultList, this.resultListShadow, {
            selectFirst: false,
            onItemSelect: this.onItemSelect.bind(this),
            onShow: _ui.sel.pbind(this.guid),
            onHide: _ui.sel.pbind(false),
            cycle: true
        });
        this.cache = new Cache({
            cacheLength: 100
        });
        addEvent('search_input', 'keyup focus mouseup', function(e) {
            if (self.select.isVisible() && self.select.active > -1) {
                if (inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN])) return cancelEvent(e);
            }
            clearTimeout(self.requestTimeout);
            var el = ge('search_input'),
                term = trim(el.getValue ? el.getValue() : el.value);
            self.currentTerm = term;
            var section = ge('section') ? ge('section').value : '',
                cache_key = section + '#' + term;
            var data = self.cache.getData(cache_key);
            if (!term) data = [];
            if (data == null) {
                var done = function(t) {
                    try {
                        data = eval('(' + t + ')');
                    } catch (e) {}
                    self.cache.setData(cache_key, data);
                    if (self.currentTerm == term) self.showSelectList(term, data);
                }
                var fn = function() {
                    var ajax = new Ajax(function(ajaxObj, data) {
                        done(data);
                    });
                    ajax.post('/hints.php?act=a_gsearch_hints&q=' + encodeURI(term) + '&section=' + section);
                }
                self.requestTimeout = setTimeout(fn, 150);
            } else if (data != null) {
                self.showSelectList(term, data);
            }
        });
        addEvent('search_input', 'blur', function() {
            self.select.hide();
        });
        addEvent('search_input', 'keypress keydown', function(e) {
            if ((e.keyCode == KEY.RETURN || e.keyCode == 10) && self.select.active > -1) {
                if (self.select && self.select.isVisible()) {
                    triggerEvent(document, e.type, e);
                    return cancelEvent(e);
                }
            }
            if (e.keyCode == 32 && self.select.active > -1) {
                var el = self.select.list.childNodes[self.select.active],
                    id = el ? el.getAttribute('val') : '',
                    item;
                each(self.lastItems, function() {
                    if (this[0] == id) {
                        item = this;
                    }
                });
                if (!item) return;
                ge('search_input').value = item[3] + ' ';
                focusAtEnd('search_input');
                return cancelEvent(e);
            }
            return true;
        });
    },
    showSelectList: function(term, items) {
        var self = this;
        if (!this.select) return;
        items = isArray(items) && items.length ? items : [];
        if (!items.length) {
            self.select.hide();
            return;
        }
        this.select.clear();
        this.lastItems = items;
        this.select.content(items);
        this.select.show();
    },
    onItemSelect: function(id) {
        if (!this.select) return;
        this.select.hide();
        var item;
        each(this.lastItems, function() {
            if (this[0] == id) {
                item = this;
            }
        });
        if (!item) return;
        ge('search_input').setValue(item[3]);
        ge('search_input').blur();
        globalSearch(item[4]);
    },
    onEvent: function(e) {
        if (e.type == (browser.opera || browser.mozilla ? 'keypress' : 'keydown')) {
            this.select.handleKeyEvent(e);
        }
    }
}

onDomReady(function() {
    updateSearchBanners();
    setInterval(updateSearchBanners, 1000);
    iSearch.init();
});