var mobilePages = {
    openInApp: function(url) {
        Page().onInit(function() {
            var open_link = 'snapster://snapster.io';
            if (url.indexOf('/rooms') == -1) {
                open_link += url;
            } else {
                open_link += '/';
            }
            var download_link = mobilePages.getLink();
            setPageContent(Templates.get('openInApp', open_link, download_link));
        });
    },
    getLink: function(iphone) {
        if (O.isAndroid()) {
            return 'https://play.google.com/store/apps/details?id=com.vk.snapster';
        } else {
            return 'https://itunes.apple.com/app/id1016603298';
        }
    },
    downLoadPanel: function() {
        var store_link = mobilePages.getLink(),
            href = location.href.replace('https:', 'snapster:');

        return Templates.get('downloadAppPanel', href, store_link);
    }
};