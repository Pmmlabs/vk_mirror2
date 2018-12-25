var CommunityApps = {
    INSTALL_MARKET_PAGE: "add_community_app.php",
    INSTALL_MARKET_ACT: "a_install_market_app",
    showInstall: function(a, n) {
        return cancelEvent(n), showApp(n, a, !0, null, null, {
            install_community_app: 1
        })
    },
    showManage: function(a, n, o) {
        return cancelEvent(o), showApp(o, a, !1, null, n)
    },
    attach: function(a, n, o, t, r, s) {
        cur.gid ? GroupsEdit.app.attach(a, n, o, t, s) : Apps.addToMineGroups(a, n, "catalog", r)
    },
    installMarket: function(a, n, o) {
        return cur.gid ? this.installMarketToGroup(a, n, cur.gid) : (o && WkView && WkView.hide(), showBox("apps", {
            act: "add_market_app_to_groups_box"
        }, {
            params: {
                dark: 1,
                width: 450,
                bodyStyle: "padding: 22px 0 0"
            },
            onFail: function(a) {
                return showFastBox(getLang("global_error"), a), !0
            }
        })), !1
    },
    installMarketToGroup: function(a, n, o) {
        ajax.post(this.INSTALL_MARKET_PAGE, {
            act: this.INSTALL_MARKET_ACT,
            hash: n,
            group_id: o
        }, {
            onDone: function(a) {
                nav.go(a)
            },
            onFail: function(a) {
                return a = a || getLang("global_error"), curBox().hide(), showFastBox(getLang("global_error"), a), !0
            },
            showProgress: lockButton.pbind(a),
            hideProgress: unlockButton.pbind(a)
        })
    },
    searchInp: ge("s_search"),
    isSearch: !1,
    searchStr: "",
    onChangeQuery: function(a, n, o) {
        if (a.length < 3 && (a = ""), !CommunityApps.isSearch && CommunityApps.searchStr !== a) {
            var t = {
                act: "community_apps_search",
                q: a
            };
            CommunityApps.searchStr = a, ajax.post("al_apps.php", t, {
                cache: 1,
                onDone: function(a) {
                    val(ge("apps_group_catalog_rows"), a)
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