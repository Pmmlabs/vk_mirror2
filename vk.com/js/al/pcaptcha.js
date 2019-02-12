var PhotoCaptcha = {
    init: function(box, opts) {
        box.setOptions({
            hideButtons: true,
            width: 647,
            bodyStyle: 'padding: 0px; border: 0px;'
        });
        box.removeButtons();

        cur.lang = extend(cur.lang || {}, opts.lang);
        extend(cur, {
            pcPhotos: opts.photos,
            pcCur: 0,
            pcWrapEl: ge('pcpt_wrap'),
            pcContEl: ge('pcpt_cont')
        });
        for (var i in cur.pcPhotos) {
            vkImage().src = cur.pcPhotos[i];
        }
    },
    show: function(i) {
        if (i === undefined && !cur.pcShowing) i = (cur.pcCur + 1) % cur.pcPhotos.length;
        if (!cur.pcPhotos[i]) return;
        if (cur.pcShowing) {
            cur.pcShowing = i + 1;
            return;
        }
        if (i == cur.pcCur) return;
        removeClass(ge('pcpt_ph' + cur.pcCur), 'pcpt_sel');
        addClass(ge('pcpt_ph' + i), 'pcpt_sel');
        cur.pcShowing = true;
        var el = cur.pcWrapEl.appendChild(domFC(ce('div', {
                innerHTML: '\
<table class="pcpt_photo" cellspacing="0" cellpadding="0" style="position: absolute; opacity: 0;">\
  <tr><td class="pcpt_cell" onclick="PhotoCaptcha.show()"><img src="' + cur.pcPhotos[i] + '" class="pcpt_big_img" /></td></tr>\
</table>'
            }))),
            to;
        setStyle(domPS(el), {
            position: 'absolute',
            marginLeft: 0
        });
        if (i > cur.pcCur) {
            setStyle(el, {
                marginLeft: 608
            });
            to = -608;
        } else {
            setStyle(el, {
                marginLeft: -608
            });
            to = 608;
        }
        animate(el, {
            opacity: 1,
            marginLeft: 0
        }, {
            duration: 200,
            transition: Fx.Transitions.sineInOut
        });
        animate(domPS(el), {
            opacity: 0,
            marginLeft: to
        }, {
            duration: 200,
            transition: Fx.Transitions.sineInOut,
            onComplete: PhotoCaptcha.done
        });
        cur.pcCur = i;
    },
    done: function() {
        if (!cur.pcShowing) return;
        re(domFC(cur.pcWrapEl));
        setStyle(domFC(cur.pcWrapEl), {
            position: 'static',
            marginLeft: 0
        });
        if (cur.pcShowing !== true) {
            setTimeout(PhotoCaptcha.show.pbind(cur.pcShowing - 1), 0);
        }
        cur.pcShowing = false;
    },
    select: function(i) {
        if (i === cur.pcSel) return;
        if (cur.pcSel !== undefined) removeClass(ge('pcpt_user' + cur.pcSel), 'pcpt_user_sel');
        addClass(ge('pcpt_user' + i), 'pcpt_user_sel');
        cur.pcSel = i;
    },
    other: function() {
        ajax.post('pcaptcha.php', {
            act: 'box',
            part: 1
        }, {
            onDone: function(photosArr, photos, friends) {
                delete(cur.pcSel);
                extend(cur, {
                    pcCur: 0,
                    pcShowing: false,
                    pcPhotos: photosArr
                });
                val(cur.pcWrapEl, '\
<table class="pcpt_photo" cellspacing="0" cellpadding="0">\
  <tr><td class="pcpt_cell" onclick="PhotoCaptcha.show()"><img src="' + cur.pcPhotos[0] + '" class="pcpt_big_img" /></td></tr>\
</table>');
                val(ge('pcpt_thumbs'), photos);
                val(ge('pcpt_names'), friends);
            }
        });
    }
};

try {
    stManager.done('pcaptcha.js');
} catch (e) {}