function prepareRequest() {

    var http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        //if (http_request.overrideMimeType) {
        // See note below about this line
        //}
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('������ ��� �������� XMLHTTP');
        return false;
    }
    return http_request;
}

function processRequest(gid, n) {

    var url = 'events.php?act=ajax';
    http_request = prepareRequest();
    pbar = "progr";
    dbar = ge('prograp').innerHTML;
    ge('progrid' + gid).innerHTML = dbar;
    ge('progrid' + gid).style.paddingRight = '50px';
    ge('prograp').innerHTML = '';
    ge(pbar).style.visibility = 'visible';
    ge(pbar).style.display = 'inline';
    setTimeout('ge(pbar).src = "images/upload.gif"', 200);
    http_request.onreadystatechange = function() {
        alertContents(http_request, gid, n);
    }
    http_request.open('POST', url);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
    http_request.send('gid=' + gid + '&n=' + n);

}

function processLeave(gid) {

    var url = 'events.php?act=ajax_leave';
    http_request = prepareRequest();
    pbar = "progr";
    dbar = ge('prograp').innerHTML;
    ge('progrid' + gid).innerHTML = dbar;
    ge('progrid' + gid).style.paddingRight = '50px';
    ge('prograp').innerHTML = '';
    ge(pbar).style.visibility = 'visible';
    ge(pbar).style.display = 'inline';
    setTimeout('pbar.src = "images/upload.gif"', 200);
    http_request.onreadystatechange = function() {
        alertContents(http_request, gid);
    }
    http_request.open('POST', url);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
    http_request.send('gid=' + gid);

}


function alertContents(http_request, gid, n) {
    var PickText, prevDiv;

    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            PickText = http_request.responseText;
        } else {
            PickText = 'There was a problem with the request.';
        }
        var prevDiv = ge('inv' + gid);
        prevDiv.innerHTML = PickText;

        dbar = ge('progrid' + gid).innerHTML;
        ge('progrid' + gid).innerHTML = '';
        if (ge('progric' + gid))
            ge('progric' + gid).style.display = 'none';
        ge('prograp').innerHTML = dbar;

        pbar = "progr";
        ge(pbar).style.visibility = 'hidden';
        ge(pbar).style.display = 'none';
    }
}

function reportSpam(gid) {

    pbar = "progr";
    dbar = ge('prograp').innerHTML;
    ge('progrid' + gid).innerHTML = dbar;
    ge('progrid' + gid).style.paddingRight = '50px';
    ge('prograp').innerHTML = '';
    ge(pbar).style.visibility = 'visible';
    ge(pbar).style.display = 'inline';
    setTimeout('ge(pbar).src = "images/upload.gif"', 200);

    var onSuccess = function(ajaxObj, responseText) {
        var prevDiv = ge('inv' + gid);
        prevDiv.innerHTML = responseText;

        dbar = ge('progrid' + gid).innerHTML;
        ge('progrid' + gid).innerHTML = '';
        if (ge('progric' + gid))
            ge('progric' + gid).style.display = 'none';
        ge('prograp').innerHTML = dbar;

        pbar = "progr";
        ge(pbar).style.visibility = 'hidden';
        ge(pbar).style.display = 'none';

    };
    var onFail = function() {
        var prevDiv = ge('inv' + gid);
        prevDiv.innerHTML = 'There was a problem with the request.';
    };
    var onCaptchaShow = function() {
        ge('progric' + gid).style.display = 'none';
    };
    var onCaptchaHide = function() {};
    var options = {
        onSuccess: onSuccess,
        onFail: onFail,
        onCaptchaShow: onCaptchaShow,
        onCaptchaHide: onCaptchaHide
    };

    Ajax.postWithCaptcha('groups_ajax.php', {
        'act': 'areportspam',
        'gid': gid
    }, options);

}