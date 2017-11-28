var browser = (function() {
    var ua = navigator.userAgent.toLowerCase();
    return {
        android: /android/i.test(ua),
        ios: /iphone|ipod|ipad|iphone os/i.test(ua),
        ipad: /ipad/i.test(ua)
    }
})();

function ge(id) {
    return (typeof id === 'string') ? document.getElementById(id) : id;
}

function tag(o) {
    o = ge(o);
    return (o && o.tagName || '').toLowerCase();
}

function show(id) {
    var obj = ge(id);
    if (obj) {
        obj.style.display = obj.oldstyle || (tag(obj) == 'span' ? 'inline' : 'block');
    }
}

function hide(id) {
    var obj = ge(id);
    if (obj) {
        if (obj.style.display != 'none') {
            obj.oldstyle = obj.style.display;
        }
        obj.style.display = 'none';
    }
}

function ctrlClickEvent(e) {
    return (e && (e.which == 2 || e.ctrlKey || e.metaKey));
}

function cancelEvent(e) {
    if (!e) return false;

    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;

    return false;
}

function isVideoSupported() {
    var v = document.createElement('video');
    return v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '');
}

function getWindowWidth() {
    return window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || (document.body && document.body.clientWidth);
}

function snapsterPlayVideo(a, e) {
    if (ctrlClickEvent(e) || !isVideoSupported()) return;

    var url = a.href;
    var v = document.createElement('video');
    v.type = 'video/mp4';
    v.autoplay = true;
    v.src = url;

    if (!browser.ios || browser.ipad) {
        v.controls = true;

        var width = Math.min(480, getWindowWidth());
        v.width = width;

        var container = ge('chronicle_video_container'),
            frame = ge('chronicle_video_frame');
        hide(frame);
        container.appendChild(v);
    }

    v.play();

    return cancelEvent(e);
}