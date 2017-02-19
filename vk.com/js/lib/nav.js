var loc = {
    is_opera: (navigator.userAgent.toLowerCase().indexOf('opera') != -1),
    is_ie: (!this.isOpera && (navigator.userAgent.toLowerCase().indexOf('msie') != -1)),
    is_ie7: (!this.isOpera && (navigator.userAgent.toLowerCase().indexOf('msie 7') != -1)),
    is_ff: (navigator.userAgent.toLowerCase().indexOf('firefox') != -1),
    is_gc: (navigator.userAgent.toLowerCase().indexOf('chrome') != -1),
    is_safari: /webkit|safari|khtml/i.test(navigator.userAgent),

    current_loc: null,

    on_location_changed: null,

    look_for_hash_change: function() {
        var new_loc = '';

        var new_hash = location.hash;
        var new_hash_index = new_hash.indexOf('#');
        if (new_hash_index != -1)
            new_loc = new_hash.substr(new_hash_index + 1);

        if (new_loc != this.current_loc) {
            this.current_loc = new_loc;
            if (this.on_location_changed)
                this.on_location_changed(this.current_loc);
        }
    },

    location_changed: function() {
        var new_loc = '';

        var url = this.get_frame_url().toString();
        var url_index = url.indexOf('url=');
        if (url_index != -1)
            new_loc = url.substr(url_index + 4);

        this.current_loc = new_loc;
        if (this.on_location_changed)
            this.on_location_changed(this.current_loc);
    },

    get_frame_url: function() {
        var frame = document.getElementById('history_frame');
        if (frame)
            return (frame.contentDocument || frame.contentWindow.document).location;
    },

    init: function() {
        this.set_hash = (this.is_ff || this.is_gc || this.is_safari);
        this.look_for_hash = (this.is_ff || this.is_gc || this.is_safari);
        this.use_frame = !this.look_for_hash;

        var hash = location.hash;
        if (hash.length)
            hash = hash.substr(1); // Remove '#'

        if (this.use_frame) {
            var frame_div = document.createElement("div");

            frame_div.innerHTML = '<iframe id="history_frame" name="history_frame" src="/blank.html?url=' + hash + '"></iframe><form id="history_form" target="history_frame" method="GET" action="/blank.html"><input type="hidden" name="url" value=""/></form>';
            frame_div.style.position = 'absolute';
            frame_div.style.left = '-1000px';
            frame_div.style.top = '300px';

            document.body.appendChild(frame_div);

            var frame = document.getElementById('history_frame');

            if (frame.addEventListener)
                frame.addEventListener('load', function() {
                    setTimeout("loc.location_changed()", 0);
                }, false);
            else if (frame.attachEvent)
                frame.attachEvent('onload', function() {
                    setTimeout("loc.location_changed()", 0);
                });
        } else if (this.look_for_hash)
            setInterval("loc.look_for_hash_change()", 200);

        this.nav_to(hash);
    },

    nav_to: function(where) {
        if (this.use_frame) {
            if (this.current_loc != null) {
                var form = document.getElementById('history_form');
                if (form) {
                    form.url.value = where;
                    form.submit();
                }
            } else
                this.location_changed();
            if (this.set_hash) {
                var new_hash = '';
                if (where.length)
                    new_hash = '#' + where;
                if (location.hash != new_hash)
                    location.hash = new_hash;
            }
        } else if (this.look_for_hash) {
            var new_hash = '';
            if (where.length)
                new_hash = '#' + where;
            if (location.hash != new_hash)
                location.hash = new_hash;
            else if ((this.current_loc == where) && (this.on_location_changed))
                this.on_location_changed(this.current_loc);
        }
    }

};

var window_on_load_s = new Array();
var window_on_load = function() {
    for (var i = 0; i < window_on_load_s.length; ++i)
        window_on_load_s[i]();
    loc.init();
}
if (window.addEventListener)
    window.addEventListener('load', window_on_load, false);
else if (window.attachEvent)
    window.attachEvent('onload', window_on_load);