var TagsDD = function(obj, opts) {
  var obj = ge(obj);
  opts = extend({
    width: 300,
    paddings: 0,
    placeholder: 'no placeholder',
    steps: []
  }, opts);
  this.opts = opts;
  this.step = 0;
  this.steps = this.opts.steps || [];
  this.control = ce('div', {
    className: 'tdd_wrap'+(opts.search ? ' tdd_search' : ''),
    innerHTML: ['<div class="tdd_control clear_fix"><div class="tdd_taglist"></div><div class="tdd_input_cont fl_l"><input class="tdd_input" placeholder="',(this.opts.steps[this.step] || this.opts).placeholder,'" /></div></div><div class="tdd_suggest" style="width: ',(opts.width - 2),'px"><div class="tdd_suggest_items"></div><div class="tdd_bottom1" style="width: ',(opts.width - 2),'px"></div><div class="tdd_bottom2" style="width: ',(opts.width - 2),'px"></div></div>'].join('')
  }, {
    width: opts.width+'px'
  })
  obj.parentNode.insertBefore(this.control, obj);
  this.input = geByClass('tdd_input', this.control)[0];
  this.input.style.width = (opts.width - 26)+'px';
  this.tagCont = geByClass('tdd_taglist', this.control)[0];
  this.suggest = geByClass('tdd_suggest', this.control)[0];
  this.suggestItems = geByClass('tdd_suggest_items', this.suggest)[0];

  this.tags = {};

  var self = this;
  stManager.add(['notifier.js'], function() {
    self.scroll = new Scrollbar(self.suggestItems, {
      prefix: 'tdd_',
      more: debugLog,
      nomargin: true,
      nokeys: true,
      right: 0,
      left: opts.width - 9
    });
  })

  this.obj = obj;

  var eventActs = 'keydown blur focus paste cut';
  addEvent(this.input, eventActs, (function(ev) {
    if (this.inputEvent(ev) === false) {
      return cancelEvent(ev);
    } else {
      return true;
    }
  }).bind(this));
  placeholderSetup(this.input, {back: true , fast: true});

  if (obj.value) {
    var tags = obj.value.split(',');
    for (var i in tags) {
      this.addTag(tags[i], true);
    }
  }
  data(this.control, 'tags_dd', this);
  cur.destroy.push(function() {
    removeData(this.control, 'tags_dd');
    removeEvent(this.input, eventActs);
  })

  this.setData(opts);
}

