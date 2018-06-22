var CommunityApps = {
    INSTALL_MARKET_PAGE: "add_community_app.php",
    INSTALL_MARKET_ACT: "a_install_market_app",
    showInstall: function(a, o) {
        return cancelEvent(o), showApp(o, a, !0)
    },
    showManage: function(a, o, n) {
        return cancelEvent(n), showApp(n, a, !1, null, o)
    },
    attach: function(a, o, n, t, r, s) {
        cur.gid ? GroupsEdit.app.attach(a, o, n, t, s) : Apps.addToMineGroups(a, o, "catalog", r)
    },
    installMarket: function(a, o, n) {
        return cur.gid ? this.installMarketToGroup(a, o, cur.gid) : (n && WkView && WkView.hide(), showBox("apps", {
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
    installMarketToGroup: function(a, o, n) {
        ajax.post(this.INSTALL_MARKET_PAGE, {
            act: this.INSTALL_MARKET_ACT,
            hash: o,
            group_id: n
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
    onChangeQuery: function(a, o, n) {
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