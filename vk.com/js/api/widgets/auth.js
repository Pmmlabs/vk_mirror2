window.resizeWidget = function() {
    if (!window.mainDiv || !window.Rpc) return;
    var size = getSize(window.mainDiv)[1];
    if (window.mentions_mod && size < 150 && window.mention) { // fix for mentions list
        if (mention.select.isVisible()) {
            size += Math.max(getSize(mention.select.list)[1] - 35, 0);
        }
    }
    window.Rpc.callMethod('resize', size);
}

window.widgetAuth = function(noAuth) {
    if (noAuth) {
        var
            screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
            screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
            outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
            outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
            features = 'width=655,height=479,left=' + parseInt(screenX + ((outerWidth - 655) / 2), 10) + ',top=' + parseInt(screenY + ((outerHeight - 479) / 2.5), 10);
        window.activePopup = window.open(location.protocol + '//oauth.vk.com/authorize?client_id=-1&redirect_uri=close.html&display=widget', 'vk_openapi', features);
    } else {
        window.gotSession();
    }
}

onDomReady(function() {
    window.mainDiv = ge('main');
    window.resizeWidget();
});

window.Rpc = new fastXDM.Client({
    onInit: function() {
        setTimeout(function() {
            window.resizeWidget();
        }, 500);
    }
}, {
    safe: true
});


window.gotSession = function(data) {
    if (data == -1) {
        setTimeout(function() {
            location.reload();
        }, 1000);
        location.href = location.href + '&1';
    }
    Ajax.Send('widget_auth.php', {
        act: 'a_auth_user',
        app: window.appId,
        hash: window.authHash,
        url: window.authUrl
    }, function(o, t) {
        var result = eval('(' + t + ')');
        if (result) {
            if (result.error) {
                ge('userBlock').innerHTML = '<div style="padding: 4px 0px 0px;">' + result.error + '</div>';
                return false;
            }
            window.makeAuth(result);
        }
    });
}

window.makeAuth = function(params) {
    window.Rpc.callMethod('makeAuth', {
        uid: params[0],
        first_name: params[1],
        last_name: params[2],
        photo: params[3],
        photo_rec: params[4],
        session: params[5],
        hash: params[6]
    });
}

function toggleFriends() {
    toggle('friends_list');
    setTimeout(function() {
        window.resizeWidget();
    }, 0);
}