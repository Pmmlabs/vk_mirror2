var PaysuppAdmin = {
    searchBan: function(a, n, p) {
        var e = extend({}, nav.objLoc);
        n ? e.q = n : e.q && delete e.q, e.offset && delete e.offset, uiSearch.showProgress(a), nav.go(e)
    },
    openBanBox: function() {
        cur.banBox = showBox("paysupp_admin.php", {
            act: "a_ban_form"
        })
    },
    createBan: function(a) {
        var n = {
            act: "a_ban_add",
            hash: a,
            id: val("paysupp_ban__id"),
            phone: val("paysupp_ban__phone"),
            card: val("paysupp_ban__card")
        };
        return n.id || n.card || n.phone ? void ajax.post("paysupp_admin.php", n, {
            onDone: function(a) {
                cur.banBox.hide(), showDoneBox(a)
            }
        }) : (notaBene("paysupp_ban__card"), notaBene("paysupp_ban__phone"), notaBene("paysupp_ban__id"), !1)
    },
    _eof: 1
};
try {
    stManager.done("paysupp_admin.js")
} catch (e) {}