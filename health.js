var Health = {};

Health.toggleDistributionGraph = function(event, graphBindingId1, graphBindingId2) {
  var graph1 = ge('health_distribution_graph_' + graphBindingId1);
  var graph2 = ge('health_distribution_graph_' + graphBindingId2);
  if (isVisible(graph1)) {
    show(graph2);
    hide(graph1);
  } else {
    show(graph1);
    hide(graph2);
  }
}

Health.toggleSmallGraphs = function(event, graphType) {
  var tabsWrap = event.target.parentNode.parentNode;
  var selectedTab = geByClass1('selected', tabsWrap);
  removeClass(selectedTab, 'selected');
  addClass(event.target, 'selected');
  nav.setLoc(event.target.getAttribute('href').replace(/^\//, ''));
  if (graphType === 'count') {
    each(geByTag('img', ge('health_small_graphs_count')), showImage);
    show('health_small_graphs_count');
    hide('health_small_graphs_time');
  } else {
    each(geByTag('img', ge('health_small_graphs_time')), showImage);
    show('health_small_graphs_time');
    hide('health_small_graphs_count');
  }
  function showImage(k, v) {
    var src = v.getAttribute('src2');
    if (src) {
      v.removeAttribute('src2');
      v.setAttribute('src', src);
    }
  }
}

try{stManager.done('health.js');}catch(e){}
