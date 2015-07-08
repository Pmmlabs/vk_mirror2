window.sendMessage = function(message, url){
  window.setTimeout(function(){
    window.name = message;
    location.href = url;
  }, 0);
}
if (location.hash) {
  if (location.hash.substring(1, 2) === "_") {
    switch (location.hash.substring(2, 3)) {
      case "2":
        // NameTransport local
        window.parent.parent.easyXDM.Fn.get(location.hash.substring(3))(window.name);
        window.history.back();
        break;
      case "3":
        // NameTransport remote
        var url = decodeURIComponent(location.hash.substring(3)), channel, guest;
        channel = url.substring(url.indexOf("#") + 1);
        guest = window.parent.frames[channel];
        if (!guest) {
          throw new Error("unable to reference window");
        }
        guest.easyXDM.Fn.get(channel)(window.name);
        window.history.back();
        break;
      case "4":
        // NameTransport idle
        var fn = window.parent.easyXDM.Fn.get(location.hash.substring(3) + "_load");
        fn && fn();
        break;
      case "5":
        // Login popup transport
        try {
          if (navigator.userAgent.toLowerCase().indexOf('msie') < 0) {
            eval('window.opener.VK.' + decodeURIComponent(location.hash.substring(3)));
          } else {
            window.opener.VK.XDM.xdHandler(decodeURIComponent(location.hash.substring(3)));
          }
        } catch(e) {alert('Recv err: '+e)};
        break;
    }
  }
}