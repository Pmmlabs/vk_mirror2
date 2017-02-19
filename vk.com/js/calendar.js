function navigate(month, year) {

    http_request = prepareRequest();
    var url = "calendar_ajax.php?month=" + month + "&year=" + year;

    prevDiv = document.getElementById('heading');
    prevDiv.innerHTML = "<IMG id='progr' SRC='images/progressbar.gif'>";
    pbar = 'progr';
    ge(pbar).style.visibility = 'visible';
    ge(pbar).style.display = 'inline';
    setTimeout('ge(pbar).src = "images/progressbar.gif"', 200);
    http_request.onreadystatechange = function() {
        callback(http_request);
    }
    http_request.open('POST', url, true);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=windows-1251');
    http_request.send('');
}


function callback(http_request) {

    var PickText, prevDiv;
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            PickText = http_request.responseText;
        } else {
            PickText = 'There was a problem with the request.';
        }
        prevDiv = document.getElementById('calendar');
        prevDiv.innerHTML = PickText;
    }

}

function dayScroll(n, nMax, obj) {
    hide(n + "pic" + ge(obj).value);
    if (ge(obj).value == nMax) {
        ge(obj).value = 0;
    } else {
        ge(obj).value++;
    }
    show(n + "pic" + ge(obj).value);
}