var EditDB = {
  getHighlight: function(indxr, q) {
    var delimiter = indxr.delimiter, trimmer = indxr.trimmer;

    q += ' ' + (parseLatin(q) || '');
    q = escapeRE(q).replace(/&/g, '&amp;');
    q = q.replace(trimmer, '').replace(delimiter, '|');
    return {
      re: new RegExp('(' + q + ')', 'gi'),
      val: '<span class="edb_hl">$1</span>'
    }
  },

  hlReg: function(el, on) {
    el = domPN(el);
    el.href = el.href.replace(on ? 'cities' : 'regions', on ? 'regions' : 'cities');
  },
  initCountries: function(lng) {
    placeholderSetup('edb_filter', {back: true});
    elfocus('edb_filter');
    extend(cur, {
      lang: extend(cur.lang || {}, lng),
      all: [],
      names: {},
      hidden: {}
    });
    each(ge('edb_countries').childNodes, function() {
      cur.all.push(this.id);
      cur.names[this.id] = this.firstChild.nodeValue;
    });
    cur.index = new vkIndexer(cur.all, function(obj) {
      return trim(cur.names[obj]);
    });
  },
  filterCountries: function(q) {
    q = trim(val('edb_filter', q ? trim(q) : q));
    toggle('edb_filter_reset', !!q);
    var childs = ge('edb_countries').childNodes, hl = q ? EditDB.getHighlight(cur.index, q) : false;
    if (q) {
      var lst = cur.index.search(q), shown = {};
      if (lst.length) {
        for (var i in lst) {
          shown[lst[i]] = 1;
        }
        each(childs, function() {
          toggle(this, !!shown[this.id]);
          this.replaceChild(ce('span', {innerHTML: cur.names[this.id].replace(hl.re, hl.val)}), this.firstChild);
        });
        show('edb_countries');
        hide('edb_no_countries');
      } else {
        hide('edb_countries');
        show('edb_no_countries');
      }
    } else {
      elfocus('edb_filter');
      show('edb_countries');
      hide('edb_no_countries');
      each(childs, function() {
        show(this);
        this.replaceChild(ce('span', {innerHTML: cur.names[this.id]}), this.firstChild);
      });
    }
  },

  check: function(el) {
    if (hasClass(el, 'edb_disabled')) return;
    toggleClass(el, 'edb_checked');

  },
  checkCheck: function(el, ev) {
    if (hasClass(el, 'edb_disabled')) return;
    if (ev.ctrlKey) {
      addClass(el, 'edb_checked');
    } else if (ev.shiftKey) {
      removeClass(el, 'edb_checked');
    }
  },

  initCities: function(lng) {
    cur.lang = extend(cur.lang || {}, lng);
    each(geByClass('edb_children'), function() {
      this.title = winToUtf(getLang('edit_child_tooltip'));
    });
    each(geByClass('edb_checkable'), function() {
      this.onclick = EditDB.check.pbind(this);
      this.onmouseover = EditDB.checkCheck.pbind(this);
    });
    each(['edb_city_by_name', 'edb_city_by_uni', 'edb_city_by_school'], function(k, v) {
      if (val(v)) elfocus(v);
    });
  }
};

try{stManager.done('editdb.js');}catch(e){}