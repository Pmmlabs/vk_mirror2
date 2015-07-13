function skinBoxTabs(box, tabs, curTab, tabSwitch) {
  var html = [];
  for (var i in tabs) {
    var tabHref = tabs[i].href ? (' href="' + tabs[i].href + '"') : '';
//    html += '<span class="tab' + ((curTab == i) ? ' selected' : '') + '" onclick="cur.onTabSwitch['+tabSwitch+'](\''+i+'\');removeClass(geByClass(\'selected\',this.parentNode)[0],\'selected\');addClass(this, \'selected\');return false;"><a'+tabHref+'><b>'+tabs[i].label+'</b></a></span>';
    html.push('\
<div class="fl_l summary_tab' + ((curTab == i) ? '_sel' : '') + '">\
  <a class="summary_tab2"' + tabHref + ' onclick="if (checkEvent(event)) return; cur.onTabSwitch[' + tabSwitch + '](\'' + i + '\');geByClass1(\'summary_tab_sel\', this.parentNode.parentNode).className=\'fl_l summary_tab\';this.parentNode.className=\'fl_l summary_tab_sel\';return false;">\
    <div class="summary_tab3"><nobr>' + tabs[i].label + '</nobr></div>\
  </a>\
</div>\
    ');
  }
  geByClass1('summary_tabs', box.bodyNode).innerHTML = html.join('');
}

function setUpTabbedBox(box, width, tabsObj, curTab, preload, arg0, arg1) {
  if (!cur.onTabSwitch) cur.onTabSwitch = [];
  var tabSwitch = cur.onTabSwitch.push(function(tab) {
    var t = tabsObj[tab];
    if (box.ctab != tab) {
      box.ctab = tab;
      if (t.func && !eval('((function() {' + t.func + '})())')) {
        return;
      }
      box.loadTabContent(t.url, t.data, tab);
    }
  });
  skinBoxTabs(box, tabsObj, curTab, tabSwitch-1);
  box.setOptions({bodyStyle: 'padding: 0px;', width: intval(width) || undefined});
  extend(box, {
    tabs: tabsObj,
    ctab: curTab,
    tabContent: geByClass1('tabbed_container', box.bodyNode),
    loadTabContent: function(url, params, tab) {
      params = extend(params || {}, {
        only_content: 1,
        tab: tab
      });
      ajax.post(url, params, {
        onDone: function(title, html, js) {
          if (tab && box.ctab != tab) {
            return;
          }
          if (title) {
            box.setOptions({title: title});
          }
          if (html) {
            box.tabContent.innerHTML = html;
          }
          var fn = eval('((function() { return function() { var box = this; ' + (js || '') + '}; })())'); // IE :(
          fn.call(box);
        },
        showProgress: box.showProgress,
        hideProgress: box.hideProgress,
        cache: 1
      });
    }
  });
  if (preload) ajax.preload(arg0, extend(arg1, {only_content: 1, tab: curTab}), preload);
}

try{stManager.done('box.js');} catch(e) {}
