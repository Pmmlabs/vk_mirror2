var Shortener = {
    init: function() {
        setTimeout(elfocus.pbind('shorten_link'));
        window.addEventListener("scroll", this.onShortenedScrolled);

        cur.loadedCount = 20;
        cur.chunkSize = 20;
    },

    submitLink: function(hash) {
        var e = ge('shorten_error');
        e.className = 'shorten_error';

        var privateFlag = 0;

        var privateLink = document.getElementById('private_link');
        if (privateLink && privateLink.className == 'checkbox on') {
            privateFlag = 1;
        }

        ajax.post('/cc', {
            act: 'shorten',
            link: val('shorten_link'),
            hash: hash,
            private: privateFlag
        }, {
            onDone: function(text, lastShortenedHtml) {
                var input = ge('shorten_link');

                input.value = text;
                input.select();

                setTimeout(cur.selResult, 0);

                ge('last_shortened_block').innerHTML = lastShortenedHtml;

                var testClass = "testClass";
                var contentBlock = document.getElementById('last_shortened_block');
                contentBlock.className += " " + testClass;
                var reg = new RegExp('(\\s|^)' + testClass + '(\\s|$)');
                contentBlock.className = contentBlock.className.replace(reg, ' ');

                var height = contentBlock.offsetHeight;

                cur.offset++;

                if (privateLink) {
                    privateLink.className = 'checkbox';
                }

                cur.loadedCount = 20;
                cur.allLoaded = false;
                cur.isLoading = false;
            },
            onFail: function(text) {
                if (!text) return;

                var e = ge('shorten_error');
                e.className = 'shorten_error_display';
                val('shorten_msg', text);
                if (!isVisible(e)) {
                    slideDown(e, 200);
                }

                return true;
            },
            showProgress: lockButton.pbind('shorten_btn'),
            hideProgress: unlockButton.pbind('shorten_btn')
        });
    },

    deleteLastShortened: function(event, key, timestamp, hash) {
        ajax.post('/cc', {
            act: 'delete',
            key: key,
            timestamp: timestamp,
            hash: hash,
            count: cur.loadedCount
        }, {
            onDone: function(lastShortenedHtml) {
                ge('last_shortened_block').innerHTML = lastShortenedHtml;
            },
            onFail: function() {
                return true;
            }
        });

        if (!event) {
            event = window.event;
        }
        event.cancelBubble = true;
        event.stopPropagation();
    },

    selResult: function() {
        var s = ge('shorten_link');
        if (s.createTextRange) {
            var range = s.createTextRange();
            range.collapse(true);
            range.moveEnd('character', 0);
            range.moveStart('character', val(s).length);
            range.select();
        } else if (s.setSelectionRange) {
            s.setSelectionRange(0, val(s).length);
        }
    },

    highlightDeleteIcon: function(rowNumber) {
        ge('delete_icon_' + rowNumber).style.opacity = Math.max(0.5, ge('delete_icon_' + rowNumber).style.opacity);
    },

    showDeleteIcon: function(object, rowNumber, text) {
        ge('delete_icon_' + rowNumber).style.opacity = 1.0;
        showTooltip(object, {
            text: text,
            black: 1,
            shift: [15, 11, 0]
        })
    },

    showPrivateLinkTooltip: function(object, text) {
        showTooltip(object, {
            text: text,
            black: 1,
            shift: [15, 11, 0]
        })
    },

    showLoadingMore: function(lastShortenedList) {
        var loadMore = document.createElement('div');
        loadMore.className = 'load_more';

        lastShortenedList && lastShortenedList.appendChild(loadMore);
    },

    hideLoadingMore: function(lastShortenedList) {
        lastShortenedList && lastShortenedList.removeChild(lastShortenedList.lastChild);
    },

    onShortenedScrolled: function() {
        if (cur.isLoading || cur.allLoaded) {
            return;
        }

        var body = document.getElementById('page_body');
        var lastShortenedList = document.getElementById('last_shortened_list');

        if ((document.body.scrollHeight - body.scrollHeight < 70) && (window.innerHeight + window.scrollY >= document.body.offsetHeight)) {
            cur.isLoading = true;

            Shortener.showLoadingMore(lastShortenedList);

            ajax.post('/cc', {
                act: 'load_more',
                offset: cur.loadedCount,
                count: cur.chunkSize
            }, {
                onDone: function(html, count) {
                    Shortener.hideLoadingMore(lastShortenedList);

                    if (count > 0) {
                        ge('last_shortened_list').innerHTML += html;
                        cur.loadedCount += count;
                    }

                    if (count < cur.chunkSize) {
                        cur.allLoaded = true;
                    }

                    cur.isLoading = false;
                },
                onFail: function() {
                    Shortener.hideLoadingMore(lastShortenedList);

                    cur.isLoading = false;
                }
            });
        }
    },

    onPrivateLinkSwitched: function() {
        checkbox = document.getElementById('private_link');

        if (checkbox.className == 'checkbox on') {
            checkbox.className = 'checkbox';
        } else {
            checkbox.className = 'checkbox on';
        }
    },

    showStats: function(event, url) {
        if (getSelection().toString()) {
            return;
        }

        if (event.ctrlKey || event.metaKey) {
            var win = window.open(url, '_blank');
            win.focus();
        } else {
            location.href = url;
        }
    }
};

try {
    stManager.done('shortener.js');
} catch (e) {}