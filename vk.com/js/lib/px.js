var abp = abp || false;
var scripts = document.getElementsByTagName("script");
var script = scripts[scripts.length - 1];
if (script) {
    var query = script.src.replace(/^[^\?]+\??/, "").split("&");
    var params = {};
    for (var i = 0; i < query.length; i++) {
        var param = query[i].split("=");
        params[param[0]] = param[1];
    }
    if (params["ch"] == 1) abp = true;
    else if (params["ch"] == 2) abp = abp && false;
}