try{
  (function(w,d){
    w.RB = w.RB || (function(){
        var
        // main flag,
          enabled = !1,

        // old opera focus flag
          focused = !0,

        // banners to inspect
          banners = {},

        // shortcuts
          e = d.documentElement,

          VE = (d.mozVisibilityState ? "mozvisibilitychange" : d.webkitVisibilityState ? "webkitvisibilitychange" : d.visibilityState ? "visibilitychange" : ""),

          lastTimeStamp = 0,

        // timing
          tm;

        // handlers
        function onFocusIn(){
          focused = !0;
          C(!0);
        }

        function onFocusOut(){
          focused = !1;
        }

        // using visibility could have profits when tab is not
        function onVisibilityChange(){
          if (!d.hidden) onFocusIn()
          else onFocusOut()
        }

        function onWindowScroll(){
          C();
        }
        function onWindowResize(){
          C()
        }


        // I – inspect
        function I(b_id){
          lastTimeStamp = new Date().getTime();
          // adding the banner container to storage
          if(!banners[b_id]) {
            banners[b_id]={c:G(b_id)};
          }

          // enabling anyway
          on();
          C(true);
        }

        // C – check viewability of banner with t, timeout after loading
        function C(t){
          for (var id in banners){
            if (banners[id] && getVA(banners[id].c) >= 50 && hasFocus() && !banners[id].t) {
              (function(_id){banners[_id].t=setTimeout(function(){try{P(_id)}catch(e){}},1E3)}(id));
            } else if (banners[id] && getVA(banners[id].c) < 50){
              if (banners[id].t){
                clearTimeout(banners[id].t);
                delete banners[id].t;
              }
            } else if (banners[id] && !hasFocus()){
              if (banners[id].t){
                clearTimeout(banners[id].t);
                delete banners[id].t;
                clearTimeout(tm);
                t = false;
              }
            } else if (!banners[id]) {
              CL(id);
            }
          }
          if (t) {
            clearTimeout(tm);
            tm = setTimeout(function(){C(!0)}, 3e2);
          }
        }

        // CL – Clear timers and stop listeners
        function CL(id, onlyTM){
          if(id && banners[id]){
            clearTimeout(banners[id].t);
            banners[id].t=null;
            if (!onlyTM){
              banners[id].c=null;
              delete banners[id];
            }
            return;
          }
          clearTimeout(tm);
          tm=null;
          for (var id in banners){
            if (banners[id].t) {CL(id,!0)}
          }
        }


        // P – pixel to send
        function P(id, obj){
          if (!G(id)){
            CL(id);

            // banner removed
            return
          }

          if (banners[id]) {
            obj = banners[id].c;
          } else {
            return;
          }

          if (!hasFocus()){
            CL(id,!0);
            return;
          } else if (getVA(obj) < 50){
            CL(id,!0);
            return;
          }

          new Image().src = obj.getAttribute('data-counter');


          // remove banner from storage of inspectable items
          CL(id);
          // turn listeners off if banners are not present
          if(!l(banners)) off();
        }

        function hasFocus(){
          if (!VE && typeof d.hasFocus === "function") focused = d.hasFocus();
          return focused;
        }

        function getVA(obj) {
          var R={};
          R.w=R.h=Infinity;
          if (!isNaN(d.body.clientWidth) && d.body.clientWidth > 0) {R['w'] = d.body.clientWidth;}
          if (!isNaN(d.body.clientHeight) && d.body.clientHeight > 0) {R['h'] = d.body.clientHeight;}
          if (!!e && !!e.clientWidth && !isNaN(e.clientWidth)) {R['w'] = e.clientWidth;}
          if (!!e && !!e.clientHeight && !isNaN(e.clientHeight)) {R['h'] = e.clientHeight;}
          if (!!w.innerWidth && !isNaN(w.innerWidth)) {R['w'] = Math.min(R['w'], w.innerWidth);}
          if (!!w.innerHeight && !isNaN(w.innerHeight)) {R['h'] = Math.min(R['h'], w.innerHeight);}
          if (R.h == Infinity || R.h == Infinity) {R = {"E" : ":-("};} else {
            var r = obj.getClientRects()[0];
            if (!r){R = {"p" : 0}; return R;}
            R.t = r.top; R.b = r.bottom; R.l = r.left; R.r = r.right;
            if (r.bottom < 0 || r.right < 0 || r.top > R.clientHeight || r.left > R.clientWidth) {
              R = 0;
            } else {
              var totalObjectArea = (r.right - r.left ) * (r.bottom - r.top ),
                xMin = Math.ceil(Math.max(0, r.left)),
                xMax = Math.floor(Math.min(R.w, r.right)),
                yMin = Math.ceil(Math.max(0, r.top)),
                yMax = Math.floor(Math.min(R.h, r.bottom)),
                visibleObjectArea = (xMax - xMin) * (yMax - yMin);
              R = Math.round(visibleObjectArea / totalObjectArea*100);
            }
          }
          return R;
        }

        /** LISTENERS SWITCHERS **/

        function on(){
          if (enabled) return;
          ev(w, 'resize', onWindowResize);
          ev(w, 'scroll', onWindowScroll);
          if (VE) ev(d, VE, onVisibilityChange);
          else{
            ev(w, 'blur', onFocusOut);
            ev(w, 'focus', onFocusIn);
          }
          enabled = true;
        }

        function off(){
          rm(w, 'resize', onWindowResize);
          rm(w, 'scroll', onWindowScroll);
          if (VE) rm(d, VE, onVisibilityChange);
          rm(w, 'focus', onFocusIn);
          rm(w, 'blur', onFocusOut);
          clearTimeout(tm);
          enabled = false;
        }

        /** UTILS **/
        // G - get element by ID;
        function G(E){return d.getElementById(E)}
        // ev - EVent to handle
        function ev(elem, eventName, callback) {elem.addEventListener ? elem.addEventListener(eventName, callback,!1) : elem.attachEvent && elem.attachEvent("on" + eventName, callback)}
        function rm(elem, eventName, callback) {elem.removeEventListener ? elem.removeEventListener(eventName, callback,!1) : elem.detachEvent && elem.detachEvent("on" + eventName, callback)}
        // obj length
        function l(obj){var s=0,key;for(key in obj){if(obj.hasOwnProperty(key))s++}return s;}

        function getAdsContainers(){
          var ADS_CLASS = "mailru-visibility-check";
          if (d.getElementsByClassName){
            return d.getElementsByClassName(ADS_CLASS);
          } else if (d.querySelectorAll) {
            return d.querySelectorAll('.'+ADS_CLASS);
          } else {
            var els = [];
            var tmp = d.getElementsByTagName("*");
            var regex = new RegExp("(^|\s)" + classname + "(\s|$)");
            for (var i = 0; i < tmp.length; i++ ) {
              if ( regex.test(tmp[i].className) ) {
                els.push(tmp[i]);
              }
            }
            return els;
          }
        }

        function doCheck() {
          var displayedBanners = getAdsContainers();
          for (var k = displayedBanners.length - 1; k >= 0; k--) {
            if (displayedBanners[k].id && displayedBanners[k].getAttribute('data-counter')){
              I(displayedBanners[k].id);
            }
          }
        }

        /** PUBLIC INTERFACE **/

        return {
          doCheck:doCheck
          // debug
          // ,banners : banners
        }
      }());

  }(window, document))}catch(e){}

try{stManager.done('mrtarg.js');}catch(e){}
