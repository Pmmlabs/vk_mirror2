var blog = {
    init: function() {
        this.checkEntryVideos();
        this.bindEvents();

        cur.destroy.push(this.destroy);
    },
    initBack: function() {
        cur._back = {
            loc: false,
            show: [blog.bindEvents],
            hide: [blog.destroy],
            text: 'Blog'
        };
    },
    bindEvents: function() {
        blog.destroy();
        if (cur.nextFrom) {
            addEvent(window, 'scroll', blog.onScroll);
        }
    },
    destroy: function() {
        removeEvent(window, 'scroll', blog.onScroll);
    },
    onScroll: function() {
        if (cur.blogLoading || !cur.nextFrom) {
            return;
        }
        var st = scrollGetY(),
            bh = getSize(bodyNode)[1],
            wh = lastWindowHeight;
        if ((st + wh) * 2 >= bh) {
            blog.loadMore();
        }
    },
    loadMore: function() {
        if (cur.blogLoading || !cur.nextFrom) {
            return;
        }
        cur.blogLoading = 1;

        lockButton('blog_more_but');
        ajax.post('blog.php', {
            start_from: cur.nextFrom,
            category: cur.blogCategory,
        }, {
            onDone: function(rows, nextFrom) {
                var tmp = ce('div', {
                    innerHTML: rows
                });
                var first = tmp.firstChild,
                    wrap = ge('blog_posts_list');
                while (first) {
                    wrap.appendChild(first);
                    first = tmp.firstChild;
                }

                cur.nextFrom = nextFrom;
                if (cur.nextFrom) {
                    unlockButton('blog_more_but');
                    cur.blogLoading = 0;
                } else {
                    var moreBtn = ge('blog_more_but');
                    moreBtn && re(moreBtn.parentNode);
                }
            },
            onFail: function() {
                unlockButton('blog_more_but');
            }
        });
    },
    checkEntryVideos: function() {
        return;
        var video = geByClass1('wk_inline_video', geByClass1('blog_entry_text'));
        if (!video) {
            return;
        }
        var click = video.getAttribute('onclick'),
            matches = click.match(/showInlineVideo\(\'([0-9_]+)\'\,\s\'([a-zA-Z0-9]+)\'/);

        showInlineVideo(matches[1], matches[2], {
            autoplay: 1
        }, false, video);
    },
    onSelectCover: function(file) {
        var reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                var url = e.target.result;

                var vkimg = new vkImage();
                vkimg.src = url;
                vkimg.onload = function() {

                    cur.newCover = url;
                    delete cur.deleteCover;

                    addClass('blog_cover_wrap', 'blog_cover_wrap_selected');
                    ge('blog_cover_img').src = url;
                    setStyle('blog_cover_img', 'top', '0px');

                    blog.checkCanDragCover();
                };
            };
        })(file);
        reader.readAsDataURL(file);
    },
    dragStartCover: function(e) {
        cancelEvent(e);

        cur.coverEl = ge('blog_cover_img');
        cur.startDragPos = e.pageY;
        cur.startTop = cur.coverEl.offsetTop;
        cur.coverMaxTop = getSize(cur.coverEl)[1] - getSize('blog_cover_wrap')[1];

        addEvent(window, 'mousemove', blog.coverMove);
        addEvent(window, 'mouseup', blog.coverUp);

        addClass('blog_cover_wrap', 'blog_cover_wrap_move');
    },
    checkCanDragCover: function() {
        var wrapH = Math.floor(getSize('blog_cover_wrap')[1]),
            imgH = Math.floor(getSize('blog_cover_img')[1]);
        if (imgH > wrapH) {
            show(geByClass1('blog_cover_drag_text_wrap'));
        } else {
            hide(geByClass1('blog_cover_drag_text_wrap'));
        }
    },
    coverMove: function(e) {
        var y = Math.min(0, Math.max(-cur.coverMaxTop, (e.pageY - cur.startDragPos) + cur.startTop));
        setStyle(cur.coverEl, 'top', y);
    },
    coverUp: function(e) {
        removeEvent(window, 'mousemove', blog.coverMove);
        removeEvent(window, 'mouseup', blog.coverUp);
        removeClass('blog_cover_wrap', 'blog_cover_wrap_move');
    },
    delCover: function() {
        removeClass('blog_cover_wrap', 'blog_cover_wrap_selected');
        delete cur.newCover;
        cur.deleteCover = true;
    },
    uploadCover: function(callback) {
        if (!cur.newCover) {
            return 0;
        }

        cur.startSave = true;

        var cW = 705 * 2,
            cH = 248 * 2;
        var canvasEl = ge('blog_cover_canvas');
        canvasEl.width = cW;
        canvasEl.height = cH - 2;
        setStyle(canvasEl, {
            width: cW,
            height: cH
        });

        var ctx = canvasEl.getContext('2d'),
            img = new vkImage();

        img.src = cur.newCover;
        img.onload = function() {
            var size = getSize('blog_cover_img');
            var imgH = parseInt(size[1] / size[0] * cW);

            ctx.drawImage(img, 0, ge('blog_cover_img').offsetTop * 2, cW, imgH);

            var dataUrl = canvasEl.toDataURL('image/png', 0.99);
            dataUrl = dataUrl.substr(dataUrl.indexOf('base64,', 0) + 7);

            var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest,
                xhr = new XHR();

            xhr.open('POST', cur.blogUploadServer, true);
            xhr.onload = function(e) {
                var obj, res = xhr.responseText;
                try {
                    obj = eval('(' + res + ')');
                } catch (e) {
                    obj = q2ajx(res);
                }
                cur.uploadedCover = obj;
                delete cur.startSave;
                callback();
            };
            var form = new FormData();
            form.append('Photo_base64', dataUrl);
            xhr.send(form);

            delete cur.newCover;
        };

        return 1;
    },
    save: function(skipSaveArticle) {
        if (cur.startSave) return;

        var title = trim(val('blog_entry_title')),
            short_text = trim(val('blog_entry_short_text')),
            langId = cur.blogLangDD.val(),
            adres = trim(val('blog_entry_adres')),
            authorId = cur.blogAuthorDD.val(),
            cat = cur.blogCatDD.val();

        var text = ''
        if (cur.isBLogEditor) {
            text = trim(cur.editor.val())
        }

        if (langId === '') {
            cur.blogLangDD.showDefaultList();
            return cur.blogLangDD.focus();
        }
        if (authorId === '') {
            cur.blogAuthorDD.showDefaultList();
            return cur.blogAuthorDD.focus();
        }
        /*if (!cat) {
          cur.blogCatDD.showDefaultList();
          return cur.blogCatDD.focus();
        }*/
        if (title.length == 0) {
            return notaBene('blog_entry_title');
        }
        if (short_text.length == 0) {
            return notaBene('blog_entry_short_text');
        }
        if (text.length == 0 && cur.isBLogEditor) {
            return showFastBox(getLang('global_error'), '������� ����� ������!');
        }
        if (text.length > 25000) {
            return showFastBox(getLang('global_error'), cur.lang.blog_bad_text_length);
        }
        if (adres.length == 0 || !adres.match(/^([a-zA-Z0-9\-\_]+)$/)) {
            showDoneBox(cur.lang.blog_bad_entry_link, {
                out: 4000
            });
            return ge('blog_entry_adres').focus();
        }

        if (blog.uploadCover(blog.save)) {
            val('blog_save_btn', 'Uploading cover..');
            return;
        }

        if (!cur.isBLogEditor && !skipSaveArticle) {
            val('blog_save_btn', getLang('blog_entry_saving'));
            cur.articleEditor.save(true, function() {
                delete cur.startSave
                blog.save(true)
            })
            return
        }

        var query = {
            act: 'save',
            title: title,
            Message: text,
            Short: short_text,
            lang_id: langId,
            adres: adres,
            author_id: authorId,
            cat: cat,
            save_hash: cur.blogHash,
            arhive: hasClass('to_arhive', 'on') ? 1 : 0,
            filter: cur.blogFilter.val(),
            hide_from_main_page: hasClass('hide_from_main_page', 'on') ? 1 : 0
        };

        if (!cur.isBLogEditor) {
            query.article_id = cur.articleEditor.getArticleId();
        }

        if (!hasClass('blog_no_publish', 'on')) {
            if (hasClass('blog_do_ch_date', 'on')) {
                query.custom_date = val('blog_change_date');
            }
        } else {
            query.no_publish = 1;
        }

        if (cur.entryID > 0) {
            query.entry_id = cur.entryID;
        }

        if (cur.uploadedCover) {
            query = extend(query, cur.uploadedCover);
        }

        if (cur.deleteCover) {
            query.del_cover = 1;
            delete cur.deleteCover;
        }

        cur.startSave = true;
        val('blog_save_btn', cur.lang.blog_entry_saving);
        ajax.post('blog.php', query, {
            onDone: function(code) {
                switch (code) {
                    case 'adres':
                        delete cur.startSave;
                        val('blog_save_btn', getLang('global_save'));
                        showDoneBox(cur.lang.blog_bad_adres, {
                            out: 4000
                        });
                        break;
                    default:
                        if (cur.entryID > 0) {
                            nav.go('/blog?act=view&id=' + cur.entryID);
                        } else {
                            nav.go('/blog');
                        }
                        break;
                }
            },
        });
    },
    toTranslit: {
        1072: "a",
        1073: "b",
        1074: "v",
        1075: "g",
        1076: "d",
        1077: "e",
        1078: "zh",
        1079: "z",
        1080: "i",
        1081: "y",
        1082: "k",
        1083: "l",
        1084: "m",
        1085: "n",
        1086: "o",
        1087: "p",
        1088: "r",
        1089: "s",
        1090: "t",
        1091: "u",
        1092: "f",
        1093: "h",
        1094: "ts",
        1095: "ch",
        1096: "sh",
        1097: "sh",
        1099: "y",
        1101: "e",
        1102: "yu",
        1103: "ya",
        1105: "e",
        1098: "",
        1100: ""
    },
    translitTitleToAdres: function(str) {
        var inp = ge('blog_entry_adres');
        if (inp.modified) {
            if (val(inp).length == 0) {
                inp.modified = false;
            } else {
                return;
            }
        }

        str = str.toLowerCase();
        var adres = '',
            exp = str.split('');
        for (var i in exp) {
            var code = str.charCodeAt(i),
                symb = '';
            if (code == 32) {
                symb = '-';
            } else if (blog.toTranslit[code]) {
                symb = blog.toTranslit[code];
            } else if (code >= 97 && code <= 122) {
                symb = exp[i];
            }
            adres += symb;
        }
        val('blog_entry_adres', adres);
    },
    remove: function(e) {
        cancelEvent(e);
        var box = showFastBox(getLang('global_warning'), cur.lang.blog_remove_warning, cur.lang.blog_confirm_remove, function() {
            box.hide();
            blog.doRemove();
        });
    },
    doRemove: function() {
        ajax.post('blog.php', {
            act: 'remove',
            id: cur.entryID,
            hash: cur.blogHash
        }, {
            onDone: function() {
                nav.go('/blog');
            }
        });
    },
    setFollow: function(action, hash) {
        var act = 'un';
        if (action == 'follow') {
            act = '';
            lockButton('blog_follow_btn');
        } else if (action == 'unfollow_box') {
            curBox().showProgress();
        }

        if (action != 'follow') {
            var unfollowBtn = ge('blog_email_notify_unfollow_btn');
            showProgress(unfollowBtn);
            addClass(unfollowBtn.parentNode, 'loading');
        }

        ajax.post('blog.php', {
            act: act + 'follow',
            hash: hash
        }, {
            onDone: function(res, data) {
                if (action == 'follow') {
                    unlockButton('blog_follow_btn');
                }
                if (res == 'confirm_email') {
                    var mbindBox = MessageBox({
                        title: data.title,
                        onHide: function() {}
                    }).content(data.html);
                    mbindBox.evalBox(data.script);
                    mbindBox.show();
                    return;
                }
                val('blog_follow_descr', data);
                if (act == 'un') {
                    hide('blog_followed_state');
                    show('blog_follow_btn');
                } else {
                    hide('blog_follow_btn');
                    show('blog_followed_state');
                    blog.showEmailSettings(hash);
                }
                if (action == 'unfollow_box') {
                    curBox().hide();
                }

                if (action != 'follow') {
                    hideProgress(unfollowBtn);
                    removeClass(unfollowBtn.parentNode, 'loading');
                }
            },
            onFail: function() {
                if (action == 'unfollow_box') {
                    curBox().hideProgress();
                }

                if (action != 'follow') {
                    hideProgress(unfollowBtn);
                    removeClass(unfollowBtn.parentNode, 'loading');
                }
            }
        });
    },
    showEmailSettings: function(unfollowHash) {
        showBox('blog.php', {
                act: 'email_settings',
            })
            .removeButtons()
            .addButton(getLang('global_save'), blog.saveEmailSettings)
            .addButton(getLang('global_cancel'), '', 'gray')
            .setControlsText('<a href="/" onclick="blog.setFollow(\'unfollow_box\', \'' + unfollowHash + '\'); return false;">' + cur.lang.blog_unfollow_box + '</a>');
    },
    saveEmailSettings: function(btn) {

        var query = {
            act: 'save_email_settings',
            hash: val('blog_email_settings_hash'),
            thems: 0,
        };

        var thems = geByClass('blog_email_settings_checkbox');
        for (var i = 0; i < thems.length; i++) {
            if (!hasClass(thems[i], 'on')) {
                query.thems |= intval(attr(thems[i], 'data-id'));
            }
        }

        lockButton(btn);
        ajax.post('blog.php', query, {
            onDone: function() {
                curBox().hide();
            }
        });
    },
    changeDateInfoTip: function(el) {
        return showTooltip(el, {
            slide: 15,
            showdt: 200,
            hidedt: 200,
            dir: 'auto',
            shift: [94, 7, 7],
            className: 'verified_tt blog_change_date_tt',
            text: cur.lang.blog_set_time_descr,
        });
    },
    changeNoPublish: function(el) {
        if (hasClass(el, 'on')) {
            hide('blog_change_date_wrap');
        } else {
            show('blog_change_date_wrap');
        }
    },
    changeDateTools: function(el) {
        if (hasClass(el, 'on')) {
            show(geByClass1('blog_change_date_tools'));
        } else {
            hide(geByClass1('blog_change_date_tools'));
        }
    },
    toYear: function(year, e) {
        if (e) cancelEvent(e);

        var el = ge('blog_year' + year);
        if (el) {
            var pos = getXY(el),
                top = Math.max(0, pos[1] - 20 - getSize('page_header_cont')[1]);
            if (browser.msie6) {
                animate(pageNode, {
                    scrollTop: top
                }, 400);
            } else {
                animate(htmlNode, {
                    scrollTop: top
                }, {
                    duration: 800,
                    transition: Fx.Transitions.easeOutCubic
                });
                animate(bodyNode, {
                    scrollTop: top
                }, {
                    duration: 800,
                    transition: Fx.Transitions.easeOutCubic
                });
            }
        }
    },
    switchTab: function(el, e) {
        if (checkEvent(e)) return true;
        var tabs = gpeByClass('ui_tabs', el);
        if (geByClass1('ui_tab_sel', tabs) == el) return false;

        var noscroll = 0;
        if (!hasClass(el.parentNode, 'ui_tab_plain')) {
            uiTabs.switchTab(el);
            uiTabs.showProgress(tabs);
            noscroll = 1;
        }

        cancelEvent(e);

        return nav.go(el, e, {
            noscroll: noscroll
        });
    },
    createEmailTemplate: function() {
        showBox('blog.php', {
            act: 'create_email_template_box',
        }, {
            params: {
                width: 400,
            }
        }).removeButtons().addButton(getLang('global_save'), blog.doCreateEmailTemplate).addButton(getLang('global_close'), '', 'gray');
    },
    doCreateEmailTemplate: function() {
        var title = trim(val('blog_email_tpl_title'));
        if (!title) {
            return ge('blog_email_tpl_title').focus();
        }

        curBox().removeButtons();
        curBox().showProgress();
        ajax.post('blog.php', {
            act: 'create_email_template',
            title: title,
            hash: val('email_template_create_hash'),
        }, {
            onDone: function(id) {
                nav.go('/blog?act=email_template_edit&id=' + id);
            },
            onFail: function() {
                curBox().hide();
            }
        });
    },
    registerEvent: function(el, type, hash) {
        lockButton(el);
        ajax.post('blog.php', {
            act: 'register',
            type: type,
            hash: hash,
        }, {
            onDone: function(res) {
                val(el.parentNode, res);
            },
            onFail: function() {
                unlockButton(el);
            }
        });
    },
    createNotification: function(nid) {
        cur.notificationID = parseInt(nid) || 0;

        var box = showBox('blog.php', {
                act: 'create_notification_box',
                nid: cur.notificationID
            }, {
                width: 600
            })
            .removeButtons()
            .addButton(getLang('global_save'), blog.notificationSave)
            .addButton(getLang('global_close'), '', 'gray');

        if (nid) {
            box.setControlsText('<a href="/" onclick="blog.notificationDelete(); return false;">' + getLang('global_delete') + '</a>');
        }
    },
    notificationSave: function(btn) {

        var query = {
            act: 'save_notification',
            nid: cur.notificationID,
            hash: cur.notificationsHash,
            api_version: val('notification_api_version'),
            union_ids: val('notification_union_ids'),
            no_target_cache: hasClass('notification_no_target_cache', 'on') ? 1 : 0
        };

        var title = trim(val('notification_title'));
        if (!title) {
            return ge('notification_title').focus();
        }
        query.title = title;

        var text = trim(val('notification_text'));
        if (!text) {
            return ge('notification_text').focus();
        }
        query.text = text;

        var url = trim(val('notification_url'));
        if (!url) {
            return ge('notification_url').focus();
        }
        query.url = url;

        var platforms = cur.platformsDD.val(),
            platformsList = String(platforms).split(',')

        query.platforms = platforms;

        var buttonText, photoId = attr('blog_notification_image', 'data-pid');

        if (!photoId) {
            return showFastBox(getLang('global_error'), cur.lang.notification_create_err_image_select);
        }

        buttonText = trim(val('notification_button_text'));
        if (!buttonText) {
            return ge('notification_button_text').focus();
        }

        query.type = cur.typeDD.val();
        if (photoId) {
            query.photo_id = photoId;
        }

        if (buttonText) {
            query.button_text = buttonText;
        }

        query.langs = cur.langsDD.val();
        query.countries = cur.countriesDD.val();
        query.show_for = cur.showForDD.val();

        var groups = [],
            groupsRaw = cur.groupsSel.val_full();
        for (var i = 0; i < groupsRaw.length; i++) {
            groups.push(groupsRaw[i][1]);
        }
        query.groups = groups.join(',');

        query.status = cur.statusDD.val();
        query.part = cur.partsDD.val();

        lockButton(btn);
        ajax.post('blog.php', query, {
            onDone: function() {
                nav.reload();
            },
            onFail: function() {
                unlockButton(btn);
            }
        });
    },
    notificationUpdateStatusLabel: function() {
        setStyle('notification_status_label', 'color', intval(cur.statusDD.val()) == 1 ? '#5AA84D' : '#981C0D');
    },
    notificationOnChangePlatform: function() {
        cur.desktopPlatform = false;
        cur.mobPlatform = false;

        var platforms = String(cur.platformsDD.val()).split(',');
        for (var i in platforms) {
            var platform = trim(platforms[i]);
            if (!platform) {
                continue;
            }

            if (platforms[i] == 'web2') {
                cur.desktopPlatform = true;
            } else {
                cur.mobPlatform = true;
            }
        }
        blog.notificationCheckChangeImageAvailable();
    },
    notificationCheckChangeImageAvailable: function() {
        var type = cur.typeDD.val();
        var el = ge('blog_notification_image');
        el.className = '';
        if (type == 'app' || type == 'banner') {
            addClass(el, type);
        }
        blog.notificationUpdateImageSize();
    },
    notificationUpdateImageSize: function() {
        if (cur.typeDD.val() != 'banner') {
            var ratio = 1;
        } else {
            var ratio = floatval(attr('blog_notification_image', 'data-ratio')) || 0.4;
        }

        if (cur.typeDD.val() == 'info') {
            var width = 50;
        } else if (cur.typeDD.val() == 'app') {
            var width = 100;
        } else {
            var width = 400;
        }

        setStyle('blog_notification_image', {
            width: width,
            height: width * ratio
        });
    },
    notificationTypeOnChange: function() {
        blog.notificationCheckChangeImageAvailable();
    },
    notificationSelectImage: function() {
        showBox('blog.php', {
            act: 'notifications_select_image',
            type: cur.typeDD.val()
        }, {
            width: 600
        });
    },
    notificationUploadPhoto: function(file) {
        var reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                var url = e.target.result;

                var vkimg = new vkImage();
                vkimg.src = url;
                vkimg.onload = function() {
                    if (cur.typeDD.val() != 'banner' && vkimg.width != vkimg.height) {
                        return topError('������ � ������ ����������� ������ ���������!', 5000);
                    }

                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', cur.notificationUploadServer, true);

                    lockButton(geByClass1('blog_notifications_select_photos_upload_btn'));
                    xhr.onload = function() {
                        var obj, res = xhr.responseText;
                        try {
                            obj = eval('(' + res + ')');
                        } catch (e) {
                            obj = q2ajx(res);
                        }
                        blog.notificationSavePhoto(obj);
                    };
                    var form = new FormData();
                    form.append('file1', file);
                    xhr.send(form);
                };
            };
        })(file);
        reader.readAsDataURL(file);
    },
    notificationSavePhoto: function(query) {
        query.act = 'notification_save_photo';
        query.notify_type = cur.typeDD.val();
        ajax.post('blog.php', query, {
            onDone: blog.notificationDoSelectImage,
            onFail: function() {
                unlockButton(geByClass1('blog_notifications_select_photos_upload_btn'));
            }
        });
    },
    notificationDoSelectImage: function(photoRaw, photoUrl, ratio) {
        curBox().hide();
        setStyle('blog_notification_image', 'background-image', 'url(' + photoUrl + ')');
        attr('blog_notification_image', 'data-pid', photoRaw);
        attr('blog_notification_image', 'data-ratio', ratio);
        blog.notificationUpdateImageSize();
    },
    notificationShowAgainForMe: function(btn) {
        lockButton(btn);
        ajax.post('blog.php', {
            act: 'notification_show_again_for_me',
            hash: cur.notificationsHash,
            nid: cur.notificationID
        }, {
            onDone: function() {
                topMsg('Done', 3);
                unlockButton(btn);
            },
            onFail: function() {
                unlockButton(btn);
            }
        })
    },
    notificationDelete: function() {
        showFastBox(getLang('global_warning'), cur.lang.remove_notification_warning, getLang('global_continue'), blog.doNotificationDelete);
    },
    doNotificationDelete: function(btn) {
        lockButton(btn);
        ajax.post('blog.php', {
            act: 'notification_delete',
            hash: cur.notificationsHash,
            nid: cur.notificationID
        }, {
            onDone: function() {
                curBox().hide();
                nav.reload();
            },
            onFail: function() {
                unlockButton(btn);
            }
        })
    }
};

try {
    stManager.done('blog.js');
} catch (e) {}