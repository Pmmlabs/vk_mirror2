var Print = {
    init: function(items, selected) {
        cur.domain = this.defaultDomain;
        cur.qrcode = null;
        cur.drawingSupported = !!window.HTMLCanvasElement;
        cur.frames = [];
        cur.downloading = 0;

        (window.wkcur ? wkcur._hide : cur.destroy).push(this.destroy);

        if (window.wkcur) {
            wkcur.editor = {
                changed: false
            };
            wkcur.edit = true;
            wkcur.lang = {
                pages_close_title: getLang('print_close_title'),
                pages_close_text: getLang('print_close_text')
            };
        }

        if (!hasClass(ge('print_dd'), 'disabled')) {
            WideDropdown.deinit('print_dd');
            var dd = WideDropdown.init('print_dd', {
                defaultItems: items,
                url: 'al_print.php',
                params: {
                    act: 'search'
                },
                noResult: getLang('print_group_not_found'),
                introText: getLang('print_group_placeholder'),
                onChange: function(act) {
                    if (act == 1) {
                        this.groupSelected(this.getSelected(dd));
                    } else {
                        this.groupRemoved();
                    }
                }.bind(this)
            });
            if (dd && selected != null) {
                WideDropdown.select('print_dd', false, selected);
                cur.domainSelected = true;
            }
        }

        addClass(ge('print_dd'), 'disabled');
        ge('print_dd_input').setAttribute('disabled', 'disabled');

        var relWrapEl = ge('print_table_wrap_rel'),
            disablingOverlay = ge('print_disabling_overlay'),
            loadingOverlay = ge('print_loading_overlay'),
            emptyOverlay = ge('print_empty_overlay'),
            tableEl = ge('print_table'),
            contentEl = ge('print_content');
        var tableWidth = tableEl.offsetWidth,
            tableHeight = tableEl.offsetHeight;

        if (cur.drawingSupported) {
            this.preloadFonts(function() {
                debugLog("print.js: fonts successfully preloaded");
                cur.fontsPreloaded = true;

                removeClass(ge('print_dd'), 'disabled');
                ge('print_dd_input').removeAttribute('disabled');

                if (cur.domain) {
                    this.drawPreviews();
                }

                if (cur.domainSelected) {
                    this.hideOverlay(disablingOverlay);
                }

                // Hide loading
                addClass(loadingOverlay, 'nospinner');
                setStyle(loadingOverlay, 'opacity', 1);
                animate(loadingOverlay, {
                    opacity: 0
                }, this.anim.hideLoading, function() {
                    re(loadingOverlay);
                });
            }.bind(this), function() {
                //cur.fontsPreloaded = true;
                cur.drawingSupported = false;
                this.initFallback();
                debugLog('print.js was failed to preload fonts');
            }.bind(this));
        } else {
            this.initFallback();
        }

        cur.vkmeRadioBtn = new Radiobutton(ge('print_domain_vkcom'), {
            width: '90',
            label: 'vk.com',
            checked: (cur.vk_domain.indexOf('.com') > -1),
            onSelect: function(value) {
                this.domainChanged(value);
            }.bind(this)
        });

        cur.vkcomRadioBtn = new Radiobutton(ge('print_domain_vkme'), {
            width: '65',
            label: 'vk.me',
            checked: (cur.vk_domain.indexOf('.me') > -1),
            onSelect: function(value) {
                this.domainChanged(value);
            }.bind(this)
        });

        setStyle(disablingOverlay, 'opacity', this.disablingOverlayOpacity);
        each([loadingOverlay, disablingOverlay, emptyOverlay], function(i, el) {
            setStyle(el, {
                width: tableWidth + 'px',
                height: tableHeight + 'px'
            });
        });

        addClass(tableEl, 'visible');
    },
    initFallback: function() {
        addClass(ge('print_content'), 'print_old');
        removeClass(ge('print_dd'), 'disabled');
        ge('print_dd_input').removeAttribute('disabled');
    },
    destroy: function() {
        cur.ignoreProgress = true;
        each(cur.frames || [], function(k, v) {
            re(v);
        });
        try {
            if (cur.urlsRequest) cur.urlsRequest.abort();
            if (cur.progressRequest) cur.progressRequest.abort();
        } catch (e) {}
    },
    groupSelected: function(group) {
        var id = intval(group[0]),
            is_group = id < 0,
            domain = group[4].substring(1);

        var emptyEl = ge('print_empty'),
            emptyAbsEl = ge('print_empty_abs'),
            dlWrapEl = ge('print_dl_wrap'),
            disablingOverlay = ge('print_disabling_overlay'),
            emptyOverlay = ge('print_empty_overlay');
        if (domain.match(/^(club|event|public|id)[\d]+$/)) {
            this._hideVis(emptyEl);

            var admLink = is_group ? group[4] + '?act=edit' : '/settings';
            var text = (getLang('print_' + (is_group ? 'group' : 'user') + '_no_address')).replace('%s', '<a href="' + group[4] + '">' + group[1] + '</a>');
            var textAdm = (getLang('print_' + (is_group ? 'group' : 'user') + '_change_address')).replace('{link}', '<a href="' + admLink + '" id="print_empty_for_admins_link">').replace('{/link}', '</a>');
            var emptyTextEl = ge('print_empty_text'),
                emptyForAdminsEl = ge('print_empty_for_admins'),
                emptyForAdminsLink = ge('print_empty_for_admins_link');

            emptyTextEl.innerHTML = text;
            if ((is_group && inArray(Math.abs(id), cur.admined)) ||
                (!is_group && vk.id == id)) {
                show(emptyForAdminsEl);
                emptyForAdminsEl.innerHTML = textAdm;
            } else {
                hide(emptyForAdminsEl);
            }

            // Show empty overlay
            this._hideVis(emptyOverlay);
            show(emptyOverlay);

            var totalHeight = emptyOverlay.offsetHeight,
                blockHeight = emptyEl.offsetHeight;
            setStyle(emptyAbsEl, {
                'height': blockHeight + 'px',
                'margin-top': '-' + Math.round(blockHeight / 2) + 'px'
            });

            this._showVis(emptyEl);
            this._showVis(emptyOverlay);

            this.showOverlay(emptyOverlay);
            return;
        }

        if (!isVisible(dlWrapEl)) slideDown(dlWrapEl, this.anim.toggle);

        cur.domain = domain;
        if (cur.fontsPreloaded) {
            this.drawPreviews();
            this.hideOverlay(disablingOverlay);
        } else if (!cur.drawingSupported) {
            this.hideOverlay(disablingOverlay);
        }

        if (!cur.urls[domain]) {
            cur.urlsRequest = ajax.post('/al_print.php', {
                act: 'get_urls',
                id: id,
                typo: (cur.typo ? 1 : 0)
            }, {
                onDone: function(data) {
                    if (data.urls) cur.urls[cur.domain] = data.urls;
                    cur.urlsRequest = null;
                }
            });
        }
    },
    groupRemoved: function() {
        var infoEl = ge('print_msg_wrap'),
            dlWrapEl = ge('print_dl_wrap'),
            disablingOverlay = ge('print_disabling_overlay'),
            emptyOverlay = ge('print_empty_overlay');

        if (isVisible(infoEl)) slideUp(infoEl, this.anim.info);
        if (isVisible(dlWrapEl)) slideUp(dlWrapEl, this.anim.toggle);
        if (isVisible(emptyOverlay)) this.hideOverlay(emptyOverlay);

        this.showOverlay(ge('print_disabling_overlay'), this.disablingOverlayOpacity);

        if (cur.urls[cur.domain]) {
            delete cur.urls[cur.domain];
        }

        cur.domain = this.defaultDomain;
        if (cur.fontsPreloaded) {
            this.drawPreviews();
        }

        if (cur.downloading == 1) {
            cur.ignoreProgress = true;
            this.hideProgress();
            if (cur.frames.length) {
                re(cur.frames.pop());
            }
        }

        try {
            if (cur.urlsRequest) cur.urlsRequest.abort();
            if (cur.progressRequest) cur.progressRequest.abort();
        } catch (e) {}

        elfocus('print_dd_input');
    },
    getSelected: function(wdd) {
        var sel = wdd.selected;
        for (var key in sel) {
            return sel[key];
        }
    },
    domainChanged: function(value) {
        if (value == 0) {
            cur.vk_domain = 'vk.com';
        } else {
            cur.vk_domain = 'vk.me'
        }
        var disablingOverlay = ge('print_disabling_overlay');

        if (cur.fontsPreloaded) {
            this.drawPreviews();
            this.hideOverlay(disablingOverlay);
        } else if (!cur.drawingSupported) {
            this.hideOverlay(disablingOverlay);
        }
    },

    //
    // downloading
    //
    download: function(type, format) {
        if (!cur.urls[cur.domain]) return false;
        var vk_domain = cur.vk_domain.indexOf('.me') > -1 ? 'me' : 'com';
        var url = cur.urls[cur.domain][vk_domain][type][format];

        url += '&vk_domain=' + vk_domain;
        if (!url) {
            return false;
        }

        var iframe = ce('iframe', {
            src: url
        });
        utilsNode.appendChild(iframe);
        cur.frames.push(iframe);

        return false;
    },
    downloadAll: function() {
        var vk_domain = cur.vk_domain.indexOf('.me') > -1 ? 'me' : 'com';
        if (!cur.urls[cur.domain] || !cur.urls[cur.domain][vk_domain].zip) return false;

        var url = cur.urls[cur.domain][vk_domain].zip;
        cur.ignoreProgress = false;
        cur.downloading = 1;

        this.showProgress();
        this.getProgress();

        var iframe = ce('iframe', {
            src: url
        });
        utilsNode.appendChild(iframe);
        cur.frames.push(iframe);

        return false;
    },
    showProgress: function() {
        var button = ge('print_dl_button_wrap'),
            progress = ge('print_dl_progress_abs'),
            done = ge('print_dl_done_abs');

        setStyle(progress, 'visibility', 'visible');
        animate(progress, {
            opacity: 1
        }, this.anim.progress);
        animate(button, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(button, {
                visibility: 'hidden'
            });
        });

        if (window.wkcur) window.wkcur.editor.changed = true;
    },
    showProgressDone: function() {
        var button = ge('print_dl_button_wrap'),
            progress = ge('print_dl_progress_abs'),
            done = ge('print_dl_done_abs');

        setStyle(done, 'visibility', 'visible');
        animate(done, {
            opacity: 1
        }, this.anim.progress);
        animate(progress, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(progress, {
                visibility: 'hidden'
            });
        });

        if (window.wkcur) window.wkcur.editor.changed = false;

        clearTimeout(cur.hideProgressTimeout);
        cur.hideProgressTimeout = setTimeout(function() {
            this.hideProgress();
        }.bind(this), 3000);
    },
    hideProgress: function() {
        clearTimeout(cur.hideProgressTimeout);
        var button = ge('print_dl_button_wrap'),
            progress = ge('print_dl_progress_abs'),
            done = ge('print_dl_done_abs');

        setStyle(button, 'visibility', 'visible');
        animate(button, {
            opacity: 1
        }, this.anim.progress);
        animate(done, {
            opacity: 0
        }, this.anim.progress, function() {
            setStyle(done, {
                visibility: 'hidden'
            });
        });
        if (floatval(getStyle(progress, 'opacity')) > 0) {
            animate(progress, {
                opacity: 0
            }, this.anim.progress, function() {
                setStyle(progress, {
                    visibility: 'hidden'
                });
            });
        }
        setStyle(ge('print_dl_progress_fill'), {
            width: '0px'
        });

        if (window.wkcur) window.wkcur.editor.changed = false;
        cur.downloading = 0;
    },
    getProgress: function() {
        if (cur.ignoreProgress) {
            this.hideProgress();
            return;
        }
        var vk_domain = cur.vk_domain.indexOf('.me') > -1 ? 'me' : 'com';
        var interval = 750,
            start = new Date().getTime();
        cur.progressRequest = ajax.plainpost(cur.urls[cur.domain][vk_domain].zip_progress, {}, function(data) {
            if (cur.ignoreProgress) {
                this.hideProgress();
                return;
            }

            data = parseJSON(data);
            var time = new Date().getTime(),
                val = floatval(data.progress);
            if (val >= 100) {
                this.setProgress(val);
                setTimeout(function() {
                    cur.downloading = 2;
                    this.showProgressDone();
                    this.setProgress(0);
                }.bind(this), 300);
                return;
            }

            this.setProgress(val);

            if (time - start >= interval) {
                this.getProgress();
            } else {
                setTimeout(function() {
                    this.getProgress();
                }.bind(this), interval - (time - start));
            }
        }.bind(this));
    },
    setProgress: function(val) {
        if (val <= 0) return;
        var total = ge('print_dl_progress').offsetWidth,
            cur = total / 100 * val;
        animate(ge('print_dl_progress_fill'), {
            width: cur,
            overflow: 'visible'
        }, this.anim.progress);
    },
    showFormatInfo: function(format, el) {
        var text = getLang('print_' + format + '_hint');
        text = text.replace('{tag}', '<span class="print_tt_normal">').replace('{/tag}', '</span>');

        showTooltip(el, {
            content: '<div class="tt_text">' + text + '</div>',
            slide: 15,
            black: 1,
            className: 'print_tt' + (format == 'epsp' ? ' print_wrap' : '')
        });
    },
    showFloodError: function() {
        showFastBox({
            title: getLang('global_error'),
            dark: 1
        }, getLang('print_flood_error'));
        cur.ignoreProgress = true;
    },

    //
    // drawing-related
    //
    drawPreviews: function() {
        if (!cur.drawingSupported) return

        var domain = cur.domain;
        if (!domain) return;

        var textWidths = {
            1: this.measureTextWidths(domain, this.fontSize)
        };
        var textHeights = {
            1: this.measureFontHeight(this.fontLine.replace('{size}', this.fontSize + 'px'))
        };

        var horizTd = geByClass1('print_preview_horiz'),
            horizWidth = horizTd.clientWidth - intval(getStyle(horizTd, 'padding-left')) - intval(getStyle(horizTd, 'padding-right'));

        each(this.types, function(type, config) {
            var isHoriz = (type != 'qr');
            var cnv = ge('print_canvas_' + type),
                cnvHolder = ge('print_canvas_holder_' + type),
                ctx, cnvSize;
            var scale = 1;

            if (cnv) re(cnv);

            cnv = ce('canvas');
            this._hideVis(cnvHolder);
            hide(cnv);
            cnvHolder.appendChild(cnv);

            if (isHoriz) {
                extend(cnvHolder.style, {
                    width: 'auto',
                    height: config.height + 'px',
                    borderRadius: config.radius + 'px',
                    paddingLeft: config.paddingLeft + 'px',
                    paddingRight: config.paddingRight + 'px'
                });

                if (type == 'logo') {
                    extend(ge('print_preview_logo_sq').style, {
                        width: config.height + 'px',
                        height: config.height + 'px',
                        marginRight: config.logoMargin + 'px',
                        backgroundSize: config.height + 'px ' + config.height + 'px',
                        borderRadius: config.radius + 'px'
                    });
                }
            }

            cnv.setAttribute('id', 'print_canvas_' + type);
            cnv.setAttribute('height', config.height);

            if (isHoriz) {
                var cnvWidth = Math.round(textWidths[scale].prefix + textWidths[scale].domain);
                cnv.setAttribute('width', cnvWidth);

                var cnvHolderWidth = cnvWidth;
                switch (type) {
                    case 'logo':
                        cnvHolderWidth += config.height + config.logoMargin + config.paddingLeft + config.paddingRight;
                        break;
                    case 'simple_blue':
                    case 'simple_white':
                        cnvHolderWidth += config.paddingLeft + config.paddingRight;
                        break;
                }

                if (cnvHolderWidth > horizWidth) {
                    scale = horizWidth / cnvHolderWidth;
                    var height = (config.height * scale);
                    cnv.setAttribute('width', (cnvWidth * scale) + 'px');
                    cnv.setAttribute('height', height + 'px');
                    extend(cnvHolder.style, {
                        height: height + 'px',
                        borderRadius: (config.radius * scale) + 'px',
                        paddingLeft: (config.paddingLeft * scale) + 'px',
                        paddingRight: (config.paddingRight * scale) + 'px'
                    });

                    if (type == 'logo') {
                        extend(ge('print_preview_logo_sq').style, {
                            width: Math.round(height) + 'px',
                            height: Math.round(height) + 'px',
                            borderRadius: (config.radius * scale) + 'px',
                            marginRight: (config.logoMargin * scale) + 'px',
                            backgroundSize: Math.round(height) + 'px ' + Math.round(height) + 'px'
                        });
                    }

                    if (textHeights[scale] === undefined) {
                        textHeights[scale] = this.measureFontHeight(this.fontLine.replace('{size}', this.roundFontSize(this.fontSize * scale) + 'px'));
                        textWidths[scale] = this.measureTextWidths(domain, this.roundFontSize(this.fontSize * scale));
                    }

                    // safari fix
                    var sumTextWidth = textWidths[scale].prefix + textWidths[scale].domain;
                    if (sumTextWidth < cnvWidth * scale) {
                        cnv.setAttribute('width', sumTextWidth + 'px');
                    }
                }
            } else {
                cnv.setAttribute('width', config.width);
            }

            var textHeight = textHeights[scale];

            ctx = cnv.getContext('2d');
            cnvSize = {
                width: cnv.width,
                height: cnv.height
            };

            this.fixCanvas(cnv);

            if (type == 'qr') {
                var h = this.calcQrFontSize(domain, 124, 18);
                var fh = this.measureFontHeight('bold ' + h + 'px "Myriad Pro"');

                ctx.font = 'bold ' + h + 'px "Myriad Pro"';
                ctx.fillStyle = config.textColor;
                ctx.textBaseline = 'alphabetic';
                ctx.textAlign = 'center';
                ctx.fillText(domain, cnvSize.width / 2, cnvSize.height / 2 + fh / 4);
            } else {
                var fontSize = this.roundFontSize(this.fontSize * scale);
                var fontLine = this.fontLine.replace('{size}', fontSize + 'px'),
                    boldFontLine = this.boldFontLine.replace('{size}', fontSize + 'px');

                ctx.textBaseline = 'alphabetic';
                ctx.fillStyle = config.textColor;

                ctx.font = fontLine;
                ctx.fillText(cur.vk_domain + '/', 0,
                    cnvSize.height / 2 + (textHeight / 4) + config.yoffset * scale);

                ctx.font = boldFontLine;
                ctx.fillText(domain, textWidths[scale].prefix,
                    cnvSize.height / 2 + (textHeight / 4) + config.yoffset * scale);
            }

            show(cnvHolder);
            this._showVis(cnvHolder);
            show(cnv);
        }.bind(this));

        var address = "http://" + cur.vk_domain + "/" + domain;
        if (!cur.qrcode) {
            cur.qrcode = new QRCode(ge('print_qrcode'), {
                text: address,
                width: this.qrCodeSize[0],
                height: this.qrCodeSize[1],
                colorDark: this.qrCodeColor,
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
                vkLogo: {
                    sizes: {
                        29: {
                            width: 11,
                            height: 8
                        },
                        33: {
                            width: 13,
                            height: 9
                        },
                        37: {
                            width: 13,
                            height: 10
                        },
                        41: {
                            width: 15,
                            height: 11
                        }
                    }
                }
            });
        } else {
            cur.qrcode.clear();
            cur.qrcode.makeCode(address);
        }
    },
    calcQrFontSize: function(text, width, max_height) {
        if (!utilsNode) {
            return;
        }

        // max = 18 or 20
        // min = 4.2

        var plus = 4.2;
        var max = max_height - plus;

        var tc = ce('canvas'),
            tcctx = tc.getContext('2d');
        var i = max,
            size = i + plus,
            w, half = i,
            iters = 0;

        while (true) {
            size = i + plus;

            tcctx.font = this.fontLine.replace('{size}', size + 'px');
            w = tcctx.measureText(text).width;

            if ((w < width && i == max) || Math.abs(w - width) <= 2 || iters >= 25) {
                return Math.round(size * 100) / 100 - (iters >= 25 ? 1 : 0);
            }

            if (w > width) i -= half / 2;
            else i += half / 2;

            half /= 2;
            iters++;
        }
    },
    measureTextWidths: function(domain, fontSize) {
        var tc = ce('canvas'),
            tcctx = tc.getContext('2d'),
            vals = {};

        tcctx.font = this.fontLine.replace('{size}', fontSize + 'px');
        vals.prefix = tcctx.measureText(cur.vk_domain + '/').width;

        tcctx.font = this.boldFontLine.replace('{size}', fontSize + 'px');
        vals.domain = tcctx.measureText(domain).width;

        return vals;
    },
    measureFontHeight: function(fontLine) {
        var cnv = document.createElement('canvas'),
            ctx = cnv.getContext('2d');
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'white';
        ctx.font = fontLine;
        ctx.fillText('gM', 0, 0);

        var pixels = ctx.getImageData(0, 0, cnv.width, cnv.height).data;
        var start = -1;
        var end = -1;
        for (var row = 0; row < cnv.height; row++) {
            for (var column = 0; column < cnv.width; column++) {
                var index = (row * cnv.width + column) * 4;
                if (pixels[index] === 0) {
                    if (column === cnv.width - 1 && start !== -1) {
                        end = row;
                        row = cnv.height;
                        break;
                    }
                    continue;
                } else {
                    if (start === -1) {
                        start = row;
                    }
                    break;
                }
            }
        }
        return end - start;
    },
    preloadFonts: function(callback, onerror) {
        var glyphs = "\uE600\uE601\uE602\uE605";
        var preloadNormal = function() {
                loadFontFace("Myriad Pro", {
                    success: preloadBold,
                    error: function() {
                        onerror && onerror();
                    },
                    timeout: this.preloadFontsTimeout,
                    glyphs: glyphs
                });
            }.bind(this),

            preloadBold = function() {
                loadFontFace("Myriad Pro", {
                    success: function() {
                        if (!browser.safari) callback();
                        else {
                            // strange safari bug
                            setTimeout(callback, 150);
                        }
                    },
                    error: function() {
                        onerror && onerror();
                    },
                    weight: '700',
                    timeout: this.preloadFontsTimeout,
                    glyphs: glyphs
                });
            }.bind(this);

        preloadNormal()
    },
    fixCanvas: function(canvas) {
        if (canvas && !canvas._retinaFixed && window.devicePixelRatio > 1) {
            var ctx = canvas.getContext('2d');
            var canvasWidth = canvas.width,
                canvasHeight = canvas.height;
            canvas.setAttribute('width', canvasWidth * window.devicePixelRatio);
            canvas.setAttribute('height', canvasHeight * window.devicePixelRatio);
            setStyle(canvas, {
                width: canvasWidth + 'px',
                height: canvasHeight + 'px'
            });
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            canvas._retinaFixed = true;
        }
    },
    roundFontSize: function(size) {
        return Math.round(size * 10) / 10;
    },
    showOverlay: function(el, opacity) {
        if (opacity === undefined) opacity = 1;
        show(el);
        animate(el, {
            opacity: opacity
        }, this.anim.toggle);
    },
    hideOverlay: function(el) {
        animate(el, {
            opacity: 0
        }, this.anim.toggle, function() {
            hide(el);
        });
    },
    _showVis: function(el) {
        setStyle(el, 'visibility', 'visible');
    },
    _hideVis: function(el) {
        setStyle(el, 'visibility', 'hidden');
    },

    // Config
    types: {
        qr: {
            height: 32,
            width: 160,
            textColor: '#ffffff'
        },
        logo: {
            height: 40,
            textColor: '#ffffff',
            logoMargin: 4,
            paddingLeft: 10,
            paddingRight: 10,
            radius: 6,
            yoffset: 1
        },
        simple_blue: {
            paddingLeft: 10,
            paddingRight: 10,
            height: 32,
            textColor: '#ffffff',
            radius: 6,
            yoffset: 1
        },
        simple_white: {
            paddingLeft: 10,
            paddingRight: 10,
            height: 30,
            textColor: '#4d75a3',
            radius: 6,
            yoffset: 1
        },
    },
    formats: ['png', 'eps', 'epsp'],
    defaultDomain: 'team',
    anim: {
        toggle: 200,
        info: 150,
        progress: 200,
        hideLoading: 300
    },
    disablingOverlayOpacity: 0.55,
    preloadFontsTimeout: 15000,
    fontSize: 21,
    fontLine: '{size} "Myriad Pro"',
    boldFontLine: 'bold {size} "Myriad Pro"',
    prefix: 'vk.com/',
    qrCodeColor: '#4b75a3',
    qrCodeSize: [124, 124],
};

