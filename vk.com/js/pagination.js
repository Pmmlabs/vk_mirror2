var pagination = new (function(){
  var _t = this;
  _t.currentOffset = 0;
  var containerId = null;
  var params;

  _t.init = function(p, offset, containerId, script){
    params = p;
    params.offset = offset;
    var def = {};
    for(var i in params){def[i] = params[i];}
    _t.currentOffset = offset;
    _t.containerId = containerId;
    var obj = {
      url:script,
      def:def,
      show:{
        to:function(p){return p.offset;},
        from:function(p){
          var o = {};
          for(var i in params){o[i] = params[i];}
          o.offset = p;
          return o;
        }
      },
      done:function (ajaxObj, text) {
        _t.currentOffset = params.offset;
        ge(_t.containerId).innerHTML = text;
        if(_t.afterFunc)_t.afterFunc(params);
      },
      fail: function (ajaxObj, text) {
        ge(_t.containerId).innerHTML = '<div id="error">Произошла неизвестная ошибка. Попробуйте перезагрузить страницу.</div>';
      }
    };
    $ah.prepare('pages', obj);
  };

  _t.getPageContent = function(offset, inTop, afterFunc, obj) {
    if(window.console)console.log("get content "+offset);
    var progressBar = inTop ? ge('progrTop') : ge('progrMid');
    var progressWrap = inTop ? ge('progrWrapTop') : ge('progrWrapMid');
    if(progressBar){
      progressBar.style.display = 'inline';
      show(progressWrap);
      progressBar.src = '/images/upload.gif';
    }
    if(obj)params = obj;
    params.offset = offset;
    _t.afterFunc = afterFunc;
    $ah.go('pages', params);
  };
})();