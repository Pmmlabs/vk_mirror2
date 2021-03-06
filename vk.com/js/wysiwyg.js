Function.prototype.extBind = function() {
    var a = this,
        b = arguments;
    return function() {
        var c = [];
        each(b, function(f, g) {
            c[f] = g
        });
        var d = c.shift(),
            e = [];
        each(arguments, function(f, g) {
            e[f] = g
        });
        return a.apply(d, e.concat(c))
    }
};

function editorChoosePhoto(a, b, c, d) {
    var e = new Image;
    b = a + "_" + b;
    var f = {
        photoID: b,
        photoSmallURL: c,
        photoURL: d
    };
    addEvent(e, "load", function() {
        f.width = e.width;
        f.height = e.height;
        window[window.editorName].insertPhoto(window[window.editorName].photoElemID, f)
    });
    e.src = c
}

function editorChooseVideo(a, b, c, d) {
    window[window.editorName].insertVideo(d, a, b, c);
    return false
}

function editorChooseAudio(a, b, c, d) {
    window[window.editorName].insertAudio(d, a, b, c)
}

function pbSetClass(a, b) {
    a.className = b
}

function ToolBarButton(a, b) {
    this.name = "ToolBarButton";
    this.down = false;
    this.div = document.createElement("A");
    this.div.className = "editor_button";
    this.div.setAttribute("href", "javascript:;");
    this.div.style.backgroundPosition = b.x + "px " + b.y + "px";
    this.mouseup = null;
    var c = this;
    addEvent(this.div, "mouseover", function() {
        a.showTooltip(c.div, b.tooltip, 0)
    });
    addEvent(this.div, "mouseout", function() {
        a.hideTooltip()
    });
    addEvent(this.div, "mouseup", this.mouseUpEvent.extBind(this));
    if (b.disabled) {
        this.div.className = "editor_button disabled";
        this.disabled = true
    }
    this.canSelect = b.canSelect == undefined ? true : false;
    addEvent(this.div, "mouseover", this.mouseover.bind(this));
    addEvent(this.div, "mouseout", this.mouseout.bind(this))
}
ToolBarButton.prototype = {
    mouseUpEvent: function() {
        this.mouseup && !this.disabled && this.mouseup()
    },
    mouseover: function() {
        if (!this.disabled) this.div.className = "editor_button_over"
    },
    mouseout: function() {
        if (!this.disabled && !this.down) this.div.className = "editor_button"
    },
    select: function() {
        if (!this.disabled && (this.canSelect == undefined || this.canSelect)) {
            this.down = true;
            this.div.className = "editor_button_over"
        }
    },
    unselect: function() {
        if (!this.disabled) {
            this.down = false;
            this.div.className = "editor_button"
        }
    },
    enable: function() {
        this.disabled =
            false;
        removeClass(this.div, "disabled")
    },
    disable: function() {
        this.disabled = true;
        this.div.className = "editor_button disabled"
    }
};

function ToolBar(a, b, c) {
    this.div = document.createElement("DIV");
    this.div.className = "editor_toolbar";
    this.editor = a;
    ge("editor_toggle");
    if (b == "simple") this.toolbarButtons = c && c.simpleToolBar ? c.simpleToolBar : "bold,italic,gray,underline,strike,sub,sup,left,center,right,marker_list,numeric_list,outdent,indent,h1,h2,h3,image,link,unlink";
    else if (b == "extended") {
        if (c && c.extendedToolBar) this.toolbarButtons = c.extendedToolBar;
        else {
            this.toolbarButtons = "bold,italic,gray,underline,strike,sub,sup,left,center,right,marker_list,numeric_list,outdent,indent,h1,h2,h3,image,link,unlink,break,";
            this.toolbarButtons += "table,table_delete,insert_row_before,insert_row_after,insert_col_before,insert_col_after,delete_row,delete_col,col_width,citate,character,video,audio";
            this.toolbarButtons += ",time,signature,category,hider,wiki"
        }
        if (a.debug) this.toolbarButtons += ",debug"
    }
    c = this.toolbarButtons.split(",");
    this.buttons = {
        bold: {
            x: 0,
            y: 0,
            tooltip: wiki_bold
        },
        italic: {
            x: -20,
            y: 0,
            tooltip: wiki_italic
        },
        underline: {
            x: -40,
            y: 0,
            tooltip: wiki_underline
        },
        gray: {
            x: -21,
            y: -39,
            tooltip: wiki_gray
        },
        strike: {
            x: -60,
            y: 0,
            tooltip: wiki_strike
        },
        sub: {
            x: -80,
            y: 0,
            tooltip: wiki_subscript
        },
        sup: {
            x: -100,
            y: 0,
            tooltip: wiki_superscript
        },
        left: {
            x: -120,
            y: 0,
            tooltip: wiki_align_left
        },
        center: {
            x: -140,
            y: 0,
            tooltip: wiki_align_center
        },
        right: {
            x: -40,
            y: -40,
            tooltip: wiki_align_right
        },
        marker_list: {
            x: -160,
            y: 0,
            tooltip: wiki_marker_list
        },
        numeric_list: {
            x: -180,
            y: 0,
            tooltip: wiki_numeric_list
        },
        outdent: {
            x: -200,
            y: 0,
            tooltip: wiki_outdent,
            canSelect: false,
            disabled: true
        },
        indent: {
            x: -220,
            y: 0,
            tooltip: wiki_indent,
            canSelect: false,
            disabled: true
        },
        h1: {
            x: -240,
            y: 0,
            tooltip: wiki_add_header
        },
        h2: {
            x: -260,
            y: 0,
            tooltip: wiki_add_sub_header
        },
        h3: {
            x: -280,
            y: 0,
            tooltip: wiki_add_sub_sub_header
        },
        table: {
            x: 0,
            y: -20,
            tooltip: wiki_add_table
        },
        table_delete: {
            x: -20,
            y: -20,
            tooltip: wiki_delete_table,
            canSelect: false,
            disabled: true
        },
        insert_row_before: {
            x: -40,
            y: -20,
            tooltip: wiki_insert_row_before,
            canSelect: false,
            disabled: true
        },
        insert_row_after: {
            x: -60,
            y: -20,
            tooltip: wiki_insert_row_after,
            canSelect: false,
            disabled: true
        },
        insert_col_before: {
            x: -80,
            y: -20,
            tooltip: wiki_insert_col_before,
            canSelect: false,
            disabled: true
        },
        insert_col_after: {
            x: -100,
            y: -20,
            tooltip: wiki_insert_col_after,
            canSelect: false,
            disabled: true
        },
        delete_row: {
            x: -120,
            y: -20,
            tooltip: wiki_delete_row,
            disabled: true
        },
        delete_col: {
            x: -140,
            y: -20,
            tooltip: wiki_delete_col,
            disabled: true
        },
        col_width: {
            x: -160,
            y: -39,
            tooltip: wiki_col_width,
            disabled: true
        },
        link: {
            x: -160,
            y: -20,
            tooltip: wiki_add_link
        },
        unlink: {
            x: -180,
            y: -20,
            tooltip: wiki_delete_link,
            canSelect: false,
            disabled: true
        },
        citate: {
            x: -200,
            y: -20,
            tooltip: wiki_add_citate
        },
        character: {
            x: -220,
            y: -20,
            tooltip: wiki_insert_char
        },
        image: {
            x: -240,
            y: -20,
            tooltip: wiki_add_photo
        },
        video: {
            x: -260,
            y: -20,
            tooltip: wiki_add_video
        },
        audio: {
            x: -280,
            y: -20,
            tooltip: wiki_add_audio
        },
        time: {
            x: -60,
            y: -40,
            tooltip: wiki_insert_time
        },
        hider: {
            x: -80,
            y: -40,
            tooltip: wiki_insert_hider
        },
        signature: {
            x: -140,
            y: -40,
            tooltip: wiki_insert_signature
        },
        category: {
            x: 0,
            y: -40,
            tooltip: wiki_category_sub_category,
            canSelect: false
        },
        wiki: {
            x: -100,
            y: -40,
            tooltip: wiki_markup
        },
        pre: {
            x: -120,
            y: -40,
            tooltip: wiki_pre
        }
    };
    var d = document.createElement("A");
    d.id = "wysiwyg_mode";
    d.href = "javascript:void(0);";
    d.innerHTML = b == "simple" ? wiki_notes_extended_mode :
        wiki_notes_simple_mode;
    this.div.appendChild(d);
    addEvent(d, "click", function() {
        a.toggleWysiwygMode()
    });
    b = null;
    for (d = 0; d < c.length; d++) {
        b = c[d];
        this.addButton(b)
    }
}
ToolBar.prototype.addButton = function(a) {
    if (a == "break") {
        a = document.createElement("BR");
        a.setAttribute("clear", "all");
        this.div.appendChild(a)
    } else if (this.buttons[a].show == undefined) {
        this[a] = new ToolBarButton(this.editor, this.buttons[a]);
        this.div.appendChild(this[a].div)
    }
};
ToolBar.prototype.addAction = function(a, b) {
    if (this[a] != undefined) this[a].mouseup = b
};
var newUploadedBox = null;