extend(TagsDD.prototype, { // object funcs

  inputEvent: function(ev) {
    switch(ev.type) {
      case 'paste':
        this.inputChange(true);
        return true;
        break;
      case 'cut':
        this.inputChange(true);
        return true;
        break;
      case 'focus':
        this.showDD(false, true);
        return true;
        break;
      case 'blur':
        this.addTag();
        this.hideDD();
        return false;
        break;
    }
    switch(ev.keyCode) {
      case KEY.ESC:
        this.hideDD();
        break;
      case KEY.RIGHT:
        var inputVal = val(this.input);
        if (inputVal.length == this.selectionEnd()) {
          this.addTag();
        }
        break;
      case KEY.RETURN:
        var s = this.steps[this.step] || this.opts;
        var key = this.str || '';
        if (s.data && s.data[key] && s.data[key].length && isVisible(this.suggest)) {
          this.setItem();
        }
        this.addTag();
        break;
      case KEY.UP:
        this.itemMove(true);
        return false;
        break;
      case KEY.DOWN:
        this.itemMove();
        break;
      case 16: // shift
      case 17: // ctrl
        break;
      case KEY.LEFT:
        if (val(this.input)) {
          break;
        } // else same as DEL
      case KEY.DEL: // backspace
        if (this.selectionEnd() == 0) {
          var lastTag = this.tagCont.lastChild;
          if (!lastTag) {
            this.hideDD();
            break;
          }
          var tagVal = trim(TagsDD.tagVal(lastTag));
          this.setValue('');
          this.removeTag(lastTag);
          this.setData({input: tagVal});
          this.updateSource();
          this.inputChange();
          return false;
        } // else the same as KEY
      default:
        this.focus = 'keys';
        setTimeout((function() {
          this.str = val(this.input);
          if (this.str.substr(this.str.length - 1, 1) == ',') {
            val(this.input, this.str.substr(0, this.str.length - 1));
            this.addTag();
          }
          this.updateSource(true);
        }).bind(this), 0);
        this.inputChange();
        break;
    }
  },

  inputChange: function(force, lazy) {
    clearTimeout(this.inputTimeout);
    this.inputTimeout = setTimeout((function() {
      if (this.str) {
        this.showDD(false, lazy);
      } else {
        this.hideDD();
      }
    }).bind(this), force ? 0 : 100);
  },

  updateSource: function(useCache, force) {
    var tags = this.tagCont.childNodes;
    var tagVals = [];
    for(var i in this.tags) {
      if (i) {
        tagVals.push(i);
      }
    }
    if (this.str) {
      tagVals.push(this.str);
    }
    val(this.obj, tagVals.join(','));
    if (this.opts.onChange) {
      this.opts.onChange(force, this.obj);
    }
  },

  loadDD: function(callback) {
    var s = this.steps[this.step] || this.opts;
    var url = s.url || this.opts.url;
    if (url) {
      var params = s.params || this.opts.params;
      ajax.post(url, extend(params, {q: this.str, tags: this.obj.value}), {
        onDone: function(data) {
          s.data = extend(s.data || {}, data);
          callback();
        }
      });
    }
  },

  showDD: function(noLoad, lazy) {
    var s = this.steps[this.step] || this.opts;
    if (s) {
      var key = this.str || '';
      if (!key && lazy) {
        hide(this.suggest);
      } else if (s.data && s.data[key]) {
        var list = s.data[key];
        var len = list.length;
        list = list.slice(0, 40);
        var html = this.getListHTML(list);
        if (!html) {
          hide(this.suggest);
          return false;
        }
        this.suggestItems.innerHTML = html;
        this.shown = list.length;
        show(this.suggest);
        this.scroll.update(false, true);
        this.itemMove(false, true);
      } else if (!noLoad) {
        this.loadDD((function() {
          this.showDD(true);
        }).bind(this));
      }
    }
  },

  hideDD: function() {
    //return false;
    setTimeout((function() {
      hide(this.suggest);
      if (this.justSelected) {
        this.justSelected = false;
        this.focusInput();
      }
    }).bind(this), 0);
  },

  getListHTML: function(list) {
    var html = [];
    for (var i in list) {
      var v = list[i];
      if (this.tags[v[1]]) continue;
      html.push('<a val="',v[0],'" class="tdd_item" onmouseover="TagsDD.activeItem(this);" onmousedown="return TagsDD.selectItem(this, event);">',v[1],'</a>');
    }
    return html.join('');
  },

  setValue: function(str) {
    if (this.input.setValue) {
      this.input.setValue(str);
    } else {
      val(this.input, str);
    }
    this.str = str;
  },

  setData: function(data) {
    if (data.input) {
      this.setValue(data.input);
    }
    if (data.steps) {
      this.steps = data.steps;
    }
    if (data.tags) {
      this.tags = {};
      this.step = 0;
      this.tagCont.innerHTML = '';
      for(var i in data.tags) {
        this.addTag(i);
      }
    }
    if (data.params) {
      this.opts.params = data.params;
    }
    this.updateInput();
  },

  addTag: function(label, noUpdate) {
    var label = label || trim(val(this.input));
    label = label.replace(/<|>/g, '');
    if (!label) return;
    var maxLen = parseInt((this.opts.width - 15) / 7.5);
    if (label.length > maxLen) {
      label = trim(label.substr(0, maxLen)) + '...';
    }
    if (this.opts.capitalCase) {
      label = label.substr(0, 1).toUpperCase() + label.substr(1);
    }
    if (this.tags[label]) {
      return false;
    }
    this.tags[label] = 1;
    var tag = ce('div', {
      className: 'tdd_tag fl_l',
      innerHTML: '<span class="tdd_l">'+label+'</span><a class="tdd_x" onclick="TagsDD.removeTag(this.parentNode);" onmouseover="TagsDD.overTag(this);" onmouseout="TagsDD.outTag(this);"><div class="tdd_x_c"></div></a>'
    });
    this.setValue('');
    this.tagCont.appendChild(tag);
    this.step += 1;
    this.updateInput();
    if (!noUpdate) this.updateSource(false, true);
    if (this.steps[this.step]) {
      this.steps[this.step].data = {}
    }
    this.hideDD();
  },

  selectionEnd: function(o) {
    if (this.input.createTextRange) {
      var r = document.selection.createRange().duplicate();
      r.moveStart('character', -this.input.value.length);
      return r.text.length;
    } else {
      return this.input.selectionEnd;
    }
  },

  updateInput: function() {
    var back = geByClass('input_back_content', this.input.previousSibling)[0];
    if (!back) return;
    back.innerHTML = (this.steps[this.step] || this.opts).placeholder;
    if (!isVisible(back.parentNode.parentNode)) {
      var needHideBack = true;
      show(back.parentNode.parentNode);
    }
    var inpW = getSize(back)[0] + 2;
    if (needHideBack) {
      hide(back.parentNode.parentNode);
    }
    this.input.style.width = inpW + 'px';
    var inpXY = getXY(this.input);
    var contXY = getXY(this.control);
    var difW = (contXY[0] + this.opts.width - this.opts.paddings) - (inpXY[0] + inpW);
    if (difW > 0) {
      this.input.style.width = (inpW + difW - 11) + 'px';
    }
  },

  removeTag: function(tag) {
    re(tag);
    while(tag.firstChild && tag.firstChild.nodeType != 3) {
      tag = tag.firstChild;
    }
    var label = tag.innerHTML;
    delete this.tags[label];
    this.input.focus();
    this.step -= 1;
    this.updateInput();
    this.updateSource(false, true);
    if (this.steps[this.step]) {
      this.steps[this.step].data = {}
    }
  },

  itemMove: function(prev, nofirst) {
    this.focus = 'items';
    var active = geByClass('tdd_active', this.suggest)[0];
    if (active) {
      var item = prev ? active.previousSibling : active.nextSibling;
      if (item) {
        TagsDD.activeItem(item, active);
        this.focusItem(item, prev);
      }
    } else if (!nofirst) {
      addClass(this.suggestItems.firstChild, 'tdd_active');
    }
  },

  focusItem: function(obj, prev) {
    var y = getXY(obj)[1] - getXY(this.suggestItems)[1];
    var h = getSize(obj)[1];
    var scroll = this.scroll.val();
    var height = this.scroll.scrollHeight;
    var center = y - Math.floor((height - h) / 2);

    if ((prev && center < scroll) || (!prev && center > scroll)) {
      this.scroll.val(y - Math.floor((height - h) / 2));
    }
  },

  setItem: function(obj) {
    obj = obj || geByClass('tdd_active', this.suggestItems)[0]
    if (!obj) return;
    while(obj.firstChild && obj.firstChild.nodeType != 3) {
      obj = obj.firstChild;
    }
    this.setValue(obj.innerHTML);
    this.hideDD();
  },

  focusInput: function() {
    this.input.focus();
    this.inputChange(true, true);
  }

});

extend(TagsDD, { // class funcs

  activeItem: function(obj, old) {
    old = old || geByClass('tdd_active', obj.parentNode)[0];
    if (old) {
      if (old == obj) {
        return;
      } else {
        removeClass(old, 'tdd_active');
      }
    }
    addClass(obj, 'tdd_active');
  },

  selectItem: function(obj, ev) {
    ev = ev || button;
    if (ev.button == 2) {
      return cancelEvent(ev);
    }
    var dd = data(obj.parentNode.parentNode.parentNode, 'tags_dd');
    dd.setItem(obj);
    dd.addTag();
    dd.justSelected = true;
    setTimeout(function() {
      dd.justSelected = false;
    }, 1000);
  },

  removeTag: function(tag) {
    data(tag.parentNode.parentNode.parentNode, 'tags_dd').removeTag(tag);
  },

  tagVal: function(tag) {
    return geByClass('tdd_l', tag)[0].innerHTML;
  },

  overTag: function(objClose) {
    animate(objClose, {opacity: 1}, 100);
  },

  outTag: function(objClose) {
    animate(objClose, {opacity: 0.6}, 100);
  }

});

try{stManager.done('tags_dd.js');}catch(e){}
