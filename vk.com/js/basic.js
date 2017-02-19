// === Get/Hide/Show/Toggle ===

// function toggle()
// {
//   for( var i = 0; i < arguments.length; i++ ) {
//     var element = ge(arguments[i]);
//     element.style.display = (element.style.display == 'block') ? 'none' : 'block';
//   }
//   return false;
// }

function remove_node(node) {
    if (node.removeNode)
        node.removeNode(true);
    else {
        for (var i = node.childNodes.length - 1; i >= 0; i--)
            remove_node(node.childNodes[i]);
        node.parentNode.removeChild(node);
    }
    return null;
}

// === Event Info Access ===

function mouseX(event) {
    return event.pageX || (event.clientX +
        (document.documentElement.scrollLeft || document.body.scrollLeft));
}

function mouseY(event) {
    return event.pageY || (event.clientY +
        (document.documentElement.scrollTop || document.body.scrollTop));
}

function pageScrollX() {
    return document.body.scrollLeft || document.documentElement.scrollLeft;
}

function pageScrollY() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}

function elementX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    } else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function elementY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    } else if (obj.y)
        curtop += obj.y;
    return curtop;
}

// === Onload Registry ===
/*
var onloadRegistry = new Array();

function onloadRegister(handler)
{
  onloadRegistry.push(handler);
}

function onloadRun()
{
  for( var index in onloadRegistry )
    onloadRegistry[index]();
}

window.onload = onloadRun;
*/