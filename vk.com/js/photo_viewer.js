PhotoViewer = function(options) {
    var
        defaults = {
            prefix: 'viewer_',
            logo: 'viewer_logo.png',
            logo_vk: 'viewer_logo_vk.png',
            thumbSize: [50, 50],
            maxThumbs: 15,
            thumbIdxPrefix: 'pv_thumb_',
            idx: 0,
            noExitValue: 15
        },
        pubcicMethods = {},
        ready = false,
        needIEFix = browser.msie && (browser.version == 6 || browser.version == 7),
        currentIdx = 0,
        currentRealIdx = 0,
        currentThumbIdx = -1,
        currentHashPID,
        hideThumbs = false,
        thumbsAnimating = false,
        needShowFullThumb = true,
        showThumbOnCurrent = false,
        albumLoading = false,
        previewImage,
        photosList,
        mouseXY,
        ahOrigHandlers = {},
        allowSetHash = true,
        hideThumbsNav = false;

    options = extend(defaults, options);

    /* Misc */
    function getPhotoIdx(id) {
        var
            idx = 0;

        if (id != 0) {
            for (var i = 0, j = photosList.length; i < j; i++) {
                if (photosList[i][0] == id) {
                    idx = i;
                }
            }
        }
        return idx;
    }

    function getViewSize() {
        var
            key = document.compatMode == 'CSS1Compat' ? 'documentElement' : 'body',
            el = document[key];
        return [el.clientWidth, el.clientHeight];
    }

    /* Init routine */
    function initCanvas() {
        var
            fragment = document.createDocumentFragment(),
            viewer = document.createElement('div'),
            i, j, nodes, node;

        viewer.innerHTML = getCanvasHTML();
        nodes = viewer.childNodes;
        for (i = 0, j = nodes.length; i < j; i++) {
            node = nodes[i].cloneNode(true);
            fragment.appendChild(node);
        }
        document.body.appendChild(fragment);
        setCanvas();
    }

    function initLogo() {
        var
            re = /(?:^|\.)(vkontakte\.ru|vk\.com)$/i,
            logo,
            domain,
            styles = {};

        domain = re.exec(location.hostname)[1];
        switch (domain) {
            case 'vkontakte.ru':
                logo = options.logo;
                break;
            case 'vk.com':
                logo = options.logo_vk;
                break;
        }
        logo = '/images/' + logo;

        if (!browser.msie6) {
            styles.background = 'url(\'' + logo + '\') 0 0 no-repeat';
        } else {
            styles.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + logo + '\')';
        }
        setStyle(ge('pv_vk_logo'), styles);
    }

    function initThumbs() {
        var
            thumb,
            thumbs = document.createDocumentFragment();

        for (i = 0; i < photosList.length; i++) {
            thumb = document.createElement('div');
            thumb.id = 'pv_thumb_' + i;
            thumb.className = 'pv_thumb_wrap';
            thumbs.appendChild(thumb);
        }
        setStyle(ge('pv_bottom_thumbs'), {
            width: 53 * photosList.length + 1
        });
        ge('pv_bottom_thumbs').appendChild(thumbs);
        thumbs = null;
        setThumbs();
    }

    function initEvents() {
        var keyev = (!browser.msie && !browser.safari && !browser.chrome) ? 'keypress' : 'keydown';
        addEvent(ge('pv_canvas'), 'click mouseover mouseout', dispatchMouseEvent);
        addEvent(document, keyev, dispatchKeyboardEvent);
        addEvent(window, 'resize', resizeCanvas);
        addEvent(ge('pv_canvas'), 'mousewheel', dispatchMouseEvent);
    }

    function deInitEvents() {
        var keyev = (!browser.msie && !browser.safari && !browser.chrome) ? 'keypress' : 'keydown';
        removeEvent(ge('pv_canvas'));
        removeEvent(window, 'resize', resizeCanvas);
        removeEvent(document, keyev, dispatchKeyboardEvent);
    }

    function init() {
        initCanvas();
        initLogo();
        //initThumbs();
        //setThumbs();
    }

    /* Resize routine */
    function setCanvas() {
        var
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        addClass(document.body, 'bodyNoScroll');
        addClass(ge('pageContainer'), 'pageFakeBody');
        each(ge('pv_bg', 'pv_canvas'), function() {
            setStyle(this, {
                top: scrollTop
            });
        });
        setStyle(ge('pageContainer'), {
            marginTop: scrollTop
        });
        ge('pageContainer').scrollTop = scrollTop;
        if (browser.msie6) {
            setStyle(document.getElementsByTagName('html')[0], {
                overflowX: 'hidden'
            });

            ge('pv_full_photo_img').setAttribute('galleryimg', 'no');
            setStyle(ge('pageContainer'), {
                position: 'absolute',
                top: 0
            });
        }
        if (browser.msie && browser.version == 7) {
            setStyle(document.getElementsByTagName('html')[0], {
                overflowY: 'hidden'
            });
        }
        if (needIEFix) {
            setStyle(ge('pv_full_photo_img'), {
                position: 'static'
            });
        }
        removeClass(ge('pv_vk_close'), 'pv_vk_close_hover');
        setStyle(ge('pv_vk_close'), 'opacity', 0.7);
        resizeCanvas();
    }

    function restoreCanvas() {
        removeClass(document.body, 'bodyNoScroll');
        removeClass(ge('pageContainer'), 'pageFakeBody');
        setStyle(ge('pageContainer'), {
            marginTop: 0
        });
        ge('pageContainer').scrollTop = 0;
        if (browser.msie6) {
            setStyle(document.getElementsByTagName('html')[0], {
                overflowX: 'scroll'
            });
            setStyle(ge('pageContainer'), {
                position: 'absolute',
                top: 0
            });
        }
        if (browser.msie && browser.version == 7) {
            setStyle(document.getElementsByTagName('html')[0], {
                overflowY: 'auto'
            });
        }
    }

    function resizeCanvas() {
        var
            size = getViewSize(),
            scrollTop;

        hideFullThumb();
        needShowFullThumb = false;
        each(ge('pv_bg', 'pv_canvas'), function() {
            setStyle(this, {
                width: size[0],
                height: size[1]
            });
        });
        setNavigation();
        if (ready) {
            setCurrent();
        }
        if (browser.chrome || browser.safari) {
            scrollTop = intval(getStyle('pageContainer', 'margin-top'));
            window.scrollTo(0, scrollTop);
        }
    }

    function showAlbumLoader() {
        var
            loaderSize,
            viewSize = getViewSize();

        show('pv_album_progress');
        hide('pv_bottom_thumbs', 'pv_bottom_nav', 'pv_bottom_layer_left', 'pv_bottom_layer_right');
        loaderSize = getSize(ge('pv_album_progress'));
        setStyle(ge('pv_album_progress'), {
            left: Math.round((viewSize[0] - loaderSize[0]) / 2),
            marginTop: 27
        });
    }

    function hideAlbumLoader() {
        hide('pv_album_progress');
        show('pv_bottom_thumbs', 'pv_bottom_nav', 'pv_bottom_layer_left', 'pv_bottom_layer_right');
    }

    function closeViewer() {
        deInitEvents();
        var pid = photosList[currentRealIdx][0];
        restoreCanvas();
        hide('pv_bg', 'pv_canvas');
        removeEvent(ge('pv_canvas'), 'click mouseover mouseout', dispatchMouseEvent);
        removeEvent(document, (false && !browser.msie) ? 'keypress' : 'keyup', dispatchKeyboardEvent);
        removeEvent(window, 'resize', resizeCanvas);
        removeEvent(ge('pv_canvas'), 'mousewheel', dispatchMouseEvent);
        if ($ah.enabled && pid != cur_photo) {
            ahOrigHandlers['before']({
                act: 'photo_info',
                photo: pid,
                uid: window.watched_uid
            });
            Ajax.Send('/photos.php', $ah.onLoad['photo'].show.from(pid), {
                onSuccess: $ah.onLoad['photo'].done,
                onFail: $ah.onLoad['photo'].fail
            });
            //ajaxHistory.go("photo", {act:'photo_info', photo: pid, uid: window.watched_uid});
        }
        removeViewerAH();
    }

    function setNavigation() {
        var
            navSize = getSize(ge('pv_bottom_nav')),
            viewSize = getViewSize();

        setStyle(ge('pv_bottom_nav'), {
            left: Math.round((viewSize[0] - navSize[0]) / 2) + 2
        });

        edgeWidth = Math.round((viewSize[0] - 53 * getMaxThumbs()) / 2);
        if (edgeWidth < 60) {
            edgeWidth = 60;
        }
        each(geByClass('pv_bottom_layer'), function() {
            setStyle(this, {
                width: edgeWidth
            });
        });
    }

    function setNavigationArrows(idx) {
        if (idx == 0) {
            hide('pv_bottom_prev');
            show('pv_bottom_next');
        } else if (idx == photosList.length - 1) {
            hide('pv_bottom_next');
            show('pv_bottom_prev');
        } else {
            show('pv_bottom_prev', 'pv_bottom_next');
        }
    }

    function setFastNavigationArrows(range) {
        if (range[0] <= 0 && currentIdx == 0) {
            hide('pv_bottom_layer_btn_left');
            setStyle(ge('pv_bottom_layer_bg_left'), {
                opacity: 0.5
            });
            show('pv_bottom_layer_btn_right');
        } else if (range[1] >= photosList.length - 1 && currentIdx == photosList.length - 1) {
            hide('pv_bottom_layer_btn_right');
            setStyle(ge('pv_bottom_layer_bg_right'), {
                opacity: 0.5
            });
            show('pv_bottom_layer_btn_left');
        } else {
            show('pv_bottom_layer_btn_left', 'pv_bottom_layer_btn_right');
        }
    }

    function setThumbs() {
        var
            thumb,
            moveDiff,
            atime,
            maxThumbs = getMaxThumbs(),
            edgeMax = (maxThumbs - 1) / 2,
            range = [currentIdx - edgeMax, currentIdx + edgeMax],
            total = photosList.length;

        setStyle(ge('pv_bottom_thumbs'), {
            left: Math.ceil((getViewSize()[0] - 50) / 2)
        });

        setFastNavigationArrows(range);

        for (var i = range[0], j = range[1]; i <= j; i++) {
            if (i < 0 || i > photosList.length - 1) continue;
            thumb = ge('pv_thumb_' + i);
            if (getStyle(thumb, 'backgroundImage') == 'none') {
                setStyle(thumb, {
                    backgroundImage: 'url(' + photosList[i][1] + ')'
                });
            }
        }
        thumbsAnimating = true;
        moveDiff = Math.abs(Math.abs(intval(getStyle(ge('pv_bottom_thumbs'), 'marginLeft'))) - (currentIdx * 53));
        moveDiff = Math.round(moveDiff / 53) - 1;
        atime = 100 + 30 * moveDiff;
        atime = atime > 300 ? 300 : atime;
        //console.log(moveDiff);
        animate(ge('pv_bottom_thumbs'), {
            marginLeft: -(currentIdx * 53)
        }, atime, onSetThumbsEnd);
    }

    function onSetThumbsEnd() {
        thumbsAnimating = false;
        if (currentThumbIdx > 0 && currentThumbIdx < photosList.length - 1 && needShowFullThumb) {
            showFullThumb(ge('pv_thumb_' + currentThumbIdx));
        }
        setNavigationArrows(currentIdx);
        needShowFullThumb = true;
    }

    function setCurrent(el, needSetThumbs) {
        var
            el = el || ge('pv_thumb_' + currentIdx),
            needSetThumbs = (needSetThumbs !== undefined) ? needSetThumbs : true,
            idx = getThumbIdx(el);

        hideFullThumb(el);
        setNavigationArrows(idx);
        removeClass(ge('pv_thumb_' + currentIdx), 'pv_thumb_wrap_active');
        currentThumbIdx += idx - currentIdx;
        currentIdx = currentRealIdx = idx;
        if (needSetThumbs) {
            setThumbs();
        }
        addClass(el, 'pv_thumb_wrap_active');
        marginLeft = 53 * currentIdx;
        previewImage = new Image();
        previewImage.src = photosList[currentIdx][2];
        if (previewImage.width > 0 && previewImage.height > 0) {
            onMainPreviewReady(previewImage);
        } else {
            addEvent(previewImage, 'load', onLoadMainImage);
        }
        if (allowSetHash) {
            setHash();
        }
    }

    function onLoadMainImage(e) {
        var el = e.target;
        removeEvent(previewImage, 'load');
        onMainPreviewReady(el);
    }

    function onMainPreviewReady(el) {
        var
            maxViewSize,
            imageOrientation,
            imageData;

        maxViewSize = getMaxMainImageSize(el);
        setMainImage(maxViewSize);
    }

    function getMaxMainImageSize(el) {
        var
            viewSize,
            maxViewSize,

            maxViewSize = getViewSize();
        maxViewSize[1] -= 20 * 2;
        if (!hideThumbs) {
            maxViewSize[1] -= 64;
        }

        return maxViewSize;
    }

    function getMainImageVersion(idx, maxViewSize, imageRatio) {
        var
            photo = photosList[idx],
            i,
            sizesTypes = {
                6: [2560, 2048],
                5: [1280, 1024],
                4: [807, 807],
                3: [604, 604]
            },
            typeIdx,
            compFn,
            sizesDiff = {},
            sizeMinDiff = false,
            hasBigPhotos = false,
            fitImageSize,
            imageSize,
            baseValue,
            baseValueMax,
            minHeight,
            type,
            ratio,
            pid,
            url;

        ratio = Math.min((maxViewSize[0] / previewImage.width), (maxViewSize[1] / previewImage.height));
        fitImageSize = [
            Math.round(previewImage.width * ratio),
            Math.round(previewImage.height * ratio)
        ];
        baseValue = Math.max(fitImageSize[0], fitImageSize[1]);
        typeIdx = fitImageSize[0] > fitImageSize[1] ? 0 : 1;
        for (i in sizesTypes) {
            if (photo[i]) {
                baseValueMax = sizesTypes[i];
                if (i > 3) {
                    hasBigPhotos = true;
                    break;
                }
            }
        }

        if (hasBigPhotos) {
            for (i in sizesTypes) {
                if (photo[i]) {
                    sizesDiff[i] = Math.abs(baseValue - sizesTypes[i][typeIdx]);
                    if (sizeMinDiff === false) {
                        sizeMinDiff = [i, sizesDiff[i]];
                    } else if (sizesDiff[i] < sizeMinDiff[1]) {
                        sizeMinDiff = [i, sizesDiff[i]];
                    }
                }
            }
            type = intval(sizeMinDiff[0]);
            url = photo[type];
            if (baseValue > sizesTypes[type][typeIdx]) {
                if (type != 6 && photo[type + 1]) {
                    url = photo[type + 1];
                } else {
                    baseValue = sizesTypes[type][typeIdx];
                }
            }
        } else {
            url = photo[3];
            pid = photo[0].split('_')[1];
            minHeight = ((pid > 166957000 && imageRatio < 1) || imageRatio > 1) ? 604 : 480;
            baseValue = baseValue > minHeight ? minHeight : baseValue;
        }

        if (fitImageSize[0] > fitImageSize[1]) {
            imageSize = [
                baseValue,
                Math.round(baseValue / imageRatio)
            ];
        } else {
            imageSize = [
                Math.round(baseValue * imageRatio),
                baseValue
            ];
        }

        return {
            url: url,
            size: imageSize
        };
    }

    function setMainImage(maxViewSize) {
        var
            imageRatio,
            imageData,
            paddingTop;

        imageRatio = previewImage.width / previewImage.height;
        imageData = getMainImageVersion(currentIdx, maxViewSize, imageRatio);
        paddingTop = 20 + Math.round((maxViewSize[1] - imageData.size[1]) / 2);

        ge('pv_full_photo_img').src = '/images/blank.gif';
        setStyle(ge('pv_full_photo_img_wrap'), {
            paddingTop: paddingTop
        });
        setStyle(ge('pv_full_photo_img'), {
            width: imageData.size[0],
            height: imageData.size[1]
        });
        ge('pv_full_photo_img').src = photosList[currentIdx][2];
        ge('pv_full_photo_img').src = imageData.url;
        setImageWrap(imageData.size, paddingTop);
        cacheSiblingImages(maxViewSize, imageRatio);
    }

    function cacheSiblingImages(maxViewSize, imageRatio) {
        var
            idx = currentIdx,
            queue = [],
            imageData,
            cachedImage;

        if (photosList[idx - 1] != null) {
            queue.push(idx - 1);
        }
        if (photosList[idx + 1] != null) {
            queue.push(idx + 1);
        }
        for (var i = 0, j = queue.length; i < j; i++) {
            imageData = getMainImageVersion(queue[i], maxViewSize, imageRatio);
            cachedImage = new Image(1, 1);
            cachedImage.src = imageData.url;
        }
    }

    function setImageWrap(size, top) {
        var xy;
        setStyle(ge('pv_full_photo_outer_1'), {
            top: top - 1,
            width: size[0],
            height: size[1]
        });
        setStyle(ge('pv_full_photo_outer_2'), {
            top: top - 2,
            width: size[0] + 2,
            height: size[1] + 2
        });
        setStyle(ge('pv_full_photo_outer_3'), {
            top: top - 3,
            width: size[0] + 4,
            height: size[1] + 4
        });
        if (needIEFix) {
            addEvent(ge('pv_full_photo_img'), 'load', setImageWrapXY);
        }
    }

    function setImageWrapXY(e) {
        var
            el = e.target,
            xy = getXY(el);
        removeEvent(el, 'load', setImageWrapXY);
        setStyle(ge('pv_full_photo_outer_1'), {
            left: xy[0]
        });
        setStyle(ge('pv_full_photo_outer_2'), {
            left: xy[0]
        });
        setStyle(ge('pv_full_photo_outer_3'), {
            left: xy[0]
        });
    }

    function setCurrentRange(el) {
        var
            idx,
            edgeSize = (getMaxThumbs() - 1) / 2,
            dir = el.id.indexOf('right') > 0 ? 1 : -1;

        idx = currentIdx + (edgeSize + 1) * dir;
        if (idx < 0) {
            idx = 0;
        } else if (idx > photosList.length - 1) {
            idx = photosList.length - 1;
        }
        currentIdx = idx;
        hideFullThumb();
        setThumbs();
    }

    function toggleBottomMode() {
        hideThumbs = !hideThumbs;
        setStyle(ge('pv_bottom_ctrl'), {
            backgroundPosition: ('0 ' + (hideThumbs ? '-9px' : '0'))
        });
        needShowFullThumb = false;
        setCurrent(null, false);
    }

    function minimizeThumbs() {
        if (thumbsAnimating) {
            return;
        }
        hideFullThumb();
        thumbsAnimating = true;
        animate(ge('pv_bottom_menu'), {
            bottom: -64
        }, 200, onMinimizeThumbsEnd);
    }

    function restoreThumbs() {
        if (thumbsAnimating) {
            return;
        }
        thumbsAnimating = true;
        setStyle(ge('pv_bottom_restore'), {
            visibility: 'hidden'
        });
        animate(ge('pv_bottom_menu'), {
            bottom: 0
        }, 200, onRestoreThumbsEnd);
    }

    function onMinimizeThumbsEnd() {
        setStyle(ge('pv_bottom_restore'), {
            visibility: 'visible'
        });
        thumbsAnimating = false;
    }

    function onRestoreThumbsEnd() {
        thumbsAnimating = false;
    }

    /* Thumb tooltip */
    function getThumbIdx(el) {
        return intval(el.id.replace(defaults.thumbIdxPrefix, ''));
    }

    function getMaxThumbs() {
        var
            viewSize = getViewSize(),
            maxThumbs;

        maxThumbs = Math.round(viewSize[0] - (100 * 2) / 53);
        if (maxThumbs > 15) {
            maxThumbs = 15;
        } else if (maxThumbs > photosList.length) {
            maxThumbs = photosList.length;
        }
        if (maxThumbs % 2 == 0) {
            maxThumbs++;
        }
        while (maxThumbs * 53 > viewSize[0] - 60 * 2) {
            maxThumbs -= 2;
        }

        return maxThumbs;
    }

    function showFullThumb(el) {
        var
            prevThumbIdx = currentThumbIdx,
            el = el || ge('pv_thumb_' + currentThumbIdx);

        currentThumbIdx = getThumbIdx(el);
        if (thumbsAnimating) {
            return;
        }
        addClass(el, 'pv_thumb_wrap_active');
        if (!showThumbOnCurrent && prevThumbIdx == currentThumbIdx) {
            return;
        } else {
            showThumbOnCurrent = false;
        }
        ge('pv_thumb_tooltip_img').src = photosList[currentThumbIdx][2];
        addEvent(ge('pv_thumb_tooltip_img'), 'load', onLoadFullThumb);
    }

    function onLoadFullThumb(e) {
        var
            el = e.target,
            thumbXY,
            thumbSize,
            tooltipSize;

        removeEvent(el, 'load');
        //fadeTo(ge('pv_thumb_tooltip_wrap'), 100, 1);
        thumbXY = getXY(ge('pv_thumb_' + currentThumbIdx));
        thumbSize = getSize(ge('pv_thumb_' + currentThumbIdx));
        tooltipSize = getSize(el);
        setStyle(ge('pv_thumb_tooltip_border'), {
            width: tooltipSize[0],
            height: tooltipSize[1],
            top: needIEFix ? -3 : 0
        });
        setStyle(ge('pv_thumb_tooltip_wrap'), {
            left: thumbXY[0] + Math.ceil(options.thumbSize[0] / 2) - Math.ceil(tooltipSize[0] / 2),
            top: 'auto',
            bottom: 64
        });
        setStyle(ge('pv_thumb_tooltip_arrow_wrap'), {
            width: tooltipSize[0] + 6
        });
    }

    function hideFullThumb(el) {
        var
            el = el || ge('pv_thumb_' + currentThumbIdx);

        if (thumbsAnimating || !el) {
            return;
        }
        if (getThumbIdx(el) == currentIdx) {
            return;
        }
        removeClass(el, 'pv_thumb_wrap_active');
        //fadeTo(ge('pv_thumb_tooltip_wrap'), 100, 0);
        setStyle(ge('pv_thumb_tooltip_wrap'), {
            left: -9999,
            top: -9999,
            bottom: 'auto'
        });
    }

    function showCloseTip() {
        fadeTo(ge('pv_vk_close_tip'), 200, 1);
    }

    function hideCloseTip() {
        fadeTo(ge('pv_vk_close_tip'), 400, 0);
    }

    function handleExitClick(XY) {
        var
            offset;

        offset = [
            Math.abs(mouseXY[0] - XY[0]),
            Math.abs(mouseXY[1] - XY[1])
        ];
        if (offset[0] > options.noExitValue && offset[1] > options.noExitValue) {
            if (mouseXY[0] != -1 && mouseXY[1] != -1) {
                hideViewer();
            }
        }
        mouseXY = XY;
    }

    function getCanvasHTML() {
        return (
            '<div id="pv_bg" style="display:none;"></div>' +
            '<div id="pv_canvas" style="display:none;">' +
            '<div id="pv_top_menu">' +
            '<div id="pv_vk_logo"></div>' +
            '<div id="pv_vk_close_tip">' + getLang('photos_viewer_exit') + '</div>' +
            '<div id="pv_vk_close" class="pv_vk_close"></div>' +
            '</div>' +
            '<div id="pv_full_photo">' +
            '<div id="pv_full_photo_img_wrap">' +
            '<img id="pv_full_photo_img" src="/images/blank.gif" alt="" />' +
            '<div id="pv_full_photo_outer_1" class="pv_full_photo_outer"></div>' +
            '<div id="pv_full_photo_outer_2" class="pv_full_photo_outer"></div>' +
            '<div id="pv_full_photo_outer_3" class="pv_full_photo_outer"></div>' +
            '</div>' +
            '</div>' +
            '<div id="pv_bottom_menu">' +
            '<div id="pv_bottom_restore"></div>' +
            '<div id="pv_bottom_panel">' +
            '<div id="pv_bottom_thumbs"></div>' +
            '<div id="pv_bottom_nav">' +
            '<div id="pv_bottom_prev" class="pv_bottom_go"></div>' +
            '<div id="pv_bottom_nav_current">' +
            '<div id="pv_bottom_nav_current_in"></div>' +
            '</div>' +
            '<div id="pv_bottom_next" class="pv_bottom_go"></div>' +
            '</div>' +
            '<div id="pv_album_progress"></div>' +
            '</div>' +
            '<div class="pv_bottom_layer" id="pv_bottom_layer_left">' +
            '<div class="pv_bottom_layer_btn"  id="pv_bottom_layer_btn_left" onmouseover="addClass(this, \'pv_bottom_layer_btn_hover\');" onmouseout="removeClass(this, \'pv_bottom_layer_btn_hover\');">' +
            '<div class="pv_bottom_layer_bg" id="pv_bottom_layer_bg_left"></div>' +
            '</div>' +
            '</div>' +
            '<div class="pv_bottom_layer" id="pv_bottom_layer_right">' +
            '<div class="pv_bottom_layer_btn" id="pv_bottom_layer_btn_right" onmouseover="addClass(this, \'pv_bottom_layer_btn_hover\');" onmouseout="removeClass(this, \'pv_bottom_layer_btn_hover\');">' +
            '<div class="pv_bottom_layer_bg" id="pv_bottom_layer_bg_right"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="pv_bottom_ctrl_wrap">' +
            '<div id="pv_bottom_ctrl_bg" class="pv_bottom_ctrl_bg"  onmouseover="addClass(this, \'pv_bottom_ctrl_bg_hover\');" onmouseout="removeClass(this, \'pv_bottom_ctrl_bg_hover\');">' +
            '<div id="pv_bottom_ctrl"></div>' +
            '</div>' +
            '</div>' +
            '<div id="pv_thumb_tooltip_wrap">' +
            '<div>' +
            '<div id="pv_thumb_tooltip_border"></div>' +
            '<img id="pv_thumb_tooltip_img" src="/images/blank.gif" alt="" />' +
            '</div>' +
            '<div id="pv_thumb_tooltip_arrow_wrap">' +
            '<div id="pv_thumb_tooltip_arrow"></div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function getAlbum(url) {
        albumLoading = true;
        Ajax.Get({
            url: url,
            query: {},
            onDone: onGetAlbum
        });
    }

    function onGetAlbum(ajaxObj, responseText) {
        albumLoading = false;
        hideAlbumLoader();
        photosList = JSON.parse(responseText);
        hideThumbsNav = (photosList.length == 1);
        if (typeof photosList == 'object') {
            currentIdx = getPhotoIdx(options.pid);
            initThumbs();
            setCurrent();
        }
        if (hideThumbsNav) {
            hide('pv_bottom_menu', 'pv_bottom_ctrl_wrap');
            toggleBottomMode();
            minimizeThumbs();
        }
        ready = true;
    }

    /* Ajax History */
    function setViewerAH() {
        if ($ah.enabled) {
            ahOrigHandlers = {
                'getData': $ah.getData,
                'before': $ah.onLoad['photo'].before
            };
            $ah.getData = getHashData;
            $ah.onLoad['photo'].before = null;
        }
    }

    function removeViewerAH() {
        if ($ah.enabled) {
            $ah.getData = ahOrigHandlers['getData'];
            $ah.onLoad['photo'].before = ahOrigHandlers['before'];
        }
    }

    function setHash() {
        var pid = photosList[currentRealIdx][0];

        if ($ah.enabled && pid != start_photo && pid != currentHashPID) {
            currentHashPID = pid;
            $ah.go("photo", {
                act: 'photo_info',
                photo: pid,
                uid: window.watched_uid
            });
        }
    }

    function getHashData(loadObj, id, params, hash) {
        var
            re = /photo\/(-?\d+_\d+)/,
            pid, idx;

        if (id == 'photo') {
            pid = re.exec(hash);
            if (pid) {
                idx = getPhotoIdx(pid[1]);
            } else {
                idx = getPhotoIdx(start_photo);
            }
            el = ge('pv_thumb_' + idx);
            allowSetHash = false;
            setCurrent(el);
            allowSetHash = true;
        }
        return false;
    }

    /* Events handlers */
    function onCanvasClick(e) {
        var
            el = e.target,
            idx = currentIdx,
            XY = [e.screenX, e.screenY];

        //console.log(el.id);
        if (el.id == 'pv_full_photo_img' || el.id == 'pv_full_photo_outer_3') {
            idx++;
            idx = (idx != photosList.length) ? idx : 0;
            mouseXY = XY;
            el = ge('pv_thumb_' + idx);
            needShowFullThumb = false;
            setCurrent(el);
        } else if (el.id == 'pv_full_photo') {
            handleExitClick(XY);
        } else if (hasClass(el, 'pv_bottom_go')) {
            idx += (el.id == 'pv_bottom_next') ? 1 : -1;
            el = ge('pv_thumb_' + idx);
            needShowFullThumb = false;
            setCurrent(el);
        } else if (el.id.indexOf('pv_vk_close') != -1) {
            closeViewer();
        } else if (hasClass(el, 'pv_thumb_wrap')) {
            showThumbOnCurrent = false;
            setCurrent(el);
        } else if (el.id == 'pv_bottom_nav_current_in') {
            setCurrent(ge('pv_thumb_' + currentIdx));
        } else if (hasClass(el, 'pv_bottom_layer_btn') || hasClass(el, 'pv_bottom_layer_bg')) {
            needShowFullThumb = false;
            setCurrentRange(el);
        } else if (el.id == 'pv_bottom_ctrl' || hasClass(el, 'pv_bottom_ctrl_bg')) {
            toggleBottomMode();
            if (hideThumbs) {
                minimizeThumbs();
            } else {
                restoreThumbs();
            }
        }
    }

    function onCanvasOver(e) {
        var el = e.target;

        //console.log('over: '+el.id);
        if (hasClass(el, 'pv_thumb_wrap')) {
            showFullThumb(el);
        } else if (hasClass(el, 'pv_bottom_go')) {
            showFullThumb(ge('pv_thumb_' + currentThumbIdx));
        } else if (el.id == 'pv_bottom_restore') {
            if (hideThumbs) {
                restoreThumbs(el);
            }
        } else if (el.id.indexOf('pv_vk_close') != -1) {
            fadeTo(ge('pv_vk_close'), 200, 1);
            showCloseTip();
            addClass(ge('pv_vk_close'), 'pv_vk_close_hover');
        } else if (el.id == 'pv_bottom_ctrl_bg' || el.id == 'pv_bottom_ctrl') {
            fadeTo(ge('pv_bottom_ctrl'), 200, 1);
        } else if (el.id == 'pv_bottom_layer_btn_right' || el.id == 'pv_bottom_layer_bg_right') {
            fadeTo(ge('pv_bottom_layer_bg_right'), 200, 1);
        } else if (el.id == 'pv_bottom_layer_btn_left' || el.id == 'pv_bottom_layer_bg_left') {
            fadeTo(ge('pv_bottom_layer_bg_left'), 200, 1);
        }
    }

    function onCanvasOut(e) {
        var el = e.target;

        //console.log('out: '+el.id);
        if (hasClass(el, 'pv_thumb_wrap')) {
            hideFullThumb(el);
        } else if (el.id == 'pv_bottom_menu') {
            if (hideThumbs) {
                minimizeThumbs(el);
            }
        } else if (el.id == 'pv_vk_close_tip' || el.id == 'pv_vk_close') {
            fadeTo(ge('pv_vk_close'), 200, 0.6);
            hideCloseTip();
            removeClass(ge('pv_vk_close'), 'pv_vk_close_hover');
        } else if (el.id == 'pv_bottom_ctrl_bg') {
            fadeTo(ge('pv_bottom_ctrl'), 200, 0.6);
        } else if (el.id == 'pv_bottom_layer_btn_right') {
            fadeTo(ge('pv_bottom_layer_bg_right'), 200, 0.6);
        } else if (el.id == 'pv_bottom_layer_btn_left') {
            fadeTo(ge('pv_bottom_layer_bg_left'), 200, 0.6);
        }
    }

    function onCanvasWheel(e) {
        var
            idx = currentIdx,
            el,
            delta;

        /*if (e.wheelDelta) {
          delta = e.wheelDelta / 120;
          if (browser.opera)
            delta = -delta;
        } else if (e.detail) {
          delta = -e.detail / 3;
        }
        idx += -delta;
        if (idx == photosList.length) {
          idx = 0;
        } else if (idx == -1) {
          idx = photosList.length - 1;
        }
        el = ge('pv_thumb_' + idx);
        needShowFullThumb = false;
        setCurrent(el);*/
        cancelEvent(e);
    }

    function onKeyPress(e) {
        var
            el,
            idx = currentIdx,
            key = e.keyCode || e.charCode,
            cancel = false;

        //console.log(key);
        if (thumbsAnimating) {
            cancelEvent(e);
            return;
        }
        switch (key) {
            case KEY.LEFT:
            case 107:
                idx--;
                idx = (idx != -1) ? idx : (photosList.length - 1);
                el = ge('pv_thumb_' + idx);
                needShowFullThumb = false;
                setCurrent(el);
                cancel = true;
                break;
            case KEY.RIGHT:
            case KEY.SPACE:
            case 106:
                idx++;
                idx = (idx != photosList.length) ? idx : 0;
                el = ge('pv_thumb_' + idx);
                needShowFullThumb = false;
                setCurrent(el);
                cancel = true;
                break;
            case KEY.PAGEDOWN:
                setCurrentRange(ge('pv_bottom_layer_btn_left'));
                cancel = true;
                break;
            case KEY.PAGEUP:
                setCurrentRange(ge('pv_bottom_layer_btn_right'));
                cancel = true;
                break;
            case KEY.HOME:
                idx = 0;
                el = ge('pv_thumb_' + idx);
                needShowFullThumb = false;
                setCurrent(el);
                cancel = true;
                break;
            case KEY.END:
                idx = photosList.length - 1;
                el = ge('pv_thumb_' + idx);
                needShowFullThumb = false;
                setCurrent(el);
                cancel = true;
                break;
            case 70:
            case 102:
                if (!hideThumbsNav) {
                    toggleBottomMode();
                    if (hideThumbs) {
                        minimizeThumbs();
                    } else {
                        restoreThumbs();
                    }
                } else {
                    cancel = true;
                }
                break;
            case KEY.ESC:
                closeViewer();
                cancel = true;
                break;
            case KEY.UP:
            case KEY.DOWN:
            case KEY.TAB:
                //case KEY.BACKSPACE:
                cancel = true;
                break;
        }
        if (cancel) {
            cancelEvent(e);
        }
    }

    function dispatchMouseEvent(e) {
        switch (e.type) {
            case 'click':
                onCanvasClick(e);
                break;
            case 'mouseover':
                onCanvasOver(e);
                break;
            case 'mouseout':
                onCanvasOut(e);
                break;
            case 'DOMMouseScroll':
            case 'mousewheel':
                onCanvasWheel(e);
                break;
        }
    }

    function dispatchKeyboardEvent(e) {
        switch (e.type) {
            case 'keypress':
            case 'keydown':
                //console.log(e.keyCode);
                onKeyPress(e);
                break;
        }
    }

    function showViewer() {
        currentIdx = currentRealIdx;
        mouseXY = [-1, -1];
        setCanvas();
        initEvents();
        show('pv_bg', 'pv_canvas');
        if (browser.msie && browser.version == 7) {
            /* Trick for properly background opacity in IE7 */
            hide('pageContainer');
            show('pageContainer');
        }
        setNavigation();
        if (albumLoading) {
            showAlbumLoader();
        }
        if (isVisible('pv_vk_close_tip')) {
            setTimeout(hideCloseTip, 3000);
        }
        setViewerAH();
    }

    function hideViewer() {
        closeViewer();
        hide('pv_bg', 'pv_canvas');
    }

    function loadAlbum(oid, aid, pid) {
        var
            url;

        if (aid) {
            url = '/photos.php?act=a_album&oid=%oid%&aid=%aid%&pid=%pid%';
        } else {
            url = '/photos.php?act=a_album&oid=%oid%&pid=%pid%';
        }
        url = url.replace('%oid%', oid).replace('%aid%', aid).replace('%pid%', pid);
        getAlbum(url);
    }

    function goTo(pid) {
        currentIdx = currentRealIdx = getPhotoIdx(pid);
    }

    init();
    if (options.oid) {
        loadAlbum(options.oid, options.aid, options.pid);
    }
    setTimeout(hideCloseTip, 3000);

    publicMethods = {
        show: showViewer,
        hide: hideViewer,
        load: loadAlbum,
        go: goTo
    };

    return publicMethods;
};