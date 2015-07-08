function Scroller(el, dur) {
  if (this.section) {
    return false;
  }

  if ((typeof el != 'object') || (typeof el.href != 'string')) return true;

  var address = el.href.split('#');
  if (address.length < 2) return true;
  address = address[address.length-1];
  el = 0;

  for (var i=0; i<document.anchors.length; i++) {
    if (document.anchors[i].name == address) {
      el = document.anchors[i];
      
      break;
    }
  }
  
  if (el === 0) return true;
      
  this.stopx = 0;
  this.stopy = 0;
  do {
      this.stopx += el.offsetLeft;
      this.stopy += el.offsetTop;
  } while (el = el.offsetParent);
  
  if (this.stopy == 0) {
    location.hash = address;
    return false;
  }

  this.startx = document.documentElement.scrollLeft || window.pagexOffset || document.body.scrollLeft;
  this.starty = document.documentElement.scrollTop || window.pageyOffset || document.body.scrollTop;

  this.stopx = this.stopx - this.startx;
  this.stopy = this.stopy - this.starty;

  if ((this.stopx == 0) && (this.stopy == 0)) return false;

  this.section = true;
  this.dur = (typeof(dur) == 'undefined') ? 500 : dur;
          
  this.start = new Date().getTime();
  this.timer = setInterval(function () {    
      var x = (new Date().getTime() - this.start) / this.dur;
      if (x > 1) x = 1;
      var y = ((-Math.cos(x*Math.PI)/2) + 0.5);
      
      cx = Math.round(this.startx + this.stopx*y);
      cy = Math.round(this.starty + this.stopy*y);
      
      document.documentElement.scrollLeft = cx;
      document.documentElement.scrollTop = cy;
      document.body.scrollLeft = cx;
      document.body.scrollTop = cy;
      
      if (x == 1) {
          clearInterval(this.timer);
          this.section = false;
          location.hash = address;
      }
  }, 15);
  return false;
}
