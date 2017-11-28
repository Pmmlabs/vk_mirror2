var landingVkMusic = {
    init: function() {
        this.isLayer = false;
        this.layer = geByClass1('landing_wk_wrap_vk_music') || document.body;

        if (ge('wk_layer_wrap')) {
            this.isLayer = true;

            if (wkcur) {
                wkcur._hide.push(this.onDestroy.bind(this));
            }
        }

        addClass(ge('wk_layer_wrap') || document.body, 'is_js is_vkmusic_layer');

        this.elems = [];
        this.SHOWED_CLASS = 'landing_vkmusic__showed';
        this.resizeFirstBlock();
        this.is_mobile = geByClass1('is_mobile');

        this.bindScroll = this.onScroll.bind(this);
        this.bindResize = this.resizeFirstBlock.bind(this);
        this.bindOrientationChange = this.onOrientationChange.bind(this);

        if (!this.is_mobile) {
            addEvent(window, 'resize', this.bindResize);
        }

        addEvent(window, 'orientationchange', this.bindOrientationChange);
        addEvent(this.isLayer ? this.layer : window, 'scroll', this.bindScroll);

        this.onScroll();
    },
    close: function(e) {
        if (this.isLayer) {
            cancelEvent(e);
            WkView.hide();
        }
    },
    play: function(el, e, oid, id, hash) {
        if (this.isLayer) {
            if (!e.metaKey && !e.ctrlKey) {
                cancelEvent(e);
            }
            getAudioPlayer().playPlaylist(oid, id, hash);
            var played = false;

            if (hasClass(el, 'landing_vkmusic__albums_link_played')) {
                played = true;
            }
            each(geByClass('landing_vkmusic__albums_link_played'), function(i, el) {
                removeClass(this, 'landing_vkmusic__albums_link_played');
            });

            toggleClass(el, 'landing_vkmusic__albums_link_played', !played);
        }
    },
    onDestroy: function() {
        this.destroyBounce();

        if (!this.is_mobile) {
            removeEvent(window, 'resize', this.bindResize);
        }

        removeEvent(window, 'orientationchange', this.bindOrientationChange);
        removeEvent(this.isLayer ? this.layer : window, 'scroll', this.bindScroll);

        removeClass(ge('wk_layer_wrap'), 'is_vkmusic_layer');
        removeClass(ge('wk_layer_wrap'), 'is_js');
    },
    onOrientationChange: function() {
        var self = this;
        setTimeout(function() {
            self.resizeFirstBlock();
        }, 250);
        self.resizeFirstBlock();
    },
    destroyBounce: function() {
        clearTimeout(this.bounceTimer);
    },
    resizeFirstBlock: function() {
        var self = this;
        var block = ge('landing_vkmusic_first_block');

        setStyle(block, 'height', window.innerHeight + 'px');

        this.animatedElems = geByClass('_landing_vkmusic__jsshow');
        this.elems = [];

        each(this.animatedElems, function(i, el) {
            if (!hasClass(el, self.SHOWED_CLASS)) {
                self.elems.push({
                    y: getXY(el)[1],
                    el: el,
                    animated: false
                });
            }
        });
    },
    scrollTo: function(elem, e) {
        cancelEvent(e);

        var speed = this.is_mobile ? 1000 : 500;
        var easing = this.is_mobile ? this.easeOutCubic : this.easeInCubic;
        var top = ge(elem).offsetTop;

        if (window.requestAnimationFrame) {
            this._scrollTo(top, easing, speed, this.onScroll.bind(this));
        } else {
            if (this.isLayer) {
                this.layer.scrollTop = top;
            } else {
                scrollToY(top);
            }
        }
    },
    onScroll: function() {
        var self = this;

        if (!self.elems.length) {
            return;
        }

        if (this.isLayer) {
            var scrollY = this.layer.scrollTop;
        } else {
            var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        }

        var y = scrollY + window.innerHeight;

        for (var i = 0; i < self.elems.length; ++i) {
            var obj = self.elems[i];
            var el = obj.el;

            if (y > obj.y) {
                addClass(el, self.SHOWED_CLASS);
                addEvent(el, 'animationend', function() {
                    addClass(this, 'landing_vkmusic__showed_end');
                });

                if (hasClass(el, 'landing_vkmusic__albums_desc')) {
                    self.bounce(geByClass('landing_vkmusic__albums_item_anim'), 150);
                }
                if (hasClass(el, 'landing_vkmusic__groups_desc')) {
                    self.bounce(geByClass('landing_vkmusic__groups_item_anim'), 100);
                }
                if (hasClass(el, 'landing_vkmusic__end_smile_wrap')) {
                    self.smileBounce();
                }

                self.elems.splice(i--, 1);
            }
        }
    },
    _scrollTo: function scrollTo(to, easing, duration, callback) {
        var self = this;

        function move(amount) {
            if (self.isLayer) {
                self.layer.scrollTop = amount;
            } else {
                document.documentElement.scrollTop = amount;
                document.body.parentNode.scrollTop = amount;
                document.body.scrollTop = amount;
            }
        }

        function position() {
            if (self.isLayer) {
                return self.layer.scrollTop;
            }

            return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
        }

        var start = position();
        var change = to - start;
        var currentTime = 0;
        var increment = 20;

        duration = (typeof(duration) === 'undefined') ? 500 : duration;

        var animateScroll = function() {
            currentTime += increment;
            var val = easing(currentTime, start, change, duration);
            move(val);
            if (currentTime < duration) {
                window.requestAnimationFrame(animateScroll);
            } else {
                callback();
            }
        };
        animateScroll();
    },
    smileBounce: function() {
        var smiles = geByClass('landing_vkmusic__end_smile');

        for (var i = 0; i < smiles.length; i++) {
            if (hasClass(smiles[i], 'landing_vkmusic__end_smile_current')) {
                removeClass(smiles[i], 'landing_vkmusic__end_smile_current');

                if (smiles[i + 1]) {
                    addClass(smiles[i + 1], 'landing_vkmusic__end_smile_current');
                } else {
                    addClass(smiles[0], 'landing_vkmusic__end_smile_current');
                }
                break;
            }
        }

        this.bounceTimer = setTimeout(function() {
            landingVkMusic.smileBounce();
        }.bind(this), 2500);
    },
    bounce: function(elems, delay) {
        var self = this;

        if (!elems) {
            return;
        }
        each(elems, function(i, album) {
            var time = self.easeOutCubic(i, 0, delay, elems.length) * 10;

            setTimeout(function() {
                addClass(album, 'landing_vkmusic__bounce');
                addEvent(album, 'animationend', function() {
                    addClass(this, 'landing_vkmusic__bounce_end');
                });
            }, time);
        });
    },
    easeOutCubic: function(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    },
    easeInCubic: function(t, b, c, d) {
        var tc = (t /= d) * t * t;
        return b + c * (tc);
    }
};

try {
    stManager.done('landings/vkmusic.js')
} catch (e) {}