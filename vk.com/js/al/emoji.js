if (!window.Emoji) {
    var Emoji = {

        EMOJI_SPRITES_NUM: 3,

        opts: {},
        last: 0,
        shownId: false,
        hasNewStickers: false,
        preventMouseOver: false,

        ttShift: 45,

        stickers: {},

        TAB_EMOJI: 0,
        TAB_RECENT_STICKERS: -1,

        CLICK_DELAY: 500,

        init: function(txt, opts) {
            var optId = Emoji.last;
            opts.txt = txt;
            opts.id = optId;
            opts.fieldWrap = gpeByClass('_emoji_field_wrap', txt);
            opts.emojiWrap = domByClass(opts.fieldWrap, '_emoji_wrap');
            opts.emojiBtn = domByClass(opts.emojiWrap, '_emoji_btn');
            opts.emojiWrap && data(opts.emojiWrap, 'optId', optId);
            txt.emojiId = optId;
            if (opts.forceTxt) {
                opts.editable = 0;
                // placeholderSetup(txt);
                placeholderInit(txt);
            } else {
                opts.editable = 1;
                setTimeout(function() {
                    // placeholderSetup(txt, {editable: 1, editableFocus: Emoji.editableFocus});
                    placeholderInit(txt, {
                        editable: 1,
                        editableFocus: Emoji.editableFocus,
                        global: opts.global
                    });
                    if (opts.shouldFocus) {
                        Emoji.editableFocus(txt, false, true);
                    }
                }, 0);
                if (browser.mozilla) {
                    try {
                        document.execCommand("enableObjectResizing", false, false);
                        cur.destroy.push(function() {
                            document.execCommand("enableObjectResizing", false, true);
                        });
                    } catch (e) {}

                }

                addEvent(window, 'mousemove', Emoji.preventMouseOverHandle);

                addEvent(txt, browser.opera && !browser.chrome ? 'click' : 'mousedown', function(e) {
                    if (e.target && e.target.tagName == 'IMG') {
                        if (Emoji.getCode(e.target)) {
                            Emoji.editableFocus(txt, e.target, e.offsetX > 8);
                            return cancelEvent(e);
                        }
                    }
                    if (Emoji.shown) {
                        Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
                    }
                });

                if (opts.noLineBreaks) {
                    addEvent(txt, 'blur', function(e) {
                        if (!txt.textContent && !txt.innerText) {
                            each(geByTag('br', txt), function(k, br) {
                                re(br);
                            })
                        }
                    });
                }

                addEvent(txt, 'keypress keydown keyup paste', function(e) {
                    if (e.canceled) return false;
                    if (e.type == 'keydown') {
                        var noEnter = opts.ctrlSend ? opts.ctrlSend() : opts.noEnterSend;
                        if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
                            if (opts.forceEnterSend && opts.onSend) {
                                opts.onSend();
                                return cancelEvent(e);
                            }
                            var ctrlSubm = (cur.ctrl_submit && !opts.noCtrlSend);
                            if ((ctrlSubm || noEnter) && (e.ctrlKey || browser.mac && e.metaKey) ||
                                !ctrlSubm && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey)) {
                                var composer = data(txt, 'composer');
                                if (!Emoji.emojiEnter(optId, e) || !Emoji.stickerHintMove(e) || composer && composer.wdd && isVisible(composer.wdd.listWrap)) {
                                    return false;
                                }
                                if (!noEnter || (e.ctrlKey || browser.mac && e.metaKey)) {
                                    Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
                                    opts.onSend && opts.onSend();
                                    return cancelEvent(e);
                                }
                            }
                            if (opts.noLineBreaks) {
                                return cancelEvent(e);
                            }
                        }
                        if (e.ctrlKey && e.keyCode == KEY.RETURN) {
                            var val = this.value;
                            if (opts.editable) {
                                Emoji.insertHTML('<div><br/></div>');
                            } else {
                                if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
                                    var start = this.selectionStart;
                                    this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
                                    this.selectionStart = this.selectionEnd = start + 1;
                                } else if (document.selection && document.selection.createRange) {
                                    this.focus();
                                    var range = document.selection.createRange();
                                    range.text = "\r\n";
                                    range.collapse(false);
                                    if (browser.opera && !browser.chrome) {
                                        range.moveEnd('character', 0);
                                        range.moveStart('character', 0);
                                    }
                                    range.select();
                                }
                                txt.autosize.update();
                                setTimeout(function() {
                                    txt.autosize.update();
                                }, 0);
                            }
                            return false;
                        }
                        if (e.keyCode == KEY.TAB && !(e.ctrlKey || browser.mac && e.metaKey)) {
                            var stCont = geByClass1('_sticker_hints', domPN(opts.txt));
                            if (stCont && isVisible(stCont)) {
                                var selected = geByClass1('over', stCont);
                                if (selected) {
                                    Emoji.stickerHintKeyOut(optId, selected);
                                } else {
                                    Emoji.stickerHintKeyOver(optId, geByClass1('emoji_sticker_item', stCont));
                                }

                                if (!Emoji.shown) {
                                    return cancelEvent(e);
                                }
                            }
                            if (Emoji.shown) {
                                Emoji.editableFocus(txt, false, true, void(0), true);
                                Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
                            } else {
                                Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), false, true, void(0), true);
                            }
                            return cancelEvent(e);
                        }
                        if (e.keyCode == KEY.ESC) {
                            var stCont = geByClass1('_sticker_hints', domPN(opts.txt)),
                                needCancel = false;
                            if (stCont && isVisible(stCont)) {
                                Emoji.stickerHintKeyOut(optId, geByClass1('emoji_sticker_item', stCont));
                                Emoji.stickersHintsHide(stCont, opts, 100);
                                needCancel = true;
                            }
                            if (Emoji.shown) {
                                Emoji.editableFocus(txt, false, true, void(0), true);
                                Emoji.ttClick(optId, geByClass1('emoji_smile', opts.controlsCont), true);
                                needCancel = true;
                            }
                            if (needCancel) {
                                return cancelEvent(e);
                            }
                            if (opts.onEsc) {
                                return opts.onEsc(e);
                            }
                        }
                    }

                    if (e.type == 'paste') {
                        Emoji.onEditablePaste(txt, opts, optId, e);
                        if (opts.checkEditable) {
                            setTimeout(opts.checkEditable.pbind(optId, txt), 0);
                        }
                        Emoji.checkStickersKeywords(optId, opts);
                    } else if (e.type == 'keyup') {
                        if (opts.noLineBreaks && !txt.textContent && !txt.innerText) {
                            each(geByTag('br', txt), function(k, br) {
                                re(br);
                            })
                        }
                        if (opts.checkEditable) {
                            opts.checkEditable(optId, txt);
                        }
                        Emoji.checkStickersKeywords(optId, opts);
                    } else if (e.type == 'keydown') {
                        if (opts.checkEditable) {
                            setTimeout(opts.checkEditable.pbind(optId, txt), 0);
                        }
                        Emoji.checkStickersKeywords(optId, opts);
                    }

                    if (opts.onKeyAction) {
                        opts.onKeyAction(e);
                    }

                    if (cur.onReplyFormSizeUpdate) {
                        cur.onReplyFormSizeUpdate(e);
                    }

                    return true;
                });
            }

            window.Notifier && Notifier.addRecvClbk('emoji', 0, Emoji.lcRecv, true);
            Emoji.initStickersKeywords();
            Emoji.checkNewStickers(opts);

            Emoji.opts[Emoji.last] = opts;
            return Emoji.last++;
        },

        preventMouseOverHandle: function() {
            Emoji.preventMouseOver = false;
        },

        lcRecv: function(data) {
            switch (data.act) {
                case 'updateTabs':
                    Emoji.updateTabs(data.newStickers, data.keywords);
                    break;
            }
        },

        correctCaret: function(txt) {
            var bottom = getCaretBoundingRect(txt).bottom;
            if (bottom < 0 || bottom > txt.offsetHeight) {
                txt.scrollTop += bottom - txt.offsetHeight;
            }
        },

        insertWithBr: function(range, text) {
            if (text) {
                var cleanText = text.replace(/\n/g, '<br/>');
                var div = ce('div', {
                    innerHTML: cleanText
                });
                Emoji.cleanCont(div);
                Emoji.insertHTML(div.innerHTML);
            }
        },

        insertWithoutNL: function(range, text) {
            if (text) {
                var cleanText = text.replace(/\n/g, '');
                var div = ce('div', {
                    innerHTML: cleanText
                });
                Emoji.cleanCont(div);
                Emoji.insertHTML(div.innerHTML);
            }
        },

        focusTrick: function(txt, insert, finalize, range, cont) {
            if (!cont) {
                cont = txt;
            }
            var textarea = ce('TEXTAREA', {
                className: 'emoji_tmp_textarea'
            });
            txt.parentNode.appendChild(textarea);
            textarea.focus();
            setTimeout(function() {
                var scroll = cont.scrollTop;
                re(textarea);
                txt.focus();
                cont.scrollTop = scroll;
                Emoji.setRange(range);
                insert(clean(val(textarea)));
                finalize(txt);
            }, 0);
        },

        finalizeInsert: function(txt) {
            Emoji.cleanCont(txt);
            setTimeout(Emoji.correctCaret.pbind(txt), 10);
        },

        getClipboard: function(e) {
            if (e.clipboardData) {
                return clean(e.clipboardData.getData('text'));
            } else if (window.clipboardData) {
                return clean(window.clipboardData.getData("Text"));
            } else {
                return false;
            }
        },

        processImagePaste: function(e, txt, opts, onDone) {
            if (e.clipboardData != null) {
                var clipboardData = e.clipboardData;

                function _onImageBlobReady(blob) {
                    var addMedia, composer;

                    blob.name = blob.filename = 'upload_' + new Date().toISOString() + '_' + irand(0, 100) + '.png';

                    if (hasClass(txt, '_im_text')) {
                        if (opts.uploadActions) {
                            opts.uploadActions.paste([blob]);
                            return;
                        }
                    } else if (txt.id == 'post_field') { // field for post submit
                        addMedia = cur.wallAddMedia;
                    } else { // replies inputs
                        composer = data(txt, 'composer');
                        addMedia = composer && composer.addMedia;
                    }

                    if (!addMedia) {
                        return;
                    }

                    if (isFunction(opts.initUploadForImagePasteCallback)) {
                        opts.initUploadForImagePasteCallback(txt, addMedia, blob);
                    }
                }

                function _checkImagesEls(cb) {
                    var timespan = Math.floor(1000 * Math.random());

                    var imgs = geByTag('img', txt);
                    for (var j = 0, len = imgs.length; j < len; j++) {
                        var img = imgs[j];
                        img['_before_paste_' + timespan] = true;
                    }

                    return setTimeout(function() {
                        var imgs = geByTag('img', txt);
                        var pastedImage = false;

                        for (var k = 0, len1 = imgs.length; k < len1; k++) {
                            var img = imgs[k];
                            if (!img['_before_paste_' + timespan]) {
                                cb(img.src);
                                re(img);
                                pastedImage = true;
                            }
                        }

                        if (!pastedImage) {
                            onDone();
                        }
                    }, 1);
                }

                function _handleImage(src) {
                    if (src.match(/^webkit\-fake\-url\:\/\//)) {
                        return;
                    }

                    var loader = new Image();
                    loader.crossOrigin = 'anonymous';
                    loader.onload = function() {
                        var canvas = document.createElement('canvas');
                        canvas.width = loader.width;
                        canvas.height = loader.height;
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(loader, 0, 0, canvas.width, canvas.height);

                        canvas.toBlob(function(blob) {
                            _onImageBlobReady(blob);
                        }, 'image/png');

                        onDone(true);
                    };

                    return loader.src = src;
                }

                if (clipboardData.items) { // best way
                    var imagePaste = false;

                    for (var j = 0, len = clipboardData.items.length; j < len; j++) {
                        var item = clipboardData.items[j];

                        if (item.type.match(/^image\//)) {
                            var reader = new FileReader();
                            reader.onload = function(event) {
                                return _handleImage(event.target.result);
                            };
                            reader.readAsDataURL(item.getAsFile());

                            imagePaste = true;
                        } else if (item.type === 'text/plain') {
                            return onDone();
                        }
                    }

                    return imagePaste;

                } else { // no images or FF
                    if (-1 !== Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {
                        return onDone();
                    }

                    _checkImagesEls(function(src) {
                        return _handleImage(src);
                    });
                }

            } else {
                onDone();
            }
        },

        onEditablePaste: function(txt, opts, optId, e, onlyFocus) {
            var range = false;

            if (txt.getAttribute('contenteditable') === 'true') {
                range = Emoji.getRange();
            }

            var text = this.getClipboard(e);
            var textRangeAndNoFocus = text && range && !onlyFocus;

            if (e.clipboardData && inArray('text/html', e.clipboardData.types) && inArray('Files', e.clipboardData.types)) {
                cancelEvent(e);
            }

            var isImagePaste = this.processImagePaste(e, txt, opts, (function(isImagePaste) {
                if (isImagePaste) {
                    return;
                }

                if (textRangeAndNoFocus) {
                    opts.noLineBreaks ? this.insertWithoutNL(range, text) : this.insertWithBr(range, text);
                    setTimeout(this.finalizeInsert.bind(this, txt), 0);
                } else if (range) {
                    this.focusTrick(txt, opts.noLineBreaks ? this.insertWithoutNL.pbind(range) : this.insertWithBr.pbind(range), this.finalizeInsert.bind(this, txt), range);
                }
            }).bind(this));

            if (isImagePaste || textRangeAndNoFocus) {
                cancelEvent(e);
            }
        },

        cleanCont: function(cont) {
            var el = cont.firstChild;
            while (el) {
                var next = el.nextSibling;
                switch (el.nodeType) {
                    case 1:
                        if (el.id == 'tmp_paste_cont') break;
                        if (el.tagName == 'DIV' || el.tagName == 'P' || el.tagName == 'SPAN') {
                            el.setAttribute('style', '');
                            el.className = '';
                            el.id = '';
                            Emoji.cleanCont(el);
                        } else if (el.tagName == 'IMG') {
                            if (!Emoji.getCode(el)) {
                                re(el);
                            }
                        } else if (el.tagName != 'BR') {
                            var text = Emoji.editableVal(el, {
                                saveEmoji: true
                            });
                            var f = cf(clean(text).replace(/\n/g, '<br/>'));
                            var last = f.lastChild;
                            el.parentNode.replaceChild(f, el);
                            //if (last) {
                            //  Emoji.editableFocus(cont, last, true);
                            //}
                        }
                        break;
                    case 3:
                        var str = clean(el.textContent || el.innerText);

                        if (str && str.match(Emoji.emojiRegEx)) { // emoji pasted
                            str = str.replace(Emoji.emojiRegEx, Emoji.emojiReplace) //.replace(/\uFE0F/g, '');
                            el.parentNode.replaceChild(cf(str), el);
                        }
                        break;
                }
                el = next;
            }
        },

        focus: function(cont, shouldScroll) {
            Emoji.editableFocus(cont, false, true);
            var el = cont.parentNode;

            if (shouldScroll) {
                var y = getXY(el)[1];
                var sc = scrollGetY();
                var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight);
                var elSize = getSize(el)[1];
                if (sc + height < y + elSize) {
                    scrollToY(y - height + elSize + 60, 100);
                } else if (sc > y) {
                    scrollToY(y - 60, 100);
                }
            }
        },

        destroy: function(optId) {
            Emoji.opts[optId].txt.blur();
            if (Emoji.opts[optId].imagesLoader) {
                Emoji.opts[optId].imagesLoader.destroy();
            }
            delete Emoji.opts[optId];
        },

        editableFocus: function(editable, obj, after, noCollapse, noForce) {
            if (!editable || (noForce && document.activeElement === editable)) {
                return false;
            }
            editable = ge(editable);
            editable.focus();
            if (editable.phonfocus) {
                editable.phonfocus();
            }
            if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
                var sel = window.getSelection();
                if (browser.opera && !browser.chrome && !after) {
                    sel.collapse(obj || editable, 0);
                } else {
                    var range = document.createRange();
                    if (obj) {
                        range.selectNode(obj);
                    } else {
                        range.selectNodeContents(editable);
                    }

                    if (browser.mozilla && editable.innerHTML === '<br>') {
                        editable.innerHTML = ''; // fix strange ff behaviour, inserting empty brs in contenteidtable
                    }

                    if (!noCollapse) {
                        range.collapse(!after);
                    }
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } else if (typeof document.body.createTextRange != 'undefined') {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(obj || editable);
                textRange.collapse(!after);
                textRange.select();
            }
        },

        getRange: function() {
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        },

        setRange: function(range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        },

        val: function(cont, value) {
            if (value === undefined) {
                return Emoji.editableVal(cont);
            } else {
                value = Emoji.emojiToHTML(value, true);
                value = value.replace(/ $/, '&nbsp;');
                if (cont.setValue) {
                    cont.setValue(value);
                    cont.phonblur && cont.phonblur();
                } else {
                    cont.innerHTML = value;
                }
                Emoji.updateStickersHints();
                var composer = data(cont, 'composer');
                if (composer && window.Composer) {
                    setTimeout(Composer.updateAutoComplete.pbind(composer));
                }
                return true;
            }
        },

        editableVal: function(cont, opts) {
            if (!cont) return '';
            if (cont.tagName == 'TEXTAREA') return val(cont);
            var el = cont.firstChild;
            var v = '';
            var contTag = new RegExp('^(DIV|P|LI|OL|TR|TD|BLOCKQUOTE)$');
            while (el) {
                switch (el.nodeType) {
                    case 3:
                        var str = el.data.replace(/^\n|\n$/g, ' ').replace(/[\n\xa0]/g, ' ').replace(/[ ]+/g, ' ');
                        v += str;
                        break;
                    case 1:
                        var str = Emoji.editableVal(el);
                        if (el.tagName && el.tagName.match(contTag) && str) {
                            if (str.substr(-1) != '\n') {
                                str += '\n';
                            }

                            var prev = el.previousSibling;
                            while (prev && prev.nodeType == 3 && trim(prev.nodeValue) == '') {
                                prev = prev.previousSibling;
                            }
                            if (prev && !(prev.tagName && (prev.tagName.match(contTag) || prev.tagName == 'BR'))) {
                                str = '\n' + str;
                            }

                        } else if (el.tagName == 'IMG') {
                            var code = Emoji.getCode(el);
                            if (code) {
                                if (opts && opts.saveEmoji) {
                                    str += Emoji.getEmojiHTML(code);
                                } else {
                                    str += Emoji.codeToChr(code);
                                }
                            }
                        } else if (el.tagName == 'BR') {
                            str += '\n';
                        }
                        v += str;
                        break;
                }
                el = el.nextSibling;
            }
            return v;
        },

        cssEmoji: {
            'D83DDE0A': [0, ':-)'],
            'D83DDE03': [1, ':-D'],
            'D83DDE09': [2, ';-)'],
            'D83DDE06': [3, 'xD'],
            'D83DDE1C': [4, ';-P'],
            'D83DDE0B': [5, ':-p'],
            'D83DDE0D': [6, '8-)'],
            'D83DDE0E': [7, 'B-)'],
            'D83DDE12': [8, ':-('],
            'D83DDE0F': [9, ';-]'],
            'D83DDE14': [10, '3('],
            'D83DDE22': [11, ':\'('],
            'D83DDE2D': [12, ':_('],
            'D83DDE29': [13, ':(('],
            'D83DDE28': [14, ':o'],
            'D83DDE10': [15, ':|'],
            'D83DDE0C': [16, '3-)'],
            'D83DDE20': [17, '>('],
            'D83DDE21': [18, '>(('],
            'D83DDE07': [19, 'O:)'],
            'D83DDE30': [20, ';o'],
            'D83DDE33': [21, '8|'],
            'D83DDE32': [22, '8o'],
            'D83DDE37': [23, ':X'],
            'D83DDE1A': [24, ':-*'],
            'D83DDE08': [25, '}:)'],
            '2764': [26, '<3'],
            'D83DDC4D': [27, ':like:'],
            'D83DDC4E': [28, ':dislike:'],
            '261D': [29, ':up:'],
            '270C': [30, ':v:'],
            'D83DDC4C': [31, ':ok:']
        },
        imgEmoji: {
            'D83DDE15': 1,
            'D83DDE1F': 1,
            'D83DDE2E': 1,
            'D83DDE34': 1
        },

        getEmojiHTML: function(code, symbol, enabled, is_tab) {

            if (code.match(Emoji.emojiJoinersRegEx)) {
                code = code.replace('FE0F', '') + 'FE0F';

                if (!inArray(code, Emoji.emojiWithJoiners)) {
                    var smiles = code.replace('FE0F', '').split(Emoji.emojiJoinersRegEx);
                    var out = '';
                    for (var i = 0; i < smiles.length; i++) {
                        if (!smiles[i]) {
                            continue;
                        }
                        out += Emoji.getEmojiHTML(smiles[i], Emoji.codeToChr(smiles[i]), enabled, is_tab);
                    }
                    return out;
                } else if (symbol) {
                    symbol = symbol.replace(/\uFE0F/g, '');
                    symbol += Emoji.codeToChr('FE0F');
                }
            }

            var editable = (browser.msie && intval(browser.version) > 8) ? ' contenteditable="false"' : '';
            if (Emoji.cssEmoji[code] != undefined) {
                var num = -Emoji.cssEmoji[code][0] * 17;
                return '<img' + editable + ' src="/images/blank.gif" emoji="' + code + '" ' + (symbol ? 'alt="' + symbol + '"' : symbol) + ' class="emoji_css" style="background-position: 0px ' + num + 'px;" />';
            } else {
                if (!Emoji.imgEmoji[code] && symbol && !enabled) {
                    return symbol;
                } else if (is_tab) {
                    var code_lower_case = code.toLowerCase();
                    var spriteId = parseInt(code_lower_case, 16) % Emoji.EMOJI_SPRITES_NUM;
                    return '<i class="emoji emoji_sprite_' + spriteId + ' emoji_' + code_lower_case + '" emoji="' + code + '" ' + (symbol ? 'alt="' + symbol + '"' : '') + '></i>';
                } else {
                    return '<img class="emoji" ' + (symbol ? 'alt="' + symbol + '"' : '') + ' src="/images/emoji/' + code + (window.devicePixelRatio >= 2 ? '_2x' : '') + '.png" />';
                }
            }
        },

        codeToChr: function(code) {
            var len = Math.round(code.length / 4);
            var chr = '';
            var i = 0;
            while (len--) {
                chr += String.fromCharCode(parseInt(code.substr(i, 4), 16))
                i += 4;
            }
            return chr;
        },

        checkEditable: function(optId, obj, options) {
            var scH = obj.scrollHeight;
            var opts = Emoji.opts[optId];
            if (!opts) {
                return false;
            }
            if (!opts.scPaddings) {
                opts.scPaddings = intval(getStyle(obj, 'paddingTop')) + intval(getStyle(obj, 'paddingBottom'));
            }
            scH -= opts.scPaddings;
            var bl = opts.tt;
            if (scH > options.height + (browser.mozilla && opts.isChat ? 0 : 5)) {
                if (!opts.isSized) {
                    setStyle(obj, {
                        height: options.height + 'px',
                        overflowY: 'auto'
                    });
                    var sm = geByClass1('emoji_smile', opts.controlsCont);
                    var pt = geByClass1('emoji_smile_icon_promo', opts.controlsCont);
                    var ph = ge('im_upload');
                    var diff = sbWidth();
                    setStyle(sm, vk.rtl ? {
                        left: 1 + diff
                    } : {
                        right: 1 + diff
                    });
                    if (pt) {
                        setStyle(pt, vk.rtl ? {
                            left: 2 + diff
                        } : {
                            right: 2 + diff
                        });
                    }
                    if (ph) {
                        setStyle(ph.parentNode, vk.rtl ? {
                            left: 1 + diff
                        } : {
                            right: 1 + diff
                        });
                    }
                    if (bl) setStyle(bl, vk.rtl ? {
                        left: (opts.ttDiff || 31) + diff
                    } : {
                        right: (opts.ttDiff || 31) + diff
                    })
                    opts.isSized = true;
                }
            } else if (opts.isSized) {
                setStyle(obj, {
                    height: 'auto',
                    overflowY: 'hidden'
                });
                var sm = geByClass1('emoji_smile', opts.controlsCont);
                var pt = geByClass1('emoji_smile_icon_promo', opts.controlsCont);
                var ph = ge('im_upload');
                setStyle(sm, vk.rtl ? {
                    left: 1
                } : {
                    right: 1
                });
                if (pt) {
                    setStyle(pt, vk.rtl ? {
                        left: 2
                    } : {
                        right: 2
                    });
                }
                if (ph) {
                    setStyle(ph.parentNode, vk.rtl ? {
                        left: 1
                    } : {
                        right: 1
                    });
                }
                if (bl) setStyle(bl, vk.rtl ? {
                    left: (opts.ttDiff || 31)
                } : {
                    right: (opts.ttDiff || 31)
                })
                opts.isSized = false;
            }
            if (opts.onResize) {
                opts.onResize();
            }
        },

        stickersHintsShow: function(el, opts, delay) {
            if (!isVisible(el)) {
                fadeIn(el, delay);
            }
            if (!opts.stickerEventsInited) {
                var inner = el && geByClass1('_sticker_hints_inner', el);
                opts.onHintsWheel = Emoji.onWheelStickersHints.pbind(inner);
                addEvent(inner, 'DOMMouseScroll wheel', opts.onHintsWheel);
                addEvent(document, 'keydown', Emoji.stickerHintMove);
                opts.onHintsMouseDown = function() {
                    opts.hintsClicked = true;
                    setTimeout(function() {
                        delete opts.hintsClicked;
                    }, 0);
                }
                addEvent(el, 'mousedown', opts.onHintsMouseDown);
                if (opts.txt) {
                    if (opts.onTxtFocus) {
                        removeEvent(opts.txt, 'focus', opts.onTxtFocus);
                        delete opts.onTxtFocus;
                    }
                    opts.onTxtBlur = function(ev) {
                        if (opts.hintsClicked) {
                            cancelEvent(ev);
                            return true;
                        }
                        Emoji.stickersHintsHide(el, opts, delay);
                    }
                    addEvent(opts.txt, 'blur', opts.onTxtBlur);
                }
                opts.stickerEventsInited = true;
            }
            Emoji.checkStickersHintsSize(el, opts);
        },

        stickersHintsHide: function(el, opts, delay) {
            fadeOut(el, delay);
            removeEvent(document, 'keydown', Emoji.stickerHintMove);
            if (opts.onHintsMouseDown) {
                removeEvent(el, 'mousedown', Emoji.onHintsMouseDown);
            }
            if (opts.onHintsWheel) {
                var inner = el && geByClass1('_sticker_hints_inner', el);
                removeEvent(inner, 'DOMMouseScroll wheel', Emoji.onHintsWheel);
            }
            if (opts.txt) {
                if (opts.onTxtBlur) {
                    removeEvent(opts.txt, 'blur', opts.onTxtBlur);
                    delete opts.onTxtBlur;
                }
                opts.onTxtFocus = function() {
                    var stCont = opts.txt && geByClass1('_sticker_hints', domPN(opts.txt));
                    if (stCont && !isVisible(stCont)) {
                        delete opts.stickerHintsString;
                        Emoji.checkStickersKeywords(opts.id, opts, false);
                    }
                }
                addEvent(opts.txt, 'focus', opts.onTxtFocus);
            }
            delete opts.stickerEventsInited;
            delete Emoji.shownHintId;
        },

        stickerHintOver: function(el) {
            Emoji.stickerHintOut(el);
            addClass(el, 'over');
        },

        stickerHintOut: function(el) {
            each(geByClass('over', domPN(el)), function() {
                removeClass(this, 'over');
            });
        },

        stickerHintClick: function(optId, stickerId, el) {
            var opts = Emoji.opts[optId] || {},
                text = opts.txt,
                stCont = text && geByClass1('_sticker_hints', domPN(text)),
                sticker_referrer = 'suggestion_' + Emoji.getStickersHintsQuery(text);

            if (stickerId < 0) {
                Emoji.previewSticker(false, el, {
                    stickerId: -stickerId,
                    sticker_referrer: sticker_referrer
                });
            } else {
                val(text, '');
                Emoji.stickerClick(optId, stickerId, 256, el, sticker_referrer);
                if (opts.checkEditable) {
                    opts.checkEditable(optId, text);
                }
            }
            Emoji.stickersHintsHide(stCont, opts, 0);

            return false;
        },

        stickerHintKeyOver: function(optId, el) {
            Emoji.stickerHintOver(el);
            Emoji.shownHintId = optId;
        },

        stickerHintKeyOut: function(optId, el) {
            Emoji.stickerHintOut(el);
            delete Emoji.shownHintId;
        },

        stickerHintMove: function(e) {
            var optId = Emoji.shownHintId;
            if (optId === undefined) {
                return true;
            }

            var opts = Emoji.opts[optId],
                stCont = opts && geByClass1('_sticker_hints', domPN(opts.txt));
            if (stCont && isVisible(stCont)) {
                var el = geByClass1('over', stCont) || geByClass1('emoji_sticker_item', stCont);
                switch (e.keyCode) {
                    case KEY.LEFT:
                        el = domPS(el);
                        if (el) {
                            Emoji.stickerHintOver(el);
                            Emoji.checkStickersHintsScroll(el);
                        }
                        cancelEvent(e);
                        return false;
                        break;
                    case KEY.RIGHT:
                        el = domNS(el);
                        if (el) {
                            Emoji.stickerHintOver(el);
                            Emoji.checkStickersHintsScroll(el);
                        }
                        cancelEvent(e);
                        return false;
                        break;
                    case KEY.ENTER:
                        el.click();
                        cancelEvent(e);
                        return false;
                        break;
                }
            }
            return true;
        },

        checkStickersHintsSize: function(el, opts, animated) {
            if (animated) {
                addClass(el, '_margin_transition');
                removeClassDelayed(el, '_margin_transition');
            }

            setStyle(el, {
                marginLeft: 0
            });
            var gap = 10,
                hintXY = getXY(el),
                hintSize = getSize(el),
                emojiXY = opts.tt && getXY(opts.tt);

            if (opts.tt && emojiXY &&
                emojiXY[0] && hintXY[0] + hintSize[0] + gap > emojiXY[0] &&
                hintXY[1] + hintSize[1] > emojiXY[1]) {
                setStyle(el, {
                    marginLeft: emojiXY[0] - hintXY[0] - hintSize[0] - gap
                });
            }

            while (getXY(el)[0] < 0 && domFC(el)) {
                re(domFC(el));
            }
            if (!domFC(el)) {
                Emoji.stickersHintsHide(el, opts, 0);
            }
        },

        getStickersHintsQuery: function(el) {
            var str = Emoji.val(el);
            if (str.length > 30) {
                return '';
            }

            var cur = window.cur.wallLayer ? wkcur : window.cur,
                replyName = cur.reply_to && window.Wall && Wall.getReplyName(cur.reply_to[0]);
            if (replyName && replyName[1]) {
                str = str.replace(new RegExp('^(' + escapeRE(replyName[1]) + ')'), '');
            }

            each(Emoji.cssEmoji, function(code, data) {
                var re = new RegExp('(\\s|^)(' + escapeRE(data[1]) + (data[1][data[1].length - 1] == ')' ? '+' : '') + ')([\\s\\.,]|$)', 'g');
                str = str.replace(re, function(match, pre, smile, space) {
                    return (pre || '') + Emoji.codeToChr(code) + (space || '');
                });
            });
            str = str.replace(/^[\s\uFEFF\xA0]+|[\.!\?\n]+$/g, '').toLowerCase().replace('�', '�');

            return str;
        },

        checkStickersKeywords: function(optId, opts, force) {
            if (opts.noStickers || !window.stickersKeywords ||
                !window.stickersKeywordsData || !window.stickersKeywordsData.length) {
                return false;
            }

            var delay = force ? 0 : 100,
                text = opts.txt,
                stCont = geByClass1('_sticker_hints', domPN(text)),
                showHints = function() {
                    var str = Emoji.getStickersHintsQuery(text);
                    if (!stCont) {
                        stCont = Emoji.initStickersHints(text);
                        if (!stCont) {
                            return false;
                        }
                    }
                    if (str == opts.stickerHintsString) return;
                    if (str && stickersKeywords[str] && stickersKeywords[str].length) {
                        var stickers = Emoji.sortStickersHints(text, stickersKeywords[str]),
                            stickerSize = (window.devicePixelRatio >= 2) ? '128' : '64',
                            html = '';
                        each(stickers, function() {
                            html += rs(Emoji.hintsStickerItem(), {
                                optId: optId,
                                selId: 0,
                                stickerId: Math.abs(this),
                                class: (this < 0 ? 'promo' : ''),
                                onclick: 'Emoji.stickerHintClick(' + optId + ', ' + this + ', this)',
                                stickerSize: stickerSize
                            });
                        });
                        Emoji.showStickersHints(stCont, opts, html);
                    } else {
                        Emoji.stickersHintsHide(stCont, opts, delay);
                    }
                    opts.stickerHintsString = str;
                }
            if (force) {
                showHints();
            } else {
                clearTimeout(opts.stickerHintTT);
                opts.stickerHintTT = setTimeout(showHints, stCont && isVisible(stCont) ? 0 : 200);
            }
        },

        showStickersHints: function(stCont, opts, html) {
            var inner = stCont && geByClass1('_sticker_hints_inner', stCont);
            if (!inner || opts.noStickers) {
                return false;
            }

            val(inner, html);
            Emoji.stickersHintsShow(stCont, opts, 100);
            inner.scrollLeft = 0;
            Emoji.checkStickersHintsScroll(stCont, inner.scrollLeft);
        },

        checkStickersHintsScroll: function(el, newLeft) {
            var stCont = domClosest('_sticker_hints', el),
                inner = stCont && geByClass1('_sticker_hints_inner', stCont),
                arrowLeft = stCont && geByClass1('_sticker_left', stCont),
                arrowRight = stCont && geByClass1('_sticker_right', stCont);
            if (!inner) {
                return false;
            }

            if (hasClass(el, 'emoji_sticker_item')) {
                var maxLeft = el.offsetLeft - 8 - getSize(arrowLeft)[0],
                    minLeft = el.offsetLeft + getSize(el)[1] + 2 + getSize(arrowRight)[0] - inner.clientWidth;
                if (inner.scrollLeft > maxLeft) {
                    inner.scrollLeft = maxLeft;
                }
                if (inner.scrollLeft < minLeft) {
                    inner.scrollLeft = minLeft;
                }
                newLeft = inner.scrollLeft;
            }

            toggle(arrowLeft, newLeft > 0);
            toggle(arrowRight, newLeft + inner.clientWidth < inner.scrollWidth);
        },

        scrollStickersHints: function(el, dir, ev) {
            var stCont = domClosest('_sticker_hints', el),
                inner = stCont && geByClass1('_sticker_hints_inner', stCont),
                arrowLeft = stCont && geByClass1('_sticker_left', stCont),
                arrowRight = stCont && geByClass1('_sticker_right', stCont);;
            if (!inner) {
                return false;
            }

            var newLeft = inner.scrollLeft + dir * (inner.clientWidth - 2 * getSize(el)[0]),
                hints = geByClass('emoji_sticker_item', inner);
            each(hints, function(i, el) {
                if (dir > 0 && el.offsetLeft - 8 - getSize(arrowLeft)[0] > newLeft) {
                    newLeft = hints[i - 1] && hints[i - 1].offsetLeft - 8 - getSize(arrowLeft)[0] || newLeft;
                    return false;
                } else if (dir < 0 && el.offsetLeft + getSize(el)[1] + 2 + getSize(arrowRight)[0] - inner.clientWidth > newLeft) {
                    newLeft = el.offsetLeft + getSize(el)[1] + 2 + getSize(arrowRight)[0] - inner.clientWidth || newLeft;
                    return false;
                }
            });
            newLeft = Math.max(0, Math.min(inner.scrollWidth - inner.clientWidth, newLeft));
            animate(inner, {
                scrollLeft: newLeft
            }, {
                duration: Math.abs(inner.scrollLeft - newLeft) + 50,
                transition: Fx.Transitions.easeOutCubic
            });
            Emoji.checkStickersHintsScroll(inner, newLeft);
        },

        onWheelStickersHints: function(inner, ev) {
            var delta;
            if (ev.type == 'wheel') { // gecko >= 17, webkit
                delta = (Math.abs(ev.deltaY) > Math.abs(ev.deltaX)) ? -ev.deltaY : -ev.deltaX;
            } else if (ev.wheelDeltaY !== void(0)) { // presto, old webkit
                delta = ev.wheelDeltaY;
            } else if (ev.wheelDelta !== void(0)) { // ie 8 - 11
                delta = ev.wheelDelta;
            } else if (ev.detail && ev.axis === 2) { // gecko < 17
                delta = -ev.detail;
            }
            if (Math.abs(delta) >= 120) {
                delta = 74 * Math.max(-1, Math.min(1, delta));
            }
            inner.scrollLeft -= delta;
            Emoji.checkStickersHintsScroll(inner, inner.scrollLeft);
            cancelEvent(ev);
        },

        sortStickersHints: function(el, stickers) {
            var recent = (Emoji.stickers[-1] || {}).stickers || [],
                result = [],
                added = {};

            each(recent, function() {
                if (inArray(this[0], stickers)) {
                    result.push(this[0]);
                    added[this[0]] = 1;
                }
            });

            each(stickers, function() {
                if (!added[this]) {
                    result.push(this);
                }
            });

            return result;
        },

        initStickersHints: function(el) {
            if (!el) {
                return false;
            }

            return domPN(el).insertBefore(se('<div class="_sticker_hints sticker_hints_tt"><div class="sticker_hints_arrow sticker_left _sticker_left" onclick="Emoji.scrollStickersHints(this, -1, event)"></div><div class="_sticker_hints_inner sticker_hints_inner"></div><div class="sticker_hints_arrow sticker_right _sticker_right" onclick="Emoji.scrollStickersHints(this, 1, event)"></div></div>'), el);
        },

        updateStickersHints: function(force) {
            if (Emoji.opts) {
                each(Emoji.opts, function(optId, opts) {
                    if (force) {
                        delete opts.stickerHintsString;
                    }
                    Emoji.checkStickersKeywords(optId, opts, true);
                });
            }
        },

        initStickersKeywords: function() {
            if (!window.stickersKeywordsData) {
                var data = ls.get('stickers_keywords');
                if (data && data.time && data.time > vkNow() - 86400000 * (2 + Math.random())) {
                    window.stickersKeywordsData = data.keywords;
                }
            }
            if (window.stickersKeywordsData) {
                Emoji.setStickersKeywords(window.stickersKeywordsData);
            }
        },

        cachedStickersKeywordsTime: function() {
            var data = ls.get('stickers_keywords');
            return data && data.time ? Math.floor(data.time / 1000) : 0;
        },

        setStickersKeywords: function(keywords, update) {
            if (!keywords) {
                return false;
            }

            window.stickersKeywords = {};

            var el = ce('div');
            var sep = '\n';
            var acc = [];
            var str = '';

            keywords.forEach(function(item) {
                var words = item.words || [];
                var user = item.user_stickers || [];
                var promo = item.promoted_stickers || [];
                var res = user.concat(promo.map(function(id) {
                    return -id;
                }));

                words.forEach(function(word) {
                    str += sep + word;
                    acc.push(res);
                });
            });

            val(el, str);

            str = el.textContent || el.innerText;

            str && str.slice(sep.length).split(sep).forEach(function(word, i) {
                window.stickersKeywords[word] = acc[i];
            });

            if (!Emoji.stickers[-1]) {
                var recent = ls.get('recent_stickers');
                if (recent) {
                    Emoji.stickers[-1] = recent;
                }
            }

            if (update) {
                ls.set('stickers_keywords', {
                    time: vkNow(),
                    keywords: keywords
                });
                Emoji.updateStickersHints(true);
            }
        },

        emojiEnter: function(optId, e) {
            var opts = Emoji.opts[optId],
                ctrlSend = (opts.ctrlSend ? opts.ctrlSend() : opts.noEnterSend) || (cur.ctrl_submit && !opts.noCtrlSend);
            if (
                opts.emojiFocused &&
                opts.emojiOvered &&
                opts.openedByTabKey &&
                (ctrlSend ? !(e.ctrlKey || browser.mac && e.metaKey) : !e.shiftKey)
            ) {
                if (opts.curTab === 0) {
                    var img = geByTag1('img', opts.emojiOvered) || geByTag1('i', opts.emojiOvered);
                    Emoji.addEmoji(optId, Emoji.getCode(img), opts.emojiOvered);
                }
                return cancelEvent(e);
            }
            return true;
        },

        insertHTML: function(html) {
            if (browser.msie && parseInt(browser.version) < 12) {
                if (document.selection) {
                    var r = document.selection.createRange();
                    if (r.pasteHTML) {
                        r.pasteHTML(html);
                    }
                } else {
                    var r = document.getSelection().getRangeAt(0);
                    var n = document.createElement("span");
                    r.surroundContents(n);
                    n.innerHTML = html;
                    r.collapse(false);
                }
            } else {
                if (html) {
                    document.execCommand('insertHTML', false, html);
                }
            }
        },

        addEmoji: function(optId, code, obj) {
            if (optId === false || code === false) {
                return false;
            }
            var opts = Emoji.opts[optId];
            if (vkNow() - opts.ttShowT < Emoji.CLICK_DELAY) {
                return
            }
            if (opts.editable) {
                var img = Emoji.getEmojiHTML(code, Emoji.codeToChr(code), true);
                var editable = opts.txt;
                var sel = window.getSelection ? window.getSelection() : false;
                if (sel && sel.rangeCount) {
                    r = sel.getRangeAt(0);
                    if (r.commonAncestorContainer) {
                        var rCont = r.commonAncestorContainer;
                    } else {
                        var rCont = r.parentElement ? r.parentElement() : r.item(0);
                    }
                } else {
                    var rCont = false;
                }
                el = rCont;
                while (el && el != editable) {
                    el = el.parentNode;
                }
                var edLast = (editable.lastChild || {});
                if (browser.mozilla && edLast.tagName == 'BR' && !edLast.previousSibling) {
                    re(editable.lastChild);
                }
                if (!el) {
                    Emoji.editableFocus(editable, false, true);
                }
                Emoji.insertHTML(img);
                var emojies = geByClass('emoji', editable);
                emojies.push.apply(emojies, geByClass('emoji_css', editable));
                for (i in emojies) {
                    var prev = emojies[i].previousSibling;
                    if (prev && prev.nodeType == 3 && prev.textContent && prev.textContent.charCodeAt(0) == 32) {
                        var p = prev.previousSibling;
                        if (p && p.nodeType == 3 && p.textContent && p.textContent.charCodeAt(p.textContent.length - 1) == 160) {
                            re(prev);
                        }
                    }
                }
                if (editable.check) editable.check();
                setTimeout(Emoji.correctCaret.pbind(editable), 5);
            } else {
                var textArea = opts.txt;
                var val = textArea.value;
                if (browser.iphone || browser.ipad) {
                    var text = Emoji.codeToChr(code);
                } else {
                    var text = Emoji.cssEmoji[code][1] + ' ';
                }
                var endIndex, range;
                if (textArea.selectionStart != undefined && textArea.selectionEnd != undefined) {
                    endIndex = textArea.selectionEnd;
                    textArea.value = val.slice(0, textArea.selectionStart) + text + val.slice(endIndex);
                    textArea.selectionStart = textArea.selectionEnd = endIndex + text.length;
                } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
                    textArea.focus();
                    range = document.selection.createRange();
                    range.text = text;
                    range.select();
                }
            }
            if (opts.checkEditable) {
                opts.checkEditable(optId, opts.txt);
            }
            Emoji.checkStickersKeywords(optId, opts);
            if (opts.saveDraft) {
                opts.saveDraft();
            }
            Emoji.incrRecentEmojiRate(optId, code);
        },

        showShadow: function() {
            return !(browser.msie && browser.version < 10);
        },

        scrollToggleArrow: function(isShow, side, opts, noAnim) {
            var s = geByClass1('emoji_tabs_' + side + '_s', opts.tt)
            if (noAnim) {
                (isShow ? show : hide)(s);
            } else if (isShow) {
                fadeIn(s, 200);
            } else {
                fadeOut(s, 200);
            }
            opts[side + 'Shown'] = isShow;
        },

        scrollTabs: function(optId, right) {
            var opts = Emoji.opts[optId];
            if (!opts) {
                return;
            }
            var cont = geByClass1('emoji_tabs_wrap', opts.tt);
            var maxScroll = cont.firstChild.clientWidth - cont.clientWidth;
            if (right) {
                var mPos = right == 2 ? cont.scrollLeft : cont.scrollLeft + 5 * 34;
                if (mPos >= maxScroll) {
                    mPos = maxScroll;
                    var rs = geByClass1('emoji_tabs_r_s', opts.tt)
                    fadeOut(rs, 200);
                    opts.rShown = false;
                    Emoji.scrollToggleArrow(false, 'r', opts);
                }
                if (mPos && !opts.lShown) {
                    Emoji.scrollToggleArrow(true, 'l', opts);
                }
            }
            if (!right || right == 2) {
                var mPos = right == 2 ? cont.scrollLeft : Math.max(cont.scrollLeft - 5 * 34, 0);
                if (mPos <= 0) {
                    mPos = 0;
                    Emoji.scrollToggleArrow(false, 'l', opts);
                }
                if (mPos < maxScroll && !opts.rShown) {
                    Emoji.scrollToggleArrow(true, 'r', opts);
                }
            }
            if (right == 2) { // update arrows only
                return;
            }
            opts.scrollLeft = mPos;
            animate(cont, {
                scrollLeft: mPos
            }, 300);
        },

        scrollToTab: function(tabId, optId) {
            var opts = Emoji.opts[optId],
                tt = opts.tt;
            var cont = geByClass1('emoji_tabs_wrap', tt);
            var tab = geByClass1('emoji_tab_' + tabId, tt);
            if (!tab) {
                return;
            }
            var tween = data(cont, 'tween');
            if (tween && tween.isTweening && tabId == opts.curTab) {
                return;
            }
            var tabWidth = getSize(tab)[0];
            var tabPos = tab.offsetLeft,
                contW = getSize(cont)[0];
            var centerPos = tabPos - contW / 2 + 10;

            if (tabPos + tabWidth < cont.scrollLeft) {
                cont.scrollLeft = Math.max(tabPos, cont.scrollLeft - contW / 2);
            } else if (tabPos + tabWidth - cont.scrollLeft > contW) {
                cont.scrollLeft = Math.min(tabPos + tabWidth - cont.scrollLeft, cont.scrollLeft + contW / 2);
            }

            animate(cont, {
                scrollLeft: centerPos
            }, 300, function() {
                Emoji.scrollTabs(optId, 2);
            });
            Emoji.selectTab(optId, tabId, tab);
        },

        selectTab: function(optId, selId, obj) {
            var opts = Emoji.opts[optId],
                tt = opts.tt;
            var tabsCont = geByClass1('emoji_tabs', tt);
            var selEl = geByClass1('emoji_tab_sel', tabsCont);

            removeClass(selEl, 'emoji_tab_sel');
            addClass(obj, 'emoji_tab_sel');
            opts.curTab = selId;
            cur.stickersTab = selId;
            ls.set('stickers_tab', selId);
        },

        tabsWheel: function(e, optId) {
            cancelEvent(e);

            var opts = Emoji.opts[optId];
            var delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            var cont = geByClass1('emoji_tabs_wrap', opts.tt);

            var curScroll = cont.scrollLeft;
            cont.scrollLeft += delta;
            if (curScroll == cont.scrollLeft) {
                return;
            }

            Emoji.scrollTabs(optId, 2);
        },

        show: function(obj, ev) {
            var optId = data(domPN(obj), 'optId');
            if (isUndefined(optId)) return;
            Emoji.ttShow(optId, obj, ev);
        },

        hide: function(obj, ev, force) {
            var optId = data(domPN(obj), 'optId');
            if (isUndefined(optId)) return;
            Emoji.ttHide(optId, obj, ev, force);
        },

        ttShow: function(optId, obj, ev) {
            var opts = Emoji.opts[optId];
            clearTimeout(opts.ctt);
            clearTimeout(opts.stt);
            if (opts.scrolling) {
                opts.afterScrollFn = false;
            }
            if (opts.ttShown) return;
            if (obj) opts.obj = obj;
            else obj = opts.obj;

            Emoji.ttClick(optId, obj, false, true, ev);
        },

        ttHide: function(optId, obj, ev, force) {
            var opts = Emoji.opts[optId];
            clearTimeout(opts.stt);
            if (!opts.ttShown) return;
            if (opts.scrolling) {
                opts.afterScrollFn = Emoji.ttHide.pbind(optId, obj, ev, force);
                return;
            }
            obj = obj || opts.obj || geByClass1('emoji_smile', opts.controlsCont);
            var hideTT = function() {
                Emoji.ttClick(optId, obj, true, false, ev);
            }
            var showT = opts.ttShowT || 0;
            if (force || vkNow() - showT < 200) {
                hideTT();
            } else {
                clearTimeout(opts.ctt);
                opts.ctt = setTimeout(hideTT, 300);
            }
        },

        ttClick: function(optId, obj, needHide, needShow, ev, tabKey) {
            var opts = Emoji.opts[optId];
            if (!opts) {
                return;
            }
            if ((needHide && !Emoji.shown) || (needShow && Emoji.shown)) {
                return;
            }
            if (!obj) {
                obj = Emoji.shown || ge((cur.peer == -3) ? 'imw_smile' : 'im_smile');
                if (!obj) return;
            }
            if (obj.tt && obj.tt.destroy) {
                obj.tt.destroy();
            }
            if (!opts.tt && opts.sharedTT && opts.sharedTT.emojiTT) {
                opts.tt = opts.sharedTT.emojiTT;
                opts.emojiScroll = opts.sharedTT.emojiScroll;
                opts.allEmojiId = opts.sharedTT.emojiAllId;
            }
            var tt = opts.tt;
            if (!tt) {
                var prevTab = ls.get('stickers_tab');
                if (!prevTab) {
                    prevTab = Emoji.TAB_EMOJI;
                }
                opts.curTab = cur.stickersTab = Emoji.TAB_EMOJI;
                if (prevTab != Emoji.TAB_EMOJI && !opts.noStickers) {
                    Emoji.stickers[Emoji.TAB_RECENT_STICKERS] = ls.get('recent_stickers');
                    opts.curTab = cur.stickersTab = prevTab;
                }
                var tabs = '<div class="emoji_tabs_l_s" onclick="Emoji.scrollTabs(' + optId + ', 0);"><div class="emoji_sprite emoji_tabs_l_sc"></div><div class="emoji_sprite emoji_tabs_l_si"></div></div><div class="emoji_tabs_r_s" onclick="Emoji.scrollTabs(' + optId + ', 1);"><div class="emoji_sprite emoji_tabs_r_sc"></div><div class="emoji_sprite emoji_tabs_r_si"></div></div>';
                tabs += Emoji.getTabsCode([
                    [0, 1]
                ], optId);
                tabs += '<span class="emoji_tabs_wrap"><span id="emoji_tabs_cont_' + optId + '" class="emoji_tabs_cont">';
                if (!opts.noStickers && window.emojiStickers !== false && window.emojiStickers !== undefined) {
                    tabs += Emoji.getTabsCode(window.emojiStickers, optId);
                }
                var classAddr = '';
                var shopEvents = 'onclick="Emoji.showStickersStore(' + optId + ');"';
                var shopHint = 'showTooltip(this, {text: \'' + getLang('global_store_stickers') + '\', shift: [4,6,6], showdt: 0, black: 1});';
                if (opts.rPointer) {
                    shopEvents += ' onmouseover="addClass(this.parentNode.parentNode.parentNode, \'emoji_shop_over\');' + shopHint + '"  onmouseout="removeClass(this.parentNode.parentNode.parentNode, \'emoji_shop_over\');"';
                } else {
                    shopEvents += ' onmouseover="' + shopHint + '"';
                }
                tabs += '</span></span>';
                if (!opts.noStickers) {
                    tabs += '<a class="fl_r emoji_shop" ' + shopEvents + '><div class="emoji_sprite emoji_shop_icon">' + (Emoji.hasNewStickers ? '<div class="emoji_shop_icon_badge">' + Math.abs(Emoji.hasNewStickers) + '</div>' : '') + '</div></a>';
                }
                if (!Emoji.showShadow()) {
                    classAddr += ' emoji_no_opacity';
                }
                if (opts.noStickers || opts.hideStickersInitial) {
                    classAddr += ' emoji_no_tabs';
                }
                var tt = ce('div', {
                    id: 'emoji_block_' + optId,
                    className: 'emoji_tt_wrap tt_down' + classAddr,
                    innerHTML: '<div class="emoji_block_cont"><div class="emoji_block_rel"><div class="emoji_list_cont"><div class="emoji_cats_title_helper"></div><div class="emoji_list"><div class="emoji_scroll emoji_scroll_smiles"></div><div class="emoji_scroll emoji_scroll_stickers"></div></div></div></div><div class="emoji_tabs clear_fix">' + tabs + '</div></div>',
                    onmouseover: function(e) {
                        if (!hasClass(tt, 'emoji_animated')) Emoji.ttShow(optId, false, e);
                    },
                    onmouseout: function(e) {
                        if (!hasClass(tt, 'emoji_animated')) Emoji.ttHide(optId, false, e);
                    }
                });
                opts.tt = tt;
                Emoji.reappendEmoji(optId, tt);
                Emoji.emojiOver(optId, geByClass1('emoji_scroll_smiles', tt).firstChild);

                each(['emoji_tabs_l_s', 'emoji_tabs_r_s', 'emoji_tabs_wrap'], function() {
                    addEvent(geByClass1(this, opts.tt), 'DOMMouseScroll wheel', function(e) {
                        Emoji.tabsWheel(e, optId);
                    });
                });

                if (opts.sharedTT) {
                    opts.sharedTT.emojiTT = tt;
                }
                Emoji.checkEmojiSlider(opts);
            }
            clearTimeout(opts.ttEmojiHide);

            if (Emoji.shownId !== false && Emoji.shownId != optId) {
                Emoji.ttClick(Emoji.shownId, geByClass1('emoji_smile', Emoji.opts[Emoji.shownId].controlsCont), true);
            }
            Emoji.preventMouseOver = false;

            if (!opts.emojiExpanded) {
                Emoji.emojiExpand(optId, tt);
            }
            if (Emoji.shown) {
                hide(tt);
                setStyle(tt, 'opacity', 0);
                var stCont = geByClass1('_sticker_hints', domPN(opts.txt));
                if (stCont && isVisible(stCont)) {
                    Emoji.checkStickersHintsSize(stCont, opts, true);
                }
                Emoji.shown = false;
                Emoji.shownId = false;
                opts.ttShown = false;
                opts.emojiFocused = false;
                cur.onMouseClick = false;
                removeEvent(document, 'keydown', Emoji.emojiMove);
                removeClass(obj, 'emoji_smile_on');
                if (opts.onHide) {
                    opts.onHide();
                }
            } else {
                opts.openedByTabKey = !!tabKey;
                show(tt);
                setStyle(tt, 'opacity', 1);
                Emoji.repositionEmoji(optId, obj, tt);

                var stCont = geByClass1('_sticker_hints', domPN(opts.txt));
                if (stCont && isVisible(stCont)) {
                    Emoji.checkStickersHintsSize(stCont, opts, true);
                }
                Emoji.shownId = optId;
                Emoji.shown = obj;
                cur.emojiList = geByClass1('emoji_list', tt);
                opts.ttShown = true;
                opts.ttShowT = vkNow();
                opts.emojiFocused = true;
                removeEvent(document, 'keydown', Emoji.emojiMove);
                setTimeout(function() {
                    cur.onMouseClick = function(e) {
                        var el = e.target;
                        while (el) {
                            if (el.id == 'im_texts' || hasClass(el, 'emoji_tt_wrap') || hasClass(el, 'imw_emoji_wrap')) {
                                return false;
                            }
                            el = el.parentNode;
                        }
                        Emoji.ttClick(optId, false, true);
                    }
                    addEvent(document, 'keydown', Emoji.emojiMove);
                }, 0);
                addClass(obj, 'emoji_smile_on');
                if (opts.emojiScroll && opts.emojiExpanded) {
                    opts.emojiScroll.update();
                    if (browser.msie && opts.curTab === 0 && opts.emojiOvered) {
                        Emoji.scrollToListEl(optId, opts.emojiOvered);
                    }
                }
                Emoji.tabSwitch(opts.curTab, opts.curTab, optId);
                opts.onRecentEmojiUpdate && opts.onRecentEmojiUpdate();

                if (opts.onShow) {
                    opts.onShow();
                }
            }
            each(geByClass('emoji_smile_icon_promo'), function(i, el) {
                removeEvent(geByClass1('emoji_smile_icon', el.parentNode), 'mouseover');
                re(el);
                Emoji.noNewStickers = true;
            });

            if (opts.noStickersStore) {
                addClass(geByClass1('emoji_tabs', 'emoji_block_' + optId), 'emoji_tabs_no_store');
            } else {
                removeClass(geByClass1('emoji_tabs', 'emoji_block_' + optId), 'emoji_tabs_no_store');
            }

            return cancelEvent(ev);
        },
        curEmojiKeys: {},
        curEmojiCats: {
            1: ['D83DDE04', 'D83DDE01', 'D83DDE0A', 'D83DDE03', 'D83EDD23', 'D83DDE06', 'D83DDE09', 'D83DDE1C', 'D83DDE0B', 'D83EDD17', 'D83DDE0D', 'D83DDE0E', 'D83DDE12', 'D83DDE0F', 'D83DDE42', 'D83DDE43', 'D83DDE14', 'D83DDE22', 'D83DDE2D', 'D83DDE29', 'D83DDE28', 'D83DDE10', 'D83DDE0C', 'D83EDD24', 'D83DDE07', 'D83DDE30', 'D83EDD27', 'D83DDE32', 'D83EDD22', 'D83DDE33', 'D83DDE37', 'D83DDE02', '2764', 'D83DDC8B', 'D83DDE1A', 'D83DDE15', 'D83DDE2F', 'D83DDE26', 'D83DDE35', 'D83DDE44', 'D83EDD14', 'D83DDE20', 'D83DDE21', 'D83DDE1D', 'D83DDE34', 'D83DDE18', 'D83DDE17', 'D83DDE19', 'D83DDE1F', 'D83DDE41', '2639', 'D83DDE2C', 'D83DDE36', 'D83EDD10', 'D83DDE2B', '263A', 'D83DDE00', 'D83DDE25', 'D83DDE1B', 'D83DDE16', 'D83DDE24', 'D83DDE23', 'D83DDE27', 'D83DDE11', 'D83DDE05', 'D83DDE2E', 'D83DDE1E', 'D83DDE13', 'D83DDE31', 'D83EDD13', 'D83EDD11', 'D83DDE2A', 'D83EDD12', 'D83EDD15', 'D83EDD25', 'D83EDD20', 'D83DDE08', 'D83DDC7F', 'D83DDC7D', 'D83DDC7B', 'D83DDE38', 'D83DDE39', 'D83DDE3C', 'D83DDE3D', 'D83DDE3E', 'D83DDE3F', 'D83DDE3B', 'D83DDE40', 'D83DDE3A', 'D83DDE48', 'D83DDE49', 'D83DDE4A', 'D83DDCA9', 'D83DDC80', 'D83DDC79', 'D83DDC7A'],
            2: ['D83CDF31', 'D83CDF32', 'D83CDF33', 'D83CDF34', 'D83CDF37', 'D83CDF38', 'D83CDF45', 'D83CDF46', 'D83CDF47', 'D83CDF48', 'D83CDF49', 'D83CDF4A', 'D83CDF4B', 'D83CDF4C', 'D83CDF4D', 'D83CDF4E', 'D83CDF4F', 'D83CDF50', 'D83CDF51', 'D83DDC00', 'D83DDC01', 'D83DDC02', 'D83DDC03', 'D83DDC04', 'D83DDC05', 'D83DDC06', 'D83DDC07', 'D83DDC08', 'D83DDC09', 'D83DDC0A', 'D83DDC0B', 'D83DDC0C', 'D83DDC0D', 'D83DDC0E', 'D83DDC0F', 'D83DDC10', 'D83DDC11', 'D83DDC12', 'D83DDC13', 'D83DDC14', 'D83DDC15', 'D83DDC16', 'D83DDC17', 'D83DDC18', 'D83DDC19', 'D83DDC1A', 'D83DDC1B', 'D83DDC1C', 'D83DDC1D', 'D83DDC1E', 'D83DDC1F', 'D83DDC20', 'D83DDC21', 'D83DDC22', 'D83DDC23', 'D83DDC24', 'D83DDC25', 'D83DDC26', 'D83DDC27', 'D83DDC28', 'D83DDC2A', 'D83DDC2B', 'D83DDC2C', 'D83DDC2D', 'D83DDC2E', 'D83DDC2F', 'D83DDC30', 'D83DDC32', 'D83DDC33', 'D83DDC34', 'D83DDC35', 'D83DDC36', 'D83DDC37', 'D83DDC38', 'D83DDC39', 'D83DDC3A', 'D83DDC3B', 'D83DDC3C', 'D83DDC3D', 'D83DDC3E', 'D83CDF30', 'D83CDF35', 'D83CDF39', 'D83CDF3A', 'D83CDF3B', 'D83CDF3C', 'D83CDF3D', 'D83CDF3E', 'D83CDF3F', 'D83CDF40', 'D83CDF41', 'D83CDF42', 'D83CDF43', 'D83CDF44', 'D83DDCA6', 'D83DDCA7', 'D83EDD89', 'D83EDD8D', 'D83EDD8F', 'D83EDD8B', 'D83EDD8A', 'D83EDD88', 'D83EDD85', 'D83EDD86', 'D83EDD87', 'D83EDD8E', 'D83EDD90', 'D83EDD91', 'D83EDD40', 'D83EDD8C'],
            3: ['D83DDC4D', 'D83DDC4E', '261D', '270C', 'D83DDC4C', 'D83DDD95D83CDFFB', 'D83EDD18D83CDFFB', 'D83DDC4F', 'D83DDC4A', 'D83DDCAA', '270B', 'D83DDD90D83CDFFB', 'D83DDD96D83CDFFB', 'D83DDE4F', 'D83DDE4C', '270A', 'D83DDC46', 'D83DDC47', 'D83DDC48', 'D83DDC49', 'D83DDC4B', 'D83DDC50', 'D83EDD1ED83CDFFB', 'D83EDD1D', 'D83EDD19D83CDFFB', 'D83EDD1BD83CDFFB', 'D83EDD1CD83CDFFB', 'D83DDC40', 'D83DDC42', 'D83DDC43', '270DD83CDFFB', 'D83DDC45', 'D83DDC6B', 'D83DDC6C', 'D83DDC6D', 'D83DDC8F', 'D83DDC91', 'D83DDC6F', 'D83DDC6A', 'D83DDC70', 'D83DDC66', 'D83DDC67', 'D83DDC68', 'D83DDC69', 'D83DDC71', 'D83DDC6E', 'D83DDC72', 'D83DDC73', 'D83DDC82', 'D83DDC74', 'D83DDC75', 'D83DDC76', 'D83DDC77', 'D83DDC78', 'D83DDC7C', 'D83DDE47', 'D83EDD30D83CDFFB', 'D83DDC85', 'D83DDC84', 'D83DDC44', 'D83DDC83', 'D83CDF8E', 'D83CDF85', 'D83DDEB6', 'D83DDC71200D2640FE0F', 'D83DDC6E200D2640FE0F', 'D83DDC77200D2640FE0F', 'D83DDD75200D2640FE0F', 'D83DDE47200D2640FE0F', 'D83DDE4B200D2642FE0F', 'D83DDE4B', 'D83DDC81200D2642FE0F', 'D83DDC81', 'D83DDE45200D2642FE0F', 'D83DDE45', 'D83DDE46200D2642FE0F', 'D83DDE46', 'D83DDE4E200D2642FE0F', 'D83DDE4E', 'D83DDC86200D2642FE0F', 'D83DDC86', 'D83DDC87200D2642FE0F', 'D83DDC87', 'D83EDD37D83CDFFB200D2642FE0F', 'D83EDD37D83CDFFB200D2640FE0F', 'D83EDD26D83CDFFB200D2642FE0F', 'D83EDD26200D2640FE0F', 'D83DDE4D200D2642FE0F', 'D83DDEB6200D2640FE0F', 'D83EDD33D83CDFFB', 'D83CDFC3200D2640FE0F', 'D83DDC6F200D2642FE0F', 'D83CDFCC200D2640FE0F', 'D83DDC31', 'D83EDD21', 'D83DDD7A', 'D83DDC73200D2640FE0F', 'D83DDC82200D2640FE0F', 'D83EDD35', 'D83EDD34', 'D83EDD39200D2642FE0F', 'D83EDD39200D2640FE0F', 'D83DDC68200D2696FE0F', 'D83DDC69200D2696FE0F', 'D83DDC68200D2708FE0F', 'D83DDC69200D2708FE0F', 'D83DDC68200DD83DDE92FE0F', 'D83DDC69200DD83DDE92FE0F', 'D83DDC68200DD83CDFA4FE0F', 'D83DDC69200DD83CDFA4FE0F', 'D83DDC68200DD83CDF93FE0F', 'D83DDC69200DD83CDF93FE0F', 'D83DDC68200DD83CDFEBFE0F', 'D83DDC69200DD83CDFEBFE0F', 'D83DDC68200DD83CDF3EFE0F', 'D83DDC69200DD83CDF3EFE0F', 'D83DDC68200DD83CDF73FE0F', 'D83DDC69200DD83CDF73FE0F', 'D83DDC68200DD83DDD27FE0F', 'D83DDC69200DD83DDD27FE0F', 'D83DDC68200DD83CDFEDFE0F', 'D83DDC69200DD83CDFEDFE0F', 'D83DDC68200DD83DDCBCFE0F', 'D83DDC69200DD83DDCBCFE0F', 'D83DDC68200DD83DDD2CFE0F', 'D83DDC69200DD83DDD2CFE0F', 'D83DDC68200DD83DDCBBFE0F', 'D83DDC69200DD83DDCBBFE0F', 'D83DDC68200DD83CDFA8FE0F', 'D83DDC69200DD83CDFA8FE0F', 'D83DDC68200DD83DDE80FE0F', 'D83DDC69200DD83DDE80FE0F', 'D83DDC68200D2695FE0F', 'D83DDC69200D2695FE0F'],
            4: ['D83CDF52', 'D83CDF53', 'D83CDF54', 'D83CDF55', 'D83CDF56', 'D83CDF57', 'D83CDF5A', 'D83CDF5B', 'D83CDF5C', 'D83CDF5D', 'D83CDF5E', 'D83CDF5F', 'D83CDF60', 'D83CDF61', 'D83CDF62', 'D83CDF63', 'D83CDF64', 'D83CDF65', 'D83CDF66', 'D83CDF67', 'D83CDF68', 'D83CDF69', 'D83CDF6A', 'D83CDF6B', 'D83CDF6C', 'D83CDF6D', 'D83CDF6E', 'D83CDF6F', 'D83CDF70', 'D83CDF71', 'D83CDF72', 'D83CDF73', 'D83CDF74', 'D83CDF75', 'D83CDF76', 'D83CDF77', 'D83CDF78', 'D83CDF79', 'D83CDF7A', 'D83CDF7B', 'D83CDF7C', 'D83EDD59', 'D83EDD5D', 'D83EDD5C', 'D83EDD58', 'D83EDD57', 'D83EDD56', 'D83EDD53', 'D83EDD50', 'D83EDD42', 'D83EDD51', 'D83EDD43', 'D83EDD55', 'D83EDD54', 'D83EDD52', 'D83EDD5E', 'D83EDD5A', 'D83EDD5B'],
            5: ['26BD', '26BE', 'D83CDFAF', 'D83CDFB1', 'D83CDFBD', 'D83CDFBE', 'D83CDFBF', 'D83CDFC0', 'D83CDFC1', 'D83CDFC2', 'D83CDFC3', 'D83CDFC4', 'D83CDFC6', 'D83CDFC7', 'D83CDFC8', 'D83CDFC9', 'D83CDFCA', 'D83DDC5F', 'D83DDEA3', 'D83DDEB4', 'D83DDEB5', '26F3', '26EA', 'D83EDD3DD83CDFFB200D2642FE0F', 'D83EDD3DD83CDFFB200D2640FE0F', 'D83EDD3ED83CDFFB200D2642FE0F', 'D83EDD3C200D2642FE0F', 'D83EDD38D83CDFFB200D2642FE0F', 'D83CDFCB200D2640FE0F', '26F9200D2640FE0F', 'D83CDFC4200D2640FE0F', 'D83CDFCA200D2640FE0F', 'D83DDEB5200D2640FE0F', 'D83DDEB4200D2640FE0F', 'D83EDD3A', 'D83DDEF4', 'D83DDEF6', 'D83EDD4A', 'D83EDD4B', 'D83EDD45', 'D83EDD41'],
            6: ['D83DDE85', 'D83DDE86', 'D83DDE87', 'D83DDE88', 'D83DDE8A', 'D83DDE8C', 'D83DDE8D', 'D83DDE8E', 'D83DDE8F', 'D83DDE90', 'D83DDE91', 'D83DDE92', 'D83DDE93', 'D83DDE94', 'D83DDE95', 'D83DDE96', 'D83DDE97', 'D83DDE98', 'D83DDE99', 'D83DDE9A', 'D83DDE9B', 'D83DDE9C', 'D83DDE9D', 'D83DDE9E', 'D83DDE9F', 'D83DDEA0', 'D83DDEA1', 'D83DDEA4', 'D83DDEA7', 'D83DDEA8', '26F5', 'D83DDE80', 'D83DDE81', 'D83DDE82', 'D83DDE83', 'D83DDE84', '26FD', '2708', 'D83DDEF5', 'D83CDFDC'],
            7: ['23F0', '23F3', '260E', '2615', '267B', '26A1', '2702', '2709', '270F', '2712', 'D83CDC04', 'D83CDCCF', 'D83CDF02', 'D83CDF1F', 'D83CDF80', 'D83CDF81', 'D83CDF82', 'D83CDF83', 'D83CDF84', 'D83CDF88', 'D83CDF89', 'D83CDF8A', 'D83CDF8B', 'D83CDF8C', 'D83CDF8D', 'D83CDF8F', 'D83CDF90', 'D83CDF92', 'D83CDF93', 'D83CDFA3', 'D83CDFA4', 'D83CDFA7', 'D83CDFA8', 'D83CDFA9', 'D83CDFAA', 'D83CDFAB', 'D83CDFAC', 'D83CDFAD', 'D83CDFB0', 'D83CDFB2', 'D83CDFB3', 'D83CDFB4', 'D83CDFB7', 'D83CDFB8', 'D83CDFB9', 'D83CDFBA', 'D83CDFBB', 'D83DDC51', 'D83DDC52', 'D83DDC53', 'D83DDC54', 'D83DDC55', 'D83DDC56', 'D83DDC57', 'D83DDC58', 'D83DDC59', 'D83DDC5A', 'D83DDC5B', 'D83DDC60', 'D83DDC5C', 'D83DDC5D', 'D83DDC5E', 'D83DDC61', 'D83DDC62', 'D83DDC63', 'D83DDC7E', 'D83DDC88', 'D83DDC89', 'D83DDC8A', 'D83DDC8C', 'D83DDC8D', 'D83DDC8E', 'D83DDC90', 'D83DDC92', 'D83DDCA1', 'D83DDCA3', 'D83DDCA5', 'D83DDCB0', 'D83DDCB3', 'D83DDCB4', 'D83DDCB5', 'D83DDCB6', 'D83DDCB7', 'D83DDCB8', 'D83DDCBA', 'D83DDCBB', 'D83DDCBC', 'D83DDCBD', 'D83DDCBE', 'D83DDCBF', 'D83DDCC4', 'D83DDCC5', 'D83DDCC7', 'D83DDCC8', 'D83DDCC9', 'D83DDCCA', 'D83DDCCB', 'D83DDCCC', 'D83DDCCD', 'D83DDCCE', 'D83DDCD0', 'D83DDCD1', 'D83DDCD2', 'D83DDCD3', 'D83DDCD4', 'D83DDCD5', 'D83DDCD6', 'D83DDCD7', 'D83DDCD8', 'D83DDCD9', 'D83DDCDA', 'D83DDCDC', 'D83DDCDD', 'D83DDCDF', 'D83DDCE0', 'D83DDCE1', 'D83DDCE2', 'D83DDCE6', 'D83DDCED', 'D83DDCEE', 'D83DDCEF', 'D83DDCF0', 'D83DDCF1', 'D83DDCF7', 'D83DDCF9', 'D83DDCFA', 'D83DDCFB', 'D83DDCFC', 'D83DDD06', 'D83DDD0E', 'D83DDD11', 'D83DDD14', 'D83DDD16', 'D83DDD26', 'D83DDD27', 'D83DDD28', 'D83DDD29', 'D83DDD2A', 'D83DDD2B', 'D83DDD2C', 'D83DDD2D', 'D83DDD2E', 'D83DDD31', 'D83DDDFF', 'D83DDEAA', 'D83DDEAC', 'D83DDEBD', 'D83DDEBF', 'D83DDEC0', 'D83EDD44', 'D83EDD47', 'D83EDD48', 'D83EDD49', 'D83DDED2'],
            8: ['D83DDC93', 'D83DDC94', 'D83DDC95', 'D83DDC96', 'D83DDC97', 'D83DDC98', 'D83DDC99', 'D83DDC9A', 'D83DDC9B', 'D83DDC9C', 'D83DDC9D', 'D83DDC9E', 'D83DDC9F', 'D83DDCAC', 'D83DDCAD', 'D83DDD1E', '26A0', '26D4', 'D83DDC29', 'D83CDD98', 'D83CDF1A', 'D83DDDA4', 'D83DDCA8', 'D83DDD25', '2600', '2601', '26C4', '26C5', '2728', 'D83CDF0D', 'D83CDF1B', 'D83CDF1D', 'D83CDF1E', '2604', 'D83CDF08', 'D83CDF16', '2695'],
            9: ['D83CDDE8D83CDDF3', 'D83CDDE9D83CDDEA', 'D83CDDEAD83CDDF8', 'D83CDDEBD83CDDF7', 'D83CDDECD83CDDE7', 'D83CDDEED83CDDF9', 'D83CDDEFD83CDDF5', 'D83CDDF0D83CDDF7', 'D83CDDF7D83CDDFA', 'D83CDDFAD83CDDF8', 'D83CDDFAD83CDDE6', 'D83CDDF0D83CDDFF', 'D83CDDE7D83CDDFE', 'D83CDDE6D83CDDFA', 'D83CDDE6D83CDDF9', 'D83CDDE7D83CDDEA', 'D83CDDE7D83CDDF7', 'D83CDDFBD83CDDF3', 'D83CDDEDD83CDDF0', 'D83CDDE9D83CDDF0', 'D83CDDEED83CDDF1', 'D83CDDEED83CDDF3', 'D83CDDEED83CDDE9', 'D83CDDEED83CDDEA', 'D83CDDE8D83CDDE6', 'D83CDDE8D83CDDF4', 'D83CDDF2D83CDDF4', 'D83CDDF2D83CDDFE', 'D83CDDF2D83CDDFD', 'D83CDDF3D83CDDF1', 'D83CDDF3D83CDDFF', 'D83CDDF3D83CDDF4', 'D83CDDE6D83CDDEA', 'D83CDDF5D83CDDF1', 'D83CDDF5D83CDDF9', 'D83CDDF5D83CDDF7', 'D83CDDF8D83CDDE6', 'D83CDDF8D83CDDEC', 'D83CDDF9D83CDDF7', 'D83CDDF5D83CDDED', 'D83CDDEBD83CDDEE', 'D83CDDE8D83CDDF1', 'D83CDDE8D83CDDED', 'D83CDDF8D83CDDEA', 'D83CDDFFD83CDDE6', 'D83CDFF3200DD83CDF08FE0F']
        },
        curEmojiRecent: {},
        emojiWithJoiners: ["D83DDC71200D2640FE0F", "D83DDC6E200D2640FE0F", "D83DDC77200D2640FE0F", "D83DDD75200D2640FE0F", "D83DDE47200D2640FE0F", "D83DDC81200D2642FE0F", "D83DDE45200D2642FE0F", "D83DDE46200D2642FE0F", "D83DDE4E200D2642FE0F", "D83DDE4D200D2642FE0F", "D83DDC86200D2642FE0F", "D83DDC87200D2642FE0F", "D83DDEB6200D2640FE0F", "D83CDFC3200D2640FE0F", "D83CDFCB200D2640FE0F", "26F9200D2640FE0F", "D83CDFC4200D2640FE0F", "D83CDFCA200D2640FE0F", "D83DDEB5200D2640FE0F", "D83DDEB4200D2640FE0F", "D83DDC6F200D2642FE0F", "D83CDFCC200D2640FE0F", "D83DDE4B200D2642FE0F", "D83DDC73200D2640FE0F", "D83DDC82200D2640FE0F", "D83CDFF3200DD83CDF08FE0F", "D83EDD26D83CDFFB200D2642FE0F", "D83EDD37D83CDFFB200D2640FE0F", "D83EDD37D83CDFFB200D2642FE0F", "D83EDD3DD83CDFFB200D2642FE0F", "D83EDD3DD83CDFFB200D2640FE0F", "D83EDD3ED83CDFFB200D2642FE0F", "D83EDD3C200D2642FE0F", "D83EDD38D83CDFFB200D2642FE0F", "D83EDD37200D2642FE0F", "D83EDD37D83CDFFC200D2642FE0F", "D83EDD37D83CDFFD200D2642FE0F", "D83EDD37D83CDFFE200D2642FE0F", "D83EDD37D83CDFFF200D2642FE0F", "D83EDD26200D2642FE0F", "D83EDD26D83CDFFC200D2642FE0F", "D83EDD26D83CDFFD200D2642FE0F", "D83EDD26D83CDFFE200D2642FE0F", "D83EDD26D83CDFFF200D2642FE0F", "D83EDD37200D2640FE0F", "D83EDD37D83CDFFC200D2640FE0F", "D83EDD37D83CDFFD200D2640FE0F", "D83EDD37D83CDFFE200D2640FE0F", "D83EDD37D83CDFFF200D2640FE0F", "D83EDD3D200D2642FE0F", "D83EDD3DD83CDFFC200D2642FE0F", "D83EDD3DD83CDFFD200D2642FE0F", "D83EDD3DD83CDFFE200D2642FE0F", "D83EDD3DD83CDFFF200D2642FE0F", "D83EDD3D200D2640FE0F", "D83EDD3DD83CDFFC200D2640FE0F", "D83EDD3DD83CDFFD200D2640FE0F", "D83EDD3DD83CDFFE200D2640FE0F", "D83EDD3DD83CDFFF200D2640FE0F", "D83EDD3E200D2642FE0F", "D83EDD3ED83CDFFC200D2642FE0F", "D83EDD3ED83CDFFD200D2642FE0F", "D83EDD3ED83CDFFE200D2642FE0F", "D83EDD3ED83CDFFF200D2642FE0F", "D83EDD38200D2642FE0F", "D83EDD38D83CDFFC200D2642FE0F", "D83EDD38D83CDFFD200D2642FE0F", "D83EDD38D83CDFFE200D2642FE0F", "D83EDD38D83CDFFF200D2642FE0F", "D83EDD19D83CDFFB", "D83EDD19D83CDFFC", "D83EDD19D83CDFFD", "D83EDD19D83CDFFE", "D83EDD19D83CDFFF", "D83EDD1BD83CDFFB", "D83EDD1BD83CDFFC", "D83EDD1BD83CDFFD", "D83EDD1BD83CDFFE", "D83EDD1BD83CDFFF", "D83EDD1CD83CDFFB", "D83EDD1CD83CDFFC", "D83EDD1CD83CDFFD", "D83EDD1CD83CDFFE", "D83EDD1CD83CDFFF", 'D83EDD26200D2640FE0F', 'D83EDD39200D2642FE0F', 'D83EDD39200D2640FE0F', 'D83DDC68200DD83DDE92FE0F', 'D83DDC69200DD83DDE92FE0F', 'D83DDC68200DD83CDFA4FE0F', 'D83DDC69200DD83CDFA4FE0F', 'D83DDC68200D2695FE0F', 'D83DDC69200D2695FE0F', 'D83DDC68200DD83CDF93FE0F', 'D83DDC69200DD83CDF93FE0F', 'D83DDC68200DD83CDFEBFE0F', 'D83DDC69200DD83CDFEBFE0F', 'D83DDC68200D2696FE0F', 'D83DDC69200D2696FE0F', 'D83DDC68200DD83CDF3EFE0F', 'D83DDC69200DD83CDF3EFE0F', 'D83DDC68200DD83CDF73FE0F', 'D83DDC69200DD83CDF73FE0F', 'D83DDC68200DD83DDD27FE0F', 'D83DDC69200DD83DDD27FE0F', 'D83DDC68200DD83CDFEDFE0F', 'D83DDC69200DD83CDFEDFE0F', 'D83DDC68200DD83DDCBCFE0F', 'D83DDC69200DD83DDCBCFE0F', 'D83DDC68200DD83DDD2CFE0F', 'D83DDC69200DD83DDD2CFE0F', 'D83DDC68200DD83DDCBBFE0F', 'D83DDC69200DD83DDCBBFE0F', 'D83DDC68200DD83CDFA8FE0F', 'D83DDC69200DD83CDFA8FE0F', 'D83DDC68200D2708FE0F', 'D83DDC69200D2708FE0F', 'D83DDC68200DD83DDE80FE0F', 'D83DDC69200DD83DDE80FE0F'],
        emojiLoadMore: function(optId) {
            var opts = Emoji.opts[optId];
            if (opts.emojiMoreSt) {
                return;
            }
            opts.emojiMoreSt = 1;

            var params = {
                act: 'get_emoji_list'
            };
            if (Emoji.hasNewStickers < 0) params.new_shown = 1;
            ajax.post('al_im.php', params, {
                onDone: function(stickers, recent_emoji) {
                    Emoji.stickers = stickers;
                    opts.emojiMoreSt = 0;

                    if (Emoji.stickers[-1]) {
                        ls.set('recent_stickers', Emoji.stickers[-1]);
                        Emoji.updateRecentEmoji(optId);
                    }
                    opts.allEmojiId = 0;
                    if (opts.sharedTT) {
                        opts.sharedTT.emojiAllId = 0;
                    }

                    if (Emoji.onStickersLoad) {
                        opts.afterLoad = 1;
                    }

                    if (Emoji.onStickersLoad && window.emojiStickers) {
                        Emoji.onStickersLoad();
                        Emoji.onStickersLoad = false;
                    }

                    var emojiList = Emoji.emojiGetRecentFromStorage();
                    if (!emojiList) {
                        Emoji.emojiOldRecentPrepare(recent_emoji, optId);
                        Emoji.updateEmojiCont(optId);
                    } else {
                        Emoji.curEmojiRecent = Emoji.filterEmoji(emojiList);
                    }
                    Emoji.updateRecentEmoji(optId);
                    opts.onRecentEmojiUpdate && opts.onRecentEmojiUpdate();
                },
                onFail: function() {
                    opts.emojiMoreSt = 0;
                }
            })

            if (Emoji.curEmojiRecent) {
                opts.onRecentEmojiUpdate && opts.onRecentEmojiUpdate();
            }
        },

        filterEmoji: function(emoji_list) {
            var noChecked = Object.keys(emoji_list);

            checking:
                for (var i in Emoji.curEmojiCats) {
                    for (var j in Emoji.curEmojiCats[i]) {
                        var code = Emoji.curEmojiCats[i][j],
                            pos = noChecked.indexOf(code);
                        if (pos != -1) {
                            noChecked.splice(pos, 1);
                            if (noChecked.length == 0) {
                                break checking;
                            }
                        }
                    }
                }

            var result = {};
            for (var i in emoji_list) {
                if (noChecked.indexOf(i) == -1) {
                    result[i] = emoji_list[i];
                }
            }

            if (noChecked.length > 0) {
                Emoji.setRecentEmojiList(result);
            }

            return result;
        },

        emojiGetRecentFromStorage: function() {
            try {
                return JSON.parse(localStorage.getItem('emoji_recent_list'));
            } catch (e) {
                return false;
            }
        },

        emojiOldRecentPrepare: function(recent_emoji) {
            var emoji_list = {};
            for (var i in recent_emoji) {
                var item = recent_emoji[i];
                if (isString(item)) {
                    var rate = 1,
                        code = item;
                } else {
                    var rate = item,
                        code = i;
                }
                emoji_list[code] = rate;
            }
            Emoji.setRecentEmojiList(Emoji.filterEmoji(emoji_list));
        },

        getRecentEmojiSorted: function() {
            var recent = [];
            for (var i in Emoji.curEmojiRecent) {
                var item = Emoji.curEmojiRecent[i];
                recent.push([i, item]);
            }
            recent.sort(function(a, b) {
                return b[1] - a[1];
            });

            var res = [];
            for (var i in recent) {
                res.push(recent[i][0]);
            }
            return res.slice(0, 20);
        },

        incrRecentEmojiRate: function(optId, code) {
            var rateInterval = 6;
            if (!Emoji.emojiRecentRateTime) {
                Emoji.emojiRecentRateTime = vkNow() / 1000 - rateInterval;
            }
            var timeDiff = vkNow() / 1000 - Emoji.emojiRecentRateTime;

            if (timeDiff >= rateInterval) {
                var power = Math.min(100, Math.floor(timeDiff / rateInterval));
                for (var i in Emoji.curEmojiRecent) {
                    if (i == code) {
                        continue;
                    }
                    Emoji.curEmojiRecent[i] *= Math.pow(0.998076, power);
                }

                Emoji.emojiRecentRateTime += rateInterval * power;
            }
            if (!Emoji.curEmojiRecent[code]) {
                Emoji.curEmojiRecent[code] = 0;
            }
            Emoji.curEmojiRecent[code] += 1;

            var codes = Emoji.getRecentEmojiSorted();
            Emoji.curEmojiCats[-1] = codes;

            if (codes.length >= 20 && codes.indexOf(code) == -1) {
                codes.splice(-1);
                codes.push(code);
            }

            var res = {};
            for (var i in codes) {
                var code = codes[i];
                res[code] = Emoji.curEmojiRecent[code];
            }

            Emoji.setRecentEmojiList(res);
            window.Notifier && Notifier.lcSend('recent_emoji_set', res);
        },

        setRecentEmojiList: function(list) {
            localStorage.setItem('emoji_recent_list', JSON.stringify(list));
            Emoji.curEmojiRecent = list;
        },

        updateEmojiCont: function(optId) {
            var opts = Emoji.opts[optId];

            if (opts.curTab == 0) {
                val(geByClass1('emoji_scroll_smiles', opts.tt), Emoji.ttEmojiList(optId));
                Emoji.updateEmojiCatTitle(optId);
            }
        },

        ttEmojiList: function(optId) {
            var cats = Emoji.curEmojiCats,
                res = '';

            var emojiList = Emoji.emojiGetRecentFromStorage();
            if (emojiList) {
                Emoji.setRecentEmojiList(emojiList);
            }

            Emoji.curEmojiCats[-1] = Emoji.getRecentEmojiSorted();

            var sorted_cats = [-1, 1, 3, 8, 2, 4, 5, 6, 7, 9];
            for (var i in sorted_cats) {
                var cat_id = sorted_cats[i];
                var cat = cats[cat_id];

                if (!cat.length) {
                    continue;
                }

                var lng_sub = cat_id == -1 ? 'recent' : cat_id;
                var cont = '<div class="emoji_cat_title_helper" data-id="' + cat_id + '" id="emoji_recent_list' + optId + '_' + cat_id + '"><div class="emoji_cat_title">' + getLang('global_emoji_cat_' + lng_sub) + '</div></div>';
                cont += Emoji.emojiGetCatCont(optId, cat);
                res += cont;
            }
            return res;
        },

        emojiGetCatCont: function(optId, cat) {
            var res = '',
                row = '',
                total = cat.length - 1;
            for (var j = 0; j <= total; j++) {
                row += Emoji.emojiWrapItem(optId, cat[j], j);
                if (j > 0 && j % 10 == 9 || j >= total) {
                    res += '<div class="emoji_smiles_row">' + row + '</div>';
                    row = '';
                }
            }
            return res;
        },

        updateRecentEmoji: function(optId) {
            var emojiList = Emoji.getRecentEmojiSorted(),
                recent_els = Emoji.emojiGetCatCont(optId, emojiList);

            var titleEl = ge('emoji_recent_list' + optId + '_-1');
            if (!titleEl) {
                return;
            }

            var el = titleEl.nextSibling;
            while (el) {
                el = el.nextSibling;
                if (hasClass(el.previousSibling, 'emoji_smiles_row')) {
                    re(el.previousSibling);
                } else {
                    break;
                }
            }

            var rows = ce('div', {
                    innerHTML: recent_els
                }),
                nextTitle = titleEl.nextSibling,
                parent = titleEl.parentNode;
            while (el = rows.firstChild) {
                parent.insertBefore(el, nextTitle);
            }
        },

        updateRecentStickers: function(optId) {
            var opts = Emoji.opts[optId];
            if (!Emoji.stickers[-1] || !opts || !opts.emojiExpanded) {
                return;
            }
            var recentWrap = ge('emoji_recent_stickers_cont' + optId);
            if (!recentWrap) {
                return;
            }
            val(recentWrap, '');

            var stickerSize = (window.devicePixelRatio >= 2) ? '128' : '64';
            var stickers = Emoji.stickers[-1].stickers;
            for (var i = 0; i < stickers.length; i++) {
                var stickerEl = se(rs(Emoji.stickerItem(), {
                    optId: optId,
                    selId: Emoji.TAB_RECENT_STICKERS,
                    stickerId: stickers[i][0],
                    size: stickers[i][1],
                    stickerSize: stickerSize
                }));
                recentWrap.appendChild(stickerEl);
                var top = Math.ceil((i + 1) / 4) * 68;
                opts.needLoadStickers.unshift([optId + '_' + Emoji.TAB_RECENT_STICKERS + '_' + stickers[i][0], top]);
            }
        },

        updateEmojiCatTitle: function(optId) {
            var opts = Emoji.opts[optId];

            if (!opts || !opts.emojiScroll) {
                return;
            }

            var emoji_block_el = ge('emoji_block_' + optId);
            var els = geByClass('emoji_cat_title_helper', emoji_block_el);
            var st = opts.emojiScroll.data.scrollTop;
            var helper = geByClass1('emoji_cats_title_helper', opts.tt);

            var rowH = getSize(els[0])[1],
                curRow, rowI;
            for (var i = els.length - 1; i >= 0; i--) {
                if (st > els[i].offsetTop - rowH) {
                    curRow = els[i];
                    rowI = i;
                    break;
                }
            }

            if (!curRow) {
                return debugLog('title not found');
            }

            var curRowId = intval(attr(curRow, 'data-id'));
            if (opts.curEmojiCatId != curRowId) {
                opts.curEmojiCatId = curRowId;

                var need_reset = [curRow];

                var prevRow = els[rowI - 1];
                if (prevRow) {
                    addClass(prevRow, 'emoji_cat_title_fix');
                    setStyle(prevRow.firstChild, 'transform', 'translateY(' + (curRow.offsetTop - prevRow.offsetTop - rowH) + 'px)');
                }

                var el = curRow.nextSibling;
                while (el) {
                    if (hasClass(el, 'emoji_cat_title_fix')) {
                        need_reset.push(el);
                    }
                    el = el.nextSibling;
                }

                for (var i in need_reset) {
                    removeClass(need_reset[i], 'emoji_cat_title_fix');
                    setStyle(need_reset[i].firstChild, 'transform', 'translateY(0px)');
                }

                val(helper, '');
                opts.emojiTitleHelperIsSet = 0;
            }

            if (!opts.emojiTitleHelperIsSet && st >= curRow.offsetTop && st > 0) {
                val(helper, val(curRow));
                opts.emojiTitleHelperIsSet = 1;
            } else if (opts.emojiTitleHelperIsSet && (st < curRow.offsetTop || st == 0)) {
                val(helper, '');
                opts.emojiTitleHelperIsSet = 0;
            }
        },

        emojiWrapItem: function(optId, code, i) {
            var info = Emoji.cssEmoji[code];
            if (info) {
                var titleStr = ' title="' + info[1] + '"';
            } else {
                var titleStr = '';
            }
            if (browser.mobile) {
                var overEvent = '';
            } else {
                var overEvent = ' onmouseover="return Emoji.emojiOver(' + optId + ', this, true);"';
            }
            return '<a class="emoji_smile_cont ' + ((code != '2764' && i && (i < 54)) ? 'emoji_smile_shadow' : '') + '" ' + titleStr + ' onmousedown="Emoji.addEmoji(Emoji.shownId, \'' + code + '\', this); return cancelEvent(event);" onclick="return cancelEvent(event);"' + overEvent + '><div class="emoji_bg"></div><div class="emoji_shadow"></div>' + Emoji.getEmojiHTML(code, false, false, true) + '</a>'
        },

        reappendEmoji: function(optId, tt) {
            var opts = Emoji.opts[optId];
            if (opts && opts.rceCont) {
                if (!opts.addMediaBtn) {
                    opts.sendWrap.appendChild(opts.rceCont);
                } else {
                    opts.sendWrap.insertBefore(opts.rceCont, opts.addMediaBtn);
                }
            }
            if (!tt) return;
            var controls = opts.controlsCont;
            // var diff = opts.isSized ? sbWidth() : 0;

            if (opts.emojiWrap) { // new way
                opts.emojiWrap.appendChild(tt);
            } else {
                opts.obj.appendChild(tt);
            }
            // diff += opts.ttDiff + Emoji.ttShift;
            // setStyle(tt, vk.rtl ? {left: diff} : {right: diff});
            clearTimeout(cur.ttEmojiHide);
            hide(tt);
        },
        ttCalcHeight: function(optId, obj, tt) {
            window.headH = window.headH || ge('page_header') && getSize(ge('page_header'))[1] || 0;
            var wh = (window.pageNode && window.browser.mozilla ? Math.min(getSize(pageNode)[1], window.lastWindowHeight) : window.lastWindowHeight) || getScroll()[3],
                scrollY = window.scrollGetY ? scrollGetY() : getScroll()[1],
                objY = getXY(obj)[1],
                objH = getSize(obj)[1],
                list = geByClass1('emoji_list', tt),
                smileH = Emoji.opts[optId].emojiSmileHeigh,
                headSpace = headH,
                rowsCnt = Emoji.opts[optId].emojiRowsCount,
                offsetH = 9,
                listPadding = 8;

            if (!isAncestor(obj, pageNode)) {
                headSpace = 0;
            }
            setStyle(list, {
                height: rowsCnt * smileH + listPadding
            });

            var upEdgeY = scrollY + headSpace,
                downEdgeY = scrollY + wh,
                el = obj,
                ttH = getSize(tt)[1],
                toUp,
                upSpace = 0,
                downSpace = 0,
                space = 0;

            while (el !== bodyNode && (el = domClosestOverflowHidden(el))) {
                var y = getXY(el)[1];
                upEdgeY = Math.max(upEdgeY, y);
                downEdgeY = Math.min(downEdgeY, y + getSize(el)[1]);
            }

            upSpace = objY - offsetH - upEdgeY;
            downSpace = downEdgeY - objY - objH - offsetH;

            if (upSpace < ttH && downSpace < ttH) {
                toUp = (upSpace >= downSpace);
            } else {
                toUp = (upSpace >= ttH);
            }
            space = (toUp ? upSpace : downSpace);
            while (space < ttH && rowsCnt > 3) {
                rowsCnt--;
                ttH -= smileH;
            }
            Emoji.opts[optId].emojiRowsCount = rowsCnt;
            Emoji.opts[optId].emojiSmileHeigh = smileH;
            setStyle(list, {
                height: rowsCnt * smileH + listPadding
            });
            toggleClass(tt, 'tt_down', toUp);
            toggleClass(tt, 'tt_up', !toUp);
        },
        repositionEmoji: function(optId, obj, tt) {
            var opts = Emoji.opts[optId],
                arrow;
            if (!opts) {
                return;
            }
            if (tt.parentNode && getXY && getStyle && setStyle && geByClass && (arrow = geByClass1("emoji_rpointer", tt))) {
                var width = parseInt(getStyle(tt, "width")),
                    arrowLeft = 266,
                    arrowCenter = 7,
                    needOffset = 10,
                    needX = getXY(obj)[0],
                    objWidth = parseInt(getStyle(obj, "width")),
                    parentLeft = getXY(tt.parentNode)[0];

                if (needX + objWidth / 2 < arrowLeft + arrowCenter + needOffset) {
                    setStyle(tt, 'left', -width - parentLeft);
                    setStyle(arrow, 'left', (needX + objWidth / 2 - needOffset * 2) + "px");
                } else {
                    setStyle(tt, 'left', '');
                    setStyle(arrow, 'left', '');
                }
            } else {
                setStyle(tt, 'left', '');
            }

            var list = geByClass1('emoji_list', tt),
                firstSmile = geByClass1('emoji_smile_cont', list);
            Emoji.opts[optId].emojiSmileHeigh = firstSmile && getSize(firstSmile)[1] || 26;
            Emoji.opts[optId].emojiRowsCount = 9;
            Emoji.ttCalcHeight(optId, obj, tt);
        },
        emojiOver: function(optId, obj, withMouse) {
            if (browser.mobile || withMouse && Emoji.preventMouseOver) {
                return true;
            }
            var opts = Emoji.opts[optId]
            addClass(obj, 'emoji_over');
            if (opts.emojiOvered && opts.emojiOvered != obj) {
                removeClass(opts.emojiOvered, 'emoji_over');
            }
            opts.emojiOvered = obj;
        },
        emojiExpand: function(optId, block) {
            var opts = Emoji.opts[optId];
            addClass(block, 'emoji_expanded');
            Emoji.emojiLoadMore(optId);

            if (opts.emojiScroll) {
                opts.emojiScroll.update();
            } else {
                opts.emojiScroll = new uiScroll(geByClass1('emoji_list', block), {
                    theme: 'default emoji no_transition',
                    shadows: true,
                    global: true,
                    ondragstart: function() {
                        opts.scrolling = true;
                    },
                    ondragstop: function() {
                        opts.scrolling = false;
                        isFunction(opts.afterScrollFn) && opts.afterScrollFn();
                    },
                    onscrollstart: function() {
                        window.tooltips && tooltips.destroyAll();
                    },
                    onupdate: function() {
                        if (opts.curTab == Emoji.TAB_EMOJI) {
                            Emoji.updateEmojiCatTitle(optId);
                        } else {
                            Emoji.updateShownStickers(optId);
                        }
                    }
                });
                opts.imagesLoader = imagesLoader(opts.emojiScroll.scroller, {
                    use_iframe: true,
                    need_load_class: 'emoji_need_load'
                });
                if (opts.sharedTT) {
                    opts.sharedTT.emojiScroll = opts.emojiScroll;
                }
            }

            opts.emojiExpanded = true;
        },

        updateShownStickers: function(optId, noChangeTab) {
            var opts = Emoji.opts[optId];

            if (!opts.emojiScroll || !opts.stickersSplitersPos) {
                return;
            }

            if (!opts.needLoadStickers) {
                opts.needLoadStickers = [];
            }

            var st = opts.emojiScroll.data.scrollTop,
                vh = opts.emojiScroll.data.viewportHeight;
            var startPos = st,
                endPos = st + vh;
            var needLoad = opts.needLoadStickers;

            clearTimeout(opts.preloadStickersTimer);

            var need_load = [];
            for (var i = 0; i < needLoad.length; i++) {
                var item = needLoad[i];

                if (item[1] + 72 >= startPos && item[1] <= endPos) {
                    var el = ge('emoji_sticker_item' + item[0]);
                    if (!el) {
                        continue;
                    }
                    var src = attr(el, 'data-src');
                    val(el, '<img class="emoji_sticker_image" src="/images/blank.gif" data-src="' + src + '"/>');
                    need_load.push([src, item[0]]);
                }
            }

            Emoji.loadStickers(optId, need_load);

            if (!need_load.length) {
                Emoji.preloadStickers(optId);
            }

            if (noChangeTab || opts.scrollAnimation || Emoji.onStickersLoad) {
                return;
            }

            var packId = -1;
            for (var i = 0; i < opts.stickersSplitersPos.length; i++) {
                var item = opts.stickersSplitersPos[i];

                if (item[1] - 30 < st) {
                    packId = item[0];
                } else {
                    break;
                }
            }

            if (opts.curTab != packId) {
                Emoji.scrollToTab(packId, optId);
            }
        },

        loadStickers: function(optId, need_load) {
            var opts = Emoji.opts[optId];

            if (!need_load.length) {
                return;
            }

            var loading = {};
            for (var i = 0; i < need_load.length; i++) {
                var raw_id = need_load[i][0] + ':' + need_load[i][1];
                if (opts.imagesLoading[raw_id]) {
                    loading[raw_id] = opts.imagesLoading[raw_id];
                    delete opts.imagesLoading[raw_id];
                    need_load.splice(i, 1);
                    i--;
                }
            }

            for (var i in opts.imagesLoading) {
                var img = opts.imagesLoading[i];
                if (!img) {
                    return;
                }
                img.src = '';
                //var parent = img.parentNode;
                //try { parent.parentNode.removeChild(parent); } catch(e) { }
            }
            opts.imagesLoading = loading;

            for (var i in need_load) {
                var raw_id = need_load[i][0] + ':' + need_load[i][1];
                opts.imagesLoading[raw_id] = opts.imagesLoader.iloader.add(need_load[i][0], Emoji.onStickerLoaded, optId + ':' + need_load[i][1]);
            }
        },

        preloadStickers: function(optId) {
            var opts = Emoji.opts[optId];


            if (opts.imagesLoading && Object.keys(opts.imagesLoading).length > 0) {
                return;
            }

            clearTimeout(opts.preloadStickersTimer);
            opts.preloadStickersTimer = setTimeout(function() {
                var st = opts.emojiScroll.data.scrollTop,
                    vh = opts.emojiScroll.data.viewportHeight;
                var endPos = st + vh;

                var before = {
                        top: st - vh,
                        bottom: st,
                    },
                    after = {
                        top: endPos,
                        bottom: endPos + vh,
                    };

                var el = geByClass1('emoji_scroll_stickers', opts.tt).firstChild,
                    needLoad = [];
                while (el) {
                    if (hasClass(el, 'emoji_sticker_item') && !hasClass(el, '__loaded')) {
                        var top = el.offsetTop;

                        if (top >= before.top && top <= before.bottom || top >= after.top && top <= after.bottom) {
                            var id = el.id.replace('emoji_sticker_item', ''),
                                src = attr(el, 'data-src');
                            val(el, '<img class="emoji_sticker_image" src="/images/blank.gif" data-src="' + src + '"/>');
                            needLoad.push([src, id]);
                        }
                    }
                    el = el.nextSibling;
                }

                Emoji.loadStickers(optId, needLoad);

            }, 50);
        },

        onStickerLoaded: function(src) {
            var exp = String(this).split(':');
            var raw_id = exp[1];
            var optId = intval(exp[0]);
            var opts = Emoji.opts[optId];


            var el = ge('emoji_sticker_item' + raw_id);
            if (!el) {
                return;
            }

            var img = geByTag1('img', el);
            if (!img) {
                return;
            }

            addClass(el, '__loaded');
            attr(img, 'src', src);
            delete Emoji.opts[optId].imagesLoading[src + ':' + raw_id];

            for (var i = 0; i < opts.needLoadStickers.length; i++) {
                var item = opts.needLoadStickers[i];
                if (raw_id == item[0]) {
                    opts.needLoadStickers.splice(i, 1);
                    break;
                }
            }

            if (!Object.keys(Emoji.opts[optId].imagesLoading).length) {
                Emoji.preloadStickers(optId);
            }
        },

        emojiMove: function(e) {
            var optId = Emoji.shownId;
            var opts = Emoji.opts[optId];
            if (Emoji.shown && opts && opts.emojiFocused && opts.openedByTabKey) {
                var el = null;

                if (!opts.emojiOvered) {
                    el = Emoji.getFirstEmojiEl(optId);
                } else {
                    switch (e.keyCode) {
                        case KEY.LEFT:
                            el = Emoji.getEmojiEl(opts.emojiOvered, 'left');
                            cancelEvent(e);
                            break;
                        case KEY.RIGHT:
                            el = Emoji.getEmojiEl(opts.emojiOvered, 'right');
                            cancelEvent(e);
                            break;
                        case KEY.UP:
                            el = Emoji.getEmojiEl(opts.emojiOvered, 'up');
                            break;
                        case KEY.DOWN:
                            el = Emoji.getEmojiEl(opts.emojiOvered, 'down');
                            break;
                        case KEY.ENTER:
                            if (!Emoji.emojiEnter(optId, e)) {
                                cancelEvent(e);
                                return false;
                            }
                            break;
                        default:
                            return true;
                    }
                }
                if (el) {
                    Emoji.preventMouseOver = true;
                    Emoji.emojiOver(optId, el);
                    Emoji.scrollToListEl(optId, el);
                    return false;
                }
            }
            return true;
        },

        scrollToListEl: function(optId, el) {
            var opts = Emoji.opts[optId];
            if (!opts || !opts.emojiScroll) {
                return;
            }
            var catTitleHeight = 30;
            var offsetTop = el.offsetTop;
            var newSt = Math.max(offsetTop + catTitleHeight - opts.emojiScroll.data.viewportHeight, Math.min(opts.emojiScroll.data.scrollTop, offsetTop - catTitleHeight));
            if (opts.emojiScroll.data.scrollTop != newSt) {
                opts.emojiScroll.scrollTop(newSt);
            }
        },

        anim: function(el, to) {
            clearInterval(cur._imAnim);
            var dt = 300,
                dStep = 45 / (dt / 13),
                oStep = 1 / (dt / 13),
                steps = Math.floor(dt / 13),
                i = 0;
            var el1 = domLC(el),
                el2 = domFC(el);
            var dFrom1 = to ? 0 : 45,
                dTo1 = to ? 45 : 0,
                oFrom1 = to ? 1 : 0,
                oTo1 = to ? 0 : 1;
            cur._imAnim = setInterval(function() {
                ++i;
                var d1 = (i >= steps) ? dTo1 : (dFrom1 + dStep * i * (to ? 1 : -1)),
                    d2 = d1 - 45;
                var o1 = (i >= steps) ? oTo1 : (oFrom1 + oStep * i * (to ? -1 : 1)),
                    o2 = 1 - o1;
                el1.style.WebkitTransform = el1.style.OTransform = el1.style.transform = 'rotate(' + d1 + 'deg)';
                el2.style.WebkitTransform = el2.style.OTransform = el2.style.transform = 'rotate(' + d2 + 'deg)';
                el1.style.opacity = o1;
                el2.style.opacity = o2;
                if (i >= steps) {
                    clearInterval(cur._imAnim);
                    (to ? addClass : removeClass)(el, 'emoji_smile_on');
                    el1.style.WebkitTransform = el1.style.OTransform = el1.style.transform = el2.style.WebkitTransform = el2.style.OTransform = el2.style.transform = el1.style.opacity = el2.style.opacity = '';
                }
            }, 13);
        },

        tplSmile: function(placeholder) {
            return '<div class="emoji_smile_wrap _emoji_wrap">\
  <div class="emoji_smile _emoji_btn" title="' + placeholder + '" onmouseover="return Emoji.show(this, event);" onmouseout="return Emoji.hide(this, event);" onclick="return cancelEvent(event);">\
    <div class="emoji_smile_icon"></div>\
  </div>\
</div>';
        },

        emojiToHTML: function(str, replaceSymbols, noBr) {
            if (browser.ipad || browser.iphone) {
                return str;
            }
            str = (str + '').replace(/&nbsp;/g, ' ').replace(/<br>/g, "\n");
            var regs = {
                'D83DDE07': /(\s|^)([0O�]:\))([\s\.,]|$)/g,
                'D83DDE09': /(\s|^)(;-\)+)([\s\.,]|$)/g,
                'D83DDE06': /(\s|^)([X�x�]-?D)([\s\.,]|$)/g,
                'D83DDE0E': /(\s|^)(B-\))([\s\.,]|$)/g,
                'D83DDE0C': /(\s|^)(3-\))([\s\.,]|$)/g,
                'D83DDE20': /(\s|^)(&gt;\()([\s\.,]|$)/g,
                'D83DDE30': /(\s|^)(;[o�O�])([\s\.,]|$)/g,
                'D83DDE33': /(\s|^)(8\|)([\s\.,]|$)/g,
                'D83DDE32': /(\s|^)(8-?[o�O�])([\s\.,]|$)/g,
                'D83DDE0D': /(\s|^)(8-\))([\s\.,]|$)/g,
                'D83DDE37': /(\s|^)(:[X�])([\s\.,]|$)/g,
                'D83DDE28': /(\s|^)(:[o�O�])([\s\.,]|$)/g,
                '2764': /(\s|^)(&lt;3)([\s\.,]|$)/g
            };

            for (var i = 0; i < 2; i++) {
                for (var code in regs) {
                    str = str.replace(regs[code], function(match, pre, smile, space) {
                        return (pre || '') + Emoji.getEmojiHTML(code) + (space || '');
                    });
                }
            }

            var regs = {
                'D83DDE0A': /(:-\))([\s\.,]|$)/g,
                'D83DDE03': /(:-D)([\s\.,]|$)/g,
                'D83DDE1C': /(;-[P�])([\s\.,]|$)/g,
                'D83DDE0B': /(:-[p�])([\s\.,]|$)/g,
                'D83DDE12': /(:-\()([\s\.,]|$)/g,
                '263A': /(:-?\])([\s\.,]|$)/g,
                'D83DDE0F': /(;-\])([\s\.,]|$)/g,
                'D83DDE14': /(3-?\()([\s\.,]|$)/g,
                'D83DDE22': /(:&#039;\()([\s\.,]|$)/g,
                'D83DDE2D': /(:_\()([\s\.,]|$)/g,
                'D83DDE29': /(:\(\()([\s\.,]|$)/g,
                //'D83DDE15': /(:\\)([\s\.,]|$)/g,
                'D83DDE10': /(:\|)([\s\.,]|$)/g,
                'D83DDE21': /(&gt;\(\()([\s\.,]|$)/g,
                'D83DDE1A': /(:-\*)([\s\.,]|$)/g,
                'D83DDE08': /(\}:\))([\s\.,]|$)/g,
                'D83DDC4D': /(:like:)([\s\.,]|$)/g,
                'D83DDC4E': /(:dislike:)([\s\.,]|$)/g,
                '261D': /(:up:)([\s\.,]|$)/g,
                '270C': /(:v:)([\s\.,]|$)/g,
                'D83DDC4C': /(:ok:|:��:)([\s\.,]|$)/g
            };
            for (var code in regs) {
                str = str.replace(regs[code], function(match, smile, space) {
                    return Emoji.getEmojiHTML(code) + (space || '');
                });
            }

            str = str.replace(/\n/g, '<br>');

            if (replaceSymbols) {
                str = str.replace(Emoji.emojiRegEx, Emoji.emojiReplace);
            }

            return str;
        },

        emojiReplace: function(symbolstr) {
            var i = 0;
            var buffer = '';
            var altBuffer = '';
            var num = '';
            var symbols = [];
            var codes = [];
            var collectCodes = true;

            if (symbolstr.match(/\uFE0F\u20E3/g)) {
                symbolstr = symbolstr.replace(/\uFE0F/g, '');
            }

            do {
                var num = symbolstr.charCodeAt(i++);

                if (!num) {
                    collectCodes = false;
                    continue;
                }

                var code = num.toString(16).toUpperCase();
                var symbol = symbolstr.charAt(i - 1);

                if (num == 8419) {
                    var numPrevPos = i - 2;
                    var numPrevChar = symbolstr.charAt(numPrevPos);

                    codes.push('003' + numPrevChar + '20E3');
                    symbols.push(numPrevChar);

                    buffer = '';
                    altBuffer = '';
                    continue;
                }

                buffer += code;
                altBuffer += symbol;

                if (!symbol.match(Emoji.emojiCharSeq)) {
                    codes.push(buffer);
                    symbols.push(altBuffer);
                    buffer = '';
                    altBuffer = '';
                }

            } while (collectCodes)

            if (buffer) {
                codes.push(buffer);
                symbols.push(altBuffer);
            }

            var out = '';
            var joiner = false;
            var isFlag = false;

            buffer = '';
            altBuffer = '';

            for (var i in codes) {
                var code = codes[i];
                var symbol = symbols[i];

                if (!code || code == 'FE0F') {
                    continue;
                }

                if (symbol.match(/\uD83C[\uDFFB-\uDFFF]/)) { // colors
                    buffer += code;
                    altBuffer += symbol;
                    continue;
                }
                if (joiner) {
                    buffer += code;
                    altBuffer += symbol;
                    joiner = false;
                    continue;
                }
                if (inArray(code, Emoji.emojiJoiners)) { // joiners
                    if (buffer) {
                        joiner = true;
                        buffer += code;
                        altBuffer += symbol;
                    } else {
                        out += symbol;
                    }
                    isFlag = false;
                    continue;
                }
                if (symbol.match(/\uD83C[\uDDE6-\uDDFF]/)) { // flags
                    if (isFlag) {
                        buffer += code;
                        altBuffer += symbol;
                        isFlag = false;
                        continue;
                    }
                    isFlag = true;
                } else if (isFlag) {
                    isFlag = false;
                }

                if (buffer) {
                    out += Emoji.getEmojiHTML(buffer, altBuffer, true);
                }
                buffer = code;
                altBuffer = symbol;
            }

            if (buffer) {
                out += Emoji.getEmojiHTML(buffer, altBuffer, true);
            }

            return out;
        },

        emojiCharSeq: /[0-9\uD83D\uD83C\uD83E]/,

        emojiRegEx: /((?:[\u203C\u2049\u2122\u2328\u2601\u260E\u261d\u2626\u262A\u2638\u2639\u263a\u267B\u267F\u2702\u2708]|[\u2600\u26C4\u26BE\u2705\u2764]|[\u2194-\u2199\u21AA\u21A9]|[\u231A-\u231B]|[\u23E9-\u23EF]|[\u23F0-\u23F4]|[\u23F8-\u23FA]|[\u24C2]|[\u25AA-\u25AB]|[\u25B6\u25C0]|[\u25FB-\u25FE]|[\u2602-\u2618]|[\u2648-\u2653]|[\u2660-\u2668]|[\u26A0-\u26FA]|[\u2692-\u269C]|[\u262E-\u262F]|[\u2622-\u2623]|[\u2709-\u2764]|[\u2795-\u2797]|[\u27A1]|[\u27BF]|[\u2934-\u2935]|[\u2B05-\u2B07]|[\u2B1B]|[\u2B50\u2B55]|[\u303D]|[\u3297\u3299]|[\uE000-\uF8FF]|[\uD83D\uD83C\uD83E][\uDC00-\uDFFF]|[0-9]\u20E3|[\u0023-\u0039\u203C-\u21AA\u1F3F3]\uFE0F\u20E3|[\u200C\u200D\u2640\u2642\uFE0F])+)/g,

        emojiJoiners: ['2640', '2642', '200D', '200C'],
        emojiJoinersRegEx: /2640|2642|200D|200C/g,
        emojiFlags: ['D83CDDE8', 'D83CDDF3', 'D83CDDE9', 'D83CDDEA', 'D83CDDEA', 'D83CDDF8', 'D83CDDEB', 'D83CDDF7', 'D83CDDEC', 'D83CDDE7', 'D83CDDEE', 'D83CDDF9', 'D83CDDEF', 'D83CDDF5', 'D83CDDF0', 'D83CDDF7', 'D83CDDF7', 'D83CDDFA', 'D83CDDFA', 'D83CDDF8', 'D83CDDFA', 'D83CDDE6', 'D83CDDF0', 'D83CDDFF', 'D83CDDE7', 'D83CDDFE', 'D83CDDE6', 'D83CDDFA', 'D83CDDE6', 'D83CDDF9', 'D83CDDE7', 'D83CDDEA', 'D83CDDE7', 'D83CDDF7', 'D83CDDFB', 'D83CDDF3', 'D83CDDED', 'D83CDDF0', 'D83CDDE9', 'D83CDDF0', 'D83CDDEE', 'D83CDDF1', 'D83CDDEE', 'D83CDDF3', 'D83CDDEE', 'D83CDDE9', 'D83CDDEE', 'D83CDDEA', 'D83CDDE8', 'D83CDDE6', 'D83CDDE8', 'D83CDDF4', 'D83CDDF2', 'D83CDDF4', 'D83CDDF2', 'D83CDDFE', 'D83CDDF2', 'D83CDDFD', 'D83CDDF3', 'D83CDDF1', 'D83CDDF3', 'D83CDDFF', 'D83CDDF3', 'D83CDDF4', 'D83CDDE6', 'D83CDDEA', 'D83CDDF5', 'D83CDDF1', 'D83CDDF5', 'D83CDDF9', 'D83CDDF5', 'D83CDDF7', 'D83CDDF8', 'D83CDDE6', 'D83CDDF8', 'D83CDDEC', 'D83CDDF9', 'D83CDDF7', 'D83CDDF5', 'D83CDDED', 'D83CDDEB', 'D83CDDEE', 'D83CDDE8', 'D83CDDF1', 'D83CDDE8', 'D83CDDED', 'D83CDDF8', 'D83CDDEA', 'D83CDDFF', 'D83CDDE6', 'D83CDFF3', 'D83CDF08'],

        getCode: function(obj) {
            var code = false;
            if (obj.className == 'emoji_css') {
                code = obj.getAttribute('emoji');
            } else if (obj.className.indexOf('emoji') != -1) {
                var m = obj.src && obj.src.match(/\/([a-zA-Z0-9]+)(_2x)?.png/);
                if (m) {
                    code = m[1];
                } else {
                    code = obj.getAttribute('emoji');
                }
            }
            return code;
        },

        getTabCont: function(optId, selId) {
            var stickerSize = (window.devicePixelRatio >= 2) ? '128' : '64';

            var html = '';
            if (selId) {
                var recentHtml = '';
                var forceStickerPack = Emoji.opts[optId].forceStickerPack;
                for (var j in window.emojiStickers) {
                    var packId = window.emojiStickers[j][0];
                    var isActive = window.emojiStickers[j][1];
                    var isPromoted = window.emojiStickers[j][3];
                    var isForced = window.emojiStickers[j][4] && forceStickerPack == packId;
                    if (!isActive && !isForced) {
                        continue;
                    }

                    var pack = Emoji.stickers[packId];
                    if (!pack) {
                        continue;
                    }
                    var packHtml = '<div class="clear emoji_stickers_spliter" id="emoji_tab_cont_' + packId + '_' + optId + '"></div>';
                    if (packId == Emoji.TAB_RECENT_STICKERS) {
                        packHtml += '<div class="emoji_recent_stickers_cont" id="emoji_recent_stickers_cont' + optId + '">';
                    }
                    var list = pack.stickers;
                    for (var i in list) {
                        packHtml += rs(Emoji.stickerItem(), {
                            optId: optId,
                            selId: packId,
                            stickerId: list[i][0],
                            size: list[i][1],
                            stickerSize: stickerSize
                        });
                    }
                    if (packId == Emoji.TAB_RECENT_STICKERS) {
                        recentHtml = packHtml + '</div>';
                    } else if (isForced) {
                        html = packHtml + html;
                    } else {
                        html += packHtml;
                    }
                }
                html = recentHtml + html;
            } else {
                html = Emoji.ttEmojiList(optId);
            }
            return html;
        },

        updateStickersCont: function(optId) {
            var opts = Emoji.opts[optId];
            var html = Emoji.getTabCont(optId, Emoji.TAB_RECENT_STICKERS);
            var cont = geByClass1('emoji_scroll_stickers', opts.tt);
            cont.innerHTML = html;

            opts.initedStickers = 1;
            opts.imagesLoading = [];
            clearTimeout(opts.preloadStickersTimer);

            var posTree = [],
                splitersPos = [];
            var el = cont.firstChild;
            var recent = false;
            while (el) {
                if (!recent && hasClass(el, 'emoji_recent_stickers_cont')) {
                    el = el.firstChild;
                    recent = true;
                }
                if (hasClass(el, 'emoji_sticker_item')) {
                    var id = el.id.replace('emoji_sticker_item', '');
                    posTree.push([id, el.offsetTop]);
                } else if (hasClass(el, 'emoji_stickers_spliter')) {
                    var id = el.id.replace('emoji_tab_cont_', '').split('_');
                    splitersPos.push([intval(id[0]), el.offsetTop]);
                }
                if (!el.nextSibling && recent) {
                    el = el.parentNode;
                }
                el = el.nextSibling;
            }
            opts.needLoadStickers = posTree;
            opts.stickersSplitersPos = splitersPos;
        },

        stickerItem: function() {
            // <img class="emoji_sticker_image emoji_need_load" src="/images/blank.gif" data-src="/images/stickers/%stickerId%/%stickerSize%.png" />
            return '<a id="emoji_sticker_item%optId%_%selId%_%stickerId%" data-pack-id="%selId%" data-src="/images/stickers/%stickerId%/%stickerSize%.png" class="emoji_sticker_item" onclick="Emoji.stickerClick(%optId%, %stickerId%, %size%, this, \'keyboard\');"></a>';
        },
        hintsStickerItem: function() {
            return '<a id="emoji_sticker_item%optId%_%selId%_%stickerId%" data-pack-id="%selId%" class="emoji_sticker_item %class%" onclick="%onclick%" onmouseover="Emoji.stickerHintOver(this)" onmouseout="Emoji.stickerHintOut(this)"><img class="emoji_sticker_image" src="/images/stickers/%stickerId%/%stickerSize%.png" /></a>';
        },

        tabSwitch: function(obj, selId, optId, noScrollUpdate) {
            if (obj == undefined) {
                return;
            }
            var opts = Emoji.opts[optId],
                tt = opts.tt;

            if (typeof obj === 'number') {
                obj = geByClass1('emoji_tab_' + obj, tt);
            }

            var emojiWrap = geByClass1('emoji_scroll_smiles', tt),
                stickersWrap = geByClass1('emoji_scroll_stickers', tt);

            val(geByClass1('emoji_cats_title_helper', tt), '');
            opts.curEmojiCatId = null;

            if (selId == Emoji.TAB_EMOJI) {
                hide(stickersWrap);
                show(emojiWrap);

                if (!opts.emojiInited) {
                    val(emojiWrap, Emoji.getTabCont(optId, Emoji.TAB_EMOJI));
                    opts.emojiInited = true;
                }
                if (opts.imagesLoader) {
                    opts.imagesLoader.processLoad();
                }
                if (opts.emojiOvered && opts.curTab === 0) {
                    Emoji.emojiOver(optId, Emoji.getFirstEmojiEl(optId));
                }
                if (opts.curTab != Emoji.TAB_EMOJI) {
                    opts.emojiScroll && opts.emojiScroll.scrollTop(0);
                }
                Emoji.updateRecentEmoji(optId);
                Emoji.updateEmojiCatTitle(optId);
            } else {
                hide(emojiWrap);
                show(stickersWrap);

                var stickers = Emoji.stickers && clone(Emoji.stickers);
                if (stickers) {
                    delete stickers[Emoji.TAB_RECENT_STICKERS];
                }
                if (!stickers || isEmpty(stickers) || !stickers[selId] && selId != Emoji.TAB_RECENT_STICKERS) {
                    Emoji.onStickersLoad = Emoji.tabSwitch.pbind(selId, selId, optId, noScrollUpdate);
                    Emoji.stickersLoadingProgress(optId, selId, obj);
                    opts.stickersInited = false;
                    opts.curTab = null;
                    Emoji.emojiLoadMore(optId);
                } else if (!opts.stickersInited) {
                    Emoji.updateStickersCont(optId);
                    opts.stickersInited = true;
                }
                if (opts.curTab != selId || opts.afterLoad) {
                    Emoji.scrollToStickerPack(optId, selId, opts.curTab == Emoji.TAB_EMOJI);
                    opts.afterLoad = 0;
                }
                Emoji.updateShownStickers(optId, true);
            }

            if (!Emoji.onStickersLoad || selId == Emoji.TAB_EMOJI) {
                Emoji.selectTab(optId, selId, obj);
            }
        },

        getFirstEmojiEl: function(optId) {
            var opts = Emoji.opts[optId];
            var el = geByClass1('emoji_scroll_smiles', opts.tt).firstChild;

            while (el) {
                if (hasClass(el, 'emoji_smiles_row')) {
                    return el.firstChild;
                }
                el = el.nextSibling;
            }

            return null;
        },

        getEmojiEl: function(el, nav) {
            var cnt = 0;

            var row = el.parentNode,
                pos = 0,
                res;

            var _el = row.firstChild;
            while (_el) {
                pos++;
                if (_el === el) {
                    break;
                }
                _el = _el.nextSibling;
            }

            while (el && !res) {

                if (nav == 'left' || nav == 'right') {
                    res = nav == 'left' ? el.previousSibling : el.nextSibling;

                    if (!res) {
                        if (nav == 'left') {
                            nav = 'up';
                            pos = 10;
                        } else {
                            nav = 'down';
                            pos = 1;
                        }
                    }
                } else if (nav == 'up' || nav == 'down') {
                    var _row = row;
                    while (_row) {
                        _row = nav == 'up' ? _row.previousSibling : _row.nextSibling;
                        if (!_row || hasClass(_row, 'emoji_smiles_row')) {
                            break;
                        }
                    }
                    if (_row) {
                        if (pos && _row) {
                            var _pos = 0,
                                _el = _row.firstChild;
                            while (_el && _pos < pos) {
                                _pos++;
                                if (_pos >= pos) {
                                    res = _el;
                                    break;
                                }
                                _el = _el.nextSibling;
                            }
                        }

                        if (!res && _row) {
                            res = (nav == 'up' || pos && nav == 'down') ? _row.lastChild : _row.firstChild;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                } else {
                    break;
                }

                cnt++;
                if (cnt > 20) {
                    debugLog('ERR!!');
                    break;
                }
            }

            return res;
        },

        stickerClick: function(optId, stickerNum, width, obj, sticker_referrer) {
            var opts = Emoji.opts[optId];

            if (vkNow() - opts.ttShowT < Emoji.CLICK_DELAY) {
                return
            }

            var packId = parseInt(attr(obj, 'data-pack-id'));

            var addToRecent = true;
            if (window.emojiStickers) {
                each(window.emojiStickers, function(i, pack) {
                    if (pack[0] == packId) {
                        addToRecent = !!pack[1];
                        return false;
                    }
                });
            }

            if (addToRecent) {
                if (!Emoji.stickers[-1]) {
                    Emoji.stickers[-1] = {
                        stickers: []
                    };
                }
                for (var i in Emoji.stickers[-1].stickers) {
                    if (Emoji.stickers[-1].stickers[i][0] == stickerNum) {
                        Emoji.stickers[-1].stickers.splice(i, 1);
                    }
                }
                Emoji.stickers[-1].stickers.unshift([stickerNum, width]);
                ls.set('recent_stickers', Emoji.stickers[-1]);
                Emoji.updateRecentStickers(optId);
            }

            if (opts.onStickerSend) {
                opts.onStickerSend(stickerNum, sticker_referrer);
            }

            Emoji.ttHide(optId, false, false, true);
            opts.recentSticker = stickerNum;
        },

        stickerOver: function(stickerNum, el) {
            var params = {
                act: 'a_stickers_hover',
                sticker_id: stickerNum,
                from: cur.module
            };

            if (isObject(el.tt) && el.firstChild.nodeName === 'IMG') {
                return el.tt.show();
            }

            var onDone = function(tooltip, content) {
                var tt_index = (cur.tooltips || []).length;
                var tt_classname = [
                    'subscribe_post_tt',
                    'sticker_extra_tt',
                    'sticker_extra_tt' + tt_index, !tooltip.image ? 'tt_text_only' : ''
                ];

                tt_classname = tt_classname.join(' ');

                if (!tooltip.show) {
                    return;
                }


                var opt = {
                    index: tt_index,
                    className: tt_classname,
                    content: content,
                    shift: function() {
                        return [-138, 0, -200];
                    },
                    hasover: 1,
                    slideX: 15,
                    showsp: 150,
                    cache: 1,
                    forcetodown: true,
                    no_shadow: true,
                    dir: 'left',
                    onShowStart: function(tt) {
                        var el = tt.container,
                            size = getSize(tt.container),
                            el_height = size[1],
                            el_height_default = 225,
                            el_height_fault = 10;

                        if (el_height >= el_height_default) {
                            return;
                        }

                        el_diff = intval((el_height_default - el_height) / 2) + el_height_fault;
                        el_cur_top = intval(getStyle(el, 'top', true));
                        el_top = el_cur_top + el_diff;
                        setStyle(el, 'top', el_top);
                    }
                }

                if (gpeByClass('_im_peer_history_w', el)) {
                    opt.appendParentCls = '_im_peer_history_w';
                }

                showTooltip(el, opt);
            }

            ajax.post('al_im.php', params, {
                onDone: onDone
            });
        },

        selectPeer: function(optId) {
            if (optId !== undefined) {
                var opts = Emoji.opts[optId];
                if (opts.peer) {
                    return opts.peer;
                }
            }
            var peer = cur.peer || (cur.mbTo ? cur.mbTo[0] : '');
            if (peer == -3) {
                if (cur.wdd['imw_dd']) {
                    var cnt = 0;
                    for (var i in cur.wdd['imw_dd'].selected) {
                        peer = cur.wdd['imw_dd'].selected[i][0];
                        cnt += 1;
                    }
                    if (cnt > 1) {
                        peer = '';
                    }
                }
            }
            return peer;
        },

        showMyStickers: function() {
            cur.boxMyStickers = showBox('al_im.php', {
                act: 'stickers_my'
            }, {
                dark: 1,
                stat: ['im.css', 'imn.js', 'sorter.js']
            });
        },

        showStickersStore: function(optId, from) {
            var peer = Emoji.selectPeer(optId !== false ? optId : undefined),
                params = {
                    act: 'stickers_store',
                    peer: peer,
                    box: 1
                };
            if (from) params.from = from;
            cur.boxStickersStore = showBox('al_im.php', params, {
                dark: 1,
                stat: ['im.css', 'imn.js', 'page_help.css', 'sorter.js']
            });
            each(geByClass('emoji_smile_icon_promo'), function(i, el) {
                geByClass1('emoji_smile_icon', el.parentNode);
                re(el);
            });
            each(geByClass('emoji_shop_icon_badge'), function(i, el) {
                re(el);
            });
            Emoji.hasNewStickers = false;
        },

        previewSticker: function(packId, obj, opts, ev) {
            opts = opts || {};
            if (ev && checkEvent(ev)) return true;
            var params = {
                act: 'sticker_preview',
                pack_id: packId
            };
            var peer = Emoji.selectPeer();
            if (opts.peer) {
                params.peer = opts.peer;
            } else if (peer) {
                params.peer = peer;
            }
            if (opts.preview) {
                params.preview = 1;
            }
            if (opts.stickerId) {
                params.sticker_id = opts.stickerId;
            }
            params.sticker_referrer = opts.sticker_referrer || 'store';
            if (opts.name) {
                var query = nav.objLoc[0].split('/');
                if (query[0] == 'stickers' && query[1] != opts.name) {
                    nav.setLoc({
                        0: 'stickers/' + opts.name
                    });
                }
            }
            cur.boxStickersPreview = showBox('al_im.php', params, {
                dark: 1,
                stat: ['im.css', 'imn.js'],
                onFail: function(e) {
                    if (!window.emojiStickersDisabled) {
                        window.emojiStickersDisabled = {};
                    }
                    if (packId) {
                        window.emojiStickersDisabled[packId] = true;
                    }
                    if (e) return true;
                }
            });
            cancelEvent(ev);
            return false;
        },

        isStickerPackEnabled: function(packId, onStickersLoad) {
            var en = false;
            if (!window.emojiStickers && onStickersLoad) {
                ajax.post('al_im.php', {
                    act: 'a_stickers_list'
                }, {
                    onDone: function(data) {
                        window.emojiStickers = data;
                        onStickersLoad();
                    }
                })
                return 0;
            } else if (!window.emojiStickers) {
                return false;
            }
            for (var i in window.emojiStickers) {
                if (window.emojiStickers[i][0] == packId) {
                    en = window.emojiStickers[i][1] ? true : false;
                    break;
                }
            }
            return en;
        },

        clickSticker: function(packId, obj, ev) {
            if (window.emojiStickersDisabled && window.emojiStickersDisabled[packId]) {
                return true;
            }
            if (obj) {
                var en = Emoji.isStickerPackEnabled(packId, Emoji.clickSticker.pbind(packId, obj, ev));
                if (en === 0) {
                    return false;
                }
                if (en) {
                    var txt = false;
                    if (obj.getAttribute('contenteditable')) {
                        txt = obj;
                    } else {
                        var el = obj.parentNode;
                        var mini = false;
                        while (el = el.parentNode) {
                            if (hasClass(el, 'js-im-page')) {
                                break;
                            }
                            if (hasClass(el, 'fc_tab')) {
                                mini = true;
                                break;
                            }
                            if (hasClass(el, 'mv_chat')) {
                                break;
                            }
                        }
                        if (!el) return false;
                        if (!mini) {
                            if (hasClass(el, 'js-im-page')) {
                                txt = geByClass1('_im_text');
                            } else if (hasClass(el, 'mv_chat')) {
                                txt = domByClass(el, 'mv_chat_reply_input');
                            }
                        } else {
                            txt = geByClass1('fc_editable', el);
                        }
                    }

                    if (txt) {
                        var opts = Emoji.opts[txt.emojiId];

                        Emoji.ttClick(txt.emojiId, geByClass1('_emoji_btn', txt.parentNode.parentNode), false, true);

                        var tab = geByClass1('emoji_tab_' + packId, opts.tt);
                        var stickers = Emoji.stickers && clone(Emoji.stickers);
                        if (stickers) {
                            delete stickers[-1];
                        }
                        if (!stickers || isEmpty(stickers)) {
                            Emoji.onStickersLoad = Emoji.tabSwitch.pbind(packId, packId, txt.emojiId);
                            Emoji.stickersLoadingProgress(txt.emojiId, packId, tab);
                        } else {
                            opts.initedStickers = 0;
                            Emoji.tabSwitch(tab, packId, txt.emojiId);
                        }
                    }
                }
            }
            if (!obj || !en) {
                Emoji.previewSticker(packId, false, {
                    sticker_referrer: 'message'
                });
            }
            ev && cancelEvent(ev);
            return false;
        },

        stickersLoadingProgress: function(optId, selId, obj) {
            var opts = Emoji.opts[optId];
            removeClass(geByClass1('emoji_tab_sel', opts.tt), 'emoji_tab_sel');
            addClass(obj, 'emoji_tab_sel');
            geByClass1('emoji_scroll_stickers', opts.tt).innerHTML = '<div class="emoji_scroll_progress">' + rs(vk.pr_tpl, {
                id: '',
                cls: 'pr_big'
            }) + '</div>';
        },

        buyStickers: function(packId, ev, obj, hash, sticker_referrer) {
            if (obj) {
                var back = obj.innerHTML;
                if (hasClass(obj, 'secondary')) {
                    return true;
                }
            }
            var peer = Emoji.selectPeer();
            ajax.post('/al_im.php', {
                act: 'a_stickers_buy',
                pack_id: packId,
                hash: hash,
                peer: peer,
                sticker_referrer: unclean(sticker_referrer)
            }, {
                onDone: function(text, newStickers, keywords, btnText, hideBox) {
                    each(geByClass('_sticker_btn_' + packId), function() {
                        this.innerHTML = btnText;
                        this.onmouseover = '';
                        this.onclick = '';
                        addClass(this, 'secondary');
                    });
                    if (cur.boxStickersPreview) {
                        cur.boxStickersPreview.hide();
                    }
                    if (hideBox && cur.boxStickersStore) {
                        cur.boxStickersStore.hide();
                    }
                    showDoneBox(text);
                    if (newStickers) {
                        Emoji.updateTabs(newStickers, keywords, true);
                        try {
                            vk.widget && Rpc.callMethod('proxy', 'updateStickers');
                        } catch (e) {} // for widget_comments.js
                        if (window.Videoview) {
                            Videoview.onStickersPurchased(packId);
                        }
                    }
                    var box = cur.tabbedStickersBox;
                    if (box && box.tbUpdate) {
                        for (var i in box.tbUpdate) {
                            box.tbUpdate[i] = 1;
                        }
                    }

                    var optId = cur.emojiId && cur.emojiId[cur.peer];
                    if (optId) {
                        var tabEl = geByClass1('emoji_tab_' + packId, Emoji.opts[optId].tt);
                        if (tabEl) {
                            Emoji.tabSwitch(tabEl, packId, optId);
                        }
                    }
                },
                showProgress: lockButton.pbind(obj),
                hideProgress: unlockButton.pbind(obj),
                onFail: function(text) {
                    if (text) {
                        setTimeout(showFastBox(getLang('global_error'), text).hide, 3000);
                    }
                    return true;
                }
            });
            return cancelEvent(ev);
        },

        stickerAct: function(obj, packId, hash, ev, fromBtn) {
            if (fromBtn && hasClass(obj, 'secondary')) {
                return true;
            }
            var back = obj.innerHTML;
            var act = fromBtn ? hasClass(obj, 'secondary') : hasClass(obj, '_im_sticker_activated');
            if (act) {
                state = 1;
            } else {
                state = 0;
            }
            var box = cur.tabbedStickersBox;
            if (box) {
                for (var i in box.tbUpdate) {
                    box.tbUpdate[i] = 1;
                }
            }
            ajax.post('/al_im.php', {
                act: 'a_stickers_switch',
                pack_id: packId,
                hash: hash,
                state: state,
                from_btn: fromBtn ? 1 : 0
            }, {
                onDone: function(text, newStickers, keywords, btnText) {
                    if (!fromBtn) {
                        obj.innerHTML = text;
                        obj.onmouseover = '';
                        setStyle(obj, {
                            width: 'auto'
                        });
                        toggleClass(obj, '_im_sticker_activated', !state);
                    }
                    each(geByClass('_sticker_btn_' + packId), function() {
                        this.innerHTML = btnText;
                        this.onmouseover = '';
                        toggleClass(this, 'secondary', !state);
                    });
                    Emoji.updateTabs(newStickers, keywords, true);
                    var el = obj.parentNode.parentNode;
                    if (fromBtn) {
                        return;
                    }
                    cur.stickersSorter.destroy();
                    if (state) {
                        show('im_stickers_deact');
                        var newCont = ge('im_stickers_deact_wrap');
                        if (newCont.firstChild) {
                            newCont.insertBefore(el, newCont.firstChild)
                        } else {
                            newCont.appendChild(el);
                        }
                        setStyle(el, {
                            cursor: 'default'
                        })
                    } else {
                        var newCont = geByTag1('div', 'im_stickers_my_wrap');
                        newCont.appendChild(el);
                        var oldCont = ge('im_stickers_deact_wrap');
                        if (!oldCont.childNodes.length) {
                            hide('im_stickers_deact');
                        }
                    }
                    cur.stickersSorterInit();
                },
                showProgress: lockButton.pbind(obj),
                hideProgress: unlockButton.pbind(obj)
            });
            return cancelEvent(ev);
        },

        getTabsCode: function(newStickers, optId) {
            var html = '';
            //var stickers = [[0, 1]];
            var stickers = [];
            if (newStickers) {
                stickers.push.apply(stickers, newStickers);
            }
            if (stickers.length > 1) {
                Emoji.hasNewStickers = false;
            }
            var forceStickerPack = Emoji.opts[optId].forceStickerPack;
            var systemTabsHtml = '';
            var stickersTabsHtml = '';

            for (var i in stickers) {
                var stNum = stickers[i][0];
                var isActive = stickers[i][1];
                var isPromoted = stickers[i][3];
                var isForced = stickers[i][4] && stNum == forceStickerPack;
                if (!isActive && !isPromoted && !isForced) {
                    continue;
                }

                if (isActive || isForced) {
                    var act = 'return Emoji.tabSwitch(this, ' + stNum + ', ' + optId + ');';
                } else {
                    var act = 'return Emoji.previewSticker(' + stNum + ', false, {sticker_referrer: \'keyboard\'});';
                }
                if (stickers[i][2]) {
                    Emoji.hasNewStickers = stickers[i][2];
                }
                if (stNum === -1) {
                    systemTabsHtml += '<a class="emoji_tab emoji_tab_img_cont emoji_tab_recent emoji_tab_' + stNum + (cur.stickersTab == stNum ? ' emoji_tab_sel' : '') + '" onclick="' + act + '"><span class="emoji_tab_icon emoji_sprite emoji_tab_icon_recent"></span></a>';
                } else if (stNum) {
                    var tabHtml = '<a class="emoji_tab emoji_tab_img_cont emoji_tab_' + stNum + (cur.stickersTab == stNum ? ' emoji_tab_sel' : '') + (isActive || isForced ? '' : ' emoji_tab_promo') + '" onclick="' + act + '"><img width="22" height="22" src="/images/store/stickers/' + stNum + '/thumb_' + (window.devicePixelRatio >= 2 ? '44' : '22') + '.png" class="emoji_tab_img"/></a>';
                    if (isForced) {
                        stickersTabsHtml = tabHtml + stickersTabsHtml;
                    } else {
                        stickersTabsHtml += tabHtml;
                    }
                } else {
                    systemTabsHtml += '<a class="emoji_tab emoji_tab_' + stNum + (cur.stickersTab == stNum ? ' emoji_tab_sel' : '') + (isActive ? '' : ' emoji_tab_promo') + '" onclick="' + act + '"><div class="emoji_tab_icon emoji_sprite emoji_tab_icon_' + stNum + '"></div></a>';
                }
            }
            return systemTabsHtml + stickersTabsHtml;
        },

        updateTabs: function(newStickers, keywords, update) {
            if (newStickers && update && window.Notifier) {
                Notifier.lcSend('emoji', {
                    act: 'updateTabs',
                    newStickers: newStickers,
                    keywords: keywords
                });
            }

            var needKeywords = 0;
            if (keywords === undefined) {
                Emoji.initStickersKeywords();
                if (!window.stickersKeywordsData) {
                    needKeywords = 1;
                }
            } else {
                window.stickersKeywordsData = keywords;
                Emoji.setStickersKeywords(window.stickersKeywordsData, update);
            }

            if (newStickers === undefined) {
                if (!window.emojiStickers || !window.stickersKeywordsData) {
                    ajax.post('al_im.php', {
                        act: 'a_stickers_list',
                        need_keywords: needKeywords,
                        cache_time: Emoji.cachedStickersKeywordsTime()
                    }, {
                        onDone: Emoji.updateTabs
                    })
                }
            } else {
                window.emojiStickers = newStickers;
            }
            for (var i in Emoji.opts) {
                var opts = Emoji.opts[i];
                if (opts.noStickers) {
                    continue;
                }
                var html = '';
                html += Emoji.getTabsCode(window.emojiStickers, i);
                var tabsCont = ge('emoji_tabs_cont_' + i);
                if (tabsCont) {
                    tabsCont.innerHTML = html;
                }
                Emoji.checkEmojiSlider(opts);
                Emoji.checkNewStickers(opts);
                opts.stickersInited = false;
            }

            var stickers = Emoji.stickers && clone(Emoji.stickers);
            if (stickers) {
                delete stickers[Emoji.TAB_RECENT_STICKERS];
            }
            if (Emoji.onStickersLoad && window.emojiStickers && !isEmpty(stickers)) {
                Emoji.onStickersLoad();
                Emoji.onStickersLoad = false;
            }
        },

        checkNewStickers: function(opts) {
            var txt = opts.txt;
            if (!opts.noStickers && !opts.noStickersStore && window.emojiStickers && txt.getAttribute('contenteditable')) {

                for (var i in window.emojiStickers) {
                    if (window.emojiStickers[i][2]) {
                        Emoji.hasNewStickers = window.emojiStickers[i][2];
                        break;
                    }
                }
                if (Emoji.hasNewStickers < 0 && !Emoji.noNewStickers) {
                    setTimeout(function() {
                        each(geByClass('emoji_smile_icon'), function(i, el) {

                            var promoNode = el.parentNode;
                            if (!geByClass1('emoji_smile_icon_promo', promoNode)) {
                                promoNode.appendChild(ce('div', {
                                    className: 'emoji_smile_icon_promo'
                                }));
                                addEvent(el, 'mouseover', function() {
                                    showTooltip(this, {
                                        text: getLang('global_store_stickers_new_available'),
                                        shift: [7, 1, 4],
                                        showdt: 0,
                                        black: 1
                                    });
                                });
                            }
                        });
                    }, hasClass(txt, 'fc_editable') ? 200 : 0);
                }
            }
        },

        checkEmojiSlider: function(opts) {
            var cont = geByClass1('emoji_tabs_wrap', opts.tt);
            var shouldShow = false;
            if (!cont) {
                return;
            }
            if (cont.firstChild.clientWidth && (cont.firstChild.clientWidth > cont.clientWidth + cont.scrollLeft)) {
                shouldShow = true;
            } else {
                var cats = cont.firstChild.childNodes;
                if (cats.length > 6) {
                    if ((opts.scrollLeft || 0) < (cats.length - 6) * 34 - 16) {
                        shouldShow = true;
                    }
                }
            }

            var rdir = vk.rtl ? 'l' : 'r';
            if (shouldShow) {
                opts.sliderShown = true;
                Emoji.scrollToggleArrow(true, rdir, opts, true);
            } else if (opts.sliderShown) {
                opts.sliderShown = false;
                Emoji.scrollToggleArrow(false, rdir, opts, true);
            }
        },

        giftSticker: function(packId, peersIds, ev, opts) {
            opts = opts || {};
            var params = {
                act: 'stickers_gift_box',
                pack_id: packId,
                peers: peersIds
            };
            if (opts.from) {
                params.from = opts.from;
            }
            params.sticker_referrer = opts.sticker_referrer || 'store';
            boxLayerWrap.scrollTop = 0;
            showBox('/al_im.php', params, {
                stat: ['wide_dd.js', 'wide_dd.css', 'notifier.css', 'notifier.js'],
                dark: 1
            });
            return cancelEvent(ev);
        },

        showStickerTT: function(el) {
            var text = el.getAttribute('data-title');
            if (!text) return;
            showTooltip(el, {
                text: text,
                slide: 15,
                shift: [74 - getSize(el)[0] / 2, 120, 5],
                className: 'sticker_hint_tt',
                hasover: 1
            });
        },

        scrollToStickerPack: function(optId, selId, fast) {
            var opts = Emoji.opts[optId],
                stickersStart = ge('emoji_tab_cont_' + selId + '_' + optId),
                st = (stickersStart && selId != Emoji.TAB_RECENT_STICKERS) ? stickersStart.offsetTop + getSize(stickersStart)[1] : 0;

            opts.scrollAnimation = 1;
            opts.emojiScroll.scrollTop(st, fast ? 0 : 200, function() {
                opts.scrollAnimation = 0;
            });
            Emoji.scrollToTab(selId, optId);
        },

        toggleStickers: function(optId, noStickers) {
            var opts = Emoji.opts[optId];
            if (opts && opts.tt) {
                opts.noStickers = noStickers;
                toggleClass(opts.tt, 'emoji_no_tabs', noStickers); // works if init() was with stickers
                if (opts.curTab)
                    Emoji.tabSwitch(0, 0, optId);
            } else if (opts) {
                opts.hideStickersInitial = noStickers;
            }
        },

        __eof: 1
    }
}
try {
    stManager.done('emoji.js');
} catch (e) {}