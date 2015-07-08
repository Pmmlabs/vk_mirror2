var FileButton = {
  init: function(el, opts) {
    el = ge(el);
    if (!el) return;

    var attrs = ' type="file" class="file_input"';
    if (opts.name) attrs += ' name="' + opts.name + '"';
    if (opts.id) attrs += ' id="' + opts.id + '"';
    if (opts.accept) attrs += ' accept="' + opts.accept + '"';
    if (opts.multiple) attrs += ' multiple="true"';

    el.innerHTML = '<div class="file_button_inner"><input' + attrs + ' /><div class="file_button_text">' + el.innerHTML + '</div></div>';
    el.style.padding = '0px';

    el.firstChild.firstChild.onchange = opts.onchange;
  }
}

try{stManager.done('filebutton.js');}catch(e){}