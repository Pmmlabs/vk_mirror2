var bodyNode = document.getElementsByTagName('body')[0],
    htmlNode = document.getElementsByTagName('html')[0];
var lastWidth, lastHeight, lastImgHeight, photoLayerVisible = false,
    currentMax = 1280,
    photoVeryBig = false;
var onResize = function() {
    var dwidth = Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth));
    var dheight = Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight));
    var sbw = sbWidth();
    if (browser.mobile) {
        dwidth = Math.max(dwidth, intval(bodyNode.scrollWidth));
        dheight = Math.max(dheight, intval(bodyNode.scrollHeight));
    } else if (browser.msie7) {
        if (htmlNode.scrollHeight > htmlNode.offsetHeight && !photoLayerVisible) {
            dwidth += sbw + 1;
        }
    } else if (browser.msie8) {
        if (htmlNode.scrollHeight + 3 > htmlNode.offsetHeight && !photoLayerVisible) {
            dwidth += sbw + 1;
        }
    }
    if (photoBig) {
        var w = Math.min(currentMax, dwidth - sbw - 2 - 120 - 24),
            h = Math.min(dheight - 31, currentMax);
        if (w > 807 && w < 907) { // 1024x768 - not very big
            w = 807;
        } else if (w < 604) {
            w = 604;
        }
        if (h < 604) {
            h = 604;
        }
        photoPolaroid.style.width = w + 'px';
        photoLayer.firstChild.style.width = (w + 144) + 'px';
        ge('pv_right_nav').style.left = (w + 84) + 'px';
        window.viewportWidth = w;
        window.viewportHeight = h;
        var sizeChanged = false;
        if ((w > 807 || h > 807) && !photoVeryBig || (w <= 807 && h <= 807 && photoVeryBig)) {
            photoVeryBig = (w > 807 || h > 807);
            sizeChanged = true;
        }
        var lnk = ge('fast_photo');
        if (lnk.firstChild && currentPh.src == lnk.firstChild.src) {
            var c = (currentPh.width > viewportWidth) ? (viewportWidth / currentPh.width) : 1;
            if (currentPh.height * c > viewportHeight) {
                c = viewportHeight / currentPh.height;
            }
            lnk.style.height = Math.max(453, currentPh.height * c) + 'px';
            lnk.firstChild.style.width = Math.floor(currentPh.width * c) + 'px';
            lnk.firstChild.style.height = Math.floor(currentPh.height * c) + 'px';
            if (sizeChanged) {
                setTimeout(photoPreload.pbind(currentPhIndex + 1), 10);
            }
        }
    }
    if (lastWidth != dwidth) {
        lastWidth = dwidth;
        photoLayerWrap.style.width = photoLayerBG.style.width = dwidth + 'px';
        photoLayer.style.width = (dwidth - sbw - 2) + 'px';
    }
    if (lastHeight != dheight) {
        lastHeight = dheight;
        photoLayerWrap.style.height = photoLayerBG.style.height = dheight + 'px';
        photoLayer.style.height = dheight + 'px';
    }
    photoUpdateArrows1();
    photoUpdateArrows2();
}

function photoUpdateArrows1() {
    var w = (photoBig ? (viewportWidth + 20) : 624),
        sbw = sbWidth();
    var lw = (lastWidth > w + 124 + sbw + 2) ? lastWidth : (w + 124 + sbw + 2);
    photoLeft.style.left = Math.floor((lw - sbw - 10 - (w + 66)) / 2) + 'px';
    photoRight.style.left = Math.floor((lw - sbw - 10 + (w + 66)) / 2) + 'px';
    var l = Math.floor((lw - sbw - 12 + w + 12) / 2);
    photoMaxBtn.style.left = photoControls.style.left = l + 'px';
    photoCloseBtn.style.left = (l + 30) + 'px';
}