function Wysiwyg(a) {
    this.params = a;
    this.debug = false;
    this.currRange = null;
    this.baseURI = "http://" + document.domain;
    this.nodeList = {};
    this.createContainer(a.replaceElemID);
    this.getEditorMode();
    this.createToolbar(a);
    this.createIFrame(this.width, this.height);
    this.createIFrameCut(this.width, this.height);
    this.createTextArea(this.width, this.height);
    this.createLockLayer();
    this.createResizeBar(this.width);
    this.createTooltip();
    this.timer = null;
    this.vk = "http://vkontakte.ru/";
    this.vkcom = "http://vk.com/";
    this.showErrorTime =
        600;
    this.choosePhotoBox = new MessageBox({
        width: 610,
        progress: "choose_photo_progress",
        bodyStyle: "height: 412px; padding: 0px;"
    });
    this.choosePhotoBox.addControlsText('<div class="pb_link" onclick="window[window.editorName].togglePhotoSetup();" onmouseover="pbSetClass(this, \'pb_link_over\')" onmouseout="pbSetClass(this, \'pb_link\')">' + wiki_select_photo_by_url + "</div>");
    this.choosePhotoBox.addButton({
        onClick: function() {
            this.choosePhotoBox.hide();
            this.photoBox.boxShow = false;
            this.photoElemID = null
        }.bind(this),
        label: box_close
    });
    window.choosePhotoBox = this.choosePhotoBox;
    this.photoBox = new MessageBox({
        title: wiki_adding_photo,
        width: 515,
        bodyStyle: "padding: 0px; height: 258px;"
    });
    this.photoPreviewSize = 200;
    this.photoQuestion = "/images/question_g.gif";
    this.images = [];
    this.chooseVideoBox = new MessageBox({
        title: wiki_adding_video,
        width: 610,
        progress: "choose_video_progress",
        bodyStyle: "height: 412px; padding: 0px;"
    });
    this.chooseVideoBox.removeButtons();
    this.chooseVideoBox.addButton({
        onClick: function() {
            this.chooseVideoBox.hide()
        }.bind(this),
        label: box_close
    });
    window.chooseVideoBox = this.chooseVideoBox;
    this.chooseAudioBox = new MessageBox({
        title: wiki_adding_audio,
        width: 610,
        progress: "choose_audio_progress",
        bodyStyle: "height: 412px; padding: 0px;",
        onHide: function() {
            if (AudioObject.curAudio && AudioObject.curAudio.substr(0, 6) == "Choose") {
                AudioObject.hidePlayer(AudioObject.curAudio, false, true);
                AudioObject.curAudio = null
            }
        }
    });
    this.chooseAudioBox.removeButtons();
    this.chooseAudioBox.addButton({
        onClick: function() {
            this.chooseAudioBox.hide()
        }.bind(this),
        label: box_close
    });
    window.chooseAudioBox = this.chooseAudioBox;
    this.charBox = new MessageBox({
        title: wiki_inserting_char,
        width: 340,
        bodyStyle: "padding: 0px;"
    });
    this.charBox.removeButtons();
    this.charBox.addButton({
        onClick: function() {
            this.charBox.hide()
        }.bind(this),
        label: box_close
    });
    this.categoryBox = new MessageBox({
        title: wiki_page_cat_and_sub_cat,
        width: 350,
        bodyStyle: "padding: 0px;"
    });
    this.categoryBox.removeButtons();
    this.categoryBox.addButton({
        onClick: function() {
            this.categoryBox.hide()
        }.bind(this),
        style: "button_no",
        label: box_cancel
    });
    this.categoryBox.addButton({
        onClick: function() {
            this.changeCategory()
        }.bind(this),
        label: wiki_edit
    });
    this.categoryBox.wiki = "";
    this.tableBox = new MessageBox({
        title: wiki_adding_table,
        width: 465,
        bodyStyle: "padding: 0px; height: 196px;"
    });
    this.linkBox = new MessageBox({
        width: 440,
        bodyStyle: "padding: 0px"
    });
    this.contentWiki = a.wiki;
    this.contentHTML != "" && this.HtmlToHtml(this.contentHTML, this.contentWiki);
    window.wysiwyg = true
}
Wysiwyg.prototype = {
    createContainer: function(a) {
        this.replaceElem = ge(a);
        this.contentHTML = this.params.html;
        this.width = this.replaceElem.offsetWidth - 2;
        this.height = this.params.height;
        this.cont = document.createElement("DIV");
        this.cont.className = "editor_cont";
        this.cont.style.width = this.width + "px";
        this.replaceElem.parentNode.insertBefore(this.cont, this.replaceElem);
        this.debug || hide(this.replaceElem)
    },
    frameInit: function(a, b, c, d, e) {
        var f = "frame" + a,
            g = document.createElement("IFRAME");
        g.setAttribute("marginWidth",
            "0");
        g.setAttribute("marginHeight", "0");
        g.setAttribute("frameBorder", "0");
        g.className = b;
        g.id = c;
        g.src = "javascript:void(0);";
        g.width = d + "px";
        g.height = e + "px";
        this.cont.appendChild(g);
        this["frameWin" + a] = this.getFrameWin(g);
        this["frameDoc" + a] = this.getFrameDoc(g);
        this[f] = g
    },
    registerHotkeys: function(a) {
        var b = this;
        a = this["frame" + a];
        if (browser.mozilla || browser.msie) addEvent(a.contentWindow.document, "keydown", function(c) {
            if (c.ctrlKey && c.keyCode == 66) {
                b.actSimple.call(b, "bold", "Bold", false);
                return false
            }
            if (c.ctrlKey &&
                c.keyCode == 73) {
                b.actSimple.call(b, "italic", "Italic", false);
                return false
            }
            if (c.ctrlKey && c.keyCode == 85) {
                b.actSimple.call(b, "underline", "Underline", false);
                return false
            }
        })
    },
    createIFrame: function(a, b) {
        this.frameInit("", "wysiwyg", "wysiwyg", a, b);
        this.writeFrameContent(this.frameDoc);
        this.frameDoc.designMode = "On";
        this.setDocOptions();
        this.init();
        this.registerHotkeys("")
    },
    createIFrameCut: function(a, b) {
        this.frameInit("Cut", "wysiwyg_cut", "", a, b);
        this.writeFrameContent(this.frameDocCut)
    },
    createTextArea: function(a,
        b) {
        this.textarea = document.createElement("TEXTAREA");
        this.textarea.style.width = a - 3 + "px";
        this.areaHeightOffset = 2;
        if (browser.mozilla) this.areaHeightOffset = 1;
        this.textarea.style.height = b + this.areaHeightOffset + "px";
        this.textarea.className = "wiki";
        this.cont.appendChild(this.textarea)
    },
    resizeEditor: function(a, b, c) {
        a = b ? a.pageY : a.pageY - c.frameTop;
        if (a > 200 && a < 500)
            if (this.wikiMode) c.textarea.style.height = a + "px";
            else c.frame.style.height = a + "px";
        c.removeSelection()
    },
    createResizeBar: function(a) {
        this.resizeBar = document.createElement("DIV");
        this.resizeBar.className = "editor_resize";
        this.resizeBar.style.width = a + "px";
        this.resizeBar.ondragstart = function() {
            return false
        };
        var b = this;
        addEvent(this.resizeBar, "mousedown", function() {
            this.frameTop = this.wikiMode ? getXY(this.textarea)[1] : getXY(this.frame)[1];
            this.isResize = true;
            document.body.style.cursor = "n-resize";
            this.frameDoc.body.style.cursor = "n-resize";
            show(this.lock);
            document.body.style.overflowX = "hidden";
            document.ondragstart = function() {
                return false
            }
        }.bind(this));
        document.onmouseup = this.resizeStop.bind(this);
        addEvent(document, "mouseup", this.resizeStop.bind(this));
        this.frameDoc.onmouseup = this.resizeStop.bind(this);
        addEvent(this.frameDoc, "mouseup", this.resizeStop.bind(this));
        addEvent(document, "mousemove", function(c) {
            b.isResize && b.resizeEditor(c, false, b)
        });
        addEvent(this.frameDoc, "mousemove", function(c) {
            b.isResize && b.resizeEditor(c, true, b)
        });
        this.cont.parentNode.insertBefore(this.resizeBar, this.cont.nextSibling)
    },
    removeSelection: function() {
        try {
            if (window.getSelection) window.getSelection().removeAllRanges();
            else document.selection && document.selection.empty && document.selection.empty()
        } catch (a) {}
    },
    createLockLayer: function() {
        var a = document.createElement("DIV"),
            b = document.body;
        a.id = "lock";
        a.style.width = b.clientWidth + "px";
        a.style.height = b.clientHeight + "px";
        b.appendChild(a);
        this.lock = a
    },
    resizeStop: function() {
        if (this.isResize) {
            this.isResize = false;
            document.body.style.cursor = "auto";
            this.frameDoc.body.style.cursor = "auto";
            hide(this.lock);
            document.ondragstart = null;
            document.body.style.overflowX = "auto";
            this.setDocOptions();
            if (this.wikiMode) this.frame.style.height = parseInt(this.textarea.style.height) + -this.areaHeightOffset + "px";
            else this.textarea.style.height = parseInt(this.frame.style.height) + this.areaHeightOffset + "px"
        }
    },
    createTooltip: function() {
        var a = document.createElement("DIV"),
            b = "";
        a.id = "tooltip";
        b += '<div class="tooltip_top"></div>';
        b += '<div class="tooltip_line1"></div>';
        b += '<div class="tooltip_line2"></div>';
        b += '<div class="tooltip_bottom"></div>';
        a.innerHTML = b;
        ge("pageContainer").appendChild(a)
    },
    showTooltip: function(a,
        b, c) {
        b = b.replace(/ /g, "&nbsp;");
        var d = ge("tooltip");
        a = getXY(a);
        tooltip_text = d.childNodes[0].innerHTML = b;
        d.style.left = a[0] + "px";
        d.style.top = a[1] - 25 + "px";
        if (browser.msie) d.style.display = "block";
        else fadeTo(d, 200, 1);
        b = d.offsetWidth;
        if (c) d.style.left = a[0] - b + 21 + "px"
    },
    hideTooltip: function() {
        var a = ge("tooltip");
        a && hide(a)
    },
    getEditorMode: function() {
        var a = getCookie("wysiwyg");
        this.editorMode = this.params.defaultMode;
        if (a == "1") this.editorMode = "extended"
    },
    toggleWysiwygMode: function() {
        this.editorMode = this.editorMode ==
            "simple" ? "extended" : "simple";
        var a = getCookie("wysiwyg");
        if (a != "1" && this.editorMode == "extended") setCookie("wysiwyg", "1", 365);
        else a != "0" && this.editorMode == "simple" && setCookie("wysiwyg", "0", 365);
        a = new ToolBar(this, this.editorMode, this.params);
        var b = this.toolbar.div;
        if (b) {
            this.cont.replaceChild(a.div, b);
            this.toolbar = a
        }
        this.addButtonsActions()
    },
    getFrameWin: function(a) {
        return a.window ? a.window : a.contentWindow
    },
    getFrameDoc: function(a) {
        return a.contentDocument ? a.contentDocument : this.getFrameWin(a).document
    },
    writeFrameContent: function(a) {
        a.open();
        a.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru"><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1251" /><link rel="stylesheet" href="' + this.params.contentCSS + '" type="text/css" /><base href="http://vkontakte.ru/" /></head><body spellcheck="false" class="editor_body"><p>\ufeff</p></body></html>');
        a.close()
    },
    addButtonsActions: function() {
        var a = this,
            b = this.toolbar;
        each([
            ["bold", "Bold", false],
            ["italic", "Italic", false],
            ["underline", "Underline", false],
            ["strike", "StrikeThrough", false],
            ["sup", "Superscript", false],
            ["sub", "Subscript", false],
            ["marker_list", "InsertUnorderedList", true],
            ["numeric_list", "InsertOrderedList", true],
            ["undo", "Undo", false],
            ["redo", "Redo", false]
        ], function(c, d) {
            a.defaultAction(d[0], d[1], d[2])
        });
        b.addAction("clear", this.actClear.bind(this));
        b.addAction("outdent", this.actOutdent.bind(this));
        b.addAction("indent", this.actIndent.bind(this));
        b.addAction("h1", this.actHeader.extBind(this, "h1"));
        b.addAction("h2", this.actHeader.extBind(this, "h2"));
        b.addAction("h3", this.actHeader.extBind(this, "h3"));
        b.addAction("image", this.choosePhoto.bind(this));
        b.addAction("video", this.chooseVideo.bind(this));
        b.addAction("audio", this.chooseAudio.bind(this));
        b.addAction("link", this.actLink.bind(this));
        b.addAction("unlink", this.actUnLink.bind(this));
        b.addAction("character", this.actChar.bind(this));
        b.addAction("table",
            this.actTable.bind(this));
        b.addAction("table_delete", this.actTableDelete.bind(this));
        b.addAction("insert_row_before", this.actTableActions.extBind(this, "insert_row_before"));
        b.addAction("insert_row_after", this.actTableActions.extBind(this, "insert_row_after"));
        b.addAction("insert_col_before", this.actTableActions.extBind(this, "insert_col_before"));
        b.addAction("insert_col_after", this.actTableActions.extBind(this, "insert_col_after"));
        b.addAction("delete_row", this.actTableActions.extBind(this, "delete_row"));
        b.addAction("delete_col", this.actTableActions.extBind(this, "delete_col"));
        b.addAction("col_width", this.actTableActions.extBind(this, "col_width"));
        b.addAction("hider", this.actHider.bind(this));
        b.addAction("citate", this.actCitate.bind(this));
        b.addAction("category", this.actCategory.bind(this));
        b.addAction("time", this.actTime.bind(this));
        b.addAction("signature", this.actSignature.bind(this));
        b.addAction("debug", this.convertToWiki.bind(this));
        b.addAction("wiki", this.actToggleWiki.bind(this));
        b.addAction("pre",
            this.actPre.bind(this));
        b.addAction("left", this.actLeft.bind(this));
        b.addAction("center", this.actCenter.bind(this));
        b.addAction("right", this.actRight.bind(this));
        b.addAction("gray", this.actGray.bind(this))
    },
    actLeft: function() {
        var a = this.getRangeContainer();
        if (a.parentNode)
            if (this.testCenter(a.parentNode) || this.testRight(a.parentNode)) {
                a = a.parentNode;
                if (a.align == "center" || a.align == "right") {
                    a.align = "left";
                    a.style.textAlign = ""
                } else if (a.style.textAlign == "center" || a.style.textAlign == "right") {
                    a.style.textAlign =
                        "left";
                    a.align = ""
                }
            }
        this.frameDoc.execCommand("JustifyLeft", false, true);
        this.getFormat()
    },
    actCenter: function() {
        var a = this.getRangeContainer();
        if (a.parentNode)
            if (this.testLeft(a.parentNode) || this.testRight(a.parentNode)) {
                a = a.parentNode;
                if (a.align == "left" || a.align == "right") {
                    a.align = "center";
                    a.style.textAlign = ""
                } else if (a.style.textAlign == "left" || a.style.textAlign == "right") {
                    a.style.textAlign = "center";
                    a.align = ""
                }
            }
        this.frameDoc.execCommand("JustifyCenter", false, true);
        this.getFormat()
    },
    actRight: function() {
        var a =
            this.getRangeContainer();
        if (a.parentNode)
            if (this.testLeft(a.parentNode) || this.testCenter(a.parentNode)) {
                a = a.parentNode;
                if (a.align == "left" || a.align == "center") {
                    a.align = "right";
                    a.style.textAlign = ""
                } else if (a.style.textAlign == "left" || a.style.textAlign == "center") {
                    a.style.textAlign = "right";
                    a.align = ""
                }
            }
        this.frameDoc.execCommand("JustifyRight", false, true);
        this.getFormat()
    },
    actGray: function() {
        var a = this.getRangeContainer(),
            b = this.getRange();
        if (!(b.startContainer == b.endContainer && b.startOffset == b.endOffset &&
                b.startOffset == 0)) {
            var c = this.testAllGrayInSelection();
            this.testSelectionContainerIsText();
            var d = this.testSelectedAll();
            if (c)
                if (d) {
                    c = a.parentNode;
                    c.parentNode.replaceChild(a, c)
                } else {
                    var e = b.startOffset;
                    b = b.endOffset;
                    var f = a.data.length;
                    c = a.parentNode;
                    c.parentNode.replaceChild(a, c);
                    d = 0;
                    if (e > 0) {
                        c = this.frameDoc.createElement("SPAN");
                        c.style.color = "#777";
                        c.innerHTML = a.data.substring(0, e);
                        a.data = a.data.substring(e, a.data.length);
                        a.parentNode.insertBefore(c, a);
                        d = e
                    }
                    if (b < f) {
                        c = this.frameDoc.createElement("SPAN");
                        c.style.color = "#777";
                        c.innerHTML = a.data.substring(b - d, a.data.length);
                        a.data = a.data.substring(0, b - d);
                        this.insertAfter(a.parentNode, c, a)
                    }
                }
            else if (b.startContainer == b.endContainer) {
                e = b.startOffset;
                b = b.endOffset;
                f = a.data.length;
                c = this.frameDoc.createElement("SPAN");
                c.style.color = "#777";
                c.innerHTML = a.data.substring(e, b);
                if (d) a.parentNode.replaceChild(c, a);
                else {
                    if (e > 0) {
                        d = this.frameDoc.createTextNode(a.data.substring(0, e));
                        a.parentNode.insertBefore(d, a)
                    }
                    a.parentNode.insertBefore(c, a);
                    if (b < f) {
                        d = this.frameDoc.createTextNode(a.data.substring(b,
                            a.data.length));
                        a.parentNode.insertBefore(d, a)
                    }
                    a.parentNode.removeChild(a)
                }
                if (e == 0 && c.previousSibling && this.testGray(c.previousSibling)) {
                    c.innerHTML = c.previousSibling.innerHTML + c.innerHTML;
                    c.previousSibling.parentNode.removeChild(c.previousSibling)
                }
                if (b == f && c.nextSibling && this.testGray(c.nextSibling)) {
                    c.innerHTML += c.nextSibling.innerHTML;
                    c.nextSibling.parentNode.removeChild(c.nextSibling)
                }
            } else {
                f = null;
                if (b.startOffset == 0 && b.startContainer.previousSibling && this.testGray(b.startContainer.previousSibling)) f =
                    b.startContainer.previousSibling;
                else if (b.startContainer.parentNode.nodeName == "SPAN" && this.testGray(b.startContainer.parentNode)) f = b.startContainer.parentNode;
                else {
                    c = this.frameDoc.createElement("SPAN");
                    c.style.color = "#777";
                    c.innerHTML = b.startContainer.data.substring(b.startOffset, b.startContainer.data.length);
                    b.startContainer.data = b.startContainer.data.substring(0, b.startOffset);
                    this.insertAfter(b.startContainer.parentNode, c, b.startContainer);
                    f = c
                }
                a = null;
                if (b.endOffset == b.endContainer.data.length &&
                    b.endContainer.nextSibling && this.testGray(b.endContainer.nextSibling)) a = b.endContainer.nextSibling;
                else if (b.endContainer.parentNode.nodeName == "SPAN" && this.testGray(b.endContainer.parentNode)) a = b.endContainer.parentNode;
                else {
                    c = this.frameDoc.createElement("SPAN");
                    c.style.color = "#777";
                    c.innerHTML = b.endContainer.data.substring(0, b.endOffset);
                    b.endContainer.data = b.endContainer.data.substring(b.endOffset, b.endContainer.data.length);
                    b.endContainer.parentNode.insertBefore(c, b.endContainer);
                    a = c
                }
                e = "";
                for (c =
                    f; c != a;) {
                    b = c.nextSibling;
                    e += c.firstChild ? c.firstChild.data : c.data;
                    c.parentNode.removeChild(c);
                    c = b
                }
                e += a.innerHTML;
                c = this.frameDoc.createElement("SPAN");
                c.style.color = "#777";
                c.innerHTML = e;
                a.parentNode.replaceChild(c, a)
            }
            this.getRange().collapse(true);
            this.getFormat()
        }
    },
    testSelectedAll: function() {
        var a = this.getRange();
        return a.startOffset == 0 && a.endOffset == a.endContainer.data.length
    },
    testSelectionContainerIsText: function() {
        return this.getRangeContainer().nodeType == 3
    },
    testAllGrayInSelection: function() {
        var a =
            this.getRangeContainer();
        if (a.nodeType == 3) a = a.parentNode;
        return a.nodeName == "SPAN" && this.testGray(a)
    },
    insertAfter: function(a, b, c) {
        a.insertBefore(b, c.nextSibling)
    },
    recursiveCallback: function(a, b) {
        var c = a.childNodes;
        b.call(this, a);
        for (var d = 0; d < c.length; d++) this.recursiveCallback(c[d], b)
    },
    actClear: function() {
        this.alertBox(wiki_warning, wiki_really_delete_all, box_yes, box_cancel, function() {
            this.resetAll();
            this.setContent("");
            this.frameWin.focus()
        }.bind(this), null)
    },
    actToggleWiki: function() {
        if (this.timer !=
            null) return false;
        if (this.toolbar.wiki.down) {
            this.toolbar.wiki.unselect();
            this.wikiMode = false
        } else {
            this.toolbar.wiki.select();
            this.wikiMode = true
        }
        toggleWysiwygWiki();
        this.timer = setTimeout(function() {
            this.timer = null
        }.bind(this), 1E3)
    },
    createToolbar: function(a) {
        this.toolbar = new ToolBar(this, this.editorMode, a);
        this.addButtonsActions();
        this.cont.appendChild(this.toolbar.div)
    },
    defaultAction: function(a, b, c) {
        var d = this;
        this.toolbar.addAction(a, function() {
            d.actSimple.call(d, a, b, c)
        })
    },
    getPrevElem: function(a) {
        for (a =
            a; a = a.previousSibling;)
            if (!(a.nodeType == 3 && trim(a.nodeValue) == "")) break;
        return a
    },
    getNextElem: function(a) {
        for (a = a; a = a.nextSibling;)
            if (!(a.nodeType == 3 && trim(a.nodeValue) == "")) break;
        return a
    },
    setFocusBeforeAfter: function(a, b) {
        var c = null;
        c = b ? this.getPrevElem(a) : this.getNextElem(a);
        if (c == null || c.nodeName == "TABLE" || c.nodeName == "BLOCKQUOTE") {
            var d = this.frameDoc.createElement("P");
            d.innerHTML = "\ufeff";
            if (b) a.parentNode.insertBefore(d, a);
            else c != null ? a.parentNode.insertBefore(d, c) : a.parentNode.appendChild(d);
            this.setElemFocus(d);
            this.getFormat()
        } else c != null && this.setElemFocus(c)
    },
    actOutdent: function() {
        this.frameWin.focus();
        var a = this.getParentElement("TABLE", "BLOCKQUOTE");
        a != null ? this.setFocusBeforeAfter(a, true) : this.frameDoc.execCommand("Outdent", false, false);
        this.getFormat()
    },
    actIndent: function() {
        this.frameWin.focus();
        var a = this.getParentElement("TABLE", "BLOCKQUOTE");
        a != null ? this.setFocusBeforeAfter(a, false) : this.frameDoc.execCommand("Indent", false, false);
        this.getFormat()
    },
    getElemsInSelection: function() {
        var a =
            this.getRange(),
            b = [];
        if (a.startContainer != a.endContainer) {
            var c = this.getCommonParent(a.startContainer, a.endContainer);
            a = c.commonPrev;
            c = c.commonNext;
            var d = a;
            if (a.nodeName != "BODY" && c.nodeName != "BODY") {
                for (; d != c;) {
                    b.push(d);
                    d = d.nextSibling
                }
                b.push(d)
            }
        } else b.push(a.startContainer);
        return b
    },
    testSelectionCenter: function() {
        var a = this.getElemsInSelection(),
            b = true;
        if (a.length > 1) each(a, function(d, e) {
            this.testCenter(e) || (b = false)
        }.bind(this));
        else {
            a = this.getRange().startContainer;
            for (var c = false; a.nodeName !=
                "BODY";) {
                if (a.nodeType != 3 && this.testCenter(a)) {
                    c = true;
                    break
                }
                a = a.parentNode
            }
            b = c
        }
        return b
    },
    testSelectionRight: function() {
        var a = this.getElemsInSelection(),
            b = true;
        if (a.length > 1) each(a, function(d, e) {
            this.testRight(e) || (b = false)
        }.bind(this));
        else {
            a = this.getRange().startContainer;
            for (var c = false; a.nodeName != "BODY";) {
                if (a.nodeType != 3 && this.testRight(a)) {
                    c = true;
                    break
                }
                a = a.parentNode
            }
            b = c
        }
        return b
    },
    setDocOptions: function() {
        var a = this.frameDoc;
        try {
            a.execCommand("StyleWithCSS", false, true);
            a.execCommand("useCSS",
                false, true);
            a.execCommand("MultipleSelection", false, false);
            a.execCommand("EnableInlineTableEditing", false, false);
            a.execCommand("EnableObjectResizing", false, false);
            a.execCommand("RespectVisibilityInDesign", true, null);
            a.execCommand("BackgroundImageCache", false, true)
        } catch (b) {}
    },
    actSimple: function(a, b, c) {
        this.toolbar[a].down ? this.toolbar[a].unselect() : this.toolbar[a].select();
        this.frameWin.focus();
        this.frameDoc.execCommand(b, false, true);
        c && this.getFormat()
    },
    clearEmptyTags: function(a) {
        a = this.frameDoc.getElementsByTagName(a);
        for (var b = a.length, c = 0, d = 0; d < b; d++) {
            var e = trim(this.getInnerText(a[c]));
            if (e == "" || e == "\ufeff") {
                e = this.frameDoc.createElement("P");
                e.innerHTML = "<br>";
                a[c].parentNode.replaceChild(e, a[c])
            } else c++
        }
    },
    getInnerText: function(a) {
        return a.innerText != undefined ? a.innerText : a.textContent != undefined ? a.textContent : null
    },
    setInnerText: function(a, b) {
        if (a.innerText != undefined) a.innerText = b;
        else if (a.textContent != undefined) a.textContent = b
    },
    setElemFocus: function(a, b) {
        if (b == undefined) b = false;
        if (this.frameWin.getSelection) {
            var c =
                this.frameWin.getSelection(),
                d = this.frameDoc.createRange();
            c.removeAllRanges();
            d.selectNodeContents(a);
            d.collapse(b);
            c.addRange(d)
        } else {
            d = this.frameDoc.body.createTextRange();
            if (a.nodeType != 3) try {
                d.moveToElementText(a);
                d.collapse(b);
                d.select()
            } catch (e) {}
        }
        this.getFormat()
    },
    getFormat: function() {
        this.getRange();
        var a = this.getRangeContainer();
        if (a == null) return false;
        var b = {},
            c = {};
        for (this.nodeList = b; a.nodeName != "BODY";) {
            if (b[a.nodeName] == undefined) {
                b[a.nodeName] = {};
                b[a.nodeName].classes = {};
                b[a.nodeName].styles = [];
                b[a.nodeName].nodes = []
            }
            b[a.nodeName].classes[a.className == "" ? "none" : a.className] = true;
            b[a.nodeName].styles.push(a.style);
            b[a.nodeName].nodes.push(a);
            a = a.parentNode
        }
        a = function(e, f, g, h) {
            for (var i = 0; i < e.length; i++) {
                if (e[i][f] == g) return true;
                if (h && e[i].getAttribute(f) == g) return true
            }
            return false
        };
        var d = function() {
            if (arguments.length == 2)
                if (arguments[1]) {
                    if (c[arguments[0]] !== false) c[arguments[0]] = arguments[1]
                } else c[arguments[0]] = arguments[1];
            else
                for (var e = 0; e < arguments.length - 1; e++) d(arguments[e],
                    arguments[arguments.length - 1])
        };
        if (b.CAPTION) {
            d("TABLE", "INDENT", "OUTDENT", "ONLY_CAPTION", true);
            d("TABLE_ACTIONS", false)
        }
        if (b.TABLE && (b.TABLE.classes.hider || b.TABLE.classes.hiderOpened)) {
            d("HIDER", "DISABLE_HEADERS", true);
            b.TABLE && b.TABLE.classes.none || d("TABLE_ACTIONS", "TABLE", false)
        }
        if (b.TD && b.TD.classes.hiderHeader) {
            d("ONLY_HIDER_HEADER", true);
            d("TABLE_ACTIONS", "TABLE", false)
        }
        if (b.SPAN && b.SPAN.classes.signature) {
            d("SIGNATURE", "ONLY_SIGNATURE", true);
            d("LINK", false)
        }
        if (b.TD && b.TABLE.classes.pre) {
            d("ONLY_PRE",
                "PRE", "INDENT", "OUTDENT", true);
            d("TABLE_ACTIONS", "TABLE", false)
        }
        if (b.TABLE && b.TABLE.classes.wikiAudio) {
            d("TABLE", "TABLE_ACTIONS", false);
            d("ONLY_AUDIO", "AUDIO", true)
        }
        b.BLOCKQUOTE && d("CITATE", "INDENT", "OUTDENT", "DISABLE_HEADERS", true);
        if (b.B || b.STRONG) d("BOLD", true);
        if (b.I || b.EM) d("ITALIC", true);
        b.U && d("UNDERLINE", true);
        b.H1 && d("H1", "ONLY_HEADERS", true);
        b.H2 && d("H2", "ONLY_HEADERS", true);
        b.H3 && d("H3", "ONLY_HEADERS", true);
        if (b.STRIKE || b.S) d("STRIKE", true);
        b.SUB && d("SUB", true);
        b.SUP && d("SUP", true);
        b.UL &&
            d("MARKER_LIST", "DISABLE_HEADERS", true);
        b.OL && d("NUMERIC_LIST", "DISABLE_HEADERS", true);
        b.A && !b.A.classes.wikiPhoto && d("LINK", true);
        b.SPAN && a(b.SPAN.styles, "textDecoration", "underline") && d("UNDERLINE", true);
        b.SPAN && a(b.SPAN.styles, "textDecoration", "line-through") && d("STRIKE", true);
        if (b.DIV && (a(b.DIV.nodes, "align", "center") || a(b.DIV.styles, "textAlign", "center"))) d("CENTER", true);
        if (b.DIV && (a(b.DIV.nodes, "align", "right") || a(b.DIV.styles, "textAlign", "right"))) d("RIGHT", true);
        if (b.P && (a(b.P.nodes, "align",
                "center") || a(b.P.styles, "textAlign", "center"))) d("CENTER", "DISABLE_MARKERS", "DISABLE_HEADERS", true);
        if (b.P && (a(b.P.nodes, "align", "right") || a(b.P.styles, "textAlign", "right"))) d("RIGHT", "DISABLE_MARKERS", "DISABLE_HEADERS", true);
        if (b.TD && (a(b.TD.nodes, "align", "center") || a(b.TD.styles, "textAlign", "center"))) d("CENTER", true);
        if (b.TD && (a(b.TD.nodes, "align", "right") || a(b.TD.styles, "textAlign", "right"))) d("RIGHT", true);
        if (b.TH && (a(b.TH.nodes, "align", "center") || a(b.TH.styles, "textAlign", "center"))) d("CENTER",
            true);
        if (b.TH && (a(b.TH.nodes, "align", "right") || a(b.TH.styles, "textAlign", "right"))) d("RIGHT", true);
        if (b.TD || b.TH) d("TABLE", "INDENT", "OUTDENT", "TABLE_ACTIONS", "DISABLE_HEADERS", true);
        if (b.LI) {
            a = this.testLiPosition();
            b.UL && a.outdent && d("DISABLE_NUMERIC_LIST", true);
            b.OL && a.outdent && d("DISABLE_MARKER_LIST", true);
            a.indent && d("INDENT", true);
            a.outdent && d("OUTDENT", true);
            d("DISABLE_MEDIA", "DISABLE_CENTER", "DISABLE_RIGHT", true)
        }
        this.resetAll();
        c.INDENT && this.toolbar.indent.enable();
        c.OUTDENT && this.toolbar.outdent.enable();
        c.ONLY_CAPTION && this.enableOnly("clear", "table", "indent", "outdent", "bold", "italic", "sub", "sup", "underline", "gray", "strike", "category", "wiki");
        c.ONLY_HIDER && this.enableOnly("clear", "indent", "outdent", "italic", "sub", "sup", "underline", "gray", "strike", "category", "hider", "wiki");
        c.ONLY_HIDER_HEADER && this.enableOnly("clear", "indent", "outdent", "category", "hider", "wiki");
        c.ONLY_HEADERS && this.enableOnly("clear", "h1", "h2", "h3", "category", "wiki");
        c.ONLY_PRE && this.enableOnly("clear", "indent", "outdent", "pre",
            "category", "wiki");
        c.ONLY_AUDIO && this.enableOnly("clear", "indent", "outdent", "category", "wiki", "audio");
        c.DISABLE_HEADERS && this.disableToolBar("h1", "h2", "h3");
        c.DISABLE_MARKERS && this.disableToolBar("marker_list", "numeric_list");
        c.DISABLE_MEDIA && this.disableToolBar("image", "video", "audio", "hider", "blockquote");
        c.ONLY_SIGNATURE && this.enableOnly("clear", "citate", "center", "right", "h1", "h2", "h3", "marker_list", "numeric_list", "category", "hider", "wiki");
        c.DISABLE_CENTER && this.toolbar.center.disable();
        c.DISABLE_RIGHT &&
            this.toolbar.right.disable();
        c.DISABLE_NUMERIC_LIST && this.toolbar.numeric_list.disable();
        c.DISABLE_MARKER_LIST && this.toolbar.marker_list.disable();
        c.TABLE_ACTIONS && this.allowTableActions(true);
        c.LINK && this.toolbar.unlink.enable();
        !c.CENTER && !c.RIGHT && d("LEFT", true);
        this.selectToolBarButtons(c);
        this.testLastChild()
    },
    unSelectAll: function() {
        for (key in this.toolbar.buttons) this.toolbar[key] && this.toolbar[key].unselect()
    },
    resetAll: function() {
        this.unSelectAll();
        for (key in this.toolbar.buttons)
            if (this.toolbar.buttons[key].disabled) this.toolbar[key] &&
                this.toolbar[key].disable();
            else this.toolbar[key] && this.toolbar[key].enable()
    },
    selectToolBarButtons: function(a) {
        for (key in a) {
            var b = this.toolbar[key.toLowerCase()];
            b && a[key] && b.select()
        }
    },
    tableArrowTest: function(a) {
        if (this.nodeList.TABLE && this.inArray(a.keyCode, [KEY.LEFT, KEY.RIGHT, KEY.UP, KEY.DOWN])) {
            var b = this.getParentElement("TABLE");
            if (b.className == "" || b.className == "wikTable") {
                var c = this.getParentElement("TD"),
                    d = c.parentNode,
                    e = c.cellIndex,
                    f = d.rowIndex,
                    g = null,
                    h = null,
                    i = null;
                if (c.innerHTML == "\ufeff") {
                    if (f !=
                        0) h = b.rows[f - 1];
                    if (f != b.rows.length - 1) i = b.rows[f + 1];
                    switch (a.keyCode) {
                        case KEY.LEFT:
                            if (e != 0) g = d.cells[e - 1];
                            else if (h) g = h.cells[h.cells.length - 1];
                            break;
                        case KEY.RIGHT:
                            if (e != d.cells.length - 1) g = d.cells[e + 1];
                            else if (i) g = i.cells[0];
                            break;
                        case KEY.UP:
                            if (h) g = h.cells[e];
                            break;
                        case KEY.DOWN:
                            if (i) g = i.cells[e]
                    }
                    if (g) {
                        this.setElemFocus(g);
                        return true
                    }
                }
            }
        }
    },
    keyUpFilter: function(a) {
        var b = [KEY.LEFT, KEY.RIGHT, KEY.DOWN, KEY.UP, KEY.PAGEUP, KEY.PAGEDOWN, KEY.HOME, KEY.END, KEY.ENTER, KEY.DELETE, KEY.BACKSPACE];
        if (a.ctrlKey) {
            this.getFormat();
            return cancelEvent(a)
        }
        for (var c = 0; c < b.length; c++)
            if (a.keyCode == b[c]) {
                if (a.keyCode == KEY.DELETE || a.keyCode == KEY.BACKSPACE) {
                    this.testLastChild();
                    if (this.selectedElem) try {
                        this.selectedElem.parentNode.removeChild(this.selectedElem)
                    } catch (d) {}
                }
                this.getFormat();
                return null
            }
        browser.mozilla && this.formatText(a)
    },
    audioTableCancel: function() {
        if (this.nodeList.TABLE && this.nodeList.TABLE.classes.wikiAudio) return true
    },
    testLastChild: function() {
        var a = this.frameDoc.body.lastChild;
        if (a)
            if (a.nodeName != "P" || a.innerHTML !=
                "\ufeff") {
                a = this.frameDoc.createElement("P");
                a.innerHTML = "\ufeff";
                this.frameDoc.body.appendChild(a)
            }
    },
    init: function() {
        this.cont.ondragstart = function() {
            return false
        };
        this.frameDoc.ondragstart = function() {
            return false
        };
        this.frameDoc.oncontrolselect = function() {
            return false
        };
        this.frameDoc.onresizestart = function() {
            return false
        };
        addEvent(this.frameDoc, "resizestart", function() {
            return false
        });
        addEvent(this.frameDoc, "dragstart", function() {
            return false
        });
        addEvent(this.frameDoc, "click", function() {
            this.selectedElem &&
                this.selectElement(this.selectedElem)
        }.bind(this));
        addEvent(this.frameDoc, "mouseup", function() {
            this.getFormat();
            this.resizeStop()
        }.bind(this));
        KEY.HOME = 36;
        KEY.END = 35;
        KEY.ENTER = 13;
        KEY.DELETE = 46;
        KEY.BACKSPACE = 8;
        var a = this,
            b = "keydown";
        if (browser.opera) b = "keypress";
        addEvent(this.frameDoc, b, function(c) {
            a.linkFix.call(a, c);
            if (a.headerFix.call(a, c)) return cancelEvent(c);
            if (browser.chrome && a.nodeList.CAPTION && c.keyCode == KEY.ENTER && !c.shiftKey) return cancelEvent(c);
            if (a.nodeList.SPAN && a.nodeList.SPAN.classes.signature)
                if (!a.inArray(c.keyCode, [KEY.LEFT, KEY.RIGHT, KEY.UP, KEY.DOWN, KEY.HOME, KEY.END])) return cancelEvent(c);
            if (browser.opera && a.audioTableCancel.call(a)) return cancelEvent(c);
            if (a.tableArrowTest(c)) return cancelEvent(c)
        });
        addEvent(this.frameDoc, "keyup", this.keyUpFilter.bind(this))
    },
    formatText: function() {
        this.getRangeContainer().nodeName == "BODY" && this.frameDoc.execCommand("FormatBlock", false, "<P>")
    },
    setContent: function(a) {
        var b = this.frameDoc.body;
        if (!b) b = this.frameDoc;
        b.innerHTML = a ? a : "<p><br></p>"
    },
    removeElemArray: function(a, b) {
        for (var c =
                a.length, d = 0, e = 0; e < c; e++)
            if (a[d] == b) {
                a.splice(d, 1);
                break
            } else d++
    },
    selectElement: function(a) {
        if (hasClass(a, "selected")) {
            removeClass(a, "selected");
            this.selectedElem = null
        } else {
            this.selectedElem && this.selectElement(this.selectedElem);
            this.selectedElem = a;
            addClass(a, "selected")
        }
    },
    decURI: function(a) {
        var b = null;
        try {
            b = decodeURIComponent(a)
        } catch (c) {
            b = a
        }
        return b
    },
    encURI: function(a) {
        var b = null;
        try {
            b = encodeURIComponent(a)
        } catch (c) {
            b = a
        }
        return b
    },
    insertParagraph: function(a, b) {
        var c = this.frameDoc.createElement("P");
        c.innerHTML = "<br>";
        if (b == "before") a.parentNode.insertBefore(c, a);
        else a.nextSibling ? a.parentNode.insertBefore(c, a.nextSibling) : a.parentNode.appendChild(c);
        return c
    },
    getElemOffsets: function(a) {
        var b = false,
            c = false;
        if (browser.msie) {
            c = this.frameDoc.selection.createRange();
            b = c.duplicate();
            var d = c.duplicate();
            b.moveToElementText(a);
            d.moveToElementText(a);
            b.collapse(true);
            d.collapse(false);
            a = this.frameDoc.body.createTextRange();
            a.setEndPoint("StartToStart", b);
            a.setEndPoint("EndToEnd", c);
            b = a.text.length;
            a.setEndPoint("StartToStart", c);
            a.setEndPoint("EndToEnd", d);
            c = a.text.length
        } else {
            c = this.getRange();
            a = c.cloneRange();
            a.setStartBefore(a.commonAncestorContainer);
            b = a.toString().length;
            a = c.cloneRange();
            a.setEndAfter(a.commonAncestorContainer);
            c = a.toString().length
        }
        b = b == 0 ? true : false;
        c = c == 0 ? true : false;
        return {
            startOffset: b,
            endOffset: c
        }
    },
    getRange: function() {
        if (this.frameWin.getSelection) {
            var a = this.frameWin.getSelection();
            if (a.rangeCount != 0) return a.getRangeAt(0);
            else this.frameDoc.createRange()
        } else if (this.frameDoc.selection) return this.frameDoc.selection.createRange();
        return null
    },
    getRangeContainer: function() {
        var a = this.getRange();
        if (a != null)
            if (a.commonAncestorContainer) return a.commonAncestorContainer;
            else if (a.parentElement) return a.parentElement();
        return null
    },
    testLiPosition: function() {
        var a = {},
            b = this.nodeList.LI.nodes[0],
            c = b.nextSibling,
            d = b.parentNode;
        if (d.firstChild != b) a.indent = true;
        b = d.getElementsByTagName(d.nodeName);
        if (this.nodeList[d.nodeName] && this.nodeList[d.nodeName].nodes.length > 1 && (b.length == 0 || c.nodeName == "LI")) a.outdent = true;
        return a
    },
    enableToolBar: function() {
        for (var a =
                0; a < arguments.length; a++) this.toolbar[arguments[a]] && this.toolbar[arguments[a]].enable()
    },
    disableToolBar: function() {
        for (var a = 0; a < arguments.length; a++) {
            this.toolbar[arguments[a]] && this.toolbar[arguments[a]].unselect();
            this.toolbar[arguments[a]] && this.toolbar[arguments[a]].disable()
        }
    },
    enableOnly: function() {
        for (key in this.toolbar.buttons)
            if (this.inArray(key, arguments)) this.toolbar[key] && this.toolbar[key].enable();
            else this.toolbar[key] && this.toolbar[key].disable()
    },
    getParentElement: function() {
        this.frameWin.focus();
        var a = false;
        this.getRange();
        for (var b = this.getRangeContainer(); b.nodeName != "BODY" && !a;) {
            for (var c = 0; c < arguments.length; c++)
                if (arguments[c].toUpperCase() == b.nodeName.toUpperCase()) {
                    a = true;
                    break
                }
            if (!a) b = b.parentNode
        }
        if (b.nodeName == "BODY") b = null;
        return b
    },
    inArray: function(a, b) {
        for (var c = 0; c < b.length; c++)
            if (b[c] == a) return true;
        return false
    },
    setInputFocusEnd: function(a) {
        if (browser.msie) {
            if (a.createTextRange) {
                a = a.createTextRange();
                a.collapse(false);
                a.select()
            }
        } else {
            var b = a.value.length;
            a.setSelectionRange(b,
                b);
            a.focus()
        }
    },
    getNodeFrag: function(a) {
        var b = this.frameDoc.createDocumentFragment();
        if (a.childNodes.length == 0) b.appendChild(a);
        else
            for (; a.childNodes.length != 0;) b.appendChild(a.childNodes[0]);
        return b
    },
    setObjOptions: function(a, b) {
        for (key in b)
            for (var c = b[key][b[key].length - 1], d = 0; d < b[key].length - 1; d++)
                for (var e = d == 0 ? true : false, f = 0; f < b[key][d].length; f++) {
                    var g = b[key][d];
                    if (c) a[g[f]][key](e);
                    else a[g[f]][key] = e
                }
    },
    unFocusIE: function() {
        browser.msie && this.frameDoc.selection.empty()
    },
    insertNodeFunc: function(a,
        b) {
        this.frameWin.focus();
        if (browser.msie) {
            var c = this.frameDoc.createElement("DIV");
            c.appendChild(a);
            b.pasteHTML(c.innerHTML)
        } else {
            b.insertNode(a);
            c = this.frameDoc.createTextNode("\ufeff");
            a.nextSibling && a.parentNode.insertBefore(c, a.nextSibling)
        }
    },
    alertBox: function(a, b, c, d, e, f) {
        var g = new MessageBox({
            title: a
        });
        g.removeButtons();
        d && g.addButton({
            onClick: function() {
                g.hide();
                f && f()
            },
            style: "button_no",
            label: d
        });
        c && g.addButton({
            onClick: function() {
                g.hide();
                e && e()
            },
            label: c
        });
        g.content(b);
        g.show()
    },
    extendObj: function(a,
        b) {
        for (var c = 0; c < b.length; c++)
            if (a[b[c]] == undefined) a[b[c]] = ge(b[c])
    },
    getCommonParent: function(a, b) {
        for (var c = a, d = b, e = [], f = []; c.nodeName != "BODY";) {
            e.push(c);
            if (c.parentNode.nodeName == "BODY") break;
            c = c.parentNode
        }
        for (; d.nodeName != "BODY";) {
            f.push(d);
            if (d.parentNode.nodeName == "BODY") break;
            d = d.parentNode
        }
        for (var g = null, h = 0; h < e.length; h++) {
            for (var i = 0; i < f.length; i++)
                if (f[i] == e[h]) {
                    c = f[i];
                    d = f[i];
                    g = c.parentNode;
                    break
                }
            if (g != null) break
        }
        if (g == null) g = this.frameDoc.body;
        return {
            commonParent: g,
            commonPrev: c,
            commonNext: d
        }
    },
    actPre: function() {
        var a = this;
        if (this.nodeList.TABLE && this.nodeList.TABLE.classes.pre) this.alertBox(wiki_warning, wiki_warning_delete_pre, global_delete, box_cancel, function() {
            for (var d = a.nodeList.TABLE.nodes, e = 0; e < d.length; e++)
                if (d[e].className == "pre") {
                    var f = a.frameDoc.createElement("DIV");
                    f.innerHTML = d[e].rows[0].cells[0].innerHTML;
                    d[e].parentNode.replaceChild(f, d[e]);
                    break
                }
        }, null);
        else {
            this.frameWin.focus();
            var b = this.getRange(),
                c = this.frameDoc.createElement("DIV");
            c.innerHTML = '<table class="pre"><tr><td>\ufeff</td></tr></table>';
            c = c.firstChild;
            browser.msie ? b.pasteHTML('<table class="pre"><tr><td>\ufeff</td></tr></table>') : b.insertNode(c);
            this.setElemFocus(c.rows[0].cells[0])
        }
    },
    actCategory: function() {
        var a = this.categoryBox;
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    this.actCategory()
                }.bind(this)
            });
            a.loadContent("wiki.php", {
                act: "category_box"
            }, false);
            return null
        }
        if (a.init == undefined) {
            this.extendObj(a, ["cb_text", "cb_sub_text", "cb_error"]);
            if (this.categoryTitle) a.cb_text.value = this.categoryTitle;
            if (this.subCategoryTitle) a.cb_sub_text.value =
                this.subCategoryTitle;
            a.init = true
        }
        hide(a.cb_error);
        fadeTo(a.cb_error, 1, 0, null);
        a.show()
    },
    changeCategory: function() {
        var a = this.categoryBox,
            b = "",
            c = /[!@$%^&~|]+/i,
            d = a.cb_text.value,
            e = a.cb_sub_text.value,
            f = a.cb_error;
        if (d != "" && c.test(d)) b = wiki_err_cat_forbidden_chars;
        else if (e != "" && c.test(e)) b = wiki_err_sub_cat_forbidden_chars;
        else if (d == "" && e != "") b = wiki_err_sub_cat_without_cat;
        if (b != "") {
            show(f);
            f.innerHTML = b;
            fadeTo(f, this.showErrorTime, 1, null);
            return false
        }
        if (d != "") a.wiki = "[[category:" + d + "]]";
        if (e != "") a.wiki +=
            "[[subcategory:" + e + "]]";
        a.hide()
    },
    actHider: function() {
        this.frameWin.focus();
        var a = this.getRange(),
            b = new MessageBox({
                title: wiki_info
            });
        b.removeButtons();
        var c = function() {
                b.hide();
                for (var e = this.nodeList.TABLE.nodes, f = 0; f < e.length; f++)
                    if (e[f].className.indexOf("hider") != -1) {
                        var g = this.frameDoc.createElement("DIV");
                        g.appendChild(this.getNodeFrag(e[f].rows[1].cells[0]));
                        e[f].parentNode.replaceChild(g, e[f]);
                        break
                    }
            },
            d = function() {
                b.hide();
                var e = this.surround("DIV", a),
                    f = this.createHider(this.frameDoc.createTextNode(wiki_hider_title),
                        e, true);
                e.parentNode.replaceChild(f, e);
                e = f.rows[1].cells[0];
                e.lastChild && this.setElemFocus(e.lastChild)
            };
        if (this.nodeList.TD && this.nodeList.TD.classes.hiderBody) {
            b.addButton({
                onClick: function() {
                    b.hide()
                },
                style: "button_no",
                label: box_cancel
            });
            b.addButton({
                onClick: c.bind(this),
                label: global_delete
            });
            b.addButton({
                onClick: d.bind(this),
                label: global_add
            });
            b.content(wiki_warning_add_new_hider_or_del);
            b.show()
        } else this.nodeList.TABLE && (this.nodeList.TABLE.classes.hider || this.nodeList.TABLE.classes.hiderOpened) ?
            this.alertBox(wiki_info, wiki_warning_delete_hider, global_delete, box_close, c.bind(this), null) : d.call(this)
    },
    createHider: function(a, b, c) {
        var d = "",
            e = "hider",
            f = "";
        if (c) e = "hiderOpened";
        if (browser.msie && !browser.msie8) f = 'style="width: 95%; margin: 0px 0px 5px 0px;"';
        d += '<table class="' + e + '"' + f + ">";
        d += '<tr><td class="hiderArrow"><div></div></td><td class="hiderHeader"></td></tr>';
        d += '<tr class="hiderBodyRow"><td class="hiderBody" colspan="2"></td></tr>';
        d += "</table>";
        c = this.frameDoc.createElement("DIV");
        c.innerHTML = d;
        d = c.firstChild;
        var g = d.rows[0].cells[0];
        c = d.rows[1].cells[0];
        d.rows[0].cells[1].appendChild(this.getNodeFrag(a));
        c.appendChild(this.getNodeFrag(b));
        addEvent(g, "click", function() {
            this.switchHider(g)
        }.bind(this));
        return d
    },
    switchHider: function(a) {
        a = a.parentNode.parentNode.parentNode;
        var b = a.rows[1].cells[0];
        if (a.className == "hider") {
            a.className = "hiderOpened";
            b.style.display = browser.msie ? "block" : "table-cell"
        } else {
            a.className = "hider";
            b.style.display = "none"
        }
    },
    chooseVideo: function() {
        var a =
            this.chooseVideoBox;
        a.show();
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    this.chooseVideo()
                }.bind(this)
            });
            a.loadContent("video.php", {
                act: "a_choose_video_box",
                scrollbar_width: window.sbWidth()
            }, true, "height: 412px");
            return null
        }
        this.frameWin.focus();
        this.currRange = this.getRange();
        this.unFocusIE()
    },
    createVideoObj: function(a, b, c) {
        var d = this.frameDoc.createElement("IMG");
        d.className = "wikiVideo";
        d.style.backgroundImage = 'url("' + b.replace(".130.", ".160.") + '")';
        b = this.baseURI + "/images/play_video.png?3";
        if (browser.msie6) {
            d.src = this.baseURI + "/images/px.gif";
            d.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="scale")'
        } else d.src = b;
        d.alt = c;
        d.title = c;
        d.setAttribute("wiki", a);
        addEvent(d, "click", function() {
            showVideoAjax(a.replace("video", ""), {
                href: ""
            })
        });
        addEvent(d, "mouseover", function() {
            addClass(d, "hover")
        });
        addEvent(d, "mouseout", function() {
            removeClass(d, "hover")
        });
        return d
    },
    insertVideo: function(a, b, c, d) {
        this.chooseVideoBox.hide();
        this.insertNodeFunc(this.createVideoObj(a,
            b, c, d), this.currRange)
    },
    actCitate: function() {
        this.frameWin.focus();
        var a = this.getRange(),
            b = this.getParentElement("BLOCKQUOTE"),
            c = new MessageBox({
                title: wiki_adding_citate
            }),
            d = function() {
                c.hide();
                var e = this.surround("BLOCKQUOTE", a);
                if (e) e.lastChild ? this.setElemFocus(e.lastChild) : this.setElemFocus(e);
                this.testLastChild()
            };
        if (b != null) {
            c.removeButtons();
            c.addButton({
                onClick: function() {
                    c.hide()
                },
                style: "button_no",
                label: box_cancel
            });
            c.addButton({
                onClick: function() {
                    c.hide();
                    var e = this.frameDoc.createElement("P"),
                        f = this.getNodeFrag(b);
                    e.appendChild(f);
                    b.parentNode.replaceChild(e, b);
                    this.toolbar.citate.unselect()
                }.bind(this),
                label: global_delete
            });
            if (this.nodeList.BLOCKQUOTE && this.nodeList.BLOCKQUOTE.nodes.length >= 3) {
                c.setOptions({
                    title: wiki_warning
                });
                c.content(wiki_warning_delete_citate)
            } else {
                c.addButton({
                    onClick: d.bind(this),
                    label: global_add
                });
                c.content(wiki_warning_add_new_citate_or_del)
            }
            c.show()
        } else d.call(this);
        this.getFormat()
    },
    formatBlock: function(a, b) {
        a.execCommand("FormatBlock", false, "<H4>");
        var c =
            this.frameDoc.getElementsByTagName("H4"),
            d = null;
        if (c.length == 1) {
            d = this.frameDoc.createElement(b);
            d.innerHTML = "<p>" + c[0].innerHTML + "</p>";
            c[0].parentElement.replaceChild(d, c[0]);
            d = d
        }
        return d
    },
    clearRange: function(a, b, c, d, e, f) {
        var g = this.frameDoc.createElement("DIV");
        g.innerHTML = "\ufeff";
        c.parentNode.insertBefore(g, c);
        c = this.frameDoc.createElement("DIV");
        c.innerHTML = "\ufeff";
        d.nextSibling ? d.parentNode.insertBefore(c, d.nextSibling) : d.parentNode.appendChild(c);
        e.moveToElementText(g);
        f.moveToElementText(c);
        b.setEndPoint("StartToStart", e);
        b.setEndPoint("EndToEnd", f);
        b.select();
        a.clear();
        return b
    },
    surroundByTagName: function(a, b, c, d, e, f, g) {
        e.moveToElementText(c);
        f.moveToElementText(d);
        b.setEndPoint("StartToStart", e);
        b.setEndPoint("EndToEnd", f);
        var h = b.htmlText;
        b = this.clearRange(a, b, c, d, e, f);
        b.pasteHTML("<" + g + ' id="b56n9ut">' + h + "</" + g + ">");
        a = this.frameDoc.getElementById("b56n9ut");
        a.removeAttribute("id");
        return a
    },
    surround: function(a, b) {
        var c = null;
        this.frameWin.focus();
        var d = function(l, s) {
            for (var k = 0; k <
                s.length; k++)
                if (l.nodeName == s[k]) return false;
            return true
        };
        if (browser.msie) {
            c = this.frameDoc.selection;
            var e = c.createRange();
            if (b != undefined) e = b;
            var f = e.parentElement();
            if (e.htmlText == "") {
                e.pasteHTML("&nbsp;");
                c = this.formatBlock(e, a)
            } else {
                d = e.duplicate();
                d.collapse(true);
                var g = e.duplicate();
                g.collapse(false);
                var h = d.parentElement(),
                    i = g.parentElement();
                if (h.nodeName != "BODY" && i.nodeName != "BODY")
                    if (h.parentNode == i.parentNode) c = this.surroundByTagName(c, e, h, i, d, g, a);
                    else {
                        h = this.getCommonParent(h, i);
                        f = h.commonPrev;
                        var j = h.commonNext;
                        c = this.surroundByTagName(c, e, f, j, d, g, a)
                    }
                else if (h == i) c = this.formatBlock(e, a);
                else {
                    h.nodeName == "BODY" && this.formatBlock(d, "DIV");
                    i.nodeName == "BODY" && this.formatBlock(g, "DIV");
                    e.setEndPoint("StartToStart", d);
                    e.setEndPoint("EndToEnd", g);
                    h = d.parentElement();
                    i = g.parentElement();
                    h = this.getCommonParent(h, i);
                    f = h.commonPrev;
                    j = h.commonNext;
                    c = this.surroundByTagName(c, e, f, j, d, g, a)
                }
            }
        } else {
            j = ["BODY", "BLOCKQUOTE", "TD", "DIV", "P", "UL", "OL", "H1", "H2", "H3", "BR"];
            g = ["BODY", "BLOCKQUOTE", "TD"];
            c = this.frameWin.getSelection();
            e = c.getRangeAt(0);
            f = e.commonAncestorContainer;
            e.collapsed && e.startOffset != 0 && e.setStart(f, e.startOffset - 1);
            h = e.startContainer;
            for (i = e.endContainer; d(f, j);) {
                if (!d(f.parentNode, g)) break;
                f = f.parentNode
            }
            for (; d(h, j);) {
                if (!d(h.parentNode, g)) break;
                h = h.parentNode
            }
            for (; d(h, j);) {
                if (h.previousSibling == null || !d(h.previousSibling, j)) break;
                h = h.previousSibling
            }
            for (; d(i, j);) {
                if (!d(i.parentNode, g)) break;
                i = i.parentNode
            }
            for (; d(i, j);) {
                if (i.nextSibling == null || !d(i.nextSibling, j)) break;
                i = i.nextSibling
            }
            f = h;
            j = i;
            if (h.parentNode !=
                i.parentNode) {
                h = this.getCommonParent(h, i);
                f = h.commonPrev;
                j = h.commonNext
            }
            c = ["BODY", "TD", "TH"];
            d(f, c) && e.setStartBefore(f);
            d(j, c) && e.setEndAfter(j);
            c = this.frameDoc.createElement(a);
            if (e.startOffset == e.endOffset && e.startOffset == 0) {
                c.innerHTML = "<p>\ufeff</p>";
                e.insertNode(c)
            } else e.surroundContents(c)
        }
        return c
    },
    actHeader: function(a) {
        this.frameWin.focus();
        var b = this.getParentElement(a),
            c = null;
        if (b != null) {
            c = this.frameDoc.createElement("DIV");
            c.innerHTML = this.getInnerText(b);
            b.parentNode.replaceChild(c,
                b);
            c = c
        } else {
            this.frameDoc.execCommand("FormatBlock", false, "<" + a + ">");
            b = this.getParentElement(a);
            if (b != null) {
                var d = this.getInnerText(b);
                b.innerHTML = trim(d) == "" ? "\ufeff" : d
            }
            c = b
        }
        b = this.getRange();
        d = browser.msie ? b.text : b.toString();
        d.length != 0 && this.clearEmptyTags(a);
        this.getFormat();
        this.setElemFocus(c)
    },
    headerFix: function(a) {
        if (a.keyCode == KEY.ENTER || a.keyCode == KEY.BACKSPACE || a.keyCode == KEY.DELETE) {
            var b = this.getParentElement("H1", "H2", "H3");
            if (b != null) {
                if (a.shiftKey) return true;
                this.getRange();
                var c =
                    this.getElemOffsets(b),
                    d = this.getInnerText(b);
                if (d == "\ufeff") {
                    b.parentNode.removeChild(b);
                    browser.msie8 && this.frameDoc.execCommand("RemoveFormat", false, true);
                    return true
                }
                browser.chrome && c.startOffset && a.keyCode == KEY.BACKSPACE && this.frameDoc.execCommand("FormatBlock", false, "<P>");
                var e = 1;
                d.indexOf("\ufeff") == 0 && e++;
                if (d.length == e && (a.keyCode == KEY.BACKSPACE || a.keyCode == KEY.DELETE)) {
                    b.parentNode.removeChild(b);
                    browser.msie8 && this.frameDoc.execCommand("RemoveFormat", false, true);
                    return true
                }
                if (a.keyCode ==
                    KEY.ENTER)
                    if (c.startOffset) {
                        this.insertParagraph(b, "before");
                        return true
                    } else if (browser.mozilla && c.endOffset) {
                    this.setElemFocus(this.insertParagraph(b, "after"), true);
                    return true
                }
            }
        }
    },
    charBoxInit: function() {
        for (var a = this, b = [
                [
                    [169, "copy", wiki_char_copy],
                    [174, "reg", wiki_char_reg],
                    [8482, "trade", wiki_char_trade],
                    [8240, "permil", wiki_char_permil],
                    [8249, "lsaquo", wiki_char_lsaquo],
                    [8250, "rsaquo", wiki_char_rsaquo],
                    [171, "laquo", wiki_char_laquo],
                    [187, "raquo", wiki_char_raquo],
                    [167, "sect", wiki_char_sect],
                    [182,
                        "para", wiki_char_para
                    ]
                ],
                [
                    [185, "sup1", wiki_char_sup1],
                    [178, "sup2", wiki_char_sup2],
                    [179, "sup3", wiki_char_sup3],
                    [188, "frac14", wiki_char_frac14],
                    [189, "frac12", wiki_char_frac12],
                    [190, "frac34", wiki_char_frac34],
                    [8722, "minus", wiki_char_minus],
                    [177, "plusmn", wiki_char_plusmn],
                    [247, "divide", wiki_char_divide],
                    [8260, "fras1", wiki_char_fras1]
                ],
                [
                    [215, "times", wiki_char_times],
                    [402, "fnof", wiki_char_fnof],
                    [8747, "int", wiki_char_int],
                    [8721, "sum", wiki_char_sum],
                    [8734, "infin", wiki_char_infin],
                    [8730, "radic", wiki_char_radic],
                    [8800, "ne", wiki_char_ne],
                    [176, "deg", wiki_char_deg],
                    [8804, "le", wiki_char_le],
                    [8805, "ge", wiki_char_ge]
                ],
                [
                    [945, "alpha", wiki_char_alpha],
                    [946, "beta", wiki_char_beta],
                    [947, "gamma", wiki_char_gamma],
                    [948, "delta", wiki_char_delta],
                    [949, "epsilon", wiki_char_epsilon],
                    [969, "omega", wiki_char_omega],
                    [937, "Omega", wiki_char_omega_uppercase],
                    [956, "mu", wiki_char_mu],
                    [8211, "ndash", wiki_char_ndash],
                    [8212, "mdash", wiki_char_mdash]
                ],
                [
                    [8592, "larr", wiki_char_larr],
                    [8594, "rarr", wiki_char_rarr],
                    [8593, "uarr", wiki_char_uarr],
                    [8595,
                        "darr", wiki_char_darr
                    ],
                    [8596, "harr", wiki_char_harr],
                    [8597, "varr", wiki_char_varr],
                    [9824, "spades", wiki_char_spades],
                    [9827, "clubs", wiki_char_clubs],
                    [9829, "hearts", wiki_char_hearts],
                    [9830, "diams", wiki_char_diams]
                ]
            ], c = ge("cb_chars"), d = document.createDocumentFragment(), e = 0; e < b.length; e++) {
            for (var f = 0; f < b[e].length; f++) {
                var g = document.createElement("DIV");
                g.id = "char-" + e + "-" + f;
                var h = b[e][f];
                g.innerHTML = "&#" + h[0] + ";";
                g.alt = h[2];
                g.title = h[2];
                d.appendChild(g)
            }
            f = document.createElement("BR");
            f.setAttribute("clear",
                "all");
            d.appendChild(f)
        }
        c.appendChild(d);
        addEvent(c, "mouseover", function(i) {
            if (i.target.parentNode == c) {
                var j = i.target.id.split("-");
                j = b[j[1]][j[2]];
                ge("cb_char_view").innerHTML = i.target.innerHTML;
                ge("cb_char_name").innerHTML = j[2]
            }
        });
        addEvent(c, "click", function(i) {
            if (i.target.parentNode == c) {
                i = i.target.id.split("-");
                i = "&#" + b[i[1]][i[2]][0] + ";";
                a.charBox.hide();
                a.frameWin.focus();
                var j = a.charBox.range;
                j.collapse(false);
                if (browser.msie) {
                    j.pasteHTML(i);
                    j.select()
                } else a.frameDoc.execCommand("InsertHtml",
                    false, i)
            }
        })
    },
    actChar: function() {
        var a = this.charBox;
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    this.actChar()
                }.bind(this)
            });
            a.loadContent("wiki.php", {
                act: "char_box"
            }, false);
            return null
        }
        this.frameWin.focus();
        a.range = this.getRange();
        this.unFocusIE();
        if (a.init == undefined) {
            this.charBoxInit();
            a.init = true
        }
        a.show()
    },
    choosePhoto: function() {
        var a = this.choosePhotoBox;
        this.photoElemID ? a.setOptions({
            title: wiki_edit_photo
        }) : a.setOptions({
            title: wiki_adding_photo
        });
        a.show();
        this.frameWin.focus();
        this.currRange = this.getRange();
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    this.choosePhoto()
                }.bind(this)
            });
            a.loadContent("photos.php", {
                act: "a_choose_photo_box",
                scrollbar_width: window.sbWidth()
            }, true, "height: 412px");
            return null
        }
        a.show();
        this.unFocusIE()
    },
    photoBoxInit: function() {
        var a = this.photoBox;
        this.extendObj(a, ["pb_photo_preview", "pb_photo_view", "pb_photo_url", "pb_photo_width", "pb_photo_height", "openPhotoAlbums", "pb_photo_id", "pb_photo_text", "pb_error"]);
        a.saveRatio =
            new Checkbox(ge("pb_cb_ratio"), {
                label: wiki_tbl_save_ratio,
                checked: true,
                width: 160
            });
        a.useBorder = new Checkbox(ge("pb_cb_border"), {
            label: wiki_tbl_show_border,
            width: 160
        });
        a.boxView = new Checkbox(ge("pb_cb_box"), {
            label: wiki_tbl_show_in_box,
            width: 160,
            onChange: function() {
                this.testPhotoSetupError(10)
            }.bind(this)
        });
        a.useLink = new Checkbox(ge("pb_cb_link"), {
            label: wiki_tbl_add_link,
            checked: true,
            width: 160,
            onChange: this.useLinkChange.bind(this)
        });
        addEvent(a.pb_photo_id, "blur", function() {
            if (this.isLoadNow) return false;
            this.tryLoadPhoto()
        }.bind(this));
        addEvent(a.pb_photo_id, "keyup", function() {
            if (this.isLoadNow) return false;
            this.tryLoadPhoto()
        }.bind(this));
        addEvent(a.pb_photo_id, "click", function() {
            this.select()
        });
        addEvent(a.pb_photo_text, "keyup", this.photoTextChange.bind(this));
        addEvent(a.pb_photo_width, "keyup", this.sizeChange.extBind(this, "width"));
        addEvent(a.pb_photo_height, "keyup", this.sizeChange.extBind(this, "height"));
        addEvent(a.pb_photo_width, "keypress", this.numberFilter.extBind(this));
        addEvent(a.pb_photo_height,
            "keypress", this.numberFilter.extBind(this))
    },
    photoSetup: function(a, b) {
        var c = this.photoBox;
        c.show();
        if (c.loaded == undefined) {
            c.setOptions({
                onLoad: function() {
                    c.loaded = true;
                    c.setOptions({
                        bodyStyle: "padding: 0px; height: auto;"
                    });
                    this.photoSetup(a, b)
                }.bind(this),
                onHide: function() {
                    c.showBox = false
                }
            });
            c.loadContent("wiki.php", {
                act: "photo_box"
            }, false, "height: 258px;");
            return null
        }
        if (c.init == undefined) {
            this.photoBoxInit();
            c.init = true
        }
        c.lastLoadID = null;
        c.showError = false;
        hide(ge("pb_error"));
        fadeTo("pb_error",
            1, 0, null);
        c.pb_photo_width.value = "";
        c.pb_photo_height.value = "";
        hide(c.pb_photo_view);
        show(c.pb_photo_preview);
        c.removeButtons();
        c.addButton({
            onClick: function() {
                c.hide();
                c.boxShow = false;
                this.photoElemID = null
            }.bind(this),
            style: "button_no",
            label: box_cancel
        });
        if (a == undefined && this.photoElemID) a = this.photoElemID;
        c.boxShow = true;
        if (a != undefined) {
            this.photoElemID = a;
            this.frameDoc.getElementById(a);
            var d = this.images[a.replace("photo", "")];
            c.current = d;
            c.correct = true;
            c.setOptions({
                title: wiki_edit_photo
            });
            c.addButton({
                onClick: function() {
                    this.insertPhoto(a)
                }.bind(this),
                label: wiki_edit
            });
            this.addPhotoBoxControlText();
            c.pb_photo_width.value = d.width;
            c.pb_photo_height.value = d.height;
            c.pb_photo_id.value = "photo" + d.photoID;
            c.pb_photo_text.value = d.text;
            if (d.url != "") {
                c.pb_photo_url.value = d.url;
                c.pb_photo_url.disabled = false;
                c.useLink.checked(true);
                c.useLink.disable(false);
                c.boxView.checked(d.boxView);
                if (d.text != "") c.pb_photo_url.disabled = true
            } else {
                c.pb_photo_url.value = "";
                c.useLink.checked(false);
                c.boxView.checked(false);
                c.boxView.disable(true)
            }
            c.saveRatio.checked(d.saveRatio);
            c.useBorder.checked(d.useBorder);
            var e = {
                disable: [
                    [],
                    ["saveRatio", "useLink"], true
                ],
                disabled: [
                    [],
                    ["pb_photo_width", "pb_photo_height"], false
                ]
            };
            this.setObjOptions(c, e);
            d.url != "" && this.setObjOptions(c, {
                disable: [
                    [],
                    ["useBorder", "boxView"]
                ]
            });
            c.photoLoadStatus = false;
            if (d.photoURL) this.loadPhoto(d.photoURL, false);
            else {
                c.current = null;
                this.tryLoadPhoto(null, d.photoID, b)
            }
        } else {
            this.photoElemID = null;
            c.correct = false;
            c.current = null;
            c.pb_photo_view.removeAttribute("width");
            c.pb_photo_view.removeAttribute("height");
            d = new Image;
            addEvent(d, "load", function() {
                c.pb_photo_view.src = this.photoQuestion;
                hide(c.pb_photo_preview);
                show(c.pb_photo_view)
            }.bind(this));
            d.src = this.photoQuestion;
            c.setOptions({
                title: wiki_adding_photo
            });
            c.addButton({
                onClick: function() {
                    this.insertPhoto()
                }.bind(this),
                label: global_add
            });
            this.addPhotoBoxControlText();
            each(["pb_photo_id", "pb_photo_text", "pb_photo_url", "pb_photo_width", "pb_photo_height"], function(f, g) {
                c[g].value = ""
            });
            e = {
                disabled: [
                    [],
                    ["pb_photo_url", "pb_photo_width", "pb_photo_height"],
                    false
                ],
                disable: [
                    [],
                    ["saveRatio", "useBorder", "boxView", "useLink"], true
                ],
                checked: [
                    ["saveRatio"],
                    ["boxView", "useBorder", "useLink"], true
                ]
            };
            this.setObjOptions(c, e);
            this.frameWin.focus();
            this.currRange = this.getRange();
            c.changeSize = true;
            c.show()
        }
        this.unFocusIE()
    },
    testPhotoSetupError: function(a) {
        var b = this.photoBox,
            c = null,
            d = this.params.photoMinSize,
            e = this.params.photoMaxSize;
        if (b.correct)
            if (b.useLink.checked() && b.pb_photo_url.value == "") c = [3, wiki_err_not_write_photo_url];
            else if (b.pb_photo_width.value == 0 ||
            b.pb_photo_height.value == 0) c = [4, wiki_err_photo_size_zero];
        else if (b.pb_photo_width.value < d.w || b.pb_photo_height.value < d.h) c = [5, wiki_err_photo_min_size + " " + d.w + "x" + d.h + "px"];
        else if (b.pb_photo_width.value > e.w || b.pb_photo_height.value > e.h) c = [6, wiki_err_photo_max_size + " " + e.w + "x" + e.h + "px"];
        else if (b.no_access) c = [7, wiki_err_no_access_to_photo];
        else if (trim(b.pb_photo_text.value) != "" && !/^[\s0-9a-z\u0430-\u044f\u0451:\.,_-]+$/i.test(trim(b.pb_photo_text.value))) c = [8, wiki_err_forbidden_chars_in_photo_text];
        else if (trim(b.pb_photo_url.value) != "" && !/^[\s0-9a-z\u0430-\u044f\u0451=#\?:\/\.,_-]+$/i.test(trim(b.pb_photo_url.value))) c = [9, wiki_err_forbidden_chars_in_photo_url];
        else {
            if (b.boxView.checked() && trim(b.pb_photo_text.value) == "") c = [10, wiki_err_empty_text_in_view_box]
        } else c = [1, wiki_err_not_sel_photo];
        if (a != undefined) {
            if (c == null || c && c[0] != a) fadeTo(b.pb_error, this.showErrorTime, 0, function() {
                hide(b.pb_error);
                b.showError = false
            });
            return null
        }
        if (c != null) {
            if (!b.showError) {
                b.pb_error.innerHTML = c[1];
                b.showError =
                    true;
                show(b.pb_error);
                fadeTo(b.pb_error, this.showErrorTime, 1, null)
            }
            return true
        }
        return false
    },
    insertPhoto: function(a, b) {
        if (!b && this.testPhotoSetupError()) return false;
        var c = this.photoBox,
            d = null,
            e = null,
            f = null,
            g = "";
        this.choosePhotoBox.hide();
        c.hide();
        e = {
            saveRatio: true,
            useBorder: false,
            useLink: false,
            url: "",
            text: "",
            boxView: false
        };
        if (a) {
            d = parseInt(a.substr(5));
            if (b) {
                f = b;
                this.images[d] = extend(f, e)
            } else f = this.images[d]
        } else {
            d = this.images.length;
            if (b) {
                f = b;
                f = extend(f, e);
                f.useLink = true;
                f.url = "photo" + f.photoID
            } else f =
                extend(c.current);
            this.images[d] = f
        }
        if (b) {
            e = this.frameDoc.createElement("IMG");
            e.src = f.photoSmallURL;
            e.className = "wikiPhotoNoBorder";
            g = "photo" + f.photoID
        } else {
            f.photoID = c.current.photoID;
            f.text = c.pb_photo_text.value;
            f.url = c.pb_photo_url.value;
            f.saveRatio = c.saveRatio.checked();
            f.boxView = c.boxView.checked();
            f.useLink = c.useLink.checked();
            f.useBorder = c.useBorder.checked();
            f.width = c.pb_photo_width.value;
            f.height = c.pb_photo_height.value;
            e = this.frameDoc.createElement("IMG");
            e.src = c.pb_photo_view.src;
            if (!f.useLink) f.url =
                "";
            e.className = f.useBorder ? "wikiPhoto" : "wikiPhotoNoBorder";
            g = f.text ? f.text : f.url ? f.url : "photo" + f.photoID;
            e.width = f.width;
            e.height = f.height
        }
        e.alt = g;
        e.title = g;
        if (a != undefined) {
            e.id = a;
            d = this.frameDoc.getElementById(a);
            d.parentNode.replaceChild(e, d)
        } else {
            a = "photo" + d;
            e.id = a;
            this.insertNodeFunc(e, this.currRange)
        }
        e = this.frameDoc.getElementById(a);
        addEvent(e, "click", function() {
            this.photoSetup(a, false)
        }.bind(this));
        if (f.useLink && e.className == "wikiPhoto") {
            addEvent(e, "mouseover", function() {
                addClass(this, "hover")
            });
            addEvent(e, "mouseout", function() {
                removeClass(this, "hover")
            })
        }
        this.photoElemID = null;
        c.boxShow = false
    },
    photoTextChange: function() {
        var a = this.photoBox;
        if (a.pb_photo_text.value == "") {
            if (a.useLink.checked()) a.pb_photo_url.disabled = false
        } else if (a.correct)
            if (a.useLink.checked()) {
                a.pb_photo_url.disabled = true;
                a.pb_photo_url.value = "photo" + a.current.photoID
            }
    },
    useLinkChange: function() {
        var a = this.photoBox;
        if (a.useLink.checked()) {
            if (a.pb_photo_text.value == "") a.pb_photo_url.disabled = false;
            else {
                a.pb_photo_url.disabled =
                    true;
                if (a.correct) a.pb_photo_url.value = "photo" + a.current.photoID
            }
            a.boxView.checked(false);
            a.boxView.disable(false)
        } else {
            a.pb_photo_url.value = "";
            a.pb_photo_url.disabled = true;
            a.boxView.checked(false);
            a.boxView.disable(true)
        }
    },
    togglePhotoSetup: function() {
        this.photoBox.boxShow ? this.photoBox.show() : this.photoSetup()
    },
    loadPhotoResize: function(a, b, c, d) {
        var e = this.photoBox,
            f = e.pb_photo_preview,
            g = e.pb_photo_view,
            h = e.pb_photo_width,
            i = e.pb_photo_height;
        g.src = a;
        if (b > c) {
            a = this.photoPreviewSize;
            b = Math.round(c /
                (b / this.photoPreviewSize))
        } else {
            a = Math.round(b / (c / this.photoPreviewSize));
            b = this.photoPreviewSize
        }
        g.width = a;
        g.height = b;
        if (d) {
            h.value = a;
            i.value = b
        }
        hide(f);
        show(g);
        e.correct = true;
        this.testPhotoSetupError(1);
        this.testPhotoSetupError(7)
    },
    loadPhoto: function(a, b) {
        var c = this.photoBox;
        hide(c.pb_photo_view);
        show(c.pb_photo_preview);
        var d = c.pb_photo_id.value;
        if (c.useLink.checked() && c.pb_photo_url.value == "") c.pb_photo_url.value = "photo" + d;
        var e = new Image;
        addEvent(e, "load", function() {
            if (!c.current) c.current = {};
            c.current.photoURL = a;
            c.current.photoID = c.pb_photo_id.value.replace("photo", "");
            c.current.originalWidth = e.width;
            c.current.originalHeight = e.height;
            this.loadPhotoResize(a, e.width, e.height, b)
        }.bind(this));
        e.src = a
    },
    getIDFromURL: function() {
        var a = this.photoBox.pb_photo_id.value;
        if (a.indexOf(this.vk) != -1 || a.indexOf(this.vkcom) != -1) {
            a = a.match(/-?[0-9]+_[0-9]+/gi);
            if (a != null) return a[a.length - 1]
        }
        return null
    },
    numberFilter: function(a) {
        if (!this.photoBox.correct) return false;
        if (!a) a = window.event;
        var b = a.charCode ||
            a.keyCode;
        if (a.charCode == 0) return true;
        if (b < 32) return true;
        if ("0123456789".indexOf(String.fromCharCode(b)) == -1) return false
    },
    sizeChange: function(a, b) {
        var c = this.photoBox;
        if (c.saveRatio.checked() && c.correct) {
            var d = c.current.originalWidth,
                e = c.current.originalHeight,
                f = parseInt(c.pb_photo_width.value),
                g = parseInt(c.pb_photo_height.value);
            f = isNaN(f) ? 0 : f;
            g = isNaN(g) ? 0 : g;
            switch (b) {
                case "width":
                    e /= d / f;
                    c.pb_photo_height.value = Math.round(e);
                    break;
                case "height":
                    d /= e / g;
                    c.pb_photo_width.value = Math.round(d)
            }
            this.testPhotoSetupError(5);
            this.testPhotoSetupError(6)
        }
    },
    tryLoadPhoto: function(a, b, c) {
        var d = this.photoBox,
            e = this;
        if (b == undefined) b = this.getIDFromURL();
        if (c == undefined) c = true;
        if (b) {
            this.isLoadNow = true;
            d.pb_photo_id.value = "photo" + b;
            a = function(f, g) {
                this.isLoadNow = false;
                if (g != "NO_ACCESS") {
                    d.no_access = false;
                    d.lastLoadID = b;
                    e.loadPhoto(g, c)
                } else {
                    d.no_access = true;
                    d.pb_photo_view.src = this.photoQuestion;
                    d.pb_photo_view.removeAttribute("width");
                    d.pb_photo_view.removeAttribute("height");
                    show(d.pb_photo_view);
                    this.testPhotoSetupError()
                }
            };
            if (d.current == null || d.lastLoadID != b || d.no_access) Ajax.Post({
                url: "photos.php",
                query: {
                    act: "get_photo",
                    photo: b.replace("photo", ""),
                    rand: Math.random()
                },
                onDone: a.bind(this),
                onFail: a
            })
        }
        this.isLoadNow = false
    },
    addPhotoBoxControlText: function() {
        this.photoBox.addControlsText('<div class="pb_link" onclick="window[window.editorName].choosePhoto();" onmouseover="pbSetClass(this, \'pb_link_over\')" onmouseout="pbSetClass(this, \'pb_link\')">' + wiki_view_my_photos + "</div>")
    },
    actTable: function() {
        var a = this.tableBox;
        a.showError = false;
        a.show();
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    a.setOptions({
                        bodyStyle: "padding: 0px; height: auto;"
                    });
                    this.actTable()
                }.bind(this)
            });
            a.loadContent("wiki.php", {
                act: "table_box"
            }, false, "height: 196px;");
            return null
        }
        if (this.tableBox.init == undefined) {
            this.extendObj(a, ["tb_table_caption", "tb_cells", "tb_cols", "tb_rows", "tb_error"]);
            a.showHeader = new Checkbox(ge("tb_show_header"), {
                label: wiki_tbl_add_header,
                width: 160
            });
            a.noBorders = new Checkbox(ge("tb_no_border"), {
                label: wiki_tbl_no_border,
                width: 160
            });
            a.tb_cells.childNodes.length == 0 && this.tableCreateCells(10, 10);
            a.init = true
        }
        hide(a.tb_error);
        fadeTo(a.tb_error, 1, 0, null);
        this.frameWin.focus();
        this.currRange = this.getRange();
        var b = this.getParentElement("TABLE");
        this.unFocusIE();
        if (b != null && b.nodeName == "TABLE" && b.className != "hider" && b.className != "hiderOpened") {
            this.tableBoxChange(b);
            a.canSelect = false;
            a.canOver = false;
            a.setOptions({
                title: wiki_edit_table
            });
            a.removeButtons();
            a.addButton({
                onClick: function() {
                    a.hide()
                },
                style: "button_no",
                label: box_cancel
            });
            a.addButton({
                onClick: function() {
                    this.tableChange(b)
                }.bind(this),
                label: wiki_edit
            });
            addClass(a.tb_cols, "disabled");
            addClass(a.tb_rows, "disabled")
        } else {
            a.canSelect = true;
            a.canOver = true;
            a.setOptions({
                title: wiki_adding_table
            });
            a.removeButtons();
            a.addButton({
                onClick: function() {
                    a.hide()
                },
                style: "button_no",
                label: box_cancel
            });
            a.addButton({
                onClick: function() {
                    this.insertTable()
                }.bind(this),
                label: wiki_insert
            });
            removeClass(a.tb_cols, "disabled");
            removeClass(a.tb_rows, "disabled");
            a.tb_cols.innerHTML = "0";
            a.tb_rows.innerHTML = "0";
            a.tb_table_caption.value = "";
            a.showHeader.checked(false);
            a.noBorders.checked(false);
            this.tableSelectCells(0, 0)
        }
    },
    actTableDelete: function() {
        var a = this.getParentElement("TABLE");
        this.alertBox(wiki_removing_table, wiki_warning_delete_table, box_yes, box_cancel, function() {
            a.parentNode.removeChild(a);
            this.frameWin.focus();
            this.getFormat()
        }.bind(this), null)
    },
    actTableActions: function(a) {
        var b = this.getParentElement("TD", "TH"),
            c = b.parentNode,
            d = c.parentNode.parentNode,
            e = b.cellIndex,
            f = c.rowIndex;
        if (a == "delete_row") {
            var g = function(n) {
                if (n) {
                    d.parentNode.removeChild(d);
                    this.getFormat()
                } else d.deleteRow(f)
            };
            a = wiki_warning_delete_row + "<br />" + wiki_warning_delete_last_row;
            d.rows.length == 1 ? this.alertBox(wiki_warning, a, box_yes, box_cancel, function() {
                g(true)
            }, null) : this.alertBox(wiki_warning, wiki_warning_delete_row, box_yes, box_cancel, function() {
                g(false)
            }, null)
        } else if (a == "delete_col") {
            var h = function(n) {
                if (n) {
                    d.parentNode.removeChild(d);
                    this.getFormat()
                } else
                    for (n = 0; n < d.rows.length; n++) d.rows[n].deleteCell(e)
            };
            a = wiki_warning_delete_col + "<br />" + wiki_warning_delete_last_col;
            d.rows[0].cells.length == 1 ? this.alertBox(wiki_warning, a, box_yes, box_cancel, function() {
                h(true)
            }, null) : this.alertBox(wiki_warning, wiki_warning_delete_col, box_yes, box_cancel, function() {
                h(false)
            }, null)
        } else if (a == "col_width") {
            var i = this,
                j = function(n, q) {
                    q = parseInt(q);
                    if (!isNaN(q))
                        if (!n) {
                            var o = i.getCellColTag(d, e);
                            if (o != null) o.style.width = q + "%";
                            else {
                                o = [];
                                for (var p = 0; p < d.rows[0].cells.length; p++) {
                                    var t = document.createElement("COL");
                                    o.push(t);
                                    t.style.width = p == e ? q + "%" : ""
                                }
                                if (o.length > 0) {
                                    d.insertBefore(o[0], d.firstChild);
                                    t = o[0];
                                    for (p = 1; p < o.length; p++) {
                                        d.insertBefore(o[p], t.nextSibling);
                                        t = o[p]
                                    }
                                }
                            }
                        }
                };
            if (d.rows[0].cells.length == 1) this.alertBox(wiki_warning, getLang("wiki_col_width"), box_yes, box_cancel, function() {
                j(true, this.value)
            }, null);
            else {
                a = this.getCellColTag(d, e);
                var l = "";
                if (a != null && a.getAttribute("width") != null) l = a.getAttribute("width").substr(0, a.getAttribute("width").length - 1);
                else if (a != null && a.getAttribute("style") != null) l = a.style.width.substr(0,
                    a.style.width.length - 1);
                if (typeof widthAlertBox === "undefined") {
                    widthAlertBox = new MessageBox({
                        title: getLang("wiki_col_width"),
                        width: 230
                    });
                    widthAlertBox.removeButtons();
                    widthAlertBox.addButton({
                        onClick: function() {
                            widthAlertBox.hide()
                        },
                        style: "button_no",
                        label: "\u041e\u0442\u043c\u0435\u043d\u0430"
                    });
                    widthAlertBox.addButton({
                        onClick: function() {
                            j(false, ge("col_width_input").value);
                            widthAlertBox.hide()
                        },
                        label: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"
                    });
                    widthAlertBox.content("\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0448\u0438\u0440\u0438\u043d\u0443 \u0441\u0442\u043e\u043b\u0431\u0446\u0430: <input type='text' id='col_width_input' maxlength = '3' size = '3' value = '" +
                        l + "'>&nbsp;<b>%</b>")
                } else {
                    ge("col_width_input").value = l;
                    widthAlertBox.removeButtons();
                    widthAlertBox.addButton({
                        onClick: function() {
                            widthAlertBox.hide()
                        },
                        style: "button_no",
                        label: "\u041e\u0442\u043c\u0435\u043d\u0430"
                    });
                    widthAlertBox.addButton({
                        onClick: function() {
                            j(false, ge("col_width_input").value);
                            widthAlertBox.hide()
                        },
                        label: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"
                    })
                }
                widthAlertBox.show();
                ge("col_width_input").focus()
            }
        } else if (a == "insert_row_before" || a == "insert_row_after") {
            var s = this.frameDoc.createElement("TR"),
                k = "TD";
            if (f == 0 && a == "insert_row_before") {
                if (d.getElementsByTagName("TH").length != 0) k = "TH";
                var m = d.rows[0].cells,
                    r = m.length;
                for (l = 0; l < r; l++) {
                    b = this.frameDoc.createElement("TD");
                    b.innerHTML = m[l].innerHTML;
                    m[l].parentNode.replaceChild(b, m[l])
                }
            }
            for (l = 0; l < c.cells.length; l++) {
                b = this.frameDoc.createElement(k);
                b.innerHTML = "\ufeff";
                s.appendChild(b)
            }
            if (a == "insert_row_before") c.parentNode.insertBefore(s, c);
            else if (a == "insert_row_after") f == d.rows.length - 1 ? c.parentNode.appendChild(s) : c.parentNode.insertBefore(s,
                d.rows[f + 1])
        } else if (a == "insert_col_before" || a == "insert_col_after") {
            c = e == c.cells.length - 1;
            for (l = 0; l < d.rows.length; l++) {
                b = null;
                s = d.rows[l].cells[e].nodeName;
                if (s == "TD") b = this.frameDoc.createElement("TD");
                else if (s == "TH") b = this.frameDoc.createElement("TH");
                b.innerHTML = "\ufeff";
                if (a == "insert_col_before") d.rows[l].insertBefore(b, d.rows[l].cells[e]);
                else if (a == "insert_col_after") c ? d.rows[l].appendChild(b) : d.rows[l].insertBefore(b, d.rows[l].cells[e + 1])
            }
        }
    },
    tableChange: function(a) {
        var b = this.tableBox,
            c = b.tb_table_caption.value,
            d = a.getElementsByTagName("CAPTION"),
            e = a.getElementsByTagName("TH"),
            f = a.getAttribute("class");
        if (b.noBorders.checked()) f.indexOf("wikiTableNoBorder") == -1 && a.setAttribute("class", f + " wikiTable wikiTableNoBorder");
        else a.setAttribute("class", f.replace(/wikiTableNoBorder/g, ""));
        if (b.showHeader.checked()) {
            if (e.length == 0) {
                f = a.rows[0].cells;
                for (var g = f.length, h = 0; h < g; h++) {
                    e = this.frameDoc.createElement("TH");
                    e.align = "left";
                    e.innerHTML = f[h].innerHTML;
                    f[h].parentNode.replaceChild(e, f[h])
                }
            }
        } else if (e.length !=
            0) {
            f = a.rows[0].cells;
            g = f.length;
            for (h = 0; h < g; h++) {
                e = this.frameDoc.createElement("TD");
                e.innerHTML = f[h].innerHTML;
                f[h].parentNode.replaceChild(e, f[h])
            }
        }
        if (d.length != 0) c != "" ? this.setInnerText(d[0], c) : d[0].parentNode.removeChild(d[0]);
        else if (c != "") {
            c = this.frameDoc.createElement("CAPTION");
            d = a.getElementsByTagName("TBODY")[0];
            a.insertBefore(c, d);
            this.setInnerText(c, b.tb_table_caption.value)
        }
        this.tableBox.hide()
    },
    tableBoxChange: function(a) {
        var b = this.tableBox;
        b.noBorders.checked(false);
        a.getAttribute("class").indexOf("wikiTableNoBorder") !=
            -1 && b.noBorders.checked(true);
        var c = a.getElementsByTagName("CAPTION");
        if (c.length != 0) {
            c = this.getInnerText(c[0]);
            b.tb_table_caption.value = c
        } else b.tb_table_caption.value = "";
        a.getElementsByTagName("TH").length != 0 ? b.showHeader.checked(true) : b.showHeader.checked(false);
        c = a.rows.length;
        a = a.rows[0].cells.length;
        this.tableSelectCells(c, a);
        b.tb_cols.innerHTML = a;
        b.tb_rows.innerHTML = c
    },
    testInsertTable: function(a) {
        var b = this.tableBox,
            c = null;
        if (b.tb_cols.innerHTML == "0" || b.tb_rows.innerHTML == "0") c = [1, wiki_err_empty_table_size];
        if (a != undefined) {
            if (c == null || c && c[0] != a) fadeTo(b.tb_error, this.showErrorTime, 0, function() {
                hide(b.tb_error);
                b.showError = false
            });
            return null
        }
        if (c != null) {
            if (!b.showError) {
                b.tb_error.innerHTML = c[1];
                b.showError = true;
                show(b.tb_error);
                fadeTo(b.tb_error, this.showErrorTime, 1, null)
            }
            return true
        }
        return false
    },
    insertTable: function() {
        var a = this.tableBox;
        if (this.testInsertTable()) return false;
        var b = this.currRange,
            c = parseInt(a.tb_rows.innerHTML),
            d = parseInt(a.tb_cols.innerHTML),
            e = a.showHeader.checked(),
            f = a.noBorders.checked();
        c = this.createTable(d, c, a.tb_table_caption.value, e, f);
        this.frameWin.focus();
        d = this.frameDoc.createElement("DIV");
        d.innerHTML = c;
        c = d.firstChild;
        this.insertNodeFunc(c, b);
        a.hide();
        a = c.getElementsByTagName("TH")[0];
        if (a != undefined) this.setElemFocus(a);
        else {
            a = c.getElementsByTagName("TD")[0];
            a != undefined && this.setElemFocus(a)
        }
        this.testLastChild()
    },
    createTable: function(a, b, c, d, e) {
        e = "<table " + (e ? 'class="wikiTableNoBorder" ' : "") + 'cellspacing="0" cellpadding="0">';
        if (c != "") e += "<caption>" + c + "</caption>";
        for (c =
            0; c < b; c++) {
            e += "<tr>";
            for (var f = 0; f < a; f++) e += d && c == 0 ? '<th align="left">\ufeff</th>' : "<td>\ufeff</td>";
            e += "</tr>"
        }
        e += "</table>";
        return e
    },
    tableSelectCells: function(a, b) {
        for (var c = this.tableBox, d = c.cellsArray.length, e = c.cellsArray[0].length, f = 0; f < d; f++)
            for (var g = 0; g < e; g++)
                if (f < a && g < b) c.cellsArray[f][g].className = "over";
                else this.tableBox.cellsArray[f][g].className = "";
        if (b > e) b = e;
        if (a > d) a = d;
        if (a != 0 && b != 0) this.tableBox.cellsArray[a - 1][b - 1].className = "point"
    },
    tableCreateCells: function(a, b) {
        var c = this.tableBox,
            d = c.tb_cells;
        c.cells = d;
        var e = [];
        c.cellsArray = e;
        for (var f = 0; f < a; f++) {
            e[f] = [];
            for (var g = 0; g < b; g++) {
                var h = document.createElement("DIV");
                h.i = f;
                h.j = g;
                e[f][g] = h;
                d.appendChild(h)
            }
            g = document.createElement("BR");
            g.setAttribute("clear", "all");
            d.appendChild(g)
        }
        c.cellLast = null;
        c.canOver = true;
        var i = this,
            j = null,
            l = function(k) {
                j && clearTimeout(j);
                k = k.target;
                if (k.className == "point_over") k.className = "point_sel";
                j = setTimeout(function() {
                    if (!c.canOver) return null;
                    for (var m = 0; m < a; m++)
                        for (var r = 0; r < b; r++) e[m][r].className =
                            "";
                    c.tb_cols.innerHTML = "0";
                    c.tb_rows.innerHTML = "0"
                }, 100)
            },
            s = function(k) {
                var m = k.target;
                k = "sel";
                var r = "point_over";
                if (c.canSelect) {
                    if (m == d) m = c.cellLast;
                    var n = m.i,
                        q = m.j;
                    if (!c.canOver && m.className.indexOf("point") == -1) {
                        c.canOver = !c.canOver;
                        c.tb_rows.innerHTML = n + 1;
                        c.tb_cols.innerHTML = q + 1
                    }
                    if (!c.canOver) {
                        k = "over";
                        r = "point"
                    }
                    for (m = 0; m < a; m++)
                        for (var o = 0; o < b; o++) e[m][o].className = m < n + 1 && o < q + 1 ? k : "";
                    e[n][q].className = r;
                    if (c.canOver) {
                        k = 10;
                        var p = n - 1,
                            t = q - 1;
                        for (m = Math.max(n, q); m >= -1; m--) {
                            setTimeout(function() {
                                return function() {
                                    if (p >=
                                        -1) {
                                        if (p > -1) e[p][q].className = "point";
                                        if (p != n - 1) e[p + 1][q].className = "sel";
                                        p--
                                    }
                                    if (t >= -1) {
                                        if (t > -1) e[n][t].className = "point";
                                        if (t != q - 1) e[n][t + 1].className = "sel";
                                        t--
                                    }
                                }
                            }(m), k);
                            k += 20
                        }
                    }
                    i.tableBox.canOver = !c.canOver;
                    i.testInsertTable(1)
                }
            };
        addEvent(d, "mouseover", function(k) {
            j && clearTimeout(j);
            k = k.target;
            if (k.parentNode == d) {
                c.cellLast = k;
                if (c.canOver) {
                    if (c.cellLast != null) c.cellLast.className = "";
                    c.tb_rows.innerHTML = k.i + 1;
                    c.tb_cols.innerHTML = k.j + 1;
                    for (var m = 0; m < a; m++)
                        for (var r = 0; r < b; r++) e[m][r].className = k.i >=
                            m && k.j >= r ? "over" : "";
                    k.className = "point"
                } else if (k.className == "point_sel") k.className = "point_over"
            }
        });
        addEvent(d, "mouseout", function(k) {
            l(k)
        });
        addEvent(d, "mouseup", function(k) {
            s(k)
        })
    },
    allowTableActions: function(a) {
        for (var b = ["table_delete", "insert_row_before", "insert_row_after", "insert_col_before", "insert_col_after", "delete_row", "delete_col", "col_width"], c = 0; c < b.length; c++)
            if (this.toolbar[b[c]]) a ? this.toolbar[b[c]].enable() : this.toolbar[b[c]].disable()
    },
    getCellColTag: function(a, b) {
        for (var c = 0, d = 0; d <
            a.childNodes.length; d++)
            if (a.childNodes[d].nodeName == "COLGROUP") {
                for (var e = 0; e < a.childNodes[d].childNodes.length; e++)
                    if (a.childNodes[d].childNodes[e].nodeName == "COL")
                        if (b == c) return a.childNodes[d].childNodes[e];
                        else c++;
                break
            } else if (a.childNodes[d].nodeName == "COL")
            if (b == c) return a.childNodes[d];
            else c++;
        return null
    },
    insertLink: function(a) {
        var b = this.linkBox,
            c = trim(b.lb_link_url.value),
            d = trim(b.lb_link_text.value),
            e = false;
        if (ge("container1") && ge("container1").needBox) e = ge("container1").needBox.checked();
        if (this.testInsertLinkError()) return false;
        b.hide();
        b = this.frameDoc.createElement("A");
        if (c.indexOf(this.vk) != 0 && c.indexOf(this.vkcom) != 0 && !/[a-z-]\.(vkontakte\.ru|vk\.com)/.test(c)) b.className = "outer";
        if (e) {
            e = null;
            if (e = c.match(/(vkontakte\.ru|vk\.com)\/pages.php\?o=-(\d+)&p=(.*)/i)) c = "javascript:wikiBox.loadPage(" + e[2] + ", '" + decodeURIComponent(e[3]) + "').show();";
            else if (e = c.match(/(vkontakte\.ru|vk\.com)\/page-(\d+)_(\d+)/i)) c = "javascript:wikiBox.loadPage(" + e[2] + ", " + e[3] + ", true).show();"
        }
        b.href =
            c;
        b.alt = c;
        b.title = c;
        if (d == "") {
            this.setInnerText(b, c);
            b.setAttribute("notext", "yes")
        } else this.setInnerText(b, d);
        if (browser.msie) {
            this.frameWin.focus();
            this.currRange.pasteHTML("")
        } else this.currRange.deleteContents();
        a != undefined ? a.parentNode.replaceChild(b, a) : this.insertNodeFunc(b, this.currRange);
        this.setElemFocus(b)
    },
    getRangeText: function() {
        var a = this.getRange(),
            b = "";
        if (browser.msie) {
            if (a.text != "") b = a.text
        } else if (a.toString() != "") b = a.toString();
        return b
    },
    actLink: function() {
        var a = this.linkBox;
        if (ge("container1") &&
            ge("container1").needBox) {
            ge("container1").needBox.checked(false);
            hide(ge("container1").parentNode.parentNode)
        }
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    this.actLink()
                }.bind(this)
            });
            a.loadContent("wiki.php", {
                act: "link_box"
            }, false);
            return null
        }
        if (a.init == undefined) {
            this.extendObj(this.linkBox, ["lb_link_text", "lb_link_url", "lb_error", "lb_link_box"]);
            a.init = true
        }
        a.showError = false;
        hide(a.lb_error);
        fadeTo(a.lb_error, 1, 0, null);
        this.frameWin.focus();
        var b = this.getParentElement("A");
        a.removeButtons();
        a.addButton({
            onClick: function() {
                a.hide()
            },
            style: "button_no",
            label: box_cancel
        });
        a.lb_link_text.value = "";
        a.lb_link_url.value = "http://";
        var c = this.getRangeText();
        if (b != null) {
            a.setOptions({
                title: wiki_edit_link
            });
            a.addButton({
                onClick: function() {
                    this.insertLink(b)
                }.bind(this),
                label: wiki_edit
            });
            a.lb_link_text.value = this.getInnerText(b);
            var d = this.decURI(b.href);
            c = null;
            if (d.indexOf("wikiBox.loadPage") != -1) {
                var e = /wikiBox\.loadPage\((\d+), (\d+), true\)/i,
                    f = d.match(/wikiBox\.loadPage\((\d+), '(.*?)'\)/i);
                if (f != null) c = this.vk + "pages.php?o=-" + f[1] + "&p=" + this.encURI(f[2]);
                else if (f = d.match(e)) c = this.vk + "page-" + f[1] + "_" + f[2]
            }
            if (d.indexOf("vkontakte.ru/page") != -1 || d.indexOf("vk.com/page") != -1 || c) {
                if (!ge("container1")) {
                    d = new Checkbox(ge("lb_link_box"), {
                        label: "",
                        width: 160
                    });
                    ge("container1").needBox = d
                }
                show(ge("container1").parentNode.parentNode);
                c != null && ge("container1").needBox.checked(true)
            }
            d = this.decURI(b.href);
            e = d.replace(this.vk, "").replace(this.vkcom, "");
            a.lb_link_url.value = e.indexOf("http://") == 0 ?
                e : d;
            if (c) a.lb_link_url.value = c
        } else {
            a.setOptions({
                title: wiki_adding_link
            });
            a.addButton({
                onClick: function() {
                    this.insertLink()
                }.bind(this),
                label: global_add
            });
            a.lb_link_text.value = c
        }
        this.currRange = this.getRange();
        a.show();
        this.unFocusIE();
        this.setInputFocusEnd(a.lb_link_url)
    },
    testInsertLinkError: function(a) {
        var b = this.linkBox,
            c = null,
            d = trim(b.lb_link_url.value),
            e = trim(b.lb_link_text.value);
        if (d == "" || d == "http://") c = [1, wiki_err_not_enter_link];
        else if (d.indexOf("http://") == -1) c = [2, wiki_err_link_start];
        else if (/^http:\/\/([a-z0-9-]+\.)+[a-z]{2,6}/i.test(d)) {
            if (e != "" && !/^[\s0-9a-z\u0430-\u044f\u0451!=#\?:&\/\.,_-]+$/i.test(e)) c = [5, wiki_err_forbidden_chars_in_link_text]
        } else c = [3, wiki_err_bad_url];
        if (a != undefined) {
            if (c == null || c && c[0] != a) fadeTo(b.lb_error, this.showErrorTime, 0, function() {
                hide(b.lb_error);
                b.showError = false
            });
            return null
        }
        if (c != null) {
            if (b.showError) b.lb_error.innerHTML = c[1];
            else {
                b.lb_error.innerHTML = c[1];
                b.showError = true;
                show(b.lb_error);
                fadeTo(b.lb_error, this.showErrorTime, 1, null)
            }
            return true
        }
        return false
    },
    linkFix: function(a) {
        if (this.nodeList.A) {
            var b = this.getParentElement("A");
            if (b && a.keyCode == KEY.ENTER) {
                var c = this.getRange().cloneRange();
                c.setStartBefore(c.commonAncestorContainer);
                if (c.toString().length == 0) {
                    c = this.frameDoc.createElement("P");
                    c.innerHTML = "<br>";
                    b.parentNode.insertBefore(c, b);
                    return cancelEvent(a)
                }
            } else if (b && a.keyCode == KEY.RIGHT)
                if (this.getElemOffsets(b).endOffset) {
                    this.setElemFocus(b);
                    a = this.frameDoc.createTextNode("\ufeff");
                    if (b.nextSibling) {
                        c = b.nextSibling;
                        if (c.nodeType != 3 || c.nodeType ==
                            3 && trim(c.nodeValue) == "") b.parentNode.insertBefore(a, b.nextSibling)
                    } else b.parentNode.appendChild(a)
                }
        }
    },
    actUnLink: function() {
        var a = this.getParentElement("A"),
            b = function() {
                var c = this.frameDoc.createTextNode(this.getInnerText(a));
                a.parentNode.replaceChild(c, a);
                this.frameWin.focus();
                this.getFormat()
            };
        a != null && this.alertBox(wiki_warning, wiki_warning_delete_link, box_yes, box_cancel, b.bind(this), null)
    },
    actTime: function(a) {
        if (this.timer != null) return false;
        var b = function(c) {
            c = c.toString();
            return c = c.length ==
                1 ? "0" + c : c
        };
        Ajax.Post({
            url: "wiki.php",
            query: {
                act: "get_server_time",
                rand: Math.random()
            },
            onDone: function(c, d) {
                var e = new Date(d * 1E3),
                    f = b(e.getHours()) + ":" + b(e.getMinutes());
                e = b(e.getDate()) + "." + b(e.getMonth() + 1) + "." + e.getFullYear();
                f = f + " " + e + " MSK";
                if (a) a.call(this, f);
                else {
                    this.frameWin.focus();
                    browser.msie ? this.getRange().pasteHTML(f) : this.frameDoc.execCommand("InsertHtml", false, f)
                }
                this.timer = setTimeout(function() {
                    this.timer = null
                }.bind(this), 1E3)
            }.bind(this),
            onFail: null
        })
    },
    actSignature: function(a) {
        if (this.params.userID &&
            this.params.userName) {
            if (!a) {
                this.actTime(this.actSignature);
                return false
            }
            var b = this.frameDoc.createElement("SPAN");
            b.className = "signature";
            b.innerHTML = '<a href="/id' + this.params.userID + '">' + this.params.userName + "</a>&nbsp;" + a;
            this.frameWin.focus();
            this.insertNodeFunc(b, this.getRange())
        }
    },
    insertAudio: function(a, b, c, d) {
        this.insertNodeFunc(this.createAudioTable(a, b, c, d), this.currRange);
        this.chooseAudioBox.hide()
    },
    createAudioInput: function(a, b) {
        var c = this.frameDoc.createElement("INPUT");
        c.type = "text";
        c.setAttribute("readonly", "readonly");
        c.className = "wikiAudio";
        c.setAttribute("wiki", "audio" + a);
        c.value = b;
        return c
    },
    createAudioTable: function(a, b, c, d) {
        var e = AudioObject.images.playmode.play,
            f = "";
        f += '<table class="wikiAudio" wiki="audio' + a + '">';
        f += "<tr>";
        f += '<td class="imgButton"><img src="' + e + '" id="imgbutton' + a + '"></td>';
        f += '<td class="title"><b>' + b + "</b> - " + c + "</td>";
        f += '<td class="duration">' + d + "</td>";
        f += "</tr>";
        f += "<tr>";
        f += "<td>&nbsp;</td>";
        f += "<td>";
        f += '<div id="line' + a + '" class="line"></div>';
        f += "</td>";
        f += "<td>&nbsp;</td>";
        f += "</tr>";
        f += "</table>";
        a = this.frameDoc.createElement("DIV");
        a.innerHTML = f;
        f = a.firstChild;
        var g = this;
        addEvent(f, "click", function(h) {
            g.selectElement.call(g, this);
            return cancelEvent(h)
        });
        f.unselectable = "on";
        a = f.getElementsByTagName("*");
        each(a, function(h, i) {
            i.unselectable = "on"
        });
        f.getElementsByTagName("IMG");
        return f
    },
    chooseAudio: function() {
        var a = this.chooseAudioBox;
        if (this.nodeList.TABLE && this.nodeList.TABLE.classes.wikiAudio) {
            for (var b = this.nodeList.TABLE.nodes, c =
                    null, d = 0; d < b.length; d++)
                if (b[d].className == "wikiAudio") {
                    c = b[d];
                    break
                }
            this.alertBox(wiki_warning, wiki_delete_audio, box_yes, box_cancel, function() {
                c && c.parentNode.removeChild(c);
                this.frameWin.focus();
                this.getFormat()
            }.bind(this), null);
            if (c) return false
        }
        a.show();
        if (a.loaded == undefined) {
            a.setOptions({
                onLoad: function() {
                    a.loaded = true;
                    this.chooseAudio()
                }.bind(this)
            });
            a.loadContent("audio.php", {
                act: "a_choose_audio_box",
                scrollbar_width: window.sbWidth()
            }, true, "height: 412px;");
            return null
        }
        this.frameWin.focus();
        this.currRange = this.getRange();
        this.unFocusIE()
    },
    setCut: function(a, b) {
        var c = this.frameDoc.body.childNodes,
            d = 0,
            e = this.frameDocCut,
            f = null;
        e.body.innerHTML = "";
        this.frameDoc.body.innerHTML = this.frameDoc.body.innerHTML.replace(/<!--[\s\S]+?--\>/, "");
        var g = e.createElement("DIV");
        g.style.border = "1px solid red";
        e.body.appendChild(g);
        for (e = 0; e < c.length; e++) {
            g.appendChild(c[e].cloneNode(true));
            if (g.offsetHeight > a && f == null) {
                d = g.offsetHeight;
                if (nextElem = c[e].nextSibling) f = c[e]
            }
        }
        if (f && d + b < g.offsetHeight) {
            c = this.frameDoc.createComment("CUT");
            f.parentNode.insertBefore(c, f.nextSibling)
        }
    },
    setCutIE: function(a, b) {
        var c = 0,
            d = this.frameDocCut,
            e = null;
        d.body.innerHTML = "";
        this.frameDoc.body.innerHTML = this.frameDoc.body.innerHTML.replace(/<!--[\s\S]+?--\>/, "");
        var f = d.createElement("DIV");
        f.style.border = "1px solid red";
        d.body.appendChild(f);
        f.innerHTML = this.frameDoc.body.innerHTML;
        var g = f.offsetHeight;
        d = f.childNodes;
        for (var h = d.length; h > 0; h--)
            if (f.offsetHeight < a && e == null) {
                c = f.offsetHeight;
                e = h;
                break
            } else if (d[h]) {
            if (g > a + b && h == 1 && f.offsetHeight > a) {
                c =
                    f.offsetHeight;
                e = h
            }
            f.removeChild(d[h])
        }
        if (f.offsetHeight > a && i == null && d.length == 1 && f.offsetHeight + b < g) {
            c = f.offsetHeight;
            e = h
        }
        if (e != null && c + b < g) {
            c = this.frameDoc.createComment("CUT");
            d = this.frameDoc.body.childNodes;
            var i = d[e];
            i.nextSibling && i.parentNode.insertBefore(c, i.nextSibling)
        }
    },
    convertToWiki: function() {
        if (this.params.cutHtml) {
            var a = this.params.cutHtml;
            this.setCutIE(a.maxHeight, a.offset)
        }
        a = this.frameDoc.body.innerHTML;
        a = a.replace(/\r\n|\r|\n/gi, "");
        this.frameDoc.body.innerHTML = trim(a);
        this.wikiCode =
            this.categoryBox.wiki;
        this.newLine = "\n";
        a = this.convertOptions = {};
        a.convertTags = ["B", "I", "U", "S", "SUB", "SUP", "BLOCKQUOTE", "CODE", "TT"];
        a.blockTags = ["P", "DIV", "H1", "H2", "H3", "LI", "BR", "TABLE"];
        a.centerTagsTest = ["P", "DIV", "TH", "TD"];
        a.rightTagsTest = ["DIV"];
        a.headersTags = ["H1", "H2", "H3"];
        a.replaceTags = {
            STRIKE: {
                open: "<s>",
                close: "</s>"
            },
            EM: {
                open: "<i>",
                close: "</i>"
            },
            STRONG: {
                open: "<b>",
                close: "</b>"
            }
        };
        a.tableTags = {
            TABLE: {
                open: "{|",
                close: "|}",
                noBorder: "noborder"
            },
            CAPTION: {
                open: "|+ ",
                close: ""
            },
            COL: {
                open: "|~",
                close: ""
            },
            TR: {
                open: "|-",
                close: ""
            },
            TH: {
                open: "! ",
                close: ""
            },
            TD: {
                open: "| ",
                close: ""
            }
        };
        a = this.frameDoc.body.lastChild;
        a.nodeName == "P" && a.innerHTML == "\ufeff" && a.parentNode.removeChild(a);
        this.recursive(this.frameDoc.body);
        return this.wikiCode
    },
    getWikiLink: function(a) {
        var b = "",
            c = null,
            d = false,
            e = this.decURI(a.href),
            f = d = "";
        d = e.replace(this.vk, "").replace(this.vkcom, "");
        if (d.indexOf("http://") == 0) e = d;
        (d = a.getAttribute("notext")) || (f = trim(this.getInnerText(a)));
        if (e.indexOf(this.vk) == 0 || e.indexOf(this.vkcom) ==
            0 || e.indexOf("javascript:wikiBox.loadPage") == 0) {
            d = e.replace(this.vk, "").replace(this.vkcom, "");
            if (!(c = d.match(/id[0-9]+/i)))
                if (!(c = d.match(/photo-?[0-9]+_[0-9]+/i)))
                    if (!(c = d.match(/video-?[0-9]+_[0-9]+/i)))
                        if (!(c = d.match(/club[0-9]+/i)))
                            if (!(c = d.match(/topic-?[0-9]+_[0-9]+/i)))
                                if (!(c = d.match(/note-?[0-9]+_[0-9]+/i)))
                                    if (!(c = d.match(/page-?[0-9]+_[0-9]+/i)))
                                        if (c = d.match(/wikiBox\.loadPage\((\d+), '(.*?)'\)/i)) {
                                            a = parseInt(c[1]);
                                            d = this.params.groupID;
                                            b = "";
                                            g = c[2];
                                            if (f != "") f = "|box|" + f;
                                            if (d && d != a) b = "club" +
                                                a + ":";
                                            b = "[[" + b + g + f + "]]"
                                        } else if (c = d.match(/wikiBox\.loadPage\((\d+), (\d+), true\)/i)) {
                a = parseInt(c[1]);
                d = this.params.groupID;
                pageId = parseInt(c[2]);
                if (f != "") f = "|box|" + f;
                if (d && d == a) b = "[[page-" + a + "_" + pageId + f + "]]"
            } else if (c = d.match(/pages\.php\?o=-?([0-9]+)&p=(.+)/i)) {
                a = parseInt(c[1]);
                d = this.params.groupID;
                b = "";
                var g = c[2];
                if (f == g) f = "";
                if (f != "") f = "|" + f;
                if (d && d != a) b = "club" + a + ":";
                if (g.indexOf("%") != -1) g = this.decURI(g);
                b = "[[" + b + g.replace(/\+/g, " ") + f + "]]"
            } else if (c = d.match(/pages\.php\?p=([\s\S]+)/i)) {
                g =
                    trim(c[1]);
                if (g == f) b = "[[" + g + "]]";
                else {
                    if (f == g) f = "";
                    if (f != "") f = "|" + f;
                    b = "[[" + g + f + "]]"
                }
            }
            if (c != null) e = c
        }
        if (c) {
            leftBrake = "[[";
            rightBrake = "]]"
        } else {
            leftBrake = "[";
            rightBrake = "]"
        }
        if (f == e) f = "";
        if (f != "") f = "|" + f;
        if (b == "") b = leftBrake + e + f + rightBrake;
        return b
    },
    getWikiPhoto: function(a) {
        var b = "";
        if (a.id && a.id.indexOf("photo") == 0) {
            a = this.images[a.id.replace("photo", "")];
            b = "[[photo" + a.photoID + "|" + a.width + "x" + a.height + "px";
            a.useBorder || (b += ";noborder");
            if (a.boxView) b += ";box";
            if (a.url == "") {
                b += ";nolink";
                if (a.text == "") b +=
                    "| ]]"
            } else if (a.text == "") b += "photo" + a.photoID == a.url ? "| ]]" : "|" + a.url + "]]";
            if (a.text != "") b += "|" + a.text + "]]"
        }
        return b
    },
    getNodeLevel: function(a) {
        for (var b = 1, c = a; c.nodeName != "BODY";) {
            c = c.parentNode;
            c.nodeName == a.nodeName && b++
        }
        return b
    },
    repeatString: function(a, b) {
        for (var c = "", d = 0; d < b; d++) c += a;
        return c
    },
    testLeft: function(a) {
        if (a.getAttribute("align") == "left" || a.style.textAlign == "left") return true;
        return false
    },
    testCenter: function(a) {
        if (a.getAttribute("align") == "center" || a.style.textAlign == "center") return true;
        return false
    },
    testRight: function(a) {
        if (a.getAttribute("align") == "right" || a.style.textAlign == "right") return true;
        return false
    },
    testGray: function(a) {
        if (!a.getAttribute) return false;
        if (!a.getAttribute("style")) return false;
        if (a.style.color.indexOf("rgb(119, 119, 119)") != -1 || a.style.color.indexOf("#777") != -1) return true;
        return false
    },
    getWikiHeader: function(a) {
        var b = "",
            c = this.getInnerText(a);
        c = this.replaceSpecialChars(c.replace(/\r\n|\r|\n/gi, ""));
        switch (a.nodeName) {
            case "H1":
                b = "== " + c + " ==";
                break;
            case "H2":
                b =
                    "=== " + c + " ===";
                break;
            case "H3":
                b = "==== " + c + " ===="
        }
        return b
    },
    getWikiAudio: function(a) {
        return "[[" + a.getAttribute("wiki") + "]]"
    },
    getWikiVideo: function(a) {
        if (a.getAttribute("wiki")) return "[[" + a.getAttribute("wiki") + "]]";
        else {
            a = this.videos[a.id.replace("video", "")];
            var b = "[[video" + a.videoID;
            b += a.text != "" ? "|" + a.text + "]]" : "]]"
        }
        return b
    },
    replaceSpecialChars: function(a) {
        a = a;
        a = a.replace(/#/g, "&#35;").replace(/\*/g, "&#42;");
        a = a.replace(/</g, "&#60;").replace(/>/g, "&#62;");
        a = a.replace(/\[/g, "&#91;").replace(/]/g,
            "&#93;");
        a = a.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
        a = a.replace(/=/g, "&#61;").replace(/~/g, "&#126;");
        return a = a.replace(/\|/g, "&#124;").replace(/!/g, "&#33;")
    },
    testNewLine: function(a) {
        if (a.length == 0) return true;
        if (a.substr(a.length - 1) == "\n") return true;
        return false
    },
    addWikiText: function(a) {
        this.wikiCode += a;
        if (this.debug) this.replaceElem.value = this.wikiCode
    },
    getWikiHider: function(a) {
        this.inHider = true;
        this.newLine = "<br/>";
        this.testNewLine(this.wikiCode) || this.addWikiText("\n");
        var b = a.rows[0].cells[1].innerHTML;
        b = b.replace(/<br.*?>/gi, "t8vb_ec63N_1");
        b = this.replaceSpecialChars(b).replace(/t8vb_ec63N_1/g, "<br/>");
        a = a.rows[1].cells[0];
        this.addWikiText("{{Hider|" + b.replace(/(<br\/>)+/gi, "<br/>") + "\n");
        this.recursive(a);
        this.testNewLine(this.wikiCode) || this.addWikiText("\n");
        this.addWikiText("}}\n");
        this.inHider = false;
        this.newLine = "\n"
    },
    getWikiPre: function(a) {
        a = a.getElementsByTagName("TD")[0];
        a.innerHTML = a.innerHTML.replace(/<br>/gi, "\n").replace("\ufeff", "");
        return "<pre>" + this.getInnerText(a) + "</pre>"
    },
    testNodeStyle: function(a,
        b, c, d) {
        if (a.style[b] == c) return d;
        return ""
    },
    recursive: function(a) {
        var b = this.convertOptions;
        if (a.nodeType == 3) {
            if (trim(a.nodeValue) == "") return false;
            this.addWikiText(this.replaceSpecialChars(a.nodeValue))
        } else if (a.nodeType == 8) a.data == "CUT" && this.addWikiText("<!-- " + a.data + " --\>");
        else {
            var c = true;
            if (a.nodeName == "TABLE" && a.className.indexOf("hider") != -1) {
                this.inHider = true;
                this.getWikiHider(a);
                return false
            }
            if (a.nodeName == "TABLE" && (a.className == "" || a.className.indexOf("wikiTable") != -1)) {
                this.testNewLine(this.wikiCode) ||
                    this.addWikiText("\n");
                this.inTable = true;
                this.newLine = "<br/>"
            }
            if (a.nodeName == "UL") this.listTag = "*";
            else if (a.nodeName == "OL") this.listTag = "#";
            else if (this.inArray(a.nodeName, b.convertTags)) this.addWikiText("<" + a.nodeName.toLowerCase() + ">");
            else if (b.replaceTags[a.nodeName]) this.addWikiText(b.replaceTags[a.nodeName].open);
            else if (this.inTable && b.tableTags[a.nodeName] && (a.className == "" || a.className.indexOf("wikiTable") != -1)) {
                this.testNewLine(this.wikiCode) || this.addWikiText("\n");
                if (a.nodeName == "COL") {
                    if (!this.isColOpened) {
                        this.isColOpened =
                            true;
                        this.currentCol = ""
                    }
                    this.currentCol += a.style && a.style.width ? a.style.width.replace("%", " ") : "0 "
                } else if (this.isColOpened) {
                    this.isColOpened = false;
                    this.addWikiText(b.tableTags.COL.open + this.currentCol.substr(0, this.currentCol.length - 1));
                    this.addWikiText("\n");
                    this.addWikiText(b.tableTags[a.nodeName].open)
                } else {
                    this.addWikiText(b.tableTags[a.nodeName].open);
                    a.className.indexOf("wikiTableNoBorder") != -1 && this.addWikiText(b.tableTags[a.nodeName].noBorder)
                }
            } else if (a.nodeName == "LI") {
                this.testNewLine(this.wikiCode) ||
                    this.addWikiText("\n");
                this.addWikiText(this.repeatString(this.listTag, this.getNodeLevel(a.parentNode)) + " ")
            } else if (a.nodeName == "A") {
                this.addWikiText(this.getWikiLink(a));
                return false
            } else if (a.nodeName == "SPAN")
                if (a.className.indexOf("signature") != -1) {
                    this.addWikiText("~~~");
                    c = false
                } else {
                    this.addWikiText(this.testNodeStyle(a, "textDecoration", "underline", "<u>"));
                    this.addWikiText(this.testNodeStyle(a, "textDecoration", "line-through", "<s>"))
                }
            else if (a.nodeName == "IMG" && a.className.indexOf("wikiPhoto") !=
                -1) {
                this.addWikiText(this.getWikiPhoto(a));
                return false
            } else if (a.nodeName == "IMG" && a.className.indexOf("wikiVideo") != -1) {
                this.addWikiText(this.getWikiVideo(a));
                return false
            } else if ((a.nodeName == "TABLE" || a.nodeName == "INPUT") && a.className.indexOf("wikiAudio") != -1) {
                this.addWikiText(this.getWikiAudio(a));
                return false
            } else if (a.nodeName == "TABLE" && a.className.indexOf("pre") != -1) {
                this.addWikiText(this.getWikiPre(a));
                return false
            } else if (this.inArray(a.nodeName, b.headersTags)) {
                this.testNewLine(this.wikiCode) ||
                    this.addWikiText("\n");
                this.addWikiText(this.getWikiHeader(a));
                c = false
            }
            if (this.inArray(a.nodeName, b.centerTagsTest)) this.addWikiText(this.testCenter(a) ? "<center>" : "");
            if (this.inArray(a.nodeName, b.rightTagsTest)) this.addWikiText(this.testRight(a) ? "<right>" : "");
            if (a.nodeName == "SPAN") this.addWikiText(this.testGray(a) ? "<gray>" : "");
            if (c)
                for (c = 0; c < a.childNodes.length; c++) this.recursive(a.childNodes[c]);
            if (this.inTable && b.tableTags[a.nodeName]) {
                b.tableTags[a.nodeName] != "" && !this.testNewLine(this.wikiCode) &&
                    this.addWikiText("\n");
                this.addWikiText(b.tableTags[a.nodeName].close)
            }
            if (a.nodeName == "TABLE" && (a.className == "" || a.className.indexOf("wikiTable") != -1)) {
                this.inTable = false;
                this.newLine = "\n"
            }
            c = this.testCenter(a);
            var d = this.testRight(a),
                e = this.testGray(a);
            if (this.inArray(a.nodeName, b.rightTagsTest)) this.addWikiText(d ? "</right>" : "");
            if (this.inArray(a.nodeName, b.centerTagsTest)) this.addWikiText(c ? "</center>" : "");
            if (a.nodeName == "SPAN") this.addWikiText(e ? "</gray>" : "");
            this.inArray(a.nodeName, b.convertTags) &&
                this.addWikiText("</" + a.nodeName.toLowerCase() + ">");
            b.replaceTags[a.nodeName] && this.addWikiText(b.replaceTags[a.nodeName].close);
            if (a.nodeName == "SPAN") {
                this.addWikiText(this.testNodeStyle(a, "textDecoration", "underline", "</u>"));
                this.addWikiText(this.testNodeStyle(a, "textDecoration", "line-through", "</s>"))
            }
            if (a == a.parentNode.lastChild) return false;
            this.inArray(a.nodeName, b.blockTags) && !c && !d && !e && this.addWikiText(this.newLine)
        }
    },
    HtmlToHtml: function(a, b) {
        if (this.frameDoc.body == null) {
            setTimeout(function() {
                this.HtmlToHtml(a,
                    b)
            }.bind(this), 100);
            return false
        }
        this.htmlSetContent(a);
        this.htmlCenterReplace();
        this.htmlListReplace("UL");
        this.htmlListReplace("OL");
        this.htmlTableCellSetSpace("TD");
        this.htmlTableCellSetSpace("TH");
        this.htmlRemoveLiSpan();
        this.htmlCategoryGetInfo(b);
        try {
            this.htmlPhotoGetInfo(b);
            this.htmlAudioGetInfo(b);
            this.htmlVideoGetInfo(b)
        } catch (c) {}
        this.htmlRemoveAnchors();
        this.htmlReplaceLinks();
        this.htmlHiderReplace();
        this.htmlRemoveWhiteSpace(this.frameDoc.body);
        this.htmlRemoveLastBr();
        this.htmlDivHeaderReplace();
        this.setDocOptions();
        setTimeout(function() {
            this.setDocOptions()
        }.bind(this), 300)
    },
    preReplaceFunc: function(a) {
        if (trim(a) == "") return "";
        return '<table class="pre"><tr><td>' + this.replaceSpecialChars(a) + "</td></tr></table>"
    },
    htmlSetContent: function(a) {
        a = a.replace(/href=([\"\'])(.+?)\1/gi, function(b, c, d) {
            return 'href="' + this.encURI(this.decURI(d)) + '"'
        }.bind(this));
        a = a.replace(/<!--[\s\S]*?--\>/gi, "");
        a = a.replace(/<\/?nowiki>/gi, function(b) {
            return b.replace(/nowiki/gi, "pre")
        });
        a = a.replace(/<pre>[\s\S]*?<\/pre>/gi,
            function(b) {
                return b.replace(/\n/gi, "z98_7n_op1")
            });
        a = a.replace(/\r\n|\r|\n/gi, "");
        a = a.replace(/<pre>([\s\S]*?)<\/pre>/gi, function(b, c) {
            return this.preReplaceFunc(c)
        }.bind(this));
        a = a.replace(/z98_7n_op1/gi, "<br>");
        this.images = [];
        this.frameDoc.body.innerHTML = a
    },
    htmlRemoveWhiteSpace: function(a) {
        a = a.childNodes;
        for (var b = 0; b < a.length; b++) a[b].nodeType == 3 && trim(a[b].nodeValue) == "" ? a[b].parentNode.removeChild(a[b]) : this.htmlRemoveWhiteSpace(a[b])
    },
    htmlRemoveLastBr: function() {
        for (var a = this.frameDoc.body.getElementsByTagName("BR"),
                b = a.length, c = 0, d = 0; d < b; d++)
            if (a[c] == a[c].parentNode.lastChild) a[c].parentNode.removeChild(a[c]);
            else c++
    },
    htmlCenterReplace: function() {
        for (var a = this.frameDoc.getElementsByTagName("CENTER"), b = a.length, c = 0; c < b; c++) {
            var d = this.frameDoc.createElement("P");
            d.innerHTML = a[0].innerHTML;
            d.setAttribute("align", "center");
            a[0].parentNode.replaceChild(d, a[0])
        }
    },
    htmlListReplace: function(a) {
        a = this.frameDoc.getElementsByTagName(a);
        for (var b = 0; b < a.length; b++)
            for (var c = a[b]; c.parentNode.nodeName != "BODY";) {
                c.nodeName ==
                    "LI" && c.parentNode.insertBefore(a[b], c.nextSibling);
                c = c.parentNode
            }
    },
    htmlTableCellSetSpace: function(a) {
        var b = this.frameDoc.getElementsByTagName(a),
            c = false;
        if (a == "TH") c = true;
        for (a = 0; a < b.length; a++) {
            var d = trim(b[a].innerHTML);
            if (d == "" || d == "\ufeff") b[a].innerHTML = "\ufeff";
            c && b[a].setAttribute("align", "left")
        }
    },
    htmlRemoveLiSpan: function() {
        for (var a = this.frameDoc.getElementsByTagName("LI"), b = 0; b < a.length; b++) {
            var c = a[b].getElementsByTagName("SPAN");
            if (c.length != 0) a[b].innerHTML = c[0].innerHTML
        }
    },
    htmlCategoryGetInfo: function(a) {
        if (a) {
            var b =
                this.categoryBox,
                c = a.match(/\[\[category:(.+?)\|.+?]]/i);
            if (c != null) {
                this.categoryTitle = c[1];
                b.wiki = "[[category:" + c[1] + "]]"
            }
            a = a.match(/\[\[subcategory:(.+?)\|.+?]]/i);
            if (a != null) {
                this.subCategoryTitle = a[1];
                b.wiki += "[[subcategory:" + a[1] + "]]"
            }
        }
    },
    htmlPhotoGetInfo: function(a) {
        for (var b = this, c = {
                photoID: null,
                width: null,
                height: null,
                saveRatio: true,
                text: "",
                url: "",
                useBorder: false,
                useLink: false,
                boxView: false
            }, d = [], e = [], f = this.frameDoc.getElementsByTagName("*"), g = 0; g < f.length; g++)
            if (f[g].nodeName == "IMG" && f[g].className.indexOf("wikiPhoto") !=
                -1) d.push(f[g]);
            else if (f[g].nodeName == "A" && (f[g].className.indexOf("wikiPhoto") != -1 || /photo-?[0-9]+_[0-9]+/i.test(this.decURI(f[g].href)))) d.push(f[g]);
        if (a == "")
            for (g = 0; g < d.length; g++) {
                a = {};
                a = extend(a, c);
                f = d[g];
                var h = "photo" + g;
                f.id = h;
                a.photoID = f.getAttribute("wiki").replace("photo", "");
                a.useLink = true;
                a.url = "photo" + a.photoID;
                a.width = f.width;
                a.height = f.height;
                e[g] = a;
                var i = function(l) {
                    return function() {
                        b.photoSetup.call(b, l, false)
                    }
                };
                i = i(h);
                addEvent(f, "click", i)
            } else {
                h = a.match(/\[\[photo-?[0-9]+_[0-9]+.*?]]/gi);
                if (h != null)
                    for (g = 0; g < h.length; g++) {
                        if (this.contentHTML.indexOf(h[g]) != -1) continue;
                        a = {};
                        a = extend(a, c);
                        f = null;
                        if (d[g].nodeName == "A" && d[g].firstChild.nodeName == "IMG") {
                            f = d[g].firstChild;
                            f.className = d[g].className;
                            d[g].parentNode.replaceChild(f, d[g])
                        } else if (d[g].nodeName == "IMG") f = d[g];
                        else d[g].className = "wikiPhoto";
                        i = h[g].match(/\[\[photo(-?[0-9]+_[0-9]+)/);
                        if (i != null) a.photoID = i[1];
                        i = h[g].match(/\|.*?([0-9]+)x([0-9]+)px.*?\|/i);
                        if (i != null) {
                            a.width = i[1];
                            a.height = i[2];
                            if (f != null) {
                                f.style.width = a.width + "px";
                                f.style.height = a.height + "px"
                            }
                        } else {
                            i = h[g].match(/\|.*?([0-9]+)px.*?\|/i);
                            if (i != null) {
                                a.width = i[1];
                                a.height = f.height
                            } else if (f != null) {
                                a.width = f.width;
                                a.height = f.height
                            }
                            a.saveRatio = true
                        }
                        i = h[g].match(/.+\|(.+?)]]/i);
                        if (i != null) a.text = trim(i[1]);
                        if (!/\|.*?nolink.*?\|/i.test(h[g])) {
                            i = ["id[1-9][0-9]*", "club[1-9][0-9]*", "photo-?[0-9]+_[0-9]+", "video-?[0-9]+_[0-9]+", "topic", "page(-?[0-9]+_)?[0-9]+", "event[1-9][0-9]*", "http://"];
                            for (var j = 0; j < i.length; j++)
                                if (RegExp(i[j], "i").test(a.text)) {
                                    a.url = a.text;
                                    a.text = "";
                                    break
                                }
                            if (a.url == "") a.url = "photo" + a.photoID;
                            a.useLink = true
                        }
                        if (!/\|.*?noborder.*?\|/i.test(h[g])) a.useBorder =
                            true;
                        if (/\|.*?box.*?\|/i.test(h[g])) a.boxView = true;
                        e[g] = a;
                        j = "photo" + g;
                        i = function(l) {
                            return function() {
                                b.photoSetup.call(b, l, false)
                            }
                        };
                        i = i(j);
                        if (f != null) {
                            f.id = j;
                            addEvent(f, "click", i);
                            if (a.useLink && f.className == "wikiPhoto") {
                                addEvent(f, "mouseover", function() {
                                    addClass(this, "hover")
                                });
                                addEvent(f, "mouseout", function() {
                                    removeClass(this, "hover")
                                })
                            }
                        } else {
                            d[g].id = j;
                            addEvent(d[g], "click", i)
                        }
                    }
            }
        this.images = e
    },
    htmlAudioGetInfo: function(a) {
        if (a) {
            var b = a.match(/\[\[audio-?[0-9]+_[0-9]+]]/gi);
            if (b != null) {
                a = [];
                for (var c =
                        0; c < b.length; c++) {
                    var d = b[c].match(/-?[0-9]+_[0-9]+/);
                    a.push(d[0])
                }
                b = this.frameDoc.getElementsByTagName("DIV");
                d = b.length;
                var e = 0,
                    f = 0;
                for (c = 0; c < d; c++)
                    if (b[e] && b[e].className.toLowerCase() == "audiorow") {
                        for (var g = b[e].getElementsByTagName("*"), h = 0; h < g.length; h++) {
                            if (g[h].id.indexOf("performer") != -1) var i = g[h].innerHTML;
                            if (g[h].id.indexOf("title") != -1) var j = g[h].innerHTML;
                            if (g[h].className == "duration") var l = g[h].innerHTML
                        }
                        g = this.createAudioTable(a[f], i, j, l);
                        f++;
                        b[e].parentNode.replaceChild(g, b[e])
                    } else e++
            }
        }
    },
    htmlVideoGetInfo: function(a) {
        a = a.match(/\[\[video-?[0-9]+_[0-9]+.*?]]/gi);
        for (var b = [], c = this.frameDoc.getElementsByTagName("*"), d = 0; d < c.length; d++) c[d].nodeName == "A" && c[d].className == "wikiVideo" && b.push(c[d]);
        if (a != null) {
            c = [];
            var matchIndex = 0;
            for (d = 0; d < b.length; d++) {
                var e = {
                        videoID: null,
                        text: ""
                    },
                    f = b[d].firstChild;
                while (this.contentHTML.indexOf(a[matchIndex]) != -1) ++matchIndex;
                if (a[matchIndex]) {
                    var g = a[matchIndex].match(/\[\[video(-?[0-9]+_[0-9]+)/);
                    if (g != null) e.videoID = g[1];
                    g = a[matchIndex].match(/.+\|(.+?)]]/i);
                    if (g != null) e.text = trim(g[1])
                }
                f = this.createVideoObj("video" + e.videoID, f.src, f.alt);
                b[d].parentNode.replaceChild(f,
                    b[d]);
                c[d] = e;
                e = "video" + d;
                g = function() {
                    return function() {}
                }(e);
                if (f != null) {
                    f.id = e;
                    addEvent(f, "click", g)
                };
                ++matchIndex;
            }
            this.videos = c
        }
    },
    htmlRemoveAnchors: function() {
        for (var a = this.frameDoc.body.getElementsByTagName("A"), b = a.length, c = 0, d = 0; d < b; d++)
            if (a[c].name != "" && a[c].href == "") a[c].parentNode.removeChild(a[c]);
            else c++
    },
    htmlReplaceLinks: function() {
        for (var a = this.frameDoc.getElementsByTagName("A"), b = "", c = 0; c < a.length; c++) {
            b = this.decURI(a[c].href).replace(/&amp;/gi, "&");
            var d = b.replace(this.vk, "").replace(this.vkcom,
                "");
            if (d.indexOf("/") == 0) d = d.replace("/", "");
            if (d.indexOf("http://") == 0) b = d;
            else {
                if (b.indexOf("pages.php") != -1) {
                    b = d.match(/pages\.php\?o=-&p=(.+)/i);
                    if (b != null) d = "pages.php?p=" + b[1]
                }
                if (d.indexOf("away.php?to=") == 0) {
                    d = d.replace("away.php?to=", "");
                    a[c].className = "outer";
                    b = d
                } else b = this.vk + d;
                a[c].href = this.encURI(d)
            }
            a[c].alt = b;
            a[c].title = b
        }
    },
    htmlHiderReplace: function() {
        for (var a = 0, b = this.frameDoc.getElementsByTagName("DIV"), c = 0; c < b.length; c++)
            if (b[a].className == "hiderBox") {
                var d = b[a].firstChild.firstChild,
                    e = b[a].lastChild;
                if (trim(e.innerHTML) == "") {
                    e = this.frameDoc.createElement("DIV");
                    e.innerHTML = "\ufeff"
                }
                d = this.createHider(d, e, true);
                b[a].parentNode.replaceChild(d, b[a])
            } else a++
    },
    htmlDivHeaderReplace: function() {
        for (var a = this.frameDoc.getElementsByTagName("DIV"), b = a.length, c = null, d = 0, e = 0; e < b; e++) {
            switch (a[d].className) {
                case "wikiHeader":
                    c = "H1";
                    break;
                case "wikiSubHeader":
                    c = "H2";
                    break;
                case "wikiSubSubHeader":
                    c = "H3";
                    break;
                default:
                    c = null
            }
            if (c) {
                c = this.frameDoc.createElement(c);
                c.innerHTML = a[d].innerHTML;
                a[d].parentNode.replaceChild(c, a[d])
            } else d++
        }
    }
};