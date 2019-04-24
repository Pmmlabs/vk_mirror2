var WkView = {

    init: function() {
        if (window.wkLayer) {
            return;
        }
        window.wkLayer = ce('div', {
            id: 'wk_layer'
        });

        window.wkLayerWrap = ce('div', {
            id: 'wk_layer_wrap',
            className: 'scroll_fix_wrap fixed layer_wrap js-mediator-container'
        });


        wkLayerWrap.appendChild(window.wkLayer);

        bodyNode.appendChild(wkLayerWrap);

        window.LazyLoad && LazyLoad.watch(wkLayerWrap);

        window.wkLayer.style.width = (lastWindowWidth - sbWidth() - 2) + 'px';
    },

    showLayer: function() {
        //  if (!wkcur.previousLayer) {
        //    wkcur.previousLayer = isVisible(layerWrap) || (isVisible(ge('mv_layer_wrap')) && !mvcur.minimized);
        //  }
        //  layers.fullhide && layers.fullhide(true);
        layerQueue.hide();

        layers.wrapshow(wkLayerWrap, 0.8);
        layers.fullhide = WkView.hide;
        WkView.onScroll();
        wkcur.showT = setTimeout(function() {
            layers.wrapshow(wkLayerWrap, 0.8);
            layers.fullhide = WkView.hide;
        }, 0);
        onBodyResize();
    },
    restoreLayer: function(opts) {
        WkView.showLayer();
        if (wkcur.root) {
            if (opts.myLoc) nav.setLoc(opts.myLoc);
        } else {
            WkView.setLocation();
        }
        if (opts.prevLoc) wkcur.prevLoc = opts.prevLoc;
        WkView.updateSize();
    },

    wikiClick: function(obj, ev, opts) {
        if (checkEvent(ev)) {
            return true
        }
        opts = opts || {};
        var el = ev.target;
        while (el && el.tagName != 'A') {
            el = el.parentNode;
        }
        if (el && el.tagName == 'A') {
            var href = el.href;
            var m = href.match(/^\/(page[^?]*)(\?.*)?$/);
            if (m) {
                var path = m[1];
                var query = (m[4]) ? q2ajx(m[4].substr(1)) : {};
            } else {
                var m = href.match(/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)\/([^?]*)(\?.*)?$/i);
                if (!m || !m[3]) {
                    return true;
                }

                var path = m[3].split('/');
                var query = (m[4]) ? q2ajx(m[4].substr(1)) : {};
            }

            var params = {};
            switch (path[0]) {
                case 'pages':
                    params['oid'] = query.oid || query.o;
                    params['id'] = query['id'];
                    params['p'] = query['p'];
                    break;
                case 'ru':
                case 'en':
                    params['p'] = path[1];
                    params['global'] = path[0];
                    break;
                default:
                    if (path[0].match(/^page-?\d+_\d+$/)) {
                        var query = path[0].substr(4).split('_');
                        params['oid'] = query[0];
                        params['id'] = query[1];
                        params = extend(opts, params);
                    } else if (path[0].match(/^note\d+_\d+$/)) {
                        var query = path[0].substr(4).split('_');
                        params['w'] = path[0];
                    }
                    break;
            }
            if (params.w || (params.oid && (params.id || params.p))) {
                showWiki(params);
                return cancelEvent(ev);
            }
        }
    },

    edit: function() {
        if (!wkcur.canEdit) {
            return true;
        }

        if (wkcur.type == 'wall') {
            if (wkcur.edit) {
                Wall.cancelEdit();
            } else {
                Wall.editPost(ge('wpe_edit' + wkcur.post), wkcur.post, {
                    from: 'wkview'
                });
            }
            return true;
        }

        if (wkcur.edit) {
            if (wkcur.note) {
                var params = {
                    w: 'note' + wkcur.oid + '_' + wkcur.nid
                };
            } else {
                var params = {
                    oid: wkcur.oid,
                    id: wkcur.pid,
                    p: wkcur.p
                };
            }
            window.wkcur = false;
            showWiki(params, false, false, {
                noloader: true
            });
            return true;
        }
        wkcur.edit = true;
        var params = {
            act: 'edit',
            oid: wkcur.oid,
            load: 1,
            section: 'edit'
        };
        if (wkcur.note) {
            params['nid'] = wkcur.nid;
            params['note'] = 1;
        } else {
            params['id'] = wkcur.pid;
        }
        if (wkcur.from) {
            params['from'] = wkcur.from;
        }
        ajax.post('wkview.php', params, {
            stat: ['pages.js', 'wk_editor.js', 'wk_editor.css'],
            onDone: function(content, js, info, options) {
                wkcur.wkContent.innerHTML = content;
                hide(wkcur.wkRight);
                addClass(wkcur.wkBox, 'wk_view_no_background');
                eval(js);
                addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
                addEvent(window, 'resize', WkView.onResize);
                WkView.onScroll();
                WkView.updateSize();
            }
        });
    },

    onScroll: function(ev, resize) {
        if (wkcur.lSTL) {
            WkView.stlOnScroll(resize);
        }
        if (!resize) {
            WkView.updateSize(true);
        }

        switch (wkcur.type) {
            case 'wall':
                return WkView.wallUpdateRepliesOnScroll(resize);

            case 'likes':
                return WkView.likesOnScroll(resize);

            case 'history':
                return WkView.historyOnScroll(resize);

            case 'market':
                if (window.Market) {
                    return Market.updateCommentsOnScroll(resize);
                }
                break;
            case 'story':
                window.Stories && Stories.onResize();
                break;
        }
        if (isFunction(WkView.customOnScroll)) {
            if (WkView.customOnScroll(resize)) {
                return;
            }
        }

        var buttons = ge('wke_buttons_panel'),
            buttonsCont = ge('wke_buttons_cont');
        if (!buttons) return;

        var py = getXY(buttonsCont, true)[1];
        if (!wkcur.bottomSize) {
            wkcur.bottomSize = getSize(buttons);
        }

        var ph = wkcur.bottomSize[1],
            wndHeight = window.innerHeight || document.documentElement.clientHeight;

        if (resize && !wkcur.fixedBottom && wndHeight - ph < py + 20) {
            wkLayerWrap.scrollTop += py + 20 - (wndHeight - ph);
        } else if (wndHeight - ph < py) {
            if (!wkcur.fixedBottom || resize) {
                wkcur.fixedBottom = true;
                var buttonsSize = getSize(buttonsCont);
                addClass(wkcur.wkContent, 'wke_bottom_fixed');
                setStyle(buttons, {
                    width: buttonsSize[0],
                    height: buttonsSize[1]
                });
                setStyle(buttonsCont, {
                    paddingTop: buttonsSize[1]
                });
            }
        } else {
            if (wkcur.fixedBottom || resize) {
                wkcur.fixedBottom = false;
                removeClass(wkcur.wkContent, 'wke_bottom_fixed');
                setStyle(buttons, {
                    width: null,
                    height: null
                });
                setStyle(buttonsCont, {
                    paddingTop: 0
                });
            }
        }

        var controls = ge('wke_controls'),
            controlsCont = ge('wke_controls_cont');
        if (controlsCont) {
            var pos = getXY(controlsCont, true);
            if (pos[1] < 0) {
                if (!wkcur.fixedTop) {
                    wkcur.fixedTop = true;
                    var controlsSize = getSize(controlsCont);
                    addClass(wkcur.wkContent, 'wke_top_fixed');
                    setStyle(controls, {
                        width: controlsSize[0],
                        height: controlsSize[1]
                    });
                    setStyle(controlsCont, {
                        paddingTop: controlsSize[1]
                    });
                }
            } else {
                if (wkcur.fixedTop) {
                    wkcur.fixedTop = false;
                    removeClass(wkcur.wkContent, 'wke_top_fixed');
                    setStyle(controls, {
                        width: null,
                        height: null
                    });
                    setStyle(controlsCont, {
                        paddingTop: 0
                    });
                }
            }
        }
    },

    saveInfo: function(autosave) {
        var params = {
            page: wkcur.p,
            hash: wkcur.hash
        }

        params['Body'] = wkcur.editor.val();
        if (params['Body'] === false) {
            return false;
        }

        if (wkcur.note) {
            params = extend(params, {
                act: 'save',
                oid: wkcur.oid,
                nid: wkcur.nid,
                wysiwyg: 1,
                note: wkcur.note
            });
        } else {
            params = extend(params, {
                act: 'save',
                oid: wkcur.oid,
                id: wkcur.pid
            });
        }
        if (wkcur.pageTitle) {
            params['title'] = val(wkcur.pageTitle);
            /*if (!params['title']) {
              notaBene(wkcur.pageTitle);
              return false;
            }*/
        }
        if (wkcur.type == 'page_new') {
            params.page_new = 1;
        }
        if (wkcur.from) {
            params.from = wkcur.from;
        }
        if (autosave && (wkcur.lockAutoSave || wkcur.note && curBox())) {
            return false;
        }
        wkcur.lockAutoSave = true;
        ajax.post(wkcur.note ? 'wkview.php' : 'al_pages.php', params, {
            onDone: function(text, data) {
                wkcur.lockAutoSave = false;
                wkcur.editor.changed = false;
                if (!autosave) {
                    var saveEl = ge('pages_save_info_wysiwyg');
                    if (saveEl) {
                        saveEl.innerHTML = text;
                        show(saveEl);
                    }
                }
                if (wkcur.from == 'market' && data) {
                    ge('group_edit_market_wiki').innerHTML = data.html;
                    eval(data.js);
                } else if (data) {
                    if (data.nid) {
                        wkcur.nid = data.nid;
                    }
                    if (data.raw) {
                        wkcur.wkRaw = data.raw;
                    }
                    if (data.created && cur.chooseMedia) {
                        nav.setLoc(extend(nav.objLoc, {
                            w: 'note' + data.raw
                        }));
                        if (!autosave) {
                            WkView.hide(false, true);
                        }
                        cur.pbNoteAdded = data;
                        cur.chooseMedia('note', data.raw, data);
                        return true;
                    } else {
                        var title = ge('share_note_title' + data['raw']);
                        if (title && !autosave) {
                            title.innerHTML = data['title'];
                        }
                        if (wkcur.note && wkcur.toStatus && !autosave) {
                            WkView.hide(false, true);
                            if (wkcur.reloadOnSave) {
                                boxRefreshCoords(boxLoader);
                                show(boxLoader);
                                show(boxLayerWrap);
                                nav.reload({
                                    onDone: function() {
                                        hide(boxLoader);
                                        hide(boxLayerWrap);
                                    }
                                });
                            }
                            return true;
                        }
                    }
                }
                if (autosave) return true;
                setTimeout(function() {
                    saveEl && fadeOut(saveEl, 200);
                }, 1500);
            },
            showProgress: function() {
                !autosave && lockButton(ge('wk_layer_save'));
            },
            hideProgress: function() {
                !autosave && unlockButton(ge('wk_layer_save'));
            },
            onFail: WkView.showError
        })
    },

    initWkBox: function(title, html, options, script) {
        if (curBox() && curBox().type && curBox().type == options.type) {
            curBox().setOptions({
                onHide: false
            });
            curBox().hide();
        }
        var box = showFastBox(extend({
            title: title
        }, options), html);
        if (options.wkRaw) {
            box.wkRaw = options.wkRaw;
        }
        if (options.type) {
            box.type = options.type;
        }
        if (options.commonClass) {
            addClass(box.bodyNode, options.commonClass);
        }
        if (script) {
            eval(script);
        }

        box.setOptions({
            onHide: function(noLoc) {
                if (!noLoc && nav.objLoc.w) {
                    nav.change({
                        'w': false
                    }, undefined, {
                        asBox: true
                    });
                }
            },
            onShow: function() {
                if (box.wkRaw) {
                    nav.objLoc.w = box.wkRaw;
                    nav.setLoc(nav.objLoc);
                }
            }
        });

        var nl = extend(nav.objLoc, {
            'w': options.wkRaw
        });
        delete(nl.z);
        if (nav.strLoc != nav.toStr(nl)) {
            nav.setLoc(nl);
        }
        return box;
    },

    evalScripts: function(node) {
        if (node.tagName === 'SCRIPT') {
            node.parentNode.replaceChild(this.cloneNode(node), node);
        } else {
            var i = 0;
            var children = node.childNodes;
            while (i < children.length) {
                this.evalScripts(children[i++]);
            }
        }
    },

    cloneNode: function(node) {
        var new_node = ce(node.tagName.toLowerCase());
        new_node.text = node.innerHTML;
        for (var i = node.attributes.length - 1; i >= 0; i--) {
            new_node.setAttribute(node.attributes[i].name, node.attributes[i].value);
        }
        return new_node;
    },

    show: function(title, html, options, script, ev) {
        if (options.asBox) {
            this.initWkBox(title, html, options, script);
            return true;
        }

        if (!window.wkcur) {
            this.init();
        } else {
            if (wkcur.shown && !isVisible(wkLayerWrap)) {
                WkView.hide(true, true);
            }
            each(wkcur._hide || [], function(k, hideCallback) {
                if (isFunction(hideCallback)) hideCallback();
            });
        }
        var hlen = (window.wkcur && wkcur.historyLen) ? wkcur.historyLen : 0;
        if (!window.wkcur || !wkcur.doBack && !options.fromlist) {
            hlen += 1;
        }

        var toQueue = options.queue;
        if (toQueue) {
            layerQueue.push();
            options.queue = false;
        }
        if ((window.wkcur || {}).shown && wkcur.root) {
            nav.setLoc(wkcur.prevLoc);
        }

        window.wkcur = {
            historyLen: hlen,
            _hide: [],
            _show: []
        };

        if (browser.iphone || browser.ipad) {
            cur.wkStartScroll = scrollGetY();
        }

        if (options.edit) {
            cur._editMode = function() {
                return true;
            }
            if (!window.WkEditor) {
                stManager.add(['wk_editor.js', 'wk_editor.css'], WkView.show.pbind(title, html, options, script, ev));
                return false;
            }
        }

        cur.cancelTooltip = true;
        if (window.tooltips) {
            tooltips.hideAll();
        }

        if (!options.skipBoxesHide) {
            boxQueue.hideAll();
        }
        if (!isVisible(wkLayerWrap)) {
            otherList = true;
            addEvent(window, 'resize', WkView.onResize);
            addEvent(wkLayerWrap, 'click', WkView.onClick);
            WkView.showLayer();
        }

        wkcur.noLocChange = 0; // do return location
        wkcur.noHistory = options.noLocChange;
        wkcur.isArchived = options.isArchived;
        wkcur.hideTitle = options.hide_title ? 1 : 0;
        wkcur.hideCloseButton = options.hideCloseButton ? 1 : 0;

        wkcur.shown = true;

        if (wkcur.edit) {
            wkcur.edit = false;
        }
        extend(wkcur, options);

        if (wkcur.root) {
            cur.nav.push(function(ch, old, nw, opts) {
                nw = nav.toStr(nw);
                if (nw == wkcur.prevLoc) {
                    WkView.hide(true);
                    return false;
                }
            });
            if (!options.noLocChange && options.myLoc) nav.setLoc(options.myLoc);
        } else {
            WkView.setLocation(options.noLocChange, toQueue);
            if (options.prevLoc) wkcur.prevLoc = options.prevLoc;
        }

        if (ev && ev.pageX && ev.pageY) {
            extend(wkcur, {
                oldX: ev.pageX,
                oldY: ev.pageY,
                oldT: vkNow()
            });
        }

        addClass(wkLayerWrap, 'wk_dark');
        addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
        addClass(layerBG, 'wk_dark');

        var content = html,
            hideLeft = wkcur.historyLen > 1 ? '' : 'display: none;',
            hideCloseBtn = wkcur.hideCloseButton ? 'display: none;' : '';
        if (options.type == 'wall') {
            addEvent(window, 'resize', WkView.onResize);
            WkView.wallBeforeInitPost(options);
        } else if (options.edit) {
            addEvent(window, 'resize', WkView.onResize);
        } else {
            if (options) {
                content = '<div class="wk_text wk_wiki_content' + (options.className ? ' ' + options.className : '') + '" onclick="return WkView.wikiClick(this, event);">' + content + '</div>';
            }
        }

        if (wkcur.wkCont) {
            wkcur.wkContent.innerHTML = content;
        } else {
            wkLayer.innerHTML = '<div class="wk_cont">\
  <div id="wk_box" onclick="wkcur.wkClicked = true;">\
    <div id="wk_loader"></div>\
    <a id="wk_close_link" href="javascript: return false;" class="fl_r wk_close_link" onclick="return WkView.hide(false, true, event);">\
      ' + getLang('global_close') + '\
    </a>\
    <div id="wk_summary" class="fl_l"><span class="summary" id="wk_layer_title">' + title + '</span></div>\
    <div id="wk_content" tabindex="0">' + content + '</div>\
    <div class="clear"></div>\
  </div>\
  <div id="wk_dots" class="wk_dots"></div>\
  </div>\
<div id="wk_left_wrap"><div id="wk_left" style="' + hideLeft + '" class="wk_left no_select"></div></div>\
<div class="wk_left_nav no_select" id="wk_left_nav" style="' + hideLeft + '" ' + 'onmousedown="wkcur.wkClicked = true; WkView.back();" onselectstart="return cancelEvent(event);"></div>\
<div class="wk_right_nav no_select" id="wk_right_nav" ' + 'onmousedown="if (!wkcur.noClickHide) { wkcur.wkClicked = true; WkView.hide(); }"><div id="wk_right" class="wk_close no_select" style="' + hideCloseBtn + '"><div class="wk_close_inner"></div></div></div>\
<div id="wk_left_arrow_bg" class="wk_arrow_bg no_select" onclick="return WkView.navigate(this, event, -1);" onmouseover="WkView.preloadArrow(false)"><div class="wk_arrow_bg_inner"></div><div id="wk_left_arrow" class="wk_arrow no_select"></div></div>\
<div id="wk_right_arrow_bg" class="wk_arrow_bg no_select" onclick="return WkView.navigate(this, event, 1);" onmouseover="WkView.preloadArrow(true)"><div class="wk_arrow_bg_inner"></div><div id="wk_right_arrow" class="wk_arrow no_select"></div></div>';

            if (options.nocross) {
                re(geByClass1('wk_close_inner', wkLayer));
            }

            extend(wkcur, {
                wkCont: wkLayer.firstChild,
                wkBox: ge('wk_box'),

                mvLoader: ge('wk_loader'),
                wkContent: ge('wk_content'),

                wkLeftNav: ge('wk_left_nav'),
                wkRightNav: ge('wk_right_nav'),
                wkLeft: ge('wk_left'),
                wkLeftWrap: ge('wk_left_wrap'),
                wkRight: ge('wk_right'),
                wkLeftArrow: ge('wk_left_arrow'),
                wkRightArrow: ge('wk_right_arrow'),
                wkLeftArrowBg: ge('wk_left_arrow_bg'),
                wkRightArrowBg: ge('wk_right_arrow_bg'),
                wkDots: ge('wk_dots'),
            });
            if (options.wkRaw.substr(0, 4) == 'away') {
                this.evalScripts(wkLayer);
                setTimeout(function() {
                    if (window._mediator) {
                        window._mediator.start({
                            url: location.pathname + location.search
                        });
                    }
                }, 1500);
            }
        }
        toggle('wk_summary', title);

        if (options.withDots && options.wkRawList.length) {
            var dotsCount = options.wkRawList.length;
            for (var i = 0; i < dotsCount; i++) {
                var iRaw = options.wkRawList[i];
                var dotEl = se('<span class="wk_dots__dot" onclick="WkView.openRaw(event, \'' + iRaw + '\')"></span>');
                if (options.wkRaw == iRaw) {
                    addClass(dotEl, 'wk_dots__dot_active');
                }
                wkcur.wkDots.appendChild(dotEl);
            }
        }

        if (wkcur.commonClass) {
            addClass(wkcur.wkBox, wkcur.commonClass);
        } else {
            wkcur.wkBox.className = '';
        }

        if (wkcur.noCloseIcon) {
            hide(wkcur.wkRight);
        }

        if (wkcur.oid && wkcur.pid) {
            WkView.initSTL();
            if (!options.edit) {
                addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
                addEvent(window, 'resize', WkView.onResize);
            }
        }
        if (options.overflow) {
            addClass(wkcur.wkBox, 'wk_overflow_hidden');
        } else {
            removeClass(wkcur.wkBox, 'wk_overflow_hidden');
        }

        if (script) {
            eval(script);
        }
        WkView.updateSize();

        removeEvent(document, 'keydown', WkView.onKeyDown);
        addEvent(document, 'keydown', WkView.onKeyDown);

        options.onLoaded && options.onLoaded();

        shortCurrency();

        WkView.updateArrows();
        wkcur.wkContent.focus();
        wkLayerWrap.scrollTop = 0;

        if (options.type == 'wall') {
            WkView.wallAfterInitPost();
        } else if (options.toScroll) {
            wkLayerWrap.scrollTop = options.toScroll;
            wkcur.toScroll = 0;
        } else {
            wkLayerWrap.scrollTop = 0;
        }

        if (options.fromlist) {
            WkView.preloadArrow(options.fromlist == 1);
        }
        getAudioPlayer().updateCurrentPlaying();
        window.updateAriaElements && updateAriaElements();

        var postLargeGif = domByClass(wkLayer, 'page_gif_large');
        if (postLargeGif) {
            Page.showGif(domFC(postLargeGif));
        }

        window.LazyLoad && LazyLoad.scanDelayed();

        return false;
    },

    hide: function(noLoc, force, ev) {
        if (!window.wkcur || !force && !wkcur.shown) return;
        var doUpdAds = !wkcur.wkRaw.match(/^recom_apps\d+$/) && !wkcur.wkRaw.match(/^app\d+$/);

        if (wkcur.type == 'story' && !force && window.Stories && !noLoc) {
            return Stories.hideLayer();
        }

        clearTimeout(wkcur.autosaveTimeout);
        clearTimeout(wkcur.showT);

        /*if (!wkcur.noHistory && !noLoc) {
          wkcur.noHistory = 1;
          wkcur.forceHistoryHide = force;
          __adsUpdate('lazy');
          return history.go(-1);
        }
        if (wkcur.forceHistoryHide) {
          force = wkcur.forceHistoryHide;
          wkcur.forceHistoryHide = false;
        }*/

        if (!force && wkcur.edit && wkcur.editor) {
            if (wkcur.editor.changed) {
                if (wkcur.note && wkcur.toStatus && !noLoc) {
                    WkView.saveInfo();
                    return;
                } else {
                    var box = showFastBox(wkcur.lang['pages_close_title'], wkcur.lang['pages_close_text'], getLang('box_yes'), function() {
                        box.hide();
                        WkView.hide(noLoc, true);
                    }, getLang('box_no'))
                    return;
                }
            }
        }

        each(wkcur._hide || [], function(k, hideCallback) {
            if (isFunction(hideCallback)) hideCallback();
        });

        var donthide = false;
        if (isVisible(wkLayerWrap)) {
            setTimeout(layerQueue.pop, 0);
            donthide = layerQueue.count() && layerQueue._layers[layerQueue._layers.length - 1][0] == 'wiki' && !layerQueue._bl;
            if (!donthide) {
                layers.wraphide(wkLayerWrap);
                layers.fullhide = false;
            }
        }

        if (window.tooltips) {
            tooltips.destroy(this);
        }

        removeEvent(document, 'keydown', WkView.onKeyDown);

        removeClass(wkcur.wkContent, 'wke_top_fixed');
        wkcur.fixedTop = wkcur.fixedBottom = false;

        if (!donthide) {
            removeClass(wkLayerWrap, 'wk_dark');
            removeClass(layerBG, 'wk_dark');

            wkcur.shown = false;
            removeEvent(wkLayerWrap, 'click', WkView.onClick);
            removeEvent(wkLayerWrap, 'scroll', WkView.onScroll);
            wkcur.wkContent.innerHTML = '';
        }
        wkcur.wkClicked = false;
        wkcur.hideTitle = false;

        wkcur.changeCanvasSize = false;

        if (wkcur.onHide && isFunction(wkcur.onHide)) {
            wkcur.onHide();
        }

        cur._editMode = false;

        if (wkcur.root && noLoc !== true) {
            WkView.backLocation();
        } else if (!wkcur.noLocChange && noLoc !== true) {
            if (noLoc === 2) {
                nav.setLoc(hab.getLoc());
            } else {
                WkView.backLocation();
            }
            if (doUpdAds) {
                __adsUpdate('lazy');
            }
        } else if (doUpdAds) {
            __adsUpdate();
        }

        if (browser.iphone || browser.ipad) {
            var scroll = scrollGetY();
            if (Math.abs(scroll - cur.wkStartScroll) > 500) {
                scrollToY(cur.wkStartScroll, 0);
            }
        }
        delete wkcur.historyLen;

        getAudioPlayer().updateCurrentPlaying();

        if (cur.gifAutoplayScrollHandler) {
            cur.gifAutoplayScrollHandler();
        }

        if (window._mediator) {
            if (window._mediator.isActive()) {
                window._mediator.stop();
            }
        }

        return false;
    },

    cmp: function(id1, id2) {
        var l1 = id1.length,
            l2 = id2.length;
        if (l1 < l2) {
            return -1;
        } else if (l1 > l2) {
            return 1;
        } else if (id1 < id2) {
            return -1;
        } else if (id1 > id2) {
            return 1;
        }
        return 0;
    },


    onClick: function(e) {
        if (wkcur.wkClicked || wkcur.noClickHide || e && cur.__mdEvent && e.target != cur.__mdEvent.target) {
            wkcur.wkClicked = false;
            return;
        }
        var dx = Math.abs(e.pageX - intval(wkcur.oldX));
        var dy = Math.abs(e.pageY - intval(wkcur.oldY));
        if (dx > 3 || dy > 3) {
            if (vkNow() - intval(wkcur.oldT) > 300) {
                WkView.hide();
            }
        }
    },

    onKeyDown: function(e) {
        e = e || window.event;
        if (e.returnValue === false) return false;
        if (!cur.pvShown && e.keyCode == KEY.ESC) {
            WkView.hide();
            return cancelEvent(e);
        }
        if (!cur.pvShown && (!wkcur.edit && (e.keyCode == KEY.LEFT || e.keyCode == KEY.RIGHT))) {
            var target = e && e.target || e.srcElement;
            if (target && (target.tagName == 'TEXTAREA' || target.tagName == 'INPUT' || target.tagName == 'DIV' && target.contentEditable && target.contentEditable != 'inherit')) {
                return true;
            }
            WkView.navigate(null, e, e.keyCode == KEY.RIGHT ? 1 : -1);
            return cancelEvent(e);
        }
        if (WkView.canEdit) {
            if (e.keyCode == 83 && (e.ctrlKey || e.metaKey && browser.mac)) {
                WkView.saveInfo();
                return cancelEvent(e);
            } else if (e.keyCode == 10 || e.keyCode == 13 && (e.ctrlKey || e.metaKey && browser.mac)) {
                WkView.saveInfo();
            }
            if (cur.updTimeout) return;
            cur.updTimeout = setTimeout(function() {
                WkView.onResize()
                cur.updTimeout = false;
            }, 200);
        }
    },

    onResize: function() {
        var dwidth = lastWindowWidth,
            dheight = lastWindowHeight,
            sbw = sbWidth();

        var w = dwidth - sbw - 2 - 120 - 34 - 50,
            h = dheight - 31 - 28 - 72;
        if (w > 1280) { // less than full hd - not size > 2
            w = 1280;
        } else if (w > 807 && w < 907) { // 1024x768 - not size > 1
            w = 807;
        } else if (w < 604) {
            w = 604;
        }
        if (h < 453) {
            h = 453;
        }
        wkcur.mvWidth = w;
        wkcur.mvHeight = h;

        var sizeChanged = false,
            oldverybig = wkcur.mvVeryBig;
        wkcur.mvVeryBig = (w > 1280) ? 2 : (w > 807 ? 1 : false);
        sizeChanged = (oldverybig != wkcur.mvVeryBig);
        WkView.onScroll(false, true);

        WkView.updateHeight();
        WkView.updateArrows();
        setTimeout(WkView.updateArrows, 0);
    },


    updateArrows: function() {
        var sbw = sbWidth() + 2;
        if (wkcur.wkLeft) {
            wkcur.wkLeft.style.left = '20px';
        }
        var size = getSize(wkcur.wkBox),
            width = size[0],
            height = size[1],
            arrowBgW = getSize(wkcur.wkLeftArrowBg)[0],
            arrowBgW0 = arrowBgW - 10,
            arrowW = getSize(wkcur.wkLeftArrow)[0] || getSize(wkcur.wkRightArrow)[0];
        wkcur.wkLeftNav.style.width = Math.floor((lastWindowWidth - sbw - width) / 2) + 'px';
        wkcur.wkRightNav.style.left = Math.floor((lastWindowWidth - sbw + width) / 2) + 'px';
        wkcur.wkRightNav.style.width = Math.floor((lastWindowWidth - sbw - width) / 2) + 'px';
        if (wkcur.wkClose) {
            wkcur.wkClose.style.left = (lastWindowWidth - sbw - 37) + 'px';
        }
        wkcur.wkRight.style.left = Math.floor((lastWindowWidth - sbw + width) / 2) + 'px';

        var arrowActions = WkView.getNextWkRaws(),
            intro = (wkcur.wkRaw == 'intro');
        if (arrowActions[0] || arrowActions[1] || intro) {
            var windowHeight = browser.mobile ? window.innerHeight : lastWindowHeight;
            var arrowTop = (wkcur.wkCont.offsetHeight < windowHeight ? wkcur.wkCont.offsetTop + 10 + (height / 2) : windowHeight / 2) - 8;
            if (arrowActions[0] || intro && wkcur.introControlsCur) {
                show(wkcur.wkLeftArrow);
                show(wkcur.wkLeftArrowBg);

                setStyle(wkcur.wkLeftArrowBg, {
                    left: (lastWindowWidth - sbw - width) / 2 - arrowBgW
                });
                setStyle(wkcur.wkLeftArrow, {
                    left: (lastWindowWidth - sbw - width) / 2 - arrowBgW0 + (arrowBgW0 - arrowW) / 2,
                    top: arrowTop
                });
            } else {
                hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg);
            }
            setStyle(wkcur.wkRight, {
                paddingBottom: (arrowTop - getXY(wkcur.wkRight, true)[1] - 24) / 2
            });

            if (arrowActions[1] || intro && wkcur.introControls && wkcur.introControlsCur < wkcur.introControls.length - 1) {
                show(wkcur.wkRightArrow);
                show(wkcur.wkRightArrowBg);
                setStyle(wkcur.wkRightArrowBg, {
                    left: (lastWindowWidth - sbw - width) / 2 + width
                });
                setStyle(wkcur.wkRightArrow, {
                    left: (lastWindowWidth - sbw - width) / 2 + width + (arrowBgW0 - arrowW) / 2,
                    top: arrowTop
                });
            } else {
                hide(wkcur.wkRightArrow, wkcur.wkRightArrowBg);
            }
        } else {
            hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg, wkcur.wkRightArrow, wkcur.wkRightArrowBg);
        }
    },
    getNextWkRaws: function() {
        var wkRawPrevious = false,
            wkRawNext = false;

        if (isArray(wkcur.wkRawList) && wkcur.historyLen <= 1 && !wkcur.wkRawLoading) {
            var len = wkcur.wkRawList.length,
                pos = indexOf(wkcur.wkRawList, wkcur.wkRaw);
            if (pos > 0) {
                wkRawPrevious = wkcur.wkRawList[pos - 1];
            }
            if (pos >= 0 && pos < len - 1) {
                wkRawNext = wkcur.wkRawList[pos + 1];
            }

            if (wkcur.wkRawListLoop && len > 1) {
                wkRawPrevious = !wkRawPrevious ? wkcur.wkRawList[len - 1] : wkRawPrevious;
                wkRawNext = !wkRawNext ? wkcur.wkRawList[0] : wkRawNext;
            }
        }
        return [wkRawPrevious, wkRawNext];
    },
    recacheRaw: function(raw) {
        if (cur.wkviewNavRecache && raw && cur.wkviewNavRecache[raw]) {
            delete cur.wkviewNavRecache[raw];
            return true;
        }
        return false;
    },
    openRaw: function(ev, raw) {
        cancelEvent(ev);

        showWiki(extend({
            from: wkcur.from,
        }, {
            w: raw,
        }), false, false, {
            fromlist: 1,
            noloader: true,
            preload: {
                cache: wkcur.navNoCache || WkView.recacheRaw(raw) ? 0 : 1,
            },
        });
    },
    navigate: function(el, event, delta) {
        if (wkcur.wkRaw == 'intro') {
            WkView.introNext(delta);
            cancelEvent(event);
            return false;
        }
        var actions = WkView.getNextWkRaws(),
            options = {};
        if (wkcur.from) {
            options.from = wkcur.from;
        }
        if (delta > 0 && actions[1]) {
            wkcur.wkRawLoading = true;
            addClass(wkcur.wkRightArrow, 'wk_arrow_progress');
            showProgress(wkcur.wkRightArrow);
            showWiki(extend(options, {
                w: actions[1]
            }), false, false, {
                fromlist: 1,
                noloader: true,
                preload: {
                    cache: wkcur.navNoCache || WkView.recacheRaw(actions[1]) ? 0 : 1
                }
            });
            cancelEvent(event);
        }
        if (delta < 0 && actions[0]) {
            wkcur.wkRawLoading = true;
            addClass(wkcur.wkLeftArrow, 'wk_arrow_progress');
            hideProgress(wkcur.wkRightArrow);
            showWiki(extend(options, {
                w: actions[0]
            }), false, false, {
                fromlist: -1,
                noloader: true,
                preload: {
                    cache: wkcur.navNoCache || WkView.recacheRaw(actions[0]) ? 0 : 1
                }
            });
            cancelEvent(event);
        }
    },

    updateHeight: function() {
        window.updateWndVScroll && updateWndVScroll();

        var windowHeight = browser.mobile ? window.innerHeight : lastWindowHeight;
        var h = Math.max(wkcur.wkCont.offsetHeight, windowHeight);

        wkcur.wkLeftNav.style.height = wkcur.wkRightNav.style.height = h + 'px';

        var boxH = wkcur.wkBox.offsetHeight;
        setStyle(wkcur.wkLeftArrowBg.firstChild, {
            height: boxH
        });
        setStyle(wkcur.wkRightArrowBg.firstChild, {
            height: boxH
        });
    },

    updateSize: function(scroll) {
        if (!wkcur.wkCont) return;

        var size = getSize(wkcur.wkCont);

        var docEl = document.documentElement,
            ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight,
            top = Math.max(positive((ch - size[1] - 5) / 2), 14),
            paddingTop = top + 10,
            paddingBottom = wkLayer.offsetHeight - size[1] + top + 90;

        wkcur.wkCont.style.top = top + 'px';
        wkcur.wkRight.style.top = Math.max(paddingTop - wkLayerWrap.scrollTop, 16) + 'px';
        wkcur.wkLeftArrowBg.style.paddingTop = wkcur.wkRightArrowBg.style.paddingTop = paddingTop + 'px';
        wkcur.wkLeftArrowBg.style.paddingBottom = wkcur.wkRightArrowBg.style.paddingBottom = paddingBottom + 'px';
        if (scroll) {
            return;
        }

        onBodyResize();
        WkView.onResize();
    },


    setLocation: function(noLocChange, toQueue) {
        wkcur.prevLoc = {};
        for (var i in nav.objLoc) {
            if (i != 'w' || nav.objLoc[i] != wkcur.wkRaw && toQueue) {
                wkcur.prevLoc[i] = nav.objLoc[i];
            }
        }
        if (noLocChange) {
            return;
        }

        var nl = extend(nav.objLoc, {
            'w': wkcur.wkRaw
        });
        delete nl.order;
        delete(nl.z);
        if (nav.strLoc != nav.toStr(nl)) {
            nav.setLoc(nl);
        }

        //wkcur.noHistory = 0;
    },

    backLocation: function() {
        var loc = hab.getLoc();
        if (wkcur.prevLoc && wkcur.prevLoc != loc) {
            //    if (wkcur.previousLayer) {
            //      nav.go(wkcur.prevLoc);
            //    } else {
            nav.setLoc(wkcur.prevLoc);
            //    }
            //    if (wkcur.previousLayer && wkcur.prevLoc.z) {
            //      zNav({z: wkcur.prevLoc.z});
            //    }
        } else {
            var locParts = loc.split('/');
            if (locParts.length > 1) {
                nav.setLoc(locParts[0]);
            }
        }
        layerQueue.noHistory();
    },

    showError: function(txt) {
        if (window.wkcur) {
            delete wkcur.wkRawLoading;
            addClass(wkcur.wkRightArrow, 'wk_arrow_progress');
            addClass(wkcur.wkLeftArrow, 'wk_arrow_progress');
        }
        var box = showFastBox({
            title: getLang('global_error')
        }, txt, getLang('global_close'));
        setTimeout(box.hide, 2000);
        return true;
    },

    onChange: function() {
        if (!wkcur.shown) return false;
        clearTimeout(wkcur.autosaveTimeout);
        wkcur.autosaveTimeout = setTimeout(function() {
            if (wkcur.note && wkcur.toStatus) {
                WkView.saveInfo(true);
            }
        }, 4000);
    },

    likeOver: function(btn) {
        var linkSize = getSize(ge('wk_like_link'));
        var linkW = linkSize ? linkSize[0] : 20;

        showTooltip(btn, {
            url: 'like.php',
            params: {
                act: 'a_get_stats',
                object: wkcur.like_obj || wkcur.wkRaw,
                from: 'wkview'
            },
            slide: 15,
            shift: [0, 8, 9],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            typeClass: 'like_tt',
            className: 'wk_like_tt',
            dir: 'auto',
            init: function(tt) {
                if (!tt.container) return;
                var bp = geByClass1('bottom_pointer', tt.container, 'div');
                var tp = geByClass1('top_pointer', tt.container, 'div');
                setStyle(bp, {
                    marginLeft: linkW + 2
                });
                setStyle(tp, {
                    marginLeft: linkW + 2
                });
            }
        });
    },

    like: function() {
        if (!vk.id) return;
        if (cur.viewAsBox) {
            cur.viewAsBox();
            return;
        }
        var my = !wkcur.liked;

        ajax.post('like.php', {
            act: 'a_do_' + (my ? '' : 'un') + 'like',
            object: wkcur.like_obj || wkcur.wkRaw,
            hash: wkcur.likehash,
            from: 'wkview'
        }, {
            onDone: function(count, title) {
                return WkView.likeUpdate(my, count, title);
            }
        });
        WkView.likeUpdate(my, wkcur.likes + (my ? 1 : -1));
    },
    likeShare: function(hash) {
        var like_obj = wkcur.like_obj || wkcur.wkRaw,
            el = ge('like_share_' + like_obj),
            was = isChecked(el);
        checkbox(el);
        ajax.post('like.php', {
            act: 'a_do_' + (was ? 'un' : '') + 'publish',
            object: like_obj,
            hash: hash
        }, {
            onDone: WkView.likeUpdate.pbind(true)
        });
        if (ge('wk_like_link')) {
            var count = val('wk_like_count'),
                my = hasClass(ge('wk_like_icon'), 'my_like');
        } else {
            var countInput = ge('like_real_count_' + like_obj),
                count = countInput ? countInput.value : val('like_count' + like_obj),
                my = hasClass(ge('like_icon' + like_obj), 'my_like');
        }

        WkView.likeUpdate(true, intval(count) + (my ? 0 : 1));
    },
    likeShareCustom: function() {
        if (vk.id) {
            showBox('like.php', {
                act: 'publish_box',
                object: wkcur.like_obj || wkcur.wkRaw,
                list: '',
                from: 'wkview'
            });
        }
    },

    likeUpdate: function(my, count, title) {
        count = intval(count);

        var wrap = ge('wk_like_wrap'),
            icon = domByClass(wrap, '_icon'),
            countNode = domByClass(wrap, '_count');
        if (!countNode) {
            return;
        }
        var tt = wrap.tt || {},
            opts = clone(tt.opts || {}),
            countInput = domByClass(tt.container, '_value'),
            content = domByClass(tt.container, '_content'),
            titleNode = domByClass(tt.container, '_title');

        if (title && titleNode) {
            val(titleNode, title);
        }
        if (tt) {
            tt.likeInvalidated = true;
        }
        if (countInput) {
            countInput.value = count;
        }
        wkcur.likes = count;
        animateCount(countNode, count);

        wkcur.liked = my;
        toggleClass(wrap, 'my_like', my);
        toggleClass(wrap, 'no_likes', !count);
        toggleClass(content, 'me_hidden', !my);
        if (tt.el) {
            if (count) {
                if (title === false) {
                    tt.destroy && tt.destroy();
                } else if (!isVisible(tt.container) && !title) {
                    tooltips.show(tt.el, extend(opts, {
                        showdt: 0
                    }));
                }
            } else {
                tt.hide();
            }
        }
    },

    showLikesPage: function(like_obj, published, offset) {
        cur.likesBox.loadTabContent('like.php', {
            act: 'a_get_members',
            object: like_obj,
            published: published,
            offset: offset,
            wall: 1
        }, published);
    },

    extPageSubscribe: function(btn, oid, hash, confirm, transition_source, ad_data) {
        if (buttonLocked(btn)) return;

        cur.wkSubscribed = cur.wkSubscribed || {};
        var subscribed = hasClass(btn, 'secondary'),
            reqOptions = {
                showProgress: lockButton.pbind(btn),
                hideProgress: unlockButton.pbind(btn),
                onDone: function() {
                    cur.wkSubscribed[oid] = !subscribed;
                    toggleClass(btn, 'secondary');
                    if (confirm && subscribed) {
                        hide(btn);
                    }
                }
            };
        transition_source = transition_source || '';
        if (oid > 0) {
            ajax.post('al_friends.php', {
                act: (subscribed ? 'remove' : 'add'),
                mid: oid,
                hash: hash,
                from: 'wkview_extpage'
            }, reqOptions);
        } else {
            var leave = ajax.post.pbind('al_groups.php', {
                act: (subscribed ? 'a_leave' : 'a_enter'),
                gid: -oid,
                hash: hash,
                from: 'wkview_extpage',
                t_src: transition_source,
                ad_data: ad_data || ''
            }, reqOptions);
            if (confirm && subscribed) {
                var box = showFastBox(confirm.title, confirm.text, confirm.btn, function() {
                    box.hide();
                    leave();
                }, getLang('global_cancel'));
            } else {
                leave();
            }
        }
    },

    wallBeforeInitPost: function(opts) {
        if (window.tooltips) tooltips.destroyAll();
        revertLastInlineVideo();

        if (wkcur.postInited) {
            return false;
        }
        wkcur.pageReplaced = [];
        var post = wkcur.post,
            postEl, size, postPlaceholder;
        while (true) {
            postEl = ge('post' + post);
            if (!postEl && cur.onepost && post == (cur.oid + '_' + cur.pid)) {
                postEl = ge('fw_post');
            }
            postEl = postEl || ge('reply_fakebox' + post) || ge('reply_box' + post) || ge('replies' + post) || ge('feedback_row_wall' + post) || (wkcur.hl_reply && (ge('post' + wkcur.hl_reply) || ge('feedback_row_wall_reply' + wkcur.hl_reply)));
            if (!postEl) {
                break;
            }
            postPlaceholder = ce('div', {
                className: 'wk_wall_post_placeholder',
                id: 'wk_wall_post_placeholder_' + postEl.id
            });
            postEl.parentNode.replaceChild(postPlaceholder, postEl);
            wkcur.pageReplaced.push([postEl, postPlaceholder]);
        }

        cur.wallLayer = post;
        cur.wallLayerLike = wkcur.post_like;

        if (opts.options.wall_tpl) {
            extend(window.lang, opts.lang, opts.options.wall_tpl.lang);
            extend(wkcur, {
                wallType: opts.options.wall_type,
                wallTpl: opts.options.wall_tpl,
                wallMyDeleted: {},
                tsDiff: opts.options.wall_tpl && opts.options.wall_tpl.abs_timestamp ? Math.round((vkNow() / 1000 - opts.options.wall_tpl.abs_timestamp) / 900.0) * 900 : 0,
                wallMyOpened: {},
                wallMyReplied: {},
                wallMyRepliesCnt: 0
            });
            WkView.wallInitUpdates();
            wkcur.timeUpdateInt = setInterval(function() {
                Wall.updateTimes(wkcur.wkContent);
            }, 10000);
        }

        wkcur._hide.push(WkView.wallDeinitPost);

        wkcur.postInited = true;
    },
    wallAfterInitPost: function() {
        var post = wkcur.post,
            rf = ge('reply_field' + post);

        if (cur.wkSubscribed && cur.wkSubscribed[intval(post)] !== undefined) {
            toggleClass(geByClass1('_wk_subscribe_btn', wkcur.wkBox), 'secondary', cur.wkSubscribed[intval(post)]);
        }
        delete cur.editing;

        if (rf) {
            placeholderInit(rf, {
                editable: 1
            });
        }
        WkView.wallUpdateReplies();
        if (wkcur.hl_reply) {
            setTimeout(Wall.scrollHighlightReply.pbind('post' + wkcur.hl_reply), 0);
        } else {
            setTimeout(function() {
                wkLayerWrap.scrollTop = wkcur.toScroll || 0;
                wkcur.toScroll = 0;
            }, 0);
        }
    },
    wallDeinitPost: function() {
        if (!wkcur.postInited) {
            return false;
        }
        cur.wallLayer = false;
        cur.wallLayerLike = false;
        if (wkcur.edit) {
            Wall.cancelEdit();
        }
        each(wkcur.pageReplaced, function() {
            var postEl = this[0],
                postPlaceholder = this[1];
            if (postEl && postPlaceholder) {
                postPlaceholder.parentNode.replaceChild(postEl, postPlaceholder);
            }
        })

        clearInterval(wkcur.updatesCheckInt);
        clearInterval(wkcur.timeUpdateInt);

        revertLastInlineVideo();

        if (window.tooltips) tooltips.destroyAll();

        delete cur.editing;
        delete wkcur.postInited;
    },
    wallOnEdit: function(post, options) {
        wkcur.edit = true;
        wkcur.editor = {
            changed: true
        };
    },
    wallOnEdited: function(post) {
        wkcur.edit = false;
    },

    wallPostShowDeletedMessage: function(postRaw, msg) {
        var postEl = ge('wl_post');

        if (postEl && domData(postEl, 'post-id') === postRaw) {
            cur.pgPaused = true;
            hide('wl_replies_wrap', 'wl_post_actions_wrap', 'wl_reply_form_wrap');

            var postDeletedEl = domNS(postEl);
            if (postDeletedEl && hasClass(postDeletedEl, 'no_rows')) {
                val(postDeletedEl, msg);
            } else {
                postDeletedEl = ce('div', {
                    id: 'post_del' + postRaw,
                    innerHTML: msg,
                    className: 'no_rows'
                });
                domPN(postEl).insertBefore(postDeletedEl, domNS(postEl));
                hide(postEl);
            }

            if (!cur.wkviewNavRecache) {
                cur.wkviewNavRecache = {};
            }
            cur.wkviewNavRecache[wkcur.wkRaw] = 1;

            wkLayerWrap.scrollTop = 0;
            WkView.updateSize();
            return true;
        }

        return false;
    },

    wallPostHideDeletedMessage: function(postRaw) {
        var postEl = ge('wl_post');

        if (postEl && domData(postEl, 'post-id') === postRaw) {
            cur.pgPaused = false;
            show('wl_replies_wrap', 'wl_post_actions_wrap', 'wl_reply_form_wrap');

            var postDeletedEl = domNS(postEl);
            if (postDeletedEl && hasClass(postDeletedEl, 'no_rows')) {
                re(postDeletedEl);
            }
            show(postEl);

            if (!cur.wkviewNavRecache) {
                cur.wkviewNavRecache = {};
            }
            cur.wkviewNavRecache[wkcur.wkRaw] = 1;

            wkLayerWrap.scrollTop = 0;
            WkView.updateSize();
            return true;
        }

        return false;
    },

    wallPostSetArchiveState: function(actionEl, postRaw, hash, state, isRollback) {
        if (actionsMenuItemLocked(actionEl) || linkLocked(actionEl)) {
            return;
        }

        var postId = intval(postRaw.split('_')[1]);
        var isActionMenuItem = hasClass(actionEl, 'ui_actions_menu_item');

        ajax.post('al_wall_archive.php', {
            act: 'a_set_state',
            from: 'wkview',
            hash: hash,
            state: state ? 1 : 0,
            postId: postId,
        }, {
            onDone: function(msg) {
                isRollback ? WkView.wallPostHideDeletedMessage(postRaw) : WkView.wallPostShowDeletedMessage(postRaw, msg);
            },
            showProgress: isActionMenuItem ? lockActionsMenuItem.pbind(actionEl) : lockLink(actionEl),
            hideProgress: isActionMenuItem ? unlockActionsMenuItem.pbind(actionEl) : unlockLink(actionEl),
        });
    },
    wallPostDelete: function(act, hash, force) {
        var post = wkcur.post;
        if (cur.wallMyDeleted) {
            cur.wallMyDeleted[post] = 1;
        }
        ajax.post('al_wall.php', {
            act: act,
            post: post,
            hash: hash,
            confirm: force ? 1 : 0,
            from: 'wkview'
        }, {
            onDone: function(msg, additional, need_confirm) {
                if (need_confirm) {
                    var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() {
                        box.hide();
                        WkView.wallPostDelete(act, hash, 1);
                    }, getLang('box_cancel'));
                    return;
                }
                var p = ge('wl_post');
                if (!p) return;
                cur.pgPaused = true;
                hide('wl_replies_wrap', 'wl_post_actions_wrap', 'wl_reply_form_wrap');
                var del = domNS(p);
                if (del && hasClass(del, 'no_rows')) {
                    val(del, msg);
                } else {
                    domPN(p).insertBefore(ce('div', {
                        id: 'post_del' + post,
                        innerHTML: msg,
                        className: 'no_rows'
                    }), domNS(p));
                    hide(p);
                }
                wkLayerWrap.scrollTop = 0;
                if (act == 'spam') {
                    eval(additional);
                }
                WkView.updateSize();
            },
            showProgress: lockButton.pbind('wpe_delete' + post),
            hideProgress: unlockButton.pbind('wpe_delete' + post)
        });
    },
    wallPostRestore: function(hash) {
        var post = wkcur.post;
        if (cur.wallMyDeleted) {
            cur.wallMyDeleted[post] = 0;
        }
        ajax.post('al_wall.php', {
            act: 'restore',
            post: post,
            hash: hash,
            from: 'wkview'
        }, {
            onDone: function() {
                var p = ge('wl_post');
                if (!p || isVisible(p)) return;
                cur.pgPaused = false;
                show('wl_replies_wrap', 'wl_post_actions_wrap', 'wl_reply_form_wrap');
                var del = domNS(p);
                show(p);
                if (del && hasClass(del, 'no_rows')) {
                    re(del);
                }
                WkView.updateSize();
            }
        });
        return false;
    },
    wallUpdateRepliesOnScroll: function(resize) {
        if (!wkcur.postInited) return;
        var wndHeight = window.innerHeight || document.documentElement.clientHeight;
        var moreLink = ge('wl_replies_more');

        if (!moreLink) {
            var replies = ge('replies' + cur.wallLayer);
            var repliesLast = domLC(replies);

            if (repliesLast && hasClass(repliesLast, 'replies_next') && isVisible(repliesLast)) {
                moreLink = repliesLast;
            }
        }

        if (moreLink && isVisible(moreLink)) {
            var moreLinkY = getXY(moreLink, true)[1];
            if (wndHeight + 500 > moreLinkY) {
                moreLink.onclick();
            }
        }

        var replyForm = ge('wl_reply_form');
        if (!replyForm || hasClass(replyForm, 'wl_post_reply_form_forbidden')) {
            return;
        }
        var formWrap = ge('wl_reply_form_wrap'),
            formY = getXY(formWrap, true)[1],
            formSize = getSize(replyForm);
        formH = formSize[1];

        if (resize && wkcur.fixedBottom === false && wndHeight - formH < formY + 20) {
            wkLayerWrap.scrollTop += formY + 20 - (wndHeight - formH);
        } else if (isVisible(formWrap) && wndHeight - formH < formY) {
            if (!wkcur.fixedBottom || resize) {
                wkcur.fixedBottom = true;
                addClass(replyForm, 'wl_reply_form_fixed');
            }
            var ml = wkcur.fixedBottom ? Math.min(0, Math.max(-wkLayerWrap.scrollLeft, bodyNode.clientWidth - getSize(ge('page_layout'))[0])) : null;
            setStyle('wl_reply_form_wrap', {
                width: formSize[0],
                height: formSize[1],
                bottom: bottom,
                marginLeft: ml
            });
            var bottom = Math.min(0, wndHeight - getXY('wl_replies_wrap', true)[1] - formH);
            setStyle(replyForm, {
                bottom: bottom
            });
        } else {
            if (wkcur.fixedBottom || resize) {
                wkcur.fixedBottom = false;
                removeClass(replyForm, 'wl_reply_form_fixed');
                setStyle('wl_reply_form_wrap', {
                    width: null,
                    height: null,
                    marginLeft: null
                });
            }
        }
    },
    wallShowMoreReplies: function() {
        if (wkcur.loadingReplies) {
            return false;
        }
        var newOffset = wkcur.offset + wkcur.loaded,
            limit = wkcur.limit,
            repliesWrap = ge('replies' + wkcur.post);

        if (wkcur.count <= newOffset || !repliesWrap) {
            return false;
        }
        wkcur.loadingReplies = true;
        Wall.moreReplies(wkcur.post, (wkcur.reverse ? -1 : 1) * newOffset, limit, {
            from: 'wkview',
            append: true,
            rev: wkcur.reverse ? 1 : 0,
            onDone: function(replies, names, data) {
                extend(wkcur, {
                    count: data.count,
                    loaded: wkcur.loaded + data.num
                });
                WkView.wallUpdateReplies();
                wkcur.loadingReplies = false;
            },
            onFail: function() {
                wkcur.loadingReplies = false;
            },
            showProgress: lockButton.pbind('wl_replies_more'),
            hideProgress: unlockButton.pbind('wl_replies_more')
        });
        return false;
    },
    wallShowPreviousReplies: function(hlReply) {
        if (wkcur.loadingReplies || wkcur.reverse) {
            return false;
        }
        var maxLimit = 100,
            newOffset = Math.max(0, wkcur.offset - maxLimit),
            limit = Math.min(maxLimit, wkcur.offset - newOffset),
            repliesWrap = ge('replies' + wkcur.post);

        if (limit <= 0 || !repliesWrap) {
            return false;
        }
        wkcur.loadingReplies = true;
        var prevH = repliesWrap.offsetHeight;
        Wall.moreReplies(wkcur.post, newOffset, limit, {
            from: 'wkview',
            onDone: function(replies, names, data) {
                extend(wkcur, {
                    count: data.count,
                    offset: data.offset,
                    loaded: wkcur.loaded + data.num
                });
                if (hlReply) {
                    wkLayerWrap.scrollTop += repliesWrap.offsetHeight - prevH;
                    setTimeout(Wall.scrollHighlightReply.pbind('post' + hlReply), 0);
                }
                WkView.wallUpdateReplies();
                wkcur.loadingReplies = false;
            },
            onFail: function() {
                wkcur.loadingReplies = false;
            },
            showProgress: addClass.pbind('wl_replies_header_wrap', 'wl_replies_header_loading'),
            hideProgress: removeClass.pbind('wl_replies_header_wrap', 'wl_replies_header_loading')
        });
        if (StickersAnimation) {
            StickersAnimation.reloadStickers();
        }
    },
    wallUpdateReplies: function() {
        toggle('wl_replies_more', wkcur.offset + wkcur.loaded < wkcur.count);

        var header = ge('wl_replies_header'),
            label = langNumeric(wkcur.count, wkcur.lang.wall_N_replies),
            hasPrevious = false;

        if (!wkcur.reverse && wkcur.offset > 0) {
            if (wkcur.offset > 100) {
                label = langNumeric(100, wkcur.lang.wall_show_n_of_m_last).replace('{count}', wkcur.count);
            } else {
                label = langNumeric(wkcur.count, wkcur.lang.wall_show_all_n_replies);
            }
            hasPrevious = true;
        }
        val('wl_replies_header_label', label);
        toggleClass(header, 'wl_replies_header_clickable', hasPrevious);

        var repliesWrap = ge('wl_replies_wrap'),
            form = ge('wl_reply_form');

        if (repliesWrap) {
            if (wkcur.count && !isVisible(repliesWrap.firstChild)) {
                show(repliesWrap.firstChild);
            }

            toggleClass(repliesWrap, 'wl_replies_empty', !wkcur.count)
        }

        if (form) {
            var formPlace = ge('wl_reply_form_wrap');
            if (form.parentNode != formPlace) {
                formPlace.appendChild(form);
            }
        }

        WkView.wallUpdateRepliesOnScroll();
        WkView.updateSize();
    },
    wallInitUpdates: function() {
        var key = wkcur.options.add_queue_key;
        if (!key || !window.Notifier) {
            return;
        }
        var wasKey = wkcur.wallAddQueue,
            checkCb = function() {
                if (wkcur.wallAddQueue) Notifier.addKey(wkcur.wallAddQueue, Wall.updated.pbind(true));
            };

        wkcur.wallAddQueue = key;
        checkCb();
        wkcur.updatesCheckInt = setInterval(checkCb, 10000);
    },
    wallCancelEditReply: function() {
        var post = wkcur.post,
            rf = ge('reply_field' + post),
            composer = rf && data(rf, 'composer');
        if (composer) {
            Composer.reset(composer);
        } else {
            val(rf, '');
        }
        Wall.hideEditReply(post);
        WkView.wallUpdateReplies();
    },
    wallInverseReplies: function(el) {
        if (wkcur.loadingReplies) {
            return false;
        }
        wkcur.loadingReplies = true;
        wkcur.reverse = !wkcur.reverse;
        wkcur.offset = 0;

        Wall.moreReplies(wkcur.post, wkcur.offset, wkcur.limit, {
            from: 'wkview',
            clear: true,
            rev: wkcur.reverse ? 1 : 0,
            onDone: function(replies, names, data) {
                domFC(el).className = wkcur.reverse ? 'sort_rev_icon' : 'sort_not_rev_icon';
                extend(wkcur, {
                    count: data.count,
                    loaded: data.num
                });
                WkView.wallUpdateReplies();
                wkcur.loadingReplies = false;
            },
            onFail: function() {
                wkcur.reverse = !wkcur.reverse;
                wkcur.loadingReplies = false;
            },
            showProgress: addClass.pbind('wl_replies_header_wrap', 'wl_replies_header_loading'),
            hideProgress: removeClass.pbind('wl_replies_header_wrap', 'wl_replies_header_loading')
        });
    },

    likesInit: function() {
        extend(wkcur, {
            historyLen: wkcur.historyLen || 0
        });
        WkView.initSTL();
        WkView.likesTabInit();

        addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
        addEvent(window, 'resize', WkView.onResize);
        onBodyResize();

        cur.wallTpl = cur.wallTpl || {};
        if (!cur.wallInited) {
            Wall.initWallOptions(wkcur.wall_opts);
        } else {
            var deepActive = hasClass(ge('wl_post'), 'deep_active');

            if (deepActive && wkcur.wall_opts.wall_tpl.reply_form_new) {
                wkcur._oldReplyFormNew = cur.wallTpl.reply_form_new;
                cur.wallTpl.reply_form_new = wkcur.wall_opts.wall_tpl.reply_form_new;
            } else {
                wkcur._oldReplyForm = cur.wallTpl.reply_form;
                cur.wallTpl.reply_form = wkcur.wall_opts.wall_tpl.reply_form;
            }
        }

        if (cur.options === undefined) {
            cur.options = {
                reply_names: {}
            };
        } else if (cur.options.reply_names === undefined) {
            cur.options.reply_names = {};
        }
        extend(cur.options.reply_names, wkcur.reply_names);

        wkcur._hide.push(function() {
            removeEvent(wkLayerWrap, 'scroll', WkView.onScroll);
            removeEvent(window, 'resize', WkView.onResize);

            if (wkcur._oldReplyForm) {
                cur.wallTpl.reply_form = wkcur._oldReplyForm;
                wkcur._oldReplyForm = false;
            }

            if (wkcur._oldReplyFormNew) {
                cur.wallTpl.reply_form_new = wkcur._oldReplyFormNew;
                wkcur._oldReplyFormNew = false;
            }
        });
    },
    likesTabInit: function() {
        if (wkcur.preload) {
            ajax.preload('wkview.php', {
                act: 'show',
                w: wkcur.wkRaw,
                offset: wkcur.offset
            }, wkcur.preload);
        }
    },
    likesToTop: function() {
        var tbTabsWrap = ge('tb_tabs_wrap'),
            ds = getXY(tbTabsWrap, true)[1];

        if (wkcur.lSTL && wkcur.lSTL.el == ge('wk_box')) {
            wkcur.lSTLWas = 0;
        }
        if (ds < 0) {
            wkLayerWrap.scrollTop += ds + 1;
        }
        WkView.likesOnScroll();
        if (wkcur.lSTL) {
            WkView.stlOnScroll();
        }
    },
    likesTab: function(tab) {
        var li = ge('likes_tab_' + tab),
            el = li && domFC(li),
            tabs = gpeByClass('ui_tabs', el);
        if (!el || geByClass1('ui_tab_sel', tabs) == el) return false;

        uiTabs.switchTab(el);

        var contEl = gpeByClass('wk_wiki_content', tabs),
            tbTabsWrap = ge('tb_tabs_wrap');
        ajax.post('wkview.php', {
            act: 'show',
            w: tab + '/' + wkcur.like_obj,
            part: 1
        }, {
            cache: 1,
            showProgress: addClass.pbind(contEl, 'box_loading'),
            hideProgress: removeClass.pbind(contEl, 'box_loading'),
            onDone: function(content, options) {
                val('wk_likes_content', content);
                extend(wkcur, options);
                WkView.likesTabInit();

                WkView.setLocation();
                WkView.updateHeight();
                WkView.likesToTop();
            }
        });
    },
    likesPreload: function() {
        ajax.post('wkview.php', {
            act: 'show',
            w: wkcur.wkRaw,
            offset: wkcur.offset
        }, {
            cache: 1
        });
    },
    likesMore: function() {
        var more = ge('wk_likes_more_link');
        if (isButtonLocked(more)) return;

        ajax.post('wkview.php', {
            act: 'show',
            w: wkcur.wkRaw,
            offset: wkcur.offset
        }, {
            onDone: function(rows, newOffset, needMore, names, noReplies) {
                var cnt = ge('wk_likes_rows');
                if (!cnt) return;

                if (noReplies) { // show all posts with hidden replies
                    var hidden = geByClass('wk_likes_hidden', cnt);
                    for (var i = 0, l = hidden.length; i < l; ++i) {
                        cnt.appendChild(hidden[i]);
                        removeClass(hidden[i], 'wk_likes_hidden');
                    }
                }

                cnt.appendChild(cf(rows));
                wkcur.offset = newOffset;
                if (needMore) {
                    WkView.likesPreload();
                } else {
                    hide(more);
                }
                WkView.updateHeight();
                if (names) {
                    extend(cur.options.reply_names, names);
                }
            },
            showProgress: lockButton.pbind(more),
            hideProgress: unlockButton.pbind(more),
            cache: 1
        });
    },
    likesOnScroll: function(resize) {
        var bt = lastWindowHeight,
            objMore = ge('wk_likes_more_link'),
            tbTabs = ge('tb_tabs'),
            tbTabsWrap = ge('tb_tabs_wrap');

        if (getXY(tbTabsWrap, true)[1] < 0) {
            if (!wkcur.tbFixed) {
                setStyle(tbTabsWrap, 'height', domFC(tbTabs).offsetHeight);
                setStyle(domFC(tbTabs), 'width', intval(getStyle(domFC(tbTabs), 'width')));
                addClass(tbTabs, 'ui_tabs_fixed');
                wkcur.tbFixed = true;
            }
        } else {
            if (wkcur.tbFixed) {
                removeClass(tbTabs, 'ui_tabs_fixed');
                wkcur.tbFixed = false;
            }
        }

        if (isVisible(objMore) && (bt > getXY(objMore, true)[1])) {
            objMore.click();
        }
    },
    likesBlacklistTip: function(el) {
        showTooltip(el, {
            text: getLang('like_block_liker'),
            shift: [8, 5, 5],
            black: 1
        });
    },
    likesBlacklist: function(el, oid, event) {
        if (el.tt && el.tt.destroy) el.tt.destroy();
        showBox('like.php', {
            act: 'spam',
            mid: oid,
            object: wkcur.like_obj
        });
        return cancelEvent(event);
    },
    likesRecache: function(d) {
        wkcur.offset += d;
        for (var i in ajaxCache) {
            if (i.match(new RegExp('^\\/wkview\.php\\#act=show', ''))) {
                delete(ajaxCache[i]);
            }
        }
    },
    likesRemove: function(oid) {
        re('fans_fan_row' + oid);
        WkView.likesRecache(-1);
        WkView.onScroll();
        if (!domFC(ge('wk_likes_rows'))) {
            nav.reload();
        }
    },

    historyInit: function() {
        addEvent(wkLayerWrap, 'scroll', WkView.onScroll);
        addEvent(window, 'resize', WkView.onResize);
        onBodyResize();

        wkcur._hide.push(function() {
            removeEvent(wkLayerWrap, 'scroll', WkView.onScroll);
            removeEvent(window, 'resize', WkView.onResize);
        });
    },
    historyOnScroll: function() {
        if (wkcur.loadingHistory) {
            return false;
        }
        var wndHeight = window.innerHeight || document.documentElement.clientHeight;

        var moreLink = ge('wk_history_more_link');
        if (moreLink && isVisible(moreLink)) {
            var moreLinkY = getXY(moreLink, true)[1];
            if (wndHeight + 500 > moreLinkY) {
                moreLink.onclick();
            }
        }
    },
    historyShowMore: function() {
        if (wkcur.loadingHistory) {
            return false;
        }
        var newOffset = wkcur.offset;
        wkcur.loadingHistory = true;
        ajax.post('wkview.php', {
            act: 'show',
            w: wkcur.wkRaw,
            offset: newOffset,
            part: 1
        }, {
            onDone: function(options, rows) {
                if (!ge('wk_history_rows')) {
                    return;
                }
                extend(wkcur, options);
                ge('wk_history_rows').appendChild(cf(rows));
                setTimeout(WkView.historyOnScroll, 500);

                var hasMore = wkcur.offset < wkcur.count && rows;
                toggle('wk_history_more_link', hasMore);
                toggle('wk_history_empty', !hasMore && !domFC(ge('wk_history_rows')));
                toggleClass('wk_history_more', 'wk_history_more_loading', hasMore && !domFC(ge('wk_history_rows')));
                wkcur.loadingHistory = false;
            },
            onFail: function() {
                wkcur.loadingHistory = false;
            },
            showProgress: function() {
                hide('wk_history_more_link');
                show('wk_history_more_progress');
            },
            hideProgress: function() {
                show('wk_history_more_link');
                hide('wk_history_more_progress');
            }
        });

        return false;
    },

    preloadArrow: function(next) {
        var arrow = wkcur[next ? 'wkRightArrow' : 'wkLeftArrow'];

        if (!arrow.cached) {
            arrow.cached = true;
            var actions = WkView.getNextWkRaws(),
                preloadWkRaw = actions[next ? 1 : 0];

            if (preloadWkRaw) {
                var page = {
                    w: preloadWkRaw
                };
                if (preloadWkRaw && preloadWkRaw.substr(-6) == '/query') {
                    var loc = clone(nav.objLoc);
                    delete loc[0];
                    delete loc.w;
                    page.query = JSON.stringify(loc);
                }
                if (wkcur.from) {
                    page.from = wkcur.from;
                }
                ajax.post('wkview.php', extend({
                    act: 'show',
                    loc: nav.objLoc[0]
                }, page), {
                    cache: 1
                });
            }
        }
    },

    back: function() {
        if (wkcur.historyLen > 1) {
            wkcur.doBack = 1;
            wkcur.historyLen -= 1;
            history.go(-1);
            return true;
        } else {
            WkView.hide();
        }
    },

    initSTL: function() {
        re(cur.lSTL);
        extend(wkcur, {
            lSTL: wkLayerWrap.appendChild(ce('div', {
                id: 'layer_stl',
                innerHTML: '<div id="layer_stl_bg" class="fixed"></div><div id="layer_stl_cl"></div><nobr id="layer_stl_text" class="fixed">' + getLang('global_to_top') + '</nobr>',
                el: ge('wk_box'),
                onclick: cancelEvent,
                onmousedown: WkView.stlDown,
                sc: WkView.stlOnScroll
            })),
            lSTLText: ge('layer_stl_text', wkLayerWrap),
            lSTLShown: 0,
            lSTLWas: 0,
            lSTLWasSet: 0
        });
        cur.lSTL = wkcur.lSTL;

        wkcur._hide.push(function() {
            re(wkcur.lSTL, cur.lSTL);
        });
    },
    stlDown: function(e) {
        e = e || window.event;
        if (checkEvent(e)) return;

        if (!__afterFocus) {
            if (wkcur.lSTLWasSet && wkcur.lSTLWas) {
                var to = wkcur.lSTLWas;
                wkcur.lSTLWas = 0;
                wkLayerWrap.scrollTop = to;
            } else {
                wkcur.lSTLWas = wkLayerWrap.scrollTop;
                wkLayerWrap.scrollTop = 0;
            }
        }
        return cancelEvent(e);
    },
    stlOnScroll: function(resize) {
        var st = wkLayerWrap.scrollTop,
            mx = 200,
            vis = wkcur.lSTLWas || (st > mx),
            o = 0;

        wkcur.lSTL.style.marginTop = st + 'px';

        if (vk.staticheader) {
            var headH = getSize('page_header_wrap')[1];
            wkcur.lSTLText.style.marginTop = Math.max(-Math.min(scrollGetY(), bodyNode.clientHeight - (window.lastWindowHeight || 0)), -headH) + 'px';
        }

        if (!vis) {
            if (wkcur.lSTLShown !== 0) {
                hide(wkcur.lSTL);
                wkcur.lSTLShown = 0;
            }
        } else {
            if (wkcur.lSTLShown !== 1) {
                show(wkcur.lSTL);
                wkcur.lSTLShown = 1;
            }
            if (wkcur.lSTLWas && st > 500) {
                wkcur.lSTLWas = 0;
            }
            if (st > mx) {
                o = (st - mx) / mx;
                if (wkcur.lSTLWasSet) {
                    wkcur.lSTLWasSet = 0;
                    val(domLC(wkcur.lSTL), getLang('global_to_top'));
                    removeClass(domLC(wkcur.lSTL), 'down');
                }
            } else {
                o = (mx - st) / mx;
                if (wkcur.lSTLWas) {
                    if (!wkcur.lSTLWasSet) {
                        wkcur.lSTLWasSet = 1;
                        val(domLC(wkcur.lSTL), '');
                        addClass(domLC(wkcur.lSTL), 'down');
                    }
                }
            }
        }
        if (wkcur.wkLeft && wkcur.wkLeftNav) {
            var showLeft = wkcur.historyLen > 1 && !vis;
            toggle(wkcur.wkLeft, showLeft);
            toggle(wkcur.wkLeftNav, showLeft);
            setStyle(wkcur.wkLeftWrap, {
                opacity: 1 - Math.min(Math.max(st / mx, 0), 1)
            });
            if (!showLeft) {
                setStyle(wkcur.wkLeft, {
                    opacity: 0.4
                });
            }
        }
        setStyle(wkcur.lSTL, {
            opacity: Math.min(Math.max(o, 0), 1)
        });
    },
    subscribe: function(btn, hash) {
        var ttVisible = btn.tt && (btn.tt.shown || btn.tt.showing);
        if (ttVisible) {
            tooltips.hide(btn, {
                fasthide: 1
            });
        } else if (btn.tt && btn.ttimer) {
            clearTimeout(btn.ttimer);
            ttVisible = true;
        }

        ajax.post('/al_wall.php', {
            act: 'toggle_subscribe',
            post: wkcur.post,
            hash: hash
        }, {
            onDone: function(data) {
                WkView.setSubscribed(btn, data.subscribed, ttVisible);
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    setSubscribed: function(btn, subscribed, showTt) {
        btn.innerHTML = wkcur.lang[subscribed ? 'wall_unsubscribe_post' : 'wall_subscribe_post'];
        toggleClass(btn, 'wl_post_subscribed', subscribed);
        if (showTt) {
            WkView.showSubscribeTooltip(btn);
        }
        if (cur.onWKSubscribe) {
            cur.onWKSubscribe(subscribed);
            delete cur.onWKSubscribe;
        }
    },
    showSubscribeTooltip: function(btn) {
        var subscribed = hasClass(btn, 'wl_post_subscribed'),
            s = getSize(btn),
            btnW = s[0];
        showTooltip(btn, {
            dir: 'left',
            asrtl: 1,
            text: function() {
                return wkcur.lang[subscribed ? 'wall_unsubscribe_post_tt' : 'wall_subscribe_post_tt'];
            },
            shift: [260, -15],
            slideX: -10,
            showdt: 200,
            className: 'subscr_post_tt'
        });
    },
    shareApp: function(app_url, url_hash) {
        if (vk.id) {
            var params = {
                act: 'publish_box',
                object: wkcur.like_obj,
                url_hash: url_hash,
                list: '',
                from: 'wkview'
            };
            var options = {
                onDone: function() {
                    var url = app_url;
                    if (url_hash) {
                        url += '#' + url_hash;
                    }
                    var composer = cur.sbField && data(cur.sbField, 'composer');
                    if (composer) {
                        composer.addMedia.checkURL(url);
                    }
                }
            };
            showBox('like.php', params, options);
        }
    },
    closeComments: function(el, owner_id, post_id, hash) {
        Wall.closeComments(el, owner_id, post_id, hash, function(close) {
            WkView.onCloseComments(close, owner_id, post_id);

            if (wkcur.pageReplaced && wkcur.pageReplaced.length) {
                wkcur.pageReplaced.forEach(function(postReplace) {
                    var post = postReplace[0];

                    if (post.id === 'post' + owner_id + '_' + post_id) {
                        Wall.onCloseComments(close, post);
                    }
                });
            }
        });
    },
    onCloseComments: function(close, owner_id, post_id, skip) {
        var replyForm = close ? geByClass1('wl_post_reply_form_forbidden') : ge('wl_reply_form');

        if (!skip && !replyForm) {
            ajax.post('wkview.php', {
                act: 'comment_box',
                owner_id: owner_id,
                post_id: post_id
            }, {
                onDone: function(reply) {
                    if (reply) {
                        ge('wl_reply_form_wrap').appendChild(se(reply));
                        !close && !wkcur.isArchived && WkView.wallAfterInitPost();
                        WkView.onCloseComments(close, owner_id, post_id, true);
                    }
                }
            });

            return;
        }

        var replyFormHide = close ? ge('wl_reply_form') : geByClass1('wl_post_reply_form_forbidden');
        var wlPost = ge('wl_post');

        if (wkcur.isArchived) {
            toggleClass(wlPost, 'closed_comments', true);
            hide(replyForm);
            hide(replyFormHide);
        } else {
            toggleClass(wlPost, 'closed_comments', close);
            show(replyForm);
            hide(replyFormHide);
        }

        var action = geByClass1('action_closing_comments', wlPost);
        domData(action, 'closed', close);
        val(action, getLang(close ? 'wall_open_comments' : 'wall_closing_comments'));
    },
    _eof: 1
};
try {
    stManager.done('wkview.js');
} catch (e) {}