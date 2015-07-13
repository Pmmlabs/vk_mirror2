/* ***************************
         Global Methods
  *************************** */
Function.prototype.extBind = function() {
  var func = this, args = arguments;
  return function() {
    var argsArray = [];
    each(args, function(i, obj) { argsArray[i] = obj; });
    var obj = argsArray.shift(), currArgs = [];
    each(arguments, function(i, obj) { currArgs[i] = obj; });
    return func.apply(obj, currArgs.concat(argsArray));
  }
}
function editorChoosePhoto(userID, photoID, photoSmallURL, photoURL) {
  var img = vkImage(), photoID = userID + '_' + photoID;
  var photoObj = { photoID: photoID, photoSmallURL: photoSmallURL, photoURL: photoURL };
  addEvent(img, 'load', function() {
    photoObj.width = img.width;
    photoObj.height = img.height;
    window[window.editorName].insertPhoto(window[window.editorName].photoElemID, photoObj);
  });
  img.src = photoURL;
  return false;
}
function editorChooseVideo(thumb, title, duration, videoID) {
  window[window.editorName].insertVideo(videoID, thumb, title, duration);
  return false;
}
function editorChooseAudio(performer, title, duration, audioID) {
  window[window.editorName].insertAudio(audioID, performer, title, duration);
}
function pbSetClass(elem, newClass) {
  elem.className = newClass;
}

//new instead of bind - temp
function editorUseLinkChange(elem) {
  if (!hasClass(elem, 'disabled')) {
    window[window.editorName].useLinkChange();
  }
}

function editorTestPhotoSetupError(elem, val) {
  if (!hasClass(elem, 'disabled')) {
    window[window.editorName].testPhotoSetupError(val);
  }
}
/* ***************************
      Class ToolBarButton
  *************************** */
function ToolBarButton(editor, buttonObj) {
  this.name = 'ToolBarButton';
  this.down = false;

  this.div = document.createElement('A');
  this.div.className = 'editor_button';
  this.div.setAttribute('href', 'javascript:;');
  this.div.style.backgroundPosition = buttonObj.x + 'px ' + buttonObj.y + 'px';

  this.mouseup = null;
  var self = this;
  addEvent(this.div, 'mouseover', function() { editor.showTooltip(self.div, buttonObj.tooltip, 0); });
  addEvent(this.div, 'mouseout', function() { editor.hideTooltip(); });
  addEvent(this.div, 'mouseup', this.mouseUpEvent.extBind(this));

  if (buttonObj.disabled) {
    this.div.className = 'editor_button disabled';
    this.disabled = true;
  }
  this.canSelect = (buttonObj.canSelect == undefined) ? true : false;
  addEvent(this.div, 'mouseover', this.mouseover.bind(this));
  addEvent(this.div, 'mouseout', this.mouseout.bind(this));
}
ToolBarButton.prototype = {
  mouseUpEvent: function(e) { if (this.mouseup && !this.disabled) this.mouseup(); },
  mouseover: function() { if (!this.disabled) this.div.className = 'editor_button_over' },
  mouseout: function() { if (!this.disabled && !this.down) this.div.className = 'editor_button' },
  select: function() { if (!this.disabled && ((this.canSelect == undefined) || this.canSelect)) { this.down = true; this.div.className = 'editor_button_over' }; },
  unselect: function() { if (!this.disabled) { this.down = false; this.div.className = 'editor_button' }; },
  enable: function() { this.disabled = false; removeClass(this.div, 'disabled'); },
  disable: function() { this.disabled = true; this.div.className = 'editor_button disabled'; }
}
/* ***************************
         Class ToolBar
  *************************** */
function ToolBar(editor, mode, params) {
  this.div = document.createElement('DIV');
  this.div.className = 'editor_toolbar';
  this.editor = editor;
  var editorToggle = ge('editor_toggle');
  if (mode == 'simple') {
    if (params && params.simpleToolBar) {
      this.toolbarButtons = params.simpleToolBar;
    } else {
      this.toolbarButtons = 'bold,italic,gray,underline,strike,sub,sup,left,center,right,marker_list,numeric_list,outdent,indent,h1,h2,h3,image,link,unlink';
    }
  } else if (mode == 'extended') {
    if (params && params.extendedToolBar) {
      this.toolbarButtons = params.extendedToolBar;
    } else {
      this.toolbarButtons = 'bold,italic,gray,underline,strike,sub,sup,left,center,right,marker_list,numeric_list,outdent,indent,h1,h2,h3,image,link,unlink,break,';
      this.toolbarButtons += 'table,table_delete,insert_row_before,insert_row_after,insert_col_before,insert_col_after,delete_row,delete_col,col_width,citate,character,video,audio';
      this.toolbarButtons += ',time,signature,category,hider,wiki';
    }
    if (editor.debug) this.toolbarButtons += ',debug';
  }
  var toolbarButtonsArray = this.toolbarButtons.split(',');
  this.buttons = {
    bold: { x: 0, y: 0, tooltip: cur.lang.wiki_bold },
    italic: { x: -20, y: 0, tooltip: cur.lang.wiki_italic },
    underline: { x: -40, y: 0, tooltip: cur.lang.wiki_underline },
    gray: { x: -21, y: -39, tooltip: cur.lang.wiki_gray },
    strike: { x: -60, y: 0, tooltip: cur.lang.wiki_strike },
    sub: { x: -80, y: 0, tooltip: cur.lang.wiki_subscript },
    sup: { x: -100, y: 0, tooltip: cur.lang.wiki_superscript },
    left: { x: -120, y: 0, tooltip: cur.lang.wiki_align_left },
    center: { x: -140, y: 0, tooltip: cur.lang.wiki_align_center },
    right: { x: -40, y: -40, tooltip: cur.lang.wiki_align_right },
    marker_list: { x: -160, y: 0, tooltip: cur.lang.wiki_marker_list },
    numeric_list: { x: -180, y: 0, tooltip: cur.lang.wiki_numeric_list },
    outdent: { x: -200, y: 0, tooltip: cur.lang.wiki_outdent, canSelect: false, disabled: true },
    indent: { x: -220, y: 0, tooltip: cur.lang.wiki_indent, canSelect: false, disabled: true },
    h1: { x: -240, y: 0, tooltip: cur.lang.wiki_add_header },
    h2: { x: -260, y: 0, tooltip: cur.lang.wiki_add_sub_header },
    h3: { x: -280, y: 0, tooltip: cur.lang.wiki_add_sub_sub_header },

    table: { x: 0, y: -20, tooltip: cur.lang.wiki_add_table },
    table_delete: { x: -20, y: -20, tooltip: cur.lang.wiki_delete_table, canSelect: false, disabled: true },
    insert_row_before: { x: -40, y: -20, tooltip: cur.lang.wiki_insert_row_before, canSelect: false, disabled: true },
    insert_row_after: { x: -60, y: -20, tooltip: cur.lang.wiki_insert_row_after, canSelect: false, disabled: true },
    insert_col_before: { x: -80, y: -20, tooltip: cur.lang.wiki_insert_col_before, canSelect: false, disabled: true },
    insert_col_after: { x: -100, y: -20, tooltip: cur.lang.wiki_insert_col_after, canSelect: false, disabled: true },
    delete_row: { x: -120, y: -20, tooltip: cur.lang.wiki_delete_row, disabled: true },
    delete_col: { x: -140, y: -20, tooltip: cur.lang.wiki_delete_col, disabled: true },
    col_width: { x: -160, y: -39, tooltip: cur.lang.wiki_col_width, disabled: true },
    link: { x: -160, y: -20, tooltip: cur.lang.wiki_add_link },
    unlink: { x: -180, y: -20, tooltip: cur.lang.wiki_delete_link, canSelect: false, disabled: true },
    citate: { x: -200, y: -20, tooltip: cur.lang.wiki_add_citate },
    character: { x: -220, y: -20, tooltip: cur.lang.wiki_insert_char },
    image: { x: -240, y: -20, tooltip: cur.lang.wiki_add_photo },
    video: { x: -260, y: -20, tooltip: cur.lang.wiki_add_video },
    audio: { x: -280, y: -20, tooltip: cur.lang.wiki_add_audio },

    doc: { x: -180, y: -40, tooltip: cur.lang.wiki_add_doc },
    time: { x: -60, y: -40, tooltip: cur.lang.wiki_insert_time },
    hider: { x: -80, y: -40, tooltip: cur.lang.wiki_insert_hider },
    signature: { x: -140, y: -40, tooltip: cur.lang.wiki_insert_signature },
    category: { x: 0, y: -40, tooltip: cur.lang.wiki_category_sub_category, canSelect: false },
    wiki: { x: -100, y: -40, tooltip: cur.lang.wiki_markup },
    pre: { x: -120, y: -40, tooltip: cur.lang.wiki_pre }
  }
  var a = document.createElement('A');
  a.id = 'wysiwyg_mode';
  a.href = 'javascript:void(0);';
  if (mode == 'simple') {
    a.innerHTML = '<div class="editor_switch_mode"></div>';
    var text = cur.lang.wiki_notes_extended_mode;
  } else {
    a.innerHTML = '<div class="editor_switch_mode editor_switch_mode_back"></div>';
    var text = cur.lang.wiki_notes_simple_mode;
  }
  addEvent(a, 'mouseover', function() { editor.showTooltip(a, text, 0); });
  addEvent(a, 'mouseout', function() { editor.hideTooltip(); });
  this.div.appendChild(a);
  addEvent(a, 'click', function() {
    editor.hideTooltip();
    editor.toggleWysiwygMode();
  });

  var buttonName = null;
  for (var i = 0; i < toolbarButtonsArray.length; i++) {
    buttonName = toolbarButtonsArray[i];
    this.addButton(buttonName);
  }
}
ToolBar.prototype.addButton = function(buttonName) {
  if (buttonName == 'break') {
    var br = document.createElement('BR');
    br.setAttribute('clear', 'all');
    this.div.appendChild(br);
  }
  else if (this.buttons[buttonName].show == undefined) {
    this[buttonName] = new ToolBarButton(this.editor, this.buttons[buttonName]);
    this.div.appendChild(this[buttonName].div);
  }
}
ToolBar.prototype.addAction = function(buttonName, func) {
  if (this[buttonName] != undefined) this[buttonName].mouseup = func;
}
var newUploadedBox = null;
/* ***************************
        Class WikiEditor
  *************************** */
