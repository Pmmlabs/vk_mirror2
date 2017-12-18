var UploadPhotoTransform = {};
UploadPhotoTransform.init = function(o, t, n, a, r) {
    return a = extend({}, a, r), a.optionsChanged = r, a.onUploadComplete && (a.onUploadComplete = UploadPhotoTransform.onUploadComplete.pbind(a.onUploadComplete)), Upload.init(o, t, n, a)
}, UploadPhotoTransform.reinit = function(o) {
    function t(t, n, a) {
        var r = Upload.obj[o],
            p = Upload.options[o],
            e = p.optionsChanged;
        Upload.deinit(o);
        var i = UploadPhotoTransform.init(r, t, n, a, e);
        a.onReinit && a.onReinit(o, i)
    }
    var n = Upload.options[o].renew_url;
    return n ? void ajax.post(n, {}, {
        onDone: t
    }) : void debugLog("UploadPhotoTransform.reinit no renew url")
}, UploadPhotoTransform.onUploadComplete = function(o, t, n, a) {
    var r;
    try {
        r = parseJSON(n)
    } catch (p) {}
    var e = void 0 !== t.ind ? t.ind : t,
        i = r && (r.photo || r.renew);
    o(t, n, a), i && setTimeout(function() {
        UploadPhotoTransform.reinit(e)
    }, 1)
}, UploadPhotoTransform.getPhotoUrl = function(o, t, n, a) {
    if (!(o && o.photo && t && n)) return void debugLog("UploadPhotoTransform.getPhotoUrl invalid params");
    var r = {};
    r.photo = o.photo, r.stored_photo_size_list = t, ajax.post("/al_photos.php?act=photo_transform_get_photo_url", r, {
        onDone: n,
        onFail: a
    })
};
try {
    stManager.done("upload_photo_transform.js")
} catch (e) {}