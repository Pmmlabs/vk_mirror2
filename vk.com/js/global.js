// Get Absolute X Position of HTML Element
function findX(obj) {
    var curleft = 0;
    try {
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        } else if (obj.x)
            curleft += obj.x;
    } catch (e) {}
    return curleft;
}

// Get Absolute Y Position of HTML Element
function findY(obj) {
    var curtop = 0;
    try {
        if (obj.offsetParent) {
            while (obj.offsetParent) {
                curtop += obj.offsetTop
                obj = obj.offsetParent;
            }
        } else if (obj.y)
            curtop += obj.y;
    } catch (e) {}
    return curtop;
}

function mousePosX(e) {
    var posx = 0;
    if (!e) var e = window.event;
    if (e.pageX)
        posx = e.pageX;
    else if (e.clientX && document.body.scrollLeft)
        posx = e.clientX + document.body.scrollLeft;
    else if (e.clientX && document.documentElement.scrollLeft)
        posx = e.clientX + document.documentElement.scrollLeft;
    else if (e.clientX)
        posx = e.clientX;
    return posx;
}

function mousePosY(e) {
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageY)
        posy = e.pageY;
    else if (e.clientY && document.body.scrollTop)
        posy = e.clientY + document.body.scrollTop;
    else if (e.clientY && document.documentElement.scrollTop)
        posy = e.clientY + document.documentElement.scrollTop;
    else if (e.clientY)
        posy = e.clientY;
    return posy;
}

// Debug Print all object properties
function dp(object) {
    var descString;
    for (var value in object)
        descString += (value + " => " + object[value] + "\n");
    if (descString != "")
        alert(descString);
    else
        alert(object);
}

// Debug Print to div on page
function dpd(debugOutput) {
    if (ge('debugout')) {
        ge('debugout').style.overflow = "auto";
        ge('debugout').innerHTML = debugOutput + "<br>" + ge('debugout').innerHTML;
    }
}

function bigprint(object) {
    var descString;
    for (var value in object)
        descString += (value + " => " + object[value] + "\n");
    if (descString != "")
        dpd(descString);
    else
        dpd("bigprint failed " + object);
}

// Debug Print Time
var debugStartTime;

function dtime(marker) {
    endTime = new Date();
    dpd(marker + " " + (debugStartTime.getTime() - endTime.getTime()));
    debugStartTime = endTime;
}

function dtimestart() {
    debugStartTime = new Date();
}