function Wysiwyg(params) {
  this.params = params;
  this.debug = false;
  this.currRange = null;
  this.baseURI = 'http://' + document.domain;
  this.nodeList = new Object();
  this.createContainer(params.replaceElemID);
  this.getEditorMode();
  this.createToolbar(params);
  this.createIFrame(this.width, this.height);
  this.createIFrameCut(this.width, this.height);
  var self = this;
  var afterIFrameInit = function() {
  if (!this.iFrameComplete || !this.iFrameCutComplete) {
    setTimeout(function() {afterIFrameInit.call(self)}, 10);
  } else {
  this.createTextArea(this.width, this.height);
  this.createLockLayer();
  this.createResizeBar(this.width);
  this.createTooltip();
  this.timer = null;
  this.vk = 'http://vkontakte.ru/';
  this.vkcom = 'http://vk.com/';
  this.showErrorTime = 600;

  this.choosePhotoBox = new MessageBox({ width: 610, progress: 'choose_photo_progress', bodyStyle: 'height: 412px; padding: 0px;' });
  var chooseLink = '<div class="pb_link" onclick="window[window.editorName].togglePhotoSetup();" onmouseover="pbSetClass(this, \'pb_link_over\')" onmouseout="pbSetClass(this, \'pb_link\')">' + cur.lang.wiki_select_photo_by_url +
'</div>';
  this.choosePhotoBox.setControlsText(chooseLink);
  this.choosePhotoBox.addButton({onClick: function() { this.choosePhotoBox.hide(); this.photoBox.boxShow = false; this.photoElemID = null; }.bind(this), label: cur.lang.box_close });
  window.choosePhotoBox = this.choosePhotoBox;

  this.photoBox = new MessageBox({ title: cur.lang.wiki_adding_photo, width: 515, bodyStyle: 'padding: 0px; height: 258px;' });
  this.photoPreviewSize = 200;
  this.photoQuestion = '/images/question_g.gif';
  this.images = new Array();

  this.chooseVideoBox = new MessageBox({ title: cur.lang.wiki_adding_video, width: 610, progress: 'choose_video_progress', bodyStyle: 'height: 412px; padding: 0px;' });
  this.chooseVideoBox.removeButtons();
  this.chooseVideoBox.addButton({ onClick: function() { this.chooseVideoBox.hide(); }.bind(this), label: cur.lang.box_close });
  window.chooseVideoBox = this.chooseVideoBox;

  var onHideAudio = function() {
    //TODO STOP PLAY HERE
    /*if (AudioObject.curAudio && AudioObject.curAudio.substr(0, 6) == 'Choose') {
      AudioObject.hidePlayer(AudioObject.curAudio, false, true);
      AudioObject.curAudio = null;
    }*/
  };
  this.chooseAudioBox = new MessageBox({ title: cur.lang.wiki_adding_audio, width: 610, progress: 'choose_audio_progress', bodyStyle: 'height: 412px; padding: 0px;', onHide: onHideAudio });
  this.chooseAudioBox.removeButtons();
  this.chooseAudioBox.addButton({ onClick: function() { this.chooseAudioBox.hide(); }.bind(this), label: cur.lang.box_close });
  window.chooseAudioBox = this.chooseAudioBox;

  this.charBox = new MessageBox({ title: cur.lang.wiki_inserting_char, width: 340, bodyStyle: 'padding: 0px;' });
  this.charBox.removeButtons();
  this.charBox.addButton({ onClick: function() { this.charBox.hide(); }.bind(this), label: cur.lang.box_close });

  this.categoryBox = new MessageBox({ title: cur.lang.wiki_page_cat_and_sub_cat, width: 350, bodyStyle: 'padding: 0px;' });
  this.categoryBox.removeButtons();
  this.categoryBox.addButton({onClick: function() { this.categoryBox.hide(); }.bind(this), style: 'button_no', label: cur.lang.box_cancel });
  this.categoryBox.addButton({onClick: function() { this.changeCategory(); }.bind(this), label: cur.lang.wiki_edit });
  this.categoryBox.wiki = '';

  //TODO REFACTOR
  //this.tableBox = new MessageBox({ title: cur.lang.wiki_adding_table, width: 465, bodyStyle: 'padding: 0px; height: 196px;' });
  //this.linkBox = new MessageBox({ width: 440, bodyStyle: 'padding: 0px' });

  this.contentWiki = params.wiki;

  if (this.contentHTML != '') this.HtmlToHtml(this.contentHTML, this.contentWiki);
  window.wysiwyg = true;
  } //end of timeout if
  }; //end of timeout function
  setTimeout(function() {afterIFrameInit.call(self)}, 10);
}
Wysiwyg.prototype = {
  createContainer: function(elemID) {
    this.replaceElem = ge(elemID);
    this.contentHTML = this.params.html;
    this.width = this.params.width || this.replaceElem.offsetWidth - 2;
    this.height = this.params.height;
    this.cont = document.createElement('DIV');
    if (this.params.layer) {
      this.cont.className = 'editor_cont editor_layer';
    } else {
      this.cont.className = 'editor_cont';
    }
    this.cont.style.width = this.params.toolWidth + 'px';
    this.replaceElem.parentNode.insertBefore(this.cont, this.replaceElem);
    if (!this.debug) {
      hide(this.replaceElem);
    }
  },
  frameInit: function(iPrefix, iClass, id, width, height, appendComplete) {
    var self = this;
    var frameName = 'frame' + iPrefix;
    var frm = ce('iframe');
    cur['initWysiwygDone' + iPrefix] = function() {
      self['frameWin' + iPrefix] = self.getFrameWin(frm);
      self['frameDoc' + iPrefix] = self.getFrameDoc(frm);
      self[frameName] = frm;
      setTimeout(appendComplete.pbind(self), 0);
    };

    frm.setAttribute('marginWidth', '0');
    frm.setAttribute('marginHeight', '0');
    frm.setAttribute('frameBorder', '0');
    if (self.params.layer) {
      frm.setAttribute('scrolling', 'no');
    }
    frm.className = iClass;
    frm.id = id;
    frm.src = '/al_notesWysiwyg.php?pref=' + encodeURIComponent(iPrefix);
    frm.width = width + 'px';
    frm.height = height + 'px';
    this.cont.appendChild(frm);
  },
  registerHotkeys: function(iPrefix) {
    var self = this;
    var frm = this["frame" + iPrefix];
    if (browser.mozilla || browser.msie) {
      addEvent(frm.contentWindow.document, "keydown", function (e) {
        if (e.ctrlKey && e.keyCode == 66) { // b
          self.actSimple.call(self, "bold", "Bold", false);
          return false;
        }
        if (e.ctrlKey && e.keyCode == 73) { // i
          self.actSimple.call(self, "italic", "Italic", false);
          return false;
        }
        if (e.ctrlKey && e.keyCode == 85) { // u
          self.actSimple.call(self, "underline", "Underline", false);
          return false;
        }
      });
    }
  },
  createIFrame: function(width, height) {
    this.frameInit('', 'wysiwyg', 'wysiwyg', width, height, this.createIFrameAfterInit);
  },
  fixDomain: function(self) {
    try { // ie9 buggy fix %)
      if (/opera/i.test(_ua) || !/msie 6/i.test(_ua) || self.frameDoc.domain != locDomain) {
        self.frameDoc.domain = locDomain;
      }
    } catch (e) {}
  },

  adjustHeight: function(self) {
    setTimeout(self.doAdjustHeight.pbind(self), 0);
  },

  doAdjustHeight: function(self) {
    if (!self.frameDoc || !self.frameDoc.body) {
      clearInterval(self.heightInterval);
    }
    var size = getSize(self.frameDoc.body);
    var h = Math.max(size[1], 400);
    if (self.oldFrameHeight != h) {
      self.oldFrameHeight = h;
      self.frame.height = h + 'px';
      self.params.onHeightChange && self.params.onHeightChange();
    }
  },

  createIFrameAfterInit: function(self) {
    self.frameDoc.designMode = 'On';
    self.fixDomain(self); // fucking ie9
    self.writeFrameContent(self.frameDoc);
    self.fixDomain(self); // fucking ie8
    self.setDocOptions();
    self.init();
    if (self.params.layer) {
      addEvent(self.frameWin, 'DOMSubtreeModified', self.adjustHeight.pbind(self));
      self.heightInterval = setInterval(self.doAdjustHeight.pbind(self), 200);
      cur.destroy.push(function() {
        clearInterval(self.heightInterval);
      });
      setStyle(self.frameDoc.body, {
        overflow: 'hidden'
      });
    }
    //self.registerHotkeys(""); // TEMP OFF DUE TO IE8
    self.iFrameComplete = true;
  },
  createIFrameCut: function(width, height) {
    this.frameInit('Cut', 'wysiwyg_cut', '', width, height, this.createIFrameCutAfterInit);
  },
  createIFrameCutAfterInit: function(self) {
    self.writeFrameContent(self.frameDocCut);
    self.iFrameCutComplete = true;
  },
  createTextArea: function(width, height) {
    this.textarea = document.createElement('TEXTAREA');
    this.textarea.style.width = width - 3 + 'px';
    this.areaHeightOffset = 2;
    if (browser.mozilla) {
      this.areaHeightOffset = 1;
    }
    this.textarea.style.height = height + this.areaHeightOffset + 'px';
    this.textarea.className = 'wiki';
    this.cont.appendChild(this.textarea);
  },
  resizeEditor: function(e, inFrame, self) {
    if (inFrame) {
      var y = e.pageY;
    } else {
      var y = e.pageY - self.frameTop;
    }
    if ((y > 200) && (y < 500)) {
      if (this.wikiMode) {
        self.textarea.style.height = y + 'px';
      } else {
        self.frame.style.height = y + 'px';
      }
    }
    self.removeSelection();
  },
  createResizeBar: function(width) {
    this.resizeBar = document.createElement('DIV');
    this.resizeBar.className = 'editor_resize';
    this.resizeBar.style.width = width + 'px';
    this.resizeBar.style.height = '0px';//TEMP FOR NOT JUMPING WHILE LOAD (AFTER IE FIX)
    this.resizeBar.ondragstart = function() { return false; };
    var self = this;
    addEvent(this.resizeBar, 'mousedown', function(e) {
      if (this.wikiMode) {
        this.frameTop = getXY(this.textarea)[1];
      } else {
        this.frameTop = getXY(this.frame)[1];
      }
      this.isResize = true;
      document.body.style.cursor = 'n-resize';
      this.frameDoc.body.style.cursor = 'n-resize';
      show(this.lock);
      document.body.style.overflowX = 'hidden';
      document.ondragstart = function() { return false; };
    }.bind(this));
    document.onmouseup = this.resizeStop.bind(this);
    addEvent(document, 'mouseup', this.resizeStop.bind(this));
    this.frameDoc.onmouseup = this.resizeStop.bind(this);
    addEvent(this.frameDoc, 'mouseup', this.resizeStop.bind(this));
    addEvent(document, 'mousemove', function(e) { if (self.isResize) self.resizeEditor(e, false, self); });
    addEvent(this.frameDoc, 'mousemove', function(e) { if (self.isResize) self.resizeEditor(e, true, self); });
    this.cont.parentNode.insertBefore(this.resizeBar, this.cont.nextSibling);
  },
  removeSelection: function() {
    try {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (document.selection && document.selection.empty) {
        document.selection.empty();
      }
    } catch (e) { };
  },
  createLockLayer: function() {
    var div = document.createElement('DIV'), b = document.body;
    div.id = 'lock';
    div.style.width = b.clientWidth + 'px';
    div.style.height = b.clientHeight + 'px';
    b.appendChild(div);
    this.lock = div;
  },
  resizeStop: function() {
    if (this.isResize) {
      this.isResize = false;
      document.body.style.cursor = 'auto';
      this.frameDoc.body.style.cursor = 'auto';
      hide(this.lock);
      document.ondragstart = null;
      document.body.style.overflowX = 'auto';
      this.setDocOptions();
      if (this.wikiMode) {
        this.frame.style.height = parseInt(this.textarea.style.height) + -this.areaHeightOffset + 'px';
      } else {
        this.textarea.style.height = parseInt(this.frame.style.height) + this.areaHeightOffset + 'px';
      }
    }
  },
  createTooltip: function() {
    var div = document.createElement('DIV'), divContent = '';
    div.id = 'tooltip';
    divContent += '<div class="tooltip_top"></div>'
    divContent += '<div class="tooltip_line1"></div>';
    divContent += '<div class="tooltip_line2"></div>';
    divContent += '<div class="tooltip_bottom"></div>';
    div.innerHTML = divContent;
    ge('page_wrap').appendChild(div);
    //ge('pageContainer').appendChild(div);
    //document.body.appendChild(div);
  },
  showTooltip: function(obj, text, direction) {
    text = text.replace(/ /g, '&nbsp;');
    var tooltip = ge('tooltip');
    var coords = getXY(obj);
    if (!tooltip) {
      return;
    }
    tooltip.childNodes[0].innerHTML = text;
    tooltip_text = text;
    tooltip.style.left = (coords[0]) + 'px';
    tooltip.style.top = (coords[1] - 27) + 'px';

    if (browser.msie) {
      tooltip.style.display = 'block';
    } else {
      fadeTo(tooltip, 200, 1);
    }
    var w = tooltip.offsetWidth;
    if (direction) {
      tooltip.style.left = (coords[0] - w + 21) + 'px';
    }
  },
  hideTooltip: function() {
    var tooltip = ge('tooltip');
    if (!tooltip) {
      return;
    }
    hide(tooltip);
  },
  getEditorMode: function() {
    var wysiwygMode = getCookie('wysiwyg');
    this.editorMode = this.params.defaultMode;
    if (wysiwygMode == '1') {
      this.editorMode = 'extended';
    }
  },
  toggleWysiwygMode: function() {
    if (this.editorMode == 'simple') {
      this.editorMode = 'extended';
    } else {
      this.editorMode = 'simple';
    }
    var wysiwygMode = getCookie('wysiwyg');
    if ((wysiwygMode != '1') && (this.editorMode == 'extended')) {
      setCookie('wysiwyg', '1', 365);
    } else if ((wysiwygMode != '0') && (this.editorMode == 'simple')) {
      setCookie('wysiwyg', '0', 365);
    }
    var newToolbar = new ToolBar(this, this.editorMode, this.params);
    var currToolbar = this.toolbar.div;
    if (currToolbar) {
      this.cont.replaceChild(newToolbar.div, currToolbar);
      this.toolbar = newToolbar;
      if (this.params.layer) {
        WkView.updateShadow();
      }
    }
    this.addButtonsActions();
  },
  getFrameWin: function(frame) {
    return frame.window ? frame.window : frame.contentWindow;
  },
  getFrameDoc: function(frame) {
    return frame.contentDocument ? frame.contentDocument : this.getFrameWin(frame).document;
  },
  writeFrameContent: function(frameDoc) {
    frameDoc.open();

    if (this.params.layer) {
      var bodyClass = 'editor_body editor_body_layer';
    } else {
      var bodyClass = 'editor_body';
    }

    var frameHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru"><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1251" /><link rel="stylesheet" href="' + this.params.contentCSS + '" type="text/css" /><base href="http://' + locDomain + '/" /><script type="text/javascript">var _ua = navigator.userAgent;var locDomain = \'' + locDomain + '\';if (/opera/i.test(_ua) || !/msie 6/i.test(_ua) || document.domain != locDomain) {document.domain = locDomain;}</script></head><body spellcheck="false" class="'+bodyClass+'"><p>\uFEFF</p></body></html>';
    frameDoc.write(frameHTML);
    frameDoc.close();
  },
  addButtonsActions: function() {
    var defaultAction = [
      ['bold', 'Bold', false], ['italic', 'Italic', false],['underline', 'Underline', false],
      ['strike', 'StrikeThrough', false], ['sup', 'Superscript', false], ['sub', 'Subscript', false],
      ['marker_list', 'InsertUnorderedList', true], ['numeric_list', 'InsertOrderedList', true],
      ['undo', 'Undo', false], ['redo', 'Redo', false]
    ];
    var self = this, t = this.toolbar;
    each(defaultAction, function(i, obj) { self.defaultAction(obj[0], obj[1], obj[2]) });
    t.addAction('clear', this.actClear.bind(this));
    t.addAction('outdent', this.actOutdent.bind(this));
    t.addAction('indent', this.actIndent.bind(this));
    t.addAction('h1', this.actHeader.extBind(this, 'h1'));
    t.addAction('h2', this.actHeader.extBind(this, 'h2'));
    t.addAction('h3', this.actHeader.extBind(this, 'h3'));
    t.addAction('image', this.choosePhoto.bind(this));
    t.addAction('video', this.chooseVideo.bind(this));
    t.addAction('audio', this.chooseAudio.bind(this));
    t.addAction('doc', this.chooseDoc.bind(this));
    t.addAction('link', this.actLink.bind(this));
    t.addAction('unlink', this.actUnLink.bind(this));
    t.addAction('character', this.actChar.bind(this));
    t.addAction('table', this.actTable.bind(this));
    t.addAction('table_delete', this.actTableDelete.bind(this));
    t.addAction('insert_row_before', this.actTableActions.extBind(this, 'insert_row_before'));
    t.addAction('insert_row_after', this.actTableActions.extBind(this, 'insert_row_after'));
    t.addAction('insert_col_before', this.actTableActions.extBind(this, 'insert_col_before'));
    t.addAction('insert_col_after', this.actTableActions.extBind(this, 'insert_col_after'));
    t.addAction('delete_row', this.actTableActions.extBind(this, 'delete_row'));
    t.addAction('delete_col', this.actTableActions.extBind(this, 'delete_col'));
    t.addAction('col_width', this.actTableActions.extBind(this, 'col_width'));
    t.addAction('hider', this.actHider.bind(this));
    t.addAction('citate', this.actCitate.bind(this));
    t.addAction('category', this.actCategory.bind(this));
    t.addAction('time', this.actTime.bind(this));
    t.addAction('signature', this.actSignature.bind(this));
    t.addAction('debug', this.convertToWiki.bind(this));
    t.addAction('wiki', this.actToggleWiki.bind(this));
    t.addAction('pre', this.actPre.bind(this));
    t.addAction('left', this.actLeft.bind(this));
    t.addAction('center', this.actCenter.bind(this));
    t.addAction('right', this.actRight.bind(this));
    t.addAction('gray', this.actGray.bind(this));
  },
  actLeft: function() {
    var cont = this.getRangeContainer();
    if (cont.parentNode) {
      if (this.testCenter(cont.parentNode) || this.testRight(cont.parentNode)) {
        var node = cont.parentNode;
        if (node.align == 'center' || node.align == 'right') {
          node.align = 'left';
          node.style.textAlign = '';
        } else if (node.style.textAlign == 'center' || node.style.textAlign == 'right') {
          node.style.textAlign = 'left';
          node.align = '';
        }
      }
    }
    this.frameDoc.execCommand('JustifyLeft', false, true);
    this.getFormat();
  },
  actCenter: function() {
    var cont = this.getRangeContainer();
    if (cont.parentNode) {
      if (this.testLeft(cont.parentNode) || this.testRight(cont.parentNode)) {
        var node = cont.parentNode;
        if (node.align == 'left' || node.align == 'right') {
          node.align = 'center';
          node.style.textAlign = '';
        } else if (node.style.textAlign == 'left' || node.style.textAlign == 'right') {
          node.style.textAlign = 'center';
          node.align = '';
        }
      }
    }
    this.frameDoc.execCommand('JustifyCenter', false, true);
    this.getFormat();
  },
  actRight: function() {
    var cont = this.getRangeContainer();
    if (cont.parentNode) {
      if (this.testLeft(cont.parentNode) || this.testCenter(cont.parentNode)) {
        var node = cont.parentNode;
        if (node.align == 'left' || node.align == 'center') {
          node.align = 'right';
          node.style.textAlign = '';
        } else if (node.style.textAlign == 'left' || node.style.textAlign == 'center') {
          node.style.textAlign = 'right';
          node.align = '';
        }
      }
    }
    this.frameDoc.execCommand('JustifyRight', false, true);
    this.getFormat();
  },
  actGray: function() {
    var container = this.getRangeContainer();
    var range = this.getRange();

    if (range.startContainer == range.endContainer && range.startOffset == range.endOffset && range.startOffset == 0) {
      return; // Or maybe we just need to switch the entire node color
    }

    var colorInBlack = this.testAllGrayInSelection();
    var noInnerNodes = this.testSelectionContainerIsText();
    var selectedAll = this.testSelectedAll();
    if (colorInBlack) {
      // If selected all - remove the span, if part - cut into several spans and black text node
      if (selectedAll) {
        //Remove parent span
        var spanNode = container.parentNode;
        spanNode.parentNode.replaceChild(container, spanNode);
      } else {
        //Cut in several spans
        var leftOffset = range.startOffset;
        var rightOffset = range.endOffset;
        var textLength = container.data.length;
        var spanNode = container.parentNode;
        spanNode.parentNode.replaceChild(container, spanNode);

        var cutLength = 0;
        if (leftOffset > 0) {
          var span = this.frameDoc.createElement('SPAN');
          span.style.color = '#777';
          span.innerHTML = container.data.substring(0, leftOffset);
          container.data = container.data.substring(leftOffset, container.data.length);
          container.parentNode.insertBefore(span, container);
          cutLength = leftOffset;
        }

        if (rightOffset < textLength) {
          var span = this.frameDoc.createElement('SPAN');
          span.style.color = '#777';
          span.innerHTML = container.data.substring(rightOffset - cutLength, container.data.length);
          container.data = container.data.substring(0, rightOffset - cutLength);
          this.insertAfter(container.parentNode, span, container);
        }
      }
    } else if (range.startContainer == range.endContainer) { //Inside black text node and just wrap inner body
      var leftOffset = range.startOffset;
      var rightOffset = range.endOffset;
      var textLength = container.data.length;

      var span = this.frameDoc.createElement('SPAN');
      span.style.color = '#777';
      span.innerHTML = container.data.substring(leftOffset, rightOffset);

      if (selectedAll) {
        container.parentNode.replaceChild(span, container);
      } else {
        var cutLength = 0;
        if (leftOffset > 0) {
          var leftTextNode = this.frameDoc.createTextNode(container.data.substring(0, leftOffset));
          container.parentNode.insertBefore(leftTextNode, container);
        }
        container.parentNode.insertBefore(span, container);
        if (rightOffset < textLength) {
          var rightTextNode = this.frameDoc.createTextNode(container.data.substring(rightOffset, container.data.length));
          container.parentNode.insertBefore(rightTextNode, container);
        }
        container.parentNode.removeChild(container);
      }

      //Now we need to glue neighbours together in one node
      if (leftOffset == 0 && span.previousSibling && this.testGray(span.previousSibling)) {
        span.innerHTML = span.previousSibling.innerHTML + span.innerHTML;
        span.previousSibling.parentNode.removeChild(span.previousSibling);
      }
      if (rightOffset == textLength && span.nextSibling && this.testGray(span.nextSibling)) {
        span.innerHTML += span.nextSibling.innerHTML;
        span.nextSibling.parentNode.removeChild(span.nextSibling);
      }
    } else {
      //Remove all first level span nodes within selection. Wrap with global span node for all of them.
      //If start or end text is black - wrap start/end selection offsets in span.
      //Remove all spans (including start/end) and wrap with global.
      //If start with 0 and left node is also gray - join them, the same for right.

      //var textSelectionHitRight = range.startContainer == range.endContainer && range.endOffset == range.endContainer.data.length; //Means we are inside black text node and selection hits right end

      var startNode = null;
      if (range.startOffset == 0 && range.startContainer.previousSibling && this.testGray(range.startContainer.previousSibling)) { //Join, so we start with left neighbour
        startNode = range.startContainer.previousSibling;
      } else if (range.startContainer.parentNode.nodeName == 'SPAN' && this.testGray(range.startContainer.parentNode)) { //We are gray, start with us
        startNode = range.startContainer.parentNode;
      } else { //We are black, wrap us with gray (possibly - part of us), and start with wrapped
        var span = this.frameDoc.createElement('SPAN');
        span.style.color = '#777';
        span.innerHTML = range.startContainer.data.substring(range.startOffset, range.startContainer.data.length);
        range.startContainer.data = range.startContainer.data.substring(0, range.startOffset);
        this.insertAfter(range.startContainer.parentNode, span, range.startContainer);
        startNode = span;
      }

      var endNode = null;
      if (range.endOffset == range.endContainer.data.length && range.endContainer.nextSibling && this.testGray(range.endContainer.nextSibling)) { //Join, so we end with right neighbour
        endNode = range.endContainer.nextSibling;
      } else if (range.endContainer.parentNode.nodeName == 'SPAN' && this.testGray(range.endContainer.parentNode)) { //We are gray, end with us
        endNode = range.endContainer.parentNode;
      } else { //We are black, wrap us with gray (possibly - part of us), and end with wrapped
        var span = this.frameDoc.createElement('SPAN');
        span.style.color = '#777';
        span.innerHTML = range.endContainer.data.substring(0, range.endOffset);
        range.endContainer.data = range.endContainer.data.substring(range.endOffset, range.endContainer.data.length);
        range.endContainer.parentNode.insertBefore(span, range.endContainer);
        endNode = span;
      }

      //Remove all spans within startNode and endNode, and wrap with global parent span
      var text = "";
      var currentNode = startNode;
      while (currentNode != endNode) {
        var nextSibling = currentNode.nextSibling;
        if (currentNode.firstChild) { //This is (gray) span
          text += currentNode.firstChild.data;
          currentNode.parentNode.removeChild(currentNode);
        } else { //This is black text
          text += currentNode.data;
          currentNode.parentNode.removeChild(currentNode);
        }
        currentNode = nextSibling;
      }
      text += endNode.innerHTML;
      var span = this.frameDoc.createElement('SPAN');
      span.style.color = '#777';
      span.innerHTML = text;
      endNode.parentNode.replaceChild(span, endNode);
    }
    this.getRange().collapse(true);
    this.getFormat();
  },
  testSelectedAll: function() {
    var range = this.getRange();
    return range.startOffset == 0 && range.endOffset == range.endContainer.data.length;
  },
  testSelectionContainerIsText: function() {
    var commonContainer = this.getRangeContainer();
    return commonContainer.nodeType == 3;
  },
  testAllGrayInSelection: function() {
    var commonContainer = this.getRangeContainer();
    if (commonContainer.nodeType == 3) {
      commonContainer = commonContainer.parentNode;
    }

    //We assume that there is always one level of span gray, so the nearest ancestor is the only node to test.
    return commonContainer.nodeName == 'SPAN' && this.testGray(commonContainer);
  },
  insertAfter: function(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling);
  },
  recursiveCallback: function(node, callback) {
    var childs = node.childNodes;
    callback.call(this, node);
    for (var i = 0; i < childs.length; i++) {
      this.recursiveCallback(childs[i], callback);
    }
  },
  actClear: function() {
    var clearDoc = function() {
      this.resetAll();
      this.setContent('');
      this.frameWin.focus();
    }
    this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_really_delete_all, cur.lang.box_yes, cur.lang.box_cancel, clearDoc.bind(this), null);
  },
  actToggleWiki: function() {
    if (this.timer != null) {
      return false;
    }
    if (this.toolbar.wiki.down) {
      this.toolbar.wiki.unselect();
      this.wikiMode = false;
    } else {
      this.toolbar.wiki.select();
      this.wikiMode = true;
    }
    toggleWysiwygWiki();
    this.timer = setTimeout(function() { this.timer = null; }.bind(this), 1000);
  },
  createToolbar: function(params) {
    this.toolbar = new ToolBar(this, this.editorMode, params);
    this.addButtonsActions();
    this.cont.appendChild(this.toolbar.div);
  },
  defaultAction: function(elemName, actName, updateFormat) {
    var self = this;
    this.toolbar.addAction(elemName, function() { self.actSimple.call(self, elemName, actName, updateFormat) });
  },
  getPrevElem: function(elem) {
    var curr = elem;
    while (curr = curr.previousSibling) {
      var status = (curr.nodeType == 3) && (trim(curr.nodeValue) == '');
      if (!status) break;
    }
    return curr;
  },
  getNextElem: function(elem) {
    var curr = elem;
    while (curr = curr.nextSibling) {
      var status = (curr.nodeType == 3) && (trim(curr.nodeValue) == '');
      if (!status) break;
    }
    return curr;
  },
  setFocusBeforeAfter: function(elem, before) {
    var nearElem = null;
    if (before) {
      nearElem = this.getPrevElem(elem);
    } else {
      nearElem = this.getNextElem(elem);
    }
    if ((nearElem == null) || (nearElem.nodeName == 'TABLE') || (nearElem.nodeName == 'BLOCKQUOTE')) {
      var p = this.frameDoc.createElement('P');
      p.innerHTML = '\uFEFF';
      if (before) elem.parentNode.insertBefore(p, elem);
      else if (nearElem != null) elem.parentNode.insertBefore(p, nearElem);
      else elem.parentNode.appendChild(p);
      this.setElemFocus(p);
      this.getFormat();
    } else if (nearElem != null) {
      this.setElemFocus(nearElem);
    }
  },
  actOutdent: function() {
    this.frameWin.focus();
    var elem = this.getParentElement('TABLE', 'BLOCKQUOTE');
    if (elem != null) {
      this.setFocusBeforeAfter(elem, true);
    } else {
      this.frameDoc.execCommand('Outdent', false, false);
    }
    this.getFormat();
  },
  actIndent: function() {
    this.frameWin.focus();
    var elem = this.getParentElement('TABLE', 'BLOCKQUOTE');
    if (elem != null) {
      this.setFocusBeforeAfter(elem, false);
    } else {
      this.frameDoc.execCommand('Indent', false, false);
    }
    this.getFormat();
  },
  getElemsInSelection: function() {
    var range = this.getRange(), elems = new Array();
    if (range.startContainer != range.endContainer) {
      var common = this.getCommonParent(range.startContainer, range.endContainer);
      var prev = common.commonPrev, next = common.commonNext, curr = prev;
      if ((prev.nodeName != 'BODY') && (next.nodeName != 'BODY')) {
        while (curr != next) {
          elems.push(curr);
          curr = curr.nextSibling;
        }
        elems.push(curr);
      }
    } else {
      elems.push(range.startContainer);
    }
    return elems;
  },
  testSelectionCenter: function() {
    var elems = this.getElemsInSelection(), elemsCenters = true;
    if (elems.length > 1) {
      each(elems, function(i, obj) {
        if (!this.testCenter(obj)) {
          elemsCenters = false;
        }
      }.bind(this));
    } else {
      var elem = this.getRange().startContainer, center = false;
      while (elem.nodeName != 'BODY') {
        if ((elem.nodeType != 3) && this.testCenter(elem)) {
          center = true;
          break;
        }
        elem = elem.parentNode;
      }
      elemsCenters = center;
    }
    return elemsCenters;
  },
  testSelectionRight: function() {
    var elems = this.getElemsInSelection(), elemsRights = true;
    if (elems.length > 1) {
      each(elems, function(i, obj) {
        if (!this.testRight(obj)) {
          elemsRights = false;
        }
      }.bind(this));
    } else {
      var elem = this.getRange().startContainer, right = false;
      while (elem.nodeName != 'BODY') {
        if ((elem.nodeType != 3) && this.testRight(elem)) {
          right = true;
          break;
        }
        elem = elem.parentNode;
      }
      elemsRights = right;
    }
    return elemsRights;
  },
  setDocOptions: function() {
    var doc = this.frameDoc;
    try {
      doc.execCommand('StyleWithCSS', false, true);
      doc.execCommand('useCSS', false, true);
      doc.execCommand('MultipleSelection', false, false);
      doc.execCommand('EnableInlineTableEditing', false, false);
      doc.execCommand('EnableObjectResizing', false, false);
      doc.execCommand('RespectVisibilityInDesign', true, null);
      doc.execCommand('BackgroundImageCache', false, true);
      //doc.execCommand('InsertBrOnReturn', false, false);
    } catch (e) { }
  },
  actSimple: function(elemName, actName, updateFormat) {
    if (this.toolbar[elemName].down) this.toolbar[elemName].unselect();
    else this.toolbar[elemName].select();
    this.frameWin.focus();
    this.frameDoc.execCommand(actName, false, true);
    if (updateFormat) this.getFormat();
  },
  clearEmptyTags: function(tag) {
    var tagsArray = this.frameDoc.getElementsByTagName(tag);
    var tagsLength = tagsArray.length, index = 0;
    for (var i = 0; i < tagsLength; i++) {
      var text = trim(this.getInnerText(tagsArray[index]));
      if ((text == '') || (text == '\uFEFF')) {
        var p = this.frameDoc.createElement('P');
        p.innerHTML = '<br>';
        tagsArray[index].parentNode.replaceChild(p, tagsArray[index]);
      } else {
        index++;
      }
    }
  },
  getInnerText: function(elem) {
    if (elem.innerText != undefined) {
      return (elem.innerText || '').replace(/(<|>)/g, '');
    } else {
      if (elem.textContent != undefined) {
        return elem.textContent;
      } else return null;
    }
  },
  setInnerText: function(elem, value) {
    if (elem.innerText != undefined) {
      elem.innerText = value;
    } else if (elem.textContent != undefined) {
      elem.textContent = value;
    }
  },
  setElemFocus: function(elem, pos) {
    if (pos == undefined) pos = false;
    if (this.frameWin.getSelection) {
      var sel = this.frameWin.getSelection();
      var rng = this.frameDoc.createRange();
      sel.removeAllRanges();
      rng.selectNodeContents(elem);
      rng.collapse(pos);
      sel.addRange(rng);
    } else {
      var rng = this.frameDoc.body.createTextRange();
      if (elem.nodeType != 3) {
        try {
          rng.moveToElementText(elem);
          rng.collapse(pos);
          rng.select();
        } catch (error) { }
      }
    }
    this.getFormat();
  },
  getFormat: function() {
    var range = this.getRange();
    var node = this.getRangeContainer();
    if (node == null) return false;
    var nodeList = new Object();
    var actionList = new Object();
    this.nodeList = nodeList;
    while (node.nodeName != 'BODY') {
      if (nodeList[node.nodeName] == undefined) {
        nodeList[node.nodeName] = new Object();
        nodeList[node.nodeName].classes = new Object();
        nodeList[node.nodeName].styles = new Array();
        nodeList[node.nodeName].nodes = new Array();
      }
      var className = (node.className == '') ? 'none' : node.className;
      nodeList[node.nodeName].classes[className] = true;
      nodeList[node.nodeName].styles.push(node.style);
      nodeList[node.nodeName].nodes.push(node);
      node = node.parentNode;
    }
    var hasProp = function(propArray, propName, propValue, getAttribute) {
      for (var i = 0; i < propArray.length; i++) {
        if (propArray[i][propName] == propValue) return true;
        if (getAttribute && (propArray[i].getAttribute(propName) == propValue)) return true;
      }
      return false;
    }
    var setAllow = function(objName, status) {
      if (arguments.length == 2) {
        if (!arguments[1]) {
          actionList[arguments[0]] = arguments[1];
        } else if (actionList[arguments[0]] !== false) {
          actionList[arguments[0]] = arguments[1];
        }
      } else {
        for (var i = 0; i < (arguments.length - 1); i++) {
          setAllow(arguments[i], arguments[arguments.length - 1]);
        }
      }
    }
    if (nodeList['CAPTION']) {
      setAllow('TABLE', 'INDENT', 'OUTDENT', 'ONLY_CAPTION', true);
      setAllow('TABLE_ACTIONS', false);
    }
    if (nodeList['TABLE'] && (nodeList['TABLE'].classes['hider'] || nodeList['TABLE'].classes['hiderOpened'])) {
      setAllow('HIDER', 'DISABLE_HEADERS', true);
      if (!(nodeList['TABLE'] && (nodeList['TABLE'].classes['none']))) setAllow('TABLE_ACTIONS', 'TABLE', false);
    }
    if (nodeList['TD'] && nodeList['TD'].classes['hiderHeader']) {
      setAllow('ONLY_HIDER_HEADER', true);
      setAllow('TABLE_ACTIONS', 'TABLE', false);
    }
    if (nodeList['SPAN'] && nodeList['SPAN'].classes['signature']) {
      setAllow('SIGNATURE', 'ONLY_SIGNATURE', true);
      setAllow('LINK', false);
    }
    if (nodeList['TD'] && nodeList['TABLE'].classes['pre']) {
      setAllow('ONLY_PRE', 'PRE', 'INDENT', 'OUTDENT', true);
      setAllow('TABLE_ACTIONS', 'TABLE', false);
    }
    if (nodeList['TABLE'] && (nodeList['TABLE'].classes['wikiAudio'] || nodeList['TABLE'].classes['wk_audio'])) {
      setAllow('TABLE', 'TABLE_ACTIONS', false);
      setAllow('ONLY_AUDIO', 'AUDIO', true);
    }
    if (nodeList['BLOCKQUOTE']) setAllow('CITATE', 'INDENT', 'OUTDENT', 'DISABLE_HEADERS', true);
    if (nodeList['B'] || nodeList['STRONG']) setAllow('BOLD', true);
    if (nodeList['I'] || nodeList['EM']) setAllow('ITALIC', true);
    if (nodeList['U']) setAllow('UNDERLINE', true);
    if (nodeList['H1']) setAllow('H1', 'ONLY_HEADERS', true);
    if (nodeList['H2']) setAllow('H2', 'ONLY_HEADERS', true);
    if (nodeList['H3']) setAllow('H3', 'ONLY_HEADERS', true);
    if (nodeList['STRIKE'] || nodeList['S']) setAllow('STRIKE', true);
    if (nodeList['SUB']) setAllow('SUB', true);
    if (nodeList['SUP']) setAllow('SUP', true);
    if (nodeList['UL']) setAllow('MARKER_LIST', 'DISABLE_HEADERS', true);
    if (nodeList['OL']) setAllow('NUMERIC_LIST', 'DISABLE_HEADERS', true);
    if (nodeList['A'] && (!nodeList['A'].classes['wikiPhoto'] && !nodeList['A'].classes['wk_photo'] && !nodeList['A'].classes['wk_photo_no_border'])) setAllow('LINK', true);
    if (nodeList['SPAN'] && hasProp(nodeList['SPAN'].styles, 'textDecoration', 'underline')) setAllow('UNDERLINE', true);
    if (nodeList['SPAN'] && hasProp(nodeList['SPAN'].styles, 'textDecoration', 'line-through')) setAllow('STRIKE', true);
    //if (nodeList['SPAN'] && (hasProp(nodeList['SPAN'].styles, 'color', '#777') || hasProp(nodeList['SPAN'].styles, 'color', 'rgb(119, 119, 119)'))) setAllow('GRAY', true);//??? Not quite sure we need this
    if (nodeList['DIV'] && (hasProp(nodeList['DIV'].nodes, 'align', 'center') || hasProp(nodeList['DIV'].styles, 'textAlign', 'center'))) setAllow('CENTER', true);
    if (nodeList['DIV'] && (hasProp(nodeList['DIV'].nodes, 'align', 'right') || hasProp(nodeList['DIV'].styles, 'textAlign', 'right'))) setAllow('RIGHT', true);
    if (nodeList['P'] && (hasProp(nodeList['P'].nodes, 'align', 'center') || hasProp(nodeList['P'].styles, 'textAlign', 'center'))) setAllow('CENTER', 'DISABLE_MARKERS', 'DISABLE_HEADERS', true);
    if (nodeList['P'] && (hasProp(nodeList['P'].nodes, 'align', 'right') || hasProp(nodeList['P'].styles, 'textAlign', 'right'))) setAllow('RIGHT', 'DISABLE_MARKERS', 'DISABLE_HEADERS', true);
    if (nodeList['TD'] && (hasProp(nodeList['TD'].nodes, 'align', 'center') || hasProp(nodeList['TD'].styles, 'textAlign', 'center'))) setAllow('CENTER', true);
    if (nodeList['TD'] && (hasProp(nodeList['TD'].nodes, 'align', 'right') || hasProp(nodeList['TD'].styles, 'textAlign', 'right'))) setAllow('RIGHT', true);
    if (nodeList['TH'] && (hasProp(nodeList['TH'].nodes, 'align', 'center') || hasProp(nodeList['TH'].styles, 'textAlign', 'center'))) setAllow('CENTER', true);
    if (nodeList['TH'] && (hasProp(nodeList['TH'].nodes, 'align', 'right') || hasProp(nodeList['TH'].styles, 'textAlign', 'right'))) setAllow('RIGHT', true);
    if (nodeList['TD'] || nodeList['TH']) setAllow('TABLE', 'INDENT', 'OUTDENT', 'TABLE_ACTIONS', 'DISABLE_HEADERS', true);
    if (nodeList['LI']) {
      var position = this.testLiPosition();
      if (nodeList['UL'] && position.outdent) {
        setAllow('DISABLE_NUMERIC_LIST', true);
      }
      if (nodeList['OL'] && position.outdent) {
        setAllow('DISABLE_MARKER_LIST', true);
      }
      if (position.indent) setAllow('INDENT', true);
      if (position.outdent) setAllow('OUTDENT', true);
      setAllow('DISABLE_MEDIA', 'DISABLE_CENTER', 'DISABLE_RIGHT', true);
    }
    this.resetAll();
    if (actionList['INDENT']) this.toolbar.indent.enable();
    if (actionList['OUTDENT']) this.toolbar.outdent.enable();
    if (actionList['ONLY_CAPTION']) this.enableOnly('clear', 'table', 'indent', 'outdent', 'bold', 'italic', 'sub', 'sup', 'underline', 'gray', 'strike', 'category', 'wiki');
    if (actionList['ONLY_HIDER']) this.enableOnly('clear', 'indent', 'outdent', 'italic', 'sub', 'sup', 'underline', 'gray', 'strike', 'category', 'hider', 'wiki');
    if (actionList['ONLY_HIDER_HEADER']) this.enableOnly('clear', 'indent', 'outdent', 'category', 'hider', 'wiki');
    if (actionList['ONLY_HEADERS']) this.enableOnly('clear', 'h1', 'h2', 'h3', 'category', 'wiki');
    if (actionList['ONLY_PRE']) this.enableOnly('clear', 'indent', 'outdent', 'pre', 'category', 'wiki');
    if (actionList['ONLY_AUDIO']) this.enableOnly('clear', 'indent', 'outdent', 'category', 'wiki', 'audio');
    if (actionList['DISABLE_HEADERS']) this.disableToolBar('h1', 'h2', 'h3');
    if (actionList['DISABLE_MARKERS']) this.disableToolBar('marker_list', 'numeric_list');
    if (actionList['DISABLE_MEDIA']) this.disableToolBar('image', 'video', 'audio', 'hider', 'blockquote');
    if (actionList['ONLY_SIGNATURE']) this.enableOnly('clear', 'citate', 'center', 'right', 'h1', 'h2', 'h3', 'marker_list', 'numeric_list', 'category', 'hider', 'wiki');
    if (actionList['DISABLE_CENTER']) this.toolbar.center.disable();
    if (actionList['DISABLE_RIGHT']) this.toolbar.right.disable();
    if (actionList['DISABLE_NUMERIC_LIST']) this.toolbar.numeric_list.disable();
    if (actionList['DISABLE_MARKER_LIST']) this.toolbar.marker_list.disable();
    if (actionList['TABLE_ACTIONS']) this.allowTableActions(true);
    if (actionList['LINK']) {
      this.toolbar.unlink.enable();
    }
    if (!actionList['CENTER'] && !actionList['RIGHT']) setAllow('LEFT', true);
    this.selectToolBarButtons(actionList);
    this.testLastChild();
  },
  unSelectAll: function() {
    for (key in this.toolbar.buttons) {
      if (this.toolbar[key]) {
        this.toolbar[key].unselect();
      }
    }
  },
  resetAll: function() {
    this.unSelectAll();
    for (key in this.toolbar.buttons) {
      if (this.toolbar.buttons[key].disabled) {
        if (this.toolbar[key]) {
          this.toolbar[key].disable();
        }
      } else {
        if (this.toolbar[key]) {
          this.toolbar[key].enable();
        }
      }
    }
  },
  selectToolBarButtons: function(buttons) {
     for (key in buttons) {
      var toolBarButton = this.toolbar[key.toLowerCase()];
      if (toolBarButton && buttons[key]) toolBarButton.select();
    }
  },
  tableArrowTest: function(e) {
    if (this.nodeList['TABLE'] && this.inArray(e.keyCode, [KEY.LEFT, KEY.RIGHT, KEY.UP, KEY.DOWN])) {
      var table = this.getParentElement('TABLE');
      if ((table.className == '') || (table.className == 'wikTable') || (table.className == 'wk_table')) {
        var td = this.getParentElement('TD'), row = td.parentNode, cellIndex = td.cellIndex, rowIndex = row.rowIndex, focusTD = null, focusRowUp = null, focusRowDown = null;
        if (td.innerHTML == '\uFEFF') {
          if (rowIndex != 0) {
            focusRowUp = table.rows[rowIndex - 1]
          }
          if (rowIndex != (table.rows.length - 1)) {
            focusRowDown = table.rows[rowIndex + 1];
          }
          switch (e.keyCode) {
            case KEY.LEFT:
              if (cellIndex != 0) {
                focusTD = row.cells[cellIndex - 1];
              } else if (focusRowUp) {
                focusTD = focusRowUp.cells[focusRowUp.cells.length - 1];
              }
              break;
            case KEY.RIGHT:
              if (cellIndex != (row.cells.length - 1)) {
                focusTD = row.cells[cellIndex + 1];
              } else if (focusRowDown) {
                focusTD = focusRowDown.cells[0];
              }
              break;
            case KEY.UP:
              if (focusRowUp) {
                focusTD = focusRowUp.cells[cellIndex];
              }
              break;
            case KEY.DOWN:
              if (focusRowDown) {
                focusTD = focusRowDown.cells[cellIndex];
              }
              break;
          }
          if (focusTD) {
            this.setElemFocus(focusTD);
            return true;
          }
        }
      }
    }
  },
  keyUpFilter: function(e) {
    var allowed = [KEY.LEFT, KEY.RIGHT, KEY.DOWN, KEY.UP, KEY.PAGEUP, KEY.PAGEDOWN, KEY.HOME, KEY.END, KEY.ENTER, KEY.DELETE, KEY.BACKSPACE];
    if (e.ctrlKey) {
      this.getFormat();
      return cancelEvent(e);
    }
    for (var i = 0; i < allowed.length; i++) {
      if (e.keyCode == allowed[i]) {
        if ((e.keyCode == KEY.DELETE) || (e.keyCode == KEY.BACKSPACE)) {
          this.testLastChild();
          if (this.selectedElem) {
            try { this.selectedElem.parentNode.removeChild(this.selectedElem); }
            catch (e) { }
          }
          setTimeout((function() {
            if (this.nodeList['DIV']) {
              var topNode = this.nodeList['DIV']
              for (var i in this.nodeList['DIV'].nodes) {
                var n = this.nodeList['DIV'].nodes[i];
                if (n.className == 'wk_doc') {
                  this.setFocusBeforeAfter(n);
                  n.parentNode.removeChild(n);
                }
              }
            }
          }).bind(this), 0);
        }
        this.getFormat();
        return null;
      }
    }
    if (browser.mozilla) this.formatText(e);
  },
  keyDownFilter: function(e) {
    var rem = false, back = true;
    range = this.getRange();
    if (!range) {
      return true;
    }
    back = (e.keyCode == KEY.BACKSPACE || e.keyCode == KEY.LEFT);
    var cont = (back ? range.startContainer : range.endContainer);
    if (cont) {
      if (e.keyCode == KEY.DELETE || e.keyCode == KEY.BACKSPACE) {
        rem = true;
      }
      if (!rem && back && cont.previousSibling && cont.previousSibling.className == 'wk_doc') {
        this.setFocusBeforeAfter(cont.previousSibling, back);
        return cancelEvent(e);
      } else if (!rem && !back && cont.nextSibling && cont.nextSibling.className == 'wk_doc') {
        this.setFocusBeforeAfter(cont.nextSibling, back);
        return cancelEvent(e);
      }
      while(cont && cont.parentNode) {
        if (cont.className == 'wk_doc') {
          this.setFocusBeforeAfter(cont, back);
          if (rem) {
            cont.parentNode.removeChild(cont);
          }
          return cancelEvent(e);
        }
        cont = cont.parentNode;
      }
    }
  },
  actionCancel: function() {
    if (this.nodeList['TABLE'] && (this.nodeList['TABLE'].classes['wikiAudio'] || this.nodeList['TABLE'].classes['wk_audio'])) return true;
  },
  testLastChild: function() {
    var lastChild = this.frameDoc.body.lastChild;
    if (lastChild) {
      if ((lastChild.nodeName != 'P') || (lastChild.innerHTML != '\uFEFF')) {
        var p = this.frameDoc.createElement('P');
        p.innerHTML = '\uFEFF';
        this.frameDoc.body.appendChild(p);
      }
    }
  },
  init: function() {
    this.cont.ondragstart = function() { return false; };
    this.frameDoc.ondragstart = function() { return false; };
    this.frameDoc.oncontrolselect = function() { return false; };
    this.frameDoc.onresizestart = function () { return false; };
    addEvent(this.frameDoc, 'resizestart', function() { return false; });
    addEvent(this.frameDoc, 'dragstart', function() { return false; });
    addEvent(this.frameDoc, 'click', function(ev) {
      if (ev.target.nodeName == 'BLOCKQUOTE' && ev.clientX && ev.clientX < 12) {
        this.setFocusBeforeAfter(ev.target, true);
      }
      if (this.selectedElem) {
        this.selectElement(this.selectedElem);
      }
    }.bind(this));
    addEvent(this.frameDoc, 'mouseup', function() { this.getFormat(); this.resizeStop(); }.bind(this));

    KEY.HOME = 36, KEY.END = 35, KEY.ENTER = 13, KEY.DELETE = 46, KEY.BACKSPACE = 8;

    var self = this, keyEvent = 'keydown';
    if (browser.opera) {
      keyEvent = 'keypress';
    }
    addEvent(this.frameDoc, keyEvent, function(e) {
      self.changed = true;
      if (self.params.onChange) {
        self.params.onChange();
      }
      self.linkFix.call(self, e);
      if (self.headerFix.call(self, e)) {
        return cancelEvent(e);
      }

      if (browser.chrome && self.nodeList['CAPTION'] && (e.keyCode == KEY.ENTER) && !e.shiftKey) {
        return cancelEvent(e);
      }
      if (self.nodeList['SPAN'] && self.nodeList['SPAN'].classes['signature']) {
        if (!self.inArray(e.keyCode, [KEY.LEFT, KEY.RIGHT, KEY.UP, KEY.DOWN, KEY.HOME, KEY.END])) {
          return cancelEvent(e);
        }
      }
      if (browser.opera && self.actionCancel.call(self)) {
        return cancelEvent(e);
      }
      if (self.tableArrowTest(e)) {
        return cancelEvent(e);
      }
    });
    addEvent(this.frameDoc, 'keyup', this.keyUpFilter.bind(this));
    addEvent(this.frameDoc, 'keydown', this.keyDownFilter.bind(this));
  },
  formatText: function() {
    var cont = this.getRangeContainer();
    if (cont.nodeName == 'BODY') {
      this.frameDoc.execCommand('FormatBlock', false, '<P>');
    }
  },
  setContent: function(html) {
    var bodyElem = this.frameDoc.body;
    if (!bodyElem) bodyElem = this.frameDoc;
    bodyElem.innerHTML = html ? html : '<p><br></p>';
  },
  removeElemArray: function(array, elem) {
    var len = array.length, index = 0;
    for (var i = 0; i < len; i++) {
      if (array[index] == elem) {
        array.splice(index, 1);
        break;
      } else {
        index++;
      }
    }
  },
  selectElement: function(elem) {
    if (hasClass(elem, 'selected')) {
      removeClass(elem, 'selected');
      this.selectedElem = null;
    } else {
      if (this.selectedElem) {
        this.selectElement(this.selectedElem);
      }
      this.selectedElem = elem;
      addClass(elem, 'selected');
    }
  },
  decURI: function(url) {
    var result = null;
    try { result = decodeURIComponent(url) }
    catch (error) { result = url; }
    return result;
  },
  encURI: function(url) {
    var result = null;
    try { result = encodeURIComponent(url) }
    catch (error) { result = url }
    return result;
  },
  insertParagraph: function(elem, pos) {
    var p = this.frameDoc.createElement('P');
    p.innerHTML = '<br>';
    if (pos == 'before') {
      elem.parentNode.insertBefore(p, elem);
    } else {
      if (elem.nextSibling) {
        elem.parentNode.insertBefore(p, elem.nextSibling);
      } else {
        elem.parentNode.appendChild(p);
      }
    }
    return p;
  },
  getElemOffsets: function(elem) {
    var startOffset = false, endOffset = false;
    if (browser.msie) {
      var rangeCurrent = this.frameDoc.selection.createRange();
      var rangeBegin = rangeCurrent.duplicate();
      var rangeEnd = rangeCurrent.duplicate();
      rangeBegin.moveToElementText(elem), rangeEnd.moveToElementText(elem);
      rangeBegin.collapse(true), rangeEnd.collapse(false);
      var newRange = this.frameDoc.body.createTextRange();
      newRange.setEndPoint('StartToStart', rangeBegin);
      newRange.setEndPoint('EndToEnd', rangeCurrent);
      startOffset = newRange.text.length;
      newRange.setEndPoint('StartToStart', rangeCurrent);
      newRange.setEndPoint('EndToEnd', rangeEnd);
      endOffset = newRange.text.length;
    } else {
      var rangeCurrent = this.getRange();
      var rangeCopy = rangeCurrent.cloneRange();
      rangeCopy.setStartBefore(rangeCopy.commonAncestorContainer);
      startOffset = rangeCopy.toString().length;
      rangeCopy = rangeCurrent.cloneRange();
      rangeCopy.setEndAfter(rangeCopy.commonAncestorContainer);
      endOffset = rangeCopy.toString().length;
    }
    startOffset = (startOffset == 0) ? true : false;
    endOffset = (endOffset == 0) ? true : false;
    return { startOffset: startOffset, endOffset: endOffset };
  },
  getRange: function() {
    if (this.frameWin.getSelection) {
      var sel = this.frameWin.getSelection();
      if (sel.rangeCount != 0) {
        return sel.getRangeAt(0);
      } else {
        this.frameDoc.createRange();
      }
    } else {
      if (this.frameDoc.selection) {
        return this.frameDoc.selection.createRange();
      }
    }
    return null;
  },
  getRangeContainer: function() {
    var range = this.getRange();
    if (range != null) {
      if (range.commonAncestorContainer) {
        return range.commonAncestorContainer;
      } else {
        if (range.parentElement) {
          return range.parentElement();
        }
      }
    }
    return null;
  },
  testLiPosition: function() {
    var result = new Object();
    var liNode = this.nodeList['LI'].nodes[0];
    var nextNode = liNode.nextSibling;
    var listNode = liNode.parentNode;
    if (listNode.firstChild != liNode) {
      result.indent = true;
    }
    var subList = listNode.getElementsByTagName(listNode.nodeName);
    if (this.nodeList[listNode.nodeName] && (this.nodeList[listNode.nodeName].nodes.length > 1) && ((subList.length == 0) || (nextNode.nodeName == 'LI'))) {
      result.outdent = true;
    }
    return result;
  },
  enableToolBar: function() {
    for (var i = 0; i < arguments.length; i++) {
      if (this.toolbar[arguments[i]]) this.toolbar[arguments[i]].enable();
    }
  },
  disableToolBar: function() {
    for (var i = 0; i < arguments.length; i++) {
      if (this.toolbar[arguments[i]]) this.toolbar[arguments[i]].unselect();
      if (this.toolbar[arguments[i]]) this.toolbar[arguments[i]].disable();
    }
  },
  enableOnly: function() {
    for (key in this.toolbar.buttons) {
      if (this.inArray(key, arguments)) {
        if (this.toolbar[key]) this.toolbar[key].enable();
      } else {
        if (this.toolbar[key]) this.toolbar[key].disable();
      }
    }
  },
  getParentElement: function(/*...*/) {
    this.frameWin.focus();
    var whileStop = false, range = this.getRange(), parent = this.getRangeContainer();
    while ((parent.nodeName != 'BODY') && !whileStop) {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i].toUpperCase() == parent.nodeName.toUpperCase()) {
          whileStop = true;
          break;
        }
      }
      if (!whileStop) {
        parent = parent.parentNode;
      }
    }
    if (parent.nodeName == 'BODY') {
      parent = null;
    }
    return parent;
  },
  inArray: function(value, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) return true;
    }
    return false;
  },
  setInputFocusEnd: function(input) {
    if (browser.msie) {
      if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(false);
        range.select();
      }
    } else {
      var end = input.value.length;
      input.setSelectionRange(end, end);
      input.focus();
    }
  },
  getNodeFrag: function(node) {
    var frag = this.frameDoc.createDocumentFragment();
    if (node.childNodes.length == 0) {
      frag.appendChild(node);
    } else {
      while (node.childNodes.length != 0) {
        frag.appendChild(node.childNodes[0]);
      }
    }
    return frag;
  },
  setObjOptions: function(obj, options) {
    for (key in options) {
      var func = options[key][options[key].length - 1];
      for (var i = 0; i < options[key].length - 1; i++) {
        var val = (i == 0) ? true : false;
        for (var j = 0; j < options[key][i].length; j++) {
          var opt = options[key][i];
          if (func) {
            try {
              obj[opt[j]][key](val);
            } catch (e) {
              //TODO HANDLE
            }
          } else {
            obj[opt[j]][key] = val;
          }
        }
      }
    }
  },
  unFocusIE: function() {
    if (browser.msie) {
      this.frameDoc.selection.empty();
    }
  },
  insertNodeFunc: function(node, range) {
    this.frameWin.focus();
    if (browser.msie) {
      var div = this.frameDoc.createElement('DIV');
      div.appendChild(node);
      range.pasteHTML(div.innerHTML);
    } else {
      range.insertNode(node);
      var space = this.frameDoc.createTextNode('\uFEFF');
      if (node.nextSibling) {
        node.parentNode.insertBefore(space, node.nextSibling);
      }
    }
  },
  alertBox: function (title, content, okButton, cancelButton, okCallback, cancelCallback) {
    var alertBox = showFastBox(title, content);
    alertBox.removeButtons();
    if (cancelButton) {
      alertBox.addButton(cancelButton, function() { alertBox.hide(); if (cancelCallback) cancelCallback(); }, 'gray');
    }
    if (okButton) {
      alertBox.addButton(okButton, function() { alertBox.hide(); if (okCallback) okCallback(); });
    }
  },
  extendObj: function(obj, propArray) {
    for (var i = 0; i < propArray.length; i++) {
      if (obj[propArray[i]] == undefined) {
        obj[propArray[i]] = ge(propArray[i]);
      }
    }
  },
  getCommonParent: function(prev, next) {
    var prevTemp = prev, nextTemp = next, prevParentArray = new Array(), nextParentArray = new Array();
    while (prevTemp.nodeName != 'BODY') {
      prevParentArray.push(prevTemp);
      if (prevTemp.parentNode.nodeName == 'BODY') break;
      prevTemp = prevTemp.parentNode;
    }
    while (nextTemp.nodeName != 'BODY') {
      nextParentArray.push(nextTemp);
      if (nextTemp.parentNode.nodeName == 'BODY') break;
      nextTemp = nextTemp.parentNode;
    }
    var commonParent = null;
    for (var i = 0; i < prevParentArray.length; i++) {
      for (var j = 0; j < nextParentArray.length; j++) {
        if (nextParentArray[j] == prevParentArray[i]) {
          prevTemp = nextParentArray[j];
          nextTemp = nextParentArray[j];
          commonParent = prevTemp.parentNode;
          break;
        }
      }
      if (commonParent != null) break;
    }
    if (commonParent == null) {
      commonParent = this.frameDoc.body;
    }
    var resultObj = { commonParent: commonParent, commonPrev: prevTemp, commonNext: nextTemp };
    return resultObj;
  },
  actPre: function() {
    var self = this;
    if (this.nodeList['TABLE'] && this.nodeList['TABLE'].classes['pre']) {
      var preDeleteFunc = function() {
        var nodes = self.nodeList['TABLE'].nodes;
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].className == 'pre') {
            var div = self.frameDoc.createElement('DIV');
            var content = nodes[i].rows[0].cells[0].innerHTML;
            div.innerHTML = content;
            nodes[i].parentNode.replaceChild(div, nodes[i]);
            break;
          }
        }
      }
      this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_warning_delete_pre, global_delete, cur.lang.box_cancel, preDeleteFunc, null);
    } else {
      this.frameWin.focus();
      var range = this.getRange();

      var preTable = '<table class="pre"><tr><td>\uFEFF</td></tr></table>';
      var div = this.frameDoc.createElement('DIV');
      div.innerHTML = preTable;
      var tableNode = div.firstChild;

      if (browser.msie) range.pasteHTML(preTable);
      else range.insertNode(tableNode);
      this.setElemFocus(tableNode.rows[0].cells[0]);
    }
  },
  /* ***************************
        Category Methods
  *************************** */
  actCategory: function() {
    var box = this.categoryBox;
    if (box.loaded == undefined) {
      box.setOptions({ onLoad: function() { box.loaded = true; this.actCategory(); }.bind(this) });
      box.loadContent('wiki.php', { act: 'category_box' }, false);
      return null;
    }
    if (box.init == undefined) {
      this.extendObj(box, ['cb_text', 'cb_sub_text', 'cb_error']);
      if (this.categoryTitle) {
        box.cb_text.value = this.categoryTitle;
      }
      if (this.subCategoryTitle) {
        box.cb_sub_text.value = this.subCategoryTitle;
      }
      box.init = true;
    }
    hide(box.cb_error);
    fadeTo(box.cb_error, 1, 0, null);
    box.show();
  },
  changeCategory: function() {
    var box = this.categoryBox, error = '', regExp = new RegExp('[!@$%^&~\|]+', 'i');
    var catText = box.cb_text.value, subText = box.cb_sub_text.value, catError = box.cb_error;
    if ((catText != '') && regExp.test(catText)) {
      error = cur.lang.wiki_err_cat_forbidden_chars;
    } else if ((subText != '') && regExp.test(subText)) {
      error = cur.lang.wiki_err_sub_cat_forbidden_chars;
    } else if ((catText == '') && (subText != '')) {
      error = cur.lang.wiki_err_sub_cat_without_cat;
    }
    if (error != '')
    {
      show(catError);
      catError.innerHTML = error;
      fadeTo(catError, this.showErrorTime, 1, null);
      return false;
    }
    if (catText != '') box.wiki = '[[category:' + catText + ']]';
    if (subText != '') box.wiki += '[[subcategory:' + subText + ']]';
    box.hide();
  },
  /* ***************************
         Hider Methods
  *************************** */
  actHider: function() {
    this.frameWin.focus();
    var range = this.getRange();
    var self = this;
    var hiderBox = new MessageBox({ title: cur.lang.wiki_info });
    hiderBox.removeButtons();
    var hiderDeleteFunc = function() {
      hiderBox.hide();
      var nodes = this.nodeList['TABLE'].nodes;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].className.indexOf('hider') != -1) {
          var div = this.frameDoc.createElement('DIV');
          var hiderBody = nodes[i].rows[1].cells[0];
          div.appendChild(this.getNodeFrag(hiderBody));
          nodes[i].parentNode.replaceChild(div, nodes[i]);
          break;
        }
      }
    }
    var hiderInsertFunc = function() {
      hiderBox.hide();
      var nodeCont = this.surround('DIV', range);
      var hider = this.createHider(this.frameDoc.createTextNode(cur.lang.wiki_hider_title), nodeCont, true);
      nodeCont.parentNode.replaceChild(hider, nodeCont);
      var hiderBody = hider.rows[1].cells[0];
      if (hiderBody.lastChild) {
        this.setElemFocus(hiderBody.lastChild);
      }
    }
    if (this.nodeList['TD'] && this.nodeList['TD'].classes['hiderBody']) {
      hiderBox.addButton(cur.lang.box_cancel, function() { hiderBox.hide(); }, 'no');
      hiderBox.addButton(global_delete, hiderDeleteFunc.bind(this), 'yes');
      hiderBox.addButton(global_add, hiderInsertFunc.bind(this), 'yes');
      hiderBox.content(cur.lang.wiki_warning_add_new_hider_or_del);
      hiderBox.show();
    } else if (this.nodeList['TABLE'] && (this.nodeList['TABLE'].classes['hider'] || this.nodeList['TABLE'].classes['hiderOpened'])) {
      this.alertBox(cur.lang.wiki_info, cur.lang.wiki_warning_delete_hider, global_delete, cur.lang.box_close, hiderDeleteFunc.bind(this), null);
    } else {
      hiderInsertFunc.call(this);
    }
  },
  createHider: function(headerNode, bodyNode, opened) {
    var self = this;
    var hider = '', hiderClass = 'hider', tableStyle = '';
    if (opened) {
      hiderClass = 'hiderOpened';
    }
    if (browser.msie && !browser.msie8) {
      tableStyle = 'style="width: 95%; margin: 0px 0px 5px 0px;"';
    }
    hider += '<table class="' + hiderClass + '"' + tableStyle + '>';
    hider += '<tr><td class="hiderArrow"><div></div></td><td class="hiderHeader"></td></tr>';
    hider += '<tr class="hiderBodyRow"><td class="hiderBody" colspan="2"></td></tr>';
    hider += '</table>';
    var div = this.frameDoc.createElement('DIV');
    div.innerHTML = hider;
    var hiderNode = div.firstChild;
    var hiderArrow = hiderNode.rows[0].cells[0];
    var hiderHeader = hiderNode.rows[0].cells[1];
    var hiderBody = hiderNode.rows[1].cells[0];
    hiderHeader.appendChild(this.getNodeFrag(headerNode));
    hiderBody.appendChild(this.getNodeFrag(bodyNode));
    addEvent(hiderArrow, 'click', function() { this.switchHider(hiderArrow) }.bind(this));

    return hiderNode;
  },
  switchHider: function(elem) {
    var tableElem = elem.parentNode.parentNode.parentNode;
    var arrowTD = tableElem.rows[1].cells[0];
    if (tableElem.className == 'hider') {
      tableElem.className = 'hiderOpened';
      if (browser.msie) arrowTD.style.display = 'block';
      else arrowTD.style.display = 'table-cell';
    } else {
      tableElem.className = 'hider';
      arrowTD.style.display = 'none';
    }
  },
  /* ***************************
         Video Methods
  *************************** */
  chooseVideo: function() {
    this.chooseVideoBox = showBox('video.php', {act: 'a_choose_video_box', al_wiki_editor: true, scrollbar_width: window.sbWidth()});
    this.frameWin.focus();
    this.currRange = this.getRange();
    this.unFocusIE();

    /*var box = this.chooseVideoBox;
    box.show();
    if (box.loaded == undefined) {
      box.setOptions({ onLoad: function() { box.loaded = true; this.chooseVideo(); }.bind(this) });
      box.loadContent('video.php', { act: 'a_choose_video_box', scrollbar_width: window.sbWidth() }, true, 'height: 412px');
      return null;
    }
    this.frameWin.focus();
    this.currRange = this.getRange();
    this.unFocusIE();*/
  },
  createVideoObj: function(videoID, thumb, title) {
    var img = this.frameDoc.createElement('IMG');
    img.className = 'wk_video';
    img.style.backgroundImage = 'url("' + thumb.replace('.130.', '.160.') + '")';

    var playImg = this.baseURI + '/images/play_video.png?3';
    if (browser.msie6) {
      img.src = this.baseURI + '/images/px.gif';
      img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + playImg + '", sizingMethod="scale")';
    } else {
      img.src = playImg;
    }

    img.alt = title, img.title = title;
    img.setAttribute('wiki', videoID);
    addEvent(img, 'click', function() { showVideo(videoID.replace('video', '')); });
    addEvent(img, 'mouseover', function() { addClass(img, 'hover'); });
    addEvent(img, 'mouseout', function() { removeClass(img, 'hover'); })
    return img;
  },
  insertVideo: function(videoID, thumb, title, duration) {
    var box  = this.chooseVideoBox;
    box.hide();
    var img = this.createVideoObj(videoID, thumb, title, duration);
    this.insertNodeFunc(img, this.currRange);
  },
  /* ***************************
         Citate Methods
  *************************** */
  actCitate: function() {
    var notes = this;
    this.frameWin.focus();
    var range = this.getRange();
    var currBlockquote = this.getParentElement('BLOCKQUOTE');
    var self = this;
    var citateBox = showFastBox(cur.lang.wiki_adding_citate);
    //var citateBox = new MessageBox({ title: cur.lang.wiki_adding_citate });

    var citateInsertFunc = function() {
      citateBox.hide();
      var blockquote = notes.surround('BLOCKQUOTE', range);
      if (blockquote) {
        if (blockquote.lastChild) {
          notes.setElemFocus(blockquote.lastChild);
        } else {
          notes.setElemFocus(blockquote);
        }
      }
      notes.testLastChild();
    }
    if (currBlockquote != null) {
      citateBox.removeButtons();
      var citateDeleteFunc = function() {
        citateBox.hide();
        var p = notes.frameDoc.createElement('P');
        var frag = notes.getNodeFrag(currBlockquote);
        p.appendChild(frag);
        currBlockquote.parentNode.replaceChild(p, currBlockquote);
        notes.toolbar.citate.unselect();
      }
      citateBox.addButton(cur.lang.box_cancel, function() { citateBox.hide();  }, 'gray');
      citateBox.addButton(global_delete, citateDeleteFunc);

      if (this.nodeList['BLOCKQUOTE'] && (this.nodeList['BLOCKQUOTE'].nodes.length >= 3)) {
        citateBox.setOptions({ title: cur.lang.wiki_warning });
        citateBox.content(cur.lang.wiki_warning_delete_citate);
      } else {
        citateBox.addButton(global_add, citateInsertFunc);
        citateBox.content(cur.lang.wiki_warning_add_new_citate_or_del);
      }
      //citateBox.show();
    }
    else {
      citateInsertFunc.call(this);
    }
    this.getFormat();
  },
  formatBlock: function(range, tagName) {
    range.execCommand('FormatBlock', false, '<H4>');
    var headers = this.frameDoc.getElementsByTagName('H4');
    var cont = null;
    if (headers.length == 1) {
      var blockquote = this.frameDoc.createElement(tagName);
      blockquote.innerHTML = '<p>' + headers[0].innerHTML + '</p>';
      headers[0].parentElement.replaceChild(blockquote, headers[0]);
      cont = blockquote;
    } else {
    }
    return cont;
  },
  clearRange: function(sel, range, commonPrev, commonNext, startRange, endRange) { // IE Only
    var prevDiv = this.frameDoc.createElement('DIV');
    prevDiv.innerHTML = '\uFEFF';
    commonPrev.parentNode.insertBefore(prevDiv, commonPrev);
    var nextDiv = this.frameDoc.createElement('DIV');
    nextDiv.innerHTML = '\uFEFF';
    if (commonNext.nextSibling) commonNext.parentNode.insertBefore(nextDiv, commonNext.nextSibling);
    else commonNext.parentNode.appendChild(nextDiv);
    startRange.moveToElementText(prevDiv);
    endRange.moveToElementText(nextDiv);

    range.setEndPoint('StartToStart', startRange);
    range.setEndPoint('EndToEnd', endRange);

    range.select();
    sel.clear();

    return range;
  },
  surroundByTagName: function(sel, range, commonPrev, commonNext, startRange, endRange, tagName) {// IE Only
    startRange.moveToElementText(commonPrev);
    endRange.moveToElementText(commonNext);
    range.setEndPoint('StartToStart', startRange);
    range.setEndPoint('EndToEnd', endRange);
    var rangeHTML = range.htmlText;
    range = this.clearRange(sel, range, commonPrev, commonNext, startRange, endRange);
    range.pasteHTML('<' + tagName + ' id="b56n9ut">' + rangeHTML + '</' + tagName + '>');
    var contTag = this.frameDoc.getElementById('b56n9ut');
    contTag.removeAttribute('id');
    return contTag;
  },
  surround: function(tagName, range) {
    var self = this, contTag = null;
    this.frameWin.focus();

    var testNodeName = function(elem, tagsArray) {
      for (var i = 0; i < tagsArray.length; i++) {
        if (elem.nodeName == tagsArray[i]) return false;
      }
      return true;
    }
    if (browser.msie) {
      var sel = this.frameDoc.selection;
      var rng = sel.createRange();
      if (range != undefined) rng = range;
      var cont = rng.parentElement();

      if (rng.htmlText == '') {
        rng.pasteHTML('&nbsp;');
        contTag = this.formatBlock(rng, tagName);
      } else {
        var startRng = rng.duplicate();
        startRng.collapse(true);
        var endRng = rng.duplicate();
        endRng.collapse(false);

        var prev = startRng.parentElement(), next = endRng.parentElement();

        if ((prev.nodeName != 'BODY') && (next.nodeName != 'BODY')) {
          if (prev.parentNode == next.parentNode) contTag = this.surroundByTagName(sel, rng, prev, next, startRng, endRng, tagName);
          else {
            var commonObj = this.getCommonParent(prev, next);
            var commonPrev = commonObj.commonPrev, commonNext = commonObj.commonNext;

            contTag = this.surroundByTagName(sel, rng, commonPrev, commonNext, startRng, endRng, tagName);
          }
        } else if (prev == next) {
          contTag = this.formatBlock(rng, tagName);
        } else {
          if (prev.nodeName == 'BODY') this.formatBlock(startRng, 'DIV');
          if (next.nodeName == 'BODY') this.formatBlock(endRng, 'DIV');
          rng.setEndPoint('StartToStart', startRng);
          rng.setEndPoint('EndToEnd', endRng);
          prev = startRng.parentElement();
          next = endRng.parentElement();

          var commonObj = this.getCommonParent(prev, next);
          var commonPrev = commonObj.commonPrev, commonNext = commonObj.commonNext;

          contTag = this.surroundByTagName(sel, rng, commonPrev, commonNext, startRng, endRng, tagName);
        }
      }
    } else {
      var tagsStop = ['BODY', 'BLOCKQUOTE', 'TD', 'DIV', 'P', 'UL', 'OL', 'H1', 'H2', 'H3', 'BR'];
      var tags = ['BODY', 'BLOCKQUOTE', 'TD'];

      var sel = this.frameWin.getSelection();
      var rng = sel.getRangeAt(0);
      var cont = rng.commonAncestorContainer;

      if (rng.collapsed && (rng.startOffset != 0)) rng.setStart(cont, rng.startOffset - 1);
      var prev = rng.startContainer, next = rng.endContainer;

      while (testNodeName(cont, tagsStop)) {
        if (!testNodeName(cont.parentNode, tags)) break;
        cont = cont.parentNode;
      }
      while (testNodeName(prev, tagsStop)) {
        if (!testNodeName(prev.parentNode, tags)) break;
        prev = prev.parentNode;
      }
      while (testNodeName(prev, tagsStop)) {
        if ((prev.previousSibling == null) || !testNodeName(prev.previousSibling, tagsStop)) break;
        prev = prev.previousSibling;
      }
      while (testNodeName(next, tagsStop)) {
        if (!testNodeName(next.parentNode, tags)) break;
        next = next.parentNode;
      }
      while (testNodeName(next, tagsStop)) {
        if ((next.nextSibling == null) || !testNodeName(next.nextSibling, tagsStop)) break;
        next = next.nextSibling;
      }
      var commonPrev = prev, commonNext = next;
      if (prev.parentNode != next.parentNode) {
        var commonObj = this.getCommonParent(prev, next);
        commonPrev = commonObj.commonPrev;
        commonNext = commonObj.commonNext;
      }
      var parentStopArray = ['BODY', 'TD', 'TH'];
      if (testNodeName(commonPrev, parentStopArray)) rng.setStartBefore(commonPrev);
      if (testNodeName(commonNext, parentStopArray)) rng.setEndAfter(commonNext);
      contTag = this.frameDoc.createElement(tagName);
      if ((rng.startOffset == rng.endOffset) && (rng.startOffset == 0)) {
        contTag.innerHTML = '<p>\uFEFF</p>';
        rng.insertNode(contTag);
      } else {
        rng.surroundContents(contTag);
      }
    }
    return contTag;
  },
  /* ***************************
         Header Methods
  *************************** */
  actHeader: function(tag) {
    this.frameWin.focus();
    var parent = this.getParentElement(tag);
    var elem = null;
    if (parent != null) {
      var div = this.frameDoc.createElement('DIV');
      div.innerHTML = this.getInnerText(parent);
      parent.parentNode.replaceChild(div, parent);
      elem = div;
    } else {
      this.frameDoc.execCommand('FormatBlock', false, '<' + tag + '>');
      var parent = this.getParentElement(tag);
      if (parent != null) {
        var text = this.getInnerText(parent);
        if (trim(text) == '') {
          parent.innerHTML = '\uFEFF';
        } else {
          parent.innerHTML = text;
        }
       }
       elem = parent;
     }
    var range = this.getRange(), text = browser.msie ? range.text : range.toString();
    if (text.length != 0) {
      this.clearEmptyTags(tag);
    }
    this.getFormat();
    this.setElemFocus(elem);
  },
  headerFix: function(e) {
    if ((e.keyCode == KEY.ENTER) || (e.keyCode == KEY.BACKSPACE) || (e.keyCode == KEY.DELETE)) {
      var header = this.getParentElement('H1', 'H2', 'H3');
      if (header != null) {
        if (e.shiftKey) return true;
        var range = this.getRange();
        var offsets = this.getElemOffsets(header);
        var headerText = this.getInnerText(header);
        if (headerText == '\uFEFF') {
          header.parentNode.removeChild(header);
          if (browser.msie8) this.frameDoc.execCommand('RemoveFormat', false, true);
          return true;
        }
        if (browser.chrome && offsets.startOffset && (e.keyCode == KEY.BACKSPACE)) {
          this.frameDoc.execCommand('FormatBlock', false, '<P>');
        }
        var headerLengthLimit = 1;
        if (headerText.indexOf('\uFEFF') == 0) headerLengthLimit++;
        if ((headerText.length == headerLengthLimit) && ((e.keyCode == KEY.BACKSPACE) || (e.keyCode == KEY.DELETE))) {
          header.parentNode.removeChild(header);
          if (browser.msie8) this.frameDoc.execCommand('RemoveFormat', false, true);
          return true;
        }
        if (e.keyCode == KEY.ENTER) {
          if (offsets.startOffset) {
            this.insertParagraph(header, 'before');
            return true;
          } else if (browser.mozilla && offsets.endOffset) {
            var p = this.insertParagraph(header, 'after');
            this.setElemFocus(p, true);
            return true;
          }
        }
      }
    }
  },
  /* ***************************
         Char Methods
  *************************** */
  charBoxInit: function() {
    var self = this;
    var charsArray = [
        [[169, 'copy', cur.lang.wiki_char_copy], [174, 'reg', cur.lang.wiki_char_reg], [8482, 'trade', cur.lang.wiki_char_trade], [8240, 'permil', cur.lang.wiki_char_permil], [8249, 'lsaquo', cur.lang.wiki_char_lsaquo], [8250, 'rsaquo', cur.lang.wiki_char_rsaquo], [171, 'laquo', cur.lang.wiki_char_laquo], [187, 'raquo', cur.lang.wiki_char_raquo], [167, 'sect', cur.lang.wiki_char_sect], [182, 'para', cur.lang.wiki_char_para]],
        [[185, 'sup1', cur.lang.wiki_char_sup1], [178, 'sup2', cur.lang.wiki_char_sup2], [179, 'sup3', cur.lang.wiki_char_sup3], [188, 'frac14', cur.lang.wiki_char_frac14], [189, 'frac12', cur.lang.wiki_char_frac12], [190, 'frac34', cur.lang.wiki_char_frac34], [8722, 'minus', cur.lang.wiki_char_minus], [177, 'plusmn', cur.lang.wiki_char_plusmn], [247, 'divide', cur.lang.wiki_char_divide], [8260, 'fras1', cur.lang.wiki_char_fras1]],
        [[215, 'times', cur.lang.wiki_char_times], [402, 'fnof', cur.lang.wiki_char_fnof], [8747, 'int', cur.lang.wiki_char_int], [8721, 'sum', cur.lang.wiki_char_sum], [8734, 'infin', cur.lang.wiki_char_infin], [8730, 'radic', cur.lang.wiki_char_radic], [8800, 'ne', cur.lang.wiki_char_ne], [176, 'deg', cur.lang.wiki_char_deg], [8804, 'le', cur.lang.wiki_char_le], [8805, 'ge', cur.lang.wiki_char_ge]],
        [[945, 'alpha', cur.lang.wiki_char_alpha], [946, 'beta', cur.lang.wiki_char_beta], [947, 'gamma', cur.lang.wiki_char_gamma], [948, 'delta', cur.lang.wiki_char_delta], [949, 'epsilon', cur.lang.wiki_char_epsilon], [969, 'omega', cur.lang.wiki_char_omega], [937, 'Omega', cur.lang.wiki_char_omega_uppercase], [956, 'mu', cur.lang.wiki_char_mu], [8211, 'ndash', cur.lang.wiki_char_ndash], [8212, 'mdash', cur.lang.wiki_char_mdash]],
        [[8592, 'larr', cur.lang.wiki_char_larr], [8594, 'rarr', cur.lang.wiki_char_rarr], [8593, 'uarr', cur.lang.wiki_char_uarr], [8595, 'darr', cur.lang.wiki_char_darr], [8596, 'harr', cur.lang.wiki_char_harr], [8597, 'varr', cur.lang.wiki_char_varr], [9824, 'spades', cur.lang.wiki_char_spades], [9827, 'clubs', cur.lang.wiki_char_clubs], [9829, 'hearts', cur.lang.wiki_char_hearts], [9830, 'diams', cur.lang.wiki_char_diams]]
      ];
      var chars = ge('cb_chars');
      var frag = document.createDocumentFragment();
      for (var i = 0; i < charsArray.length; i++) {
        for (var j = 0; j < charsArray[i].length; j++) {
          var div = document.createElement('DIV');
          div.id = 'char-' + i + '-' + j;
          var elem = charsArray[i][j];
          div.innerHTML = '&#' + elem[0] + ';';
          div.alt = elem[2];
          div.title = elem[2];
          frag.appendChild(div);
        }
        var br = document.createElement('BR');
        br.setAttribute('clear', 'all');
        frag.appendChild(br);
      }
      chars.appendChild(frag);
      var overFunc = function(e) {
        if (e.target.parentNode == chars) {
          var id = e.target.id.split('-');
          var elem = charsArray[id[1]][id[2]];
          ge('cb_char_view').innerHTML = e.target.innerHTML;
          ge('cb_char_name').innerHTML = elem[2];
          //ge("charCode").innerHTML = "HTML:&nbsp;&amp;" + elem[1] + ";";
          //ge("charNum").innerHTML = "NUM:&nbsp;&amp;#" + elem[0] + ";";
        }
      }
      var clickFunc = function(e) {
        if (e.target.parentNode == chars) {
          var id = e.target.id.split('-');
          var elem = charsArray[id[1]][id[2]];
          var charCode = '&#' + elem[0] + ';';
          self.charBox.hide();
          self.frameWin.focus();
          var range = self.charBox.range;
          range.collapse(false);
          if (browser.msie) {
            range.pasteHTML(charCode);
            range.select();
          } else {
            self.frameDoc.execCommand('InsertHtml', false, charCode);
          }
        }
      }
      addEvent(chars, 'mouseover', function(e) { overFunc(e) });
      //addEvent(chars, "mouseout", outFunc);
      addEvent(chars, 'click', clickFunc);
  },
  actChar: function(loaded) {
    var box = this.charBox;
    var notes = this;
    if (box == undefined || box.loaded == undefined || !loaded) {
      //box.setOptions({ onLoad: function() { box.loaded = true; this.actChar(); }.bind(this) });
      this.charBox = showBox('wiki.php', {act: 'char_box', al_wiki_editor: true}, {onDone: function() {
        notes.charBox.loaded = true;
        notes.actChar(true);
      }});
      //box.loadContent('wiki.php', { act: 'char_box' }, false);
      return null;
    }
    this.frameWin.focus();
    box.range = this.getRange();
    this.unFocusIE();
    if (box.init == undefined) {
      this.charBoxInit();
      box.init = true;
    }
    box.show();
  },
  /* ***************************
           Photo Methods
  *************************** */
  choosePhoto: function() {
    this.choosePhotoBox = showBox('photos.php', {act: 'a_choose_photo_box', al_wiki_editor: true, scrollbar_width: window.sbWidth()});
    this.frameWin.focus();
    this.currRange = this.getRange();
    this.unFocusIE();

    /*var box = this.choosePhotoBox;
    if (this.photoElemID) {
      box.setOptions({ title: cur.lang.wiki_edit_photo });
    } else {
      box.setOptions({ title: cur.lang.wiki_adding_photo });
    }
    box.show();
    this.frameWin.focus();
    this.currRange = this.getRange();
    if (box.loaded == undefined) {
      box.setOptions({ onLoad: function() { box.loaded = true; this.choosePhoto(); }.bind(this) });
      //box.loadContent('photos.php', { act: 'a_choose_photo_box', scrollbar_width: window.sbWidth() }, true, 'height: 412px');
      ajax.plainpost('photos.php', {act: 'a_choose_photo_box', scrollbar_width: window.sbWidth()}, function(res) {
          try {
           var result = eval('('+res+')');
           var boxContent = result.html ? result.html : '';
           box.content('<div style="height:412px">' + boxContent + '</div>');
           if (result.script)  window.execScript ? window.execScript(result.script) : eval.call(window, result.script);
          } catch (e) {}
        }, function() {
          //
        }
      );
      return null;
    }
    box.show();
    this.unFocusIE();*/
  },
  photoBoxInit: function() {
    var box = this.photoBox;
    var notes = this;
    var propArray = ['pb_photo_preview', 'pb_photo_view', 'pb_photo_url', 'pb_photo_width', 'pb_photo_height', 'openPhotoAlbums', 'pb_photo_id', 'pb_photo_text', 'pb_error'];
    this.extendObj(box, propArray);
    box.saveRatio = ge('pb_cb_ratio'); //checked
    //box.saveRatio = new Checkbox(ge('pb_cb_ratio'), { label: cur.lang.wiki_tbl_save_ratio, checked: true, width: 160 });
    box.useBorder = ge('pb_cb_border');
    //box.useBorder = new Checkbox(ge('pb_cb_border'), { label: cur.lang.wiki_tbl_show_border, width: 160 });
    box.boxView = ge('pb_cb_box');
    //box.boxView = new Checkbox(ge('pb_cb_box'), { label: cur.lang.wiki_tbl_show_in_box, width: 160, onChange: function() { this.testPhotoSetupError(10); }.bind(this) });
    box.useLink = ge('pb_cb_link'); //checked
    //box.useLink = new Checkbox(ge('pb_cb_link'), { label: cur.lang.wiki_tbl_add_link, checked: true, width: 160, onChange: this.useLinkChange.bind(this) });
    addEvent(box.pb_photo_id, 'blur', function() { if (this.isLoadNow) return false; this.tryLoadPhoto(); }.bind(this));
    addEvent(box.pb_photo_id, 'keyup', function() { if (this.isLoadNow) return false; this.tryLoadPhoto(); }.bind(this));
    addEvent(box.pb_photo_id, 'click', function() { this.select(); });
    addEvent(box.pb_photo_text, 'keyup', this.photoTextChange.bind(this));
    addEvent(box.pb_photo_width, 'keyup', this.sizeChange.extBind(this, 'width'));
    addEvent(box.pb_photo_height, 'keyup', this.sizeChange.extBind(this, 'height'));
    addEvent(box.pb_photo_width, 'keypress', this.numberFilter.extBind(this));
    addEvent(box.pb_photo_height, 'keypress', this.numberFilter.extBind(this));
  },
  photoSetup: function(elemID, changeSize, loaded) {
    var box = this.photoBox;
    //box.show();
    var notes = this;
    if (box == undefined || box.loaded == undefined || !loaded) {
      //box.setOptions({ onLoad: function() { box.loaded = true; box.setOptions({ bodyStyle: 'padding: 0px; height: auto;' }); this.photoSetup(elemID, changeSize); }.bind(this), onHide: function() { box.showBox = false; } });
      this.photoBox = showBox('wiki.php', {act: 'photo_box', al_wiki_editor: true}, {params: {width: 515}, onDone: function() {
        notes.photoBox.loaded = true;
        notes.photoSetup(elemID, changeSize, true);
      }});
      //box.loadContent('wiki.php', { act: 'photo_box' }, false, 'height: 258px;');
      return null;
    }

    if (box.init == undefined) {
      this.photoBoxInit();
      box.init = true;
    }
    box.lastLoadID = null;
    box.showError = false;
    hide(ge('pb_error'));
    fadeTo('pb_error', 1, 0, null);
    box.pb_photo_width.value = '',  box.pb_photo_height.value = '';
    hide(box.pb_photo_view), show(box.pb_photo_preview);
    box.removeButtons();
    box.addButton(cur.lang.box_cancel, function() { box.hide(); box.boxShow = false; notes.photoElemID = null; }, 'gray');
    if ((elemID == undefined) && this.photoElemID) {
      elemID = this.photoElemID;
    }
    box.boxShow = true;
    if (elemID != undefined) {
      this.photoElemID = elemID;
      var obj = this.frameDoc.getElementById(elemID);
      var params = this.images[elemID.replace('photo', '')];
      box.current = params;
      box.correct = true;
      box.setOptions({ title: cur.lang.wiki_edit_photo });
      box.addButton(cur.lang.wiki_edit, function() { notes.insertPhoto(elemID); });
      this.addPhotoBoxControlText();
      box.pb_photo_width.value = params.width;
      box.pb_photo_height.value = params.height;
      box.pb_photo_id.value = 'photo' + params.photoID;
      box.pb_photo_text.value = params.text;

      if (params.url != '') {
        box.pb_photo_url.value = params.url;
        box.pb_photo_url.disabled = false;
        checkbox(box.useLink, true);
        disable(box.useLink, false);
        checkbox(box.boxView, params.boxView);
        if (params.text != '') {
          box.pb_photo_url.disabled = true;
        }
      } else {
        box.pb_photo_url.value = '';
        checkbox(box.useLink, false);
        checkbox(box.boxView, false);
        disable(box.boxView, true);
      }
      checkbox(box.saveRatio, params.saveRatio);
      checkbox(box.useBorder, params.useBorder);

      var options = { disable: [[], ['saveRatio', 'useLink'], true], disabled: [[], ['pb_photo_width', 'pb_photo_height'], false] };
      this.setObjOptions(box, options);
      if (params.url != '') {
        this.setObjOptions(box, { disable: [[], ['useBorder', 'boxView']] });
      }
      box.photoLoadStatus = false;
      if (params.photoURL) {
        this.loadPhoto(params.photoURL, false);
      } else {
        box.current = null;
        this.tryLoadPhoto(null, params.photoID, changeSize);
      }
      this.unFocusIE();
    } else {
      this.photoElemID = null;
      box.correct = false;
      box.current = null;
      box.pb_photo_view.removeAttribute('width');
      box.pb_photo_view.removeAttribute('height');
      var img = vkImage();
      var loadQuestion = function() {
         box.pb_photo_view.src = this.photoQuestion;
         hide(box.pb_photo_preview),
         show(box.pb_photo_view);
      }
      addEvent(img, 'load', loadQuestion.bind(this));
      img.src = this.photoQuestion;
      box.setOptions({ title: cur.lang.wiki_adding_photo });
      box.addButton(cur.lang.global_add, function() { notes.insertPhoto(); });
      this.addPhotoBoxControlText();
      each(['pb_photo_id', 'pb_photo_text', 'pb_photo_url', 'pb_photo_width', 'pb_photo_height'], function(i, obj) { box[obj].value = ''; } );
      var options = { disabled: [[], ['pb_photo_url', 'pb_photo_width', 'pb_photo_height'], false], disable: [[], ['saveRatio', 'useBorder', 'boxView', 'useLink'], true],
      checked: [['saveRatio'], ['boxView', 'useBorder', 'useLink'], true] };
      this.setObjOptions(box, options);
      this.frameWin.focus();
      this.currRange = this.getRange();
      box.changeSize = true;
      box.show();
      this.unFocusIE();
    }
  },
  testPhotoSetupError: function(errorNum) {
    var box = this.photoBox, error = null, pmin = this.params.photoMinSize, pmax = this.params.photoMaxSize;
    if (!box.correct) {
      error = [1, cur.lang.wiki_err_not_sel_photo];
    } else if (isChecked(box.useLink) && (box.pb_photo_url.value == '')) {
      error = [3, cur.lang.wiki_err_not_write_photo_url];
    } else if ((box.pb_photo_width.value == 0) || (box.pb_photo_height.value == 0)) {
      error = [4, cur.lang.wiki_err_photo_size_zero];
    } else if ((box.pb_photo_width.value < pmin.w) || (box.pb_photo_height.value < pmin.h)) {
      error = [5, cur.lang.wiki_err_photo_min_size + ' ' + pmin.w + 'x' + pmin.h + 'px'];
    } else if ((box.pb_photo_width.value > pmax.w) || (box.pb_photo_height.value > pmax.h)) {
      error = [6, cur.lang.wiki_err_photo_max_size + ' ' + pmax.w + 'x' + pmax.h + 'px'];
    } else if (box.no_access) {
      error = [7, cur.lang.wiki_err_no_access_to_photo];
    } else if ((trim(box.pb_photo_text.value) != '') && !(/^[\s0-9a-zа-яё:\.,_-]+$/i).test(trim(box.pb_photo_text.value))) {
      error = [8, cur.lang.wiki_err_forbidden_chars_in_photo_text];
    } else if ((trim(box.pb_photo_url.value) != '') && !(/^[\s0-9a-zа-яё=#\?:\/\.,_-]+$/i).test(trim(box.pb_photo_url.value))) {
      error = [9, cur.lang.wiki_err_forbidden_chars_in_photo_url];
    } else if (isChecked(box.boxView) && (trim(box.pb_photo_text.value) == '')) {
      error = [10, cur.lang.wiki_err_empty_text_in_view_box];
    }
    if (errorNum != undefined) {
      if ((error == null) || (error && (error[0] != errorNum))) {
        fadeTo(box.pb_error, this.showErrorTime, 0, function() { hide(box.pb_error); box.showError = false; });
      }
      return null;
    }
    if (error != null) {
      if (!box.showError) {
        box.pb_error.innerHTML = error[1];
        box.showError = true;
        show(box.pb_error);
        fadeTo(box.pb_error, this.showErrorTime, 1, null);
      }
      return true;
    }
    return false;
  },
  insertPhoto: function(elemID, photoObj) {
    if (!photoObj && this.testPhotoSetupError()) return false;
    var box = this.photoBox, photoID = null, elem = null, params = null, tooltip = '';
    this.choosePhotoBox.hide(), box.hide();
    var defaultParams = { saveRatio: true, useBorder: false, useLink: false, url: '', text: '', boxView: false };
    if (elemID) {
      photoID = parseInt(elemID.substr(5));
      if (photoObj) {
        params = photoObj;
        this.images[photoID] = extend(params, defaultParams);
      } else {
        params = this.images[photoID];
      }
    } else {
      photoID = this.images.length;
      if (photoObj) {
        params = photoObj;
        params = extend(params, defaultParams);
        params.useLink = true;
        params.url = 'photo' + params.photoID;
      } else {
        params = extend(box.current);
      }
      this.images[photoID] = params;
    }
    if (photoObj) {
      elem = this.frameDoc.createElement('IMG');
      elem.src = params.photoURL;
      elem.className = 'wk_photo';
      tooltip = 'photo' + params.photoID;
      var defWidth = Math.max(this.defImgWidth || 400, 130);
      if (params.width > defWidth + 20) {
        var dx = defWidth / params.width;
        params.width = defWidth;
        params.height = Math.floor(params.height * dx);
      }
      if (params.height > defWidth + 20) {
        var dy = defWidth / params.height;
        params.height = defWidth;
        params.width = Math.floor(params.width * dy);
      }
      setStyle(elem, {width: params.width, height: params.height});
    } else {
      params.photoID = box.current.photoID;
      params.text = box.pb_photo_text.value;
      params.url = box.pb_photo_url.value;
      params.saveRatio = isChecked(box.saveRatio);
      params.boxView = isChecked(box.boxView);
      params.useLink = isChecked(box.useLink);
      params.useBorder = isChecked(box.useBorder);
      params.width = box.pb_photo_width.value;
      params.height = box.pb_photo_height.value;

      if (params.width > params.height) {
        this.defImgWidth = params.width;
      }

      elem = this.frameDoc.createElement('IMG');
      elem.src = box.pb_photo_view.src;

      if (!params.useLink) {
        params.url = '';
      }
      elem.className = 'wk_photo';
      if (params.text) {
        tooltip = params.text;
      } else if (params.url) {
        tooltip = params.url;
      } else {
        tooltip = 'photo' + params.photoID;
      }
      elem.width = params.width, elem.height = params.height;
    }
    elem.alt = tooltip, elem.title = tooltip;
    if (elemID != undefined) {
      elem.id = elemID;
      var replaceElem = this.frameDoc.getElementById(elemID);
      replaceElem.parentNode.replaceChild(elem, replaceElem);
    } else {
      var elemID = 'photo' + photoID;
      elem.id = elemID;
      var elCont = false;
      if (this.currRange && this.currRange.endContainer) {
        var p = this.currRange.endContainer;
        while(p) {
          if (p.tagName == 'CENTER') {
            elCont = elem;
            break;
          }
          p = p.parentNode;
        }
      }
      if (!elCont) {
        var elCont = this.frameDoc.createElement('CENTER');
        elCont.appendChild(elem);
      }
      this.insertNodeFunc(elCont, this.currRange);
    }
    elem = this.frameDoc.getElementById(elemID);
    addEvent(elem, 'click', function() {
      this.photoSetup(elemID, false);
    }.bind(this));

    this.photoElemID = null;
    box.boxShow = false;
  },
  photoTextChange: function() {
    var box = this.photoBox;
    if (box.pb_photo_text.value == '') {
      if (isChecked(box.useLink)) {
        box.pb_photo_url.disabled = false;
      }
    } else {
      if (box.correct) {
        if (isChecked(box.useLink)) {
          box.pb_photo_url.disabled = true;
          box.pb_photo_url.value = 'photo' + box.current.photoID;
        }
      }
    }
  },
  useLinkChange: function() {
    var box = this.photoBox;
    if (isChecked(box.useLink)) {
      if (box.pb_photo_text.value == '') {
        box.pb_photo_url.disabled = false;
      } else {
        box.pb_photo_url.disabled = true;
        if (box.correct) {
          box.pb_photo_url.value = 'photo' + box.current.photoID;
        }
      }
      checkbox(box.boxView, false);
      disable(box.boxView, false);
    } else {
      box.pb_photo_url.value = '';
      box.pb_photo_url.disabled = true;
      checkbox(box.boxView, false);
      disable(box.boxView, true);
    }
  },
  togglePhotoSetup: function() {
    if (this.photoBox.boxShow) {
      this.photoBox.show();
    } else {
      this.photoSetup();
    }
  },
  loadPhotoResize: function(photoURL, w, h, changeSize) {
    var box = this.photoBox, preview = box.pb_photo_preview, view = box.pb_photo_view;
    var pw = box.pb_photo_width, ph = box.pb_photo_height;
    view.src = photoURL;
    if (w > h) {
      var newW = this.photoPreviewSize, newH = Math.round(h / (w / this.photoPreviewSize));
    } else {
      var newW = Math.round(w / (h / this.photoPreviewSize)), newH = this.photoPreviewSize;
    }
    view.width = newW, view.height = newH;
    if (changeSize) {
      pw.value = newW, ph.value = newH;
    }
    hide(preview), show(view);
    box.correct = true;
    this.testPhotoSetupError(1);
    this.testPhotoSetupError(7);
  },
  loadPhoto: function(photoURL, changeSize) {
    var box = this.photoBox;
    hide(box.pb_photo_view);
    show(box.pb_photo_preview);
    //if (box.photoLoadStatus) return false;
    var photoID = box.pb_photo_id.value;
    if (isChecked(box.useLink) && (box.pb_photo_url.value == '')) {
      box.pb_photo_url.value = 'photo' + photoID;
    }
    var img = vkImage();
    var loadPhotoFunc = function() {
      if (!box.current) {
        box.current = new Object();
      }
      box.current.photoURL = photoURL;
      box.current.photoID = box.pb_photo_id.value.replace('photo', '');
      box.current.originalWidth = img.width, box.current.originalHeight = img.height;
      this.loadPhotoResize(photoURL, img.width, img.height, changeSize);
    }
    addEvent(img, 'load', loadPhotoFunc.bind(this));
    img.src = photoURL;
  },
  getIDFromURL: function() {
    var url = this.photoBox.pb_photo_id.value;
    if ((url.indexOf(this.vk) != -1) || (url.indexOf(this.vkcom) != -1)) {
      var matchID = url.match(/-?[0-9]+_[0-9]+/gi);
      if (matchID != null) return matchID[matchID.length - 1];
    }
    return null;
  },
  numberFilter: function(e) {
    if (!this.photoBox.correct) return false;
    if (!e) e = window.event;
    var code = e.charCode || e.keyCode;
    if (e.charCode == 0) return true;
    if (code < 32) return true;
    var charCode = String.fromCharCode(code);
    var allowed = '0123456789';
    if (allowed.indexOf(charCode) == -1) return false;
  },
  sizeChange: function(e, sideName) {
    var box = this.photoBox;
    if (isChecked(box.saveRatio) && box.correct) {
      var w = box.current.originalWidth, h = box.current.originalHeight;
      var iw = parseInt(box.pb_photo_width.value), ih = parseInt(box.pb_photo_height.value);
      iw = isNaN(iw) ? 0 : iw, ih = isNaN(ih) ? 0 : ih;
      switch (sideName) {
        case 'width':
          h = h / (w / iw);
          box.pb_photo_height.value = Math.round(h);
        break;
        case 'height':
          w = w / (h / ih);
          box.pb_photo_width.value = Math.round(w);
        break;
      }
      this.testPhotoSetupError(5);
      this.testPhotoSetupError(6);
    }
  },
  tryLoadPhoto: function(e, photoID, changeSize) {
    var box = this.photoBox, self = this;
    if (photoID == undefined) {
      var photoID = this.getIDFromURL();
    }
    if (changeSize == undefined) {
      var changeSize = true;
    }
    if (photoID) {
      this.isLoadNow = true;
      box.pb_photo_id.value = 'photo' + photoID;
      var onReady = function(responseText) {
        this.isLoadNow = false;
        if (responseText != 'NO_ACCESS') {
          box.no_access = false;
          box.lastLoadID = photoID;
          self.loadPhoto(responseText, changeSize);
        } else {
            box.no_access = true;
            box.pb_photo_view.src = this.photoQuestion;
            box.pb_photo_view.removeAttribute('width');
            box.pb_photo_view.removeAttribute('height');
            show(box.pb_photo_view);
            this.testPhotoSetupError();
        }
      }
      if ((box.current == null) || (box.lastLoadID != photoID) || box.no_access) {
        ajax.post('photos.php', {act: 'get_photo', photo: photoID.replace('photo', ''), rand: Math.random()}, {onDone: onReady.bind(this), onFail: onReady });
        //Ajax.Post({ url: 'photos.php', query: { act: 'get_photo', photo: photoID.replace('photo', ''), rand: Math.random() }, onDone: onReady.bind(this), onFail: onReady });
      }
    }
    this.isLoadNow = false;
  },
  addPhotoBoxControlText: function() {
    var chooseLink = '<div class="pb_link" onclick="window[window.editorName].choosePhoto();" onmouseover="pbSetClass(this, \'pb_link_over\')" onmouseout="pbSetClass(this, \'pb_link\')">' + cur.lang.wiki_view_my_photos +
'</div>';
    this.photoBox.setControlsText(chooseLink);
  },
  /* ***************************
          Table Methods
  *************************** */
  actTable: function(loaded) {
    var box = this.tableBox;
    //box.showError = false;
    //box.show();
    var notes = this;
    if (box == undefined || !loaded) {
      this.tableBox = showBox('wiki.php', {act: 'table_box'}, {onDone: function() {
        notes.tableBox.loaded = true;
        notes.tableBox.setOptions({width: 465,  bodyStyle: 'padding: 0px; height: auto;'});
        notes.tableBox.showError = false;
        notes.actTable(true);
      }});
      //box.setOptions({ onLoad: function() { box.loaded = true; box.setOptions({ bodyStyle: 'padding: 0px; height: auto;' }); this.actTable(); }.bind(this) });
      //box.loadContent('wiki.php', { act: 'table_box' }, false, 'height: 196px;');
      return null;
    }

    if (this.tableBox.init == undefined) {
      this.extendObj(box, ['tb_table_caption', 'tb_cells', 'tb_cols', 'tb_rows', 'tb_error']);
      box.showHeader = ge('tb_show_header');
      box.noBorders = ge('tb_no_border');
      //box.showHeader = new Checkbox(ge('tb_show_header'), { label: cur.lang.wiki_tbl_add_header, width: 160 });
      //box.noBorders = new Checkbox(ge('tb_no_border'), { label: cur.lang.wiki_tbl_no_border, width: 160 });
      if (box.tb_cells.childNodes.length == 0) {
        this.tableCreateCells(10, 10);
      }
      box.init = true;
    } else {
      box.showError = false;
      box.show();
    }

    hide(box.tb_error);
    fadeTo(box.tb_error, 1, 0, null);

    this.frameWin.focus();
    this.currRange = this.getRange();
    var table = this.getParentElement('TABLE');
    var self = this;
    this.unFocusIE();

    if ((table != null) && (table.nodeName == 'TABLE') && ((table.className != 'hider') && (table.className != 'hiderOpened'))) {
      this.tableBoxChange(table);
      box.canSelect = false, box.canOver = false;
      box.setOptions({ title: cur.lang.wiki_edit_table });
      box.removeButtons();
      box.addButton(cur.lang.box_cancel, function() { box.hide(); }, 'gray');
      box.addButton(cur.lang.wiki_edit, function() { notes.tableChange(table); });
      addClass(box.tb_cols, 'disabled');
      addClass(box.tb_rows, 'disabled');
    } else {
      box.canSelect = true, box.canOver = true;
      box.setOptions({ title: cur.lang.wiki_adding_table });
      box.removeButtons();
      box.addButton(cur.lang.box_cancel, function() { box.hide(); }, 'gray');
      box.addButton(cur.lang.wiki_insert, function() { notes.insertTable(); });
      removeClass(box.tb_cols, 'disabled');
      removeClass(box.tb_rows, 'disabled');
      box.tb_cols.innerHTML = '0', box.tb_rows.innerHTML = '0';
      box.tb_table_caption.value = '';
      checkbox(box.showHeader, false);
      checkbox(box.noBorders, false);
      //box.showHeader.checked(false);
      //box.noBorders.checked(false);
      this.tableSelectCells(0, 0);
    }
  },
  actTableDelete: function() {
    var table = this.getParentElement('TABLE');
    var deleteTable = function() {
      table.parentNode.removeChild(table);
      this.frameWin.focus();
      this.getFormat();
    }
    this.alertBox(cur.lang.wiki_removing_table, cur.lang.wiki_warning_delete_table, cur.lang.box_yes, cur.lang.box_cancel, deleteTable.bind(this), null);
  },
  actTableActions: function(action) {
    var td = this.getParentElement('TD', 'TH'), tr = td.parentNode, table = tr.parentNode.parentNode;
    var colIndex = td.cellIndex, rowIndex = tr.rowIndex;
    if (action == 'delete_row') {
      var deleteRow = function(lastRow) {
        if (lastRow) {
          table.parentNode.removeChild(table);
          this.getFormat();
        } else {
          table.deleteRow(rowIndex);
        }
      }
      var deleteLastRow = cur.lang.wiki_warning_delete_row + '<br />' + cur.lang.wiki_warning_delete_last_row;
      if (table.rows.length == 1) {
        this.alertBox(cur.lang.wiki_warning, deleteLastRow, cur.lang.box_yes, cur.lang.box_cancel, function() { deleteRow(true) }, null);
      } else {
        this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_warning_delete_row, cur.lang.box_yes, cur.lang.box_cancel, function() { deleteRow(false) }, null);
      }
    } else if (action == 'delete_col') {
      var deleteCol = function(lastCol) {
        if (lastCol) {
          table.parentNode.removeChild(table);
          this.getFormat();
        } else {
          for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].deleteCell(colIndex);
          }
        }
      }
      var deleteLastCol = cur.lang.wiki_warning_delete_col + '<br />' + cur.lang.wiki_warning_delete_last_col;
      if (table.rows[0].cells.length == 1) {
        this.alertBox(cur.lang.wiki_warning, deleteLastCol, cur.lang.box_yes, cur.lang.box_cancel, function() { deleteCol(true) }, null);
      } else {
        this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_warning_delete_col, cur.lang.box_yes, cur.lang.box_cancel, function() { deleteCol(false) }, null);
      }
    } else if (action == 'col_width') {
      var self = this;
      var colWidth = function(lastCol, width) {
        width = parseInt(width);
        if (isNaN(width)) {
          //TODO show 'invalid value' message
          return;
        }
        if (lastCol) {
          //table.parentNode.removeChild(table);
          //this.getFormat();
        } else {
          var currentCol = self.getCellColTag(table, colIndex);
          if (currentCol != null) {
            currentCol.style.width = width + '%';
          } else {
            var cols = new Array();
            for (var i = 0; i < table.rows[0].cells.length; i++) {
              var col = document.createElement('COL');
              cols.push(col);
              if (i == colIndex) {
                col.style.width = width + '%';
              } else {
                col.style.width = '';//Maybe 0% or 100%
              }
            }
            if (cols.length > 0) {
              table.insertBefore(cols[0], table.firstChild);
              var lastColAppended = cols[0];
              for (var i = 1; i < cols.length; i++) {
                table.insertBefore(cols[i], lastColAppended.nextSibling);
                lastColAppended = cols[i];
              }
            }
          }
        }
      }
      if (table.rows[0].cells.length == 1) {
        this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_col_width, cur.lang.box_yes, cur.lang.box_cancel, function() { colWidth(true, this.value) }, null);
      } else {
        var currentCol = this.getCellColTag(table, colIndex);
        var columnWidth = '';
        if (currentCol != null && currentCol.getAttribute('width') != null) {
          columnWidth = currentCol.getAttribute('width').substr(0, currentCol.getAttribute('width').length - 1);
        } else if (currentCol != null && currentCol.getAttribute('style') != null) {
          columnWidth = currentCol.style.width.substr(0, currentCol.style.width.length - 1);
        }

        widthAlertBox = showFastBox({title: cur.lang.wiki_col_width, width: 230}, "Задайте ширину столбца: <input type='text' id='col_width_input' maxlength = '3' size = '3' value = '" + columnWidth + "'>&nbsp;<b>%</b>");
        ge('col_width_input').value = columnWidth;
        widthAlertBox.removeButtons();
        widthAlertBox.addButton(box_cancel, function() { widthAlertBox.hide(); }, 'gray');
        widthAlertBox.addButton(box_save, function() { colWidth(false, ge('col_width_input').value); widthAlertBox.hide(); });
        ge('col_width_input').focus();
      }
    } else if ((action == 'insert_row_before') || (action == 'insert_row_after')) {
      var newRow = this.frameDoc.createElement('TR'), cellTag = 'TD';
      if ((rowIndex == 0) && (action == 'insert_row_before')) {
        var thArray = table.getElementsByTagName('TH');
        if (thArray.length != 0) {
          cellTag = 'TH';
        }
        var cells = table.rows[0].cells, cellsLength = cells.length;
        for (var i = 0; i < cellsLength; i++) {
          var td = this.frameDoc.createElement('TD');
          td.innerHTML = cells[i].innerHTML;
          cells[i].parentNode.replaceChild(td, cells[i]);
        }
      }
      for (var i = 0; i < tr.cells.length; i++) {
        var cell = this.frameDoc.createElement(cellTag);
        cell.innerHTML = '\uFEFF';
        newRow.appendChild(cell);
      }
      if (action == 'insert_row_before') {
        tr.parentNode.insertBefore(newRow, tr);
      } else if (action == 'insert_row_after') {
        if (rowIndex == (table.rows.length - 1)) {
          tr.parentNode.appendChild(newRow);
        } else {
          tr.parentNode.insertBefore(newRow, table.rows[rowIndex + 1]);
        }
      }
    } else if ((action == 'insert_col_before') || (action == 'insert_col_after')) {
      var endCol = (colIndex == (tr.cells.length - 1));
      for (var i = 0; i < table.rows.length; i++) {
        var cell = null, cellType = table.rows[i].cells[colIndex].nodeName;
        if (cellType == 'TD') {
          cell = this.frameDoc.createElement('TD');
        } else if (cellType == 'TH') {
          cell = this.frameDoc.createElement('TH');
        }
        cell.innerHTML = '\uFEFF';
        if (action == 'insert_col_before') {
          table.rows[i].insertBefore(cell, table.rows[i].cells[colIndex]);
        } else if (action  == 'insert_col_after') {
          if (endCol) {
            table.rows[i].appendChild(cell);
          } else {
            table.rows[i].insertBefore(cell, table.rows[i].cells[colIndex + 1]);
          }
        }
      }
    }
  },
  tableChange: function(table) {
    var box = this.tableBox;
    var tableCaption = box.tb_table_caption.value;
    var captionArray = table.getElementsByTagName('CAPTION');
    var th = table.getElementsByTagName('TH');

    var tableClass = table.getAttribute('class');
    if (isChecked(box.noBorders)) {
      if (tableClass.indexOf('wikiTableNoBorder') == -1 || tableClass.indexOf('wk_table_no_border') == -1) {
        table.setAttribute('class', tableClass + ' wk_table wk_table_no_border');
      }
    } else {
      table.setAttribute('class', tableClass.replace(/wikiTableNoBorder/g, '').replace(/wk_table_no_border/g, ''));
    }

    if (isChecked(box.showHeader)) {
      if (th.length == 0) {
        var cells = table.rows[0].cells;
        var cellsLength = cells.length;
        for (var i = 0; i < cellsLength; i++) {
          var th = this.frameDoc.createElement('TH');
          th.align = 'left';
          th.innerHTML = cells[i].innerHTML;
          cells[i].parentNode.replaceChild(th, cells[i]);
        }
      }
    } else {
      if (th.length != 0) {
        var cells = table.rows[0].cells;
        var cellsLength = cells.length;
        for (var i = 0; i < cellsLength; i++) {
          var td = this.frameDoc.createElement('TD');
          td.innerHTML = cells[i].innerHTML;
          cells[i].parentNode.replaceChild(td, cells[i]);
        }
      }
    }
    if (captionArray.length != 0) {
      if (tableCaption != '') {
        this.setInnerText(captionArray[0], tableCaption);
      } else {
        captionArray[0].parentNode.removeChild(captionArray[0]);
      }
    } else {
      if (tableCaption != '') {
        var caption = this.frameDoc.createElement('CAPTION');
        var tbody = table.getElementsByTagName('TBODY')[0];
        table.insertBefore(caption, tbody);
        this.setInnerText(caption, box.tb_table_caption.value);
      }
    }
    this.tableBox.hide();
  },
  tableBoxChange: function(table) {
    var box = this.tableBox;
    checkbox(box.noBorders, false);
    if (table.getAttribute('class').indexOf('wikiTableNoBorder') != -1 || table.getAttribute('class').indexOf('wk_table_no_border') != -1) {
      checkbox(box.noBorders, true);
    }
    var caption = table.getElementsByTagName('CAPTION');
    if (caption.length != 0) {
      var captionText = this.getInnerText(caption[0]);
      box.tb_table_caption.value = captionText;
    } else {
      box.tb_table_caption.value = '';
    }
    var th = table.getElementsByTagName('TH');
    if (th.length != 0) {
      checkbox(box.showHeader, true);
    } else {
      checkbox(box.showHeader, false);
    }
    var rows = table.rows.length;
    var cols = table.rows[0].cells.length;
    this.tableSelectCells(rows, cols);
    box.tb_cols.innerHTML = cols;
    box.tb_rows.innerHTML = rows;
  },
  testInsertTable: function(errorNum) {
    var box = this.tableBox, error = null;
    if ((box.tb_cols.innerHTML == '0') || (box.tb_rows.innerHTML == '0')) {
      error = [1, cur.lang.wiki_err_empty_table_size];
    }
    if (errorNum != undefined) {
      if ((error == null) || (error && (error[0] != errorNum))) {
        fadeTo(box.tb_error, this.showErrorTime, 0, function() { hide(box.tb_error); box.showError = false; });
      }
      return null;
    }
    if (error != null) {
      if (!box.showError) {
        box.tb_error.innerHTML = error[1];
        box.showError = true;
        show(box.tb_error);
        fadeTo(box.tb_error, this.showErrorTime, 1, null);
      }
      return true;
    }
    return false;
  },
  insertTable: function() {
    var box = this.tableBox;
    if (this.testInsertTable()) {
      return false;
    }
    var range = this.currRange;
    var rows = parseInt(box.tb_rows.innerHTML);
    var cols = parseInt(box.tb_cols.innerHTML);
    var showHeader = isChecked(box.showHeader);
    var noBorders = isChecked(box.noBorders);
    var caption = box.tb_table_caption.value;
    var table = this.createTable(cols, rows, caption, showHeader, noBorders);
    this.frameWin.focus();

    var div = this.frameDoc.createElement('DIV');
    div.innerHTML = table;
    var tableElem = div.firstChild;

    this.insertNodeFunc(tableElem, range);
    box.hide();

    var th = tableElem.getElementsByTagName('TH')[0];
    if (th != undefined) {
      this.setElemFocus(th);
    } else {
      var td = tableElem.getElementsByTagName('TD')[0];
      if (td != undefined) {
        this.setElemFocus(td);
      }
    }
    this.testLastChild();
  },
  createTable: function(rows, cols, caption, header, noborder) {
    var borderHTML = noborder ? 'class="wk_table_no_border" ' : 'class="" ';
    var tableHTML = '<table ' + borderHTML + 'cellspacing="0" cellpadding="0">';
    if (caption != '') {
      tableHTML += '<caption>' + caption + '</caption>';
    }
    var perW = Math.floor(100 / rows);
    for (var i = 0; i < cols; i++) {
      tableHTML += '<tr>';
      for (var j = 0; j < rows; j++) {
        if (header && (i == 0)) {
          tableHTML += '<th align="left">\uFEFF</th>';
        } else {
          if (false && (i == 0)) {
            tableHTML += '<td width="' + perW + '%">\uFEFF</td>';
          }
          else tableHTML += '<td>\uFEFF</td>';
        }
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    return tableHTML;
  },
  tableSelectCells: function(rows, cols) {
    var box = this.tableBox;
    var rowsCount = box.cellsArray.length;
    var colsCount = box.cellsArray[0].length;

    for (var i = 0; i < rowsCount; i++) {
      for (var j = 0; j < colsCount; j++) {
        if ((i < rows) && (j < cols)) {
          box.cellsArray[i][j].className = 'over';
        } else {
          this.tableBox.cellsArray[i][j].className = '';
        }
      }
    }
    if (cols > colsCount) {
      cols = colsCount;
    }
    if (rows > rowsCount) {
      rows = rowsCount;
    }
    if ((rows != 0) && (cols != 0)) {
      this.tableBox.cellsArray[rows - 1][cols - 1].className = 'point';
    }
  },
  tableCreateCells: function(rows, cols) {
    var box = this.tableBox, cells = box.tb_cells;
    box.cells = cells;
    var cellsArray = new Array();
    box.cellsArray = cellsArray;

    for (var i = 0; i < rows; i++) {
      cellsArray[i] = new Array();
      for (var j = 0; j < cols; j++) {
        var cell = document.createElement('DIV');
        cell.i = i;
        cell.j = j;
        cellsArray[i][j] = cell;
        cells.appendChild(cell);
      }
      var br = document.createElement('BR');
      br.setAttribute('clear', 'all');
      cells.appendChild(br);
    }
    box.cellLast = null;
    box.canOver = true;
    var self = this;
    var timer = null;
    var over = function(e) {
      if (timer) {
        clearTimeout(timer);
      }
      var target = e.target;
      if (target.parentNode == cells) {
        box.cellLast = target;
        if (!box.canOver) {
          if (target.className == "point_sel") {
            target.className = "point_over";
          }
          return false;
        }
        if (box.cellLast != null) {
          box.cellLast.className = '';
        }
        box.tb_rows.innerHTML = target.i + 1;
        box.tb_cols.innerHTML = target.j + 1;
        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            if ((target.i >= i) && (target.j >= j)) {
              cellsArray[i][j].className = 'over';
            } else {
              cellsArray[i][j].className = '';
            }
          }
        }
        target.className = 'point';
      }
    }
    var out = function(e) {
      if (timer) clearTimeout(timer);
      var target = e.target;
      if (target.className == 'point_over') {
        target.className = 'point_sel';
      }
      var func = function() {
        if (!box.canOver) return null;
        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            cellsArray[i][j].className = '';
          }
        }
        box.tb_cols.innerHTML = '0';
        box.tb_rows.innerHTML = '0';
      }
      timer = setTimeout(func, 100);
    }
    var up = function(e) {
      var target = e.target, cellClass = 'sel', pointClass = 'point_over';
      if (box.canSelect) {
        if (target == cells) target=box.cellLast;
        var a = target.i, b = target.j;
        if (!box.canOver && (target.className.indexOf('point') == -1)) {
          box.canOver = !box.canOver;
          box.tb_rows.innerHTML = a + 1;
          box.tb_cols.innerHTML = b + 1;
        }
        if (!box.canOver) {
          cellClass = 'over';
          pointClass = 'point';
        }
        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            cellsArray[i][j].className = (i < a+1 && j < b+1) ? cellClass : '';
          }
        }
        cellsArray[a][b].className = pointClass;
        if (box.canOver) {
          var k = 10, c = a - 1, d = b - 1;
          for (var i = Math.max(a, b); i >= -1; i--) {
            setTimeout(function(i) {
              return function() {
                if (c >= -1) {
                  if (c > -1) cellsArray[c][b].className = 'point';
                  if (c != (a - 1)) cellsArray[c + 1][b].className = 'sel';
                  c--;
                }
                if (d >= -1) {
                  if (d > -1) cellsArray[a][d].className = 'point';
                  if (d != (b - 1)) cellsArray[a][d + 1].className = 'sel';
                  d--;
                }
              }
            }(i), k);
            k += 20;
          }
        }
        self.tableBox.canOver = !box.canOver;
        self.testInsertTable(1);
      }
    }
    addEvent(cells, 'mouseover', function(e) { over(e) });
    addEvent(cells, 'mouseout', function(e) { out(e) });
    addEvent(cells, 'mouseup', function(e) { up(e) });
    //addEvent(box.tb_rows, 'keydown', function(e) { return false });
    //addEvent(box.tb_rows, 'keypress', function(e) { return false });
    //addEvent(box.tb_cols, 'keydown', function(e) { return false });
    //addEvent(box.tb_cols, 'keypress', function(e) { return false });
  },
  allowTableActions: function(status) {
    var tableButtons = ['table_delete', 'insert_row_before', 'insert_row_after', 'insert_col_before', 'insert_col_after', 'delete_row', 'delete_col', 'col_width'];
    for (var i = 0; i < tableButtons.length; i++) {
      if (this.toolbar[tableButtons[i]]) {
        if (status) {
          this.toolbar[tableButtons[i]].enable();
        }
        else {
          this.toolbar[tableButtons[i]].disable();
        }
      }
    }
  },
  getCellColTag: function(table, colIndex) {
    var currentColTagIndex = 0;
    for (var i = 0; i < table.childNodes.length; i++) {
      if (table.childNodes[i].nodeName == 'COLGROUP') {
        for (var j = 0; j < table.childNodes[i].childNodes.length; j++) {
          if (table.childNodes[i].childNodes[j].nodeName == 'COL') {
            if (colIndex == currentColTagIndex) {
              return table.childNodes[i].childNodes[j];
            } else {
              currentColTagIndex++;
            }
          }
        }
        break;
      } else if (table.childNodes[i].nodeName == 'COL') {
        if (colIndex == currentColTagIndex) {
          return table.childNodes[i];
        } else {
          currentColTagIndex++;
        }
      }
    }
    return null;
  },
  /* ***************************
                Link
  *************************** */
  insertLink: function(linkElem) {
    var box = this.linkBox, url = trim(box.lb_link_url.value), text = trim(box.lb_link_text.value), popup = false;
    if (isVisible('lb_link_box_tr')) {
      //TODO refactor global var to AL?
      popup = isChecked(ge('container1'));
    }
    if (this.testInsertLinkError()) return false;
    if (window.radioBtns['lb_link_type'].val == 1) {
      var text = box.lb_link_text.value;
      ajax.post('wiki.php', {
        act: 'link_save_item',
        note: this.params.note,
        selected: val('lb_link_items'),
        custom: val('lb_link_items_custom'),
        title: text,
        oid: this.params.oid
      }, {
        onDone: (function(url, custom) {
          box.hide();
          var newLinkElem = this.frameDoc.createElement('A');
          newLinkElem.href = url;
          newLinkElem.alt = url, newLinkElem.title = url;
          if (!text) {
            text = custom;
          }
          this.setInnerText(newLinkElem, text);
          if (browser.msie) {
            this.frameWin.focus();
            this.currRange.pasteHTML('');
          } else {
            this.currRange.deleteContents();
          }
          if (linkElem != undefined) {
            linkElem.parentNode.replaceChild(newLinkElem, linkElem);
          } else {
            this.insertNodeFunc(newLinkElem, this.currRange);
          }
          this.setElemFocus(newLinkElem);
        }).bind(this),
        showProgress: box.showPorgress,
        hideProgress: box.hidePorgress,
      });
      return true;
    }

    box.hide();
    var newLinkElem = this.frameDoc.createElement('A');
    if ((url.indexOf(this.vk) != 0) && (url.indexOf(this.vkcom) != 0) && !(/[a-z-]\.(vkontakte\.ru|vk\.com)/).test(url)) {
      newLinkElem.className = 'outer';
    }
    if (popup) {
      var matches = null;
      if ((matches = url.match(/(vkontakte\.ru|vk\.com)\/pages.php\?o=-(\d+)&p=(.*)/i)) ||
          (matches = url.match(/(vkontakte\.ru|vk\.com)\/pages\?oid=-(\d+)&p=(.*)/i))) {
        url = 'javascript:wikiBox.loadPage(' + matches[2] + ', \'' + decodeURIComponent(matches[3]) + '\').show();';
      } else if (matches = url.match(/(vkontakte\.ru|vk\.com)\/page-(\d+)_(\d+)/i)) {
        url = 'javascript:wikiBox.loadPage(' + matches[2] + ', ' + matches[3] + ', true).show();';
      }
      newLinkElem.href = url;
    } else {
      newLinkElem.href = url;
    }
    newLinkElem.alt = url, newLinkElem.title = url;
    if (text == '') {
      this.setInnerText(newLinkElem, url);
      newLinkElem.setAttribute('notext', 'yes');
    }
    else this.setInnerText(newLinkElem, text);
    if (browser.msie) {
      this.frameWin.focus();
      this.currRange.pasteHTML('');
    } else {
      this.currRange.deleteContents();
    }
    if (linkElem != undefined) {
      linkElem.parentNode.replaceChild(newLinkElem, linkElem);
    } else {
      this.insertNodeFunc(newLinkElem, this.currRange);
    }
    this.setElemFocus(newLinkElem);
  },
  getRangeText: function() {
    var range = this.getRange(), text = '';
    if (browser.msie) {
        if (range.text != '') {
          text = range.text;
        }
    } else {
      if (range.toString() != '') {
        text = range.toString();
      }
    }
    return text;
  },
  actLink: function(loaded) {
    var notes = this;
    var box = this.linkBox;
    if (isVisible('lb_link_box')) {
      checkbox(ge('lb_link_box'), false);
      hide(ge('lb_link_box_tr'));
    }
    if (box == undefined || box.loaded == undefined || !loaded) {
      //box.setOptions({ onLoad: function() { box.loaded = true; this.actLink(); }.bind(this) });
      this.linkBox = showBox('wiki.php', {act: 'link_box', al_wiki_editor: true, note: this.params.note, oid: this.params.oid || 0}, {
        params: {width: 440},
        stat: ['ui_controls.js', 'ui_controls.css'],
        onDone: function() {
          notes.linkBox.loaded = true;
          notes.actLink(true);
        }
      });
      //box.loadContent('wiki.php', { act: 'link_box' }, false);
      return null;
    }
    if (box.init == undefined) {
      this.extendObj(this.linkBox, ['lb_link_text', 'lb_link_url', 'lb_error', 'lb_link_box']);
      box.init = true;
    }
    box.showError = false;
    hide(box.lb_error);
    fadeTo(box.lb_error, 1, 0, null);

    this.frameWin.focus();
    var linkElem = this.getParentElement('A');
    box.removeButtons();
    box.addButton(cur.lang.box_cancel, function() { box.hide(); }, 'gray');
    box.lb_link_text.value = '', box.lb_link_url.value = 'http://';
    var selectedText = this.getRangeText();
    if (linkElem != null) {
      box.setOptions({ title: cur.lang.wiki_edit_link });
      box.addButton(cur.lang.wiki_edit, function() { notes.insertLink(linkElem); });
      box.lb_link_text.value = this.getInnerText(linkElem);
      var hrefRaw = this.decURI(linkElem.href);
      var processedUrl = null;
      if (hrefRaw.indexOf('wikiBox.loadPage') != -1) {
        var regexp = /wikiBox\.loadPage\((\d+), '(.*?)'\)/i
        var regexpById = /wikiBox\.loadPage\((\d+), (\d+), true\)/i
        var matches = hrefRaw.match(regexp);
        if (matches != null) {
          var processedUrl = this.vk + 'pages?oid=-' + matches[1] + '&p=' + this.encURI(matches[2]);
        } else if (matches = hrefRaw.match(regexpById)) {
          var processedUrl = this.vk + 'page-' + matches[1] + '_' + matches[2];
        }
      }
      if (hrefRaw.indexOf('vkontakte.ru/page') != -1 || hrefRaw.indexOf('vk.com/page') != -1 || processedUrl) {
        //if (!ge('container1')) {
          //var needBox = new Checkbox(ge('lb_link_box'), { label: '', width: 160 });
          //ge('container1').needBox = ge('lb_link_box');
        //}
        show(ge('lb_link_box_tr'));
        if (processedUrl != null) {
          checkbox(ge('lb_link_box'), true);
        }
      }
      var href = this.decURI(linkElem.href), subHref = href.replace(this.vk, '').replace(this.vkcom, '');
      if (subHref.indexOf('http://') == 0) {
        box.lb_link_url.value = subHref;
      } else {
        box.lb_link_url.value = href;
      }
      if (processedUrl) {
        box.lb_link_url.value = processedUrl;
      }
    } else {
      box.setOptions({ title: cur.lang.wiki_adding_link });
      box.addButton(global_add, function() { notes.insertLink(); });

      box.lb_link_text.value = selectedText;
    }
    this.currRange = this.getRange();
    //box.show();
    this.unFocusIE();
    this.setInputFocusEnd(box.lb_link_text);
  },
  testInsertLinkError: function(errorNum) {
    var box = this.linkBox, error = null, url = trim(box.lb_link_url.value), text = trim(box.lb_link_text.value);
    if (window.radioBtns['lb_link_type'].val == 1) {
      if (!val('lb_link_items')) {
        notaBene(box.lbLinksItems.input);
        return true;
      }
    } else {
      if ((url == '') || (url == 'http://')) {
        error = [1, cur.lang.wiki_err_not_enter_link];
      } else if (url.indexOf('http://') == -1) {
        error = [2, cur.lang.wiki_err_link_start];
      } else if (!(/^http:\/\/([a-zа-яё0-9-]+\.)+[a-z]{2,6}/i).test(url)) {
        error = [3, cur.lang.wiki_err_bad_url];
      } /*else if ((/\s/).test(url)) {
        error = [4, cur.lang.wiki_err_white_space_in_url];
      } */else if ((text != '') && !(/^[\s0-9a-zа-яё!=#\?:&\/\.,_-]+$/i).test(text)) {
        error = [5, cur.lang.wiki_err_forbidden_chars_in_link_text];
      }
    }
    if (errorNum != undefined) {
      if ((error == null) || (error && (error[0] != errorNum))) {
        fadeTo(box.lb_error, this.showErrorTime, 0, function() { hide(box.lb_error); box.showError = false; });
      }
      return null;
    }
    if (error != null) {
      if (!box.showError) {
        box.lb_error.innerHTML = error[1];
        box.showError = true;
        show(box.lb_error);
        fadeTo(box.lb_error, this.showErrorTime, 1, null);
      } else {
         box.lb_error.innerHTML = error[1];
      }
      return true;
    }
    return false;
  },
  linkFix: function(e) {
    if (this.nodeList['A']) {
      var linkElem = this.getParentElement('A');
      if (linkElem && (e.keyCode == KEY.ENTER)) {
        var range = this.getRange().cloneRange();
        range.setStartBefore(range.commonAncestorContainer);
        var startOffset = range.toString().length;
        if (startOffset == 0) {
          var p = this.frameDoc.createElement('P');
          p.innerHTML = '<br>';
          linkElem.parentNode.insertBefore(p, linkElem);
          return cancelEvent(e);
        }
      } else if (linkElem && (e.keyCode == KEY.RIGHT)) {
        var offsets = this.getElemOffsets(linkElem);
        if (offsets.endOffset) {
          this.setElemFocus(linkElem);
          var textNode = this.frameDoc.createTextNode('\uFEFF');
          if (linkElem.nextSibling) {
            var n = linkElem.nextSibling;
            if ((n.nodeType != 3) || ((n.nodeType == 3) && (trim(n.nodeValue) == ''))) {
              linkElem.parentNode.insertBefore(textNode, linkElem.nextSibling);
            }
          } else {
            linkElem.parentNode.appendChild(textNode);
          }
        }
      }
    }
  },
  actUnLink: function() {
    var linkElem = this.getParentElement('A');
    var deleteLink = function() {
      var linkText = this.frameDoc.createTextNode(this.getInnerText(linkElem));
      linkElem.parentNode.replaceChild(linkText, linkElem);
      this.frameWin.focus();
      this.getFormat();
    }
    if (linkElem != null) {
      this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_warning_delete_link, cur.lang.box_yes, cur.lang.box_cancel, deleteLink.bind(this), null);
    }
  },
  /* ***************************
      Signature and Time
  *************************** */
  actTime: function(signCallback) {
    if (this.timer != null) {
      return false;
    }
    var zero = function(val) {
      var str = val.toString();
      str = (str.length == 1) ? ('0' + str) : str;
      return str;
    }
    var onReady = function(responseText) {
      var serverTime = responseText;
      var unixDate = new Date(serverTime * 1000);
      var time = zero(unixDate.getHours()) + ':' + zero(unixDate.getMinutes());
      var date = zero(unixDate.getDate()) + '.' + zero(unixDate.getMonth() + 1) + '.' + unixDate.getFullYear();
      var formatDate = time + ' ' + date + ' MSK';
      if (signCallback) {
        signCallback.call(this, formatDate);
      } else {
        this.frameWin.focus();
        if (browser.msie) {
          var range = this.getRange();
          range.pasteHTML(formatDate);
        } else {
          this.frameDoc.execCommand('InsertHtml', false, formatDate);
        }
      }
      this.timer = setTimeout(function() { this.timer = null; }.bind(this), 1000);
    }
    ajax.post('wiki.php', {act: 'get_server_time'}, {
      onDone: onReady.bind(this)
    });
  },
  actSignature: function(date) {
    if (this.params.userID && this.params.userName) {
      if (!date) {
        this.actTime(this.actSignature);
        return false;
      }
      var span = this.frameDoc.createElement('SPAN');
      span.className = 'signature';
      span.innerHTML = '<a href="/id' + this.params.userID + '">' + this.params.userName + '</a>&nbsp;' + date ;
      this.frameWin.focus();
      this.insertNodeFunc(span, this.getRange());
    }
  },
  /* ***************************
               Audio
  *************************** */
  insertAudio: function(audioID, performer, title, duration) {
    var audioTable = this.createAudioTable(audioID, performer, title, duration);
    this.insertNodeFunc(audioTable, this.currRange);
    this.chooseAudioBox.hide();
  },
  createAudioInput: function(audioID, audioText) {
    var audioInput = this.frameDoc.createElement('INPUT');
    audioInput.type = 'text';
    audioInput.setAttribute('readonly', 'readonly');
    audioInput.className = 'wk_audio';
    audioInput.setAttribute('wiki', 'audio' + audioID);
    audioInput.value = audioText;
    return audioInput;
  },
  createAudioTable: function(audioID, performer, title, duration) {
    var playSrc = 'http://' + locDomain + '/images/play.gif', ac = '';
    ac += '<table class="wk_audio" wiki="audio' + audioID + '">';
    ac += '<tr>';
    ac += '<td class="imgButton"><img src="' + playSrc + '" id="imgbutton' + audioID + '"></td>';
    ac += '<td class="title"><b>' + performer + '</b> &ndash; ' + title + '</td>';
    ac += '<td class="duration">' + duration + '</td>';
    ac += '</tr>';
    ac += '<tr>';
    ac += '<td>&nbsp;</td>';
    ac += '<td>';
    ac += '<div id="line' + audioID + '" class="line"></div>';
    ac += '</td>';
    ac += '<td>&nbsp;</td>';
    ac += '</tr>';
    ac += '</table>';
    var div = this.frameDoc.createElement('DIV');
    div.innerHTML = ac;
    var table = div.firstChild;
    var self = this;
    addEvent(table, 'click', function(e) { self.selectElement.call(self, this); return cancelEvent(e); });
    table.unselectable = 'on';
    var tableChilds = table.getElementsByTagName('*');
    each(tableChilds, function(i, obj) { obj.unselectable = 'on'; });
    var img = table.getElementsByTagName('IMG')[0];
    return table;
  },
  chooseAudio: function() {
    this.chooseAudioBox = showBox('audio.php', {act: 'a_choose_audio_box', al_wiki_editor: true, scrollbar_width: window.sbWidth()});
    this.frameWin.focus();
    this.currRange = this.getRange();
    this.unFocusIE();

    /*var box = this.chooseAudioBox;
    if (this.nodeList['TABLE'] && (this.nodeList['TABLE'].classes['wikiAudio'] || this.nodeList['TABLE'].classes['wk_audio'])) {
      var nodes = this.nodeList['TABLE'].nodes, audioElem = null;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].className == 'wikiAudio' || nodes[i].className == 'wk_audio') {
          audioElem = nodes[i];
          break;
        }
      }
      var deleteAudioFunc = function() {
        if (audioElem) {
          audioElem.parentNode.removeChild(audioElem);
        }
        this.frameWin.focus();
        this.getFormat();
      }
      this.alertBox(cur.lang.wiki_warning, cur.lang.wiki_delete_audio, cur.lang.box_yes, cur.lang.box_cancel, deleteAudioFunc.bind(this), null);
      if (audioElem) return false;
    }
    box.show();
    if (box.loaded == undefined) {
      box.setOptions({ onLoad: function() { box.loaded = true; this.chooseAudio(); }.bind(this) });
      box.loadContent('audio.php', { act: 'a_choose_audio_box', scrollbar_width: window.sbWidth() }, true, 'height: 412px;');
      return null;
    }
    this.frameWin.focus();
    this.currRange = this.getRange();
    this.unFocusIE();*/
  },

  /* ***************************
               Docs
  *************************** */
  chooseDoc: function() {
    this.chooseDocBox = showBox('docs.php', {act: 'a_choose_doc_box', al_wiki_editor: true}, {stat: ['docs.css']});
    this.frameWin.focus();
    this.currRange = this.getRange();
    this.unFocusIE();
    cur.chooseMedia = this.insertDoc.bind(this);
  },

  insertDoc: function(type, docRaw, data) {
    if (data[1]) {
      var html = '<a href="/doc'+docRaw+'" target="_blank"><div class="wk_doc_thumb"><img src="'+data[1]+'" align="center"></div><div class="wk_doc_thumb_hint">'+data[0]+'</div></a>';
    } else {
      var html = '<a class="lnk" href="/doc'+docRaw+'" target="_blank">\
    <b class="fl_l wk_doc_icon"></b>'+cur.lang.wiki_add_doc_text+' <span class="a">'+data[0]+'</span></a>';
    }

    var obj = ce('div', {
      className: 'wk_doc',
      innerHTML: html
    });
    obj.setAttribute('wiki', 'doc'+docRaw);

    this.insertNodeFunc(obj, this.currRange);

    this.chooseDocBox.hide();
  },
  /* ***************************
     Convert To Wiki Methods
  *************************** */
  setCut: function(maxHeight, offset) {
    var childs = this.frameDoc.body.childNodes, currHeight = 0, bCut = this.frameDocCut, cutElem = null;
    bCut.body.innerHTML = '';
    this.frameDoc.body.innerHTML = this.frameDoc.body.innerHTML.replace(/<!--[\s\S]+?-->/, '');
    var div = bCut.createElement('DIV');
    div.style.border = '1px solid red';
    bCut.body.appendChild(div);
    for (var i = 0; i < childs.length; i++) {
      div.appendChild(childs[i].cloneNode(true));
      if ((div.offsetHeight > maxHeight) && (cutElem == null)) {
        currHeight = div.offsetHeight;
        nextElem = childs[i].nextSibling;
        if (nextElem) {
          cutElem = childs[i];
        }
      }
    }
    if (cutElem && ((currHeight + offset) < div.offsetHeight)) {
      var cutComment = this.frameDoc.createComment('CUT');
      cutElem.parentNode.insertBefore(cutComment, cutElem.nextSibling);
    }
  },
  setCutIE: function(maxHeight, offset) {
    var currHeight = 0, bCut = this.frameDocCut, cutElem = null;
    bCut.body.innerHTML = '';
    this.frameDoc.body.innerHTML = this.frameDoc.body.innerHTML.replace(/<!--[\s\S]+?-->/, '');
    var div = bCut.createElement('DIV');
    div.style.border = '1px solid red';
    bCut.body.appendChild(div);
    div.innerHTML = this.frameDoc.body.innerHTML;
    var divHeight = div.offsetHeight;
    var childs = div.childNodes;
    for (var i = childs.length; i > 0 ; i--) {
      if ((div.offsetHeight < maxHeight) && (cutElem == null)) {
        currHeight = div.offsetHeight;
        cutElem = i;
        break;
      } else if (childs[i]) {
        if ((divHeight > (maxHeight + offset)) && (i == 1) && (div.offsetHeight > maxHeight)) {
          currHeight = div.offsetHeight;
          cutElem = i;
        }
        div.removeChild(childs[i]);
      }
    }
    if ((div.offsetHeight > maxHeight) && (currElem == null) && (childs.length == 1) && ((div.offsetHeight + offset) < divHeight)) {
       currHeight = div.offsetHeight;
       cutElem = i;
    }
    if ((cutElem != null) && ((currHeight + offset) < divHeight)) {
      var cutComment = this.frameDoc.createComment('CUT'), childs = this.frameDoc.body.childNodes;
      var currElem = childs[cutElem];
      if (currElem.nextSibling) {
        currElem.parentNode.insertBefore(cutComment, currElem.nextSibling);
      }
    }
  },
  convertToWiki: function(noReplace) {
    if (this.params.cutHtml) {
      var cut = this.params.cutHtml;
      if (true || browser.msie) {
        this.setCutIE(cut.maxHeight, cut.offset);
      } else {
        this.setCut(cut.maxHeight, cut.offset);
      }
    }
    //c = c.replace(/<([a-z]+)><\/\1>/gi, '');
    if (!noReplace) {
      var html = this.frameDoc.body.innerHTML;
      html = html.replace(/\r\n|\r|\n/gi, '');
      this.frameDoc.body.innerHTML = trim(html);
    }
    this.wikiCode = this.categoryBox.wiki;
    this.newLine = '\n';
    this.convertOptions = new Object();
    var c = this.convertOptions;
    c.convertTags = ['B', 'I', 'U', 'S', 'SUB', 'SUP', 'BLOCKQUOTE', 'CODE', 'TT'];
    c.blockTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'LI', 'BR', 'TABLE'];
    c.centerTagsTest = ['P', 'DIV', 'TH', 'TD'];
    c.rightTagsTest = ['DIV'];
    c.headersTags = ['H1', 'H2', 'H3'];
    c.replaceTags = {
      STRIKE: { open: '<s>', close: '</s>' },
      EM: { open: '<i>', close: '</i>' },
      STRONG: { open: '<b>', close: '</b>' }
    };
    c.tableTags = {
      TABLE: { open: '{|', close: '|}', noBorder: 'noborder' },
      CAPTION: { open: '|+ ', close: '' },
      COL: { open: '|~', close: '' },
      TR: { open: '|-', close: '' },
      TH: { open: '! ', close: '' },
      TD: { open: '| ', close: '' }
    };
    var lastChild = this.frameDoc.body.lastChild;
    if (lastChild && (lastChild.nodeName == 'P') && (lastChild.innerHTML == '\uFEFF')) {
      lastChild.parentNode.removeChild(lastChild);
    }
    this.recursive(this.frameDoc.body);
    return this.wikiCode;
  },
  getWikiLink: function(node) {
    var linkWiki = '', innerLink = null, notext = false, url = this.decURI(node.href), innerUrl = '', text = '';
    var subURL = url.replace(this.vk, '').replace(this.vkcom, '');
    if (subURL.indexOf('http://') == 0) {
      url = subURL;
    }
    notext = node.getAttribute('notext');
    if (!notext) {
      text = trim(this.getInnerText(node));
    }
    if ((url.indexOf(this.vk) == 0) || (url.indexOf(this.vkcom) == 0) || (url.indexOf('javascript:wikiBox.loadPage') == 0)) {
      innerUrl = url.replace(this.vk, '').replace(this.vkcom, '');
      if (innerLink = innerUrl.match(/id[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/photo-?[0-9]+_[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/video-?[0-9]+_[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/club[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/topic-?[0-9]+_[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/note-?[0-9]+_[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/page-?[0-9]+_[0-9]+/i)) {
      } else if (innerLink = innerUrl.match(/wikiBox\.loadPage\((\d+), '(.*?)'\)/i)) {
        var groupID = parseInt(innerLink[1]); pGroupID = this.params.groupID, group = '', pageName = innerLink[2];
        if (text != '') text = '|box|' + text;
        if (pGroupID && (pGroupID != groupID)) {
          group = 'club' + groupID + ':';
        }
        linkWiki = '[[' + group + pageName + text + ']]';
      } else if (innerLink = innerUrl.match(/wikiBox\.loadPage\((\d+), (\d+), true\)/i)) {
        var groupID = parseInt(innerLink[1]); pGroupID = this.params.groupID, group = '', pageId = parseInt(innerLink[2]);
        if (text != '') text = '|box|' + text;
        if (pGroupID && (pGroupID == groupID)) {
          linkWiki = '[[page-' + groupID + '_' + pageId + text + ']]';
        }
      } else if ((innerLink = innerUrl.match(/pages\.php\?o=-?([0-9]+)&p=(.+)/i)) ||
                 (innerLink = innerUrl.match(/pages\?oid=-?([0-9]+)&p=(.+)/i))) {
        var groupID = parseInt(innerLink[1]), pGroupID = this.params.groupID, group = '', pageName = innerLink[2];
        if (text == pageName) text = '';
        if (text != '') text = '|' + text;
        if (pGroupID && (pGroupID != groupID)) {
          group = 'club' + groupID + ':';
        }
        if (pageName.indexOf('%') != -1) {
          pageName = this.decURI(pageName);
        }
        linkWiki = '[[' + group + pageName.replace(/\+/g, ' ') + text + ']]';
      } else if (innerLink = innerUrl.match(/pages\.php\?p=([\s\S]+)/i)) {
        var pageName = trim(innerLink[1]);
        if (pageName == text) {
          linkWiki = '[[' + pageName + ']]';
        } else {
          if (text == pageName) text = '';
          if (text != '') text = '|' + text;
          linkWiki = '[[' + pageName + text + ']]';
        }
      }
      if (innerLink != null) {
        url = innerLink;
      }
    }
    if (innerLink) {
      leftBrake = '[[', rightBrake = ']]';
    } else {
      leftBrake = '[', rightBrake = ']';
    }
    if (text == url) {
      text = '';
    }
    if (text != '') {
      text = '|' + text;
    }
    if (linkWiki == '') {
      linkWiki = leftBrake + url + text + rightBrake;
    }
    return linkWiki;
  },
  getWikiPhoto: function(node) {
    var photoWiki = '';
    if (node.id && (node.id.indexOf('photo') == 0)) {
      var params = this.images[node.id.replace('photo', '')];
      if (!params) {
        return '';
      }
      photoWiki = '[[photo' + params.photoID + '|' + params.width + 'x' + params.height + 'px';
      if (!params.useBorder) {
        photoWiki += ';noborder';
      }
      if (params.boxView) {
        photoWiki += ';box';
      }
      if (params.url == '') {
        photoWiki += ';nolink';
        if (params.text == '') {
          photoWiki += '| ]]';
        }
      } else if (params.text == '') {
        if (('photo' + params.photoID) == params.url) {
          photoWiki += '| ]]';
        } else {
          photoWiki += '|' + params.url + ']]';
        }
      }
      if (params.text != '') {
        photoWiki += '|' + params.text + ']]';
      }
    }
    return photoWiki;
  },
  getNodeLevel: function(node) {
    var level = 1, parent = node;
    while (parent.nodeName != 'BODY') {
      parent = parent.parentNode;
      if (parent.nodeName == node.nodeName) level++;
    }
    return level;
  },
  repeatString: function(str, repeatCount) {
    var result = '';
    for (var i = 0; i < repeatCount; i++) {
      result += str;
    }
    return result;
  },
  testLeft: function(node) {
    if ((node.getAttribute('align') == 'left') || (node.style.textAlign == 'left')) return true;
    return false;
  },
  testCenter: function(node) {
    if ((node.getAttribute('align') == 'center') || (node.style.textAlign == 'center')) return true;
    return false;
  },
  testRight: function(node) {
    if ((node.getAttribute('align') == 'right') || (node.style.textAlign == 'right') || (hasClass(node, 'wk_right') && !node.style.textAlign)) return true;
    return false;
  },
  testGray: function(node) {
    if (!node.getAttribute) return false;
    if (!node.getAttribute('style')) return false;
    if (node.style.color.indexOf('rgb(119, 119, 119)') != -1 || node.style.color.indexOf('#777') != -1) return true;
    return false;
  },
  getWikiHeader: function(node) {
    var result = '', headerText = this.getInnerText(node);
    headerText = this.replaceSpecialChars(headerText.replace(/\r\n|\r|\n/gi, ''));
    switch (node.nodeName) {
      case 'H1': result = '== ' + headerText + ' =='; break;
      case 'H2': result = '=== ' + headerText + ' ==='; break;
      case 'H3': result = '==== ' + headerText + ' ===='; break;
    }
    return result;
  },
  getWikiAudio: function(node) {
    return '[[' + node.getAttribute('wiki') + ']]';
  },
  getWikiDoc: function(node) {
    return '[[' + node.getAttribute('wiki') + ']]';
  },
  getWikiVideo: function(node) {
    var wiki = node.getAttribute('wiki');
    if (wiki) {
      return '[[' + node.getAttribute('wiki') + ']]';
    } else {
      var params = this.videos[node.id.replace('video', '')];
      var videoWiki = '[[video' + params.videoID;
      if (params.text != '') {
        videoWiki += '|' + params.text + ']]';
      } else {
        videoWiki += ']]';
      }
    }
  return videoWiki;
  },
  replaceSpecialChars: function(str) {
    var res = str;
    res = res.replace(/#/g, '&#35;').replace(/\*/g, '&#42;');
    res = res.replace(/</g, '&#60;').replace(/>/g, '&#62;');
    res = res.replace(/\[/g, '&#91;').replace(/]/g, '&#93;');
    res = res.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    res = res.replace(/=/g, '&#61;').replace(/~/g, '&#126;');
    res = res.replace(/\|/g, '&#124;').replace(/!/g, '&#33;');
    return res;
  },
  testNewLine: function(text) {
    if (text.length == 0) return true;
    if (text.substr(text.length - 1) == '\n') return true;
    return false;
  },
  addWikiText: function(str) {
    this.wikiCode += str;
    if (this.debug) {
      this.replaceElem.value = this.wikiCode;
    }
  },
  getWikiHider: function(node) {
    this.inHider = true;
    this.newLine = '<br/>';
    if (!this.testNewLine(this.wikiCode)) this.addWikiText('\n');
    var hiderHeader = node.rows[0].cells[1].innerHTML;
    hiderHeader = hiderHeader.replace(/<br.*?>/gi, 't8vb_ec63N_1');
    hiderHeader = this.replaceSpecialChars(hiderHeader).replace(/t8vb_ec63N_1/g, '<br/>');
    var hiderBody = node.rows[1].cells[0];
    this.addWikiText('{{Hider|' + hiderHeader.replace(/(<br\/>)+/gi, '<br/>') + '\n');
    this.recursive(hiderBody);
    if (!this.testNewLine(this.wikiCode)) this.addWikiText('\n');
    this.addWikiText('}}\n');
    this.inHider = false;
    this.newLine = '\n';
  },
  getWikiPre: function(node) {
    var body = node.getElementsByTagName('TD')[0];
    body.innerHTML = body.innerHTML.replace(/<br>/gi, '\n').replace('\uFEFF', '');
    var result = '<pre>' + this.getInnerText(body) + '</pre>';
    return result;
  },
  testNodeStyle: function(node, styleName, styleValue, tag) {
    if (node.style[styleName] == styleValue) return tag;
    return '';
  },
  recursive: function(node) {
    var c = this.convertOptions;
    if (node.nodeType == 3) { // TextNode
      if (trim(node.nodeValue) == '') return false;
      this.addWikiText(this.replaceSpecialChars(node.nodeValue));
    } else if (node.nodeType == 8) { // Comment
      if (node.data == 'CUT') {
        this.addWikiText('<!-- ' + node.data + ' -->');
      }
    } else {
      var viewChilds = true;
      if ((node.nodeName == 'TABLE') && (node.className.indexOf('hider') != -1)) {
        this.inHider = true;
        this.getWikiHider(node);
        return false;
      }
      if ((node.nodeName == 'TABLE') && ((node.className == '') || (node.className.indexOf('wikiTable') != -1) || (node.className.indexOf('wk_table') != -1))) {
        if (!this.testNewLine(this.wikiCode)) this.addWikiText('\n');
        this.inTable = true;
        this.newLine = '<br/>';
      }
      if (node.nodeName == 'UL') this.listTag = '*';
      else if (node.nodeName == 'OL') this.listTag = '#';
      else if (this.inArray(node.nodeName, c.convertTags)) this.addWikiText('<' + node.nodeName.toLowerCase() + '>');
      else if (c.replaceTags[node.nodeName]) this.addWikiText(c.replaceTags[node.nodeName].open);
      else if (this.inTable && c.tableTags[node.nodeName] && ((node.className == '') || (node.className.indexOf('wikiTable') != -1) || (node.className.indexOf('wk_table') != -1))) {
        if (!this.testNewLine(this.wikiCode)) this.addWikiText('\n');

        if (node.nodeName == 'COL') {
          if (!this.isColOpened) {
            this.isColOpened = true;
            this.currentCol = '';
          }
          if (node.style && node.style.width) {
            this.currentCol += node.style.width.replace('%', ' ');
          } else {
            this.currentCol += '0 ';
          }
        } else if (this.isColOpened) {
          this.isColOpened = false;
          this.addWikiText(c.tableTags['COL'].open + this.currentCol.substr(0, this.currentCol.length - 1));
          this.addWikiText('\n');
          this.addWikiText(c.tableTags[node.nodeName].open);
        } else {
          this.addWikiText(c.tableTags[node.nodeName].open);
          if (node.className.indexOf('wikiTableNoBorder') != -1 || node.className.indexOf('wk_table_no_border') != -1) {
            this.addWikiText(c.tableTags[node.nodeName].noBorder);
          }
        }
      }
      else if (node.nodeName == 'LI') {
        if (!this.testNewLine(this.wikiCode)) this.addWikiText('\n');
        this.addWikiText(this.repeatString(this.listTag, this.getNodeLevel(node.parentNode)) + ' ');
      }
      else if (node.nodeName == 'SPAN') {
        if (node.className.indexOf('signature') != -1) {
          this.addWikiText('~~~');
          viewChilds = false;
        } else {
          this.addWikiText(this.testNodeStyle(node, 'fontWeight', 'bold', '<b>'));
          this.addWikiText(this.testNodeStyle(node, 'textDecoration', 'underline', '<u>'));
          this.addWikiText(this.testNodeStyle(node, 'textDecoration', 'line-through', '<s>'));
        }
      }
      else if ((node.nodeName == 'IMG' || node.nodeName == 'A') && (node.className.indexOf('wikiPhoto') != -1
        || node.className.indexOf('wk_photo') != -1
        || node.className.indexOf('wk_photo_no_border') != -1)) {
        this.addWikiText(this.getWikiPhoto(node));
        return false;
      }
      else if (node.nodeName == 'A') {
        this.addWikiText(this.getWikiLink(node));
        return false;
      }
      else if ((node.nodeName == 'IMG') && (node.className.indexOf('wikiVideo') != -1 || node.className.indexOf('wk_video') != -1)) {
        this.addWikiText(this.getWikiVideo(node));
        return false;
      }
      else if (((node.nodeName == 'TABLE') || (node.nodeName == 'INPUT')) && (node.className.indexOf('wikiAudio') != -1 || node.className.indexOf('wk_audio') != -1)) {
        this.addWikiText(this.getWikiAudio(node));
        return false;
      }
      else if (node.nodeName == 'DIV' && node.className.indexOf('wk_doc') != -1) {
        this.addWikiText(this.getWikiDoc(node));
        return false;
      }
      else if ((node.nodeName == 'TABLE') && (node.className.indexOf('pre') != -1)) {
        this.addWikiText(this.getWikiPre(node));
        return false;
      }
      else if (this.inArray(node.nodeName, c.headersTags)) {
        if (!this.testNewLine(this.wikiCode)) this.addWikiText('\n');
        this.addWikiText(this.getWikiHeader(node));
        viewChilds = false;
      }
      if (this.inArray(node.nodeName, c.centerTagsTest)) this.addWikiText(this.testCenter(node) ? '<center>' : '');
      if (this.inArray(node.nodeName, c.rightTagsTest)) this.addWikiText(this.testRight(node) ? '<right>' : '');
      if (node.nodeName == 'SPAN') this.addWikiText(this.testGray(node) ? '<gray>' : '');
      /* Recurcia */
      if (viewChilds) {
        for (var i = 0; i < node.childNodes.length; i++) {
          this.recursive(node.childNodes[i]);
        }
      }
      /* \Recurcia */
      if (this.inTable && c.tableTags[node.nodeName]) {
        if ((c.tableTags[node.nodeName] != '' ) && !this.testNewLine(this.wikiCode)) this.addWikiText('\n');
        this.addWikiText(c.tableTags[node.nodeName].close);
      }
      if ((node.nodeName == 'TABLE') && ((node.className == '') || (node.className.indexOf('wikiTable') != -1) || (node.className.indexOf('wk_table') != -1))) {
        this.inTable = false;
        this.newLine = '\n';
      }
      var center = this.testCenter(node);
      var right = this.testRight(node);
      var gray = this.testGray(node);
      if (this.inArray(node.nodeName, c.rightTagsTest)) this.addWikiText(right ? '</right>' : '');
      if (this.inArray(node.nodeName, c.centerTagsTest)) this.addWikiText(center ? '</center>' : '');
      if (node.nodeName == 'SPAN') this.addWikiText(gray ? '</gray>' : '');
      if (this.inArray(node.nodeName, c.convertTags)) this.addWikiText('</' + node.nodeName.toLowerCase() + '>');
      if (c.replaceTags[node.nodeName]) this.addWikiText(c.replaceTags[node.nodeName].close);
      if (node.nodeName == 'SPAN') {
        this.addWikiText(this.testNodeStyle(node, 'fontWeight', 'bold', '</b>'));
        this.addWikiText(this.testNodeStyle(node, 'textDecoration', 'underline', '</u>'));
        this.addWikiText(this.testNodeStyle(node, 'textDecoration', 'line-through', '</s>'));
      }
      if (node == node.parentNode.lastChild) return false;
      if (this.inArray(node.nodeName, c.blockTags) && !center && !right && !gray) this.addWikiText(this.newLine);
    }
  },
  /* ***************************
          Html To Html
  *************************** */
  HtmlToHtml: function(html, wiki) {
    if (this.frameDoc.body == null) {
      setTimeout(function() { this.HtmlToHtml(html, wiki); }.bind(this), 100);
      return false;
    }
    this.htmlSetContent(html);
    this.htmlCenterReplace();
    this.htmlListReplace('UL');
    this.htmlListReplace('OL');
    this.htmlTableCellSetSpace('TD');
    this.htmlTableCellSetSpace('TH');
    this.htmlRemoveLiSpan();
    this.htmlCategoryGetInfo(wiki);
    try {
      this.htmlPhotoGetInfo(wiki);
      this.htmlAudioGetInfo(wiki);
      this.htmlVideoGetInfo(wiki);
    } catch (error) {
    }
    this.htmlRemoveAnchors();
    this.htmlReplaceLinks();
    this.htmlHiderReplace();
    this.htmlRemoveWhiteSpace(this.frameDoc.body);
    this.htmlRemoveLastBr();
    this.htmlDivHeaderReplace();

    this.setDocOptions();
    setTimeout(function() { this.setDocOptions(); }.bind(this), 300)
  },
  preReplaceFunc: function(content) {
    if (trim(content) == '') return '';
    var result = '<table class="pre"><tr><td>' + this.replaceSpecialChars(content) + '</td></tr></table>';
    return result;
  },
  htmlSetContent: function(html) {
    var c = html.replace(/href=([\"\'])(.+?)\1/gi, function(a, b, c) { return 'href="' + this.encURI(this.decURI(c)) + '"' }.bind(this));
    c = c.replace(/<!--[\s\S]*?-->/gi, '');
    c = c.replace(/<\/?nowiki>/gi, function(nowiki) { return nowiki.replace(/nowiki/gi, 'pre') });
    c = c.replace(/<pre>[\s\S]*?<\/pre>/gi, function(pre) { return pre.replace(/\n/gi, 'z98_7n_op1') });
    c = c.replace(/\r\n|\r|\n/gi, '');
    c = c.replace(/<pre>([\s\S]*?)<\/pre>/gi, function(a, b) { return this.preReplaceFunc(b) }.bind(this));
    c = c.replace(/z98_7n_op1/gi, '<br>');
    this.images = new Array();
    this.frameDoc.body.innerHTML = c;
  },
  htmlRemoveWhiteSpace: function(node) {
    var childs = node.childNodes;
    for (var i = 0; i < childs.length; i++) {
      if ((childs[i].nodeType == 3) && (trim(childs[i].nodeValue) == '')) {
        childs[i].parentNode.removeChild(childs[i]);
      } else {
        this.htmlRemoveWhiteSpace(childs[i]);
      }
    }
  },
  htmlRemoveLastBr: function() {
    var brs = this.frameDoc.body.getElementsByTagName('BR');
    var brsLength = brs.length, index = 0;
    for (var i = 0; i < brsLength; i++) {
      if (brs[index] == brs[index].parentNode.lastChild) {
        brs[index].parentNode.removeChild(brs[index]);
      }
      else index++;
    }
  },
  htmlCenterReplace: function() {
    var center = this.frameDoc.getElementsByTagName('CENTER');
    var centerLength = center.length;
    for (var i = 0; i < centerLength; i++) {
      var p = this.frameDoc.createElement('P');
      p.innerHTML = center[0].innerHTML;
      p.setAttribute('align', 'center');
      center[0].parentNode.replaceChild(p, center[0]);
    }
  },
  htmlListReplace: function(listType) {
    var list = this.frameDoc.getElementsByTagName(listType);
    for (var i = 0; i < list.length; i++) {
      var parent = list[i];
      while (parent.parentNode.nodeName != 'BODY') {
        if (parent.nodeName == 'LI') {
          var nextSibling = parent.nextSibling;
          parent.parentNode.insertBefore(list[i], nextSibling);
        }
        parent = parent.parentNode;
      }
    }
  },
  htmlTableCellSetSpace: function(cellType) {
    var cells = this.frameDoc.getElementsByTagName(cellType);
    var leftAlign = false;
    if (cellType == 'TH') leftAlign = true;
    for (var i = 0; i < cells.length; i++) {
      var val = trim(cells[i].innerHTML);
      if ((val == '') || (val == '\uFEFF')) cells[i].innerHTML = '\uFEFF';
      if (leftAlign) cells[i].setAttribute('align', 'left');
    }
  },
  htmlRemoveLiSpan: function() {
    var li = this.frameDoc.getElementsByTagName('LI');
    for (var i = 0; i < li.length; i++) {
      var span = li[i].getElementsByTagName('SPAN');
      if (span.length != 0) {
        li[i].innerHTML = span[0].innerHTML;
      }
    }
  },
  htmlCategoryGetInfo: function(wiki) {
    if (wiki) {
      var box = this.categoryBox;
      var categoryMatch = wiki.match(/\[\[category:(.+?)\|.+?]]/i);
      if (categoryMatch != null) {
        this.categoryTitle = categoryMatch[1];
        box.wiki = '[[category:' + categoryMatch[1] + ']]';
      }
      var subCategoryMatch = wiki.match(/\[\[subcategory:(.+?)\|.+?]]/i);
      if (subCategoryMatch != null) {
        this.subCategoryTitle = subCategoryMatch[1];
        box.wiki += '[[subcategory:' + subCategoryMatch[1] + ']]';
      }
    }
  },
  htmlPhotoGetInfo: function(wiki) {
    var self = this, defaultParams = { photoID: null, width: null, height: null, saveRatio: true, text: '', url: '', useBorder: false, useLink: false, boxView: false };
    var wikiPhotos = new Array(), images = new Array();
    var tags = this.frameDoc.getElementsByTagName('*');
    for (var i = 0; i < tags.length; i++) {
      if ((tags[i].nodeName == 'IMG' || tags[i].nodeName == 'A') && (tags[i].className.indexOf('wikiPhoto') != -1
        || tags[i].className.indexOf('wk_photo') != -1
        || tags[i].className.indexOf('wk_photo_no_border') != -1)) {
        wikiPhotos.push(tags[i]);
      } else if ((tags[i].nodeName == 'A') && ((tags[i].className.indexOf('wikiPhoto') != -1
        || tags[i].className.indexOf('wk_photo') != -1
        || tags[i].className.indexOf('wk_photo_no_border') != -1) || (/photo-?[0-9]+_[0-9]+/i).test(this.decURI(tags[i].href)))) {
        wikiPhotos.push(tags[i]);
      }
    }
    if (wiki == '') {
      for (var i = 0; i < wikiPhotos.length; i++) {
        var params = new Object();
        params = extend(params, defaultParams);
        var img = wikiPhotos[i], imgID = 'photo' + i;
        img.id = imgID;

        var photoWiki = img.getAttribute('wiki');
        if (photoWiki) {
          params.photoID = img.getAttribute('wiki').replace('photo', '');
        } else {
          var m = img.href.match(/\d+_\d+$/);
          params.photoID = m[0];
          img.setAttribute('wiki', 'photo'+params.photoID);
        }
        params.useLink = true;
        params.url = 'photo' + params.photoID;
        if (img.firstChild) {
          img = img.firstChild;
        }
        var size = getSize(img);
        params.width = img.width ? img.width : size[0];
        params.height = img.height ? img.height : size[1];
        images[i] = params;

        var func = function(imgID, ev) {
          self.photoSetup.call(self, imgID, false);
          return cancelEvent(ev)
        };
        addEvent(img, 'click', func.pbind(imgID));
      }
    } else {
      var photoPatternMatch = wiki.match(/\[\[photo-?[0-9]+_[0-9]+.*?]]/gi);
      if (photoPatternMatch != null) {
        for (var i = 0; i < photoPatternMatch.length; i++) {
          var params = new Object();
          params = extend(params, defaultParams);
          var img = null;
          if ((wikiPhotos[i].nodeName == 'A') && (wikiPhotos[i].firstChild.nodeName == 'IMG')) {
            img = wikiPhotos[i].firstChild;
            img.className = wikiPhotos[i].className;
            wikiPhotos[i].parentNode.replaceChild(img, wikiPhotos[i]);
          } else if (wikiPhotos[i].nodeName == 'IMG') {
            img = wikiPhotos[i];
          } else {
            wikiPhotos[i].className = 'wk_photo';
          }
          // id
          var photoIDMatch = photoPatternMatch[i].match(/\[\[photo(-?[0-9]+_[0-9]+)/);
          if (photoIDMatch != null) {
            params.photoID = photoIDMatch[1];
          }
          // width, height
          var photoFullSizeMatch = photoPatternMatch[i].match(/\|.*?([0-9]+)x([0-9]+)px.*?\|/i);
          if (photoFullSizeMatch != null) {
            params.width = photoFullSizeMatch[1];
            params.height = photoFullSizeMatch[2];
            if (img != null) {
              img.style.width = params.width + 'px';
              img.style.height = params.height + 'px';
            }
          } else {
            // width
            var photoWidthSizeMatch = photoPatternMatch[i].match(/\|.*?([0-9]+)px.*?\|/i);
            if (photoWidthSizeMatch != null) {
              params.width = photoWidthSizeMatch[1];
              params.height = img.height;
            } else if (img != null) {
              params.width = img.width;
              params.height = img.height;
            }
            params.saveRatio = true;
          }
          // text
          var photoTextMatch = photoPatternMatch[i].match(/.+\|(.+?)]]/i);
          if (photoTextMatch != null) {
            params.text = trim(photoTextMatch[1]);
          }
          // options
          if (!(/\|.*?nolink.*?\|/i).test(photoPatternMatch[i])) {
            var array = ['id[1-9][0-9]*', 'club[1-9][0-9]*', 'photo-?[0-9]+_[0-9]+', 'video-?[0-9]+_[0-9]+', 'topic', 'page(-?[0-9]+_)?[0-9]+', 'event[1-9][0-9]*', 'http://'];
            for (var j = 0; j < array.length; j++)
            {
              var regExp = new RegExp(array[j], "i");
              if (regExp.test(params.text))
              {
                params.url = params.text;
                params.text = '';
                break;
              }
            }
            if (params.url == '') {
              params.url = 'photo' + params.photoID;
            }
            params.useLink = true;
          }
          if (!(/\|.*?noborder.*?\|/i).test(photoPatternMatch[i])) {
            params.useBorder = true;
          }
          if ((/\|.*?box.*?\|/i).test(photoPatternMatch[i])) {
            params.boxView = true;
          }
          images[i] = params;
          var id = 'photo' + i;
          var func = function(imgID) { return function() { self.photoSetup.call(self, imgID, false) } };
          var closureFunc = func(id);
          if (img != null) {
            img.id = id;
            addEvent(img, 'click', closureFunc);
            if (params.useLink && (img.className == 'wikiPhoto' || img.className == 'wk_photo' || img.className == 'wk_photo_no_border')) {
              addEvent(img, 'mouseover', function() { addClass(this, 'hover'); });
              addEvent(img, 'mouseout', function() { removeClass(this, 'hover'); });
            }
          } else {
            wikiPhotos[i].id = id;
            addEvent(wikiPhotos[i], 'click', closureFunc);
          }
        }
      }
    }
    this.images = images;
  },
  htmlAudioGetInfo: function(wiki) {
    if (wiki) {
      var audioPatternMatch = wiki.match(/\[\[audio-?[0-9]+_[0-9]+]]/gi);
      if (audioPatternMatch != null) {
        var audioArray = new Array();
        for (var i = 0; i < audioPatternMatch.length; i++) {
          var matches = audioPatternMatch[i].match(/-?[0-9]+_[0-9]+/);
          audioArray.push(matches[0]);
        }
        var divs = this.frameDoc.getElementsByTagName('DIV');
        var divsLength = divs.length, index = 0, audioIndex = 0;
        for (var i = 0; i < divsLength; i++) {
          if (divs[index] && (divs[index].className.toLowerCase() == 'audio' || divs[index].className.toLowerCase() == 'audiorow')) {
            var audioText = '', tags = divs[index].getElementsByTagName('*');
            for (var j = 0; j < tags.length; j++) {
              if (tags[j].id.indexOf('performer') != -1) {
                var performer = tags[j].innerHTML;
              } else if (tags[j].tagName == 'B' && tags[j].firstChild.tagName == 'A') {
                var performer = tags[j].firstChild.innerHTML;
              }
              if (tags[j].id.indexOf('title') != -1) {
                var title = tags[j].innerHTML;
              }
              if (tags[j].className.indexOf('duration') != -1) {
                var duration = tags[j].innerHTML;
              }
            }
            var audioTable = this.createAudioTable(audioArray[audioIndex], performer, title, duration);
            audioIndex++;
            divs[index].parentNode.replaceChild(audioTable, divs[index]);
          } else {
            index++;
          }
        }
      }
    }
  },
  htmlVideoGetInfo: function(wiki) {
    var videoPatternMatch = wiki.match(/\[\[video-?[0-9]+_[0-9]+.*?]]/gi);
    var wikiVideos = new Array();
    var tags = this.frameDoc.getElementsByTagName('*');
    for (var i = 0; i < tags.length; i++) {
      if ((tags[i].nodeName == 'A') && (tags[i].className == 'wikiVideo' || tags[i].className == 'wk_video')) {
        wikiVideos.push(tags[i]);
      }
    }
    if (videoPatternMatch != null) {
      var videos = new Array();
      for (var i = 0; i < wikiVideos.length; i++) {
        var params = { videoID: null, text: '' };
        var thumb = wikiVideos[i].firstChild;
        if (videoPatternMatch[i]) {
          // id
          var videoIDMatch = videoPatternMatch[i].match(/\[\[video(-?[0-9]+_[0-9]+)/);
          if (videoIDMatch != null) params.videoID = videoIDMatch[1];
          // text
          var videoTextMatch = videoPatternMatch[i].match(/.+\|(.+?)]]/i);
          if (videoTextMatch != null) params.text = trim(videoTextMatch[1]);
        }
        var img = this.createVideoObj('video' + params.videoID, thumb.src, thumb.alt);
        wikiVideos[i].parentNode.replaceChild(img, wikiVideos[i]);
        videos[i] = params;
        var id = 'video' + i;
        var func = function(videoID) { return function() { /*self.actVideo.call(self, videoID)*/ } };
        var closureFunc = func(id);
        if (img != null) {
          img.id = id;
          addEvent(img, 'click', closureFunc);
        }
      }
      this.videos = videos;
    }
  },
  htmlRemoveAnchors: function() {
    var links = this.frameDoc.body.getElementsByTagName('A');
    var linksLength = links.length;
    var index = 0;
    for (var i = 0; i < linksLength; i++) {
      if ((links[index].name != '') && (links[index].href == '')) {
        links[index].parentNode.removeChild(links[index]);
      } else {
        index++;
      }
    }
  },
  htmlReplaceLinks: function() {
    var links = this.frameDoc.getElementsByTagName('A');
    var away = 'away.php?to=', alt = '';
    for (var i = 0; i < links.length; i++) {
      var href = this.decURI(links[i].href).replace(/&amp;/gi, '&');
      var subHref = href.replace(this.vk, '').replace(this.vkcom, '');
      if (subHref.indexOf('/') == 0) {
        subHref = subHref.replace('/', '');
      }
      if (subHref.indexOf('http://') == 0) {
        alt = subHref;
      } else {
        if (href.indexOf('pages.php') != -1) {
          var matches = subHref.match(/pages\.php\?o=-&p=(.+)/i);
          if (matches != null) subHref = 'pages.php?p=' + matches[1];
        }
        if (subHref.indexOf(away) == 0) {
          subHref = subHref.replace(away, '');
          links[i].className = 'outer';
          alt = subHref;
        } else {
          alt = this.vk + subHref;
        }
        links[i].href = this.encURI(subHref);
      }
      links[i].alt = alt, links[i].title = alt;
    }
  },
  htmlHiderReplace: function() {
    var self = this, index = 0;
    var divs = this.frameDoc.getElementsByTagName('DIV');
    for (var i = 0; i < divs.length; i++) {
      if (divs[index].className == 'hiderBox' || divs[index].className == 'wk_hider_box') {
        var hiderHeader = divs[index].firstChild.firstChild;
        var hiderBody = divs[index].lastChild;
        if (trim(hiderBody.innerHTML) == '') {
          hiderBody = this.frameDoc.createElement('DIV');
          hiderBody.innerHTML = '\uFEFF';
        }
        var hider = this.createHider(hiderHeader, hiderBody, true);
        divs[index].parentNode.replaceChild(hider, divs[index]);
      } else {
        index++;
      }
    }
  },
  htmlDivHeaderReplace: function() {
    var divs = this.frameDoc.getElementsByTagName('DIV');
    var divsLength = divs.length, headerTag = null, index = 0;
    for (var i = 0; i < divsLength; i++) {
      switch (divs[index].className) {
        case 'wikiHeader': headerTag = 'H1'; break;
        case 'wikiSubHeader': headerTag = 'H2'; break;
        case 'wikiSubSubHeader': headerTag = 'H3'; break;
        case 'wk_header': headerTag = 'H1'; break;
        case 'wk_sub_header': headerTag = 'H2'; break;
        case 'wk_sub_sub_header': headerTag = 'H3'; break;
        default: headerTag = null;
      }
      if (headerTag) {
        var header = this.frameDoc.createElement(headerTag);
        header.innerHTML = divs[index].innerHTML;
        divs[index].parentNode.replaceChild(header, divs[index]);
      } else {
        index++;
      }
    }
  }
}

try{stManager.done('wysiwyg.js');}catch(e){}
