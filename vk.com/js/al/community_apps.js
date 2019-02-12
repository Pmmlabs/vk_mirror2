var CommunityApps = {
    INSTALL_MARKET_PAGE: 'add_community_app.php',
    INSTALL_MARKET_ACT: 'a_install_market_app',

    showInstall: function(aid, e) {
        cancelEvent(e);
        return showApp(e, aid, true, null, null, {
            'install_community_app': 1
        });
    },
    showManage: function(aid, gid, e) {
        cancelEvent(e);
        return showApp(e, aid, false, null, gid);
    },
    attach: function(aid, hash, e, verified, fromGid, uncounted) {
        if (cur.gid) {
            GroupsEdit.app.attach(aid, hash, e, verified, uncounted);
        } else {
            Apps.addToMineGroups(aid, hash, 'catalog', fromGid)
        }
    },
    installMarket: function(btn, hash, fromBox) {
        if (cur.gid) {
            this.installMarketToGroup(btn, hash, cur.gid);
        } else {
            if (fromBox) {
                WkView && WkView.hide();
            }
            showBox('apps', {
                act: 'add_market_app_to_groups_box'
            }, {
                params: {
                    dark: 1,
                    width: 450,
                    bodyStyle: 'padding: 22px 0 0'
                },
                onFail: function(error) {
                    showFastBox(getLang('global_error'), error);
                    return true;
                }
            });
        }

        return false;
    },
    installMarketToGroup: function(btn, hash, groupId) {
        ajax.post(this.INSTALL_MARKET_PAGE, {
            act: this.INSTALL_MARKET_ACT,
            hash: hash,
            group_id: groupId
        }, {
            onDone: function(href) {
                nav.go(href);
            },
            onFail: function(rejection) {
                rejection = rejection || getLang('global_error');
                curBox().hide();
                showFastBox(getLang('global_error'), rejection);
                return true;
            },
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn)
        });
    },
    searchInp: ge('s_search'),
    isSearch: false,
    searchStr: '',
    onChangeQuery: function(query, suggestedQuery, fromHistory) {
        if (query.length < 3) query = '';
        if (!CommunityApps.isSearch && CommunityApps.searchStr !== query) {
            var params = {
                'act': 'community_apps_search',
                'q': query
            };
            CommunityApps.searchStr = query;
            ajax.post('al_apps.php', params, {
                cache: 1,
                onDone: function(html) {
                    val(ge('apps_group_catalog_rows'), html);
                },
                showProgress: function() {
                    CommunityApps.isSearch = true;
                    CommunityApps.searchInp && uiSearch.showProgress(CommunityApps.searchInp);
                },
                hideProgress: function() {
                    CommunityApps.isSearch = false;
                    CommunityApps.searchInp && uiSearch.hideProgress(CommunityApps.searchInp)
                }
            });
        }
    }
};

try {
    stManager.done('community_apps.js');
} catch (e) {}