function photoUpdateArrows2() {
    var h = photoPolaroid.offsetHeight;
    if (browser.mobile) {
        var photoSkipTop = 10 + startYOffset;
        photoRight.style.top = photoLeft.style.top = (photoSkipTop + Math.floor(h / 2) - 7) + 'px';
        if (lastHeight < startYOffset + h + 50) {
            setTimeout(function() {
                var f = ge('bFooter');
                f.style.height = (intval(f.style.height) + (startYOffset + h + 50 - lastHeight)) + 'px';
                onResize();
            }, 1);
        }
    } else {
        var photoSkipTop = 10;
        photoRight.style.top = photoLeft.style.top = (Math.min(Math.floor(lastHeight / 2), photoSkipTop + Math.floor(h / 2)) - 7) + 'px';
    }
    ge('pv_left_nav').style.height = ge('pv_right_nav').style.height = h + 'px';
}
var onKeyDown = function(e) {
    if (e.keyCode == KEY.ESC) {
        hidePhotoFast();
        return cancelEvent(e);
    } else if (!ge('photo_comment').active) {
        if (e.keyCode == KEY.RIGHT) {
            showPhotoFast(currentPhFullId, currentPhIndex + 1);
        } else if (e.keyCode == KEY.LEFT) {
            showPhotoFast(currentPhFullId, currentPhIndex - 1);
        }
    }
}
var onClick = function(e) {
    if (window.clickInPolaroid) {
        window.clickInPolaroid = false;
        return;
    }
    var dx = Math.abs(e.pageX - intval(window.oldPageX));
    var dy = Math.abs(e.pageY - intval(window.oldPageY));
    if (dx > 3 || dy > 3) {
        if (vkNow() - intval(window.oldNow) > 300) {
            hidePhotoFast();
        }
    }
}

function sendPhotoComment(e) {
    var comm = ge('photo_comment').getValue();
    if (!comm) {
        focusAtEnd(ge('photo_comment'));
        return;
    }
    hide('photo_comment_warn');
    show('photo_comment_progress');
    var fullId = currentPhFullId,
        index = currentPhIndex,
        ph = shownPhotos[fullId][index];
    Ajax.Send('photos.php', {
        act: 'a_post_comment',
        id: ph.id,
        comment: comm,
        hash: ph.hash,
        from_news: 1
    }, {
        onSuccess: function(o, t) {
            hide('photo_comment_progress');
            var pc = ge('photo_comment');
            pc.setValue('');
            pc.blur();
            hidePhotoCommentBox();

            ph.comments += t;
            ++ph.commcount;
            if (fullId == currentPhFullId && index == currentPhIndex) {
                ge('photo_comments').innerHTML = ph.comments;
                updatePhotoCommentsInfo();
            }
        },
        onFail: hide.pbind('photo_comment_progress'),
        onCaptchaShow: hide.pbind('photo_comment_progress')
    });
    return cancelEvent(e);
}

function showPhotoCommentBox() {
    var pcs = ge('photo_comment_submit');
    if (!isVisible(pcs)) {
        show('photo_comment_submit');
        ge('photo_comment').autosize.update();
    }
}

function hidePhotoCommentBox() {
    hide('photo_comment_submit');
    setStyle(ge('photo_comment'), {
        height: 14
    });
    photoUpdateArrows2();
    return true;
}

function updatePhotoCommentsInfo() {
    var ph = shownPhotos[currentPhFullId][currentPhIndex];
    ph.commshown = ge('photo_comments').childNodes.length;
    var commshown = '';
    if (ph.commcount > ph.commshown) {
        if (ph.commcount - ph.commshown > 200) {
            commshown = langNumeric(200, news_show_x_more_comments);
        } else {
            commshown = langNumeric(ph.commcount, news_show_x_all_comments);
        }
        commshown = '<a onclick="showPhotoComments(' + currentPhIndex + ')">' + commshown + '</a>';
    } else {
        commshown = ph.commshown ? langNumeric(ph.commshown, news_shown_x_comments) : news_shown_no_comments;
        commshown = '<span class="info">' + commshown + '</span>';
    }
    ge('photo_comments_label').innerHTML = commshown;
    photoUpdateArrows2();
}

function showPhotoComments() {
    var fullId = currentPhFullId,
        index = currentPhIndex,
        ph = shownPhotos[fullId][index];
    var commlabel = ge('photo_comments_label');
    hide(commlabel.firstChild);
    if (commlabel.childNodes.length > 1) {
        show(commlabel.childNodes[1]);
    } else {
        commlabel.appendChild(ce('img', {
            src: '/images/upload.gif'
        }));
    }
    var fail = function() {
        hide(commlabel.childNodes[1]);
        show(commlabel.firstChild);
    }
    Ajax.Send('/newsfeed.php', {
        act: 'a_photo_comments',
        offset: ph.commshown,
        photo: ph.id
    }, {
        onSuccess: function(o, t) {
            t += ph.comments;
            if (fullId == currentPhFullId && index == currentPhIndex) {
                ge('photo_comments').innerHTML = t;
                updatePhotoCommentsInfo();
            }
            ph.comments = t;
        },
        onFail: fail,
        onCaptchaShow: fail
    });
}

var currentPh = new Image();

