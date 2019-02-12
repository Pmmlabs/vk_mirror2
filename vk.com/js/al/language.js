var Language = {
    init: function() {
        cur.languagesListSearch = new vkIndexer(cur.languagesList, function(row) {
            return replaceEntities(row.name) + ' ' + row.name_rus + ' ' + row.name_eng;
        });
        cur.destroy.push(function() {
            delete cur.languagesListSearch;
        });
        elfocus('language_search_form');
    },
    makeResults: function(langs, str) {
        if (langs.length) {
            var columns = {},
                i = 0,
                result = '',
                langReplace = false,
                maxRows = Math.ceil(langs.length / cur.columnsNum);
            if (str) {
                str += ' ' + (parseLatin(str) || '');
                str = trim(escapeRE(str.replace(/[,]/g, '')));
                var match = str.replace(cur.languagesListSearch.delimiter, '|').replace(/(^\||\|$|\?)/g, ''),
                    langReplace = new RegExp('(' + match + ')', 'gi');
            }
            each(langs, function(k, v) {
                var column = Math.floor(i / maxRows);
                if (!columns['column_' + column]) {
                    columns['column_' + column] = '';
                }
                var row = clone(v);

                if (str) {
                    row.name = replaceEntities(row.name);
                    row.name = row.name.replace(langReplace, '<span class="language_name_hl">$1</span>');
                }
                columns['column_' + column] += getTemplate('langRow', row);
                i++;
            });
            each(columns, function(k, v) {
                result += getTemplate('langColumn', {
                    column: v
                });
            });
            return result;
        }
        return '';
    },
    search: function(str) {
        var languagesList = ge('all_languages_list');
        str = trim(str);
        if (str.length > 0) {
            var searchResults = cur.languagesListSearch.search(str);
        } else {
            var searchResults = cur.languagesList;
        }
        if (window.tooltips) {
            tooltips.destroyAll();
        }
        var results = Language.makeResults(searchResults, str);
        toggle('languages_not_found', !results);
        toggle(languagesList, results);
        val(languagesList, results);
    },
    showEngName: function(el) {
        showTooltip(el, {
            text: attr(el, 'data-eng-name'),
            black: 1,
            shift: [0, 0, -30]
        });
    },
    changeLang: function(el, langId, hash) {
        if (hasClass(el, 'language_selected')) {
            return false;
        }
        ajax.post('al_index.php', {
            act: 'change_lang',
            lang_id: langId,
            hash: hash
        }, {
            onDone: topMsg
        });
    },
    showBetaTooltip: function(el, ev) {
        cancelEvent(ev);
        showTooltip(el, {
            text: getLang('global_language_beta_version'),
            black: 1,
            shift: [16, 4, 0]
        });
    },
    showOtherLanguages: function() {
        curBox().hide();
        showBox('lang.php', {
            act: 'lang_dialog',
            all: 1
        }, {
            params: {
                dark: true,
                bodyStyle: 'padding: 0px'
            },
            noreload: true
        });
    }
};

try {
    stManager.done('language.js');
} catch (e) {}