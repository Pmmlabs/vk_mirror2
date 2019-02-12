var SiteStats = {
    toggleSmallGraphs: function(event, graphType) {
        var tabsWrap = event.target.parentNode.parentNode;
        var selectedTab = geByClass1('selected', tabsWrap);
        removeClass(selectedTab, 'selected');
        addClass(event.target, 'selected');
        nav.setLoc(event.target.getAttribute('href').replace(/^\//, ''));


        each(geByClass('site_stats_small_graphs', ge('site_stats_page')), hide);
        each(geByTag('img', ge('site_stats_small_graphs_' + graphType)), function(i, el) {
            el.setAttribute('src', el.getAttribute('src1'));
        });
        show('site_stats_small_graphs_' + graphType);
    },
    toggleDemographyGraphs: function() {
        if (isVisible('demography_graphs')) {
            hide('demography_graphs');
            show('demography_charts');
        } else {
            hide('demography_charts');
            show('demography_graphs');
        }
        return false;
    },

    updateSankeyData: function(params, cur) {
        if (!params) return false;
        if (!params.sankey_id || !cur) return false;

        if (!params.game_id) {
            params['game_id'] = cur.source_id[params.sankey_id];
        }

        ajax.post('site_stats.php', params, {
            onDone: function(data) {
                cur.sankeyLinks[params.sankey_id] = data['links'];
                cur.sankeyNodes[params.sankey_id] = data['nodes'];
                cur.changeSvgSankeys(null, params.sankey_id, 0);
            }
        });
        return false;
    },

    updateTable: function(params) {
        if (!params) return false;
        if (!params.table_id || !ge(params.table_id)) return false;

        ajax.post('site_stats.php', params, {
            onDone: function(data) {
                ge(params.table_id).innerHTML = data;
            },
            showProgress: show.pbind('ref_table_progress'),
            hideProgress: hide.pbind('ref_table_progress')
        });
        return false;
    },

    updateReferrersTable: function(params) {
        if (!params) return false;

        params = extend(cur.statsTableParams || {}, params);
        params.act = 'referrers';
        params.upd = 1;
        ajax.post('site_stats.php', params, {
            onDone: function(data) {
                cur.statsTableParams = data.params;
                ge('site_stats_navigation').innerHTML = data.nav;
                if (data.params.value_type == 'visitors') {
                    removeClass('table_value_type1', 'graph_menu_item_sel');
                    addClass('table_value_type2', 'graph_menu_item_sel');
                } else {
                    removeClass('table_value_type2', 'graph_menu_item_sel');
                    addClass('table_value_type1', 'graph_menu_item_sel');
                }
                var sel = data.params.page == 'keywords' ? ge('searchers_sel') : ge('sources_sel');
                if (sel) {
                    var s = geByTag('a', sel);
                    data.params.searcher = data.params.searcher || 0;
                    for (var i in s) {
                        if (i == data.params.searcher) {
                            addClass(s[i], 'site_stats_tbl_control_active');
                        } else {
                            removeClass(s[i], 'site_stats_tbl_control_active');
                        }
                    }
                }

                var curSort = cur.statsTable._curSortOrder;
                var curPage = cur.statsTable.curPage;

                cur.statsTable.setOptions(data.options);
                cur.statsTable.setContent(data.content);
                cur.statsTable.applyData();
                cur.statsTable._initSearchHashes();
                if (curSort !== undefined) cur.statsTable.setSortingOrder(curSort[0], curSort[1]);
                cur.statsTable.goToPage(curPage);

                var loc = nav.objLoc;
                extend(loc, data.params);
                nav.setLoc(loc);
            },
            showProgress: show.pbind('ref_table_progress'),
            hideProgress: hide.pbind('ref_table_progress')
        });
        return false;
    },
    showReferrersStat: function(type, id, word) {
        showBox('site_stats.php', {
            act: 'a_referrers_box',
            type: type,
            oid: id,
            word: word
        }, {
            params: {
                width: 650,
                hideButtons: true,
                bodyStyle: 'padding: 15px 25px;'
            },
            onFail: function() {
                return true;
            }
        });
        return false;
    }
};

try {
    stManager.done('site_stats.js');
} catch (e) {}