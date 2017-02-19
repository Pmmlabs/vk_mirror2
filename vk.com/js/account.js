function showPrivacyMenu(field) {
    var edit = 'privacy_edit_' + field;
    var panel = 'privacy_panel_' + field;
    show(edit);
    if (isIE()) {
        var dialog = ge(panel);
        var goodFrame = ge('goodFrame_' + panel);
        goodFrame.style.width = (dialog.offsetWidth + 120) + "px";
        goodFrame.style.height = (dialog.offsetHeight) + "px";
    }
}

function hidePrivacyMenu(field) {
    var edit = 'privacy_edit_' + field;
    var panel = 'privacy_panel_' + field;
    hide(edit);
    if (isIE()) {
        var goodFrame = ge('goodFrame_' + panel);
        goodFrame.style.width = "0px";
        goodFrame.style.height = "0px";
    }
}

function create_goodFrame(parent) {
    if (isIE()) {
        var dialog = ge(parent);
        var goodFrame = document.createElement('iframe');
        goodFrame.id = "goodFrame_" + parent;
        goodFrame.className = 'ieFrame';
        goodFrame.style.width = "0px";
        goodFrame.style.height = "0px";
        goodFrame.style.zIndex = '50';
        goodFrame.style.top = '0px';
        goodFrame.style.left = '0px';
        dialog.insertBefore(goodFrame, dialog.firstChild);
    }
}