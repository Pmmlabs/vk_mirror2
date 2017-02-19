// Profile tabs 
var tab_masks = {
    'friendsCommon': 1,
    'friends': 2,
    'friendsOnline': 4,
    'albums': 8,
    'videos': 16,
    'questions': 32,
    'matches': 64,
    'notes': 128,
    'groups': 256,
    'apps': 512,
    'personal': 1024,
    'education': 2048,
    'career': 4096,
    'places': 8192,
    'military': 16384,
    'opinions': 32768,
    'audios': 65536,
    'wall': 131072,
    'gifts': 262144,
    'optional': 524288
}


// Group tabs
var group_tab_masks = {
    'information': 1,
    'members': 2,
    'groupType': 4,
    'admins': 8,
    'groupEvents': 16,
    'officers': 32,
    'links': 64,
    'applied': 128,
    'photos': 256,
    'topics': 512,
    'wall': 1024,
    'albums': 2048,
    'videos': 4096,
    'audios': 8192,
    'recentNews': 16384,
    'voting': 32768,
    'apps': 65536,
    'description': 131072
}
//...

function collapseBox(id, container, dopen, dclose, group) {
    var box = ge(id);
    if (!box) return;

    var masks = (group) ? group_tab_masks : tab_masks;
    var cookie_key = (group) ? 'group_closed_tabs' : 'closed_tabs';

    var c = geByClass("c", box)[0];
    if (!c) return;
    var newClass = isVisible(c) ? "bShut" : "bOpen";
    if (slideToggle(c, 300, function() {
            if (!masks[id]) return;
            var closed_tabs = parseInt(getCookie('remix' + cookie_key));
            if (isVisible(c)) {
                closed_tabs = isNaN(closed_tabs) ? 0 : closed_tabs & ~masks[id];
            } else {
                closed_tabs = isNaN(closed_tabs) ? masks[id] : closed_tabs | masks[id];
            }
            setCookie('remix' + cookie_key, closed_tabs, 360);
        })) {
        container.parentNode.className = newClass;
    }

    return false;
}


function quickReply(id, dopen, dclose, foca) {
    var box = ge(id);
    if (!box) return;
    var c = geByClass("r", box)[0];
    if (!c) return;
    if (!isVisible(c))
        slideDown(c, 200, function() {
            ge("reply_field").focus();
        });
    else
        slideUp(c, 200);
}