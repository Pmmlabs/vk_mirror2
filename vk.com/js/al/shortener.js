var Shortener = {
    init: function() {
        setTimeout(elfocus.pbind("shorten_link")), window.addEventListener("scroll", this.onShortenedScrolled), cur.loadedCount = 20, cur.chunkSize = 20
    },
    submitLink: function(e) {
        var o = ge("shorten_error");
        o.className = "shorten_error";
        var t = 0,
            n = document.getElementById("private_link");
        n && "checkbox on" == n.className && (t = 1), ajax.post("/cc", {
            act: "shorten",
            link: val("shorten_link"),
            hash: e,
            "private": t
        }, {
            onDone: function(e, o) {
                var t = ge("shorten_link");
                t.value = e, t.select(), setTimeout(cur.selResult, 0), ge("last_shortened_block").innerHTML = o;
                var c = "testClass",
                    a = document.getElementById("last_shortened_block");
                a.className += " " + c;
                var i = new RegExp("(\\s|^)" + c + "(\\s|$)");
                a.className = a.className.replace(i, " ");
                a.offsetHeight;
                cur.offset++, n && (n.className = "checkbox"), cur.loadedCount = 20, cur.allLoaded = !1, cur.isLoading = !1
            },
            onFail: function(e) {
                if (e) {
                    var o = ge("shorten_error");
                    return o.className = "shorten_error_display", val("shorten_msg", e), isVisible(o) || slideDown(o, 200), !0
                }
            },
            showProgress: lockButton.pbind("shorten_btn"),
            hideProgress: unlockButton.pbind("shorten_btn")
        })
    },
    deleteLastShortened: function(e, o, t, n) {
        ajax.post("/cc", {
            act: "delete",
            key: o,
            timestamp: t,
            hash: n,
            count: cur.loadedCount
        }, {
            onDone: function(e) {
                ge("last_shortened_block").innerHTML = e
            },
            onFail: function() {
                return !0
            }
        }), e || (e = window.event), e.cancelBubble = !0, e.stopPropagation()
    },
    selResult: function() {
        var e = ge("shorten_link");
        if (e.createTextRange) {
            var o = e.createTextRange();
            o.collapse(!0), o.moveEnd("character", 0), o.moveStart("character", val(e).length), o.select()
        } else e.setSelectionRange && e.setSelectionRange(0, val(e).length)
    },
    highlightDeleteIcon: function(e) {
        ge("delete_icon_" + e).style.opacity = Math.max(.5, ge("delete_icon_" + e).style.opacity)
    },
    showDeleteIcon: function(e, o, t) {
        ge("delete_icon_" + o).style.opacity = 1, showTooltip(e, {
            text: t,
            black: 1,
            shift: [15, 11, 0]
        })
    },
    showPrivateLinkTooltip: function(e, o) {
        showTooltip(e, {
            text: o,
            black: 1,
            shift: [15, 11, 0]
        })
    },
    showLoadingMore: function(e) {
        var o = document.createElement("div");
        o.className = "load_more", e && e.appendChild(o)
    },
    hideLoadingMore: function(e) {
        e && e.removeChild(e.lastChild)
    },
    onShortenedScrolled: function() {
        if (!cur.isLoading && !cur.allLoaded) {
            var e = document.getElementById("page_body"),
                o = document.getElementById("last_shortened_list");
            document.body.scrollHeight - e.scrollHeight < 70 && window.innerHeight + window.scrollY >= document.body.offsetHeight && (cur.isLoading = !0, Shortener.showLoadingMore(o), ajax.post("/cc", {
                act: "load_more",
                offset: cur.loadedCount,
                count: cur.chunkSize
            }, {
                onDone: function(e, t) {
                    Shortener.hideLoadingMore(o), t > 0 && (ge("last_shortened_list").innerHTML += e, cur.loadedCount += t), t < cur.chunkSize && (cur.allLoaded = !0), cur.isLoading = !1
                },
                onFail: function() {
                    Shortener.hideLoadingMore(o), cur.isLoading = !1
                }
            }))
        }
    },
    onPrivateLinkSwitched: function() {
        checkbox = document.getElementById("private_link"), "checkbox on" == checkbox.className ? checkbox.className = "checkbox" : checkbox.className = "checkbox on"
    },
    showStats: function(e, o) {
        if (!getSelection().toString())
            if (e.ctrlKey || e.metaKey) {
                var t = window.open(o, "_blank");
                t.focus()
            } else location.href = o
    }
};
try {
    stManager.done("shortener.js")
} catch (e) {}