function photoPreload(index) {
    var fullId = currentPhFullId,
        l = shownPhotos[fullId].length;
    if (!l) return;
    var s1 = photoBig ? (photoVeryBig ? 'z' : 'y') : 'x';
    var s2 = photoBig ? (photoVeryBig ? 'y' : 'x') : 0;
    for (var i = 0; i < 5; ++i) {
        var ind = index + i;
        while (ind >= l) {
            ind -= l;
        }
        var p = shownPhotos[fullId][ind];

        if (p[s1]) continue;
        p[s1] = 1;
        if (p[s1 + '_src']) {
            (new Image()).src = p[s1 + '_src'];
            continue;
        }

        if (p[s2]) continue;
        p[s2] = 1;
        if (p[s2 + '_src']) {
            (new Image()).src = p[s2 + '_src'];
            continue;
        }

        if (p.x) continue;
        p.x = 1;
        (new Image()).src = p.x_src;
    }
}

function hidePhotoFast() {
    removeEvent(window, 'resize', onResize);
    removeEvent(document, 'keydown', onKeyDown);
    hide(photoLayers);
    photoLayerVisible = false;
    (browser.msie7 ? htmlNode : bodyNode).style.overflow = 'auto';
    if (browser.mobile) {
        ge('bFooter').style.height = '';
    }
    toggleFlash(true);
}

function photoActivate(block, arrow) {
    clearTimeout(block.timeout);
    fadeTo(block, 200, 0.4);
    fadeTo(arrow, 200, 1);
}

function photoDeactivate(block, arrow) {
    block.timeout = setTimeout(function() {
        fadeTo(block, 200, 0);
        fadeTo(arrow, 200, 0.4);
    }, 1);
}

function photoDoSwitch() {
    if (photoLayers.className == 'pv_dark') {
        photoLayers.className = 'pv_light';
    } else {
        photoLayers.className = 'pv_dark';
    }
    clearTimeout(window.savePhotoSwitch);
    window.savePhotoSwitch = setTimeout(function() {
        Ajax.Send('newsfeed.php', {
            act: 'a_switch_pv',
            light: (photoLayers.className == 'pv_light' ? 1 : ''),
            hash: pvChangeHash
        });
    }, 1000);
}

function photoChangeSize() {
    if (pvCurrentSize == 'pv_min') {
        pvCurrentSize = 'pv_max';
        photoBig = true;
    } else {
        pvCurrentSize = 'pv_min';
        photoBig = false;
    }
    photoUpdateSize();
    showPhotoFast(currentPhFullId, currentPhIndex);
    setTimeout(photoPreload.pbind(currentPhIndex + 1), 10);
    clearTimeout(window.savePhotoBig);
    window.savePhotoBig = setTimeout(function() {
        Ajax.Send('newsfeed.php', {
            act: 'a_big_pv',
            bigpv: (photoBig ? 1 : ''),
            hash: pvChangeHash
        });
    }, 1000);
}
var currentPhFullId = 0,
    currentPhIndex = 0;

function photoUpdateSize() {
    window.photoSkipTop = 10;
    if (!photoBig) {
        photoPolaroid.style.width = '604px';
        photoLayer.firstChild.style.width = '748px';
        ge('pv_right_nav').style.left = '688px';
        ge('fast_photo').innerHTML = '';
    }
    photoMaxBtn.className = pvCurrentSize + ' pv_fixed';
    onResize();
}

