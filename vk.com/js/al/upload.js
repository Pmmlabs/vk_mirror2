if (!window.jsonpManager) {
    window.jsonpManager = window.__jsp = {
        c: 1,
        h: {},
        reg: function(h) {
            __jsp.h[__jsp.c] = isFunction(h) ? h : function() {};
            return __jsp.c++;
        }
    }
}

if (!window.Upload) {
    var Upload = {

        init: function(obj, uploadUrl, vars, options) {
            window.uploadInterface = (window.uploadInterface != undefined) ? uploadInterface + 1 : 0;
            var iUpload = uploadInterface;

            each(['obj', 'dropbox', 'options', 'vars', 'types', 'uploadUrls', 'callbacks', 'checks', 'dragTimer'], function(i, v) {
                if (!Upload[v]) Upload[v] = {};
            });

            this.obj[iUpload] = ge(obj);
            if (options.dropbox) {
                this.dropbox[iUpload] = ge(options.dropbox);
            }
            this.vars[iUpload] = vars;
            options.file_input = ge(options.file_input);
            this.options[iUpload] = options;
            if (options.clear) {
                cur.destroy.push(Upload.deinit.pbind(iUpload));
            }
            this.uploadUrls[iUpload] = uploadUrl;
            if (options.flash_lite && !browser.flash && !this.checkFileApi()) {
                this.obj[iUpload] = ge(options.fieldEl) || this.obj[iUpload].parentNode.firstChild;
            } else {
                if (options.customShowProgress) {
                    options.customShowProgress();
                } else {
                    if (this.obj[iUpload].tagName == 'INPUT' && !this.checkFileApi()) {
                        this.obj[iUpload] = ge(options.fieldEl) || this.obj[iUpload].parentNode.firstChild;
                    } else if (!options.flash_lite) {
                        this.obj[iUpload].innerHTML = '<div class="upload_check loading">' + getProgressHtml('', 'pr_medium upload_pr') + '</div>';
                    }
                }
            }
            if (options.noCheck) {
                this.embed(iUpload);
            } else {
                this.check(iUpload);
            }

            return iUpload;
        },

        deinit: function(iUpload) {
            if (!Upload.obj[iUpload]) return;

            var options = Upload.options[iUpload] || {};
            var dragEl = options.dragEvObj;
            var obj = Upload.obj[iUpload];

            if (dragEl) {
                removeEvent(dragEl, 'dragenter');
                removeEvent(dragEl, 'dragover');
                removeEvent(dragEl, 'dragleave');
            }

            obj.innerHTML = '';

            each(['obj', 'dropbox', 'options', 'vars', 'types', 'uploadUrls', 'callbacks'], function(i, v) {
                if (Upload[v]) {
                    delete Upload[v][iUpload];
                }
            });

            if (Upload.callbacks) {
                var clbks = ['oncheck', 'ondone', 'onfail'];
                each(Upload.flashCallbacks(), function(i, v) {
                    clbks.push(i);
                });
                each(clbks, function(i, v) {
                    delete Upload.callbacks[v + iUpload];
                });
            }

            clearTimeout(Upload.checks['timer' + iUpload]);
            clearTimeout(Upload.dragTimer[iUpload]);
            delete Upload.dragTimer[iUpload];
        },

        check: function(iUpload) {
            var obj = this.obj[iUpload],
                vars = this.vars[iUpload],
                options = this.options[iUpload];
            var check_url = options.check_url ? options.check_url : this.uploadUrls[iUpload],
                check_vars = {};
            if (options.signed) {
                if (!check_url) return Upload.onCheckComplete(iUpload);
                extend(check_vars, {
                    _jsonp: jsonpManager.reg(function(r) {
                        Upload.onCheckComplete(iUpload, r);
                    })
                });
            } else {
                if (!options.check_hash && !options.server) {
                    return Upload.onCheckComplete(iUpload);
                }

                this.callbacks['oncheck' + iUpload] = Upload.onCheckComplete.pbind(iUpload);
                var t = ['mid', 'aid', 'gid', 'hash', 'rhash'];
                for (var i in t) {
                    check_vars[t[i]] = vars[t[i]];
                }
                if (options.check_hash) {
                    check_vars.hash = options.check_hash;
                }
                if (options.check_rhash) {
                    check_vars.rhash = options.check_rhash;
                }
                if (vars.https_resp) {
                    check_vars.https_resp = vars.https_resp;
                }
                if (vars.http_resp) {
                    check_vars.http_resp = vars.http_resp;
                }
                extend(check_vars, {
                    al: 1,
                    act: 'check_upload',
                    type: options.type,
                    ondone: "Upload.callbacks.oncheck" + iUpload
                });
            }
            var html = '<form action="' + check_url + '" enctype="multipart/form-data" method="post" id="check_upload_form' + iUpload + '" target="check_iframe' + iUpload + '">';
            for (var i in check_vars) {
                html += '<input type="hidden" name="' + i + '" value="' + check_vars[i] + '" />';
            }
            html += '</form><iframe style="visibility: hidden; width: 1px; height: 1px;" id="check_iframe' + iUpload + '" name="check_iframe' + iUpload + '"></iframe>';
            var check = ce('div', {
                id: 'check_upload_' + iUpload,
                innerHTML: html,
                className: options.checkClass || ''
            }, {
                display: 'none'
            });
            if (ge('check_upload_' + iUpload)) re('check_upload_' + iUpload);
            obj.appendChild(check);
            var form = ge('check_upload_form' + iUpload);
            try {
                form && form.submit();
                clearTimeout(Upload.checks['timer' + iUpload]);
                this.checks['timer' + iUpload] = setTimeout(Upload.serverFail.pbind(iUpload), 10000);
            } catch (e) {
                debugLog(e);
            }
        },

        onCheckComplete: function(iUpload, res) {
            clearTimeout(Upload.checks['timer' + iUpload]);
            delete Upload.checks['timer' + iUpload];

            var obj = {},
                options = Upload.options[iUpload],
                data = res;
            if (options.signed) {
                obj = parseJSON(res || '{}');
            } else {
                res = res || '';
                res = res.split('&');
                for (var j in res) {
                    var t = res[j].split('=');
                    obj[t[0]] = t[1];
                }
                data = obj;
            }
            if (options.customHideProgress) {
                options.customHideProgress();
            }
            if (!obj.error && !obj.fail) {
                options.noCheck = 1;
                if (options.onCheckComplete) {
                    options.onCheckComplete(iUpload);
                } else if (options.flash_lite && browser.flash) {
                    Upload.initFlash(iUpload, Upload.obj[iUpload]);
                } else {
                    Upload.embed(iUpload);
                }
                Upload.serverSuccess(iUpload, data);
            } else {
                Upload.serverFail(iUpload, data);
            }
        },

        serverFail: function(iUpload, err_obj) {
            var obj = Upload.obj[iUpload],
                options = Upload.options[iUpload],
                vars = Upload.vars[iUpload];
            if (!obj) return;
            if (!options.signed && !options.server) return;

            if (!Upload.fails) Upload.fails = {};
            Upload.fails[iUpload] = Upload.fails[iUpload] ? Upload.fails[iUpload] + 1 : 1;
            if (options.signed) {
                var parts = Upload.uploadUrls[iUpload].split('?'),
                    tmp = q2ajx(parts[1]),
                    q = extend({
                        act: 'check_result',
                        _resign: tmp._query || parts[1]
                    }, err_obj ? {
                        _query: err_obj
                    } : {
                        _check: options.check_url.split('?')[1]
                    });
                ajax.post('upload_fails.php', q, {
                    onDone: function(url, check_url, base_url, static_url) {
                        if (Upload.fails[iUpload] < options.max_attempts) {
                            Upload.uploadUrls[iUpload] = url;
                            extend(Upload.options[iUpload], {
                                check_url: check_url,
                                base_url: base_url,
                                static_url: static_url
                            });
                            Upload.check(iUpload);
                        } else {
                            obj.innerHTML = '';
                            if (options.lang && options.lang.cannot_upload_title && options.lang.cannot_upload_text) {
                                showFastBox({
                                    title: options.lang.cannot_upload_title,
                                    width: 430,
                                    dark: 1,
                                    bodyStyle: 'padding: 20px; line-height: 160%;'
                                }, options.lang.cannot_upload_text);
                            }
                        }
                    }
                });
                return;
            }
            var query = extend({
                act: 'fail',
                role: options.type,
                mid: vars.mid,
                oid: vars.oid,
                gid: vars.gid,
                aid: vars.aid,
                server: options.server,
                error: options.error,
                hash: options.error_hash
            }, err_obj);
            if (options.custom_hash) {
                extend(query, {
                    custom_hash: options.custom_hash,
                    photo_hash: vars.photo_hash,
                    size: vars.size,
                    fid: vars.fid,
                    vid: vars.vid,
                    tag: vars.tag
                });
            }
            if (window.ajax) {
                ajax.post('upload_fails.php', query, {
                    onDone: function(url, new_vars, opts) {
                        if (Upload.fails[iUpload] < options.max_attempts) {
                            Upload.uploadUrls[iUpload] = url;
                            extend(Upload.options[iUpload], opts);
                            extend(Upload.vars[iUpload], new_vars);
                            Upload.check(iUpload);
                        } else {
                            obj.innerHTML = '';
                            if (options.lang && options.lang.cannot_upload_title && options.lang.cannot_upload_text) {
                                showFastBox({
                                    title: options.lang.cannot_upload_title,
                                    width: 430,
                                    dark: 1,
                                    bodyStyle: 'padding: 20px; line-height: 160%;'
                                }, options.lang.cannot_upload_text);
                            }
                        }
                    }
                });
            } else {
                if (options.server != 100000) return;
                Ajax.Send('/upload_fails.php', query, function(ajaxObj, response) {
                    try {
                        response = eval('(' + response + ')');
                    } catch (e) {
                        response = null;
                    }
                    var opts = response.options,
                        new_vars = response.vars,
                        url = response.upload_url;
                    if (Upload.fails[iUpload] < options.max_attempts) {
                        Upload.uploadUrls[iUpload] = url;
                        extend(Upload.options[iUpload], opts);
                        extend(Upload.vars[iUpload], new_vars);
                        Upload.check(iUpload);
                    } else {
                        obj.innerHTML = '';
                        if (options.lang && options.lang.cannot_upload_title && options.lang.cannot_upload_text) {
                            showFastBox({
                                title: options.lang.cannot_upload_title,
                                width: 430,
                                dark: 1,
                                bodyStyle: 'padding: 20px; line-height: 160%;'
                            }, options.lang.cannot_upload_text);
                        }
                        options.onCheckServerFailed && options.onCheckServerFailed();
                    }
                });
            }
        },

        serverSuccess: function(iUpload, err_obj) {
            var options = Upload.options[iUpload],
                vars = Upload.vars[iUpload];
            Upload.checked = Upload.checked || {};
            Upload.checked[iUpload] = 1;
            if (options.signed) {
                ajax.post('upload_fails.php', {
                    act: 'check_result',
                    _query: err_obj
                });
                return;
            }
            if (!options.server && !options.error_hash) return;
            var query = extend({
                act: 'success',
                mid: vars.mid,
                oid: vars.oid,
                gid: vars.gid,
                aid: vars.aid,
                server: options.server,
                error: options.error,
                hash: options.error_hash
            }, err_obj);
            if (window.ajax) {
                ajax.post('upload_fails.php', query);
            } else {
                Ajax.Send('/upload_fails.php', query);
            }
        },

        embed: function(iUpload) {
            var i = iUpload.num != undefined ? iUpload.num : iUpload;
            var obj = this.obj[i];
            var dropbox = this.dropbox[i];
            var options = this.options[i];

            if (options.noEmbed) {
                re('check_upload_' + iUpload);
                return;
            }
            if (!options.noCheck) return;

            if (browser.flash > 9 && options.forceFlash) {
                this.initFlash(i, obj);
            } else if (this.checkFileApi() && !options.flash_lite) {
                this.initFileApi(i, obj, dropbox);
            } else if (browser.flash > 9 && !options.noFlash) {
                this.initFlash(i, obj);
            } else if (!options.noForm) {
                this.initForm(i, obj);
            }
        },

        checkFileApi: function() {
            return (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
        },

        initFlash: function(iUpload, obj) {
            var postData = [],
                vars = Upload.vars[iUpload],
                options = Upload.options[iUpload];
            var opts = {
                url: options.flashPath || '/swf/uploader_lite.swf',
                id: 'uploader_lite' + iUpload,
                preventhide: true,
                width: '100%',
                height: browser.safari || browser.msie || browser.chrome && intval(browser.version) < 17 ? (options.flashHeight ? options.flashHeight + 'px' : (cur.flash_lite && !isVisible('photos_flash_add_button') ? '67px' : '25px')) : '100%'
            };
            var params = {
                swliveconnect: 'true',
                allowscriptaccess: 'always',
                wmode: browser.msie ? 'opaque' : 'transparent'
            }
            Upload.types[iUpload] = 'flash';
            for (var i in vars) {
                postData.push(i + '=' + vars[i]);
            }
            if (!options.signed && !vars['ajx']) {
                postData.push('ajx=1');
            }
            var clbksRaw = this.flashCallbacks(),
                clbks = {};
            this.callbacks = this.callbacks || {};
            each(clbksRaw, function(i, v) {
                Upload.callbacks[i + iUpload] = v.pbind(iUpload);
                clbks[i] = 'Upload.callbacks.' + i + iUpload;
            });

            var flashVars = clone(vars);
            extend(flashVars, clbks, {
                'upload_url': Upload.uploadUrls[iUpload],
                'file_size_limit': options.file_size_limit,
                'file_types_description': options.file_types_description,
                'file_types': options.file_types,
                'file_name': options.file_name,
                'post_data': escape(postData.join('&'))
            });

            if (!options.flash_lite) {
                if (!options.lang['button_browse']) {
                    options.lang['button_browse'] = '������� ����';
                }
                if (options.flat_button) {
                    obj.innerHTML = '<div id="uploader' + iUpload + '" style="position: relative;"><div id="lite_upload' + iUpload + '" style="position: absolute; height: 100%; width: 100%; z-index: 10000; cursor: pointer;"></div><button class="flat_button button_big button_big_width">' + options.lang['button_browse'] + '</button></div>';
                } else {
                    obj.innerHTML = '<button id="uploader' + iUpload + '" class="flat_button upload_btn ' + (options.buttonClass || '') + '" style="position: relative;"><div id="lite_upload' + iUpload + '" style="position: absolute; height: 100%; width: 100%; z-index: 10000; cursor: pointer;"></div>' + options.lang['button_browse'] + '</button>';
                }
            } else {
                obj.innerHTML = '<div class="lite_upload" id="lite_upload' + iUpload + '" style="z-index:10000; width: 100%; height: 100%; cursor: pointer;"></div>';
            }
            renderFlash(ge('lite_upload' + iUpload), opts, params, flashVars);
            if (browser.msie) setStyle(ge('lite_upload' + iUpload), {
                opacity: 0,
                cursor: 'pointer'
            });

            if (options.lang.switch_mode) {
                var text = options.lang.switch_mode.replace('{link}', '<a onclick="Upload.switchMode(' + iUpload + ');">');
                text = text.replace('{/link}', '</a>');
                obj.appendChild(ce('div', {
                    innerHTML: text,
                    align: 'left',
                    className: 'upload_switch_mode'
                }, {
                    marginTop: '15px'
                }));
            }
        },

        initForm: function(iUpload, obj) {
            var _iu = iUpload,
                vars = this.vars[_iu],
                options = this.options[_iu];
            this.types[_iu] = 'form';

            // setTimeout is needed at least for Opera to allow to do ajax requests in this callbacks. Otherwise it hangs up on XHR.open() call.

            var html = '<form action="' + this.uploadUrls[_iu] + '" enctype="multipart/form-data" method="post" id="file_uploader_form' + _iu + '" target="upload_iframe' + _iu + '" style="text-align: center; width: 100%;">';
            if (options.signed) {
                extend(vars, {
                    _jsonp: jsonpManager.reg(function(r) {
                        Upload.onUploadComplete(_iu, r);
                    })
                });
            } else {
                var onDoneCallback = Upload.onUploadComplete.pbind(_iu);
                var onFailCallback = Upload.onUploadError.pbind(_iu);
                this.callbacks['ondone' + _iu] = function() {
                    var callback = onDoneCallback.pbind.apply(onDoneCallback, arguments);
                    setTimeout(function() {
                        callback();
                    }, 1);
                };
                this.callbacks['onfail' + _iu] = function() {
                    var callback = onFailCallback.pbind.apply(onFailCallback, arguments);
                    setTimeout(function() {
                        callback();
                    }, 1);
                };
                extend(vars, {
                    al: 1,
                    ondone: "Upload.callbacks.ondone" + _iu,
                    onfail: "Upload.callbacks.onfail" + _iu
                });
            }
            for (var i in vars) {
                html += '<input type="hidden" name="' + i + '" value="' + vars[i] + '" />';
            }
            var onInpChange = !options.uploadButton ? 'Upload.onUploadStart(' + _iu + ');' : 'Upload.onUploadFileSelected(' + _iu + ')';
            var input = '<input type="file" class="file" size="28" onchange="' + onInpChange + '" name="' + options['file_name'] + '" style="cursor: pointer;"' + (options.accept ? ' accept="' + options.accept + '"' : '') + '/>\
  \
  </form><iframe style="position: absolute; visibility: hidden; width: 1px; height: 1px;" id="upload_iframe' + _iu + '" name="upload_iframe' + _iu + '"></iframe>';
            if (options.label) {
                html += options.label.split('{file}').join(input);
            } else {
                html += input;
            }
            obj.innerHTML = html;
            var nfile = options.file_input,
                cfile = geByClass1('file', obj, 'input');

            delete options.file_input;
            if (nfile && cfile) {
                cfile.parentNode.replaceChild(nfile, cfile);
                nfile.onchange = function() {
                    Upload.onUploadStart(_iu)
                };
                if (data(nfile, 'changed')) {
                    data(nfile, 'changed', false);
                    nfile.onchange();
                }
            }
            if (options.uploadButton && options.setUploadAction) {
                options.setUploadAction(iUpload, function() {
                    Upload.onUploadStart(_iu);
                });
            } else if (options.uploadButton) {
                ge(options.uploadButton).onclick = function() {
                    Upload.onUploadStart(_iu);
                };
            }
        },

        buttonOver: function(iUpload) {
            var options = Upload.options[iUpload];
            if (options.flash_lite) {
                if (options.hoverEl) {
                    addClass(options.hoverEl, 'hover');
                } else if (isVisible('photos_flash_add_button')) {
                    addClass(ge('photos_flash_add_button'), 'hover');
                } else {
                    addClass(ge('photos_upload_area'), 'hover');
                }
            } else {
                addClass(ge('lite_upload' + iUpload).nextSibling, 'hover');
            }
        },

        buttonOut: function(iUpload) {
            var options = Upload.options[iUpload];
            if (options.flash_lite) {
                if (options.hoverEl) {
                    removeClass(options.hoverEl, 'hover');
                } else if (isVisible('photos_flash_add_button')) {
                    removeClass(ge('photos_flash_add_button'), 'hover');
                    removeClass(ge('photos_flash_add_button'), 'active');
                } else {
                    removeClass(ge('photos_upload_area'), 'hover');
                }
            } else {
                removeClass(ge('lite_upload' + iUpload).nextSibling, 'hover');
                removeClass(ge('lite_upload' + iUpload).nextSibling, 'active');
            }
        },

        buttonDown: function(iUpload) {
            if (Upload.options[iUpload].flash_lite) {
                if (isVisible('photos_flash_add_button')) {
                    addClass(ge('photos_flash_add_button'), 'active');
                }
            } else {
                addClass(ge('lite_upload' + iUpload).nextSibling, 'active');
            }
        },

        buttonUp: function(iUpload) {
            if (Upload.options[iUpload].flash_lite) {
                if (isVisible('photos_flash_add_button')) {
                    removeClass(ge('photos_flash_add_button'), 'active');
                }
            } else {
                removeClass(ge('lite_upload' + iUpload).nextSibling, 'active');
            }
        },

        initFileApi: function(iUpload, obj, dropbox) {
            var options = this.options[iUpload],
                input,
                dragEl = options && options.dragEl || window.boxLayerWrap;
            if (dropbox && dragEl) {
                if (!Upload.addedDocEvent) {
                    addEvent(document, 'drop', Upload.drop);
                    Upload.addedDocEvent = true;
                }
                options.dragEvObj = dragEl;
                addEvent(dragEl, 'dragenter', Upload.dragEnter.pbind(iUpload));
                addEvent(dragEl, 'dragover', Upload.dragOver.pbind(iUpload));
                addEvent(dragEl, 'dragleave', Upload.dragOut.pbind(iUpload));
            }
            this.types[iUpload] = 'fileApi';
            if (options.chooseBox) {
                input = '<input class="file" type="file" size="28" onchange="Upload.onFileApiSend(' + iUpload + ', this.files);"' + (options.multiple ? ' multiple="true"' : '') + (options.accept ? ' accept="' + options.accept + '"' : '') + ' name="' + options['file_name'] + '" style="cursor: pointer;"/>';
            } else if (options.uploadButton) {
                if (!options.lang['button_browse']) {
                    options.lang['button_browse'] = '������� ����';
                }
                input = '<button class="flat_button upload_btn fl_l ' + (options.buttonClass || '') + '" onclick="this.nextSibling.nextSibling.click()">' + options.lang['button_browse'] + '</button><div class="upload_selected fl_l" style="padding: 4px 0 0 10px;"></div><input class="file" type="file" size="28" onchange="geByClass1(\'upload_selected\', this.parentNode).innerHTML = Upload.getFilesNames(' + iUpload + ', this.files); Upload.onUploadFileSelected(' + iUpload + ')"' + (options.multiple ? ' multiple="true"' : '') + (options.accept ? ' accept="' + options.accept + '"' : '') + ' name="' + options['file_name'] + '" style="visibility: hidden; position: absolute;"/><br class="clear" />';
            } else {
                if (!options.lang['button_browse']) {
                    options.lang['button_browse'] = '������� ����';
                }
                if (options.flat_button) {
                    input = '<button class="upload_btn flat_button button_big_width button_big ' + (options.buttonClass || '') + '" onclick="this.nextSibling.click()">' + options.lang['button_browse'] + '</button><input class="file" type="file" size="28" onchange="Upload.onFileApiSend(' + iUpload + ', this.files);"' + (options.multiple ? ' multiple="true"' : '') + (options.accept ? ' accept="' + options.accept + '"' : '') + ' name="' + options['file_name'] + '" style="visibility: hidden; position: absolute;"/>';
                } else {
                    input = '<button class="flat_button upload_btn ' + (options.buttonClass || '') + '" onclick="this.nextSibling.click()">' + options.lang['button_browse'] + '</button><input class="file" type="file" size="28" onchange="Upload.onFileApiSend(' + iUpload + ', this.files);"' + (options.multiple ? ' multiple="true"' : '') + (options.accept ? ' accept="' + options.accept + '"' : '') + ' name="' + options['file_name'] + '" style="visibility: hidden; position: absolute;"/>';
                }
            }
            if (options.label) {
                obj.innerHTML = options.label.split('{file}').join(input);
            } else {
                obj.innerHTML = input;
            }
            var nfile = options.file_input,
                cfile = geByClass1('file', obj, 'input');
            if (nfile && cfile) {
                cfile.parentNode.replaceChild(nfile, cfile);
                nfile.onchange = function() {
                    Upload.onFileApiSend(iUpload, this.files);
                };
                if (data(nfile, 'changed')) {
                    data(nfile, 'changed', false);
                    setTimeout(nfile.onchange.bind(nfile), 0);
                }
            }
            if (options.uploadButton && options.setUploadAction) {
                options.setUploadAction(iUpload, function() {
                    Upload.onFileApiSend(iUpload, geByTag1('input', obj).files);
                });
            } else if (options.uploadButton) {
                ge(options.uploadButton).onclick = function() {
                    Upload.onFileApiSend(iUpload, geByTag1('input', obj).files);
                }
            }
        },

        switchMode: function(iUpload) {
            Upload.options[iUpload].noFlash = Upload.options[iUpload].noCheck = 1;
            Upload.embed(iUpload);
        },

        onUploadFileSelected: function(iUpload) {
            if (Upload.options[iUpload].onUploadFileSelected) {
                Upload.options[iUpload].onUploadFileSelected();
            }
        },

        onUploadStart: function(info, result) {
            cur.fileApiUploadStarted = true;
            var iUpload = info.ind !== undefined ? info.ind : info;
            if (Upload.types[iUpload] == 'form') {
                var form = ge('file_uploader_form' + iUpload);
                form.submit();
                var file = geByClass1('file', Upload.obj[iUpload]);
                file.disabled = true;
            }

            var options = Upload.options[iUpload];
            if (options.onUploadStart) {
                options.onUploadStart(info, result);
            };
        },

        getErrorAdditional: function(obj) {
            if (obj.error && obj.server !== undefined && obj.bwact !== undefined) {
                return ((obj.error.indexOf(':') !== -1) ? ',' : ':') + ' from upl_' + intval(obj.server) + '?act=' + obj.bwact.replace(/[^a-zA-Z_0-9]/g, '');
            }
            return '';
        },

        onUploadComplete: function(info, result, extra_info) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload],
                obj;
            if (extra_info !== undefined && iUpload === info) {
                info = extra_info;
            }
            info.ind = iUpload;
            if (Upload.types[iUpload] == 'form') {
                var file = geByClass1('file', Upload.obj[iUpload]);
                file.disabled = false;
            }
            if (options.onUploadComplete) {
                var errorAdd = '';
                if (options.signed) {
                    var obj = result ? parseJSON(result) : '';
                    if (!obj) {
                        result = '{"error":"ERR_CLIENT_UPLOAD_FAIL: upload request bad result, url \\"' + Upload.uploadUrls[iUpload] + '\\""}';
                    } else {
                        errorAdd = Upload.getErrorAdditional(obj);
                    }
                }
                options.onUploadComplete(info, result, errorAdd);
            }
            if (Upload.types[iUpload] == 'form') {
                Upload.onUploadCompleteAll(info, result);
            }

            if (options.type === 'video') {
                statlogsValueEvent('upload_video_fails', 1, options.server, 'success');
            } else if (options.type === 'photo') {
                statlogsValueEvent('upload_photo_fails', 1, options.server, 'success');
            } else if (options.type === 'doc') {
                statlogsValueEvent('upload_doc_fails', 1, options.server, 'success');
            }
        },

        onUploadCompleteAll: function(info, result, extra_info) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload];
            if (extra_info !== undefined && iUpload === info) {
                info = extra_info;
            }
            if (Upload.types[iUpload] == 'fileApi') {
                var cfile = geByClass1('file', Upload.obj[iUpload], 'input');
                if (cfile) {
                    cfile.value = '';
                }
            }

            if (options.onUploadCompleteAll) {
                options.onUploadCompleteAll(info, result);
            }
        },

        onUploadError: function(info, result) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload];
            if (Upload.types[iUpload] == 'form') {
                var file = geByClass1('file', Upload.obj[iUpload]);
                file.disabled = false;
            }
            if (options.signed) {
                if (options.onUploadComplete) {
                    options.onUploadComplete(info, '{"error":"ERR_CLIENT_UPLOAD_FAIL: upload request fail, code \\"' + result.replace(/([\\\"])/g, '\\$1').replace(/\n/g, '\\n') + '\\", url \\"' + Upload.uploadUrls[iUpload] + '\\""}');
                }
            } else if (options.onUploadError) {
                options.onUploadError(info, result);
            };
        },

        onConnectionLost: function(info) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload];
            if (options.onConnectionLost) {
                options.onConnectionLost(info);
            }
        },

        onUploadProgress: function(info, bytesLoaded, bytesTotal) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload];
            if (options.onUploadProgress) {
                options.onUploadProgress(info, bytesLoaded, bytesTotal);
            };
        },

        onDebug: function(info, result) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload];
            if (options.onDebug) {
                options.onDebug(info, result);
            }
        },

        onSelectClick: function(info, result) {
            var iUpload = info.ind !== undefined ? info.ind : info;
            var options = Upload.options[iUpload];
            if (options.onSelectClick) {
                options.onSelectClick(info, result);
            }
        },

        getFilesNames: function(iUpload, files) {
            if (!files || !files.length) return;

            var options = this.options[iUpload];
            if (!options.multiple) {
                return files[0].name.replace(/[&<>"']/g, '');
            } else {
                if (!options.lang['selected_num_files']) {
                    options.lang['selected_num_files'] = ['', '%s ����', '%s �����', '%s ������'];
                }
                return langNumeric(files.length, options.lang['selected_num_files']);
            }
        },

        checkFileType: function(filename, fileTypes, fileDisallowedTypes) {
            var valid = false;
            if (fileDisallowedTypes && fileDisallowedTypes !== '') {
                var allowed = true;
                each(fileDisallowedTypes.split(';'), function(i, type) {
                    type = type.substr(1).toLowerCase();
                    if (filename.substr(-type.length).toLowerCase() == type) {
                        allowed = false;
                        return false;
                    }
                });
                if (!allowed) {
                    return false;
                }
            }
            each(fileTypes.split(';'), function(i, type) {
                type = type.substr(1).toLowerCase();
                if (filename.substr(-type.length).toLowerCase() == type || type == '.*') {
                    valid = true;
                    return false;
                }
            });
            return valid;
        },

        checkFilesSizes: function(iUpload, files) {
            var options = this.options[iUpload];

            if (options.file_size_limit) {
                for (var index in files) {
                    var file = files[index];
                    if (file.size && file.size > options.file_size_limit) {
                        var fileSizeErrorText = options.lang.filesize_error;
                        if (fileSizeErrorText && fileSizeErrorText.indexOf('{count}') >= 0) {
                            fileSizeErrorText = fileSizeErrorText.replace('{count}', intval(options.file_size_limit / (1024 * 1024)));
                        }

                        if (fileSizeErrorText) {
                            showFastBox({
                                    title: getLang('global_error'),
                                    width: 430,
                                    dark: 1,
                                    bodyStyle: 'padding: 20px; line-height: 160%;',
                                    onHide: function() {
                                        Upload.embed(iUpload);
                                        delete cur.notStarted;
                                    }
                                },
                                fileSizeErrorText,
                                getLang('global_cancel'));
                        }
                        return false;
                    }
                }
            }

            return true;
        },

        onFileApiSend: function(iUpload, files, force) {
            if (!files || !files.length) return;

            var options = this.options[iUpload];

            if (options.file_types) {
                var filteredFiles = [];
                each(files, function(i, file) {
                    if (Upload.checkFileType(file.name, options.file_types, options.file_disallowed_types)) {
                        filteredFiles.push(file);
                    }
                });
                if (!filteredFiles.length) {
                    options.onNoFilteredCallback && options.onNoFilteredCallback(files);
                    return;
                }
                files = filteredFiles;
            }

            if (options.filterCallback) {
                files = options.filterCallback(iUpload, files);
                if (!files.length) return;
            }

            if (options.reverse_files) {
                files = Array.prototype.slice.call(files).reverse();
            }

            if (!options.multiple && files.length > 1) {
                files = [files[0]]
            }

            if (!this.checkFilesSizes(iUpload, files)) {
                return;
            }

            if (options.photoBox && !force) {
                return Upload.onPhotoAdd(iUpload, files);
            }

            if (options.beforeUpload) options.beforeUpload(iUpload);

            cur.notStarted = cur.fileApiUploadStarted = true;
            if (!options.multi_progress) this.onUploadStart({
                ind: iUpload,
                fileName: (files[0].fileName || files[0].name || '').replace(/[&<>"']/g, '')
            });
            var max_files = files.length;
            if (options.max_files) {
                var attachCount = cur.attachCount;
                if (!attachCount && cur.addMedia) {
                    var maxIndex = -1;
                    for (var j in cur.addMedia) {
                        if (j > maxIndex) maxIndex = j;
                    }
                    if (maxIndex >= 0 && cur.addMedia[maxIndex] && cur.addMedia[maxIndex].attachCount) {
                        attachCount = cur.addMedia[maxIndex].attachCount;
                    }
                }
                var curCount = attachCount ? attachCount() : 0;
                var warnText = (options.max_files_warning || getLang('global_attach_max_n_files', options.max_files)).replace('{count}', options.max_files);
                if (options.max_files - curCount < files.length) {
                    max_files = options.max_files - curCount;
                    showFastBox({
                        title: getLang('global_error'),
                        width: 430,
                        dark: 1,
                        bodyStyle: 'padding: 20px; line-height: 160%;',
                        onHide: function() {
                            Upload.embed(iUpload);
                            delete cur.notStarted;
                        }
                    }, warnText, getLang('global_continue'), function() {
                        Upload.uploadFiles(iUpload, files, max_files);
                        if (options.max_files_hide_last) {
                            curBox().hide();
                        } else {
                            boxQueue.hideAll();
                        }
                    }, getLang('global_cancel'));
                } else {
                    if (options.force_max_files) {
                        max_files = Math.min(max_files, options.max_files - (cur.savedPhotos || []).length);
                    }
                    this.uploadFiles(iUpload, files, max_files);
                }
            } else {
                this.uploadFiles(iUpload, files, max_files);
            }
        },

        onPhotoAdd: function(iUpload, files) {
            var needFire = 0,
                count = 0;
            Upload.fileList = Upload.fileList || {};
            if (!Upload.fileList[iUpload]) {
                Upload.fileList[iUpload] = [];
                if (Upload.options[iUpload].onPhotoBox) {
                    needFire = true;
                }
            }
            each(files, function(n, file) {
                count++;
                var preview = Upload.options[iUpload].photoBox;
                var imageType = new RegExp('image.*')
                if (!file.type.match(imageType)) {
                    //return false;
                }
                cur.uploaderPhotoId = (cur.uploaderPhotoId || 0) + 1;
                var photoId = cur.uploaderPhotoId;
                Upload.fileList[iUpload][photoId] = file;

                var img = ce('img');
                var photo = ce('div', {
                    id: 'photos_add_item' + photoId,
                    className: 'photos_add_item',
                    innerHTML: '<span class="photos_add_img photos_add_wait" id="photos_add_cont' + photoId + '" onmouseover="PhotosAdd.thumbOver(' + photoId + ', this);" onmouseout="PhotosAdd.thumbOut(' + photoId + ');"><span class="photos_add_s" id="photos_add_s' + photoId + '">&nbsp;</span></span><span class="bg">&nbsp;</span>'
                });
                preview.appendChild(photo);

                var reader = new FileReader();
                reader.onload = function(e) {
                    img.src = e.target.result;
                    img.onload = function() {
                        img.onload = false;
                        var size = {
                                w: img.width,
                                h: img.height
                            },
                            dx, dy;
                        if (size.w > 130) {
                            dx = 130 / size.w;
                            size.w = 130;
                            size.h = parseInt(size.h * dx);
                        }


                        if (size.h > 130) {
                            dy = 130 / size.h;
                            size.h = 130;
                            size.w = parseInt(size.w * dy);
                        }

                        var cnv = ce('canvas', {
                            width: size.w,
                            height: size.h
                        });
                        var ctx = cnv.getContext('2d');
                        ctx.drawImage(img, 0, 0, size.w, size.h);
                        delete img;
                        var dataURL = cnv.toDataURL("image/jpeg");
                        img.src = dataURL;
                        var thumbCont = ge('photos_add_s' + photoId);
                        var tw = Math.max(size.w, 80);
                        var th = Math.min(size.h, 98);
                        setStyle(thumbCont, {
                            width: tw,
                            height: th,
                            //marginTop: Math.ceil((98 - th) / 2),
                            marginLeft: Math.ceil((130 - tw) / 2)
                        });
                        thumbCont.innerHTML = '';
                        thumbCont.appendChild(img);
                        img.onload = function() {
                            setTimeout(function() {
                                thumbCont.parentNode.className = 'photos_add_img';
                            }, 0);
                            img.onload = false;
                        }
                        Upload.finishTask();
                    }
                }
                Upload.taskToQ(function() {
                    reader.readAsDataURL(file);
                });
            });
            if (needFire && count) {
                Upload.options[iUpload].onPhotoBox();
            }
            if (Upload.options[iUpload].onPhotoAdd && count) {
                Upload.options[iUpload].onPhotoAdd();
            }
        },

        uploadPhotos: function(iUpload) {
            var files = [],
                flist = Upload.fileList[iUpload];
            for (var i in flist) {
                if (flist[i]) {
                    files.push(extend(flist[i], {
                        fileRef: i
                    }));
                }
            }
            if (Upload.options[iUpload].onUploadStart) Upload.options[iUpload].onUploadStart();
            if (files.length) {
                cur.uploadCount = Math.min(500, files.length);
                Upload.uploadFiles(iUpload, files, cur.uploadCount);
                return true;
            } else {
                return false;
            }
        },

        taskToQ: function(task) {
            if (!Upload.previewFileQ) {
                Upload.previewFileQ = [];
            }
            if (task) {
                Upload.previewFileQ.push(task);
            }

            if (Upload.doingQ) {
                return;
            }
            var newTask = Upload.previewFileQ.shift();
            if (newTask) {
                Upload.doingQ = true;
                newTask();
            }
        },

        finishTask: function() {
            setTimeout(function() {
                Upload.doingQ = false;
                Upload.taskToQ();

            }, 100);
        },

        uploadFiles: function(iUpload, files, max_files) {
            if (max_files <= 0) return;
            var options = this.options[iUpload],
                vars = options.signed ? this.vars[iUpload] : extend(this.vars[iUpload], {
                    ajx: 1
                }),
                totalSize = 0,
                totalCount = 0,
                loadedSize = 0,
                loadedCount = 0,
                filesQueue = [],
                re;

            if (options.uploading) {
                totalSize = options.filesTotalSize || 0;
                totalCount = options.filesTotalCount || 0;
                loadedCount = options.filesLoadedCount || 0;
                loadedSize = options.filesLoadedSize || 0;
                filesQueue = options.filesQueue;
            }

            if (options.file_match) re = new RegExp(options.file_match, "i");

            var errors = false;
            for (var j = 0; j < max_files; j++) {
                var fileName = (files[j].fileName || files[j].name || '').replace(/[&<>"']/g, '');
                if (options.file_match) {
                    if (!fileName.match(re)) {
                        errors = true;
                        continue;
                    }
                }
                if (options.multi_progress && !options.multi_sequence) {
                    this.onUploadStart({
                        ind: iUpload,
                        fileName: fileName
                    });
                }
                totalSize += files[j].size;
                totalCount += 1;
                filesQueue.push(files[j]);
            }
            filesQueue.reverse();

            extend(options, {
                filesQueue: filesQueue,
                filesTotalSize: totalSize,
                filesLoadedSize: loadedSize,
                filesLoadedCount: loadedCount,
                filesTotalCount: totalCount
            });

            // if (options.multi_sequence && options.onUploadProgress) {
            //   options.onUploadProgress(Upload.getFileInfo(iUpload, options, false));
            // }

            if (filesQueue.length > 0) {
                if (cur.multiProgressIndex !== undefined) {
                    if (!cur.nextQueues) cur.nextQueues = [];
                    cur.nextQueues.push(iUpload);
                } else {
                    var params = ajx2q(vars);
                    var uploadUrl = this.uploadUrls[iUpload] ? this.uploadUrls[iUpload] + (this.uploadUrls[iUpload].match(/\?/) ? '&' : '?') + params : '';
                    this.uploadFile(iUpload, filesQueue.pop(), uploadUrl);
                    if (options.multi_progress) cur.multiProgressIndex = iUpload;
                }
            } else if (errors) {
                Upload.onUploadError(iUpload, 'file type not supported');
            }
        },

        getFileInfo: function(iUpload, options, file) {
            return options.multi_progress ? {
                ind: iUpload,
                fileName: (file) ? (file.fileName || file.name || '').replace(/[&<>"']/g, '') : '',
                num: options.filesLoadedCount,
                totalSize: options.filesTotalSize,
                loadedSize: options.filesLoadedSize,
                totalCount: options.filesTotalCount,
                file: file
            } : iUpload;
        },

        supportsChunkedUpload: function() {
            return !!Blob && !!(Blob.prototype.webkitSlice || Blob.prototype.mozSlice || Blob.prototype.slice) && !!FileReader;
        },

        uploadFileChunked: function(iUpload, file, url) {
            var options = this.options[iUpload];
            var info = Upload.getFileInfo(iUpload, options, file);
            if (options.multi_sequence) {
                this.onUploadStart(info);
            }

            var DEFAULT_CHUNK_SIZE = 4 * 1024 * 1024; // 4 MB
            var MAX_THREADS_NUM = 4;
            var MAX_RETRIES_NUM = 50;
            var CHUNKS_EXPIRE_TIME = 24 * 60 * 60 * 1000; // one day

            var curUpload = {
                file: file,
                fileName: (file.name || file.fileName).replace(/[&<>"']/g, ''),
                fileSize: file.size,
                fileMime: file.type,
                retryCount: 0,
                timeouts: [],
                activeRequests: [],
                requestsProgress: {},
                pointer: 0,
                state: {
                    url: url,
                    started: Date.now(),
                    loaded: null,
                    chunkSize: options.chunkSize || DEFAULT_CHUNK_SIZE,
                    sessionId: (Math.random() * 10e16).toString(16)
                },
            };
            curUpload.abort = _abortAllChunks.bind(null, curUpload);

            curUpload.chunksNum = Math.ceil(curUpload.fileSize / curUpload.state.chunkSize);
            curUpload.chunksLeft = curUpload.chunksNum;

            _computeFilePartsChecksum(file, function(hash) {
                curUpload.storageKey = ['upload', hash, curUpload.fileSize].join('_');
                options.uploading = true;
                options.chunkedUpload = curUpload;

                var savedState = ls.get(curUpload.storageKey);
                if (savedState) {
                    if (Date.now() - savedState.started < CHUNKS_EXPIRE_TIME) {
                        curUpload.state = savedState;
                        url = savedState.url;
                    } else {
                        ls.remove(curUpload.storageKey);
                    }
                }

                try {
                    console.log('%c Warning: if devtools is logging network requests it may cause high memory usage during file upload', 'font-size:16px;color:orange;');
                } catch (e) {}

                _startUpload();
            });

            function _computeFilePartsChecksum(file, callback) {
                var chunkSize = 1024 * 1024;
                var middleChunkPointer = Math.floor(file.size / 2) - chunkSize / 2;

                var chunks = [
                    file.slice(0, chunkSize),
                    file.slice(middleChunkPointer, middleChunkPointer + chunkSize),
                    file.slice(file.size - chunkSize, file.size)
                ];

                (function tick(hash) {
                    var chunk = chunks.shift();
                    if (!chunk) {
                        callback(hash);
                        return;
                    }

                    var reader = new FileReader();
                    reader.addEventListener('loadend', function(e) {
                        var data = new Uint8Array(e.target.result);
                        var cs = Fletcher32();
                        cs.append(data);
                        hash += cs.result().toString(16);
                        tick(hash);
                    });
                    reader.readAsArrayBuffer(chunk);
                })('');
            }

            function _startUpload() {
                curUpload.pointer = 0;
                curUpload.chunksLeft = curUpload.chunksNum;
                while (curUpload.activeRequests.length < MAX_THREADS_NUM && curUpload.pointer < curUpload.fileSize) {
                    _uploadNextChunk();
                }
            }

            function _uploadNextChunk() {
                var pointerStart = curUpload.pointer;
                var pointerEnd = Math.min(pointerStart + curUpload.state.chunkSize, curUpload.fileSize) - 1;
                if (pointerStart >= curUpload.fileSize) return;

                if (curUpload.state.loaded) {
                    var isChunkLoaded = false;
                    each(curUpload.state.loaded.split(','), function(i, range) {
                        var matches = range.match(/^(\d+)-(\d+)\/\d+$/);
                        var loadedStart = parseInt(matches[1]);
                        var loadedEnd = parseInt(matches[2]);
                        if (pointerStart >= loadedStart && pointerEnd <= loadedEnd) {
                            isChunkLoaded = true;
                            curUpload.chunksLeft -= Math.ceil((loadedEnd + 1 - pointerStart) / curUpload.state.chunkSize); // ceil to avoid fractional number when current range is at the end of file
                            curUpload.pointer = loadedEnd + 1;
                            return false;
                        }
                    });
                }

                if (isChunkLoaded) {
                    _onProgress();
                    _uploadNextChunk();
                } else {
                    _uploadChunk(pointerStart, pointerEnd);
                    curUpload.pointer += curUpload.state.chunkSize;
                }
            }

            function _uploadChunk(pointerStart, pointerEnd) {
                var chunk = (file.slice || file.webkitSlice || file.mozSlice).call(file, pointerStart, pointerEnd + 1);

                var xhr = new XMLHttpRequest();

                xhr.open('POST', url, true);

                xhr.upload.onprogress = function(e) {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        return;
                    }
                    if (e.lengthComputable) {
                        curUpload.requestsProgress[pointerStart] = e.loaded;
                    }
                    _onProgress();
                };

                xhr.onload = function(e) {
                    curUpload.activeRequests.splice(indexOf(curUpload.activeRequests, e.target), 1);
                    curUpload.retryCount = 0;

                    --curUpload.chunksLeft;

                    if (e.target.status == 201) {
                        if (curUpload.chunksLeft) {
                            curUpload.state.loaded = e.target.responseText;
                            ls.set(curUpload.storageKey, curUpload.state);
                            _uploadNextChunk();
                        } else {
                            // chunksLeft is 0 but server is waiting for next chunks. Reindex file
                            curUpload.state.loaded = e.target.responseText;
                            ls.set(curUpload.storageKey, curUpload.state);
                            _startUpload();
                        }
                        delete curUpload.requestsProgress[pointerStart];
                        _onProgress();
                    } else if (e.target.status == 200 && !curUpload.chunksLeft) {
                        ls.remove(curUpload.storageKey);
                        _onUploadComplete(e.target.responseText);
                    } else { // 500 (copyright) or ...
                        ls.remove(curUpload.storageKey);
                        curUpload.abort();
                        Upload.onUploadError(info);

                        if (!Upload.options[iUpload].filesQueue.length) {
                            Upload.startNextQueue(iUpload);
                            Upload.onUploadCompleteAll(info, e.target.responseText);
                            options.uploading = false;
                        }

                        _logChunkError(e.target.status, e.target.responseText, pointerStart + '-' + pointerEnd);
                    }
                };

                xhr.onerror = function(e) {
                    curUpload.activeRequests.splice(indexOf(curUpload.activeRequests, e.target), 1);
                    if (++curUpload.retryCount <= MAX_RETRIES_NUM) {
                        var timeoutId = setTimeout(_uploadChunk.bind(null, pointerStart, pointerEnd), 300 * curUpload.retryCount);
                        curUpload.timeouts.push(timeoutId);
                    } else {
                        curUpload.abort();
                        Upload.onConnectionLost(info);
                    }
                    // delete curUpload.requestsProgress[pointerStart];
                    _onProgress();
                    _logChunkError(e.target.status, e.target.responseText, pointerStart + '-' + pointerEnd);
                };

                xhr.setRequestHeader('Content-Disposition', 'attachment, filename="' + encodeURI(curUpload.fileName) + '"');
                xhr.setRequestHeader('Content-Type', curUpload.fileMime || 'application/octet-stream');
                xhr.setRequestHeader('Content-Range', 'bytes ' + pointerStart + '-' + pointerEnd + '/' + curUpload.fileSize);
                xhr.setRequestHeader('Session-ID', curUpload.state.sessionId);

                xhr.send(chunk);
                chunk = null;
                curUpload.activeRequests.push(xhr);
            }

            function _onProgress() {
                var total = curUpload.fileSize;
                var loaded = (curUpload.chunksNum - curUpload.chunksLeft) * curUpload.state.chunkSize;
                each(curUpload.requestsProgress, function(key, value) {
                    loaded += value;
                });

                extend(info, Upload.getFileInfo(iUpload, options, file));
                if (!options.multi_progress) {
                    Upload.onUploadProgress(iUpload, Math.min(loaded + options.filesLoadedSize, options.filesTotalSize), options.filesTotalSize);
                } else {
                    Upload.onUploadProgress(info, loaded, total);
                }
            }

            function _onUploadComplete(responseText) {
                extend(info, Upload.getFileInfo(iUpload, options, file)); // can be extended
                Upload.options[iUpload].filesLoadedSize += curUpload.fileSize;
                Upload.options[iUpload].filesLoadedCount += 1;
                Upload.onUploadComplete(info, responseText);
                if (Upload.options[iUpload].filesQueue && Upload.options[iUpload].filesQueue.length > 0) {
                    Upload.uploadFile(iUpload, Upload.options[iUpload].filesQueue.pop(), url);
                } else {
                    Upload.startNextQueue(iUpload);
                    Upload.onUploadCompleteAll(info, responseText);
                    options.uploading = false;
                }
            }

            function _abortAllChunks(curUpload) {
                each(curUpload.timeouts, function(i, timeout) {
                    clearTimeout(timeout);
                });
                each(curUpload.activeRequests, function(i, xhr) {
                    xhr.abort();
                });
                curUpload.timeouts = [];
                curUpload.activeRequests = [];
            }

            function _logChunkError(status, text, range) {
                ajax.post('al_video.php', {
                    act: 'uploadVideoFailStat',
                    url: url,
                    error: status + ',' + text,
                    range: range,
                    sessionId: curUpload.state.sessionId,
                    chunksLeft: curUpload.chunksLeft,
                    loaded: curUpload.state.loaded
                });
            }
        },

        resumeUpload: function(iUpload) {
            var curUpload = this.options[iUpload].chunkedUpload;
            Upload.uploadFileChunked(iUpload, curUpload.file, curUpload.state.url);
        },

        isNeedRequestUrl: function(iUpload) {
            var options = this.options[iUpload];
            return options.requestOptionsForFile && options.type === 'video';
        },

        getUploadOptions: function(iUpload, file) {
            var options = this.options[iUpload];
            var gid = cur.gid || 0;
            if ((cur.module === 'public' || cur.module === 'groups') && options.from === 'post') {
                gid = -cur.oid
            }

            Upload.options[iUpload].uploadOptionsXhr = ajax.post('al_video.php?act=get_upload_params', {
                gid: gid,
                from: options.from
            }, {
                onDone: function(videoParams) {
                    var vars = ajx2q(videoParams.vars);
                    var uploadUrl = videoParams.options.url + (videoParams.options.url.match(/\?/) ? '&' : '?') + vars;

                    extend(Upload.options[iUpload], videoParams.options);
                    extend(Upload.vars[iUpload], videoParams.vars);
                    Upload.uploadUrls[iUpload] = uploadUrl;
                    Upload.check(iUpload);

                    Upload.uploadFile(iUpload, file, uploadUrl, true);
                },
                onFail: function() {
                    Upload.terminateUpload(iUpload, file.name);
                }
            });
        },

        uploadFile: function(iUpload, file, url, urlIsNew) {
            var options = this.options[iUpload];

            if (Upload.isNeedRequestUrl(iUpload) && !urlIsNew) {
                Upload.getUploadOptions(iUpload, file);
                return;
            }

            if (options.chunked && Upload.supportsChunkedUpload() && file.size > 4 * 1024 * 1024) {
                Upload.uploadFileChunked.apply(Upload, arguments);
                return;
            }

            var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;

            var info = Upload.getFileInfo(iUpload, options, file);

            if (options.multi_sequence) {
                this.onUploadStart(info);
            }

            options.uploading = true;

            if (window.FormData) {
                var formData = new FormData();

                if (file instanceof File) {
                    formData.append(options.file_name, file);
                } else { // blob
                    formData.append(options.file_name, file, file.filename.replace(/[&<>"']/g, ''));
                }

                var xhr = new XHR(),
                    fastFail = true;
                xhr.open('POST', url, true);
                xhr.onload = function(e) {
                    extend(info, Upload.getFileInfo(iUpload, options, file)); // can be extended
                    Upload.options[iUpload].filesLoadedSize += file.size;
                    Upload.options[iUpload].filesLoadedCount += 1;
                    Upload.onUploadComplete(info, e.target.responseText);
                    if (Upload.options[iUpload].filesQueue && Upload.options[iUpload].filesQueue.length > 0) {
                        Upload.uploadFile(iUpload, Upload.options[iUpload].filesQueue.pop(), url);
                    } else {
                        Upload.startNextQueue(iUpload);
                        Upload.onUploadCompleteAll(info, e.target.responseText);
                        options.uploading = false;
                    }
                };
                xhr.onerror = function(e) {
                    if (false && !e.target.responseText && fastFail) { // Disabled. Replace it by layer to prevent losing unsaved changes on the page.
                        return nav.go('/login?act=upload_fail', false, {
                            nocur: true,
                            params: {
                                context: 0,
                                name: (file.fileName || file.name || '').replace(/[&<>"']/g, '')
                            }
                        });
                    }
                    extend(info, Upload.getFileInfo(iUpload, options, file));
                    Upload.options[iUpload].filesTotalSize -= file.size;
                    Upload.options[iUpload].filesTotalCount -= 1;
                    Upload.onUploadError(info, e.target.responseText);
                    if (Upload.options[iUpload].filesQueue.length > 0) {
                        Upload.uploadFile(iUpload, Upload.options[iUpload].filesQueue.pop(), url);
                    } else {
                        Upload.startNextQueue(iUpload);
                        Upload.onUploadCompleteAll(info, e.target.responseText);
                        options.uploading = false;
                    }
                };
                xhr.upload.onprogress = function(e) {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        return;
                    }

                    fastFail = false;
                    extend(info, Upload.getFileInfo(iUpload, options, file));
                    if (e.lengthComputable) {
                        if (!options.multi_progress) {
                            Upload.onUploadProgress(iUpload, Math.min(e.loaded + options.filesLoadedSize, options.filesTotalSize), options.filesTotalSize);
                        } else {
                            Upload.onUploadProgress(info, e.loaded, e.total);
                        }
                    }
                };
                xhr.send(formData);
            } else try {
                if (XHR && !XHR.prototype.sendAsBinary && window.ArrayBuffer && window.Uint8Array) {
                    var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
                    if (BlobBuilder) {
                        XHR.prototype.sendAsBinary = function(text) {
                            var data = new ArrayBuffer(text.length);
                            var ui8a = new Uint8Array(data, 0);
                            for (var i = 0; i < text.length; i++) ui8a[i] = (text.charCodeAt(i) & 0xff);
                            var bb = new BlobBuilder();
                            bb.append(data);
                            var blob = bb.getBlob();
                            this.send(blob);
                        }
                    }
                }

                var reader = new FileReader();

                reader.onload = function() {
                    var xhr = new XHR(),
                        fastFail = true;

                    xhr.onload = function(e) {
                        extend(info, Upload.getFileInfo(iUpload, options, file));
                        Upload.options[iUpload].filesLoadedSize += file.size;
                        Upload.options[iUpload].filesLoadedCount += 1;
                        Upload.onUploadComplete(info, e.target.responseText);
                        if (Upload.options[iUpload].filesQueue.length > 0) {
                            Upload.uploadFile(iUpload, Upload.options[iUpload].filesQueue.pop(), url);
                        } else {
                            Upload.startNextQueue(iUpload);
                            Upload.onUploadCompleteAll(info, e.target.responseText);
                        }
                    };
                    xhr.onerror = function(e) {
                        if (false && !e.target.responseText && fastFail) { // Disabled. Replace it by layer to prevent losing unsaved changes on the page.
                            return nav.go('/login?act=upload_fail', false, {
                                nocur: true,
                                params: {
                                    context: 1,
                                    name: (file.fileName || file.name || '').replace(/[&<>"']/g, '')
                                }
                            });
                        }
                        extend(info, Upload.getFileInfo(iUpload, options, file));
                        Upload.options[iUpload].filesTotalSize -= file.size;
                        Upload.options[iUpload].filesTotalCount -= 1;
                        Upload.onUploadError(info, e.target.responseText);
                        if (Upload.options[iUpload].filesQueue.length > 0) {
                            Upload.uploadFile(iUpload, Upload.options[iUpload].filesQueue.pop(), url);
                        } else {
                            Upload.startNextQueue(iUpload);
                            Upload.onUploadCompleteAll(info, e.target.responseText);
                            options.uploading = false;
                        }
                    };
                    xhr.upload.onprogress = function(e) {
                        fastFail = false;
                        extend(info, Upload.getFileInfo(iUpload, options, file));
                        if (e.lengthComputable) {
                            if (!options.multi_progress) {
                                Upload.onUploadProgress(iUpload, Math.min(e.loaded + options.filesLoadedSize, options.filesTotalSize), options.filesTotalSize);
                            } else {
                                Upload.onUploadProgress(info, e.loaded, e.total);
                                options.uploading = false;
                            }
                        }
                    };

                    xhr.open('POST', url, true);
                    var boundary = '---------' + irand(1111111111, 9999999999);
                    xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary=" + boundary);
                    var body = '--' + boundary + "\r\n";
                    body += "Content-Disposition: form-data; name='" + options.file_name + "'; filename='" + file.name.replace(/[&<>"']/g, '') + "'\r\n";
                    body += "Content-Type: application/octet-stream\r\n\r\n";
                    body += reader.result + "\r\n";
                    body += '--' + boundary + '--';

                    xhr.sendAsBinary(body);
                };
                reader.readAsBinaryString(file);
            } catch (e) {
                try {
                    console.error(e);
                } catch (e2) {}
            }
            Upload.options[iUpload].xhr = xhr;
        },

        terminateUpload: function(iUpload, name, el) {
            try {
                var vars = Upload.vars[iUpload],
                    options = Upload.options[iUpload],
                    params = ajx2q(vars),
                    queue = options.filesQueue;
                inQueue = false,
                    info = options.multi_progress ? {
                        ind: iUpload,
                        fileName: name.replace(/[&<>"']/g, '')
                    } : iUpload,
                    ind = name ? iUpload + '_' + name : iUpload;

                for (var j in queue) {
                    if (name == (queue[j].fileName || queue[j].name || '').replace(/[&<>"']/g, '')) {
                        queue.splice(j, 1);
                        inQueue = true;
                        break;
                    }
                }
                if (el && el.tt && el.tt.destroy) el.tt.destroy();
                re('upload' + ind + '_progress_wrap');
                Upload.onUploadComplete(info, '{"error":"ERR_UPLOAD_TERMINATED: upload request was terminated"}');
                if (!inQueue && options.xhr) options.xhr.abort();
                if (!inQueue && options.chunkedUpload) options.chunkedUpload.abort();
                var url = this.uploadUrls[iUpload] + (this.uploadUrls[iUpload].match(/\?/) ? '&' : '?') + params;
                if (!inQueue) {
                    if (queue.length > 0) {
                        Upload.uploadFile(iUpload, queue.pop(), url);
                    } else {
                        Upload.startNextQueue(iUpload);
                        Upload.onUploadCompleteAll(info, '');
                    }
                }
            } catch (e) {
                try {
                    console.error(e);
                } catch (e2) {}
            }
        },

        terminateAllUploads: function() {
            each(this.checked, (iUpload) => {
                iUpload = +iUpload;
                if (!Upload.isSomethingUploading(iUpload)) {
                    return;
                }

                const options = Upload.options[iUpload];
                if (!options) {
                    return;
                }

                let fileName = '';

                if (options.filesQueue && options.filesQueue.length) {
                    options.filesQueue = [];
                }

                if (options.xhr && options.xhr.readyState !== 4 && options.xhr.readyState !== 0) {
                    fileName = options.file_name;
                }

                if (options.chunked && options.chunkedUpload && options.chunkedUpload.activeRequests.length) {
                    fileName = options.chunkedUpload.fileName;
                    this.terminateUpload(iUpload, fileName);
                }

                if (fileName) {
                    this.terminateUpload(iUpload, fileName);
                }
            });
        },

        startNextQueue: function(iUpload) {
            if (cur.multiProgressIndex === undefined) {
                setTimeout(function() {
                    delete cur.fileApiUploadStarted;
                }, 1000);
            }
            if (iUpload != cur.multiProgressIndex) return;
            var options = this.options[iUpload];
            if (options.multi_progress && cur.nextQueues && cur.nextQueues.length) {
                var next = cur.nextQueues[0],
                    queue = Upload.options[next].filesQueue;
                cur.nextQueues.splice(0, 1);
                while (queue.length == 0 && cur.nextQueues.length > 0) {
                    next = cur.nextQueues[0];
                    cur.nextQueues.splice(0, 1);
                    queue = Upload.options[next].filesQueue;
                }
                if (queue.length > 0) {
                    var vars = Upload.vars[next],
                        params = ajx2q(vars);
                    var url = Upload.uploadUrls[next] + (Upload.uploadUrls[next].match(/\?/) ? '&' : '?') + params;
                    Upload.uploadFile(next, queue.pop(), url);
                    cur.multiProgressIndex = next;
                } else {
                    delete cur.multiProgressIndex;
                    setTimeout(function() {
                        delete cur.fileApiUploadStarted;
                    }, 1000);
                }
            } else {
                delete cur.multiProgressIndex;
                setTimeout(function() {
                    delete cur.fileApiUploadStarted;
                }, 1000);
            }
        },

        isFileDrag: function(e) {
            if (!e || e.target && (e.target.tagName == 'IMG' || e.target.tagName == 'A')) return false;
            if (e.dataTransfer.types) {
                for (var i = 0; i < e.dataTransfer.types.length; i++) {
                    if (e.dataTransfer.types[i] == "Files") {
                        return true;
                    }
                }
            } else {
                return true;
            }
            return false;
        },

        dragEnter: function(iUpload, e) {
            if (!cur.uploadDragStarted || cur.uploadDragStarted == 1) {
                cur.uploadDragStarted = Upload.isFileDrag(e) ? 2 : 1;
            }
            if (cur.uploadDragStarted == 1 || !Upload.dropbox[iUpload]) {
                cancelEvent(e);
                return;
            }
            setTimeout(function() {
                clearTimeout(Upload.dragTimer[iUpload]);
                delete Upload.dragTimer[iUpload];
            }, 0);
            if (Upload.options[iUpload].onDragEnter) {
                Upload.options[iUpload].onDragEnter(e);
            }
            show(Upload.dropbox[iUpload]);
            cancelEvent(e);
        },

        dragOut: function(iUpload, e) {
            if (cur.uploadDragStarted == 1 || !Upload.dropbox[iUpload]) {
                cancelEvent(e);
                return;
            }
            if (Upload.dragTimer[iUpload]) {
                clearTimeout(Upload.dragTimer[iUpload]);
                delete Upload.dragTimer[iUpload];
            }
            Upload.dragTimer[iUpload] = setTimeout(function() {
                if (!Upload.options[iUpload].visibleDropbox) {
                    hide(Upload.dropbox[iUpload]);
                }
                if (Upload.options[iUpload].onDragOut) {
                    Upload.options[iUpload].onDragOut();
                }
                removeClass(Upload.dropbox[iUpload], 'dropbox_over');
            }, 100);
            cancelEvent(e);
        },

        dragOver: function(iUpload, e) {
            if (cur.uploadDragStarted == 1 || !Upload.dropbox[iUpload]) {
                cancelEvent(e);
                return;
            }
            var inside = Upload.insideDropbox(iUpload, e);
            if (e.dataTransfer && e.dataTransfer.dropEffect !== 'copy') {
                e.dataTransfer.dropEffect = inside ? 'copy' : 'none';
            }
            toggleClass(Upload.dropbox[iUpload], 'dropbox_over', inside);
            cancelEvent(e);
        },

        drop: function(e) {
            each(Upload.dropbox, function(iUpload, dropbox) {
                if (!dropbox) {
                    return;
                }
                if (Upload.insideDropbox(iUpload, e)) {
                    Upload.onFileApiSend(iUpload, e.dataTransfer.files);
                }
                if (!Upload.options[iUpload].visibleDropbox) {
                    hide(dropbox);
                }
                if (Upload.options[iUpload].onDrop) {
                    Upload.options[iUpload].onDrop();
                }
                removeClass(dropbox, 'dropbox_over');
            });
            delete cur.uploadDragStarted;
            cancelEvent(e);
            return false;
        },

        insideDropbox: function(iUpload, e) {
            var el = e.target;
            while (el.parentNode) {
                if (el == Upload.dropbox[iUpload]) return true;
                el = el.parentNode;
            }
            return false;
        },

        isSomethingUploading: function(iUpload) {
            var options = Upload.options[iUpload];

            if (!options) {
                return false;
            }

            if (options.filesQueue && options.filesQueue.length) {
                return true;
            }

            if (options.xhr && options.xhr.readyState !== 4 && options.xhr.readyState !== 0) {
                return true;
            }

            if (options.uploadOptionsXhr && options.uploadOptionsXhr.readyState !== 4 && options.uploadOptionsXhr.readyState !== 0) {
                return true;
            }

            if (options.chunked && options.chunkedUpload && options.chunkedUpload.activeRequests.length) {
                return true;
            }

            return false;
        },

        flashCallbacks: function() {
            return {
                'onUploadStart': Upload.onUploadStart,
                'onUploadProgress': Upload.onUploadProgress,
                'onUploadSuccess': Upload.onUploadComplete,
                'onUploadComplete': Upload.onUploadCompleteAll,
                'onUploadError': Upload.onUploadError,
                'onDebug': Upload.onDebug,
                'onMouseDown': Upload.buttonDown,
                'onMouseUp': Upload.buttonUp,
                'onMouseOver': Upload.buttonOver,
                'onMouseOut': Upload.buttonOut,
                'onSelectClick': Upload.onSelectClick
            }
        },

        _eof: 1
    };

}

function Fletcher32() {
    // Optimized algorithm taken from https://en.wikipedia.org/wiki/Fletcher%27s_checksum#Optimizations
    var _sum1 = 0xffff;
    var _sum2 = 0xffff;

    return {
        append: append,
        result: result
    };

    function append(data) {
        // data should be an array of 16-bit numbers
        var words = data.length;
        var dataIndex = 0;
        while (words) {
            var tlen = words > 359 ? 359 : words;
            words -= tlen;
            do {
                _sum2 += _sum1 += data[dataIndex++];
            } while (--tlen);

            _sum1 = ((_sum1 & 0xffff) >>> 0) + (_sum1 >>> 16);
            _sum2 = ((_sum2 & 0xffff) >>> 0) + (_sum2 >>> 16);
        }
    }

    function result() {
        _sum1 = ((_sum1 & 0xffff) >>> 0) + (_sum1 >>> 16);
        _sum2 = ((_sum2 & 0xffff) >>> 0) + (_sum2 >>> 16);
        return ((_sum2 << 16) >>> 0 | _sum1) >>> 0;
    }
}

try {
    stManager.done('upload.js');
} catch (e) {}