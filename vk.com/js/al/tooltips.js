var tooltips = {
    show: function(el, options) {
        if (el.hidetimer) {
            if (el.hidetimer) clearTimeout(el.hidetimer);
            el.hidetimer = 0;
            return;
        }
        if (!el.tt) return;
        el.tt.shown = false;
        if (el.ttimer) clearTimeout(el.ttimer);
        if (isFunction(options.text)) {
            var tt_text = domByClass(el.tt.container, 'tt_text');
            if (tt_text) {
                var text = options.text();

                if (text) {
                    tt_text.innerHTML = text;
                } else {
                    return;
                }
            }
        }

        var opts = extend(el.tt.opts ? clone(el.tt.opts) : {}, options || {});
        var isNewTT = opts.dir !== undefined;
        if (!el.tt.el) {
            el.tt = 'show';
            el.ttimer = setTimeout(function() {
                if (el.tt.el) {
                    opts.showdt = 0;
                    tooltips.show(el, opts);
                    return;
                }
                el.tt = 'shownow';
            }, opts.showdt || 0);
            return;
        }
        var canshow = opts.js ? (eval('(function(){return function(){var tip=this;' + opts.js + '};})()').apply(el.tt) !== false) : true;
        if (!canshow) {
            return;
        }
        if (isVisible(el.tt.container)) {
            if (!el.tt.showing) {
                animate(el.tt.container, {
                    opacity: 1
                }, opts.showsp !== undefined ? opts.showsp : 200);
            }
            return;
        }
        el.ttimer = setTimeout(function() {
            var container = el.tt.container;
            if (isVisible(container)) return;

            var xy = opts.forcexy ? opts.forcexy : getXY(el),
                elsize = opts.forcesize ? opts.forcesize : getSize(el, false, true),
                toup = opts.toup,
                asrtl = vk.rtl && !opts.asrtl || opts.asrtl && !vk.rtl,
                hsize = ge('page_header_wrap') && isAncestor(el, 'page_layout') ? getSize('page_header_wrap') : (ge('ads-app-header') ? getSize('ads-app-header') : [0, 0]);

            if (!elsize[0] && !elsize[1]) {
                hide(el.tt.container);
                return;
            }

            container.style.opacity = 0;
            if (opts.width) {
                container.style.width = opts.width + 'px';
            }
            if (opts.maxWidth) {
                container.style['max-width'] = opts.maxWidth + 'px';
            }
            show(container);
            if (!isNewTT) {
                container.firstChild.className = 'toup' + (opts.toup ? 1 : '');
            }
            var shift = opts.shift;
            if (isFunction(shift)) {
                shift = shift();
            }
            if (shift !== undefined && shift.length == 2) {
                shift.push(shift[1]);
            }

            var par = domPN(container);
            var st = (bodyNode.scrollTop || htmlNode.scrollTop || 0),
                ttsize = getSize(container),
                offsetTop = xy[1] - ttsize[1] - shift[1] - hsize[1] - st,
                offsetBottom = lastWindowHeight - (xy[1] + elsize[1] + ttsize[1] + shift[2]) + st,
                needDown = offsetTop < 0,
                needUp = offsetBottom < 0,
                forceNeedDown = offsetTop < 0;

            if (needDown && needUp) {
                if (offsetTop > offsetBottom && offsetTop + st > 0) {
                    toup = true;
                    forceNeedDown = false;
                }

                if (toup && forceNeedDown) {
                    toup = false;
                } else if (!toup && needUp && !forceNeedDown) {
                    toup = true;
                }
            } else {
                if (toup && needDown) {
                    toup = false;
                } else if (!toup && needUp && !needDown) {
                    toup = true;
                }
            }

            var needLeft = opts.needLeft || ((opts.black || opts.checkLeft) && window.lastWindowWidth && lastWindowWidth - (xy[0] + (asrtl ? elsize[0] + shift[0] : ttsize[0] - shift[0])) < 1);
            var cont_class = '';
            if (opts.forceright) needLeft = 0;
            if (opts.forcetodown) toup = false;
            if (opts.forcetoup) toup = true;
            if (isNewTT) {
                removeClass(container, 'tt_up');
                removeClass(container, 'tt_down');
                if (!opts.dir || !inArray(opts.dir, ['up', 'down', 'left', 'right'])) {
                    cont_class = 'tt_' + (toup ? 'down' : 'up');
                } else {
                    cont_class = 'tt_' + opts.dir;
                }
                addClass(container, cont_class);
                toggleClass(container, 'toleft', !!needLeft);
                ttsize = getSize(container);
            } else {
                cont_class = 'toup' + (toup ? 1 : '');
                if (toup != opts.toup || needLeft) {
                    cont_class += needLeft ? ' toleft' : '';
                    ttsize = getSize(container);
                }
                container.firstChild.className = cont_class;
                addClass(container, toup ? 'tt_toup' : '');
            }

            var parXY = getXY(par);
            xy[0] -= parXY[0] - par.scrollLeft;
            xy[1] -= parXY[1] - par.scrollTop;

            el.tt.zIndexEls = [];
            if (!opts.noZIndex) {
                while (par && par != bodyNode && !hasClass(par, 'scroll_fix')) {
                    var parZ = intval(getStyle(par, 'zIndex')),
                        ttCount = intval(par.ttCount);

                    if (parZ && !ttCount) break;

                    setStyle(par, 'zIndex', opts.zIndex || 100);
                    el.tt.zIndexEls.push(par);
                    par.ttCount = ttCount + 1;
                    par = domPN(par);
                }
            }

            var newtop;
            if (isNewTT) {
                if (inArray(opts.dir, ['left', 'right']) && !opts.forcetoup && !opts.forcetodown) {
                    newtop = xy[1] - Math.floor(ttsize[1] / 2) - shift[1];
                } else if (toup) {
                    newtop = xy[1] - (ttsize[1] + shift[1]);
                } else {
                    newtop = xy[1] + elsize[1] + shift[2];
                }
            } else {
                newtop = xy[1] + (toup ? -(ttsize[1] + shift[1]) : (elsize[1] + shift[2]));
            }
            var starttop = newtop + intval(opts.slide) * (toup ? -1 : 1);
            var newleft = xy[0] + (asrtl ? (shift[0] + elsize[0] - ttsize[0]) : (toup ? -shift[0] : -(shift[3] || shift[0])));
            if (needLeft) {
                newleft -= (ttsize[0] - (opts.reverseOffset || 39)) * (asrtl ? -1 : 1);
            }

            if (opts.center) {
                addClass(container, 'tocenter');
                if (ttsize[0] != elsize[0]) newleft -= asrtl ? 0 : (ttsize[0] - elsize[0]) / 2;
            }

            var startleft = newleft + (asrtl ? -1 : 1) * intval(opts.slideX);

            if ( // abort showing tt if it is not enough place for it in window
                opts.showIfFit && (
                    (newleft + parXY[0]) < 0 ||
                    (newleft + parXY[0] + ttsize[0]) > lastWindowWidth ||
                    (newtop + parXY[1]) < 0 ||
                    (newtop + parXY[1] + ttsize[1]) > lastWindowHeight
                )
            ) return hide(el.tt.container);

            el.tt.showing = true;
            setStyle(container, {
                top: starttop,
                left: startleft
            });
            var animParams = {
                opacity: 1
            };
            if (startleft != newleft) {
                animParams.left = newleft;
            }
            if (starttop != newtop) {
                animParams.top = newtop;
            }
            animate(container, animParams, opts.showsp !== undefined ? opts.showsp : 200, function() {
                el.tt && el.tt.showing && (el.tt.showing = false);
                if (opts.onShowEnd) opts.onShowEnd();
                el.tt && (el.tt.shown = true);
            });
            if (opts.onShowStart) opts.onShowStart(el.tt);
        }, opts.showdt || 0);
    },
    clearZindex: function(el) {
        if (el.tt && el.tt.opts && el.tt.zIndexEls) {
            each(el.tt.zIndexEls, function() {
                var ttCount = intval(this.ttCount);
                if (ttCount <= 1) {
                    setStyle(this, 'zIndex', '');
                    this.ttCount = 0;
                } else {
                    this.ttCount = ttCount - 1;
                }
            });
        }
    },
    hide: function(el, options) {
        if (el.tt) {
            el.tt.shown = false;
        }
        if ((options || {}).fasthide) {
            clearTimeout(el.hidetimer);
            clearTimeout(el.ttimer);
            el.hidetimer = 0;
            if (el.tt && el.tt.el) hide(el.tt.container);
            tooltips.clearZindex(el);
            return;
        }
        if (el.hidetimer) return;
        el.hidetimer = setTimeout(function() {
            el.hidetimer = 0;
            clearTimeout(el.ttimer);
            if (!el.tt || el.tt == 'hide' || el.tt.el && !isVisible(el.tt.container)) {
                if (el.tt && el.tt.el) hide(el.tt.container);
                tooltips.clearZindex(el);
                return;
            };

            var opts = extend(el.tt.opts ? clone(el.tt.opts) : {}, options || {});
            if (!el.tt.el) {
                el.tt = 'hide';
                return;
            }
            el.ttimer = setTimeout(function() {
                if (!opts.hasover) {
                    setStyle(el.tt.container, {
                        pointerEvents: 'none'
                    });
                }
                fadeOut(el.tt.container, opts.showsp !== undefined ? opts.showsp : 200, function() {
                    if (el.tt && el.tt.container) {
                        setStyle(el.tt.container, {
                            pointerEvents: 'auto'
                        });
                    }
                    tooltips.clearZindex(el);
                });
                if (opts.onHide) {
                    opts.onHide();
                }
            }, opts.hidedt || 0);
        }, 1);
    },
    hideAll: function(ancestor) {
        if (!cur.tooltips) return;
        for (var i = 0; i < cur.tooltips.length; ++i) {
            var tooltip = cur.tooltips[i];
            if (ancestor && !isAncestor(tooltip.el, ancestor)) {
                continue;
            }
            if (tooltip.opts.forceNoHide) {
                continue
            }
            if (tooltip.el && tooltip.el.ttimer) {
                clearTimeout(tooltip.el.ttimer);
            }
            tooltip.hide({
                fasthide: true
            });
        }
    },
    rePositionTT: function(tt) {
        if (!tt) {
            return;
        }

        var opts = tt.opts,
            el = tt.el,
            container = tt.container,
            xy = getXY(el),
            elsize = getSize(el, false, true);
        if (!elsize[0] && !elsize[1]) return;

        var ttsize = getSize(container),
            needLeft = opts.needLeft || (opts.black && lastWindowWidth && lastWindowWidth - (xy[0] + ttsize[0]) < 1),
            toup = hasClass(container.firstChild, 'toup1') || opts.toup || hasClass(container, 'tt_down'),
            shift = opts.shift,
            asrtl = vk.rtl && !opts.asrtl || opts.asrtl && !vk.rtl;
        if (isFunction(shift)) {
            shift = shift();
        }

        var parXY = getXY(domPN(container));
        xy[0] -= parXY[0];
        xy[1] -= parXY[1];

        var newleft = xy[0] + (asrtl ? (shift[0] + elsize[0] - ttsize[0]) : (toup ? -shift[0] : -(shift[3] || shift[0])));
        if (needLeft) {
            newleft -= ttsize[0] - 39;
        }
        if (opts.center && ttsize[0] != elsize[0]) {
            newleft -= (ttsize[0] - elsize[0]) / 2;
        }

        var newTop = xy[1] + (toup ? -(ttsize[1] + shift[1]) : (elsize[1] + shift[2]));

        setStyle(container, {
            left: newleft,
            top: newTop
        });
    },
    rePositionAll: function() {
        if (!cur.tooltips) return;
        for (var i = 0; i < cur.tooltips.length; ++i) {
            var opts = cur.tooltips[i].opts;
            if (!opts || !opts.nohideover && !opts.nohide) continue;

            tooltips.rePositionTT(cur.tooltips[i]);
        }
    },
    destroy: function(el) {
        if (!el) return;

        clearTimeout(el.ttimer);
        clearTimeout(el.hidetimer);

        if (el.tt && el.tt.el) {
            if (el.tt.onClean) el.tt.onClean();

            cleanElems(el.tt.container);
            removeEvent(el, 'mouseout', el.tthide);
            if (el.tt.container) { // somehow ?? it can be undefined here
                var pn = domPN(el.tt.container);
                pn && pn.removeChild(el.tt.container);
            }
            tooltips.clearZindex(el);

            el.tt.el = false;
        }
        removeAttr(el, 'tt', 'tthide', 'ttimer', 'hidetimer');
    },
    destroyAll: function(ancestor) {
        if (!cur.tooltips) return;

        for (var i = 0; i < cur.tooltips.length; ++i) {
            if (ancestor && !isAncestor(cur.tooltips[i].el, ancestor)) {
                continue;
            }
            cur.tooltips[i].destroy();
        }
        if (!ancestor) {
            delete cur.tooltips;
        }
    },

    create: function(el, options) {
        if (options.shift !== undefined && options.shift.length == 2) {
            options.shift.push(options.shift[1]);
        }
        var opts = extend({
            shift: (options.black ? [11, 8, 8] : (options.dir !== undefined ? [2, 8, 8] : [2, 3, 3])), // [leftShift, toupTopShift, notToupTopShift]
            toup: true
        }, options);
        if (options.black && !opts.dir) {
            opts.dir = 'auto';
            opts.typeClass = 'tt_black';
        }
        if (!el.tthide) {
            el.tthide = tooltips.hide.pbind(el);
            if (!options.nohide) addEvent(el, 'mouseout', el.tthide);
        }
        var no_shadow = opts.no_shadow ? ' tt_no_shadow' : '';
        if (!opts.content) {
            if (el.tt && !opts.force) {
                if (el.hidetimer) {
                    clearTimeout(el.hidetimer);
                    el.hidetimer = 0;
                    return;
                }
                return;
            }
            if (!opts.text) {
                if (!opts.url) return;
                clearTimeout(el.ttimer);
                el.ttimer = setTimeout(function() {
                    el.tt = 'show';
                    ajax.post(opts.url, opts.params || {}, {
                        onDone: function(html, js) {
                            var old = el.tt,
                                options = clone(opts);
                            extend(options, {
                                content: html || '',
                                js: js
                            });
                            tooltips.create(el, options);
                            if (old == 'shownow') {
                                tooltips.show(el, extend(options, {
                                    showdt: 0
                                }));
                            }
                        },
                        onFail: function() {
                            return true;
                        },
                        cache: opts.cache || 0
                    });
                    tooltips.show(el, opts);
                }, opts.ajaxdt || 0);
                return;
            }
            opts.content = '<div class="tt_text">' + (isFunction(opts.text) ? opts.text() : opts.text) + '</div>';
        }
        if (opts.dir !== undefined) {
            var main_cls = 'tt_w';
        } else {
            var main_cls = 'tt';
        }
        var tt_cls = opts.dir !== undefined ? (opts.typeClass || 'tt_default') : '';
        var cls = main_cls + ' ' + tt_cls + ' ' + (opts.className || '');
        if (el.tt && el.tt.el) {
            var cont = el.tt.container;
            if (el.tt.onClean) el.tt.onClean();
            geByClass1('wrapped', cont).innerHTML = opts.content;
            extend(el.tt, {
                opts: opts,
                show: tooltips.show.pbind(el, options)
            });
            cont.className = cls;
            hide(cont);
        } else {
            if (opts.black) {
                var c = ce('div', {
                    innerHTML: opts.content,
                    className: cls
                }, {
                    display: 'none'
                });
            } else if (opts.dir !== undefined) {
                var c = ce('div', {
                    innerHTML: '<div class="wrapped">' + opts.content + '</div>',
                    className: cls + no_shadow
                }, {
                    display: 'none'
                });
            } else {
                var c = ce('div', {
                    innerHTML: '<table cellspacing="0" cellpadding="0">\
    <tr><td colspan="3" class="tt_top"><div class="top_pointer"></div></td></tr>\
    <tr>\
      <td class="side_sh"></td>\
      <td class="outer"><table cellspacing="0" cellpadding="0">\
        <tr><td class="side_sh"></td>\
          <td class="wrapped">' + opts.content + '</td>\
        <td class="side_sh"></td></tr>\
        <tr><td colspan="3"><div class="bottom_sh"></div></td></tr>\
      </table></td>\
      <td class="side_sh"></td>\
    </tr>\
    <tr><td colspan="3" class="tt_bottom"><div class="bottom_sh"></div><div class="bottom_pointer' + no_shadow + '"></div></td></tr>\
  </table>',
                    className: cls
                }, {
                    display: 'none'
                });
            }

            var appendEl = domPN(el);
            if (options.appendEl) {
                appendEl = options.appendEl;
            } else if (options.appendParentCls) {
                appendEl = domClosest(options.appendParentCls, appendEl);
            } else {
                appendEl = domClosest('tt_w', appendEl) || domClosest('tt_default', appendEl);
                if (!appendEl) {
                    do {
                        appendEl = domClosestPositioned(appendEl || el, {
                            noOverflow: true
                        });
                    } while (hasClass(appendEl, 'tt_noappend'));
                }
            }

            if (!appendEl) {
                appendEl = bodyNode;
            }

            appendEl.appendChild(c);

            var res = extend({
                el: el,
                opts: opts,
                show: tooltips.show.pbind(el, options),
                hide: el.tthide,
                destroy: tooltips.destroy.pbind(el),
                container: c
            }, opts.tip || {});
            if (!opts.nohideover && (!opts.text || opts.hasover)) {
                addEvent(c, 'mouseover', res.show);
                addEvent(c, 'mouseout', res.hide);
            }

            removeClass(res.container, 'fixed');
            setStyle(res.container, {
                position: 'absolute'
            });

            el.tt = res;
            if (!cur.tooltips) {
                cur.tooltips = [];
            }
            cur.tooltips.push(res);
        }
        if (opts.init) opts.init(res);
    },

    addAudio: function(el, oid, aid, hash) {
        ajax.post('audio.php', {
            act: 'a_add',
            oid: oid,
            aid: aid,
            hash: hash
        }, {
            onDone: function() {
                el.parentNode.replaceChild(ce('div', {
                    className: 'fl_r add_audio_plus done'
                }), el);
            },
            onFail: function() {
                return true;
            },
            showProgress: function() {
                hide(el.nextSibling);
                show(el.previousSibling);
            },
            hideProgress: function() {
                hide(el.previousSibling);
                show(el.nextSibling);
            }
        });
    }
}

try {
    stManager.done('tooltips.js');
} catch (e) {}