function showPhotoFast(fullId, index, e) {
    var l = shownPhotos[fullId].length,
        newInd = (index != currentPhIndex);
    index += (index < 0 ? l : (index >= l ? (-l) : 0));
    var ph = shownPhotos[fullId][index];

    e = e || window.event;
    if (e && e.pageX && e.pageY) {
        window.oldPageX = e.pageX;
        window.oldPageY = e.pageY;
        window.oldNow = vkNow();
    }
    var initing = (currentPhFullId != fullId);
    if (!window.photoLayer || !isVisible(window.photoLayers)) {
        addEvent(window, 'resize', onResize);
        addEvent(document, 'keydown', onKeyDown);
        toggleFlash(false);
        (browser.msie7 ? htmlNode : bodyNode).style.overflow = 'hidden';
        initing = true;
    } else if (l == 1 && newInd) {
        hidePhotoFast();
        return e ? cancelEvent(e) : false;
    }
    if (!window.photoLayers) {
        window.photoLayers = ce('div', {
            className: pvStartClass,
            innerHTML: '\
<div class="pv_bg pv_fixed"></div>\
<div class="pv_wrap pv_fixed"><div class="pv_layer"></div></div>\
<div class="pv_left no_select pv_fixed" onmouseover="photoActivate(ge(\'pv_left_nav\'), this)" onmouseout="photoDeactivate(ge(\'pv_left_nav\'), this)"><div></div></div>\
<div class="pv_right no_select pv_fixed" onmouseover="photoActivate(ge(\'pv_right_nav\'), this)" onmouseout="photoDeactivate(ge(\'pv_right_nav\'), this)"><div></div></div>\
<div class="pv_switch no_select pv_fixed" onmouseover="if(!browser.msie6)fadeTo(this, 200, 1)" onmouseout="if(!browser.msie6)fadeTo(this, 200, 0.4)" onclick="photoDoSwitch();"><img src="/images/switch.png" /></div>\
<div class="pv_controls pv_fixed"></div>\
<div class="' + pvCurrentSize + ' pv_fixed" onmouseover="fadeTo(this, 200, 1)" onmouseout="fadeTo(this, 200, 0.4)" onclick="photoChangeSize()"><div></div></div>\
<div class="pv_close pv_fixed" onmouseover="fadeTo(this, 200, 1)" onmouseout="fadeTo(this, 200, 0.4)" onclick="hidePhotoFast()"><div></div></div>\
'
        });
        bodyNode.appendChild(photoLayers);
        window.photoLayerBG = photoLayers.firstChild;
        window.photoLayerWrap = photoLayerBG.nextSibling;
        window.photoLayer = photoLayerWrap.firstChild;
        window.photoLeft = photoLayerWrap.nextSibling;
        window.photoRight = photoLeft.nextSibling;
        window.photoSwitch = photoRight.nextSibling;
        window.photoControls = photoSwitch.nextSibling;
        window.photoMaxBtn = photoControls.nextSibling;
        window.photoCloseBtn = photoMaxBtn.nextSibling;
        addEvent(photoLayer, 'click', onClick);
    } else {
        if (!photoLayerVisible) {
            ge('fast_photo').innerHTML = '';
        }
        show(photoLayers);
    }
    hide(showPhotoProgress);

    photoLayerVisible = true;
    currentPhIndex = index;
    if (initing) {
        currentPhFullId = fullId;
        photoLayer.innerHTML = '\
<div class="pv_cont">\
<div class="no_select" id="pv_left_nav" onmouseover="photoActivate(this, photoLeft)" onmouseout="photoDeactivate(this, photoLeft)" onclick="showPhotoFast(currentPhFullId, currentPhIndex - 1, event);" onselectstart="return cancelEvent(event);"></div>\
<div class="no_select" id="pv_right_nav" onmouseover="photoActivate(this, photoRight)" onmouseout="photoDeactivate(this, photoRight)" onclick="showPhotoFast(currentPhFullId, currentPhIndex + 1, event);" onselectstart="return cancelEvent(event);"></div>\
<table cellspacing="0" cellpadding="0">\
<tr><td class="sidesh s1"><div></div></td><td>\
<table cellspacing="0" cellpadding="0">\
<tr><td class="sidesh s2"><div></div></td><td>\
<table cellspacing="0" cellpadding="0">\
<tr><td colspan="3" class="bottomsh s3"><div></div></td></tr>\
<tr><td class="sidesh s3"><div></div></td><td>\
\
<div id="pv_polaroid" onclick="hidePhotoCommentBox();window.clickInPolaroid=true;">\
  <div class="no_select">\
    <a onclick="return showPhotoFast(currentPhFullId, currentPhIndex + 1, event);" onselectstart="return cancelEvent(event);" id="fast_photo"></a>\
  </div>\
  <div class="clearFix pv_comments select_fix">\
    <div class="fl_l left_column">\
      <div id="photo_comments_label" style="padding: 0px 2px 5px"></div>\
      <div id="photo_comments"></div>\
      <div id="pv_your_comment" class="clearFix" onclick="return cancelEvent(event);">\
        <textarea id="photo_comment" onkeyup="checkTextLength(photos_comments_message_len, this.value, ge(\'photo_comment_warn\'))" style="vertical-align: top; width: 370px;" onkeypress="if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) sendPhotoComment();" onfocus="showPhotoCommentBox();" placeholder="' + wall_reply_to_post + '"></textarea>\
        <div id="photo_comment_submit">\
          <div class="button_yes fl_l"><div id="photo_comment_send">' + getLang('box_send') + '</div></div>\
          <img src="/images/upload.gif" id="photo_comment_progress" class="fl_l" />\
          <div id="photo_comment_warn" class="fl_l" style="margin: 6px 7px 0px; color: #777;"></div>\
        </div>\
      </div>\
    </div>\
    <div class="fl_r right_column">\
      <div class="info" id="photo_x_of_y"></div>\
      <div class="info" id="photo_album"></div>\
      <div id="photo_desc"></div>\
      <div class="info" id="photo_from">' + getLang('photos_author') + ' <span id="photo_auth"></span></div>\
    </div>\
  </div>\
</div>\
\
</td><td class="sidesh s3"><div></div></td></tr>\
<tr><td colspan="3" class="bottomsh s3"><div></div></td></tr></table>\
</td><td class="sidesh s2"><div></div></td></tr>\
<tr><td colspan="3" class="bottomsh s2"><div></div></td></tr></table>\
</td><td class="sidesh s1"><div></div></td></tr>\
<tr><td colspan="3" class="bottomsh s1"><div></div></td></tr></table>\
</div>\
';
        currentMax = 604;
        for (var i = 0; i < l; ++i) {
            if (shownPhotos[fullId][i].z_src) {
                currentMax = 1280;
                break;
            } else if (shownPhotos[fullId][i].y_src) {
                currentMax = 807;
            }
        }
        window.photoPolaroid = ge('pv_polaroid');
        if (browser.mobile) {
            startYOffset = intval(window.pageYOffset);
            photoLayer.firstChild.style.paddingTop = ge('pv_left_nav').style.top = ge('pv_right_nav').style.top = photoControls.style.top = photoMaxBtn.style.top = photoCloseBtn.style.top = (startYOffset + 10) + 'px';
            photoSwitch.style.top = startYOffset + 'px';
        }
        photoUpdateSize();
    } else {
        onResize();
    }
    setTimeout(photoPreload.pbind(index + 1), 10);

    delete currentPh;
    currentPh = new Image();
    currentPh.src = photoBig ? ((photoVeryBig && ph.z_src) ? ph.z_src : (ph.y_src ? ph.y_src : ph.x_src)) : ph.x_src;

    if (l > 1) {
        show(photoLeft, photoRight, 'pv_left_nav', 'pv_right_nav');
    } else {
        hide(photoLeft, photoRight, 'pv_left_nav', 'pv_right_nav');
    }

    createButton(ge('photo_close_button'), hidePhotoFast, false, true);
    createButton(ge('photo_comment_send'), sendPhotoComment, false, true);
    var ta = ge('photo_comment');
    if (!ta.autosize) {
        ta.autosize = new AutosizeMod(ta, {
            minHeight: 30,
            onResize: photoUpdateArrows2
        });
        placeholderSetup(ta);
        setStyle(ta, {
            height: 14
        });
    }
    lastImgHeight = 0;
    clearTimeout(window.photoShowTimer);
    window.photoShowTimer = setTimeout(function() {
        if (!currentPh.width || !currentPh.height) {
            window.photoShowTimer = setTimeout(arguments.callee, 100);
            return;
        }
        var lnk = ge('fast_photo'),
            c = 1,
            marginTop = 0,
            w = currentPh.width,
            h = currentPh.height;
        if (photoBig) {
            if (w > viewportWidth) {
                c = viewportWidth / w;
            }
            if (h * c > viewportHeight) {
                c = viewportHeight / h;
            }
        }
        if (h * c >= 453) {
            lnk.style.height = Math.floor(h * c) + 'px';
        } else {
            lnk.style.height = '453px';
            marginTop = Math.floor((453 - h * c) / 2);
        }
        lnk.innerHTML = '<img onclick="return showPhotoFast(currentPhFullId, currentPhIndex + 1, event);" style="width: ' + Math.floor(w * c) + 'px; height: ' + Math.floor(h * c) + 'px;' + (marginTop > 0 ? ('margin-top: ' + marginTop + 'px;') : '') + '" src="' + currentPh.src + '" />';
        photoLayerWrap.scrollTop = 0;
        ge('photo_comments').innerHTML = ph.comments;
        ge('photo_x_of_y').innerHTML = news_photo_x_of_y.replace('{photo_link}', '/photo' + ph.id).replace('{index}', index + 1).replace('{count}', l);
        ge('photo_album').innerHTML = news_photo_from_album.replace('{album}', ph.album);
        var dsc = ge('photo_desc');
        if (ph.desc) {
            show(dsc);
            dsc.innerHTML = ph.desc;
        } else {
            hide(dsc);
        }
        ge('photo_auth').innerHTML = ph.from;
        if (ph.cancomm) {
            show('pv_your_comment');
        } else {
            hide('pv_your_comment');
        }
        updatePhotoCommentsInfo();
    }, 0);
    if (e) return cancelEvent(e);
}