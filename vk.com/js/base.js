// === String Utilities ===

function hasLinks(word) {
    return word.match(/[A-Za-z0-9]{2,2}\.(ru|ua|com|net|info|biz|org|us)/i);
}

function escapeQuotes(word) {

    // jsesq is a key/acronym for javascript escaped single quote
    // jsdsq is a key/acronym for javascript escaped double quote

    escaped = word.replace(/'/g, ":jsesq:");
    escaped = escaped.replace(/"/g, ":jsedq:");
    escaped = escaped.replace(/\[/g, ":jselb:");
    escaped = escaped.replace(/\]/g, ":jserb:");
    escaped = escaped.replace(/\\/g, ":jsebs:");

    return escaped;
}

function unescapeQuotes(word) {

    // jsesq is a key/acronym for javascript escaped single quote
    // jsdsq is a key/acronym for javascript escaped double quote

    escaped = word.replace(/:jsesq:/g, "'");
    escaped = escaped.replace(/:jsedq:/g, '"');
    escaped = escaped.replace(/:jselb:/g, '\[');
    escaped = escaped.replace(/:jserb:/g, '\]');
    escaped = escaped.replace(/:jsebs:/g, '\\');

    return escaped;
}

function escapeURI(u) {
    if (encodeURIComponent) {
        return encodeURIComponent(u);
    }
    if (escape) {
        return escape(u);
    }
}

function goURI(href) {
    window.location.href = href;
}

function showText(obj, mess) {
    var imgPath;
    if (mess == 1) {
        ge(obj).innerHTML = "<h4>" + base_rotating + "<img src='http://vkontakte.ru/images/upload.gif'></h4>";
    }
    if (mess == 2) {
        ge(obj).innerHTML = "<div id='uploadingInner'><h4>" + base_uploading_photo + "<img src='http://vkontakte.ru/images/upload.gif'></h4><p style='margin-top:11px'>" + base_dont_close + "</p></div>";
    }
}