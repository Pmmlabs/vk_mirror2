var UploadPhotoTransform = {};

UploadPhotoTransform.init = function(obj, uploadUrl, vars, options, optionsChanged) {

    options = extend({}, options, optionsChanged);
    options.optionsChanged = optionsChanged;

    if (options.onUploadComplete) {
        options.onUploadComplete = UploadPhotoTransform.onUploadComplete.pbind(options.onUploadComplete)
    }

    return Upload.init(obj, uploadUrl, vars, options);
}

UploadPhotoTransform.reinit = function(iUpload) {

    var renewUrl = Upload.options[iUpload].renew_url;
    if (!renewUrl) {
        debugLog('UploadPhotoTransform.reinit no renew url');
        return;
    }

    ajax.post(renewUrl, {}, {
        onDone: onDoneRenewUrl
    })

    function onDoneRenewUrl(uploadUrlNew, varsNew, optionsNew) {
        var objOld = Upload.obj[iUpload];
        var optionsOld = Upload.options[iUpload];
        var optionsChanged = optionsOld.optionsChanged;

        Upload.deinit(iUpload);

        var iUploadNew = UploadPhotoTransform.init(objOld, uploadUrlNew, varsNew, optionsNew, optionsChanged);
        optionsNew.onReinit && optionsNew.onReinit(iUpload, iUploadNew);
    }
}

UploadPhotoTransform.onUploadComplete = function(onUploadCompleteOriginal, info, result, errorAdd) {

    var resultParsed;
    try {
        resultParsed = parseJSON(result);
    } catch (e) {}
    var iUpload = info.ind !== undefined ? info.ind : info;
    var renewNeeded = (resultParsed && (resultParsed.photo || resultParsed.renew));

    onUploadCompleteOriginal(info, result, errorAdd);

    if (renewNeeded) {
        setTimeout(function() {
            UploadPhotoTransform.reinit(iUpload);
        }, 1);
    }
}

UploadPhotoTransform.getPhotoUrl = function(resultParsed, storedPhotoSizeList, onDone, onFail) {

    if (!resultParsed || !resultParsed.photo || !storedPhotoSizeList || !onDone) {
        debugLog('UploadPhotoTransform.getPhotoUrl invalid params');
        return;
    }

    var ajaxParams = {};
    ajaxParams.photo = resultParsed.photo;
    ajaxParams.stored_photo_size_list = storedPhotoSizeList;

    ajax.post('/al_photos.php?act=photo_transform_get_photo_url', ajaxParams, {
        onDone: onDone,
        onFail: onFail
    });
}

try {
    stManager.done('upload_photo_transform.js');
} catch (e) {}