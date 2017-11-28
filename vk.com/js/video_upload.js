var swfEnabled = false;

function switchMode(objSWFUpload) {
    if (swfEnabled) {
        ge("standardUpload").style.display = "";
        ge("swfUpload").style.display = "none";

        ge("btnUpload").onclick = function() {
            if (checkFile && !checkFile()) {
                return false;
            }
            this.disabled = true;
            startUpload();
            ge('uploadForm').submit();
        };
    } else {
        if (!objSWFUpload) return false;
        ge("standardUpload").style.display = "none";
        ge("swfUpload").style.display = "";

        ge("btnBrowse").onclick = function() {
            objSWFUpload.selectFile();
            return false;
        };
        ge("btnUpload").onclick = function() {
            objSWFUpload.startUpload();
            return false;
        };
        ge("btnCancel").onclick = function() {
            objSWFUpload.cancelUpload();
            return false;
        };
    }
    swfEnabled = !swfEnabled;
}

function swfUploadLoaded() {
    if (ge('switchMode')) ge('switchMode').style.display = '';
    switchMode(this);
}

function showError(error) {
    var err = ge("uploadError")
    if (error) {
        err.innerHTML = error;
        err.style.display = "";
    } else {
        err.style.display = "none";
    }
}

function fileQueued(file) {
    try {
        showError("");
        ge("btnBrowse").style.display = "none";
        ge("btnCancel").style.display = "";
        ge("filename").style.display = "";
        var size = "";
        if (file.size < 1024 * 1024)
            size = Math.round(file.size / 1024) + " ��";
        else
            size = (file.size / 1024 / 1024).toFixed(1) + " ��";
        ge("filename").innerHTML = "<strong>" + file.name + "</strong>" + " (" + size + ") ";
    } catch (ex) {
        showError(ex);
    }
}

function fileQueueError(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            showError("You have attempted to queue too many files.");
            return;
        }
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                showError("File is too big.");
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                showError("Cannot upload Zero Byte files.");
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                showError("Invalid File Type.");
                break;
            default:
                if (file !== null) {
                    showError("Unhandled Error");
                }
                break;
        }
    } catch (ex) {
        showError(ex);
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    if (numFilesSelected > 0) {
        ge("btnCancel").disabled = false;
    }
}

function uploadStart(file) {
    ge("progressWrapper").style.display = "";
    return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
    var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
    ge("progressBar").style.width = percent + "%";
    //ge("progressBar").innerHTML = percent + "%";
}

function uploadSuccess(file, serverData) {
    try {
        var data = eval("(" + serverData + ")");
        if (data.redirect) {
            ge("btnCancel").style.display = "none";
            ge("filename").style.display = "none";
            ge("loader").style.display = "";
            location.replace(data.redirect);
        } else throw "Error";
    } catch (ex) {
        ge("btnBrowse").style.display = "";
        ge("btnCancel").style.display = "none";
        ge("filename").style.display = "none";
        showError("Server error.");
    }

}

function uploadError(file, errorCode, message) {
    try {
        ge("progressWrapper").style.display = "none";
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                showError("Upload Error: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                showError("Upload Failed.");
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                showError("Server (IO) Error");
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                showError("Security Error");
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                showError("Upload limit exceeded.");
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                showError("Failed Validation.  Upload skipped.");
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                // If there aren't any files left (they were all cancelled) disable the cancel button
                if (this.getStats().files_queued === 0) {
                    showError();
                    ge("btnBrowse").style.display = "";
                    ge("btnCancel").style.display = "none";
                    ge("filename").style.display = "none";
                }
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:

                break;
            default:
                showError("Unhandled Error: " + errorCode);
                break;
        }
    } catch (ex) {
        showError(ex);
    }
}

function uploadComplete(file) {
    if (this.getStats().files_queued === 0) {
        ge("progressWrapper").style.display = "none";
    }
}