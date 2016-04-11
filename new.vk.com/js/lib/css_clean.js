
var CssClean = {

  init: function(cssFileName) {
    var already = ls.get('css_clean_' + cssFileName);

    if (already) {
      CssClean.rules = already;
      CssClean.fn = cssFileName;
      CssClean.orig = ls.get('css_clean_orig_' + cssFileName);

      CssClean.start();
    } else {
      var request = new XMLHttpRequest();
      request.open('GET', cssFileName, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          CssClean.orig = request.responseText;
          CssClean.parse(cssFileName, request.responseText);
        }
      };

      request.onerror = function() {
      };

      request.send();
    }
  },

  parse: function(cssFileName, content) {
    var lines = content.split('\n');
    var rules = [];
    var state = 'end';

    var selectors = '';
    var lineNo = 0;

    function parseSelectors() {
      selectors = selectors.split(',');
      each(selectors, function(i, s) {
        s = trim(s);

        if (s.indexOf(':') >= 0) {
          return;
        }

        rules.push({
          line: lineNo + i,
          selector: s
        });
      });
      selectors = '';
    }

    for (lineNo = 0, len = lines.length; lineNo < len; lineNo++) {
      var line = lines[lineNo];

      if (state == 'wait_closing') {
        var cb_e = line.indexOf('}');
        if (cb_e >= 0) {
          state = 'end';
        }
        continue;
      }

      var cb_s = line.indexOf('{');

      if (cb_s == -1) {
        selectors += line;
      } else {
        selectors += line.substring(0, cb_s);
      }

      if (cb_s >= 0) {
        parseSelectors();

        state = 'wait_closing';
      }
    }

    CssClean.rules = rules;
    CssClean.fn = cssFileName;

    CssClean.start();
  },

  start: function() {
    CssClean.check();

    var observer = new MutationObserver(function(mutations) {
      var needCheck = false;
      mutations.forEach(function(mutation) {
        if (mutation.type == 'attributes' && mutation.attributeName == 'style') return;
        if (hasClass(mutation.target, 'tt_w')) return;

        needCheck = true;
      });

      CssClean.check();
    });

    var config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };

    observer.observe(document.body, config);

    console.log("started");
  },

  check: function() {
    var rules = CssClean.rules;
    var rulesRemain = [];

    for (var i = 0, len = rules.length; i < len; i++) {
      var r = rules[i];
      if (!document.querySelector(r.selector)) {
        rulesRemain.push(r);
      }
    }

    console.log(rulesRemain.length);

    CssClean.rules = rulesRemain;

    ls.set('css_clean_' + CssClean.fn, CssClean.rules);
    ls.set('css_clean_orig_' + CssClean.fn, CssClean.orig);
  },

  report: function() {
    var origLines = CssClean.orig.split('\n');
    var reportLines = [];

    var remainMap = {};
    each(CssClean.rules, function(i, r) {
      remainMap[r.line] = r;
    });

    for (var lineNo = 0, len = origLines.length; lineNo < len; lineNo++) {
      var line = origLines[lineNo];

      if (remainMap[lineNo]) {
        reportLines.push('\n/* unused: ' + remainMap[lineNo].selector + ' */');
      }

      reportLines.push(line);
    }

    console.log(reportLines.join('\n'));

  }

}