// Based on https://github.com/zachleat/fontfaceonload
function loadFontFace(fontFamily, options) {
    // lighter and bolder are not supported
    var weightLookup = {
            normal: '400',
            bold: '700'
        },

        defaultOptions = {
            tolerance: 2, // px
            delay: 100,
            glyphs: '',
            success: function() {},
            error: function() {},
            timeout: 5000,
            weight: '400', // normal
            style: 'normal'
        },

        // See https://github.com/typekit/webfontloader/blob/master/src/core/fontruler.js#L41
        style = {
            'display': 'block',
            'font-size': '48px',
            'line-height': 'normal',
            'font-variant': 'normal',
            'white-space': 'nowrap',
            'position': 'absolute',
            'visibility': 'hidden',
            'top': '-9999px',
            'left': '-9999px',
            'width': 'auto',
            'height': 'auto',
            'margin': '0',
            'padding': '0'
        },

        timeout, startTime, dimensions, appended, parent, serif, sansSerif;

    function getStyleString(obj) {
        var style = [];
        each(obj, function(k, v) {
            style.push(k + ':' + v);
        });
        return style.join(';');
    }

    function hasNewDimensions(dims, el, tolerance) {
        return Math.abs(dims.width - el.offsetWidth) > tolerance ||
            Math.abs(dims.height - el.offsetHeight) > tolerance;
    }

    function isTimeout() {
        return (new Date()).getTime() - startTime.getTime() > options.timeout;
    }

    function getMeasurements() {
        return {
            sansSerif: {
                width: sansSerif.offsetWidth,
                height: sansSerif.offsetHeight
            },
            serif: {
                width: serif.offsetWidth,
                height: serif.offsetHeight
            }
        };
    }

    function checkDimensions() {
        if (!appended) {
            utilsNode.appendChild(parent);
            appended = true;

            dimensions = getMeasurements();

            if (browser.opera && !browser.chrome) {
                sansSerif.style.fontFamily = '"' + fontFamily + '", sans-serif';
                serif.style.fontFamily = '"' + fontFamily + '", serif';
            } else {
                setStyle(sansSerif, 'font-family', '"' + fontFamily + '", sans-serif');
                setStyle(serif, 'font-family', '"' + fontFamily + '", serif');
            }
        }

        if (appended && dimensions && (
                hasNewDimensions(dimensions.sansSerif, sansSerif, options.tolerance) ||
                hasNewDimensions(dimensions.serif, serif, options.tolerance))) {
            re(parent);
            options.success();
        } else if (isTimeout()) {
            re(parent);
            options.error();
        } else {
            if (!appended && "requestAnimationFrame" in window) {
                window.requestAnimationFrame(checkDimensions);
            } else {
                window.setTimeout(checkDimensions, options.delay);
            }
        }
    }

    function load() {
        var testString = 'AxmTYklsjo190QW' + options.glyphs;

        startTime = new Date();
        parent = ce('div');

        sansSerif = ce('div', {
            innerHTML: testString
        });
        serif = ce('div', {
            innerHTML: testString
        });

        sansSerif.setAttribute('style', getStyleString(extend({
            'font-family': 'sans-serif'
        }, style)));
        serif.setAttribute('style', getStyleString(extend({
            'font-family': 'serif'
        }, style)));

        parent.appendChild(sansSerif);
        parent.appendChild(serif);

        checkDimensions();
    }

    function checkFontFaces(timeout) {
        each(document.fonts, function(font) {
            if (font.family.toLowerCase() === fontFamily.toLowerCase() && (weightLookup[font.weight] || font.weight) === '' + options.weight && font.style === options.style) {
                font.load().then(function() {
                    options.success();
                    clearTimeout(timeout);
                });
            }
        });
    }

    // Go
    for (var j in defaultOptions) {
        if (!options.hasOwnProperty(j)) {
            options[j] = defaultOptions[j];
        }
    }

    style['font-weight'] = options.weight;
    style['font-style'] = options.style;

    // For some reason this was failing on afontgarde + icon fonts.
    if (!options.glyphs && "fonts" in document) {
        if (options.timeout) {
            timeout = setTimeout(function() {
                options.error();
            }, options.timeout);
        }
        checkFontFaces(timeout);
    } else {
        load();
    }
}

try {
    stManager.done('print.js');
} catch (e) {}