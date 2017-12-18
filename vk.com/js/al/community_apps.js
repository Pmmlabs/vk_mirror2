var CommunityApps = {
    showInstall: function(s, n) {
        return cancelEvent(n), showApp(n, s, !0)
    },
    showManage: function(s, n, a) {
        return cancelEvent(a), showApp(a, s, !1, null, n)
    },
    attach: function(s, n, a, p, o) {
        cur.gid ? GroupsEdit.app.attach(s, n, a, p) : Apps.addToMineGroups(s, n, "catalog", o)
    },
    searchInp: ge("s_search"),
    isSearch: !1,
    searchStr: "",
    onChangeQuery: function(s, n, a) {
        if (s.length < 3 && (s = ""), !CommunityApps.isSearch && CommunityApps.searchStr !== s) {
            var p = {
                act: "community_apps_search",
                q: s
            };
            CommunityApps.searchStr = s, ajax.post("al_apps.php", p, {
                cache: 1,
                onDone: function(s) {
                    val(ge("apps_group_catalog_rows"), s)
                },
                showProgress: function() {
                    CommunityApps.isSearch = !0, CommunityApps.searchInp && uiSearch.showProgress(CommunityApps.searchInp)
                },
                hideProgress: function() {
                    CommunityApps.isSearch = !1, CommunityApps.searchInp && uiSearch.hideProgress(CommunityApps.searchInp)
                }
            })
        }
    }
};
try {
    stManager.done("community_apps.js")
} catch (e) {}