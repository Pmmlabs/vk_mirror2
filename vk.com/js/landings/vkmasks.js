var landingVkMasks = {
    init: function() {
        this.LAYER_CLASS = 'layer_wrap_vkmasks';

        this.isLayer = false;
        this.layer = ge('wk_layer_wrap');

        if (this.layer) {
            addClass(this.layer, this.LAYER_CLASS);
            this.isLayer = true;

            if (wkcur) {
                wkcur._hide.push(this.onDestroy.bind(this));
            }
        } else {

            addClass(document.documentElement, 'is_page_html');
        }

        if (window.langConfig && langConfig.id === 3) {
            addClass(geByClass1('landing_vkmasks_content'), 'landing_vkmasks_content_en');
        }

        this.createVideo();
    },
    close: function(e) {
        if (this.isLayer) {
            cancelEvent(e);
            WkView.hide();
        }
    },
    createVideo: function() {
        var container = ge('vkmasks_iphone');
        var CONTAINER_CLASS = 'landing_vkmasks_media';
        var isMobile = hasClass(document.body, 'is_mobile');

        checkMp4(function(canPlay) {
            var content;
            var src = attr(container, 'data-src');

            if (canPlay && src && !isMobile) {
                content = ce('video', {
                    className: CONTAINER_CLASS,
                    autoplay: true,
                    loop: true,
                    muted: true,
                    src: src
                });

                attr(content, 'playsinline', true);
                attr(content, 'webkit-playsinline', true);
                attr(content, 'muted', true);

                if (window.browser && browser.msie) {
                    attr(content, 'poster', attr(container, 'data-img'));
                }
            } else {
                content = ce('img', {
                    className: CONTAINER_CLASS,
                    src: attr(container, 'data-img')
                });
            }

            container.appendChild(content);
        });
    },
    onDestroy: function() {
        removeClass(this.layer, this.LAYER_CLASS);
    },
};

try {
    stManager.done('landings/vkmasks.js')
} catch (e) {}